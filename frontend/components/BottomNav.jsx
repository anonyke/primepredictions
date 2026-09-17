'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { label: 'Home', href: '/', icon: '🏠' },
    { label: 'Picks', href: '/predictions', icon: '⚽' },
    { label: 'Results', href: '/results', icon: '📊' },
    { label: 'VIP', href: '/pricing', icon: '⭐' },
    { label: 'Dashboard', href: '/dashboard', icon: '👤' },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0f172a] border-t border-slate-800 px-4 py-2 backdrop-blur-md bg-opacity-95 shadow-2xl">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1 px-2 text-xs font-medium transition-colors ${
                isActive ? 'text-emerald-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className="text-lg leading-none mb-1">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
