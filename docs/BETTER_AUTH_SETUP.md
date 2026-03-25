# Better Auth Setup Guide

## Overview
This project has been configured with Better Auth for email/password authentication, supporting multiple languages 
## What's Been Set Up

### 1. **Database Schema**
✅ Updated database schema in `src/db/schema.ts` with Better Auth tables:
- `users` - User account information
- `sessions` - Session management  
- `accounts` - OAuth account linking
- `verifications` - Email verification tokens
- `todos` - Example data table

### 2. **Better Auth Configuration**
✅ Configured `src/lib/auth.ts` with:
- PostgreSQL Drizzle adapter
- Email/password authentication
- Session management with 7-day expiration
- Email verification capability
- User profile changes (email, deletion)
- CORS trusted origins

✅ Configured `src/lib/auth-client.ts` for React frontend with:
- Email/password client plugin
- Exported auth methods (signIn, signUp, signOut, etc.)

### 3. **API Route Handler**
✅ API route handler at `src/routes/api/auth/$.ts` for:
- GET and POST requests to `/api/auth/*`
- Handles all authentication endpoints

### 4. **Authentication Pages**
✅ Created all auth UI pages with Framer Motion animations:
- **Sign In** (`src/routes/$lang/auth/signin/index.tsx`)
- **Sign Up** (`src/routes/$lang/auth/signup/index.tsx`)
- **Forgot Password** (`src/routes/$lang/auth/forgot-password/index.tsx`)
- **Reset Password** (`src/routes/$lang/auth/reset-password/index.tsx`)
- **Verify Email** (`src/routes/$lang/auth/verify-email/index.tsx`)

All pages feature:
- Form validation
- Error handling
- Loading states
- Responsive design using Shadcn UI components
- Smooth animations with Framer Motion
- Multilingual support

### 5. **Language Support**
✅ Added Chinese (Simplified) translations in `messages/zh.json` for:
- All UI labels and messages
- Error messages
- Form validation messages
- Navigation links

✅ Updated English messages in `messages/en.json` with auth-specific keys

### 6. **Environment Configuration**
✅ `.env.local` contains:
```
DATABASE_URL=postgresql://...  # Your database connection
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=3f0c6eee6d9b522280806bd47336f8f1fe64feb0a806dc2998788427f3f1a3c9
VITE_BETTER_AUTH_URL=http://localhost:3000  # For client-side
```

## Next Steps

### 1. **Generate & Run Database Migrations**
First, generate the database schema for Better Auth:
```bash
npm run db:generate
npm run db:push
```

Or use the CLI to automatically create migrations:
```bash
npx @better-auth/cli@latest migrate
```

### 2. **Start the Development Server**
```bash
npm run dev
```

The server runs on http://localhost:3000

### 3. **Test the Authentication**
- Visit `http://localhost:3000/en/auth/signup` to create an account
- Visit `http://localhost:3000/en/auth/signin` to sign in
- Try the forgot password flow at `http://localhost:3000/en/auth/forgot-password`
- Switch language to Chinese: `http://localhost:3000/zh/auth/signin`

### 4. **Email Configuration (Optional)**
To enable email verification and password reset:
1. Update `src/lib/auth.ts` with an email provider:
```typescript
emailVerification: {
  sendVerificationEmail: async (user, token) => {
    // Send email using Resend, SendGrid, or your provider
  },
},
emailAndPassword: {
  sendResetPassword: async (user, token) => {
    // Send password reset email
  },
}
```

2. Popular email providers:
   - **Resend** - `npm install resend`
   - **SendGrid** - `npm install @sendgrid/mail`
   - **Nodemailer** - `npm install nodemailer`

### 5. **Add Social OAuth (Optional)**
To add Google, GitHub, or other OAuth providers, update `src/lib/auth.ts`:
```typescript
socialProviders: {
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  },
  github: {
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
  },
}
```

## File Structure
```
src/
├── lib/
│   ├── auth.ts              # Better Auth server configuration
│   ├── auth-client.ts       # Better Auth client setup
│   └── utils.ts
├── db/
│   ├── index.ts             # Database connection
│   └── schema.ts            # Database schema with auth tables
└── routes/
    ├── api/
    │   └── auth/
    │       └── $.ts         # Auth API handler
    └── $lang/
        └── auth/
            ├── signin/
            │   └── index.tsx
            ├── signup/
            │   └── index.tsx
            ├── forgot-password/
            │   └── index.tsx
            ├── reset-password/
            │   └── index.tsx
            └── verify-email/
                └── index.tsx

messages/
├── en.json                  # English translations
└── zh.json                  # Chinese (Simplified) translations
```

## Key Features Implemented

### Authentication Methods
- ✅ Email/password sign up
- ✅ Email/password sign in
- ✅ Forgot password flow
- ✅ Password reset via token
- ✅ Email verification (ready to implement)
- ⏳ OAuth integration (ready to implement)

### UI/UX
- ✅ Responsive mobile-friendly design
- ✅ Form validation with error messages
- ✅ Smooth animations with Framer Motion
- ✅ Loading states and feedback
- ✅ Dark mode support via Shadcn UI
- ✅ Built with Shadcn UI components

### Internationalization (i18n)
- ✅ English (en)
- ✅ Chinese Simplified (zh)
- ✅ Language-aware routing (e.g., `/en/auth/signin`, `/zh/auth/signin`)
- ✅ Easy to add more languages

## Troubleshooting

### Database Connection Issues
- Verify `DATABASE_URL` in `.env.local`
- Check PostgreSQL is running and accessible
- Run `npm run db:push` to create tables

### Auth Not Working
- Ensure `BETTER_AUTH_SECRET` and `BETTER_AUTH_URL` are set
- Check API route handler is accessible: `GET http://localhost:3000/api/auth/ok`
- Check browser console for CORS errors
- Verify database tables are created

### Language Not Switching
- Check URL pattern: `/en/auth/...` or `/zh/auth/...`
- Verify Paraglide JS is properly configured
- Check `messages/` folder has correct JSON files

## Documentation

- **Better Auth Docs:** https://better-auth.com/docs
- **Tanstack Router:** https://tanstack.com/router/latest
- **Shadcn UI:** https://ui.shadcn.com/
- **Framer Motion:** https://www.framer.com/motion/

## Production Checklist

- [ ] Update `BETTER_AUTH_URL` to production domain
- [ ] Regenerate `BETTER_AUTH_SECRET` with: `openssl rand -hex 32`
- [ ] Configure email provider for verification emails
- [ ] Set up OAuth providers (Google, GitHub, etc.)
- [ ] Enable HTTPS
- [ ] Update `trustedOrigins` in auth config
- [ ] Set appropriate session expiration times
- [ ] Enable rate limiting and security headers
- [ ] Test all auth flows in production
- [ ] Set up error monitoring (Sentry, etc.)

## Support

For issues or questions:
1. Check Better Auth documentation: https://better-auth.com/docs
2. Review route handlers in `src/routes/api/auth/`
3. Check browser console for client-side errors
4. Check terminal for server-side errors
