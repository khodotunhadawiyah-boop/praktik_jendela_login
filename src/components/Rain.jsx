import { useMemo } from 'react';

export default function Rain({ active }) {
  // Tetesan hujan jatuh di luar jendela
  const drops = useMemo(
    () =>
      Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: -Math.random() * 2,
        duration: 0.5 + Math.random() * 0.5,
        height: 20 + Math.random() * 30,
      })),
    []
  );

  // Tetesan besar yang meluncur di kaca
  const slides = useMemo(
    () =>
      Array.from({ length: 7 }, (_, i) => ({
        id: i,
        x: 8 + Math.random() * 84,
        delay: -Math.random() * 6,
        duration: 4 + Math.random() * 4,
        size: 6 + Math.random() * 6,
      })),
    []
  );

  return (
    <div className={`rain ${active ? 'is-active' : ''}`} aria-hidden="true">
      {drops.map((d) => (
        <span
          key={d.id}
          className="drop"
          style={{
            '--x': `${d.x}%`,
            '--h': `${d.height}px`,
            '--d': `${d.duration}s`,
            '--delay': `${d.delay}s`,
          }}
        />
      ))}
      {slides.map((s) => (
        <span
          key={s.id}
          className="slide"
          style={{
            '--x': `${s.x}%`,
            '--s': `${s.size}px`,
            '--d': `${s.duration}s`,
            '--delay': `${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
}