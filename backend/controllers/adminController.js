import User from '../models/User.js';
import Prediction from '../models/Prediction.js';
import Payment from '../models/Payment.js';
import Subscription from '../models/Subscription.js';
import { escapeRegex } from '../utils/validators.js';

export async function adminSummary(req, res) {
  try {
    const [userCount, predictionCount, paymentCount, subscriptionCount, revenue] = await Promise.all([
      User.countDocuments({ role: 'user' }),
      Prediction.countDocuments(),
      Payment.countDocuments({ status: 'completed' }),
      Subscription.countDocuments({ status: 'active' }),
      Payment.aggregate([
        { $match: { status: 'completed' } },
        { $group: { _id: null, total: { $sum: '$amount' } } },
      ]),
    ]);

    res.json({
      stats: {
        totalUsers: userCount,
        totalPredictions: predictionCount,
        totalPayments: paymentCount,
        activeSubscriptions: subscriptionCount,
        totalRevenue: revenue[0]?.total || 0,
      },
    });
  } catch (err) {
    console.error('Admin summary error:', err);
    res.status(500).json({ error: 'Failed to fetch admin summary' });
  }
}

export async function getUsers(req, res) {
  try {
    const { page = 1, limit = 50, search, role, status } = req.query;
    const query = {};

    if (search) {
      const safe = escapeRegex(String(search));
      query.$or = [
        { name: { $regex: safe, $options: 'i' } },
        { email: { $regex: safe, $options: 'i' } },
      ];
    }
    if (role) query.role = role;
    if (status === 'active') query.isActive = true;
    if (status === 'inactive') query.isActive = false;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await User.countDocuments(query);

    const users = await User.find(query)
      .select('-passwordHash -resetPasswordToken -resetPasswordExpires -verificationToken')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .lean();

    res.json({
      users,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (err) {
    console.error('Get users error:', err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
}

export async function updateUserStatus(req, res) {
  try {
    const { userId } = req.params;
    const { isActive, role } = req.body;

    const updates = {};
    if (isActive !== undefined) updates.isActive = isActive;
    if (role) updates.role = role;

    const user = await User.findByIdAndUpdate(userId, updates, { new: true })
      .select('-passwordHash');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user });
  } catch (err) {
    console.error('Update user status error:', err);
    res.status(500).json({ error: 'Failed to update user' });
  }
}

export async function deleteUser(req, res) {
  try {
    const { userId } = req.params;
    await User.findByIdAndUpdate(userId, { isActive: false });
    res.json({ message: 'User deactivated successfully' });
  } catch (err) {
    console.error('Delete user error:', err);
    res.status(500).json({ error: 'Failed to deactivate user' });
  }
}

export async function getAnalytics(req, res) {
  try {
    const { days = 30 } = req.query;
    const since = new Date(Date.now() - parseInt(days) * 86400000);

    const [registrations, predictionsByDay, revenueByDay, topPredictions] = await Promise.all([
      User.aggregate([
        { $match: { createdAt: { $gte: since } } },
        { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } }, count: { $sum: 1 } } },
        { $sort: { _id: 1 } },
      ]),
      Prediction.aggregate([
        { $match: { createdAt: { $gte: since } } },
        { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } }, count: { $sum: 1 } } },
        { $sort: { _id: 1 } },
      ]),
      Payment.aggregate([
        { $match: { status: 'completed', createdAt: { $gte: since } } },
        { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } }, total: { $sum: '$amount' } } },
        { $sort: { _id: 1 } },
      ]),
      Prediction.find({ status: 'won' }).sort({ confidence: -1 }).limit(10).lean(),
    ]);

    const predictionStats = await Prediction.aggregate([
      { $match: { status: { $in: ['won', 'lost'] } } },
      { $group: { _id: '$category', total: { $sum: 1 }, won: { $sum: { $cond: [{ $eq: ['$status', 'won'] }, 1, 0] } } } },
    ]);

    res.json({
      registrations,
      predictionsByDay,
      revenueByDay,
      topPredictions,
      predictionStats: predictionStats.map(s => ({
        ...s,
        winRate: s.total > 0 ? Math.round((s.won / s.total) * 100) : 0,
      })),
    });
  } catch (err) {
    console.error('Analytics error:', err);
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
}

export async function getSubscriptions(req, res) {
  try {
    const { page = 1, limit = 50, status, plan } = req.query;
    const query = {};

    if (status) query.status = status;
    if (plan) query.plan = plan;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await Subscription.countDocuments(query);

    const subscriptions = await Subscription.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .populate('userId', 'name email')
      .lean();

    res.json({
      subscriptions,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (err) {
    console.error('Get subscriptions error:', err);
    res.status(500).json({ error: 'Failed to fetch subscriptions' });
  }
}
