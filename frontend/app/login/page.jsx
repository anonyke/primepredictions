'use client';

import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) { setError('Please fill in all fields'); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); window.location.href = '/dashboard'; }, 1500);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 py-24">
        <div className="w-full max-w-md">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-14 h-14 bg-green-400 rounded-xl flex items-center justify-center text-2xl font-bold text-black mx-auto mb-4">PP</div>
              <h1 className="text-2xl font-bold mb-1">Welcome Back</h1>
              <p className="text-gray-400 text-sm">Sign in to your PrimePredict account</p>
            </div>

            {/* Social Login */}
            <div className="flex flex-col gap-3 mb-6">
              <button className="flex items-center justify-center gap-3 w-full px-4 py-2.5 border border-gray-700 rounded-lg bg-gray-800 hover:bg-gray-700 text-sm font-medium cursor-pointer transition">
                <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#fff" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#fff" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#fff" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#fff" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                Continue with Google
              </button>
              <button className="flex items-center justify-center gap-3 w-full px-4 py-2.5 border border-gray-700 rounded-lg bg-gray-800 hover:bg-gray-700 text-sm font-medium cursor-pointer transition">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#fff"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                Continue with X (Twitter)
              </button>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <hr className="flex-1 border-gray-800" />
              <span className="text-gray-500 text-xs uppercase">or sign in with email</span>
              <hr className="flex-1 border-gray-800" />
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="text-gray-300 text-sm font-medium block mb-1.5">Email Address</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com"
                  className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm outline-none focus:border-green-400 transition placeholder-gray-500" />
              </div>
              <div className="mb-4">
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-gray-300 text-sm font-medium">Password</label>
                  <a href="#" className="text-green-400 text-xs no-underline">Forgot password?</a>
                </div>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password"
                  className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm outline-none focus:border-green-400 transition placeholder-gray-500" />
              </div>

              <label className="flex items-center gap-2 mb-5 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 accent-green-400 rounded" />
                <span className="text-gray-400 text-sm">Remember me</span>
              </label>

              {error && (
                <div className="px-4 py-2.5 bg-red-900/30 border border-red-800 rounded-lg text-red-400 text-sm mb-4">{error}</div>
              )}

              <button type="submit" disabled={loading}
                className="w-full px-4 py-2.5 bg-green-400 text-black font-semibold rounded-lg hover:bg-green-300 disabled:opacity-60 disabled:cursor-not-allowed transition text-sm cursor-pointer">
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <p className="text-gray-400 text-sm text-center mt-6">
              Don&apos;t have an account? <a href="/register" className="text-green-400 font-medium no-underline">Sign Up</a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
