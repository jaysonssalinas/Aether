'use client';

import { Button } from '../../components/Button';

const services = [
  {
    icon: '✦',
    title: 'Wedding Planning',
    description: 'From intimate ceremonies to grand receptions — we manage every detail so you can be fully present on your most important day.',
    href: '/celebrations/services',
  },
  {
    icon: '◉',
    title: 'Event Coordination',
    description: 'Birthdays, anniversaries, corporate gatherings. We make every event feel effortless and extraordinary.',
    href: '/celebrations/services',
  },
  {
    icon: '◇',
    title: 'Venue Design & Décor',
    description: 'Transforming spaces into atmospheres. Custom themes, florals, and layouts that reflect your vision perfectly.',
    href: '/celebrations/services',
  },
  {
    icon: '◈',
    title: 'Souvenirs & Invitations',
    description: 'Custom-printed keepsakes and invitations that guests will treasure long after the celebration ends.',
    href: '/celebrations/services',
  },
];

const benefits = [
  { label: 'Personalized service', detail: 'No two events are the same. We design around your vision, not a template.' },
  { label: 'Attention to detail', detail: 'Every element — from the florals to the timeline — is intentional.' },
  { label: 'Unforgettable experiences', detail: 'We create moments that guests talk about for years.' },
  { label: 'Stress-free planning', detail: 'You enjoy the journey. We handle the logistics.' },
];

const testimonials = [
  {
    quote: 'The attention to detail was extraordinary. Every element of our event was handled with grace and precision.',
    author: 'Happy Client',
    event: 'Event Client, Dasmarinas Cavite',
  },
  {
    quote: 'Remlyn made our wedding feel like a dream. Everything was perfect — from the flowers to the last dance.',
    author: 'Bride & Groom',
    event: 'Wedding, Bacoor Cavite',
  },
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

const CARD_WARM: React.CSSProperties = {
  background: '#fff8f5',
  border: '1px solid rgba(255,20,147,0.12)',
};

const DIVIDER_PINK: React.CSSProperties = {
  height: '1px',
  background: 'linear-gradient(90deg, transparent, rgba(255,20,147,0.24), transparent)',
};

export default function CelebrationsPage() {
  return (
    <div data-section="celebrations">

      {/* ── Hero ── */}
      <section className="py-36 px-6 relative overflow-hidden" style={CELEB_BG}>
        <div
          className="absolute top-0 left-0 right-0 h-1"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(192,0,106,0.35), transparent)' }}
        />
        <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col gap-8 animate-fade-in-up">
          <span className="text-label text-center">Aether Celebrations</span>
          <h1>
            Turning Moments<br /><em>Into Memories.</em>
          </h1>
          <p className="text-lead mx-auto" style={{ maxWidth: '560px' }}>
            Weddings, events, and curated souvenirs — designed with love and executed with
            precision. Every celebration deserves to be extraordinary.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <Button href="/celebrations/galleries" size="lg">View Gallery</Button>
            <Button href="/celebrations/contact" variant="outline" size="lg">Book Consultation</Button>
          </div>
        </div>
      </section>

      <div style={DIVIDER_PINK} />

      {/* ── Gallery Preview ── */}
      <section className="py-24 px-6" style={CELEB_BG}>
        <div className="max-w-6xl mx-auto">
          <span className="text-label text-center mb-16 block">Our Events</span>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {['Weddings', 'Corporate Events', 'Birthdays', 'Anniversaries', 'Intimate Gatherings', 'Venues'].map((label, i) => (
              <div
                key={label}
                className="aspect-square rounded-lg flex flex-col items-center justify-center gap-3"
                style={{
                  background: i % 2 === 0
                    ? 'linear-gradient(135deg, rgba(255,20,147,0.06) 0%, rgba(106,76,147,0.08) 100%)'
                    : 'linear-gradient(135deg, rgba(106,76,147,0.05) 0%, rgba(255,64,129,0.06) 100%)',
                  border: '1px solid rgba(255,20,147,0.13)',
                }}
              >
                <span className="text-2xl gradient-text">✦</span>
                <span className="text-xs tracking-[0.15em] uppercase" style={{ color: '#c0006a' }}>{label}</span>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button href="/celebrations/galleries" variant="outline">View Full Gallery</Button>
          </div>
        </div>
      </section>

      <div style={DIVIDER_PINK} />

      {/* ── Services ── */}
      <section className="py-24 px-6" style={CELEB_BG_ALT}>
        <div className="max-w-6xl mx-auto">
          <span className="text-label text-center mb-16 block">What We Do</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {services.map((s) => (
              <a
                key={s.title}
                href={s.href}
                className="group p-8 rounded-lg flex flex-col gap-4 transition-all duration-300"
                style={{ ...CARD_STYLE, textDecoration: 'none' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(192,0,106,0.35)';
                  e.currentTarget.style.background = '#fff5f8';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,20,147,0.15)';
                  e.currentTarget.style.background = '#ffffff';
                }}
              >
                <div
                  className="w-12 h-12 rounded-sm flex items-center justify-center text-xl"
                  style={{ background: 'rgba(255,20,147,0.08)', border: '1px solid rgba(192,0,106,0.22)', color: '#c0006a' }}
                >
                  {s.icon}
                </div>
                <h3 style={{ margin: 0 }}>{s.title}</h3>
                <p className="text-sm" style={{ lineHeight: '1.75' }}>{s.description}</p>
                <span
                  className="text-sm font-medium transition-all duration-200 group-hover:translate-x-1 inline-block"
                  style={{ color: '#c0006a', letterSpacing: '0.03em', fontFamily: "'Lato', sans-serif" }}
                >
                  Learn more →
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <div style={DIVIDER_PINK} />

      {/* ── Why Aether Celebrations ── */}
      <section className="py-24 px-6" style={CELEB_BG}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <div className="flex flex-col gap-6">
              <span className="text-label">Why Choose Us</span>
              <h2>Every detail matters.<br />Every moment is intentional.</h2>
              <p className="text-lead">
                Led by Remlyn Salinas, Aether Celebrations brings warmth, creativity, and
                flawless execution to every event — no matter the size.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              {benefits.map((b) => (
                <div key={b.label} className="p-6 rounded-lg flex flex-col gap-2" style={CARD_WARM}>
                  <span
                    className="text-sm font-semibold"
                    style={{ color: '#c0006a', letterSpacing: '0.03em', fontFamily: "'Lato', sans-serif" }}
                  >
                    {b.label}
                  </span>
                  <p className="text-sm" style={{ lineHeight: '1.75' }}>{b.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div style={DIVIDER_PINK} />

      {/* ── Testimonials ── */}
      <section className="py-24 px-6" style={CELEB_BG_ALT}>
        <div className="max-w-6xl mx-auto">
          <span className="text-label text-center mb-16 block">What Clients Say</span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {testimonials.map((t, i) => (
              <div key={i} className="p-8 rounded-lg flex flex-col gap-6" style={CARD_STYLE}>
                <div
                  className="text-4xl"
                  style={{ color: '#c0006a', lineHeight: 1, fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  &ldquo;
                </div>
                <p className="text-base italic" style={{ lineHeight: '1.8', letterSpacing: '0.01em' }}>
                  {t.quote}
                </p>
                <div>
                  <p className="text-sm font-semibold" style={{ color: '#1a1a1a', letterSpacing: '0.03em', fontFamily: "'Lato', sans-serif" }}>{t.author}</p>
                  <p className="text-xs mt-1" style={{ color: '#888888', letterSpacing: '0.06em', fontFamily: "'Lato', sans-serif" }}>{t.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={DIVIDER_PINK} />

      {/* ── CTA ── */}
      <section className="py-24 px-6" style={CELEB_BG}>
        <div className="max-w-2xl mx-auto text-center flex flex-col gap-6">
          <span className="text-label text-center">Begin Your Story</span>
          <h2>Ready to<br /><em>celebrate?</em></h2>
          <p className="text-lead">
            Let's start planning your perfect event. We'd love to hear your vision.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <Button href="/celebrations/contact" size="lg">Book Consultation</Button>
            <Button href="/celebrations/pricing" variant="outline" size="lg">View Packages</Button>
          </div>
        </div>
      </section>

    </div>
  );
}
