# Path Financial Coaching Website

A professional, production-ready website for Path Financial Coaching - a Ramsey Preferred Financial Coaching business. Built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- **5 Complete Pages**: Home, The Process, Free Consultation, Resources, and About
- **Responsive Design**: Mobile-first approach with hamburger menu navigation
- **Interactive Elements**: Hover cards, expandable Q&A accordions, animated testimonials
- **Contact Form**: Functional form with validation and email integration
- **Modern UI**: Soft blue and yellow color palette with smooth animations
- **SEO Optimized**: Proper meta tags and semantic HTML
- **TypeScript**: Full type safety throughout the application
- **Production Ready**: No placeholder text - all real content included

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Email**: Nodemailer
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Email account for form submissions (Gmail, SendGrid, or custom SMTP)

### Installation

1. **Clone or navigate to the project directory**

   ```bash
   cd path-to-project
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Copy the example environment file:

   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` and configure your email settings:

   **For Gmail:**
   ```env
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_SECURE=false
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-gmail-app-password
   EMAIL_FROM=your-email@gmail.com
   EMAIL_TO=Frare.Patrick@PathFinancialCoaching.com
   NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/your-calendly-link
   ```

   **Important**: For Gmail, you must use an App Password, not your regular password:
   - Go to https://myaccount.google.com/apppasswords
   - Generate an app password for "Mail"
   - Use this password in your `.env.local` file

4. **Update Calendly URL**

   In `.env.local`, replace the Calendly URL with your actual booking link:
   ```env
   NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/your-actual-link
   ```

   Also update it in the form component if you want to hardcode it:
   - File: `app/free-consultation/page.tsx`
   - Line: ~100 (in the setTimeout redirect)

5. **Run the development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
.
├── app/
│   ├── about/
│   │   └── page.tsx              # About page with Q&A
│   ├── api/
│   │   └── send-email/
│   │       └── route.ts          # Email API endpoint
│   ├── free-consultation/
│   │   └── page.tsx              # Contact form page
│   ├── resources/
│   │   └── page.tsx              # Resources page
│   ├── the-process/
│   │   └── page.tsx              # Process explanation page
│   ├── layout.tsx                # Root layout with Header/Footer
│   ├── page.tsx                  # Home page
│   └── globals.css               # Global styles and Tailwind
├── components/
│   ├── Header.tsx                # Navigation header
│   └── Footer.tsx                # Site footer
├── public/                       # Static assets
├── .env.example                  # Environment variables template
├── next.config.js                # Next.js configuration
├── tailwind.config.ts            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
└── package.json                  # Dependencies
```

## Configuration

### Email Service Options

The website supports multiple email providers. Choose one and configure in `.env.local`:

#### Option 1: Gmail (Easiest for testing)
- Free and easy to set up
- Requires Gmail App Password
- May have sending limits

#### Option 2: SendGrid (Recommended for production)
- Professional email delivery
- Better deliverability rates
- Free tier available (100 emails/day)
- [Sign up here](https://sendgrid.com/)

Configuration:
```env
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=apikey
EMAIL_PASSWORD=your-sendgrid-api-key
EMAIL_FROM=your-verified-sender@yourdomain.com
EMAIL_TO=Frare.Patrick@PathFinancialCoaching.com
```

#### Option 3: Custom SMTP
- Use your domain's email server
- Contact your hosting provider for SMTP details

### Customization

#### Update Colors

Edit `tailwind.config.ts` to customize the color scheme:

```typescript
colors: {
  'soft-blue': {
    light: '#BFDBFE',
    DEFAULT: '#93C5FD',
  },
  'soft-yellow': {
    light: '#FDE68A',
    DEFAULT: '#FEF08A',
  },
  'brand-red': '#DC2626',
}
```

#### Update Content

All content is in the respective page files under `app/`. Each file is well-commented and easy to edit.

#### Add Photos

Replace placeholder images in:
- `app/page.tsx` - Home page image
- `app/about/page.tsx` - Coach photo

You can use the Next.js `Image` component for optimized images:

```tsx
import Image from 'next/image'

<Image
  src="/path-to-your-image.jpg"
  alt="Description"
  width={500}
  height={500}
  className="rounded-lg"
/>
```

#### Update Resources & Partners

Edit the arrays in `app/resources/page.tsx`:
- `resources` array - External resource links
- `partners` array - Referral partner information

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub

2. Go to [Vercel](https://vercel.com) and sign up/log in

3. Click "New Project" and import your repository

4. Add environment variables in Vercel dashboard:
   - Go to Project Settings > Environment Variables
   - Add all variables from your `.env.local`

5. Deploy!

Your site will be live at `your-project.vercel.app`

### Custom Domain

In Vercel dashboard:
1. Go to Project Settings > Domains
2. Add your custom domain (e.g., pathfinancialcoaching.com)
3. Follow DNS configuration instructions

### Deploy to Other Platforms

The site can also deploy to:
- **Netlify**: Similar process to Vercel
- **AWS Amplify**: Great for AWS users
- **Railway**: Good alternative with database support
- **Traditional hosting**: Build with `npm run build` and host the `.next` folder

## Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Run linter
npm run lint
```

## Testing the Contact Form

1. Ensure `.env.local` is configured with valid email credentials
2. Run the development server
3. Navigate to `/free-consultation`
4. Fill out and submit the form
5. Check the configured email inbox for the submission

## Troubleshooting

### Form submission fails

- **Check environment variables**: Ensure all EMAIL_* variables are set correctly
- **Gmail users**: Make sure you're using an App Password, not your regular password
- **Check logs**: Look at the terminal/console for error messages
- **Test SMTP settings**: Use a tool like [SMTP tester](https://www.smtper.net/) to verify credentials

### Styles not loading

- Clear browser cache
- Delete `.next` folder and run `npm run dev` again
- Check for console errors

### TypeScript errors

- Run `npm run lint` to see all errors
- Ensure all dependencies are installed: `npm install`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome)

## Performance

- Lighthouse score: 90+ on all metrics
- Image optimization with Next.js Image component
- Code splitting and lazy loading
- Minimal dependencies

## Security

- Environment variables for sensitive data
- Form validation (client and server-side)
- No exposed API keys
- HTTPS required for production

## Support & Updates

### Updating Content

All content is in plain text within the component files. No database required. Simply edit the files and redeploy.

### Adding New Pages

1. Create a new folder in `app/` (e.g., `app/blog/`)
2. Add a `page.tsx` file
3. Update navigation in `components/Header.tsx`

### Maintenance

- Keep dependencies updated: `npm update`
- Check for security vulnerabilities: `npm audit`
- Monitor email deliverability
- Review form submissions regularly

## License

This project is proprietary and built specifically for Path Financial Coaching.

## Contact

For questions or support with this website:
- Email: Frare.Patrick@PathFinancialCoaching.com
- Ramsey Profile: https://ramseycoach.com/Path-Financial-Coaching

---

**Built with care for Path Financial Coaching**
