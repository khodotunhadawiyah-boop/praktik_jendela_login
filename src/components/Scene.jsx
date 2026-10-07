import { useMemo } from 'react';

// Semua elemen selalu ada di DOM, CSS yang menampilkan/menyembunyikan
// sesuai class cuaca (weather-sunny / weather-rainy / weather-night)
export default function Scene() {
  const stars = useMemo(
    () =>
      Array.from({ length: 32 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 55,
        size: 1 + Math.random() * 2,
        delay: Math.random() * 3,
      })),
    []
  );

  return (
    <div className="scene" aria-hidden="true">
      <div className="sky sky-sunny" />
      <div className="sky sky-rainy" />
      <div className="sky sky-night" />

      <div className="stars">
        {stars.map((s) => (
          <span
            key={s.id}
            className="star"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: s.size,
              height: s.size,
              animationDelay: `${s.delay}s`,
            }}
          />
        ))}
      </div>

      <div className="sun" />
      <div className="moon" />

      <div className="cloud c1" />
      <div className="cloud c2" />
      <div className="cloud c3" />

      <div className="hills" />
    </div>
  );
}