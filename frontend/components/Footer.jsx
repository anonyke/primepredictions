'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';

const socials = [
  {
    name: 'Facebook',
    href: '#',
    icon: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z',
  },
  {
    name: 'Twitter / X',
    href: '#',
    icon: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
  },
  {
    name: 'Telegram',
    href: '#',
    icon: 'M9.04 15.48l-.37 5.22c.53 0 .77-.23 1.04-.5l2.5-2.41 5.19 3.83c.95.52 1.63.25 1.88-.89l3.4-16.02c.31-1.25-.46-1.74-1.3-1.44L1.96 8.97c-1.25.49-1.24 1.19-.22 1.5l5.12 1.6L18.3 5.2c.5-.3.96-.13.58.2z',
  },
  {
    name: 'WhatsApp',
    href: '#',
    icon: 'M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.5 0 1.47 1.07 2.89 1.22 3.09.15.2 2.1 3.2 5.1 4.49.71.3 1.27.49 1.7.63.72.23 1.37.2 1.88.12.58-.09 1.76-.72 2-1.42.25-.7.25-1.3.18-1.42-.07-.12-.27-.2-.57-.35zM12.04 21.5h-.01a9.4 9.4 0 0 1-4.8-1.32l-.34-.2-3.56.93.95-3.47-.22-.36a9.42 9.42 0 0 1-1.45-5.04c0-5.19 4.23-9.42 9.43-9.42a9.35 9.35 0 0 1 6.66 2.76 9.35 9.35 0 0 1 2.76 6.66c0 5.2-4.23 9.46-9.42 9.46zm7.66-17.12A11.28 11.28 0 0 0 12.04 .88C5.9.88.92 5.86.92 12c0 1.96.51 3.87 1.48 5.56L.65 23.35l5.9-1.54a11.2 11.2 0 0 0 5.49 1.4h.01c6.13 0 11.12-4.98 11.12-11.11 0-2.97-1.16-5.76-3.26-7.86z',
  },
];

const paymentMethods = ['📱 M-Pesa', '💳 Cards', '🏦 PesaPal', '💎 Stripe', '₿ Crypto'];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const pathname = usePathname();

  // Hide the public footer on the dedicated /admin layout
  const isAdminRoute = pathname === '/admin' || pathname.startsWith('/admin/');
  if (isAdminRoute) return null;

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) setSubscribed(true);
  };

  return (
    <footer className="relative bg-[#05070F] border-t border-white/10 pt-14 pb-8 text-gray-300 overflow-hidden">
      {/* Gradient top line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />

      <div className="max-w-[1300px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 lg:gap-10 mb-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <a href="/" className="flex items-center gap-2 text-white font-bold text-lg mb-4 no-underline">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-violet-500 text-black text-sm font-extrabold">
                PP
              </span>
              <span className="font-display tracking-tight">
                Prime<span className="text-gradient">Predict</span>
              </span>
            </a>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              Kenya&apos;s most trusted football prediction platform. Expert analysis, premium tips,
              and data-driven insights with a proven track record.
            </p>

            {/* Newsletter */}
            <div>
              <h4 className="text-white font-semibold text-sm mb-2">Get Daily Predictions</h4>
              {subscribed ? (
                <p className="text-cyan-400 text-sm">✓ You&apos;re subscribed! Check your inbox.</p>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="flex-1 min-w-0 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-cyan-400/50 transition-colors"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-400 to-violet-500 text-black text-sm font-semibold cursor-pointer hover:opacity-90 transition-opacity"
                  >
                    Join
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* About / Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">About</h4>
            <div className="flex flex-col gap-2.5">
              {[
                { href: '/', label: 'Home' },
                { href: '/predictions', label: 'Free Predictions' },
                { href: '/premium', label: 'VIP Predictions' },
                { href: '/results', label: 'Results' },
                { href: '/pricing', label: 'Pricing' },
              ].map((l) => (
                <a key={l.label} href={l.href} className="text-gray-400 hover:text-cyan-400 text-sm no-underline transition-colors">
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          {/* Predictions */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Predictions</h4>
            <div className="flex flex-col gap-2.5">
              {[
                { href: '/predictions?category=1x2', label: '1X2 Predictions' },
                { href: '/predictions?category=over-2.5', label: 'Over/Under' },
                { href: '/predictions?category=btts', label: 'BTTS' },
                { href: '/predictions?category=double-chance', label: 'Double Chance' },
                { href: '/predictions?category=banker-tips', label: 'Banker Tips' },
                { href: '/predictions?category=correct-score', label: 'Correct Score' },
              ].map((l) => (
                <a key={l.label} href={l.href} className="text-gray-400 hover:text-cyan-400 text-sm no-underline transition-colors">
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          {/* Support + Legal */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Support</h4>
            <div className="flex flex-col gap-2.5">
              {[
                { href: '/register', label: 'Create Account' },
                { href: '/login', label: 'Sign In' },
                { href: '/dashboard', label: 'My Dashboard' },
                { href: '/dashboard/subscription', label: 'My Subscription' },
              ].map((l) => (
                <a key={l.label} href={l.href} className="text-gray-400 hover:text-cyan-400 text-sm no-underline transition-colors">
                  {l.label}
                </a>
              ))}
            </div>

            <h4 className="text-white font-semibold text-sm mb-3 mt-5 uppercase tracking-wider">Legal</h4>
            <div className="flex flex-col gap-2.5">
              {[
                { href: '/terms', label: 'Terms & Conditions' },
                { href: '/privacy', label: 'Privacy Policy' },
                { href: '/responsible-betting', label: 'Responsible Betting' },
              ].map((l) => (
                <a key={l.label} href={l.href} className="text-gray-400 hover:text-cyan-400 text-sm no-underline transition-colors">
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Responsible betting disclaimer */}
        <div className="mb-8 p-4 rounded-xl bg-white/5 border border-white/10 text-center">
          <p className="text-gray-400 text-xs leading-relaxed">
            <strong className="text-gray-300">Responsible Betting:</strong> Bet responsibly. Our predictions are
            for informational purposes only and do not guarantee results. Only bet what you can afford to lose.
            If you need help, contact a responsible gambling organisation. 18+.
          </p>
        </div>

        {/* Payment methods */}
        <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs text-gray-500 uppercase tracking-wider mr-1">We Accept:</span>
          {paymentMethods.map((m) => (
            <span key={m} className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-gray-300">
              {m}
            </span>
          ))}
        </div>

        {/* Social & Copyright */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} PrimePredict.co.ke. All rights reserved.
          </p>
          <div className="flex gap-3">
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.href}
                aria-label={s.name}
                className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-cyan-400 hover:border-cyan-400/40 transition-all"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d={s.icon} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
