'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'Dashboard' },
  { href: '/predictions', label: 'Free Predictions' },
  { href: '/premium', label: 'Premium Predictions' },
  { href: '/results', label: 'Results' },
  { href: '/pricing', label: 'Statistics' },
  { href: '/pricing', label: 'Subscription' },
];

const userMenuLinks = [
  { href: '/dashboard', label: 'Dashboard', icon: '📊' },
  { href: '/dashboard/wallet', label: 'Wallet', icon: '👛' },
  { href: '/dashboard/subscription', label: 'My Subscription', icon: '👑' },
  { href: '/dashboard/notifications', label: 'Notifications', icon: '🔔' },
  { href: '/dashboard/profile', label: 'Profile', icon: '👤' },
  { href: '/support', label: 'Support', icon: '🎧' },
];

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth();
const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [theme, setTheme] = useState('dark');
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Theme toggle
  useEffect(() => {
    const saved = window.localStorage.getItem('pp_theme') || 'dark';
    setTheme(saved);
    document.documentElement.setAttribute('data-theme', saved);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    window.localStorage.setItem('pp_theme', next);
    document.documentElement.setAttribute('data-theme', next);
  };

  // Hide the public navbar on the dedicated /admin layout
  const isAdminRoute = pathname === '/admin' || pathname.startsWith('/admin/');
  if (isAdminRoute) return null;

  const isActive = (href) => pathname === href;

  const linkClass = (href) =>
    `text-sm font-medium transition-colors duration-200 no-underline ${
      isActive(href) ? 'text-cyan-400' : 'text-gray-300 hover:text-cyan-300'
    }`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen
          ? 'bg-[#0A0E27]/90 backdrop-blur-xl shadow-lg border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 text-white font-bold text-lg no-underline group">
          <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-violet-500 text-black text-base font-extrabold shadow-[0_0_20px_rgba(0,229,255,0.35)] group-hover:shadow-[0_0_30px_rgba(124,77,255,0.5)] transition-shadow">
            PP
          </span>
          <span className="font-display tracking-tight">
            Prime<span className="text-gradient">Predict</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className={linkClass(link.href)}>
              {link.label}
            </a>
          ))}
          {isAdmin && (
            <a href="/admin" className={linkClass('/admin')}>
              Admin
            </a>
          )}
        </div>

{/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="text-gray-300 hover:text-cyan-300 bg-transparent border-none text-lg cursor-pointer transition-colors"
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? '🌙' : '☀️'}
          </button>
{user ? (
            <div className="relative flex items-center gap-3">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 text-sm font-medium no-underline transition-colors hover:text-cyan-300 cursor-pointer bg-transparent border-none"
              >
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-br from-cyan-400 to-violet-500 text-black text-xs font-bold">
                  {user.name?.charAt(0)?.toUpperCase() || 'U'}
                </span>
                <span className="text-gray-300">{user.name?.split(' ')[0] || 'Account'}</span>
                <span className="text-xs text-gray-400">{userMenuOpen ? '▲' : '▼'}</span>
              </button>
              {userMenuOpen && (
                <div className="absolute top-full right-0 mt-2 w-56 rounded-xl bg-[#0F1535] border border-white/10 shadow-2xl overflow-hidden animate-fadeInDown z-50">
                  <div className="px-4 py-3 border-b border-white/5">
                    <div className="text-sm font-semibold text-white">{user.name}</div>
                    <div className="text-xs text-gray-400 truncate">{user.email}</div>
                  </div>
                  <div className="py-1">
                    {userMenuLinks.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:text-cyan-300 hover:bg-white/5 no-underline transition-colors"
                      >
                        <span className="text-base">{link.icon}</span>
                        {link.label}
                      </a>
                    ))}
                    {isAdmin && (
                      <a
                        href="/admin"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:text-cyan-300 hover:bg-white/5 no-underline transition-colors"
                      >
                        <span className="text-base">🛠️</span>
                        Admin Panel
                      </a>
                    )}
                  </div>
                  <div className="border-t border-white/5 p-1">
                    <button
                      onClick={() => { logout(); setUserMenuOpen(false); }}
                      className="w-full text-left flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 rounded-lg cursor-pointer bg-transparent border-none"
                    >
                      <span className="text-base">🚪</span>
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <a
                href="/login"
                className="border border-cyan-400/60 text-cyan-400 px-4 py-1.5 rounded-lg text-sm no-underline hover:bg-cyan-400 hover:text-black transition-all font-medium"
              >
                Login
              </a>
              <a
                href="/register"
                className="bg-gradient-to-r from-cyan-400 to-violet-500 text-black px-4 py-1.5 rounded-lg text-sm font-semibold no-underline hover:opacity-90 transition-opacity shadow-[0_0_16px_rgba(0,229,255,0.3)]"
              >
                Register
              </a>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-white bg-transparent border-none text-xl cursor-pointer p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </nav>

{/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0A0E27]/95 backdrop-blur-xl border-t border-white/5 px-6 py-4 flex flex-col gap-1">
          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 py-2.5 text-sm font-medium text-gray-300 hover:text-cyan-300 bg-transparent border-b border-white/5 text-left cursor-pointer"
          >
            <span className="text-lg">{theme === 'dark' ? '🌙' : '☀️'}</span>
            {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
          </button>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`py-2.5 text-sm font-medium no-underline transition-colors border-b border-white/5 ${
                isActive(link.href) ? 'text-cyan-400' : 'text-gray-300 hover:text-cyan-300'
              }`}
            >
              {link.label}
            </a>
          ))}
          {isAdmin && (
            <a
              href="/admin"
              onClick={() => setMenuOpen(false)}
              className="py-2.5 text-sm font-medium no-underline transition-colors border-b border-white/5 text-gray-300 hover:text-cyan-300"
            >
              Admin
            </a>
          )}
          <div className="pt-3 flex flex-col gap-3">
            {user ? (
              <>
                <a
                  href="/dashboard"
                  onClick={() => setMenuOpen(false)}
                  className="text-gray-300 hover:text-cyan-300 text-sm no-underline"
                >
                  Dashboard
                </a>
                <button
                  onClick={() => { logout(); setMenuOpen(false); }}
                  className="text-red-400 text-sm bg-transparent border-none text-left cursor-pointer"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex gap-3">
                <a
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="flex-1 text-center border border-cyan-400/60 text-cyan-400 px-4 py-2 rounded-lg text-sm no-underline"
                >
                  Login
                </a>
                <a
                  href="/register"
                  onClick={() => setMenuOpen(false)}
                  className="flex-1 text-center bg-gradient-to-r from-cyan-400 to-violet-500 text-black px-4 py-2 rounded-lg text-sm font-semibold no-underline"
                >
                  Register
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

