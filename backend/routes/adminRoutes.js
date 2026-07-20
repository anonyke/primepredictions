import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { requireAdmin } from '../middleware/admin.js';
import {
  adminSummary,
  getUsers,
  updateUserStatus,
  deleteUser,
  getAnalytics,
  getSubscriptions,
} from '../controllers/adminController.js';
import {
  createPrediction,
  updatePrediction,
  deletePrediction,
  updatePredictionResult,
} from '../controllers/predictionController.js';
import { getAllPayments } from '../controllers/paymentController.js';

const router = Router();

// All admin routes require auth + admin role
router.use(requireAuth, requireAdmin);

// Dashboard & Analytics
router.get('/summary', adminSummary);
router.get('/analytics', getAnalytics);

// User management
router.get('/users', getUsers);
router.put('/users/:userId/status', updateUserStatus);
router.delete('/users/:userId', deleteUser);

// Prediction management
router.post('/predictions', createPrediction);
router.put('/predictions/:id', updatePrediction);
router.put('/predictions/:id/result', updatePredictionResult);
router.delete('/predictions/:id', deletePrediction);

// Payment management
router.get('/payments', getAllPayments);

// Subscription management
router.get('/subscriptions', getSubscriptions);

export default router;

