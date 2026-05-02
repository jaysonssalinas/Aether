import { Button } from '../components/Button';
import { getFeaturedProducts, formatPrice } from '@aether/config/products';

const services = [
  { icon: '♡', title: 'Wedding Planning', desc: 'Full-service coordination from engagement to reception. Every detail handled with grace.' },
  { icon: '✦', title: 'Event Coordination', desc: 'Corporate events, birthdays, debuts, and milestones — planned with precision and warmth.' },
  { icon: '◉', title: 'Venue Design', desc: 'Transform any space into something beautiful. Florals, lighting, layout, and ambiance.' },
  { icon: '◇', title: 'Souvenirs & Invitations', desc: 'Custom-designed printed keepsakes that guests treasure long after the day.' },
];

const testimonials = [
  { quote: 'Remlyn made our wedding feel like a dream. Every detail was perfect — we didn\'t worry about a thing on our big day.', author: 'Maria & Jose Santos', title: 'Married in Dasmarinas, Cavite' },
  { quote: 'Our company event was the best we\'ve ever had. Professional, beautiful, and stress-free. We\'re booking again for next year.', author: 'HR Manager', title: 'Corporate Event, Cavite' },
];

// Decorative event photo placeholders — real photos from Remlyn to replace
const galleryItems = [
  { label: 'Wedding', gradient: 'linear-gradient(135deg, rgba(255,20,147,0.15), rgba(106,76,147,0.15))' },
  { label: 'Debut', gradient: 'linear-gradient(135deg, rgba(106,76,147,0.2), rgba(255,64,129,0.1))' },
  { label: 'Corporate', gradient: 'linear-gradient(135deg, rgba(255,64,129,0.1), rgba(106,76,147,0.2))' },
  { label: 'Birthday', gradient: 'linear-gradient(135deg, rgba(106,76,147,0.15), rgba(255,20,147,0.15))' },
];

export default function CelebrationsHomePage() {
  const featured = getFeaturedProducts('celebrations');

  return (
    <>
      {/* Hero */}
      <section className="min-h-[90vh] flex flex-col items-center justify-center text-center px-6 relative overflow-hidden" style={{ background: '#0a0a0a' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 40% at 50% 20%, rgba(106,76,147,0.1) 0%, transparent 70%)' }} />
        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center gap-8">
          <span className="text-xs tracking-[0.3em] uppercase px-4 py-2 rounded-full" style={{ color: '#a07cc8', border: '1px solid rgba(106,76,147,0.3)', background: 'rgba(106,76,147,0.08)' }}>
            Aether Celebrations
          </span>
          <h1 className="text-5xl md:text-7xl font-medium leading-tight" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#f5f5f0' }}>
            Turning moments<br />
            <span className="gradient-text">into memories.</span>
          </h1>
          <p className="text-base md:text-lg leading-relaxed max-w-xl" style={{ color: '#999999' }}>
            Weddings, events, and celebrations crafted with love and precision. Based in Dasmarinas, Cavite — serving all of the Philippines.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button href="/contact" size="lg">Book a Consultation →</Button>
            <Button href="/galleries" variant="outline" size="lg">View Our Work</Button>
          </div>
          <p className="text-xs" style={{ color: '#444444' }}>We respond within 24 hours · Free initial consultation</p>
        </div>
      </section>

      {/* Gallery teaser */}
      <section className="py-24 px-6" style={{ background: '#080808' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: '#666666' }}>Gallery</p>
            <h2 className="text-3xl font-medium" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#f5f5f0' }}>Moments we've made beautiful.</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {galleryItems.map((item) => (
              <div key={item.label} className="aspect-square rounded-lg flex items-end p-4" style={{ background: item.gradient, border: '1px solid #1e1e1e' }}>
                <span className="text-xs tracking-[0.1em] uppercase" style={{ color: '#999999' }}>{item.label}</span>
              </div>
            ))}
          </div>
          <p className="text-center text-xs mt-6" style={{ color: '#444444' }}>
            Photos will be added as our gallery grows · <a href="/contact" style={{ color: '#6a4c93' }}>Inquire now</a>
          </p>
          <div className="text-center mt-6">
            <Button href="/galleries" variant="outline" size="sm">Browse Gallery →</Button>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 px-6" style={{ background: '#0a0a0a' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: '#666666' }}>Services</p>
            <h2 className="text-3xl md:text-4xl font-medium" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#f5f5f0' }}>
              Every celebration, thoughtfully designed.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {services.map((s) => (
              <div key={s.title} className="p-8 rounded-lg flex flex-col gap-4" style={{ background: '#111111', border: '1px solid #1e1e1e' }}>
                <span className="text-3xl" style={{ color: '#6a4c93' }}>{s.icon}</span>
                <h3 className="text-xl font-medium" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#f5f5f0' }}>{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#666666' }}>{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button href="/services" variant="outline">Explore All Services →</Button>
          </div>
        </div>
      </section>

      {/* Pricing preview */}
      <section className="py-24 px-6" style={{ background: '#080808' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: '#666666' }}>Pricing</p>
            <h2 className="text-3xl font-medium" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#f5f5f0' }}>Every event is unique. So is our pricing.</h2>
            <p className="text-sm mt-3" style={{ color: '#666666' }}>We work with your budget and customize packages around your needs.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featured.map((p) => (
              <div key={p.id} className="p-8 rounded-lg flex flex-col gap-4" style={{ background: '#111111', border: '1px solid #1e1e1e' }}>
                <h3 className="text-lg font-medium" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#f5f5f0' }}>{p.name}</h3>
                <p className="text-2xl font-medium gradient-text" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{formatPrice(p)}</p>
                <p className="text-sm leading-relaxed" style={{ color: '#888888' }}>{p.description}</p>
                <ul className="flex flex-col gap-2 mt-2">
                  {p.includes.map((item) => (
                    <li key={item} className="text-sm flex items-center gap-2" style={{ color: '#666666' }}>
                      <span style={{ color: '#6a4c93' }}>✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button href="/pricing" variant="outline">See Full Pricing →</Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6" style={{ background: '#0a0a0a' }}>
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-xs tracking-[0.3em] uppercase mb-16" style={{ color: '#666666' }}>Happy Clients</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="p-8 rounded-lg flex flex-col gap-6" style={{ background: '#111111', border: '1px solid #1e1e1e' }}>
                <div className="text-3xl" style={{ color: '#6a4c93', lineHeight: 1 }}>"</div>
                <p className="text-base leading-relaxed italic" style={{ color: '#cccccc', fontFamily: "'Playfair Display', Georgia, serif" }}>{t.quote}</p>
                <div>
                  <p className="text-sm font-medium" style={{ color: '#f5f5f0' }}>{t.author}</p>
                  <p className="text-xs mt-1" style={{ color: '#666666' }}>{t.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 relative overflow-hidden" style={{ background: '#080808' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 50% 40% at 50% 50%, rgba(106,76,147,0.08) 0%, transparent 70%)' }} />
        <div className="relative z-10 max-w-2xl mx-auto text-center flex flex-col gap-6">
          <h2 className="text-3xl md:text-4xl font-medium" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#f5f5f0' }}>
            Ready to plan your event?
          </h2>
          <p className="text-base" style={{ color: '#666666' }}>
            Let's talk about your vision. A free consultation with Remlyn takes less than 30 minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/contact" size="lg">Book a Free Consultation</Button>
            <Button href="/services" variant="outline" size="lg">View Services</Button>
          </div>
        </div>
      </section>
    </>
  );
}
