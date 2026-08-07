'use client';

import { useState } from 'react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

try {
      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL ||
        process.env.NEXT_PUBLIC_API_BASE_URL ||
        (typeof window !== 'undefined' && window.location.hostname === 'localhost'
          ? 'http://localhost:4000'
          : '');
      const apiKey = process.env.NEXT_PUBLIC_API_KEY || '';
      const response = await fetch(`${apiUrl.replace(/\/$/, '')}/api/auth/request-password-reset`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(apiKey ? { 'x-api-key': apiKey } : {}),
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (response.ok) {
        setSent(true);
        setMessage('Check your email for reset instructions.');
      } else {
        setMessage(data.message || 'Unable to request a reset.');
      }
    } catch {
      setMessage('Unable to reach the server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
      {/* Background orbs */}
      <div className="absolute top-20 -left-20 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,229,255,0.1), transparent 70%)' }} />
      <div className="absolute bottom-20 -right-20 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(124,77,255,0.1), transparent 70%)' }} />

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <a href="/" className="inline-flex items-center gap-2 text-white font-bold text-xl no-underline mb-3">
            <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-violet-500 text-black text-lg font-extrabold shadow-[0_0_24px_rgba(0,229,255,0.3)]">
              PP
            </span>
            <span className="font-display tracking-tight">
              Prime<span className="text-gradient">Predict</span>
            </span>
          </a>
          <h1 className="text-white text-2xl font-extrabold mb-1" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
            Reset Password
          </h1>
          <p className="text-sm m-0" style={{ color: '#6B7394' }}>
            Enter your email and we&apos;ll send you reset instructions
          </p>
        </div>

        {/* Auth Card */}
        <div
          className="rounded-3xl p-8"
          style={{
            background: 'linear-gradient(135deg, rgba(19,24,73,0.95), rgba(28,34,96,0.9))',
            border: '1px solid rgba(255,255,255,0.07)',
            boxShadow: '0 16px 48px rgba(0,0,0,0.4)',
          }}
        >
          {sent ? (
            <div className="text-center">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 text-2xl"
                style={{ background: 'rgba(0,229,255,0.1)', border: '1px solid rgba(0,229,255,0.2)' }}
              >
                ✅
              </div>
              <h3 className="text-white text-lg font-bold mb-2" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                Email Sent!
              </h3>
              <p className="text-sm mb-6" style={{ color: '#B0B8D1' }}>
                Check <strong className="text-white">{email}</strong> for password reset instructions. The link expires in 1 hour.
              </p>
              <a
                href="/login"
                className="inline-block py-3 px-6 rounded-xl text-sm font-bold no-underline transition-opacity hover:opacity-90"
                style={{ background: 'linear-gradient(135deg, #00E5FF, #7C4DFF)', color: '#0A0E27' }}
              >
                Back to Login
              </a>
            </div>
          ) : (
            <>
              {message && (
                <div
                  className="px-4 py-3 rounded-xl text-[13px] font-medium mb-5 animate-slideDown"
                  style={{
                    background: message.includes('Check') ? 'rgba(0,230,118,0.1)' : 'rgba(255,82,82,0.1)',
                    border: `1px solid ${message.includes('Check') ? 'rgba(0,230,118,0.2)' : 'rgba(255,82,82,0.2)'}`,
                    color: message.includes('Check') ? '#00E676' : '#FF5252',
                  }}
                >
                  {message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#B0B8D1' }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full py-3 px-4 rounded-xl text-sm outline-none transition-colors"
                    style={{ background: '#0F1535', border: '1px solid rgba(255,255,255,0.08)', color: '#fff' }}
                    onFocus={(e) => e.target.style.borderColor = 'rgba(0,229,255,0.4)'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl text-sm font-bold cursor-pointer border-none transition-all hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
                  style={{ background: 'linear-gradient(135deg, #00E5FF, #7C4DFF)', color: '#0A0E27', boxShadow: '0 0 20px rgba(0,229,255,0.2)' }}
                >
                  {loading ? 'Sending...' : 'Send Reset Link'}
                </button>
              </form>

              <div className="mt-6 pt-6 text-center border-t border-white/5">
                <p className="text-sm" style={{ color: '#6B7394' }}>
                  Remember your password?{' '}
                  <a href="/login" className="font-semibold no-underline transition-colors" style={{ color: '#00E5FF' }}>
                    Sign In
                  </a>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

