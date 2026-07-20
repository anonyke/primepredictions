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
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 10,
                    color: '#fff',
                    fontSize: 15,
                    fontFamily: 'Inter, sans-serif',
                    outline: 'none',
                    boxSizing: 'border-box',
                    transition: 'border 0.3s ease',
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'rgba(0,229,255,0.4)'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
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
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 10,
                    color: '#fff',
                    fontSize: 15,
                    fontFamily: 'Inter, sans-serif',
                    outline: 'none',
                    boxSizing: 'border-box',
                    transition: 'border 0.3s ease',
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'rgba(0,229,255,0.4)'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
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

            <style>{`@keyframes spinner { to { transform: rotate(360deg); } }`}</style>

            <div style={{
              marginTop: 24,
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

