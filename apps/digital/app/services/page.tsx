import type { Metadata } from 'next';
import { Button } from '../../components/Button';
import { getProductsByDivision, formatPrice } from '@aether/config/products';

export const metadata: Metadata = {
  title: 'Services — Aether Digital',
  description: 'Custom websites, POS systems, inventory software, domain hosting, and SEO for Philippine businesses.',
};

const process = [
  { step: '01', title: 'Discovery', desc: 'We listen first. We learn your business, your challenges, and your goals before writing a single line of code.' },
  { step: '02', title: 'Proposal', desc: 'We send a clear scope, timeline, and price. No jargon, no hidden fees. You approve before we start.' },
  { step: '03', title: 'Build', desc: 'We build in stages and share progress. You review and give feedback at each milestone.' },
  { step: '04', title: 'Launch', desc: 'We deploy, test, and hand over. Training included. You leave knowing exactly how to manage your new system.' },
  { step: '05', title: 'Support', desc: 'Monthly maintenance plans keep everything running. One call or message and we handle it.' },
];

export default function ServicesPage() {
  const products = getProductsByDivision('digital');
  const webProducts = products.filter((p) => p.category === 'Web Services');
  const softwareProducts = products.filter((p) => p.category === 'Software Systems');

  return (
    <>
      <section className="py-32 px-6 relative" style={{ background: '#0a0a0a' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 30% at 50% 0%, rgba(255,20,147,0.05) 0%, transparent 70%)' }} />
        <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col gap-6">
          <p className="text-xs tracking-[0.3em] uppercase" style={{ color: '#666666' }}>Our Services</p>
          <h1 className="text-4xl md:text-5xl font-medium" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#f5f5f0' }}>
            Everything your business needs to grow digitally.
          </h1>
          <p className="text-base leading-relaxed" style={{ color: '#999999' }}>
            From your first website to a full software system — we scope, build, and support it all.
          </p>
        </div>
      </section>

      {/* Web services */}
      <section className="py-24 px-6" style={{ background: '#080808' }}>
        <div className="max-w-6xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase mb-12" style={{ color: '#666666' }}>Web Services</p>
          <div className="flex flex-col gap-6">
            {webProducts.map((p) => (
              <div key={p.id} className="p-8 rounded-lg" style={{ background: '#111111', border: '1px solid #1e1e1e' }}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                  <div className="md:col-span-2 flex flex-col gap-3">
                    <div className="flex items-center gap-4">
                      <h3 className="text-xl font-medium" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#f5f5f0' }}>{p.name}</h3>
                      <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(255,20,147,0.08)', color: '#ff4081', border: '1px solid rgba(255,20,147,0.15)' }}>
                        {p.frequency === 'monthly' ? 'Monthly' : 'One-time'}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: '#888888' }}>{p.description}</p>
                    <ul className="flex flex-col gap-2 mt-2">
                      {p.includes.map((item) => (
                        <li key={item} className="text-sm flex items-center gap-2" style={{ color: '#666666' }}>
                          <span style={{ color: '#ff1493' }}>✓</span> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-2xl font-medium gradient-text" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{formatPrice(p)}</p>
                    <p className="text-xs" style={{ color: '#666666' }}>{p.frequency === 'monthly' ? 'billed monthly' : 'one-time payment'}</p>
                    <Button href="/contact" size="sm" className="mt-4">Get Started →</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Software systems */}
      <section className="py-24 px-6" style={{ background: '#0a0a0a' }}>
        <div className="max-w-6xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase mb-12" style={{ color: '#666666' }}>Software Systems</p>
          <div className="flex flex-col gap-6">
            {softwareProducts.map((p) => (
              <div key={p.id} className="p-8 rounded-lg" style={{ background: '#111111', border: '1px solid #1e1e1e' }}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                  <div className="md:col-span-2 flex flex-col gap-3">
                    <div className="flex items-center gap-4">
                      <h3 className="text-xl font-medium" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#f5f5f0' }}>{p.name}</h3>
                      <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(255,20,147,0.08)', color: '#ff4081', border: '1px solid rgba(255,20,147,0.15)' }}>
                        {p.frequency === 'monthly' ? 'Monthly' : 'One-time'}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: '#888888' }}>{p.description}</p>
                    <ul className="flex flex-col gap-2 mt-2">
                      {p.includes.map((item) => (
                        <li key={item} className="text-sm flex items-center gap-2" style={{ color: '#666666' }}>
                          <span style={{ color: '#ff1493' }}>✓</span> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-2xl font-medium gradient-text" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{formatPrice(p)}</p>
                    <p className="text-xs" style={{ color: '#666666' }}>{p.frequency === 'monthly' ? 'billed monthly' : 'one-time payment'}</p>
                    <Button href="/contact" size="sm" className="mt-4">Get Started →</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 px-6" style={{ background: '#080808' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: '#666666' }}>How We Work</p>
            <h2 className="text-3xl font-medium" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#f5f5f0' }}>Simple. Transparent. Reliable.</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {process.map((s) => (
              <div key={s.step} className="flex flex-col gap-4 p-6 rounded-lg" style={{ background: '#111111', border: '1px solid #1e1e1e' }}>
                <span className="text-3xl font-medium gradient-text" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{s.step}</span>
                <h3 className="text-base font-medium" style={{ color: '#f5f5f0' }}>{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#666666' }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6" style={{ background: '#0a0a0a' }}>
        <div className="max-w-2xl mx-auto text-center flex flex-col gap-6">
          <h2 className="text-3xl font-medium" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#f5f5f0' }}>Not sure which service you need?</h2>
          <p className="text-sm" style={{ color: '#666666' }}>Tell us about your business and we'll recommend the right fit. No pressure.</p>
          <Button href="/contact" size="lg">Talk to Jayson →</Button>
        </div>
      </section>
    </>
  );
}
