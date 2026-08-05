const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\+?[\d\s-]{10,15}$/;
const PASSWORD_MIN_LENGTH = 6;
const PASSWORD_MAX_LENGTH = 128;

export function validateEmail(email) {
  if (!email || typeof email !== 'string') {
    return { valid: false, error: 'Email is required' };
  }
  if (!EMAIL_REGEX.test(email.trim())) {
    return { valid: false, error: 'Invalid email format' };
  }
  if (email.length > 320) {
    return { valid: false, error: 'Email is too long' };
  }
  return { valid: true, error: null };
}

export function validatePassword(password) {
  if (!password) {
    return { valid: false, error: 'Password is required' };
  }
  if (password.length < PASSWORD_MIN_LENGTH) {
    return { valid: false, error: `Password must be at least ${PASSWORD_MIN_LENGTH} characters` };
  }
  if (password.length > PASSWORD_MAX_LENGTH) {
    return { valid: false, error: `Password must be less than ${PASSWORD_MAX_LENGTH} characters` };
  }
  return { valid: true, error: null };
}

export function validateName(name) {
  if (!name || typeof name !== 'string') {
    return { valid: false, error: 'Name is required' };
  }
  const trimmed = name.trim();
  if (trimmed.length < 2) {
    return { valid: false, error: 'Name must be at least 2 characters' };
  }
  if (trimmed.length > 100) {
    return { valid: false, error: 'Name is too long' };
  }
  return { valid: true, error: null };
}

export function validatePhone(phone) {
  if (!phone) return { valid: true, error: null }; // Phone is optional
  if (!PHONE_REGEX.test(phone)) {
    return { valid: false, error: 'Invalid phone number format' };
  }
  return { valid: true, error: null };
}

export function validatePrediction(data) {
  const errors = [];

  if (!data.matchName?.home || !data.matchName?.away) {
    errors.push('Match name with home and away teams is required');
  }
  if (!data.league) {
    errors.push('League is required');
  }
  if (!data.category) {
    errors.push('Category is required');
  }
  if (!data.prediction) {
    errors.push('Prediction is required');
  }
  if (!data.odds) {
    errors.push('Odds are required');
  }
  if (data.confidence === undefined || data.confidence < 0 || data.confidence > 100) {
    errors.push('Confidence must be between 0 and 100');
  }
  if (!data.kickoff) {
    errors.push('Kickoff time is required');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export function validatePayment(data) {
  const errors = [];

  if (!data.provider) {
    errors.push('Payment provider is required');
  }
  if (!data.amount || data.amount <= 0) {
    errors.push('Valid amount is required');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export function sanitizeHtml(input) {
  if (typeof input !== 'string') return input;
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

export function sanitizeObject(obj) {
  // Handle primitive strings
  if (typeof obj === 'string') return sanitizeHtml(obj);

  // Handle arrays
  if (Array.isArray(obj)) {
    return obj.map((item) => {
      if (typeof item === 'string') return sanitizeHtml(item);
      if (item && typeof item === 'object') return sanitizeObject(item);
      return item;
    });
  }

  if (!obj || typeof obj !== 'object') return obj;
  const sanitized = {};
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      sanitized[key] = sanitizeHtml(value);
    } else if (Array.isArray(value)) {
      sanitized[key] = value.map((item) => {
        if (typeof item === 'string') return sanitizeHtml(item);
        if (item && typeof item === 'object') return sanitizeObject(item);
        return item;
      });
    } else if (value && typeof value === 'object') {
      sanitized[key] = sanitizeObject(value);
    } else {
      sanitized[key] = value;
    }
  }
  return sanitized;
}

export function escapeRegex(str) {
  if (typeof str !== 'string') return str;
  return str.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
}

