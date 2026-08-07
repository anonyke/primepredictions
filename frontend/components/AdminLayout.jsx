'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: '📊' },
  { href: '/admin/predictions', label: 'Predictions', icon: '⚽' },
  { href: '/admin/users', label: 'Users', icon: '👥' },
  { href: '/admin/payments', label: 'Payments', icon: '💳' },
  { href: '/admin/settings', label: 'Settings', icon: '⚙️' },
];

/**
 * Professional admin layout with a collapsible sidebar and topbar.
 * Renders the auth-guarded shell for all /admin sub-pages.
 */
export default function AdminLayout({ title, subtitle, actions, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();

  // Keep the sidebar open on desktop by default, closed on mobile.
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      setSidebarOpen(!mobile);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isActive = (href) => pathname === href || pathname.startsWith(href + '/');

  return (
    <div className="admin-shell" style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar — visible on desktop, slides in on mobile */}
      <aside
        className="admin-sidebar"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          bottom: 0,
          width: 250,
          background: 'var(--bg-secondary)',
          borderRight: '1px solid var(--border-subtle)',
          zIndex: 60,
          transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s ease',
          overflowY: 'auto',
        }}
      >
        <div className="flex items-center gap-2 px-5 h-16 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
          <a href="/admin" className="flex items-center gap-2 no-underline">
            <span
              className="flex items-center justify-center w-9 h-9 rounded-xl text-black text-base font-extrabold"
              style={{ background: 'var(--gradient-primary)' }}
            >
              PP
            </span>
            <span className="font-bold text-lg" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
              Admin
            </span>
          </a>
        </div>

        <nav className="px-3 py-4 flex flex-col gap-1">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium no-underline transition-colors"
              style={{
                color: isActive(item.href) ? 'var(--primary)' : 'var(--text-secondary)',
                background: isActive(item.href) ? 'var(--bg-card-hover)' : 'transparent',
                border: `1px solid ${isActive(item.href) ? 'var(--border-primary)' : 'transparent'}`,
              }}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="px-3 pb-4">
          <a
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:bg-white/5 no-underline transition-colors"
          >
            <span>🏠</span> View Site
          </a>
        </div>
      </aside>

{/* Mobile overlay — only on mobile (sidebar is always visible on desktop) */}
      {isMobile && sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 55 }}
        />
      )}

      {/* Main column */}
      <div style={{ flex: 1, marginLeft: sidebarOpen ? 250 : 0, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Topbar */}
        <header
          className="admin-topbar"
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 50,
            height: 64,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 24px',
            background: 'var(--bg-secondary)',
            borderBottom: '1px solid var(--border-subtle)',
          }}
        >
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Toggle sidebar"
              className="flex items-center justify-center w-9 h-9 rounded-lg text-lg cursor-pointer"
              style={{ background: 'transparent', border: '1px solid var(--border-subtle)', color: 'var(--text-secondary)' }}
            >
              ☰
            </button>
            <div>
              <h1 className="text-base font-bold m-0" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
                {title}
              </h1>
              {subtitle && (
                <p className="text-xs m-0" style={{ color: 'var(--text-tertiary)' }}>{subtitle}</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {actions}
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 text-sm font-medium cursor-pointer"
                style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)' }}
              >
                <span
                  className="flex items-center justify-center w-8 h-8 rounded-full text-black text-xs font-bold"
                  style={{ background: 'var(--gradient-primary)' }}
                >
                  {user?.name?.charAt(0)?.toUpperCase() || 'A'}
                </span>
                <span className="hidden sm:inline">{user?.name?.split(' ')[0] || 'Admin'}</span>
              </button>
              {userMenuOpen && (
                <div
                  className="absolute right-0 top-full mt-2 w-44 p-1 rounded-xl"
                  style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-card)', zIndex: 70 }}
                >
                  <a
                    href="/"
                    className="block px-3 py-2 rounded-lg text-sm no-underline transition-colors"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    👁 View Site
                  </a>
                  <button
                    onClick={() => { logout(); setUserMenuOpen(false); }}
                    className="w-full text-left px-3 py-2 rounded-lg text-sm cursor-pointer"
                    style={{ background: 'transparent', border: 'none', color: 'var(--accent-red)' }}
                  >
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="admin-content" style={{ padding: '28px 24px', flex: 1 }}>
          {children}
        </main>
      </div>
    </div>
  );
}
