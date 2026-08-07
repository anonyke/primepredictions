# PrimePredict.co.ke 🏆⚽

**Premium Football Prediction Platform** - Kenya's most accurate football prediction service.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)

### Backend Setup
```bash
cd backend
cp .env.example .env    # Edit .env with your settings
npm install
npm run dev             # Starts on http://localhost:4000
```

### Production (simple single-server)
```bash
# Install pm2 globally: npm i -g pm2
# From repo root, build frontend and start processes with pm2:
cd frontend && npm ci && npm run build && cd ..
pm2 start ecosystem.config.js --env production
pm2 save
pm2 startup  # follow printed instructions to persist pm2 on reboot
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev             # Starts on http://localhost:3000
```

## 📁 Project Structure

```
primepredictions/
├── backend/                    # Node.js + Express API
│   ├── config/                 # Database & app config
│   ├── controllers/            # Route handlers
│   ├── middleware/             # Auth, admin, error handling
│   ├── models/                 # Mongoose schemas
│   ├── routes/                 # API route definitions
│   ├── services/               # Email, notifications
│   ├── utils/                  # JWT, validators
│   └── server.js               # Entry point
│
├── frontend/                   # Next.js 14 App
│   ├── app/                    # Pages (App Router)
│   │   ├── admin/              # Admin dashboard
│   │   ├── dashboard/          # User dashboard
│   │   ├── login/              # Auth pages
│   │   ├── predictions/        # Prediction pages
│   │   ├── premium/            # Premium content
│   │   ├── pricing/            # Subscription plans
│   │   └── results/            # Results tracking
│   ├── components/             # Reusable UI components
│   ├── context/                # Auth context
│   ├── services/               # API client
│   └── public/                 # Static assets
```

## 🌐 Frontend Pages

| Page | Route | Description |
|------|-------|-------------|
| Landing | `/` | Hero, featured match, predictions table |
| Free Predictions | `/predictions` | All categories with filters |
| Premium | `/premium` | Gated premium content |
| Results | `/results` | Win/loss tracking |
| Pricing | `/pricing` | 3-tier subscription plans |
| Login | `/login` | Authentication |
| Register | `/register` | User registration |
| Dashboard | `/dashboard` | Performance overview |
| Profile | `/dashboard/profile` | Account settings |
| Subscription | `/dashboard/subscription` | Plan management |
| Payments | `/dashboard/payments` | Payment history |
| Admin | `/admin` | Analytics & management |
| Admin Users | `/admin/users` | User management |
| Admin Predictions | `/admin/predictions` | Prediction CRUD |
| Admin Payments | `/admin/payments` | Payment tracking |
| Admin Settings | `/admin/settings` | Platform config |

## 🔌 API Endpoints

> **Note:** All `/api/*` requests require the custom API key sent via the `x-api-key` header. The frontend automatically attaches this from `NEXT_PUBLIC_API_KEY`, validated against the backend's `API_KEY` env var.

### Authentication
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Sign in (JWT)
- `POST /api/auth/request-password-reset` - Forgot password
- `POST /api/auth/reset-password` - Reset password

### Predictions
- `GET /api/predictions` - List predictions (filterable)
- `GET /api/predictions/featured` - Featured match
- `GET /api/predictions/stats` - Win rate stats

### User
- `GET /api/users/me` - Get profile
- `PUT /api/users/profile` - Update profile
- `PUT /api/users/change-password` - Change password
- `GET /api/users/dashboard` - Dashboard stats

### Admin
- `GET /api/admin/summary` - Overview stats
- `GET /api/admin/analytics` - Detailed analytics
- `GET /api/admin/users` - User management
- `POST /api/admin/predictions` - Create prediction
- `GET /api/admin/payments` - Payment tracking

## 💳 Payment Providers
- M-Pesa (STK Push)
- Flutterwave
- PesaPal
- Stripe
- Coinbase (Crypto)

## 🏦 PesaPal Integration

PesaPal is integrated as a hosted checkout provider. When a user selects **PesaPal** in the payment form, the backend:

1. Obtains a PesaPal OAuth 1.0a access token (HMAC-SHA1 signed).
2. Submits an order to PesaPal's `SubmitOrderRequest` API.
3. Returns a hosted `redirect_url` to the frontend, which redirects the user to PesaPal to complete payment.
4. Verifies the transaction via the PesaPal IPN webhook and/or a status-check endpoint, then activates the subscription.

### Environment Variables (backend/.env)
```
PESAPAL_CONSUMER_KEY=<your_pesapal_consumer_key>
PESAPAL_CONSUMER_SECRET=<your_pesapal_consumer_secret>
PESAPAL_ENV=live            # or "sandbox"
PESAPAL_CALLBACK_URL=http://localhost:3000/payments/pesapal/callback
PESAPAL_IPN_URL=http://localhost:4000/api/payments/pesapal/ipn
PESAPAL_IPN_SECRET=<optional shared secret for IPN signature verification>
```
> ⚠️ **Never commit these credentials.** They live in the gitignored `backend/.env`.

### Endpoints
- `POST /api/payments` with `{ provider: 'pesapal', amount, email, ... }` → returns `{ checkoutUrl, reference, orderTrackingId }`.
- `POST /api/payments/pesapal/ipn` — PesaPal IPN webhook (raw body, signature-verified).
- `GET /api/payments/pesapal/status/:reference` — frontend status check after callback redirect.

### Webhook / IPN Setup
In your PesaPal dashboard, register the **IPN URL** as `https://<your-backend>/api/payments/pesapal/ipn`. Configure the PesaPal callback URL to point to your frontend `/payments/pesapal/callback` page.

## 🎨 Design Features
- Dark professional sports analytics theme
- Premium gradients & glassmorphism
- Animated confidence bars & counters
- Mobile-responsive layout
- 6 prediction categories
- Real-time subscription management

## 🔒 Security
- JWT authentication
- bcrypt password hashing
- Rate limiting
- Helmet security headers
- MongoDB injection sanitization
- Input validation
- Account lockout protection

## 📄 License
Private - All rights reserved
