import Link from 'next/link';
import { Button } from '../components/Button';
import { getFeaturedProducts, formatPrice } from '@aether/config/products';

const services = [
  { icon: '◈', title: 'Custom Websites', desc: 'Professional, fast, and beautiful websites built to convert visitors into customers.' },
  { icon: '⌗', title: 'Software Systems', desc: 'POS, inventory, and printing systems tailored for Philippine shops and small businesses.' },
  { icon: '⬡', title: 'Domain & Hosting', desc: 'End-to-end domain and hosting management. You focus on your business, we handle the tech.' },
  { icon: '◉', title: 'SEO & Online Presence', desc: 'Get found on Google. Local SEO and Google Business optimization for Cavite businesses.' },
];

export default function DigitalHomePage() {
  const featured = getFeaturedProducts('digital');

  return (
    <>
      {/* Hero */}
      <section className="min-h-[90vh] flex flex-col items-center justify-center text-center px-6 relative overflow-hidden" style={{ background: '#0a0a0a' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 40% at 50% 20%, rgba(255,20,147,0.07) 0%, transparent 70%)' }} />
        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center gap-8">
          <span className="text-xs tracking-[0.3em] uppercase px-4 py-2 rounded-full" style={{ color: '#ff4081', border: '1px solid rgba(255,20,147,0.2)', background: 'rgba(255,20,147,0.05)' }}>
            Aether Digital
          </span>
          <h1 className="text-5xl md:text-7xl font-medium leading-tight" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#f5f5f0' }}>
            Digital systems<br />
            <span className="gradient-text">that scale.</span>
          </h1>
          <p className="text-base md:text-lg leading-relaxed max-w-xl" style={{ color: '#999999' }}>
            We build websites, POS systems, inventory software, and digital infrastructure for Philippine businesses ready to grow.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button href="/contact" size="lg">Get a Free Quote →</Button>
            <Button href="/services" variant="outline" size="lg">View Services</Button>
          </div>
          <p className="text-xs" style={{ color: '#444444' }}>Based in Dasmarinas, Cavite · Serving all of the Philippines</p>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 px-6" style={{ background: '#080808' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: '#666666' }}>What We Do</p>
            <h2 className="text-3xl md:text-4xl font-medium" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#f5f5f0' }}>
              Services built for real businesses
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {services.map((s) => (
              <div key={s.title} className="p-8 rounded-lg flex flex-col gap-4" style={{ background: '#111111', border: '1px solid #1e1e1e' }}>
                <span className="text-2xl gradient-text">{s.icon}</span>
                <h3 className="text-xl font-medium" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#f5f5f0' }}>{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#666666' }}>{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button href="/services" variant="outline">See Full Service List →</Button>
          </div>
        </div>
      </section>

      {/* Portfolio highlight */}
      <section className="py-24 px-6" style={{ background: '#0a0a0a' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: '#666666' }}>Portfolio</p>
            <h2 className="text-3xl font-medium" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#f5f5f0' }}>Real work. Real results.</h2>
          </div>
          <div className="p-10 rounded-lg" style={{ background: '#111111', border: '1px solid #1e1e1e' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div className="flex flex-col gap-6">
                <div>
                  <p className="text-xs tracking-[0.2em] uppercase mb-2" style={{ color: '#ff4081' }}>Case Study</p>
                  <h3 className="text-2xl font-medium" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#f5f5f0' }}>
                    Rimando Law Office
                  </h3>
                  <p className="text-sm mt-1" style={{ color: '#666666' }}>Bacoor, Cavite — Full-service legal firm</p>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: '#888888' }}>
                  A professional law firm needed an online presence that matched their expertise in labor law and OFW matters — fast, credible, and accessible across devices.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Next.js', 'Tailwind CSS', 'SEO', 'Mobile-first'].map((t) => (
                    <span key={t} className="text-xs px-3 py-1 rounded-full" style={{ background: 'rgba(255,20,147,0.08)', color: '#ff4081', border: '1px solid rgba(255,20,147,0.15)' }}>{t}</span>
                  ))}
                </div>
                <Button href="/portfolio" variant="outline" size="sm">Read Full Case Study →</Button>
              </div>
              <div className="rounded-lg p-8 flex flex-col gap-4" style={{ background: '#0a0a0a', border: '1px solid #1e1e1e' }}>
                <p className="text-xs tracking-[0.2em] uppercase" style={{ color: '#444444' }}>Results</p>
                {[
                  { metric: 'Professional online presence', detail: 'From zero to live in 2 weeks' },
                  { metric: 'Mobile-optimized', detail: '100% responsive across all devices' },
                  { metric: 'Monthly maintenance', detail: 'Ongoing care plan active' },
                ].map((r) => (
                  <div key={r.metric} className="flex flex-col gap-1 py-3" style={{ borderBottom: '1px solid #1e1e1e' }}>
                    <p className="text-sm font-medium" style={{ color: '#f5f5f0' }}>{r.metric}</p>
                    <p className="text-xs" style={{ color: '#666666' }}>{r.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing preview */}
      <section className="py-24 px-6" style={{ background: '#080808' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: '#666666' }}>Pricing</p>
            <h2 className="text-3xl font-medium" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#f5f5f0' }}>Transparent. No surprises.</h2>
            <p className="text-sm mt-3" style={{ color: '#666666' }}>All prices are starting points. We quote based on your specific needs.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((p) => (
              <div key={p.id} className="p-8 rounded-lg flex flex-col gap-4" style={{ background: '#111111', border: '1px solid #1e1e1e' }}>
                <div>
                  <p className="text-xs tracking-[0.15em] uppercase mb-2" style={{ color: '#666666' }}>{p.category}</p>
                  <h3 className="text-lg font-medium" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#f5f5f0' }}>{p.name}</h3>
                </div>
                <p className="text-2xl font-medium gradient-text" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{formatPrice(p)}</p>
                <p className="text-xs capitalize" style={{ color: '#666666' }}>{p.frequency === 'one-time' ? 'One-time fee' : p.frequency === 'monthly' ? 'Per month' : 'Custom quote'}</p>
                <p className="text-sm leading-relaxed" style={{ color: '#888888' }}>{p.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button href="/pricing" variant="outline">See All Pricing →</Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 relative overflow-hidden" style={{ background: '#0a0a0a' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 50% 40% at 50% 50%, rgba(255,20,147,0.05) 0%, transparent 70%)' }} />
        <div className="relative z-10 max-w-2xl mx-auto text-center flex flex-col gap-6">
          <h2 className="text-3xl md:text-4xl font-medium" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#f5f5f0' }}>
            Ready to go digital?
          </h2>
          <p className="text-base" style={{ color: '#666666' }}>Tell us about your business and we'll recommend the right solution.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/contact" size="lg">Request a Free Quote</Button>
            <Button href="/services" variant="outline" size="lg">Explore Services</Button>
          </div>
        </div>
      </section>
    </>
  );
}
