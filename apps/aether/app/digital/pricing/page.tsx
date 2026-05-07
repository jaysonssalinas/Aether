import type { Metadata } from 'next';
import { Button } from '../../../components/Button';

export const metadata: Metadata = {
  title: 'Pricing — Aether Digital',
  description: 'Transparent pricing for websites, software systems, and digital services. No hidden fees.',
};

const pricing = [
  {
    title: 'Website Design',
    icon: '◻',
    accentColor: '#7dd3fc',
    accentBg: 'rgba(96,165,250,0.10)',
    accentBorder: 'rgba(125,211,252,0.30)',
    entries: [
      { label: 'One-time build fee', value: '₱8,000 – ₱15,000' },
      { label: 'Monthly maintenance', value: '₱1,500 – ₱2,500/mo' },
    ],
    includes: ['Custom design', 'Mobile-responsive', 'SEO-ready', 'Contact form', '30 days post-launch support'],
  },
  {
    title: 'Printing System License',
    icon: '⊞',
    accentColor: '#a78bfa',
    accentBg: 'rgba(167,139,250,0.10)',
    accentBorder: 'rgba(167,139,250,0.30)',
    entries: [
      { label: 'One-time license', value: '₱5,000 – ₱10,000' },
      { label: 'Monthly support', value: '₱1,500 – ₱2,000/mo' },
    ],
    includes: ['Installation & setup', 'Staff training', 'Ongoing support', 'Software updates'],
  },
  {
    title: 'Inventory System License',
    icon: '⊟',
    accentColor: '#22d3ee',
    accentBg: 'rgba(34,211,238,0.08)',
    accentBorder: 'rgba(34,211,238,0.28)',
    entries: [
      { label: 'One-time license', value: '₱5,000 – ₱8,000' },
      { label: 'Monthly support', value: '₱1,500 – ₱2,500/mo' },
    ],
    includes: ['Installation & setup', 'Staff training', 'Ongoing support', 'Software updates'],
  },
  {
    title: 'Domain Management',
    icon: '◈',
    accentColor: '#7dd3fc',
    accentBg: 'rgba(96,165,250,0.10)',
    accentBorder: 'rgba(125,211,252,0.30)',
    entries: [
      { label: 'Monthly retainer', value: '₱500 – ₱1,000/mo' },
    ],
    includes: ['Domain renewal', 'DNS management', 'Hosting oversight', 'Technical support'],
  },
];

const whyItems = [
  { label: 'Professional tools & licenses', detail: 'We invest in the right tools so you get a premium result.' },
  { label: 'Expert time investment', detail: 'Every hour we spend is focused on your specific needs.' },
  { label: 'Ongoing support commitment', detail: "We're here after launch — not just during the build." },
  { label: 'Custom, not templated', detail: 'You pay for work designed for you, not recycled from another client.' },
];

const faqs = [
  { q: 'Do you offer payment plans?', a: 'Yes — we can split the one-time fee into 2–3 installments for qualifying projects. Ask us during consultation.' },
  { q: "Can we customize what's included?", a: "Absolutely. Every engagement is scoped to your needs. We don't charge for things you don't need." },
  { q: 'What if we need more after launch?', a: "We offer add-ons anytime — new pages, features, integrations. Just reach out and we'll quote it." },
  { q: 'Do you offer discounts for annual contracts?', a: 'Yes — clients who commit to 12-month maintenance get a discounted monthly rate. Ask us for details.' },
];

const DIGITAL_BG = {
  background: `
    radial-gradient(circle at 20% 10%, rgba(96,165,250,0.18), transparent 42%),
    radial-gradient(circle at 80% 15%, rgba(167,139,250,0.16), transparent 45%),
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
};

export default function DigitalPricingPage() {
  return (
    <div data-section="digital" className="on-dark">

      {/* ── Hero ── */}
      <section className="py-36 px-6 relative overflow-hidden" style={DIGITAL_BG}>
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(96,165,250,0.5), transparent)' }}
        />
        <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col gap-8 animate-fade-in-up">
          <span className="text-label text-center">Aether Digital — Pricing</span>
          <h1>
            <span className="text-gradient">Transparent pricing.</span>
            <br />
            <span style={{ color: '#f3f7ff' }}>Real value.</span>
          </h1>
          <p className="text-lead mx-auto" style={{ maxWidth: '540px', color: '#b8c4dc' }}>
            We believe pricing should be clear — no hidden fees, no surprises. Here's what you can
            expect for each service.
          </p>
        </div>
      </section>

      <div style={DIVIDER_BLUE} />

      {/* ── Pricing Cards ── */}
      <section className="py-24 px-6" style={DIGITAL_BG}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
          {pricing.map((p) => (
            <div key={p.title} className="p-8 rounded-lg flex flex-col gap-6" style={CARD_STYLE}>
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-sm flex items-center justify-center text-xl flex-shrink-0"
                  style={{ background: p.accentBg, border: `1px solid ${p.accentBorder}`, color: p.accentColor }}
                >
                  {p.icon}
                </div>
                <h3 style={{ color: '#f3f7ff', margin: 0 }}>{p.title}</h3>
              </div>

              <div className="flex flex-col gap-3">
                {p.entries.map((e) => (
                  <div key={e.label} className="flex justify-between items-baseline gap-4">
                    <span className="text-sm" style={{ color: '#8ea0c8' }}>{e.label}</span>
                    <span className="text-base font-semibold" style={{ color: p.accentColor, fontFamily: "'Poppins', sans-serif", letterSpacing: '-0.01em', whiteSpace: 'nowrap' }}>{e.value}</span>
                  </div>
                ))}
              </div>

              <div className="h-px" style={{ background: 'rgba(96,165,250,0.18)' }} />

              <div>
                <span className="text-label" style={{ marginBottom: '0.75rem' }}>Includes</span>
                <ul className="flex flex-col gap-2">
                  {p.includes.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm" style={{ color: '#b8c4dc', lineHeight: '1.6' }}>
                      <span style={{ color: p.accentColor, flexShrink: 0 }}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div style={DIVIDER_BLUE} />

      {/* ── Why This Pricing ── */}
      <section className="py-24 px-6" style={DIGITAL_BG}>
        <div className="max-w-3xl mx-auto flex flex-col gap-10">
          <div className="text-center flex flex-col gap-4">
            <span className="text-label text-center">Why This Pricing</span>
            <h2>
              <span className="text-gradient">Quality costs less</span>
              <br />
              <span style={{ color: '#f3f7ff' }}>than you think.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
            {whyItems.map((item) => (
              <div key={item.label} className="p-6 rounded-lg" style={CARD_STYLE}>
                <p className="text-sm font-semibold mb-2" style={{ color: '#7dd3fc', fontFamily: "'Inter', sans-serif", letterSpacing: '0.02em' }}>{item.label}</p>
                <p className="text-sm" style={{ color: '#b8c4dc', lineHeight: '1.65' }}>{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={DIVIDER_BLUE} />

      {/* ── FAQ ── */}
      <section className="py-24 px-6" style={DIGITAL_BG}>
        <div className="max-w-3xl mx-auto">
          <span className="text-label text-center mb-16 block">Pricing FAQ</span>
          <div className="flex flex-col gap-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="p-8 rounded-lg" style={CARD_STYLE}>
                <h4 style={{ color: '#f3f7ff', margin: '0 0 0.75rem' }}>{faq.q}</h4>
                <p className="text-sm" style={{ color: '#b8c4dc', lineHeight: '1.7', margin: 0 }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={DIVIDER_BLUE} />

      {/* ── CTA ── */}
      <section className="py-24 px-6" style={DIGITAL_BG}>
        <div className="max-w-2xl mx-auto text-center flex flex-col gap-6">
          <span className="text-label text-center">Get a Custom Quote</span>
          <h2>
            <span className="text-gradient">Every project is different.</span>
            <br />
            <span style={{ color: '#f3f7ff' }}>Tell us what you need.</span>
          </h2>
          <p style={{ color: '#b8c4dc', lineHeight: '1.7' }}>
            We'll give you a clear, honest price with no surprises.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <Button href="/digital/contact" size="lg">Contact Us</Button>
            <Button href="/digital/services" variant="outline" size="lg">View Services</Button>
          </div>
        </div>
      </section>

    </div>
  );
}
