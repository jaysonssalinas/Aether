import type { Metadata } from 'next';
import { Button } from '../../components/Button';

export const metadata: Metadata = {
  title: 'Portfolio — Aether Digital',
  description: 'Case studies from Aether Digital. See how we build websites and systems for Philippine businesses.',
};

export default function PortfolioPage() {
  return (
    <>
      <section className="py-32 px-6 relative" style={{ background: '#0a0a0a' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 30% at 50% 0%, rgba(255,20,147,0.05) 0%, transparent 70%)' }} />
        <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col gap-6">
          <p className="text-xs tracking-[0.3em] uppercase" style={{ color: '#666666' }}>Portfolio</p>
          <h1 className="text-4xl md:text-5xl font-medium" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#f5f5f0' }}>
            Real clients. Real results.
          </h1>
          <p className="text-base leading-relaxed" style={{ color: '#999999' }}>
            Every project we take on has a story. Here's how we help Philippine businesses build their digital presence.
          </p>
        </div>
      </section>

      {/* Case Study: Rimando Law */}
      <section className="py-24 px-6" style={{ background: '#080808' }}>
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col gap-12">
            {/* Header */}
            <div className="flex flex-col gap-4">
              <span className="text-xs tracking-[0.2em] uppercase px-3 py-1 rounded-full self-start" style={{ color: '#ff4081', border: '1px solid rgba(255,20,147,0.2)', background: 'rgba(255,20,147,0.05)' }}>
                Case Study · Web Development
              </span>
              <h2 className="text-3xl md:text-4xl font-medium" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#f5f5f0' }}>
                Rimando Law Office
              </h2>
              <p className="text-base" style={{ color: '#666666' }}>Full-service legal firm · Bacoor, Cavite, Philippines</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Main content */}
              <div className="md:col-span-2 flex flex-col gap-8">
                {/* The Challenge */}
                <div className="flex flex-col gap-4">
                  <h3 className="text-lg font-medium" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#f5f5f0' }}>The Challenge</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#888888' }}>
                    Rimando Law Office is a full-service legal firm specializing in labor law, OFW matters, civil litigation, and corporate law. Despite their strong reputation, they had no professional website — potential clients couldn't find them online, and their contact information was scattered across different platforms.
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: '#888888' }}>
                    They needed a site that communicated professionalism immediately, worked on mobile (since many clients access via phone), and clearly explained their practice areas without legal jargon.
                  </p>
                </div>

                {/* The Solution */}
                <div className="flex flex-col gap-4">
                  <h3 className="text-lg font-medium" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#f5f5f0' }}>The Solution</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#888888' }}>
                    We built a clean, professional website around their core tagline: <em style={{ color: '#f5f5f0' }}>"Fast, Reliable Lawyering — Here and Abroad."</em> The design emphasized trust and accessibility — two things their OFW clients especially need.
                  </p>
                  <ul className="flex flex-col gap-3">
                    {[
                      'Mobile-first design so clients can contact them from anywhere',
                      'Clearly organized practice areas: Labor & Employment, OFW matters, Civil, Corporate, Family, Criminal, Real Estate',
                      'Multiple contact channels: WhatsApp, Viber, email, and phone',
                      'Professional photography and copy that establishes immediate credibility',
                      'Fast loading — optimized for Philippine mobile networks',
                    ].map((item) => (
                      <li key={item} className="text-sm flex items-start gap-2" style={{ color: '#888888' }}>
                        <span style={{ color: '#ff1493', flexShrink: 0 }}>✓</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* The Results */}
                <div className="flex flex-col gap-4">
                  <h3 className="text-lg font-medium" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#f5f5f0' }}>The Results</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { metric: '2 Weeks', detail: 'From brief to live website' },
                      { metric: '100%', detail: 'Mobile responsive' },
                      { metric: 'Active', detail: 'Monthly maintenance plan' },
                      { metric: '6 Areas', detail: 'Practice areas clearly presented' },
                    ].map((r) => (
                      <div key={r.metric} className="p-4 rounded-lg" style={{ background: '#0a0a0a', border: '1px solid #1e1e1e' }}>
                        <p className="text-2xl font-medium gradient-text" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{r.metric}</p>
                        <p className="text-xs mt-1" style={{ color: '#666666' }}>{r.detail}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Testimonial */}
                <div className="p-6 rounded-lg" style={{ background: '#0a0a0a', border: '1px solid rgba(255,20,147,0.15)' }}>
                  <p className="text-base italic leading-relaxed" style={{ color: '#cccccc', fontFamily: "'Playfair Display', Georgia, serif" }}>
                    "Aether Digital built our law firm website with professionalism and speed. Our online presence transformed overnight."
                  </p>
                  <p className="text-sm mt-4 font-medium" style={{ color: '#f5f5f0' }}>Atty. Rimando</p>
                  <p className="text-xs mt-1" style={{ color: '#666666' }}>Rimando Law Office, Bacoor Cavite</p>
                </div>
              </div>

              {/* Sidebar */}
              <div className="flex flex-col gap-6">
                <div className="p-6 rounded-lg flex flex-col gap-4" style={{ background: '#111111', border: '1px solid #1e1e1e' }}>
                  <p className="text-xs tracking-[0.2em] uppercase" style={{ color: '#666666' }}>Project Details</p>
                  {[
                    { label: 'Client', value: 'Rimando Law Office' },
                    { label: 'Location', value: 'Bacoor, Cavite' },
                    { label: 'Industry', value: 'Legal Services' },
                    { label: 'Services', value: 'Web Design, SEO' },
                    { label: 'Timeline', value: '2 weeks' },
                    { label: 'Status', value: 'Live + Maintained' },
                  ].map((d) => (
                    <div key={d.label} className="flex flex-col gap-1 py-2" style={{ borderBottom: '1px solid #1e1e1e' }}>
                      <p className="text-xs" style={{ color: '#666666' }}>{d.label}</p>
                      <p className="text-sm font-medium" style={{ color: '#f5f5f0' }}>{d.value}</p>
                    </div>
                  ))}
                </div>
                <div className="p-6 rounded-lg flex flex-col gap-3" style={{ background: '#111111', border: '1px solid #1e1e1e' }}>
                  <p className="text-xs tracking-[0.2em] uppercase" style={{ color: '#666666' }}>Technologies</p>
                  {['Next.js', 'Tailwind CSS', 'Vercel', 'Google Analytics', 'Mobile-first CSS'].map((t) => (
                    <span key={t} className="text-xs px-3 py-1 rounded-full self-start" style={{ background: 'rgba(255,20,147,0.08)', color: '#ff4081', border: '1px solid rgba(255,20,147,0.15)' }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* More coming soon — handled honestly */}
      <section className="py-24 px-6" style={{ background: '#0a0a0a' }}>
        <div className="max-w-6xl mx-auto">
          <div className="p-10 rounded-lg text-center flex flex-col gap-4" style={{ background: '#111111', border: '1px solid #1e1e1e' }}>
            <p className="text-2xl font-medium" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#f5f5f0' }}>
              Your project could be next.
            </p>
            <p className="text-sm" style={{ color: '#666666' }}>We are actively taking on new clients. Let's talk about what you need.</p>
            <div className="flex justify-center mt-4">
              <Button href="/contact">Start Your Project →</Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
