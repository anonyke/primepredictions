import { getAccessToken } from '../services/pesapal.js';

// Use the real service module. Override env to sandbox for a detailed error.
process.env.PESAPAL_ENV = 'sandbox';
process.env.PESAPAL_CONSUMER_KEY = 'RA9tEv8bmjRE5fuu7ai2i/fbC5ifsCYh';
process.env.PESAPAL_CONSUMER_SECRET = 'ohOu1sboblZ9fKaLCYBIDjO/ieo=';

try {
  const token = await getAccessToken();
  console.log('SUCCESS - token obtained:', token);
} catch (err) {
  console.log('FAILED:', err.message);
}
