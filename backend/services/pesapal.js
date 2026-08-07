import crypto from 'crypto';

// PesaPal API v3 integration service.
// Uses OAuth 1.0a (HMAC-SHA1) to obtain an access token, then submits an order
// to generate a hosted checkout URL and verifies transaction status via IPN/API.

const LIVE_BASE = 'https://pay.pesapal.com/v3';
const SANDBOX_BASE = 'https://cybqa.pesapal.com/pesapalv3';

function getBaseUrl() {
  return process.env.PESAPAL_ENV === 'sandbox' ? SANDBOX_BASE : LIVE_BASE;
}

function percentEncode(str) {
  return encodeURIComponent(str)
    .replace(/[!'()*]/g, (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`);
}

function generateNonce() {
  return crypto.randomBytes(16).toString('hex');
}

// Build the OAuth 1.0a Authorization header for a request.
function buildOAuthHeader(method, url, params = {}) {
  const consumerKey = process.env.PESAPAL_CONSUMER_KEY;
  const consumerSecret = process.env.PESAPAL_CONSUMER_SECRET;

  const oauth = {
    oauth_consumer_key: consumerKey,
    oauth_nonce: generateNonce(),
    oauth_signature_method: 'HMAC-SHA1',
    oauth_timestamp: Math.floor(Date.now() / 1000).toString(),
    oauth_version: '1.0',
    ...params,
  };

  // Build base string: METHOD & encodedURL & encodedParamString
  const allParams = { ...oauth };
  delete allParams.oauth_signature;

  const paramString = Object.keys(allParams)
    .sort()
    .map((k) => `${percentEncode(k)}=${percentEncode(allParams[k])}`)
    .join('&');

  const baseString = `${method.toUpperCase()}&${percentEncode(url)}&${percentEncode(paramString)}`;
  const signingKey = `${percentEncode(consumerSecret)}&`;
  const signature = crypto.createHmac('sha1', signingKey).update(baseString).digest('base64');

  const headerParams = {
    ...oauth,
    oauth_signature: signature,
  };

  return 'OAuth ' + Object.keys(headerParams)
    .map((k) => `${percentEncode(k)}="${percentEncode(headerParams[k])}"`)
    .join(', ');
}

// Get an access token from PesaPal.
export async function getAccessToken() {
  const url = `${getBaseUrl()}/api/Auth/RequestToken`;
  const authHeader = buildOAuthHeader('POST', url);

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader,
    },
    body: JSON.stringify({}),
  });

  const text = await res.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    data = { raw: text };
  }

  if (!res.ok) {
    throw new Error(`PesaPal token request failed (${res.status}): ${text}`);
  }

  const token = data.token || data.access_token || data.token_type === 'Bearer' ? data.access_token : null;
  if (!token) {
    throw new Error(`PesaPal token not found in response: ${text}`);
  }

  // Cache token + expiry
  if (data.expires_in) {
    global.__pesapalToken = { value: token, expiry: Date.now() + (data.expires_in - 60) * 1000 };
  } else {
    global.__pesapalToken = { value: token, expiry: Date.now() + 55 * 60 * 1000 };
  }

  return token;
}

// Get a cached or fresh access token.
export async function getCachedAccessToken() {
  if (global.__pesapalToken && global.__pesapalToken.expiry > Date.now()) {
    return global.__pesapalToken.value;
  }
  return getAccessToken();
}

// Submit an order to PesaPal and return the hosted checkout URL.
export async function createPesapalOrder({
  amount,
  currency = 'KES',
  description = 'PrimePredict Premium Subscription',
  reference,
  email,
  phoneNumber,
  firstName,
  lastName,
}) {
  const token = await getCachedAccessToken();
  const url = `${getBaseUrl()}/api/Transactions/SubmitOrderRequest`;

  const callbackUrl = process.env.PESAPAL_CALLBACK_URL || 'http://localhost:3000/payments/callback';
  const ipnUrl = process.env.PESAPAL_IPN_URL || undefined;

  const payload = {
    id: reference,
    currency,
    amount: String(amount),
    description,
    callback_url: callbackUrl,
    notification_id: ipnUrl,
    branch: 'PrimePredict',
    source: 'WEB',
  };

  const billingAddress = {
    email_address: email || 'customer@primepredict.com',
  };
  if (firstName) billingAddress.first_name = firstName;
  if (lastName) billingAddress.last_name = lastName;
  if (phoneNumber) billingAddress.phone_number = phoneNumber;
  if (email) billingAddress.country_code = 'KE';

  payload.billing_address = billingAddress;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  const text = await res.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    data = { raw: text };
  }

  if (!res.ok) {
    throw new Error(`PesaPal order submission failed (${res.status}): ${text}`);
  }

  const redirectUrl = data.redirect_url || data.redirectUrl || data.url;
  if (!redirectUrl) {
    throw new Error(`PesaPal order created but no redirect URL found: ${text}`);
  }

  return {
    orderTrackingId: data.order_tracking_id || data.orderTrackingId || data.tracking_id,
    merchantReference: data.merchant_reference || reference,
    redirectUrl,
    status: data.status || 'PENDING',
  };
}

// Get transaction status by tracking ID.
export async function getTransactionStatus(orderTrackingId) {
  const token = await getCachedAccessToken();
  const url = `${getBaseUrl()}/api/Transactions/GetTransactionStatus?orderTrackingId=${encodeURIComponent(orderTrackingId)}`;

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  const text = await res.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    data = { raw: text };
  }

  if (!res.ok) {
    throw new Error(`PesaPal status request failed (${res.status}): ${text}`);
  }

  return data;
}

// IPN signature verification (PesaPal uses a fixed shared IPN secret).
export function verifyIpnSignature(payload, signature) {
  if (!signature) return false;
  const ipnSecret = process.env.PESAPAL_IPN_SECRET || '';
  if (!ipnSecret) {
    // If no secret configured, fall back to allowing (log warning in controller).
    return true;
  }
  const raw =
    typeof payload === 'string'
      ? payload
      : JSON.stringify(payload);
  const expected = crypto.createHmac('sha256', ipnSecret).update(raw).digest('base64');
  return signature === expected;
}
