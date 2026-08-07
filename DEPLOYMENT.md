Production deployment notes

This document describes steps to run PrimePredict in a simple production setup on a single server using pm2 and nginx. It does not replace a full production runbook — adapt to your cloud provider.

Prerequisites
- Node.js (v18+ recommended)
- npm
- pm2 (install globally: npm i -g pm2)
- nginx
- certbot (for Let's Encrypt TLS)

1) Prepare environment variables
- Do NOT store production secrets in repository.
- Create /etc/primepredict/backend/.env with MONGODB_URI, JWT_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD, FRONTEND_URL, etc.

2) Build frontend
- cd frontend
- npm ci
- npm run build

3) Start processes with pm2 (from repo root)
- pm2 start ecosystem.config.js --env production
- pm2 save
- pm2 startup  # follow printed instructions to persist on reboot

4) Configure nginx
- Copy nginx/primepredict.conf to /etc/nginx/sites-available/primepredict
- ln -s /etc/nginx/sites-available/primepredict /etc/nginx/sites-enabled/
- Test: nginx -t
- Restart nginx: systemctl restart nginx

5) Obtain TLS cert (Let's Encrypt)
- Install certbot (your OS package manager)
- certbot --nginx -d example.com (replace domain)
- certbot will update nginx config for HTTPS automatically

8) Stripe setup
- Create Stripe API keys in the Stripe dashboard (secret key and webhook secret).
- Add STRIPE_SECRET_KEY and STRIPE_WEBHOOK_SECRET to your backend environment.
- In the backend, payments are created and a Stripe Checkout session is requested; webhooks must be reachable by Stripe. Use the Stripe CLI for testing:
  - stripe login
  - stripe listen --forward-to localhost:4000/api/payments/webhook/stripe
  - Trigger events or test via checkout flow

Note: Do not commit secret keys to the repository. Use your host provider's secret storage.

6) Security recommendations
- Rotate DB credentials and JWT secret; use a secrets manager.
- Restrict MONGODB access to your app IPs or use VPC peering.
- Add monitoring and log collection (pm2 logs, Papertrail/Datadog, etc.)

7) Troubleshooting
- Check pm2 logs: pm2 logs primepredict-backend
- Check nginx: journalctl -u nginx

---

# Vercel Deployment (Frontend + Backend)

This project deploys as **two separate Vercel projects**:
- **Frontend** (`frontend/`) — Next.js App Router
- **Backend** (`backend/`) — Express/Mongoose (serverless via `@vercel/node`)

## Root Cause of "Failed to fetch" on Login
The frontend previously fell back to `http://localhost:4000` when the API URL env var was
not set in production. In a browser, `http://localhost:4000` does not exist on Vercel's
servers, so `fetch()` threw `Failed to fetch`.

**Fix:** The frontend now standardizes on `NEXT_PUBLIC_API_URL`. If it is not set in
production, the API client throws a clear configuration error instead of silently failing.
The backend now exports the Express `app` (no `listen()`) so it runs correctly as a
serverless function.

## Backend Vercel Project — Required Environment Variables
Set these in Vercel **Project → Settings → Environment Variables** (Production):

| Variable            | Required | Description |
|---------------------|----------|-------------|
| `MONGODB_URI`       | Yes      | MongoDB Atlas connection string |
| `JWT_SECRET`        | Yes      | Random long secret for JWT signing |
| `JWT_EXPIRES_IN`    | No       | e.g. `7d` (default) |
| `API_KEY`           | Yes      | Must match frontend `NEXT_PUBLIC_API_KEY` |
| `FRONTEND_URL`      | Yes      | `https://primepredictions-one.vercel.app` |
| `NODE_ENV`          | Yes      | `production` |
| `ADMIN_EMAIL`       | Yes      | Admin seed email |
| `ADMIN_PASSWORD`    | Yes      | Admin seed password |
| `ADMIN_NAME`        | No       | Admin seed name |
| `SITE_URL`          | Yes      | `https://primepredictions-one.vercel.app` |
| `STRIPE_SECRET_KEY` | Optional | For Stripe payments |
| `STRIPE_WEBHOOK_SECRET` | Optional | For Stripe webhooks |

Deployment config: `backend/vercel.json` uses `@vercel/node` to build `server.js`.

## Frontend Vercel Project — Required Environment Variables

| Variable                | Required | Description |
|-------------------------|----------|-------------|
| `NEXT_PUBLIC_API_URL`   | Yes      | Full deployed backend URL, e.g. `https://<backend>.vercel.app` |
| `NEXT_PUBLIC_API_KEY`   | Yes      | Must match backend `API_KEY` |

> **Important:** `NEXT_PUBLIC_*` variables are inlined at **build time**. After changing
> them you must redeploy the frontend for the change to take effect.

## MongoDB Atlas Network Access
Vercel serverless functions use dynamic IPs. Either:
1. Add Vercel's IP ranges to the Atlas whitelist, **or**
2. Set Atlas network access to **"Allow access from anywhere"** (`0.0.0.0/0`) with IP
   Access List enabled, **or**
3. Use MongoDB Atlas + Vercel integration (recommended) for secure network peering.

## Verify the Fix
1. `curl https://<backend>.vercel.app/health` → `{"ok":true,...}`
2. Log in from `https://primepredictions-one.vercel.app/login` — should succeed.
3. Confirm the browser Network tab shows a request to `https://<backend>.vercel.app/api/auth/login`
   (NOT `localhost:4000`).

