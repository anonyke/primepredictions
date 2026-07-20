import { verifyJWT, getTokenFromHeader } from '../utils/jwt.js';

export function requireAuth(req, res, next) {
  try {
    const token = getTokenFromHeader(req);
    
    if (!token) {
      return res.status(401).json({ error: 'Authentication required. Please provide a valid token.' });
    }

    const decoded = verifyJWT(token);
    
    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role || 'user',
    };
    
    next();
  } catch (err) {
    if (err.message === 'Token has expired') {
      return res.status(401).json({ error: 'Token has expired. Please login again.' });
    }
    if (err.message === 'Invalid token') {
      return res.status(401).json({ error: 'Invalid authentication token.' });
    }
    console.error('Auth middleware error:', err);
    return res.status(500).json({ error: 'Authentication error.' });
  }
}

export function optionalAuth(req, res, next) {
  try {
    const token = getTokenFromHeader(req);
    
    if (token) {
      try {
        const decoded = verifyJWT(token);
        req.user = {
          id: decoded.id,
          email: decoded.email,
          role: decoded.role || 'user',
        };
      } catch {
        // Token invalid but we don't block the request
        req.user = null;
      }
    } else {
      req.user = null;
    }
    
    next();
  } catch {
    req.user = null;
    next();
  }
}

