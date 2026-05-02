import type { Metadata } from 'next';
import { Button } from '../../components/Button';

export const metadata: Metadata = {
  title: 'Gallery — Aether Celebrations',
  description: 'Browse our event gallery — weddings, debuts, corporate events, and birthdays in Cavite and beyond.',
};

const categories = ['All', 'Weddings', 'Debuts', 'Corporate', 'Birthdays', 'Anniversaries'];

const placeholders = [
  { label: 'Wedding · Dasmarinas', cat: 'Weddings', gradient: 'linear-gradient(135deg, rgba(255,20,147,0.12), rgba(106,76,147,0.12))' },
  { label: 'Debut · Imus', cat: 'Debuts', gradient: 'linear-gradient(135deg, rgba(106,76,147,0.15), rgba(255,64,129,0.1))' },
  { label: 'Corporate · Cavite City', cat: 'Corporate', gradient: 'linear-gradient(135deg, rgba(255,64,129,0.1), rgba(106,76,147,0.15))' },
  { label: 'Birthday · Bacoor', cat: 'Birthdays', gradient: 'linear-gradient(135deg, rgba(106,76,147,0.12), rgba(255,20,147,0.12))' },
  { label: 'Wedding · Tagaytay', cat: 'Weddings', gradient: 'linear-gradient(135deg, rgba(255,20,147,0.1), rgba(106,76,147,0.18))' },
  { label: 'Anniversary · General Trias', cat: 'Anniversaries', gradient: 'linear-gradient(135deg, rgba(106,76,147,0.18), rgba(255,20,147,0.1))' },
];

export default function GalleriesPage() {
  return (
    <>
      <section className="py-32 px-6 relative" style={{ background: '#0a0a0a' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 30% at 50% 0%, rgba(106,76,147,0.07) 0%, transparent 70%)' }} />
        <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col gap-6">
          <p className="text-xs tracking-[0.3em] uppercase" style={{ color: '#666666' }}>Gallery</p>
          <h1 className="text-4xl md:text-5xl font-medium" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#f5f5f0' }}>
            Every moment, beautifully told.
          </h1>
          <p className="text-base leading-relaxed" style={{ color: '#999999' }}>
            A growing collection of celebrations we've had the privilege to craft.
          </p>
        </div>
      </section>

      <section className="py-24 px-6" style={{ background: '#080808' }}>
        <div className="max-w-6xl mx-auto">
          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2 mb-12">
            {categories.map((cat) => (
              <span
                key={cat}
                className="text-xs px-4 py-2 rounded-full cursor-pointer transition-all"
                style={{
                  background: cat === 'All' ? 'linear-gradient(135deg,#ff1493,#6a4c93)' : 'rgba(106,76,147,0.08)',
                  color: cat === 'All' ? '#fff' : '#a07cc8',
                  border: cat === 'All' ? 'none' : '1px solid rgba(106,76,147,0.2)',
                }}
              >
                {cat}
              </span>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {placeholders.map((item, i) => (
              <div
                key={i}
                className="aspect-[4/3] rounded-lg flex flex-col justify-between p-6"
                style={{ background: item.gradient, border: '1px solid #1e1e1e' }}
              >
                <span className="text-xs tracking-[0.1em] uppercase px-2 py-1 rounded-full self-start" style={{ background: 'rgba(0,0,0,0.4)', color: '#a07cc8' }}>{item.cat}</span>
                <p className="text-sm" style={{ color: '#999999' }}>{item.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 p-8 rounded-lg text-center flex flex-col gap-4" style={{ background: '#111111', border: '1px solid rgba(106,76,147,0.2)' }}>
            <p className="text-sm" style={{ color: '#888888' }}>
              Gallery is continuously updated as we complete events. Photos are added with client permission.
            </p>
            <p className="text-sm font-medium" style={{ color: '#a07cc8' }}>
              Remlyn personally photographs and curates each gallery entry.
            </p>
            <Button href="/contact" size="sm">Inquire About Your Event →</Button>
          </div>
        </div>
      </section>
    </>
  );
}
