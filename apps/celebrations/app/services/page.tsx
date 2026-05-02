import type { Metadata } from 'next';
import { Button } from '../../components/Button';
import { getProductsByDivision, formatPrice } from '@aether/config/products';

export const metadata: Metadata = {
  title: 'Services — Aether Celebrations',
  description: 'Wedding planning, event coordination, venue design, and souvenirs in Cavite, Philippines.',
};

export default function ServicesPage() {
  const products = getProductsByDivision('celebrations');

  return (
    <>
      <section className="py-32 px-6 relative" style={{ background: '#0a0a0a' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 30% at 50% 0%, rgba(106,76,147,0.07) 0%, transparent 70%)' }} />
        <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col gap-6">
          <p className="text-xs tracking-[0.3em] uppercase" style={{ color: '#666666' }}>Services</p>
          <h1 className="text-4xl md:text-5xl font-medium" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#f5f5f0' }}>
            Celebrations crafted for you.
          </h1>
          <p className="text-base leading-relaxed" style={{ color: '#999999' }}>
            Every package is a starting point. We customize around your vision, your budget, and your guests.
          </p>
        </div>
      </section>

      <section className="py-24 px-6" style={{ background: '#080808' }}>
        <div className="max-w-5xl mx-auto flex flex-col gap-8">
          {products.map((p) => (
            <div key={p.id} className="p-10 rounded-lg" style={{ background: '#111111', border: '1px solid #1e1e1e' }}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                <div className="md:col-span-2 flex flex-col gap-4">
                  <div>
                    <p className="text-xs tracking-[0.15em] uppercase mb-2" style={{ color: '#6a4c93' }}>{p.category}</p>
                    <h3 className="text-2xl font-medium" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#f5f5f0' }}>{p.name}</h3>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: '#888888' }}>{p.description}</p>
                  <ul className="flex flex-col gap-2">
                    {p.includes.map((item) => (
                      <li key={item} className="text-sm flex items-center gap-2" style={{ color: '#666666' }}>
                        <span style={{ color: '#6a4c93' }}>✓</span> {item}
                      </li>
                    ))}
                  </ul>
                  <p className="text-sm mt-2" style={{ color: '#666666' }}>
                    Every package is customizable. We'll meet, understand your vision, and build a proposal around it.
                  </p>
                </div>
                <div className="flex flex-col gap-4">
                  <p className="text-2xl font-medium gradient-text" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{formatPrice(p)}</p>
                  <p className="text-xs" style={{ color: '#666666' }}>Based on your specific requirements</p>
                  <Button href="/contact" size="sm" className="mt-4">Get a Custom Quote →</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 px-6" style={{ background: '#0a0a0a' }}>
        <div className="max-w-2xl mx-auto text-center flex flex-col gap-6">
          <h2 className="text-3xl font-medium" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#f5f5f0' }}>
            Have something special in mind?
          </h2>
          <p className="text-sm" style={{ color: '#666666' }}>We love unique events. Tell Remlyn about your dream celebration and we'll make it happen.</p>
          <Button href="/contact" size="lg">Talk to Remlyn →</Button>
        </div>
      </section>
    </>
  );
}
