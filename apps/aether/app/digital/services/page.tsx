import type { Metadata } from 'next';
import { Button } from '../../../components/Button';

export const metadata: Metadata = {
  title: 'Services — Aether Digital',
  description: 'Custom websites, POS systems, inventory software, domain management, and SEO for Philippine businesses.',
};

const services = [
  {
    icon: '◻',
    title: 'Website Design & Development',
    accentColor: '#7dd3fc',
    accentBg: 'rgba(96,165,250,0.10)',
    accentBorder: 'rgba(125,211,252,0.30)',
    items: [
      'Custom design — no templates',
      'Mobile-responsive (looks great on phones)',
      'Fast loading (optimized for Philippine connections)',
      'SEO-ready structure from day one',
      'Contact forms and call-to-action pages',
      'Integration with Google Maps, Facebook, and more',
    ],
    process: 'Consultation → Design mockup → Development → Review → Launch',
    timeline: '2–4 weeks depending on scope',
  },
  {
    icon: '⊞',
    title: 'POS System',
    accentColor: '#a78bfa',
    accentBg: 'rgba(167,139,250,0.10)',
    accentBorder: 'rgba(167,139,250,0.30)',
    items: [
      'Sales recording and receipt printing',
      'Product and inventory tracking',
      'Daily, weekly, and monthly sales reports',
      'Multi-user access with role permissions',
      'Works offline — no internet dependency',
      'Training and ongoing support included',
    ],
    process: 'Requirements gathering → Setup → Training → Launch → Support',
    timeline: '1–2 weeks setup + training',
  },
  {
    icon: '⊟',
    title: 'Inventory System',
    accentColor: '#22d3ee',
    accentBg: 'rgba(34,211,238,0.08)',
    accentBorder: 'rgba(34,211,238,0.28)',
    items: [
      'Stock in / stock out tracking',
      'Low-stock alerts and reorder notifications',
      'Supplier management and purchase orders',
      'Product categorization and barcode support',
      'Reports: stock levels, movement history',
      'Connects with POS for unified view',
    ],
    process: 'Requirements gathering → Setup → Training → Launch → Support',
    timeline: '1–2 weeks setup + training',
  },
  {
    icon: '◈',
    title: 'Domain & Hosting Management',
    accentColor: '#7dd3fc',
    accentBg: 'rgba(96,165,250,0.10)',
    accentBorder: 'rgba(125,211,252,0.30)',
    items: [
      'Domain registration (.ph, .com, .net)',
      'DNS configuration and management',
      'Hosting setup and ongoing maintenance',
      'SSL certificate (HTTPS security)',
      'Email setup (professional @yourdomain.ph)',
      'Annual renewal reminders and management',
    ],
    process: 'Domain selection → Registration → Setup → Handover',
    timeline: 'Same day to 48 hours',
  },
  {
    icon: '◉',
    title: 'SEO & Online Presence',
    accentColor: '#a78bfa',
    accentBg: 'rgba(167,139,250,0.10)',
    accentBorder: 'rgba(167,139,250,0.30)',
    items: [
      'Google Search Console setup and monitoring',
      'On-page SEO: titles, descriptions, structure',
      'Google My Business profile optimization',
      'Local SEO for Cavite and Philippine searches',
      'Monthly performance reports',
      'Content guidance for better rankings',
    ],
    process: 'Audit → Optimization → Monitoring → Monthly reporting',
    timeline: 'Ongoing — results visible in 2–3 months',
  },
];

const faqs = [
  { q: 'How long does a website take?', a: "2–4 weeks for most sites. Complex projects may take longer. We'll give you a specific timeline during consultation." },
  { q: 'Can I update my website myself?', a: 'Yes — we build with easy content management in mind. We also offer maintenance packages if you prefer we handle updates.' },
  { q: 'What happens after launch?', a: 'We provide 30 days of free support after launch. After that, we offer monthly maintenance packages.' },
  { q: 'Do you provide hosting support?', a: 'Yes. We manage your hosting, renewals, and technical issues. You focus on your business — we handle the tech.' },
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

export default function DigitalServicesPage() {
  return (
    <div data-section="digital" className="on-dark">

      {/* ── Hero ── */}
      <section className="py-36 px-6 relative overflow-hidden" style={DIGITAL_BG}>
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(96,165,250,0.5), transparent)' }}
        />
        <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col gap-8 animate-fade-in-up">
          <span className="text-label text-center">Aether Digital — Services</span>
          <h1>
            <span className="text-gradient">Everything your business</span>
            <br />
            <span style={{ color: '#f3f7ff' }}>needs to go digital.</span>
          </h1>
          <p className="text-lead mx-auto" style={{ maxWidth: '560px', color: '#b8c4dc' }}>
            Custom-built solutions for Philippine businesses. No templates, no shortcuts — just
            reliable systems that work for you.
          </p>
        </div>
      </section>

      <div style={DIVIDER_BLUE} />

      {/* ── Service Detail Cards ── */}
      <section className="py-24 px-6" style={DIGITAL_BG}>
        <div className="max-w-6xl mx-auto flex flex-col gap-6">
          {services.map((s) => (
            <div key={s.title} className="p-10 rounded-lg" style={CARD_STYLE}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-sm flex items-center justify-center text-xl flex-shrink-0"
                      style={{ background: s.accentBg, border: `1px solid ${s.accentBorder}`, color: s.accentColor }}
                    >
                      {s.icon}
                    </div>
                    <h3 style={{ color: '#f3f7ff', margin: 0 }}>{s.title}</h3>
                  </div>
                  <ul className="flex flex-col gap-2.5">
                    {s.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm" style={{ color: '#b8c4dc', lineHeight: '1.6' }}>
                        <span style={{ color: s.accentColor, marginTop: '2px', flexShrink: 0 }}>✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col gap-4">
                  <div
                    className="p-6 rounded-lg"
                    style={{ background: 'rgba(8,12,24,0.6)', border: `1px solid ${s.accentBorder}` }}
                  >
                    <span className="text-label" style={{ marginBottom: '0.5rem' }}>Process</span>
                    <p className="text-sm" style={{ color: '#b8c4dc', lineHeight: '1.65', margin: 0 }}>{s.process}</p>
                  </div>
                  <div
                    className="p-6 rounded-lg"
                    style={{ background: 'rgba(8,12,24,0.6)', border: `1px solid ${s.accentBorder}` }}
                  >
                    <span className="text-label" style={{ marginBottom: '0.5rem' }}>Timeline</span>
                    <p className="text-sm" style={{ color: '#b8c4dc', lineHeight: '1.65', margin: 0 }}>{s.timeline}</p>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </section>

      <div style={DIVIDER_BLUE} />

      {/* ── FAQ ── */}
      <section className="py-24 px-6" style={DIGITAL_BG}>
        <div className="max-w-3xl mx-auto">
          <span className="text-label text-center mb-16 block">Frequently Asked</span>
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
          <span className="text-label text-center">Start Your Project</span>
          <h2>
            <span className="text-gradient">Ready to build</span>
            <br />
            <span style={{ color: '#f3f7ff' }}>something that lasts?</span>
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <Button href="/digital/contact" size="lg">Schedule Consultation</Button>
            <Button href="/digital/pricing" variant="outline" size="lg">View Pricing</Button>
          </div>
        </div>
      </section>

    </div>
  );
}
