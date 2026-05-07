'use client';

import { Button } from '../../components/Button';

const services = [
  {
    icon: '◻',
    title: 'Custom Websites',
    description: 'Professional, fast-loading websites built for credibility and conversions. From landing pages to full business sites.',
    href: '/digital/services',
  },
  {
    icon: '⊞',
    title: 'Software Systems',
    description: 'POS, inventory, and printing systems designed for Philippine businesses — practical, reliable, and built to last.',
    href: '/digital/services',
  },
  {
    icon: '◈',
    title: 'Domain & Hosting',
    description: 'End-to-end domain registration, DNS management, and hosting support so your site is always online.',
    href: '/digital/services',
  },
  {
    icon: '◉',
    title: 'SEO & Online Presence',
    description: 'Get found on Google. We optimize your site so the right customers find you at the right time.',
    href: '/digital/services',
  },
];

const benefits = [
  { label: 'Custom-built', detail: 'No templates. Every solution is built around your business.' },
  { label: 'Local expertise', detail: 'We understand the Philippine market, systems, and context.' },
  { label: 'Ongoing support', detail: 'We stay with you after launch — not just during the build.' },
  { label: 'Transparent pricing', detail: "No surprises. You know exactly what you're paying for." },
];

const DIGITAL_BG = {
  background: `
    radial-gradient(circle at 20% 10%, rgba(96,165,250,0.18), transparent 42%),
    radial-gradient(circle at 80% 15%, rgba(167,139,250,0.16), transparent 45%),
    #05070d
  `,
} as React.CSSProperties;

const DIGITAL_BG_DEEP = {
  background: `
    radial-gradient(circle at 12% 0%, rgba(96,165,250,0.14), transparent 40%),
    radial-gradient(circle at 85% 8%, rgba(167,139,250,0.14), transparent 45%),
    #05070d
  `,
} as React.CSSProperties;

const CARD_STYLE: React.CSSProperties = {
  background: 'rgba(12,18,32,0.82)',
  border: '1px solid rgba(96,165,250,0.22)',
  boxShadow: 'inset 0 0 0 1px rgba(34,211,238,0.06)',
};

const DIVIDER_BLUE: React.CSSProperties = {
  height: '1px',
  background: 'linear-gradient(90deg, transparent, rgba(96,165,250,0.45), transparent)',
  margin: '0',
};

export default function DigitalPage() {
  return (
    <div data-section="digital" className="on-dark">

      {/* ── Hero ── */}
      <section
        className="py-36 px-6 relative overflow-hidden"
        style={DIGITAL_BG}
      >
        {/* top accent border */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(96,165,250,0.5), transparent)' }}
        />

        <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col gap-8 animate-fade-in-up">
          <span className="text-label text-center">Aether Digital</span>

          <h1>
            <span className="text-gradient">Build Systems</span>
            <br />
            <span style={{ color: '#f3f7ff' }}>That Scale.</span>
          </h1>

          <p className="text-lead mx-auto" style={{ maxWidth: '560px', color: '#b8c4dc' }}>
            From websites to software systems — we build the digital infrastructure that lets
            Philippine businesses grow with confidence.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <Button href="/digital/services" size="lg">Explore Services</Button>
            <Button href="/digital/contact" variant="outline" size="lg">Get a Quote</Button>
          </div>
        </div>
      </section>

      <div style={DIVIDER_BLUE} />

      {/* ── Services ── */}
      <section className="py-24 px-6" style={DIGITAL_BG}>
        <div className="max-w-6xl mx-auto">
          <span className="text-label text-center mb-16 block">What We Build</span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {services.map((s) => (
              <a
                key={s.title}
                href={s.href}
                className="group p-8 rounded-lg flex flex-col gap-4 transition-all duration-300"
                style={{ ...CARD_STYLE, textDecoration: 'none' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(96,165,250,0.45)';
                  e.currentTarget.style.background = 'rgba(12,18,42,0.95)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(96,165,250,0.22)';
                  e.currentTarget.style.background = 'rgba(12,18,32,0.82)';
                }}
              >
                <div
                  className="w-12 h-12 rounded-sm flex items-center justify-center text-xl"
                  style={{ background: 'rgba(96,165,250,0.12)', border: '1px solid rgba(125,211,252,0.35)', color: '#7dd3fc' }}
                >
                  {s.icon}
                </div>
                <h3 style={{ color: '#f3f7ff' }}>{s.title}</h3>
                <p style={{ color: '#b8c4dc', fontSize: '0.9375rem', lineHeight: '1.65' }}>{s.description}</p>
                <span
                  className="text-sm font-medium transition-all duration-200 group-hover:translate-x-1 inline-block"
                  style={{ color: '#7dd3fc', letterSpacing: '0.03em' }}
                >
                  Learn more →
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <div style={DIVIDER_BLUE} />

      {/* ── Why Aether Digital ── */}
      <section className="py-24 px-6" style={DIGITAL_BG_DEEP}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">

            <div className="flex flex-col gap-6">
              <span className="text-label">Why Choose Us</span>
              <h2>Built for Philippine businesses.<br />Backed by real expertise.</h2>
              <p className="text-lead" style={{ color: '#b8c4dc' }}>
                We don't use off-the-shelf templates. Every website and system we build is designed
                specifically for your business, your customers, and your goals.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {benefits.map((b) => (
                <div
                  key={b.label}
                  className="p-6 rounded-lg flex flex-col gap-2"
                  style={CARD_STYLE}
                >
                  <span
                    className="text-sm font-semibold"
                    style={{ color: '#7dd3fc', letterSpacing: '0.04em', fontFamily: "'Inter', sans-serif" }}
                  >
                    {b.label}
                  </span>
                  <p className="text-sm" style={{ color: '#b8c4dc', lineHeight: '1.65' }}>{b.detail}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      <div style={DIVIDER_BLUE} />

      {/* ── CTA ── */}
      <section className="py-24 px-6 relative" style={DIGITAL_BG}>
        <div className="max-w-2xl mx-auto text-center flex flex-col gap-6">
          <span className="text-label text-center">Ready to Start?</span>
          <h2>
            <span className="text-gradient">Digital transformation</span>
            <br />
            <span style={{ color: '#f3f7ff' }}>starts with one conversation.</span>
          </h2>
          <p style={{ color: '#b8c4dc', lineHeight: '1.7', letterSpacing: '0.01em' }}>
            Let's talk about what you need. No obligation — just a conversation about how we can
            help your business grow.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <Button href="/digital/contact" size="lg">Get a Quote</Button>
            <Button href="/digital/portfolio" variant="outline" size="lg">See Our Work</Button>
          </div>
        </div>
      </section>

    </div>
  );
}
