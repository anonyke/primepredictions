// Production API base URL - standardized on NEXT_PUBLIC_API_URL.
// In production, this MUST be set in Vercel to the deployed backend URL.
// localhost fallback is only used for local development.
const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  (typeof window !== 'undefined' && window.location.hostname === 'localhost'
    ? 'http://localhost:4000'
    : '');
// Custom API key sent to the backend on every request
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || '';

// Helper to resolve the final API base, throwing a clear error in production
// if it was never configured (instead of silently failing with "Failed to fetch").
function resolveApiBase() {
  if (API_BASE) return API_BASE.replace(/\/$/, '');
  throw new Error(
    'API base URL is not configured. Set NEXT_PUBLIC_API_URL in Vercel to your deployed backend URL.'
  );
}

class ApiError extends Error {
  constructor(status, message, details = null) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

async function handleResponse(res) {
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new ApiError(
      res.status,
      data.error || `Request failed with status ${res.status}`,
      data.details
    );
  }

  return data;
}

function getToken() {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem('pp_token');
}

export async function apiFetch(path, { method = 'GET', body, token, headers: extraHeaders = {} } = {}) {
  const authToken = token || getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(API_KEY ? { 'x-api-key': API_KEY } : {}),
    ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
    ...extraHeaders,
  };

  const res = await fetch(`${resolveApiBase()}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  return handleResponse(res);
}

// Auth API
export const authApi = {
  register: (data) => apiFetch('/api/auth/register', { method: 'POST', body: data }),
  login: (data) => apiFetch('/api/auth/login', { method: 'POST', body: data }),
  verifyEmail: (token) => apiFetch(`/api/auth/verify-email/${token}`),
  requestPasswordReset: (email) => apiFetch('/api/auth/request-password-reset', { method: 'POST', body: { email } }),
  resetPassword: (data) => apiFetch('/api/auth/reset-password', { method: 'POST', body: data }),
};

// Predictions API
export const predictionsApi = {
  list: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiFetch(`/api/predictions${query ? `?${query}` : ''}`);
  },
  get: (id) => apiFetch(`/api/predictions/${id}`),
  getFeatured: () => apiFetch('/api/predictions/featured'),
  getStats: () => apiFetch('/api/predictions/stats'),
};

// Payments API
export const paymentsApi = {
  create: (data) => apiFetch('/api/payments', { method: 'POST', body: data }),
  process: (paymentId) => apiFetch(`/api/payments/${paymentId}/process`, { method: 'POST' }),
  history: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiFetch(`/api/payments/history${query ? `?${query}` : ''}`);
  },
  verify: (reference) => apiFetch(`/api/payments/verify/${reference}`),
  // PesaPal status check after callback redirect
  checkPesapalStatus: (reference) => apiFetch(`/api/payments/pesapal/status/${reference}`),
};

// User API
export const userApi = {
  getMe: () => apiFetch('/api/users/me'),
  updateProfile: (data) => apiFetch('/api/users/profile', { method: 'PUT', body: data }),
  changePassword: (data) => apiFetch('/api/users/change-password', { method: 'PUT', body: data }),
  getDashboard: () => apiFetch('/api/users/dashboard'),
  getNotifications: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiFetch(`/api/users/notifications${query ? `?${query}` : ''}`);
  },
  markNotificationRead: (id) => apiFetch(`/api/users/notifications/${id}/read`, { method: 'PUT' }),
  markAllNotificationsRead: () => apiFetch('/api/users/notifications/read-all', { method: 'PUT' }),
  getSubscription: () => apiFetch('/api/users/subscription'),
  cancelSubscription: () => apiFetch('/api/users/subscription/cancel', { method: 'POST' }),
};

// Admin API
export const adminApi = {
  getSummary: () => apiFetch('/api/admin/summary'),
  getAnalytics: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiFetch(`/api/admin/analytics${query ? `?${query}` : ''}`);
  },
  getUsers: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiFetch(`/api/admin/users${query ? `?${query}` : ''}`);
  },
  updateUserStatus: (userId, data) => apiFetch(`/api/admin/users/${userId}/status`, { method: 'PUT', body: data }),
  deleteUser: (userId) => apiFetch(`/api/admin/users/${userId}`, { method: 'DELETE' }),
  createPrediction: (data) => apiFetch('/api/admin/predictions', { method: 'POST', body: data }),
  updatePrediction: (id, data) => apiFetch(`/api/admin/predictions/${id}`, { method: 'PUT', body: data }),
  updatePredictionResult: (id, data) => apiFetch(`/api/admin/predictions/${id}/result`, { method: 'PUT', body: data }),
  deletePrediction: (id) => apiFetch(`/api/admin/predictions/${id}`, { method: 'DELETE' }),
  getPayments: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiFetch(`/api/admin/payments${query ? `?${query}` : ''}`);
  },
  getSubscriptions: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiFetch(`/api/admin/subscriptions${query ? `?${query}` : ''}`);
  },
};

export default apiFetch;
