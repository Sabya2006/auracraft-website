# AuraCraft Digital — Web Design Agency Platform

A high-converting, sleek, and animated full-stack website designed for a web design agency targeting **Restaurants**, **Wholesalers**, and **Cafes**.

Features:
- **Dark Glassmorphic UI**: Ambient neon glows (`#f59e0b`, `#06b6d4`, `#10b981`), tabbed industry showcases, interactive ROI calculator, and mobile live app prototype previews.
- **Lead Generation & Fixed ₹2 Confirmation Payment**: Spam-free consultation booking connected to a Razorpay payment gateway simulator with HMAC signature verification and instant appointment receipt generation.
- **AI Strategy Call Scheduling Assistant**: Chat-based post-payment interactive slot scheduler for clients to select staff-approved call times.
- **OraCraft Closed Control Center**: Dual-mode Admin Director & Staff Workspace dashboards, OraCraft ID generator, attendance tracking, payment verification, and 1-click **CSV Data Export**.
- **Supabase Cloud Database Support**: Out-of-the-box support for Supabase PostgreSQL cloud database, MongoDB Atlas, or local isolated datastore.

---

> [!CAUTION]
> ### ⚠️ SECRET ROTATION & GIT HISTORY WARNING (MAYANK SHAH SAFETY AUDIT)
> If any secret key, database connection string, JWT signing secret, or password was previously hardcoded during local testing or committed in Git history, **YOU MUST ROTATE THOSE SECRETS IMMEDIATELY** before deploying this application to a public production environment.
>
> 1. **JWT Secret**: Generate a new random 32+ character high-entropy secret for `JWT_SECRET`.
> 2. **Razorpay Keys**: Obtain fresh `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, and `RAZORPAY_WEBHOOK_SECRET` from the Razorpay Dashboard.
> 3. **Database Credentials**: Change database passwords on Supabase / MongoDB Atlas.
> 4. **Supabase Service Role Key**: Keep `SUPABASE_SERVICE_ROLE_KEY` strictly on the backend; never expose it to client-side JS.

---

## 🔒 Secret Safety & Environment Configuration

All sensitive keys, database URLs, and signing secrets are managed strictly through environment variables. **No secrets exist as string literals in source code.**

### Backend Environment Variables (`backend/.env`)
Copy `backend/.env.example` to `backend/.env`:

```env
PORT=5000
NODE_ENV=production
CORS_ORIGIN=https://auracraft.vercel.app

# High-Entropy JWT Secret (Server-Side Only)
JWT_SECRET=your_jwt_signing_secret_here

# Razorpay Keys (Server-Side Only)
RAZORPAY_KEY_ID=rzp_live_your_key_id_here
RAZORPAY_KEY_SECRET=your_razorpay_secret_key_here
RAZORPAY_WEBHOOK_SECRET=your_razorpay_webhook_secret_here

# Supabase Credentials (Server-Side Only)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

# MongoDB Connection String (Server-Side Only)
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/auracraft?retryWrites=true&w=majority
```

### Frontend Environment Variables (`frontend/.env`)
Copy `frontend/.env.example` to `frontend/.env`:

```env
VITE_API_BASE_URL=http://localhost:5000
VITE_RAZORPAY_KEY_ID=rzp_test_public_key_id_here
```

---

## 🚀 Local Development Setup

### 1. Backend Server
```bash
cd backend
npm install
npm run dev
# Running on http://localhost:5000
```

### 2. Frontend Application
```bash
cd frontend
npm install
npm run dev
# Running on http://localhost:5173
```

---

## 🛠️ Verification Commands

Run code quality checks and production build validation:

```bash
# Verify frontend production build
cd frontend
npm run build

# Run linter checks
npx oxlint
```
