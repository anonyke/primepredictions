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
