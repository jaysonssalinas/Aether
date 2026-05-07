'use client';

import { Button } from '../../../components/Button';

const categories = [
  { label: 'All', count: 24 },
  { label: 'Weddings', count: 10 },
  { label: 'Corporate', count: 5 },
  { label: 'Birthdays', count: 5 },
  { label: 'Anniversaries', count: 4 },
];

const placeholderEvents = [
  { type: 'Weddings', caption: 'Garden Wedding, Cavite', icon: '✦' },
  { type: 'Corporate', caption: 'Year-end Celebration, Bacoor', icon: '◉' },
  { type: 'Birthdays', caption: '18th Birthday Debut', icon: '◇' },
  { type: 'Weddings', caption: 'Church Wedding, Dasmarinas', icon: '✦' },
  { type: 'Anniversaries', caption: '25th Silver Anniversary', icon: '◈' },
  { type: 'Birthdays', caption: '7th Birthday, Garden Party', icon: '◇' },
  { type: 'Weddings', caption: 'Intimate Ceremony, Tagaytay', icon: '✦' },
  { type: 'Corporate', caption: 'Product Launch, Cavite City', icon: '◉' },
  { type: 'Anniversaries', caption: '1st Wedding Anniversary', icon: '◈' },
];

const CELEB_BG: React.CSSProperties = {
  background: `
    radial-gradient(circle at 85% 12%, rgba(255,20,147,0.09), transparent 42%),
    radial-gradient(circle at 12% 85%, rgba(255,64,129,0.07), transparent 44%),
    #fffaf8
  `,
};

const CELEB_BG_ALT: React.CSSProperties = {
  background: `
    radial-gradient(circle at 15% 10%, rgba(255,20,147,0.06), transparent 40%),
    radial-gradient(circle at 85% 90%, rgba(106,76,147,0.05), transparent 40%),
    #ffffff
  `,
};

const CARD_STYLE: React.CSSProperties = {
  background: '#ffffff',
  border: '1px solid rgba(255,20,147,0.15)',
};

const DIVIDER_PINK: React.CSSProperties = {
  height: '1px',
  background: 'linear-gradient(90deg, transparent, rgba(255,20,147,0.24), transparent)',
};

const gradients = [
  'linear-gradient(135deg, rgba(255,20,147,0.08) 0%, rgba(106,76,147,0.12) 100%)',
  'linear-gradient(135deg, rgba(106,76,147,0.07) 0%, rgba(255,64,129,0.09) 100%)',
  'linear-gradient(135deg, rgba(255,64,129,0.06) 0%, rgba(106,76,147,0.10) 100%)',
];

export default function CelebrationsGalleriesPage() {
  return (
    <div data-section="celebrations">

      {/* ── Hero ── */}
      <section className="py-36 px-6 relative overflow-hidden" style={CELEB_BG}>
        <div
          className="absolute top-0 left-0 right-0 h-1"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(192,0,106,0.35), transparent)' }}
        />
        <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col gap-8 animate-fade-in-up">
          <span className="text-label text-center">Aether Celebrations — Gallery</span>
          <h1>Moments we've<br /><em>made magical.</em></h1>
          <p className="text-lead mx-auto" style={{ maxWidth: '520px' }}>
            Every photo here represents a client who trusted us with their most important day.
            Browse our work and imagine what we can create for you.
          </p>
        </div>
      </section>

      <div style={DIVIDER_PINK} />

      {/* ── Gallery ── */}
      <section className="py-24 px-6" style={CELEB_BG}>
        <div className="max-w-6xl mx-auto">

          {/* Category filter pills */}
          <div className="flex flex-wrap gap-3 justify-center mb-16">
            {categories.map((cat) => (
              <button
                key={cat.label}
                className="px-5 py-2 rounded-full text-sm transition-all duration-200"
                style={{
                  background: cat.label === 'All'
                    ? 'linear-gradient(135deg, #ff1493 0%, #6a4c93 100%)'
                    : '#ffffff',
                  color: cat.label === 'All' ? '#ffffff' : '#888888',
                  border: cat.label === 'All' ? 'none' : '1px solid rgba(255,20,147,0.18)',
                  fontFamily: "'Lato', sans-serif",
                  letterSpacing: '0.04em',
                  cursor: 'pointer',
                }}
              >
                {cat.label}
                <span className="ml-1.5 text-xs" style={{ opacity: 0.7 }}>({cat.count})</span>
              </button>
            ))}
          </div>

          {/* Gallery grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {placeholderEvents.map((event, i) => (
              <div
                key={i}
                className="group relative aspect-square rounded-lg overflow-hidden cursor-pointer transition-all duration-300"
                style={{ background: gradients[i % 3], border: '1px solid rgba(255,20,147,0.13)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(192,0,106,0.35)';
                  e.currentTarget.style.transform = 'scale(1.01)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,20,147,0.13)';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                  <span className="text-4xl gradient-text">{event.icon}</span>
                  <span
                    className="text-xs tracking-[0.15em] uppercase"
                    style={{ color: '#c0006a', fontFamily: "'Lato', sans-serif", fontWeight: 600 }}
                  >
                    {event.type}
                  </span>
                </div>
                <div
                  className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-all duration-200"
                  style={{ background: 'linear-gradient(to top, rgba(255,250,248,0.96) 0%, transparent 100%)' }}
                >
                  <p
                    className="text-xs"
                    style={{ color: '#555555', fontFamily: "'Lato', sans-serif", letterSpacing: '0.04em' }}
                  >
                    {event.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center mt-10 text-sm" style={{ color: '#aaaaaa', fontFamily: "'Lato', sans-serif", letterSpacing: '0.03em' }}>
            Full photo gallery coming soon — photos will be uploaded after events.
          </p>
        </div>
      </section>

      <div style={DIVIDER_PINK} />

      {/* ── CTA ── */}
      <section className="py-24 px-6" style={CELEB_BG_ALT}>
        <div className="max-w-2xl mx-auto text-center flex flex-col gap-6">
          <span className="text-label text-center">Your Turn</span>
          <h2>Love what you see?<br /><em>Let's create yours.</em></h2>
          <p className="text-lead">
            Let's create something this beautiful — and this unforgettable — for your event.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <Button href="/celebrations/contact" size="lg">Let's Create Your Event</Button>
            <Button href="/celebrations/services" variant="outline" size="lg">Our Services</Button>
          </div>
        </div>
      </section>

    </div>
  );
}
