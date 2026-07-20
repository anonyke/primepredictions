import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { requireAdmin } from '../middleware/admin.js';
import { adminSummary } from '../controllers/adminController.js';

const router = Router();

router.get('/summary', requireAuth, requireAdmin, adminSummary);

export default router;

