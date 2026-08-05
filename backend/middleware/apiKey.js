// Custom API key middleware
// Validates that requests from the frontend include the correct x-api-key header.
// This acts as an app-level gate for all requests hitting the backend API.

export function requireApiKey(req, res, next) {
  // Read the key at request time so dotenv.config() in server.js has already loaded .env
  const API_KEY = process.env.API_KEY || null;

  // If no API key is configured, allow requests through (backwards compatible)
  if (!API_KEY) {
    return next();
  }

  const apiKey = req.headers['x-api-key'] || (req.headers.authorization && req.headers.authorization.startsWith('Bearer ') ? req.headers.authorization.split(' ')[1] : null);

  if (!apiKey) {
    return res.status(401).json({ error: 'API key is required. Please provide a valid x-api-key header.' });
  }

  if (apiKey !== API_KEY) {
    return res.status(401).json({ error: 'Invalid API key.' });
  }

  next();
}
