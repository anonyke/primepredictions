import Notification from '../models/Notification.js';

export async function createNotification({ userId, type, title, message, data = {}, link, priority = 'normal' }) {
  try {
    const notification = await Notification.create({
      userId,
      type,
      title,
      message,
      data,
      link,
      priority,
    });

    return notification;
  } catch (err) {
    console.error('Create notification error:', err);
    return null;
  }
}

export async function notifyPredictionResult(userId, prediction) {
  const result = prediction.status === 'won' ? 'won' : 'lost';
  const match = `${prediction.matchName.home} vs ${prediction.matchName.away}`;

  return createNotification({
    userId,
    type: 'result',
    title: `Prediction ${result === 'won' ? 'Won' : 'Lost'}`,
    message: `Your prediction for ${match} (${prediction.prediction} @ ${prediction.odds}) has ${result === 'won' ? 'won' : 'lost'}.`,
    data: { predictionId: prediction._id, result, match },
    link: `/results`,
    priority: result === 'won' ? 'high' : 'normal',
  });
}

export async function notifyNewPrediction(userId, prediction) {
  const match = `${prediction.matchName.home} vs ${prediction.matchName.away}`;

  return createNotification({
    userId,
    type: 'prediction',
    title: 'New Prediction Available',
    message: `New ${prediction.isPremium ? 'premium' : 'free'} prediction: ${match} - ${prediction.prediction} @ ${prediction.odds}`,
    data: { predictionId: prediction._id, match, isPremium: prediction.isPremium },
    link: prediction.isPremium ? '/premium' : '/predictions',
    priority: prediction.isPremium ? 'high' : 'normal',
  });
}

export async function notifyPaymentReceived(userId, payment) {
  return createNotification({
    userId,
    type: 'payment',
    title: 'Payment Received',
    message: `Payment of KES ${payment.amount} via ${payment.provider} has been received successfully. Reference: ${payment.reference}`,
    data: { paymentId: payment._id, amount: payment.amount, provider: payment.provider },
    link: '/dashboard/payments',
    priority: 'high',
  });
}

export async function notifySubscriptionStatus(userId, subscription, action) {
  const messages = {
    activated: `Your ${subscription.plan} premium plan is now active!`,
    expiring: `Your ${subscription.plan} plan expires in 3 days. Renew now to keep your premium access.`,
    expired: 'Your premium subscription has expired. Renew to regain access to premium predictions.',
    cancelled: 'Your subscription has been cancelled.',
  };

  return createNotification({
    userId,
    type: 'subscription',
    title: `Subscription ${action.charAt(0).toUpperCase() + action.slice(1)}`,
    message: messages[action] || `Subscription status updated: ${action}`,
    data: { subscriptionId: subscription._id, plan: subscription.plan, action },
    link: '/dashboard/subscription',
    priority: action === 'expired' ? 'urgent' : 'normal',
  });
}

export async function notifyPromotion(userId, promo) {
  return createNotification({
    userId,
    type: 'promotion',
    title: `Special Offer: ${promo.title}`,
    message: promo.message,
    data: { promoId: promo._id, code: promo.code },
    link: '/pricing',
    priority: 'normal',
  });
}

export async function notifySystem(userId, message, level = 'info') {
  return createNotification({
    userId,
    type: 'system',
    title: level === 'warning' ? '⚠️ System Notice' : 'System Update',
    message,
    priority: level === 'warning' ? 'urgent' : 'normal',
  });
}

export async function notifyAllUsers(userIds, { type, title, message, data }) {
  const notifications = userIds.map(userId => ({
    userId,
    type,
    title,
    message,
    data,
  }));

  try {
    await Notification.insertMany(notifications);
    return { success: true, count: notifications.length };
  } catch (err) {
    console.error('Bulk notification error:', err);
    return { success: false, error: err.message };
  }
}

export async function markAsRead(notificationId) {
  try {
    const notification = await Notification.findByIdAndUpdate(
      notificationId,
      { isRead: true, readAt: new Date() },
      { new: true }
    );
    return notification;
  } catch (err) {
    console.error('Mark as read error:', err);
    return null;
  }
}

export async function getUnreadCount(userId) {
  try {
    return await Notification.countDocuments({ userId, isRead: false });
  } catch {
    return 0;
  }
}

export async function getUserNotifications(userId, { page = 1, limit = 20 } = {}) {
  try {
    const skip = (page - 1) * limit;
    const [notifications, total] = await Promise.all([
      Notification.find({ userId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Notification.countDocuments({ userId }),
    ]);

    return {
      notifications,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    };
  } catch (err) {
    console.error('Get notifications error:', err);
    return { notifications: [], pagination: { page: 1, limit, total: 0, pages: 0 } };
  }
}

