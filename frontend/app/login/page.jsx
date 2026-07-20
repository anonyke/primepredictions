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

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    // Simulate login
    setTimeout(() => {
      setLoading(false);
      window.location.href = '/dashboard';
    }, 1500);
  };

  return (
    <div>
      <Navbar />
      <main style={{
        padding: '100px 20px 60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}>
        <div style={{
          width: '100%',
          maxWidth: 440,
        }}>
          <div style={{
            background: '#131849',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 20,
            padding: '40px 32px',
          }}>
            <div style={{ textAlign: 'center', marginBottom: 32 }}>
              <div style={{
                width: 56,
                height: 56,
                borderRadius: 14,
                background: 'linear-gradient(135deg, #00E5FF, #7C4DFF)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
                fontSize: 24,
                fontWeight: 800,
                color: '#0A0E27',
              }}>
                PP
              </div>
              <h1 style={{
                fontFamily: '"Plus Jakarta Sans", sans-serif',
                fontSize: 22,
                fontWeight: 800,
                color: '#fff',
                marginBottom: 6,
              }}>
                Welcome Back
              </h1>
              <p style={{ color: '#6B7394', fontSize: 14 }}>
                Sign in to your PrimePredict account
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label style={{ color: '#B0B8D1', fontSize: 14, fontWeight: 500, marginBottom: 8, display: 'block' }}>
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    background: '#0F1535',
                    border: `1px solid ${error && !email ? 'rgba(255,82,82,0.3)' : 'rgba(255,255,255,0.08)'}`,
                    borderRadius: 10,
                    color: '#fff',
                    fontSize: 15,
                    fontFamily: 'Inter, sans-serif',
                    outline: 'none',
                    boxSizing: 'border-box',
                    transition: 'all 0.3s ease',
                    boxShadow: error && !email ? '0 0 0 3px rgba(255,82,82,0.1)' : 'none',
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'rgba(0,229,255,0.4)'}
                  onBlur={(e) => e.target.style.borderColor = email ? 'rgba(0,229,255,0.2)' : 'rgba(255,255,255,0.08)'}
                />
              </div>

              <div className="form-group">
                <label style={{ color: '#B0B8D1', fontSize: 14, fontWeight: 500, marginBottom: 8, display: 'block' }}>
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    background: '#0F1535',
                    border: `1px solid ${error && !password ? 'rgba(255,82,82,0.3)' : 'rgba(255,255,255,0.08)'}`,
                    borderRadius: 10,
                    color: '#fff',
                    fontSize: 15,
                    fontFamily: 'Inter, sans-serif',
                    outline: 'none',
                    boxSizing: 'border-box',
                    transition: 'all 0.3s ease',
                    boxShadow: error && !password ? '0 0 0 3px rgba(255,82,82,0.1)' : 'none',
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'rgba(0,229,255,0.4)'}
                  onBlur={(e) => e.target.style.borderColor = password ? 'rgba(0,229,255,0.2)' : 'rgba(255,255,255,0.08)'}
                />
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 20,
              }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                  <input type="checkbox" style={{
                    width: 16,
                    height: 16,
                    accentColor: '#00E5FF',
                  }} />
                  <span style={{ color: '#6B7394', fontSize: 13 }}>Remember me</span>
                </label>
                <a href="#" style={{ color: '#00E5FF', fontSize: 13, textDecoration: 'none' }}>
                  Forgot password?
                </a>
              </div>

              {error && (
                <div style={{
                  padding: '12px 16px',
                  borderRadius: 10,
                  background: 'rgba(255,82,82,0.1)',
                  border: '1px solid rgba(255,82,82,0.2)',
                  color: '#FF5252',
                  fontSize: 13,
                  marginBottom: 16,
                  animation: 'slideDown 0.3s ease',
                }}>
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '14px',
                  borderRadius: 10,
                  border: 'none',
                  background: loading ? 'rgba(0,229,255,0.3)' : 'linear-gradient(135deg, #00E5FF, #7C4DFF)',
                  color: '#0A0E27',
                  fontSize: 15,
                  fontWeight: 700,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontFamily: 'Inter, sans-serif',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                }}
              >
                {loading ? (
                  <>
                    <span style={{
                      width: 18,
                      height: 18,
                      borderRadius: '50%',
                      border: '2px solid rgba(10,14,39,0.3)',
                      borderTopColor: '#0A0E27',
                      animation: 'spinner 0.6s linear infinite',
                      display: 'inline-block',
                    }} />
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            {/* Social Login Divider */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              marginTop: 24,
              marginBottom: 20,
            }}>
              <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }} />
              <span style={{ color: '#6B7394', fontSize: 13, whiteSpace: 'nowrap' }}>Or continue with</span>
              <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }} />
            </div>

            {/* Social Login Buttons */}
            <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
              <button
                type="button"
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  padding: '12px',
                  borderRadius: 10,
                  border: '1px solid rgba(255,255,255,0.08)',
                  background: 'rgba(255,255,255,0.03)',
                  color: '#fff',
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: 'pointer',
                  fontFamily: 'Inter, sans-serif',
                  transition: 'all 0.3s ease',
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                Google
              </button>
              <button
                type="button"
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  padding: '12px',
                  borderRadius: 10,
                  border: '1px solid rgba(255,255,255,0.08)',
                  background: 'rgba(255,255,255,0.03)',
                  color: '#fff',
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: 'pointer',
                  fontFamily: 'Inter, sans-serif',
                  transition: 'all 0.3s ease',
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                X / Twitter
              </button>
            </div>

            <style>{`@keyframes spinner { to { transform: rotate(360deg); } }`}</style>

            <div style={{
              textAlign: 'center',
              color: '#6B7394',
              fontSize: 14,
            }}>
              Don&apos;t have an account?{' '}
              <a href="/register" style={{ color: '#00E5FF', textDecoration: 'none', fontWeight: 600 }}>
                Sign Up
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

