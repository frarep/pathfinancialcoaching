import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

type AirtableResult =
  | { ok: true; action: 'created' | 'updated'; touchCount: number }
  | { ok: false; error: string }

// Today's date as YYYY-MM-DD in Pacific time (business timezone), so the
// Last Touch Date doesn't roll to "tomorrow" for evening submissions on a
// UTC server.
function pacificDate(): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Los_Angeles',
  }).format(new Date())
}

async function upsertToAirtable(data: {
  firstName: string
  lastName: string
  email: string
  phone: string
  goals: string
}): Promise<AirtableResult> {
  const { AIRTABLE_TOKEN, AIRTABLE_BASE_ID, AIRTABLE_TABLE_NAME } = process.env

  if (!AIRTABLE_TOKEN || !AIRTABLE_BASE_ID || !AIRTABLE_TABLE_NAME) {
    const error = 'Airtable env vars not set (AIRTABLE_TOKEN / AIRTABLE_BASE_ID / AIRTABLE_TABLE_NAME)'
    console.warn(`${error} — skipping Airtable submission`)
    return { ok: false, error }
  }

  const baseUrl = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE_NAME)}`
  const authHeaders = {
    Authorization: `Bearer ${AIRTABLE_TOKEN}`,
    'Content-Type': 'application/json',
  }
  const today = pacificDate()
  const datedGoals = `[${today}] New consultation request: ${data.goals}`

  try {
    // 1. Look up an existing contact by email (case-insensitive). Strip any
    // stray double-quotes so they can't break the formula string.
    const safeEmail = data.email.replace(/"/g, '')
    const formula = `LOWER({Email})=LOWER("${safeEmail}")`
    const lookupUrl = `${baseUrl}?filterByFormula=${encodeURIComponent(formula)}&maxRecords=1`
    const lookupRes = await fetch(lookupUrl, { headers: authHeaders })

    if (!lookupRes.ok) {
      const error = await lookupRes.text()
      console.error('Airtable lookup failed:', error)
      return { ok: false, error }
    }

    const lookup = await lookupRes.json()
    const existing = lookup.records?.[0] as
      | { id: string; fields: Record<string, unknown> }
      | undefined

    if (existing) {
      // 2a. Returning contact — increment touch count, bump last touch date,
      // reset to the inquiry stage, and APPEND the new goals to their notes.
      const currentCount = Number(existing.fields['Touch Count']) || 0
      const currentNotes =
        typeof existing.fields['Notes'] === 'string' ? existing.fields['Notes'] : ''
      const mergedNotes = currentNotes ? `${currentNotes}\n\n${datedGoals}` : datedGoals

      const patchRes = await fetch(`${baseUrl}/${existing.id}`, {
        method: 'PATCH',
        headers: authHeaders,
        body: JSON.stringify({
          typecast: true,
          fields: {
            'Notes': mergedNotes,
            'Status': 'Inquiry Received',
            'Outreach Track': 'End Client',
            'Last Touch Date': today,
            'Touch Count': currentCount + 1,
          },
        }),
      })

      if (!patchRes.ok) {
        const error = await patchRes.text()
        console.error('Airtable update failed:', error)
        return { ok: false, error }
      }

      return { ok: true, action: 'updated', touchCount: currentCount + 1 }
    }

    // 2b. Brand-new contact — create the record.
    const createRes = await fetch(baseUrl, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({
        // typecast lets Airtable match/create single-select options (e.g. Status)
        // instead of rejecting the whole record when the exact option is missing.
        typecast: true,
        fields: {
          'Name': `${data.firstName} ${data.lastName}`,
          'Email': data.email,
          'Cell Phone': data.phone,
          'Notes': datedGoals,
          'Source': 'Website Consultation Form',
          'Status': 'Inquiry Received',
          'Outreach Track': 'End Client',
          'Last Touch Date': today,
          'Touch Count': 1,
        },
      }),
    })

    if (!createRes.ok) {
      const error = await createRes.text()
      console.error('Airtable create failed:', error)
      return { ok: false, error }
    }

    return { ok: true, action: 'created', touchCount: 1 }
  } catch (err) {
    const error = err instanceof Error ? err.message : String(err)
    console.error('Airtable submission threw:', error)
    return { ok: false, error }
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, phone, goals } = body

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !goals) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Submit to Airtable first so the notification email can report CRM status.
    // The lead is never lost: if the CRM write fails, the email below flags it
    // loudly so it can be added manually.
    const airtableResult = await upsertToAirtable({ firstName, lastName, email, phone, goals })

    const crmSummary = airtableResult.ok
      ? airtableResult.action === 'updated'
        ? `Updated existing contact — Touch Count now ${airtableResult.touchCount}.`
        : `New contact created — Touch Count ${airtableResult.touchCount}.`
      : ''

    const crmBannerHtml = airtableResult.ok
      ? `<div style="padding:12px 20px;background:#ECFDF5;color:#065F46;border-radius:8px;margin-bottom:20px;">✅ Saved to the CRM (Contacts table). ${crmSummary}</div>`
      : `<div style="padding:12px 20px;background:#FEF2F2;color:#991B1B;border:1px solid #FCA5A5;border-radius:8px;margin-bottom:20px;">⚠️ <strong>NOT saved to the CRM — add this lead manually.</strong><br/>Airtable error: ${airtableResult.error}</div>`

    const crmBannerText = airtableResult.ok
      ? `CRM: Saved to Contacts table. ${crmSummary}\n\n`
      : `CRM: *** NOT SAVED — ADD MANUALLY *** (Airtable error: ${airtableResult.error})\n\n`

    // Create transporter with environment variables
    // This supports multiple email providers (Gmail, SendGrid, etc.)
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    })

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: process.env.EMAIL_TO || 'Frare.Patrick@PathFinancialCoaching.com',
      subject: 'New Coaching Consultation Request - Path Financial Coaching',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background: linear-gradient(135deg, #93C5FD 0%, #FEF08A 100%);
                padding: 30px;
                text-align: center;
                border-radius: 10px 10px 0 0;
              }
              .header h1 {
                color: #1F2937;
                margin: 0;
              }
              .content {
                background: #ffffff;
                padding: 30px;
                border: 1px solid #E5E7EB;
              }
              .field {
                margin-bottom: 20px;
              }
              .label {
                font-weight: bold;
                color: #4B5563;
                display: block;
                margin-bottom: 5px;
              }
              .value {
                color: #1F2937;
                padding: 10px;
                background: #F9FAFB;
                border-radius: 5px;
              }
              .goals {
                white-space: pre-wrap;
              }
              .footer {
                background: #F3F4F6;
                padding: 20px;
                text-align: center;
                border-radius: 0 0 10px 10px;
                font-size: 14px;
                color: #6B7280;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>New Consultation Request</h1>
              </div>
              <div class="content">
                ${crmBannerHtml}
                <div class="field">
                  <span class="label">First Name:</span>
                  <div class="value">${firstName}</div>
                </div>
                <div class="field">
                  <span class="label">Last Name:</span>
                  <div class="value">${lastName}</div>
                </div>
                <div class="field">
                  <span class="label">Email:</span>
                  <div class="value"><a href="mailto:${email}">${email}</a></div>
                </div>
                <div class="field">
                  <span class="label">Phone Number:</span>
                  <div class="value"><a href="tel:${phone}">${phone}</a></div>
                </div>
                <div class="field">
                  <span class="label">Goals:</span>
                  <div class="value goals">${goals}</div>
                </div>
              </div>
              <div class="footer">
                <p>Submitted on: ${new Date().toLocaleString('en-US', {
                  dateStyle: 'full',
                  timeStyle: 'short'
                })}</p>
                <p>Path Financial Coaching - Consultation Request</p>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `
New Coaching Consultation Request

${crmBannerText}First Name: ${firstName}
Last Name: ${lastName}
Email: ${email}
Phone Number: ${phone}

Goals:
${goals}

Submitted on: ${new Date().toLocaleString()}
      `,
    }

    // Airtable was already submitted above; just send the notification email.
    await transporter.sendMail(mailOptions)

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    )
  }
}
