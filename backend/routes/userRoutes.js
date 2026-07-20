import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { getMe } from '../controllers/userController.js';

const router = Router();

router.get('/me', requireAuth, getMe);

export default router;

