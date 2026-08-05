import User from '../models/User.js';
import Prediction from '../models/Prediction.js';
import Payment from '../models/Payment.js';
import Notification from '../models/Notification.js';
import Subscription from '../models/Subscription.js';
import { sanitizeHtml, sanitizeObject } from '../utils/validators.js';

export async function getMe(req, res) {
  try {
    const user = await User.findById(req.user.id)
      .select('-passwordHash -resetPasswordToken -resetPasswordExpires -verificationToken')
      .lean();

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user });
  } catch (err) {
    console.error('Get user error:', err);
    res.status(500).json({ error: 'Failed to fetch user profile' });
  }
}

export async function updateProfile(req, res) {
  try {
    const { name, phone, avatar, preferences } = req.body;
    const updates = {};

    if (name) updates.name = sanitizeHtml(String(name));
    if (phone !== undefined) updates.phone = sanitizeHtml(String(phone));
    if (avatar !== undefined) updates.avatar = sanitizeHtml(String(avatar));
    if (preferences) updates.preferences = sanitizeObject(preferences);

    const user = await User.findByIdAndUpdate(req.user.id, updates, {
      new: true,
      runValidators: true,
    }).select('-passwordHash');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user });
  } catch (err) {
    console.error('Update profile error:', err);
    res.status(500).json({ error: 'Failed to update profile' });
  }
}

export async function changePassword(req, res) {
  try {
    const bcrypt = await import('bcryptjs');
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Current and new passwords are required' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ error: 'New password must be at least 6 characters' });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Current password is incorrect' });
    }

    const salt = await bcrypt.genSalt(12);
    user.passwordHash = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    console.error('Change password error:', err);
    res.status(500).json({ error: 'Failed to change password' });
  }
}

export async function getDashboardStats(req, res) {
  try {
    const userId = req.user.id;

    const predictions = await Prediction.find({ createdBy: userId });
    const total = predictions.length;
    const won = predictions.filter(p => p.status === 'won').length;
    const lost = predictions.filter(p => p.status === 'lost').length;
    const pending = predictions.filter(p => p.status === 'pending').length;

    const subscription = await Subscription.findOne({ userId, status: 'active' }).lean();
    const payments = await Payment.find({ userId }).sort({ createdAt: -1 }).limit(5).lean();
    const unreadNotifications = await Notification.countDocuments({ userId, isRead: false });

    res.json({
      stats: {
        totalPredictions: total,
        won,
        lost,
        pending,
        winRate: total > 0 ? Math.round((won / (won + lost)) * 100) : 0,
      },
      subscription,
      recentPayments: payments,
      unreadNotifications,
    });
  } catch (err) {
    console.error('Dashboard stats error:', err);
    res.status(500).json({ error: 'Failed to fetch dashboard stats' });
  }
}

export async function getNotifications(req, res) {
  try {
    const { page = 1, limit = 20 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [notifications, total] = await Promise.all([
      Notification.find({ userId: req.user.id })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit))
        .lean(),
      Notification.countDocuments({ userId: req.user.id }),
    ]);

    res.json({
      notifications,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (err) {
    console.error('Notifications error:', err);
    res.status(500).json({ error: 'Failed to fetch notifications' });
  }
}

export async function markNotificationRead(req, res) {
  try {
    const { id } = req.params;
    const notification = await Notification.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      { isRead: true, readAt: new Date() },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ error: 'Notification not found' });
    }

    res.json({ notification });
  } catch (err) {
    console.error('Mark notification error:', err);
    res.status(500).json({ error: 'Failed to mark notification as read' });
  }
}

export async function markAllNotificationsRead(req, res) {
  try {
    await Notification.updateMany(
      { userId: req.user.id, isRead: false },
      { isRead: true, readAt: new Date() }
    );

    res.json({ message: 'All notifications marked as read' });
  } catch (err) {
    console.error('Mark all notifications error:', err);
    res.status(500).json({ error: 'Failed to mark notifications as read' });
  }
}

export async function getSubscription(req, res) {
  try {
    const subscription = await Subscription.findOne({
      userId: req.user.id,
      status: { $in: ['active', 'expired'] },
    }).sort({ createdAt: -1 }).lean();

    res.json({ subscription });
  } catch (err) {
    console.error('Get subscription error:', err);
    res.status(500).json({ error: 'Failed to fetch subscription' });
  }
}

export async function cancelSubscription(req, res) {
  try {
    const subscription = await Subscription.findOneAndUpdate(
      { userId: req.user.id, status: 'active' },
      { status: 'cancelled', cancelledAt: new Date(), autoRenew: false },
      { new: true }
    );

    if (!subscription) {
      return res.status(404).json({ error: 'No active subscription found' });
    }

    res.json({ subscription });
  } catch (err) {
    console.error('Cancel subscription error:', err);
    res.status(500).json({ error: 'Failed to cancel subscription' });
  }
}
