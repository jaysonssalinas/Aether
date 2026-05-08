'use client';

import { AdminSidebar } from '../../components/AdminSidebar';
import { useTheme, Theme } from '../../components/ThemeProvider';

const THEMES: {
  key: Theme;
  label: string;
  description: string;
  preview: {
    bg: string;
    surface: string;
    border: string;
    text: string;
    muted: string;
    accent: string;
  };
}[] = [
  {
    key: 'light',
    label: 'Light',
    description: 'Clean white surfaces, easy on the eyes during long sessions.',
    preview: { bg: '#f8fafc', surface: '#ffffff', border: '#e2e8f0', text: '#0f172a', muted: '#64748b', accent: '#3b82f6' },
  },
  {
    key: 'dark',
    label: 'Dark Professional',
    description: 'Deep slate dark. Like Vercel or Linear dashboards.',
    preview: { bg: '#0f172a', surface: '#1e293b', border: '#334155', text: '#f1f5f9', muted: '#94a3b8', accent: '#3b82f6' },
  },
  {
    key: 'dark-indigo',
    label: 'Dark Indigo',
    description: 'Warm neutral dark with indigo accent. macOS-inspired.',
    preview: { bg: '#1c1c1e', surface: '#2c2c2e', border: '#3a3a3c', text: '#ffffff', muted: '#8e8e93', accent: '#6366f1' },
  },
];

function ThemePreview({ p }: { p: (typeof THEMES)[0]['preview'] }) {
  return (
    <div
      style={{
        background: p.bg,
        borderRadius: '6px',
        padding: '10px',
        fontFamily: 'Inter, sans-serif',
        fontSize: '10px',
      }}
    >
      {/* Mock stat row */}
      <div style={{ display: 'flex', gap: '6px', marginBottom: '8px' }}>
        {['MRR', 'Customers', 'Renewals'].map((label) => (
          <div
            key={label}
            style={{
              flex: 1,
              background: p.surface,
              border: `1px solid ${p.border}`,
              borderRadius: '5px',
              padding: '6px',
            }}
          >
            <div style={{ color: p.muted, marginBottom: '3px' }}>{label}</div>
            <div
              style={{
                color: label === 'MRR' ? p.accent : p.text,
                fontWeight: 600,
                fontSize: '11px',
              }}
            >
              {label === 'MRR' ? '₱48.5k' : label === 'Customers' ? '24' : '3'}
            </div>
          </div>
        ))}
      </div>
      {/* Mock table row */}
      <div
        style={{
          background: p.surface,
          border: `1px solid ${p.border}`,
          borderRadius: '5px',
          padding: '6px 8px',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <span style={{ color: p.text }}>Rimando Law Office</span>
        <span style={{ color: p.accent }}>₱3,500</span>
      </div>
    </div>
  );
}

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 ml-56 p-8" style={{ background: 'var(--color-bg)' }}>
        <div className="max-w-3xl mx-auto flex flex-col gap-8">

          {/* Header */}
          <div>
            <h1 className="text-xl font-semibold" style={{ color: 'var(--color-text)' }}>
              Settings
            </h1>
            <p className="text-sm mt-0.5" style={{ color: 'var(--color-muted)' }}>
              Preferences for your admin session.
            </p>
          </div>

          {/* Appearance */}
          <div
            className="p-6 rounded-xl"
            style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              boxShadow: 'var(--card-shadow)',
            }}
          >
            <p
              className="text-xs font-medium uppercase tracking-wider mb-5"
              style={{ color: 'var(--color-muted)' }}
            >
              Appearance
            </p>

            <div className="grid grid-cols-3 gap-4">
              {THEMES.map((t) => {
                const selected = theme === t.key;
                return (
                  <button
                    key={t.key}
                    onClick={() => setTheme(t.key)}
                    style={{
                      background: 'transparent',
                      border: selected
                        ? '2px solid var(--color-accent)'
                        : '2px solid var(--color-border)',
                      borderRadius: '10px',
                      padding: '12px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'border-color 0.15s',
                    }}
                  >
                    <ThemePreview p={t.preview} />
                    <div className="mt-3">
                      <p
                        className="text-sm font-medium"
                        style={{ color: 'var(--color-text)' }}
                      >
                        {t.label}
                      </p>
                      <p
                        className="text-xs mt-0.5 leading-relaxed"
                        style={{ color: 'var(--color-muted)' }}
                      >
                        {t.description}
                      </p>
                    </div>
                    {selected && (
                      <div
                        className="mt-2 text-xs font-medium"
                        style={{ color: 'var(--color-accent)' }}
                      >
                        ✓ Active
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
