import type { Metadata } from 'next';
import { Button } from '../../../components/Button';

export const metadata: Metadata = {
  title: 'Services — Aether Celebrations',
  description: 'Wedding planning, event coordination, venue design, and souvenir printing in Cavite, Philippines.',
};

const services = [
  {
    icon: '✦',
    title: 'Wedding Planning',
    accentColor: '#c0006a',
    accentBg: 'rgba(192,0,106,0.08)',
    accentBorder: 'rgba(192,0,106,0.22)',
    items: [
      'Full wedding coordination from planning to day-of',
      'Venue sourcing and site visits',
      'Supplier management (caterer, florist, photographer)',
      'Timeline and logistics planning',
      'Wedding ceremony and reception design',
      'On-site coordination on your wedding day',
    ],
    process: 'Consultation → Vision session → Planning → Vendor coordination → Rehearsal → Wedding day',
    timeline: 'Planning begins 3–12 months before your date',
  },
  {
    icon: '◉',
    title: 'Event Coordination',
    accentColor: '#5a3f82',
    accentBg: 'rgba(106,76,147,0.08)',
    accentBorder: 'rgba(106,76,147,0.22)',
    items: [
      'Birthday celebrations (debut, 1st birthday, milestones)',
      'Anniversary events (intimate to grand)',
      'Corporate gatherings and year-end parties',
      'Customizable themes and concepts',
      'Supplier sourcing and negotiation',
      'Full day-of coordination and support',
    ],
    process: 'Consultation → Concept → Planning → Coordination → Event day',
    timeline: '4–12 weeks depending on event size',
  },
  {
    icon: '◇',
    title: 'Venue Design & Décor',
    accentColor: '#c0006a',
    accentBg: 'rgba(192,0,106,0.08)',
    accentBorder: 'rgba(192,0,106,0.22)',
    items: [
      'Custom theme design and mood board',
      'Floral arrangements and installations',
      'Table settings and centrepieces',
      'Lighting and backdrop design',
      'Full setup and teardown on event day',
      'Coordination with venue management',
    ],
    process: 'Concept → Design board → Sourcing → Setup → Event day → Teardown',
    timeline: '2–8 weeks from concept to event',
  },
  {
    icon: '◈',
    title: 'Souvenirs & Invitations',
    accentColor: '#5a3f82',
    accentBg: 'rgba(106,76,147,0.08)',
    accentBorder: 'rgba(106,76,147,0.22)',
    items: [
      'Custom-designed wedding and event invitations',
      'Personalized souvenir items (tokens, giveaways)',
      'Souvenir box design and assembly',
      'Printing of event programs and seating charts',
      'Photo booklets and memory books',
      'Minimum quantities based on print run',
    ],
    process: 'Design brief → Mockup → Approval → Production → Delivery',
    timeline: '2–4 weeks production time',
  },
];

const steps = [
  { step: '01', label: 'Consultation', detail: 'Tell us about your event, vision, and budget.' },
  { step: '02', label: 'Custom Proposal', detail: 'We design a plan tailored specifically for you.' },
  { step: '03', label: 'We Execute', detail: 'You relax. We handle every detail through event day.' },
];

const faqs = [
  { q: 'How far in advance should we plan?', a: 'For weddings, we recommend starting 6–12 months ahead. Other events can be planned in 4–12 weeks, depending on complexity.' },
  { q: 'What is the cancellation policy?', a: 'Deposits are non-refundable but credits can be transferred to a rescheduled date within 12 months. Full terms are in your contract.' },
  { q: 'Can we customize the package?', a: "Yes — every engagement is custom. We don't believe in rigid packages. We build around your vision and budget." },
  { q: 'Do you handle all the details?', a: "Yes, that's the point. From vendor calls to day-of logistics, we manage it all so you can enjoy every moment." },
  { q: 'What if we have a specific theme?', a: "We love specific visions. Share your inspiration (Pinterest boards, mood boards, references) and we'll make it happen." },
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

export default function CelebrationsServicesPage() {
  return (
    <div data-section="celebrations">

      {/* ── Hero ── */}
      <section className="py-36 px-6 relative overflow-hidden" style={CELEB_BG}>
        <div
          className="absolute top-0 left-0 right-0 h-1"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(192,0,106,0.35), transparent)' }}
        />
        <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col gap-8 animate-fade-in-up">
          <span className="text-label text-center">Aether Celebrations — Services</span>
          <h1>Every detail,<br /><em>handled with love.</em></h1>
          <p className="text-lead mx-auto" style={{ maxWidth: '560px' }}>
            From the first consultation to the final dance — we take care of everything so you
            can be fully present in every moment.
          </p>
        </div>
      </section>

      <div style={DIVIDER_PINK} />

      {/* ── Service Detail Cards ── */}
      <section className="py-24 px-6" style={CELEB_BG}>
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
                    <h3 style={{ margin: 0 }}>{s.title}</h3>
                  </div>
                  <ul className="flex flex-col gap-2.5">
                    {s.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm" style={{ lineHeight: '1.7' }}>
                        <span style={{ color: s.accentColor, marginTop: '2px', flexShrink: 0 }}>✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="p-6 rounded-lg" style={CARD_WARM}>
                    <span className="text-label" style={{ marginBottom: '0.5rem' }}>Our Process</span>
                    <p className="text-sm" style={{ lineHeight: '1.75', margin: 0 }}>{s.process}</p>
                  </div>
                  <div className="p-6 rounded-lg" style={CARD_WARM}>
                    <span className="text-label" style={{ marginBottom: '0.5rem' }}>Timeline</span>
                    <p className="text-sm" style={{ lineHeight: '1.75', margin: 0 }}>{s.timeline}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div style={DIVIDER_PINK} />

      {/* ── How We Work ── */}
      <section className="py-24 px-6" style={CELEB_BG_ALT}>
        <div className="max-w-3xl mx-auto text-center flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <span className="text-label text-center">How We Work</span>
            <h2>Your vision.<br /><em>Our expertise.</em></h2>
            <p className="text-lead">
              We start with a free consultation to understand what you're envisioning. From there, we
              build a custom proposal — no templates, no generic packages. Just a plan made for you.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
            {steps.map((step) => (
              <div key={step.step} className="p-6 rounded-lg flex flex-col gap-3" style={CARD_STYLE}>
                <span
                  className="text-xs font-semibold"
                  style={{ color: '#c0006a', letterSpacing: '0.1em', fontFamily: "'Lato', sans-serif" }}
                >
                  {step.step}
                </span>
                <h4 style={{ margin: 0 }}>{step.label}</h4>
                <p className="text-sm" style={{ lineHeight: '1.7', margin: 0 }}>{step.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={DIVIDER_PINK} />

      {/* ── FAQ ── */}
      <section className="py-24 px-6" style={CELEB_BG}>
        <div className="max-w-3xl mx-auto">
          <span className="text-label text-center mb-16 block">Frequently Asked</span>
          <div className="flex flex-col gap-4">
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
          <span className="text-label text-center">Start Planning</span>
          <h2><em>Begin your event journey</em><br />with a free consultation.</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <Button href="/celebrations/contact" size="lg">Book Consultation</Button>
            <Button href="/celebrations/pricing" variant="outline" size="lg">View Packages</Button>
          </div>
        </div>
      </section>

    </div>
  );
}
