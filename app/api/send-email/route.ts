import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

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

First Name: ${firstName}
Last Name: ${lastName}
Email: ${email}
Phone Number: ${phone}

Goals:
${goals}

Submitted on: ${new Date().toLocaleString()}
      `,
    }

    // Send email
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
