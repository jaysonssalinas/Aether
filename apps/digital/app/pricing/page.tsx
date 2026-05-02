import type { Metadata } from 'next';
import { Button } from '../../components/Button';
import { getProductsByDivision, formatPrice } from '@aether/config/products';

export const metadata: Metadata = {
  title: 'Pricing — Aether Digital',
  description: 'Transparent pricing for websites, POS systems, inventory software, and maintenance plans.',
};

const faqs = [
  { q: 'Why does website design cost PHP 8,000–15,000?', a: 'The price depends on how many pages, how complex the design, and whether you need custom features like booking forms or e-commerce. We always quote before starting — no surprises.' },
  { q: 'What\'s included in the monthly maintenance plan?', a: 'Content updates, security patches, plugin updates, daily backups, uptime monitoring, and priority support. You never have to worry about your site going down.' },
  { q: 'Can I get the software without the maintenance plan?', a: 'Yes. The license is a one-time fee. The maintenance plan is optional but highly recommended — it covers updates, remote support, and bug fixes.' },
  { q: 'Do you charge extra for installation and training?', a: 'No. On-site installation and staff training are included in the software license price.' },
  { q: 'Can prices change?', a: 'Prices are updated by us as services evolve. The price you\'re quoted is locked in for your project. We give 30 days notice for any changes to recurring plans.' },
];

export default function PricingPage() {
  const products = getProductsByDivision('digital');
  const webProducts = products.filter((p) => p.category === 'Web Services');
  const softwareProducts = products.filter((p) => p.category === 'Software Systems');

  return (
    <>
      <section className="py-32 px-6 relative" style={{ background: '#0a0a0a' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 30% at 50% 0%, rgba(255,20,147,0.05) 0%, transparent 70%)' }} />
        <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col gap-6">
          <p className="text-xs tracking-[0.3em] uppercase" style={{ color: '#666666' }}>Pricing</p>
          <h1 className="text-4xl md:text-5xl font-medium" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#f5f5f0' }}>
            Transparent pricing. No guesswork.
          </h1>
          <p className="text-base leading-relaxed" style={{ color: '#999999' }}>
            All prices shown are starting points. We quote based on your specific needs — every business is different.
          </p>
        </div>
      </section>

      <section className="py-24 px-6" style={{ background: '#080808' }}>
        <div className="max-w-6xl mx-auto flex flex-col gap-16">

          {/* Web services */}
          <div>
            <p className="text-xs tracking-[0.3em] uppercase mb-8" style={{ color: '#666666' }}>Web Services</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {webProducts.map((p) => (
                <div key={p.id} className="p-8 rounded-lg flex flex-col gap-5" style={{ background: '#111111', border: '1px solid #1e1e1e' }}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-medium" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#f5f5f0' }}>{p.name}</h3>
                      <p className="text-xs mt-1" style={{ color: '#666666' }}>{p.frequency === 'monthly' ? 'Billed monthly' : 'One-time fee'}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-medium gradient-text" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{formatPrice(p)}</p>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: '#888888' }}>{p.description}</p>
                  <ul className="flex flex-col gap-2">
                    {p.includes.map((item) => (
                      <li key={item} className="text-sm flex items-center gap-2" style={{ color: '#666666' }}>
                        <span style={{ color: '#ff1493' }}>✓</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Software */}
          <div>
            <p className="text-xs tracking-[0.3em] uppercase mb-8" style={{ color: '#666666' }}>Software Systems</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {softwareProducts.map((p) => (
                <div key={p.id} className="p-8 rounded-lg flex flex-col gap-5" style={{ background: '#111111', border: '1px solid #1e1e1e' }}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-medium" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#f5f5f0' }}>{p.name}</h3>
                      <p className="text-xs mt-1" style={{ color: '#666666' }}>{p.frequency === 'monthly' ? 'Billed monthly' : 'One-time fee'}</p>
                    </div>
                    <p className="text-xl font-medium gradient-text" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{formatPrice(p)}</p>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: '#888888' }}>{p.description}</p>
                  <ul className="flex flex-col gap-2">
                    {p.includes.map((item) => (
                      <li key={item} className="text-sm flex items-center gap-2" style={{ color: '#666666' }}>
                        <span style={{ color: '#ff1493' }}>✓</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6" style={{ background: '#0a0a0a' }}>
        <div className="max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase mb-12 text-center" style={{ color: '#666666' }}>Frequently Asked</p>
          <div className="flex flex-col gap-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="p-6 rounded-lg" style={{ background: '#111111', border: '1px solid #1e1e1e' }}>
                <p className="text-sm font-medium mb-3" style={{ color: '#f5f5f0' }}>{faq.q}</p>
                <p className="text-sm leading-relaxed" style={{ color: '#888888' }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6" style={{ background: '#080808' }}>
        <div className="max-w-2xl mx-auto text-center flex flex-col gap-6">
          <h2 className="text-3xl font-medium" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#f5f5f0' }}>Ready to get a real quote?</h2>
          <p className="text-sm" style={{ color: '#666666' }}>Tell us what you need and we'll send a detailed proposal within 24 hours.</p>
          <Button href="/contact" size="lg">Request a Quote →</Button>
        </div>
      </section>
    </>
  );
}
