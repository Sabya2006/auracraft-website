# AuraCraft Digital — Web Design Agency Platform

A high-converting, sleek, and animated full-stack website designed for a web design agency targeting **Restaurants**, **Wholesalers**, and **Cafes**.

Features:
- **Dark Glassmorphic UI**: Ambient neon glows (`#f59e0b`, `#06b6d4`, `#10b981`), tabbed industry showcases, interactive ROI calculator, and mobile live app prototype previews.
- **Lead Generation & ₹2 Confirmation Payment Gateway**: Spam-free consultation booking connected to an interactive ₹2 payment gateway simulator (UPI QR, Card, NetBanking) with real-time verification and receipt generation.
- **Secure Corporate Staff Control Center**: Staff JWT authentication, real-time lead analytics, sector filters, status pipeline editor, and 1-click **CSV Data Export**.
- **Supabase Cloud Database Support**: Out-of-the-box support for Supabase PostgreSQL cloud database, MongoDB Atlas, or local isolated datastore.

---

> [!CAUTION]
> ### ⚠️ SECRET ROTATION & GIT HISTORY WARNING
> If any secret key, database connection string, JWT signing secret, or password was previously hardcoded during local testing or committed in Git history, **YOU MUST ROTATE THOSE SECRETS IMMEDIATELY** before deploying this application to a public production environment.
>
> 1. **JWT Secret**: Generate a new random 32+ character high-entropy secret for `JWT_SECRET`.
> 2. **Database Credentials**: Change database passwords on Supabase / MongoDB Atlas.
> 3. **API Keys**: Regenerate any third-party API keys or service tokens.

---

## 🔒 Secret Safety & Environment Configuration

All sensitive keys, database URLs, and signing secrets are managed strictly through environment variables. **No secrets exist as string literals in source code.**

### Backend Environment Variables (`backend/.env`)
Copy `backend/.env.example` to `backend/.env`:

```env
PORT=5000
NODE_ENV=production

# Supabase Credentials (Server-Side Only)
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_KEY=your_supabase_anon_or_service_role_key

# MongoDB Connection String (Server-Side Only)
MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/auracraft_db

# High-Entropy JWT Secret
JWT_SECRET=your_secret_jwt_key_here

# Corporate Staff Credentials
ADMIN_EMAIL=admin@auracraft.com
ADMIN_PASSWORD=your_secure_admin_password

# CORS Settings
CORS_ORIGIN=https://your-frontend-domain.vercel.app
```

### Frontend Environment Variables (`frontend/.env.production`)
Copy `frontend/.env.example` to `frontend/.env.production`:

```env
VITE_API_URL=https://your-backend-api.onrender.com
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
