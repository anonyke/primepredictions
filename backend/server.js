import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { connectDB } from './config/database.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import predictionRoutes from './routes/predictionRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import { handleStripeWebhookRaw, handlePesapalIpn } from './controllers/paymentController.js';
import adminRoutes from './routes/adminRoutes.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import { requireApiKey } from './middleware/apiKey.js';

dotenv.config();

const app = express();

// Security middleware
app.use(helmet({
  contentSecurityPolicy: process.env.NODE_ENV === 'production' ? undefined : false,
  crossOriginEmbedderPolicy: false,
}));

// CORS - allow the production frontend domain(s) plus localhost for development.
const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.RENDER_FRONTEND_URL,
  'https://primepredictions-one.vercel.app',
  'http://localhost:3000',
  'http://localhost:4000',
].filter(Boolean);

app.use(cors({
  origin(origin, callback) {
    // Allow requests with no origin (e.g., server-to-server, curl, webhooks).
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    // Allow any Vercel preview/deployment origin for the frontend project.
    if (origin && origin.endsWith('.vercel.app')) {
      return callback(null, true);
    }
    // Allow any Render frontend deployment origin.
    if (origin && origin.endsWith('.onrender.com')) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key'],
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: process.env.NODE_ENV === 'production' ? 100 : 1000,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later.' },
});

app.use('/api/', limiter);

// Special stricter limiter for auth routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { error: 'Too many authentication attempts. Please try again later.' },
});

app.use('/api/auth/login', authLimiter);
app.use('/api/auth/register', authLimiter);

// Stripe webhook needs raw body for signature verification
app.post('/api/payments/webhook/stripe', bodyParser.raw({ type: 'application/json' }), (req, res) => {
  return handleStripeWebhookRaw(req, res);
});

// PesaPal IPN webhook needs raw body for signature verification.
// Registered before the JSON parser and before the API-key gate so PesaPal
// can reach it with its signature-only auth.
app.post('/api/payments/pesapal/ipn', bodyParser.raw({ type: 'application/json' }), (req, res) => {
  req.rawBody = req.body;
  return handlePesapalIpn(req, res);
});

// Body parsing
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Data sanitization against NoSQL injection
app.use(mongoSanitize());

// Health check
app.get('/health', (req, res) => {
  res.json({
    ok: true,
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// API landing response
app.get('/', (req, res) => {
  res.json({
    ok: true,
    service: 'PrimePredict API',
    health: '/health',
  });
});

// API Routes
// Require valid API key for all API requests
app.use('/api', requireApiKey);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/predictions', predictionRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/admin', adminRoutes);

// 404 handler
app.use(notFoundHandler);

// Global error handler
app.use(errorHandler);

// Connect to database and start server
const startServer = async () => {
  await connectDB();

  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`\n🚀 PrimePredict API Server`);
    console.log(`   Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`   Port: ${port}`);
    console.log(`   Health: http://localhost:${port}/health`);
    console.log(`   API: http://localhost:${port}/api\n`);
  });
};

// Vercel serverless: export the app directly (no listen()).
// `@vercel/node` handles requests. Only start a listener when running
// locally (e.g., `node server.js` / pm2) — never in serverless.
const isServerless =
  process.env.VERCEL === '1' ||
  process.env.AWS_LAMBDA_FUNCTION_NAME ||
  process.env.NOW_REGION;

if (!isServerless) {
  startServer();
}

export default app;

