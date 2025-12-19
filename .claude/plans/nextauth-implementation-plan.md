# NextAuth.js Authentication Implementation Plan

## Overview
Add NextAuth.js authentication to Path Financial Coaching website with:
- Email & password login for paid clients
- Manual user management via admin dashboard
- Vercel Postgres for user storage
- Members-only area with exclusive resources and downloads
- Admin page to create/manage client accounts

## User Requirements
- ✓ Email & Password authentication
- ✓ Manual approval (admin creates accounts for paid clients)
- ✓ Vercel Postgres database
- ✓ Admin page (/admin/users) to manage users
- ✓ Members content: Downloadable documents & exclusive resources

## Implementation Phases

### Phase 1: Dependencies & Database Setup

**Install packages:**
```bash
npm install next-auth@beta @auth/core @auth/pg-adapter @vercel/postgres bcryptjs zod
npm install @types/bcryptjs --save-dev
```

**Environment variables to add (.env):**
```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<generate-with-openssl>
AUTH_SECRET=<same-as-nextauth-secret>
POSTGRES_URL="<from-vercel-postgres>"
ADMIN_EMAIL=frare.patrick@pathfinancialcoaching.com
```

**Database schema:** Create tables for users, sessions, and tokens

### Phase 2: Core Authentication Setup

**New files:**
- `lib/auth.ts` - NextAuth configuration with credentials provider
- `app/api/auth/[...nextauth]/route.ts` - NextAuth API handler
- `types/next-auth.d.ts` - TypeScript type extensions
- `middleware.ts` - Route protection for /members and /admin
- `lib/rate-limit.ts` - Login rate limiting

**Key features:**
- Credentials provider for email/password
- JWT session strategy (30-day expiration)
- Password hashing with bcrypt
- Role-based access (admin/client)
- Rate limiting (5 login attempts per 15 min)

### Phase 3: UI Components & Layout Updates

**New component:**
- `components/Providers.tsx` - SessionProvider wrapper

**Modify existing:**
- `app/layout.tsx` - Wrap children with Providers
- `components/Header.tsx` - Add login/logout buttons, conditional nav based on session
- `components/Footer.tsx` - Add member portal link when logged in

**Design pattern:** Use existing Tailwind classes (card, btn-primary), Lucide icons (User, LogOut), maintain current styling

### Phase 4: Login Page

**New file:**
- `app/login/page.tsx` - Login form with email/password inputs

**Features:**
- Form validation
- Error handling
- Loading states
- Rate limit feedback
- Link to free consultation for non-clients

### Phase 5: Members Area

**New pages:**
- `app/members/page.tsx` - Members dashboard with quick links
- `app/members/downloads/page.tsx` - Exclusive downloadable documents (PDFs)
- `app/members/resources/page.tsx` - Premium tools and educational content

**Design:** Follow existing patterns from /resources page:
- Card-based layouts
- section-container, section-title CSS classes
- Lucide icons (Download, BookOpen, Lock)
- Gradient hover effects

**Content:**
- Dashboard: Welcome message, quick access cards, stats placeholders
- Downloads: Premium worksheets, trackers, templates for paid clients
- Resources: Advanced guides, videos, community (placeholder links)

### Phase 6: Admin Dashboard

**New files:**
- `app/admin/users/page.tsx` - Admin user management page (server component)
- `components/admin/UserManagementClient.tsx` - Client component for user CRUD
- `app/api/admin/users/route.ts` - API to create users
- `app/api/admin/users/[id]/route.ts` - API to delete users

**Features:**
- Add client form: name, email, password
- User table: view all clients with email, role, status, created date, last login
- Delete users (except admins)
- Success/error messages
- Admin-only access (role check in middleware + page)

### Phase 7: Database Utilities & Setup

**New files:**
- `lib/db/utils.ts` - Database initialization functions
- `lib/db/schema.sql` - SQL schema definition
- `scripts/setup-db.ts` - One-time setup script

**Schema:**
- `users` table: id, email, password, name, role, status, timestamps
- `sessions` table: for NextAuth session storage
- `verification_tokens` table: for future password reset

**Setup process:**
1. Deploy to Vercel
2. Add Vercel Postgres from Storage tab
3. Run: `npm run setup-db` to create tables and admin user
4. Default admin: frare.patrick@pathfinancialcoaching.com / ChangeMe123!

### Phase 8: Security Enhancements

**Implement:**
- Security headers in `next.config.js` (X-Frame-Options, CSP, etc.)
- Rate limiting on login endpoint
- CSRF protection (built-in with NextAuth)
- SQL injection prevention (parameterized queries)
- Password complexity requirements (8+ chars)

**Post-deployment:**
- Change default admin password immediately
- Set up monitoring for failed logins
- Configure Postgres backups in Vercel

## Critical Files to Create/Modify

**Core Auth (5 files):**
1. `/root/pathfinancialcoaching/lib/auth.ts` - NextAuth config
2. `/root/pathfinancialcoaching/middleware.ts` - Route protection
3. `/root/pathfinancialcoaching/app/api/auth/[...nextauth]/route.ts` - Auth handler
4. `/root/pathfinancialcoaching/components/Providers.tsx` - Session provider
5. `/root/pathfinancialcoaching/types/next-auth.d.ts` - Type definitions

**UI Updates (3 files):**
1. `/root/pathfinancialcoaching/app/layout.tsx` - Add Providers wrapper
2. `/root/pathfinancialcoaching/components/Header.tsx` - Add auth buttons
3. `/root/pathfinancialcoaching/components/Footer.tsx` - Add member link

**Pages (6 files):**
1. `/root/pathfinancialcoaching/app/login/page.tsx` - Login form
2. `/root/pathfinancialcoaching/app/members/page.tsx` - Dashboard
3. `/root/pathfinancialcoaching/app/members/downloads/page.tsx` - Downloads
4. `/root/pathfinancialcoaching/app/members/resources/page.tsx` - Resources
5. `/root/pathfinancialcoaching/app/admin/users/page.tsx` - Admin page
6. `/root/pathfinancialcoaching/components/admin/UserManagementClient.tsx` - Admin UI

**Admin API (2 files):**
1. `/root/pathfinancialcoaching/app/api/admin/users/route.ts` - Create user
2. `/root/pathfinancialcoaching/app/api/admin/users/[id]/route.ts` - Delete user

**Database (4 files):**
1. `/root/pathfinancialcoaching/lib/db/schema.sql` - Schema
2. `/root/pathfinancialcoaching/lib/db/utils.ts` - DB utilities
3. `/root/pathfinancialcoaching/scripts/setup-db.ts` - Setup script
4. `/root/pathfinancialcoaching/lib/rate-limit.ts` - Rate limiter

**Config (2 files):**
1. `/root/pathfinancialcoaching/next.config.js` - Security headers
2. `/root/pathfinancialcoaching/package.json` - Add scripts: "setup-db"

## Implementation Order

1. **Foundation:** Install packages, add env vars, create auth config
2. **Core:** Middleware, session provider, type definitions
3. **UI:** Update layout, Header, Footer with auth support
4. **Login:** Create login page
5. **Members:** Build members dashboard and sub-pages
6. **Admin:** Create admin dashboard and user management
7. **Database:** Setup scripts and utilities
8. **Security:** Add headers, rate limiting
9. **Testing:** Test all flows locally
10. **Deploy:** Push to Vercel, setup Postgres, run migrations

## Design Consistency

**Follow existing patterns:**
- Use `card`, `section-container`, `section-title`, `btn-primary` CSS classes
- Lucide React icons throughout
- Tailwind colors: soft-blue, soft-yellow, brand-red
- Glass morphism effects (backdrop-blur)
- Responsive grid layouts
- Hover animations and transitions

## Testing Checklist

**Local testing:**
- [ ] Admin can login
- [ ] Admin can access /admin/users
- [ ] Admin can create client account
- [ ] Client can login with created credentials
- [ ] Client can access /members area
- [ ] Client CANNOT access /admin
- [ ] Unauthenticated users redirected to /login
- [ ] Logout works correctly
- [ ] Rate limiting prevents brute force
- [ ] Mobile responsive

**Production:**
- [ ] Vercel Postgres connected
- [ ] Database tables created
- [ ] Admin password changed
- [ ] SSL/HTTPS working
- [ ] All routes protected correctly

## Success Criteria

✓ Paid clients can login with email/password
✓ Admin can manually create client accounts via web interface
✓ Members see exclusive downloads and resources
✓ Public visitors cannot access members content
✓ Admin has full user management capabilities
✓ System is secure and production-ready
✓ Design matches existing site aesthetics
