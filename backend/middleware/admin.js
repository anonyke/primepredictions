import User from '../models/User.js';

export async function requireAdmin(req, res, next) {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const user = await User.findById(req.user.id).select('role isActive');
    
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    if (!user.isActive) {
      return res.status(403).json({ error: 'Account is deactivated' });
    }

    if (user.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required. You do not have permission to perform this action.' });
    }

    req.user.role = 'admin'; // Ensure role is set
    next();
  } catch (err) {
    console.error('Admin middleware error:', err);
    return res.status(500).json({ error: 'Authorization error' });
  }
}

