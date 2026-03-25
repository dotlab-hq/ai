# Quick Start Guide - Better Auth + Chinese Support

## What's Ready to Use

✅ **Authentication System**
- Email/password sign up & sign in
- Forgot password & password reset
- Email verification
- Session management

✅ **5 Authentication Pages**
- Sign In (`/en/auth/signin` or `/zh/auth/signin`)
- Sign Up (`/en/auth/signup` or `/zh/auth/signup`)
- Forgot Password (`/en/auth/forgot-password` or `/zh/auth/forgot-password`)
- Reset Password (`/en/auth/reset-password` or `/zh/auth/reset-password`)
- Verify Email (`/en/auth/verify-email` or `/zh/auth/verify-email`)

✅ **Multi-Language Support**
- English (en)
- Chinese Simplified (zh)
- All auth messages translated

✅ **Database Ready**
- PostgreSQL configured
- Schema with all auth tables ready
- Database URL already in `.env.local`

---

## Quick Setup (5 Steps)

### Step 1: Run Database Setup
```bash
npm run db:push
```
This creates all necessary tables in your PostgreSQL database.

### Step 2: Start Dev Server
```bash
npm run dev
```
Server runs on `http://localhost:3000`

### Step 3: Test Sign Up
Visit: `http://localhost:3000/en/auth/signup`
- Create an account with email and password
- Password must be at least 8 characters

### Step 4: Test Sign In
Visit: `http://localhost:3000/en/auth/signin`
- Use the email and password you just created
- Check "Remember me" checkbox (optional)

### Step 5: Test Other Pages
- Forgot Password: `http://localhost:3000/en/auth/forgot-password`
- Chinese Sign In: `http://localhost:3000/zh/auth/signin`

---

## Environment Variables

Your `.env.local` already has:
```
DATABASE_URL=postgresql://...  # PostgreSQL connection
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=3f0c6eee...
VITE_BETTER_AUTH_URL=http://localhost:3000
```

**For production**, update:
- `BETTER_AUTH_URL` → your domain
- `BETTER_AUTH_SECRET` → run `openssl rand -hex 32`
- `DATABASE_URL` → production database

---

## Using Auth in Your Pages

### Get logged-in user:
```tsx
import { useSession } from '@/lib/auth-client'

export function MyPage() {
  const session = useSession()
  
  if (!session) {
    return <div>Please sign in</div>
  }
  
  return <div>Welcome, {session.user.name}</div>
}
```

### Sign out button:
```tsx
import { signOut } from '@/lib/auth-client'

export function SignOutButton() {
  return (
    <button onClick={() => signOut()}>
      Sign Out
    </button>
  )
}
```

### Protected page:
```tsx
import { useSession } from '@/lib/auth-client'
import { useNavigate } from '@tanstack/react-router'

export function Dashboard() {
  const session = useSession()
  const navigate = useNavigate()

  if (!session) {
    navigate({ to: '/signin' })
    return null
  }

  return <div>Your dashboard</div>
}
```

---

## Email (Optional)

To enable password reset and verification emails:

### Using Resend (Recommended):
1. Sign up at https://resend.com
2. Get your API key
3. Install: `npm install resend`
4. Update `src/lib/auth.ts` with Resend configuration
5. Add `RESEND_API_KEY` to `.env.local`

### Other Providers:
- SendGrid: `npm install @sendgrid/mail`
- Nodemailer: `npm install nodemailer`

---

## File Structure

```
src/
├── lib/
│   ├── auth.ts           # Server auth config
│   └── auth-client.ts    # Client auth setup
├── db/
│   └── schema.ts         # Database tables
└── routes/$lang/auth/
    ├── signin/
    ├── signup/
    ├── forgot-password/
    ├── reset-password/
    └── verify-email/

messages/
├── en.json               # English translations
└── zh.json               # Chinese translations
```

---

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| 500 error on auth pages | Run `npm run db:push` to create tables |
| Can't sign in | Check email/password are correct, tables exist |
| Translations missing | Check `messages/en.json` and `messages/zh.json` |
| Email not sending | Configure email provider (Resend/SendGrid) |
| CORS error | Update `trustedOrigins` in `src/lib/auth.ts` |

---

## Commands

```bash
npm run dev              # Start development server
npm run db:generate      # Generate database migration
npm run db:push          # Apply migrations to database
npm run db:studio        # View/edit database data
npm run build            # Build for production
npm run lint             # Check code
```

---

## Next Steps

1. **Test locally** (follow Quick Setup above)
2. **Add email** (optional, for passwords reset)
3. **Customize pages** (colors, fonts, branding)
4. **Add more features** (2FA, social login, etc.)
5. **Deploy to production**

---

## Need Help?

- **Better Auth Docs:** https://better-auth.com/docs
- **Database Setup:** https://orm.drizzle.team
- **UI Components:** https://ui.shadcn.com
- **Internationalization:** https://inlang.com/doc/paraglide/js

---

## Production Checklist

- [ ] Database migrated on production server
- [ ] All auth pages tested
- [ ] Email provider configured
- [ ] `BETTER_AUTH_URL` updated to your domain
- [ ] New `BETTER_AUTH_SECRET` generated
- [ ] `trustedOrigins` set to your domain
- [ ] HTTPS enabled
- [ ] Security headers configured
- [ ] Session cookies are secure (production has https)
- [ ] Rate limiting enabled

---

## Summary of What Was Set Up

✅ **Database Schema** - All tables ready for auth
✅ **Backend Config** - Better Auth configured with Drizzle ORM
✅ **Client Setup** - React hooks for auth
✅ **5 Auth Pages** - Sign in, sign up, password reset, email verify
✅ **English + Chinese** - All UI translated
✅ **Animations** - Smooth page transitions with Framer Motion
✅ **Form Validation** - Client-side validation with error messages
✅ **Responsive Design** - Works on mobile, tablet, desktop

Now just run the database setup and start the server! 🚀
