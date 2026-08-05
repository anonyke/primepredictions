'use client';

import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useAuth } from '../../context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      try {
        const storedUser = window.localStorage.getItem('pp_user');
        const user = storedUser ? JSON.parse(storedUser) : null;
        if (user?.role === 'admin') {
          window.location.href = '/admin';
        } else {
          window.location.href = '/dashboard';
        }
      } catch (err) {}
    }
  }, [isAuthenticated]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter your email and password');
      return;
    }

    setLoading(true);
    const result = await login(email, password);

    if (result.success) {
      if (result.user?.role === 'admin') {
        window.location.href = '/admin';
      } else {
        window.location.href = '/dashboard';
      }
    } else {
      setError(result.error || 'Login failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <main style={{ padding: '100px 20px 60px', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <div style={{ width: '100%', maxWidth: 440 }}>
          <div style={{ background: '#131849', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20, padding: '40px 32px' }}>
            <div style={{ textAlign: 'center', marginBottom: 32 }}>
              <div style={{ width: 56, height: 56, borderRadius: 14, background: 'linear-gradient(135deg, #00E5FF, #7C4DFF)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: 24, fontWeight: 800, color: '#0A0E27' }}>
                PP
              </div>
              <h1 style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 6 }}>
                Welcome Back
              </h1>
              <p style={{ color: '#6B7394', fontSize: 14 }}>
                Sign in to PrimePredict
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group" style={{ marginBottom: 16 }}>
                <label style={{ color: '#B0B8D1', fontSize: 14, fontWeight: 500, marginBottom: 8, display: 'block' }}>
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  style={{ width: '100%', padding: '14px 16px', background: '#0F1535', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, color: '#fff', fontSize: 15, fontFamily: 'Inter, sans-serif', outline: 'none', boxSizing: 'border-box' }}
                  onFocus={(e) => e.target.style.borderColor = 'rgba(0,229,255,0.4)'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                />
              </div>

              <div className="form-group" style={{ marginBottom: 20 }}>
                <label style={{ color: '#B0B8D1', fontSize: 14, fontWeight: 500, marginBottom: 8, display: 'block' }}>
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  style={{ width: '100%', padding: '14px 16px', background: '#0F1535', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, color: '#fff', fontSize: 15, fontFamily: 'Inter, sans-serif', outline: 'none', boxSizing: 'border-box' }}
                  onFocus={(e) => e.target.style.borderColor = 'rgba(0,229,255,0.4)'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                />
              </div>

              {error && (
                <div style={{ padding: '12px 16px', borderRadius: 10, background: 'rgba(255,82,82,0.1)', border: '1px solid rgba(255,82,82,0.2)', color: '#FF5252', fontSize: 13, marginBottom: 16 }}>
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                style={{ width: '100%', padding: '14px', borderRadius: 10, border: 'none', background: loading ? 'rgba(0,229,255,0.3)' : 'linear-gradient(135deg, #00E5FF, #7C4DFF)', color: '#0A0E27', fontSize: 15, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'Inter, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
              >
                {loading ? (
                  <>
                    <span style={{ width: 18, height: 18, borderRadius: '50%', border: '2px solid rgba(10,14,39,0.3)', borderTopColor: '#0A0E27', animation: 'spinner2 0.6s linear infinite', display: 'inline-block' }} />
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 16 }}>
              <a href="/forgot-password" style={{ color: '#6B7394', fontSize: 13, textDecoration: 'none', fontWeight: 500 }}>
                Forgot password?
              </a>
              <a href="/register" style={{ color: '#00E5FF', fontSize: 13, textDecoration: 'none', fontWeight: 600 }}>
                Create account
              </a>
            </div>

            <style>{`@keyframes spinner2 { to { transform: rotate(360deg); } }`}</style>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
