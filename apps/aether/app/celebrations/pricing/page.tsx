import type { Metadata } from 'next';
import { Button } from '../../../components/Button';

export const metadata: Metadata = {
  title: 'Pricing — Aether Celebrations',
  description: 'Celebration packages and pricing for weddings, events, and souvenirs in Cavite, Philippines.',
};

const packages = [
  {
    icon: '✦',
    title: 'Wedding Planning',
    accentColor: '#c0006a',
    accentBg: 'rgba(192,0,106,0.08)',
    accentBorder: 'rgba(192,0,106,0.22)',
    tiers: [
      {
        name: 'Coordination Package',
        price: 'Starting at ₱15,000',
        items: ['Day-of coordination only', 'Vendor check-in and timeline', 'Ceremony & reception flow'],
      },
      {
        name: 'Full Planning Package',
        price: 'Custom quote',
        items: ['Complete planning from day 1', 'Vendor sourcing and management', 'Design concept', 'Full day-of coordination'],
      },
    ],
  },
  {
    icon: '◉',
    title: 'Event Coordination',
    accentColor: '#5a3f82',
    accentBg: 'rgba(106,76,147,0.08)',
    accentBorder: 'rgba(106,76,147,0.22)',
    tiers: [
      {
        name: 'Starting at',
        price: '₱8,000+',
        items: ['Customized based on event size and scope', 'Discuss your vision with us for a tailored quote'],
      },
    ],
  },
  {
    icon: '◈',
    title: 'Souvenirs & Invitations',
    accentColor: '#c0006a',
    accentBg: 'rgba(192,0,106,0.08)',
    accentBorder: 'rgba(192,0,106,0.22)',
    tiers: [
      {
        name: 'Custom Quote',
        price: 'Based on quantity & design',
        items: ['Invitations, tokens, souvenir boxes', 'Price depends on quantity and design complexity', 'Share your vision for a quote'],
      },
    ],
  },
];

const alwaysIncluded = [
  'Free initial consultation',
  'Custom planning tailored to your event',
  'Direct communication with Remlyn',
  'Detailed event timeline',
  'Vendor coordination on your behalf',
  'Day-of support and problem solving',
];

const paymentSteps = [
  { step: 'Deposit', detail: '30–50% to reserve your date' },
  { step: 'Progress', detail: 'Milestone payments during planning' },
  { step: 'Balance', detail: 'Settled 1–2 weeks before event day' },
];

const faqs = [
  { q: 'What deposit is required?', a: 'We typically require a 30–50% deposit to reserve your date. Balance is due 1–2 weeks before the event.' },
  { q: 'What is the payment schedule?', a: 'Deposit upon booking, progress payments during planning, and balance before event day. Flexible schedules available.' },
  { q: 'Are your packages flexible?', a: 'Yes — all packages are fully customizable. We build around your budget and vision, not the other way around.' },
  { q: 'Do you offer package discounts for early booking?', a: 'Clients who book more than 6 months in advance may qualify for early-booking rates. Ask us for details.' },
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

export default function CelebrationsPricingPage() {
  return (
    <div data-section="celebrations">

      {/* ── Hero ── */}
      <section className="py-36 px-6 relative overflow-hidden" style={CELEB_BG}>
        <div
          className="absolute top-0 left-0 right-0 h-1"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(192,0,106,0.35), transparent)' }}
        />
        <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col gap-8 animate-fade-in-up">
          <span className="text-label text-center">Aether Celebrations — Pricing</span>
          <h1>Packages built<br /><em>around your vision.</em></h1>
          <p className="text-lead mx-auto" style={{ maxWidth: '540px' }}>
            Every event is different — so every quote is custom. Here's what to expect as a
            starting point. We'll build the right package together.
          </p>
        </div>
      </section>

      <div style={DIVIDER_PINK} />

      {/* ── Packages ── */}
      <section className="py-24 px-6" style={CELEB_BG}>
        <div className="max-w-6xl mx-auto flex flex-col gap-6">
          {packages.map((pkg) => (
            <div key={pkg.title} className="p-10 rounded-lg" style={CARD_STYLE}>
              <div className="flex items-center gap-4 mb-8">
                <div
                  className="w-12 h-12 rounded-sm flex items-center justify-center text-xl flex-shrink-0"
                  style={{ background: pkg.accentBg, border: `1px solid ${pkg.accentBorder}`, color: pkg.accentColor }}
                >
                  {pkg.icon}
                </div>
                <h3 style={{ margin: 0 }}>{pkg.title}</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {pkg.tiers.map((tier) => (
                  <div key={tier.name} className="p-6 rounded-lg flex flex-col gap-4" style={CARD_WARM}>
                    <div>
                      <span className="text-label" style={{ marginBottom: '0.25rem' }}>{tier.name}</span>
                      <p
                        className="text-xl font-semibold"
                        style={{ color: pkg.accentColor, fontFamily: "'Playfair Display', Georgia, serif", margin: 0, lineHeight: '1.3' }}
                      >
                        {tier.price}
                      </p>
                    </div>
                    <ul className="flex flex-col gap-2">
                      {tier.items.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-sm" style={{ lineHeight: '1.7' }}>
                          <span style={{ color: pkg.accentColor, flexShrink: 0, marginTop: '2px' }}>✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div style={DIVIDER_PINK} />

      {/* ── Always Included ── */}
      <section className="py-24 px-6" style={CELEB_BG_ALT}>
        <div className="max-w-3xl mx-auto text-center flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <span className="text-label text-center">Always Included</span>
            <h2>What every client gets.</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
            {alwaysIncluded.map((item) => (
              <div key={item} className="flex items-center gap-3 p-4 rounded-lg" style={CARD_STYLE}>
                <span style={{ color: '#c0006a', flexShrink: 0 }}>✓</span>
                <span className="text-sm" style={{ lineHeight: '1.6' }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={DIVIDER_PINK} />

      {/* ── Payment & FAQ ── */}
      <section className="py-24 px-6" style={CELEB_BG}>
        <div className="max-w-3xl mx-auto flex flex-col gap-10">
          <div className="flex flex-col gap-6">
            <span className="text-label text-center">Payment Options</span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {paymentSteps.map((p) => (
                <div key={p.step} className="p-6 rounded-lg text-center flex flex-col gap-2" style={CARD_STYLE}>
                  <p
                    className="text-sm font-semibold"
                    style={{ color: '#c0006a', fontFamily: "'Lato', sans-serif", letterSpacing: '0.04em' }}
                  >
                    {p.step}
                  </p>
                  <p className="text-sm" style={{ lineHeight: '1.65' }}>{p.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <span className="text-label text-center mb-2">Pricing FAQ</span>
            {faqs.map((faq) => (
              <div key={faq.q} className="p-8 rounded-lg" style={CARD_STYLE}>
                <h4 style={{ margin: '0 0 0.75rem' }}>{faq.q}</h4>
                <p className="text-sm" style={{ lineHeight: '1.75', margin: 0 }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={DIVIDER_PINK} />

      {/* ── CTA ── */}
      <section className="py-24 px-6" style={CELEB_BG_ALT}>
        <div className="max-w-2xl mx-auto text-center flex flex-col gap-6">
          <span className="text-label text-center">Get a Custom Quote</span>
          <h2>Tell us your vision.<br /><em>We'll make it work beautifully.</em></h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <Button href="/celebrations/contact" size="lg">Request Custom Quote</Button>
            <Button href="/celebrations/services" variant="outline" size="lg">Our Services</Button>
          </div>
        </div>
      </section>

    </div>
  );
}
