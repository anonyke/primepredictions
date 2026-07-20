import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import {
  getMe,
  updateProfile,
  changePassword,
  getDashboardStats,
  getNotifications,
  markNotificationRead,
  markAllNotificationsRead,
  getSubscription,
  cancelSubscription,
} from '../controllers/userController.js';

const router = Router();

router.get('/me', requireAuth, getMe);
router.put('/profile', requireAuth, updateProfile);
router.put('/change-password', requireAuth, changePassword);
router.get('/dashboard', requireAuth, getDashboardStats);
router.get('/notifications', requireAuth, getNotifications);
router.put('/notifications/:id/read', requireAuth, markNotificationRead);
router.put('/notifications/read-all', requireAuth, markAllNotificationsRead);
router.get('/subscription', requireAuth, getSubscription);
router.post('/subscription/cancel', requireAuth, cancelSubscription);

export default router;

