import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import {
  createPayment,
  processPayment,
  getPaymentHistory,
  verifyPayment,
  handleWebhook,
  handlePesapalIpn,
  checkPesapalStatus,
} from '../controllers/paymentController.js';

const router = Router();

router.post('/', requireAuth, createPayment);
router.post('/:paymentId/process', requireAuth, processPayment);
router.get('/history', requireAuth, getPaymentHistory);
router.get('/verify/:reference', requireAuth, verifyPayment);
router.post('/webhook/:provider', handleWebhook);

// PesaPal routes
// IPN webhook comes from PesaPal server (no auth/api key enforced - must be reachable)
router.post('/pesapal/ipn', handlePesapalIpn);
// Status check after callback redirect (frontend calls this)
router.get('/pesapal/status/:reference', requireAuth, checkPesapalStatus);

export default router;

