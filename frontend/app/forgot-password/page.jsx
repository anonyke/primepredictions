'use client';

import { useState } from 'react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const response = await fetch(`${apiUrl}/api/auth/request-password-reset`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      setMessage(data.message || (response.ok ? 'Check your email for reset instructions.' : 'Unable to request a reset.'));
    } catch {
      setMessage('Unable to reach the server. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="min-h-screen flex items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4 rounded-lg bg-gray-800 p-6">
        <h1 className="text-2xl font-bold">Reset your password</h1>
        <p className="text-sm text-gray-300">Enter your account email and we will send reset instructions.</p>
        <input type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" className="w-full rounded p-3 text-black" />
        <button disabled={loading} className="w-full rounded bg-green-400 p-3 font-semibold text-black disabled:opacity-60">{loading ? 'Sending...' : 'Send reset link'}</button>
        {message && <p className="text-sm text-gray-200">{message}</p>}
        <a href="/login" className="block text-sm text-green-400">Back to login</a>
      </form>
    </section>
  );
}