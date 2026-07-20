import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import {
  createPayment,
  processPayment,
  getPaymentHistory,
  verifyPayment,
  handleWebhook,
} from '../controllers/paymentController.js';

const router = Router();

router.post('/', requireAuth, createPayment);
router.post('/:paymentId/process', requireAuth, processPayment);
router.get('/history', requireAuth, getPaymentHistory);
router.get('/verify/:reference', requireAuth, verifyPayment);
router.post('/webhook/:provider', handleWebhook);

export default router;

