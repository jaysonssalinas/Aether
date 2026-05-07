import type { Metadata } from 'next';
import { Button } from '../../../components/Button';

export const metadata: Metadata = {
  title: 'Portfolio — Aether Digital',
  description: "See what we've built for Philippine businesses. Case studies, live websites, and real results.",
};

const stack = ['Next.js', 'Tailwind CSS', 'Vercel Hosting', 'Custom Domain', 'SEO Optimization'];

const stats = [
  { label: 'Timeline', value: '2 weeks' },
  { label: 'Result', value: 'Google-indexed' },
  { label: 'Mobile', value: 'Fully responsive' },
  { label: 'Support', value: 'Ongoing' },
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
};

export default function DigitalPortfolioPage() {
  return (
    <div data-section="digital" className="on-dark">

      {/* ── Hero ── */}
      <section className="py-36 px-6 relative overflow-hidden" style={DIGITAL_BG}>
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(96,165,250,0.5), transparent)' }}
        />
        <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col gap-8 animate-fade-in-up">
          <span className="text-label text-center">Aether Digital — Portfolio</span>
          <h1>
            <span className="text-gradient">Proof of work.</span>
          </h1>
          <p className="text-lead mx-auto" style={{ maxWidth: '520px', color: '#b8c4dc' }}>
            We don't just promise results — we show them. Here's what we've built for real businesses.
          </p>
        </div>
      </section>

      <div style={DIVIDER_BLUE} />

      {/* ── Featured Case Study ── */}
      <section className="py-24 px-6" style={DIGITAL_BG}>
        <div className="max-w-6xl mx-auto">
          <span className="text-label mb-16 block">Featured Project</span>
          <div className="p-10 rounded-lg" style={CARD_STYLE}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

              <div className="flex flex-col gap-6">
                <div
                  className="w-16 h-16 rounded-lg flex items-center justify-center text-3xl"
                  style={{ background: 'rgba(96,165,250,0.12)', border: '1px solid rgba(125,211,252,0.35)', color: '#7dd3fc' }}
                >
                  ⚖
                </div>
                <div>
                  <h2 style={{ color: '#f3f7ff', margin: '0 0 0.5rem' }}>Rimando Law Office</h2>
                  <p className="text-sm" style={{ color: '#7dd3fc', letterSpacing: '0.04em' }}>
                    Law Firm Website — Bacoor, Cavite
                  </p>
                </div>

                <div className="flex flex-col gap-6">
                  <div>
                    <span className="text-label" style={{ marginBottom: '0.5rem' }}>The Challenge</span>
                    <p className="text-sm" style={{ color: '#b8c4dc', lineHeight: '1.7' }}>
                      The law office had no online presence, relying entirely on word-of-mouth referrals.
                      Potential clients couldn't find them on Google, and there was no professional way to
                      showcase their services or accept inquiries online.
                    </p>
                  </div>
                  <div>
                    <span className="text-label" style={{ marginBottom: '0.5rem' }}>What We Built</span>
                    <p className="text-sm" style={{ color: '#b8c4dc', lineHeight: '1.7' }}>
                      A clean, professional law firm website with practice area pages, an attorney profile,
                      and a contact form. Built for trust — exactly what a client needs before hiring a lawyer.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {stack.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-3 py-1 rounded-full"
                      style={{ background: 'rgba(96,165,250,0.10)', color: '#7dd3fc', border: '1px solid rgba(125,211,252,0.28)' }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div>
                  <Button href="https://rimandolaw.com" external variant="outline" size="sm">
                    Visit Website →
                  </Button>
                </div>
              </div>

              <div className="flex flex-col gap-5">
                <div className="p-8 rounded-lg flex flex-col gap-4" style={{ background: 'rgba(8,12,24,0.7)', border: '1px solid rgba(96,165,250,0.18)' }}>
                  <span className="text-label">Client Testimonial</span>
                  <div
                    className="text-4xl"
                    style={{ color: '#7dd3fc', lineHeight: 1, fontFamily: "'Poppins', sans-serif" }}
                  >
                    &ldquo;
                  </div>
                  <p
                    className="text-base italic"
                    style={{ color: '#b8c4dc', lineHeight: '1.75', letterSpacing: '0.01em', fontFamily: "'Inter', sans-serif" }}
                  >
                    Aether Digital built our law firm website with professionalism and speed.
                    Our online presence transformed overnight.
                  </p>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: '#f3f7ff', letterSpacing: '0.02em' }}>Atty. Rimando</p>
                    <p className="text-xs mt-1" style={{ color: '#8ea0c8', letterSpacing: '0.05em' }}>Rimando Law Office, Bacoor Cavite</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {stats.map((stat) => (
                    <div key={stat.label} className="p-4 rounded-lg" style={CARD_STYLE}>
                      <p className="text-xs" style={{ color: '#8ea0c8', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{stat.label}</p>
                      <p className="text-sm font-semibold mt-1" style={{ color: '#7dd3fc' }}>{stat.value}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      <div style={DIVIDER_BLUE} />

      {/* ── Our Approach ── */}
      <section className="py-24 px-6" style={DIGITAL_BG_DEEP}>
        <div className="max-w-3xl mx-auto text-center flex flex-col gap-8">
          <span className="text-label text-center">Our Approach</span>
          <h2>
            <span className="text-gradient">We don't disappear</span>
            <br />
            <span style={{ color: '#f3f7ff' }}>after launch.</span>
          </h2>
          <p className="text-lead" style={{ color: '#b8c4dc' }}>
            Many agencies build and walk away. We treat every client as a long-term partner.
            Your website growing means our business growing — that's the only model that works.
          </p>
          <p style={{ color: '#8ea0c8', lineHeight: '1.75' }}>
            From domain management to monthly reporting, we stay in your corner so you can focus
            on running your business.
          </p>
        </div>
      </section>

      <div style={DIVIDER_BLUE} />

      {/* ── CTA ── */}
      <section className="py-24 px-6" style={DIGITAL_BG}>
        <div className="max-w-2xl mx-auto text-center flex flex-col gap-6">
          <span className="text-label text-center">Your Turn</span>
          <h2>
            <span className="text-gradient">See what we can do</span>
            <br />
            <span style={{ color: '#f3f7ff' }}>for your business.</span>
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <Button href="/digital/contact" size="lg">Get Started</Button>
            <Button href="/digital/services" variant="outline" size="lg">Our Services</Button>
          </div>
        </div>
      </section>

    </div>
  );
}
