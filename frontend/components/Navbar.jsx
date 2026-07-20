'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const styles = {
  header: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    background: 'rgba(10, 14, 39, 0.85)',
    backdropFilter: 'blur(24px)',
    WebkitBackdropFilter: 'blur(24px)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
    transition: 'all 0.4s ease',
  },
  nav: {
    maxWidth: 1200,
    margin: '0 auto',
    padding: '0 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 74,
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    textDecoration: 'none',
    color: '#fff',
  },
  logoIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    background: 'linear-gradient(135deg, #00E5FF, #7C4DFF)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 18,
    fontWeight: 800,
    color: '#0A0E27',
    transition: 'transform 0.3s ease',
  },
  logoText: {
    fontFamily: '"Plus Jakarta Sans", sans-serif',
    fontSize: 20,
    fontWeight: 800,
    background: 'linear-gradient(135deg, #00E5FF, #7C4DFF)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  links: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },
  link: {
    color: '#B0B8D1',
    textDecoration: 'none',
    fontSize: 14,
    fontWeight: 500,
    transition: 'all 0.3s ease',
    position: 'relative',
    padding: '8px 14px',
    borderRadius: 8,
  },
  linkHover: {
    background: 'rgba(255,255,255,0.05)',
    color: '#fff',
  },
  linkActive: {
    color: '#00E5FF',
    background: 'rgba(0, 229, 255, 0.08)',
  },
  authBtns: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  loginBtn: {
    padding: '8px 20px',
    borderRadius: 8,
    border: '1px solid rgba(0, 229, 255, 0.2)',
    background: 'transparent',
    color: '#00E5FF',
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
  },
  signupBtn: {
    padding: '8px 20px',
    borderRadius: 8,
    border: 'none',
    background: 'linear-gradient(135deg, #00E5FF, #7C4DFF)',
    color: '#0A0E27',
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    boxShadow: '0 0 20px rgba(0, 229, 255, 0.15)',
  },
  userBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '6px 12px',
    borderRadius: 10,
    border: '1px solid rgba(255,255,255,0.1)',
    background: 'rgba(255,255,255,0.05)',
    color: '#fff',
    fontSize: 14,
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  userAvatar: {
    width: 30,
    height: 30,
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #00E5FF, #7C4DFF)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 12,
    fontWeight: 700,
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    right: 0,
    marginTop: 8,
    width: 210,
    background: 'rgba(19, 24, 73, 0.97)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 14,
    padding: 8,
    boxShadow: '0 16px 48px rgba(0,0,0,0.5)',
    display: 'none',
    opacity: 0,
    transform: 'translateY(-8px)',
    transition: 'all 0.3s ease',
  },
  dropdownVisible: {
    display: 'block',
    opacity: 1,
    transform: 'translateY(0)',
  },
  dropdownItem: {
    display: 'block',
    padding: '10px 14px',
    borderRadius: 8,
    color: '#B0B8D1',
    textDecoration: 'none',
    fontSize: 14,
    fontWeight: 500,
    transition: 'all 0.2s ease',
  },
  hamburger: {
    display: 'none',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.08)',
    color: '#fff',
    fontSize: 24,
    cursor: 'pointer',
    padding: 8,
    borderRadius: 8,
    width: 42,
    height: 42,
  },
  mobileMenu: {
    position: 'fixed',
    top: 74,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(10, 14, 39, 0.98)',
    backdropFilter: 'blur(24px)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: '32px 20px',
    gap: 8,
    zIndex: 99,
    animation: 'slideDown 0.3s ease',
  },
  mobileLink: {
    color: '#B0B8D1',
    textDecoration: 'none',
    fontSize: 17,
    fontWeight: 500,
    transition: 'all 0.3s ease',
    padding: '12px 24px',
    borderRadius: 10,
    width: '100%',
    maxWidth: 320,
    textAlign: 'center',
  },
  mobileLinkActive: {
    color: '#00E5FF',
    background: 'rgba(0, 229, 255, 0.08)',
  },
};

export default function Navbar() {
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activePath, setActivePath] = useState('');

  useEffect(() => {
    setActivePath(window.location.pathname);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => activePath === path;

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/predictions', label: 'Predictions' },
    { href: '/premium', label: 'Premium' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/results', label: 'Results' },
    { href: '/dashboard', label: 'Dashboard' },
  ];

  const headerStyle = {
    ...styles.header,
    ...(scrolled ? { background: 'rgba(10, 14, 39, 0.98)', boxShadow: '0 4px 20px rgba(0,0,0,0.3)' } : {}),
  };

  return (
    <header style={headerStyle}>
      <div style={styles.nav}>
        <a href="/" style={styles.logo}>
          <div style={styles.logoIcon}>PP</div>
          <div>
            <div style={styles.logoText}>PrimePredict</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <span style={{ fontSize: 10, color: '#6B7394' }}>.co.ke</span>
            </div>
          </div>
        </a>

        {/* Desktop Nav */}
        <ul style={{ ...styles.links, display: menuOpen ? 'none' : 'flex' }} className="desktop-nav">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                style={{
                  ...styles.link,
                  ...(isActive(link.href) ? styles.linkActive : {}),
                }}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
                {isActive(link.href) && (
                  <span style={{ position: 'absolute', bottom: -2, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, #00E5FF, #7C4DFF)', borderRadius: 1 }} />
                )}
              </a>
            </li>
          ))}
        </ul>

        {/* Auth Buttons */}
        <div style={{ ...styles.authBtns, display: menuOpen ? 'none' : 'flex' }} className="desktop-nav">
          {user ? (
            <div style={{ position: 'relative' }}>
              <button
                style={styles.userBtn}
                onClick={() => setDropdownOpen(!dropdownOpen)}
                onMouseEnter={() => setDropdownOpen(true)}
              >
                <div style={styles.userAvatar}>
                  {user.email?.charAt(0).toUpperCase() || 'U'}
                </div>
                <span>{user.name || 'User'}</span>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M3 5l3 3 3-3" stroke="#B0B8D1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <div
                style={{ ...styles.dropdown, display: dropdownOpen ? 'block' : 'none' }}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <a href="/dashboard" style={styles.dropdownItem}>Dashboard</a>
                <a href="/dashboard/profile" style={styles.dropdownItem}>Profile</a>
                <a href="/dashboard/subscription" style={styles.dropdownItem}>Subscription</a>
                <a href="/dashboard/payments" style={styles.dropdownItem}>Payments</a>
                {user.role === 'admin' && (
                  <a href="/admin" style={{ ...styles.dropdownItem, color: '#FFD700' }}>Admin Panel</a>
                )}
                <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.06)', margin: '6px 0' }} />
                <button
                  onClick={() => { logout(); setDropdownOpen(false); }}
                  style={{ ...styles.dropdownItem, color: '#FF5252', background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer' }}
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <>
              <a href="/login" style={styles.loginBtn}>Login</a>
              <a href="/register" style={styles.signupBtn}>Sign Up</a>
            </>
          )}
        </div>

        {/* Hamburger */}
        <button
          style={styles.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
          className="hamburger-btn"
        >
          {menuOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={styles.mobileMenu} className="mobile-menu">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                ...styles.mobileLink,
                ...(isActive(link.href) ? { color: '#00E5FF' } : {}),
              }}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <hr style={{ width: '60%', border: 'none', borderTop: '1px solid rgba(255,255,255,0.06)' }} />
          {user ? (
            <>
              <a href="/dashboard" style={styles.mobileLink} onClick={() => setMenuOpen(false)}>Dashboard</a>
              <a href="/dashboard/profile" style={styles.mobileLink} onClick={() => setMenuOpen(false)}>Profile</a>
              <button
                onClick={() => { logout(); setMenuOpen(false); }}
                style={{ ...styles.mobileLink, color: '#FF5252', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <a href="/login" style={styles.loginBtn} onClick={() => setMenuOpen(false)}>Login</a>
              <a href="/register" style={styles.signupBtn} onClick={() => setMenuOpen(false)}>Sign Up</a>
            </>
          )}
        </div>
      )}

      <style jsx>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .hamburger-btn {
            display: block !important;
          }
        }
        @media (min-width: 769px) {
          .hamburger-btn {
            display: none !important;
          }
          .mobile-menu {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}

