'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const nav = [
  { href: '/dashboard', label: 'Overview', icon: '◈' },
  { href: '/pricing', label: 'Pricing', icon: '◇' },
  { href: '/customers', label: 'Customers', icon: '◉' },
  { href: '/reports', label: 'Reports', icon: '⌗' },
];

export function AdminSidebar() {
  const path = usePathname();

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.href = '/login';
  }

  return (
    <aside
      className="fixed left-0 top-0 bottom-0 w-56 flex flex-col"
      style={{ background: '#0a0a0a', borderRight: '1px solid #1e1e1e' }}
    >
      {/* Logo area */}
      <div className="px-6 py-6" style={{ borderBottom: '1px solid #1e1e1e' }}>
        <div className="flex flex-col gap-1">
          <span className="text-base font-medium tracking-[0.15em]" style={{ fontFamily: "'Playfair Display',Georgia,serif", background: 'linear-gradient(135deg,#ff1493,#6a4c93)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            AETHER
          </span>
          <span className="text-xs tracking-[0.1em]" style={{ color: '#444444' }}>Admin Panel</span>
        </div>
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
        {nav.map((item) => {
          const active = path.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm transition-all duration-150"
              style={{
                color: active ? '#f5f5f0' : '#666666',
                background: active ? '#1a1a1a' : 'transparent',
              }}
            >
              <span style={{ color: active ? '#ff1493' : '#444444' }}>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom: divider links */}
      <div className="px-3 pb-6 flex flex-col gap-1" style={{ borderTop: '1px solid #1e1e1e', paddingTop: '12px' }}>
        <a
          href="http://localhost:3000"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm"
          style={{ color: '#444444' }}
        >
          <span>↗</span> View Websites
        </a>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm text-left w-full"
          style={{ color: '#444444' }}
        >
          <span>→</span> Sign Out
        </button>
      </div>
    </aside>
  );
}
