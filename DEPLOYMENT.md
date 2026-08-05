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

