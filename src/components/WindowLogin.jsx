import { useCallback, useEffect, useRef, useState } from 'react';
import Scene from './Scene';
import Rain from './Rain';
import SashWindow from './SashWindow';
import WeatherToggle from './WeatherToggle';
import LoginForm from './LoginForm';
import './WindowLogin.css';

// Cuaca awal mengikuti jam perangkat
const getInitialWeather = () => {
  const h = new Date().getHours();
  return h >= 18 || h < 5 ? 'night' : 'sunny';
};

export default function WindowLogin() {
  const [weather, setWeather] = useState(getInitialWeather); // 'sunny' | 'rainy' | 'night'
  const [flash, setFlash] = useState(false);
  const [opened, setOpened] = useState(false); // jendela sudah diangkat
  const [home, setHome] = useState(false);     // sudah login → jendela menutup lagi
  const flashTimer = useRef(null);

  const lifted = opened && !home; // jendela sedang terangkat (terbuka)

  const triggerFlash = useCallback(() => {
    clearTimeout(flashTimer.current);
    setFlash(true);
    flashTimer.current = setTimeout(() => setFlash(false), 600);
  }, []);

  // Petir acak setiap 6-14 detik saat hujan (setelah jendela dibuka)
  useEffect(() => {
    if (weather !== 'rainy' || !opened) return;
    let t;
    const loop = () => {
      t = setTimeout(() => {
        triggerFlash();
        loop();
      }, 6000 + Math.random() * 8000);
    };
    loop();
    return () => clearTimeout(t);
  }, [weather, opened, triggerFlash]);

  useEffect(() => () => clearTimeout(flashTimer.current), []);

  // Parallax: posisi pointer (-0.5 sampai 0.5) sebagai variabel CSS
  const handleMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    e.currentTarget.style.setProperty('--px', x.toFixed(3));
    e.currentTarget.style.setProperty('--py', y.toFixed(3));
  };

  const handleLeave = (e) => {
    e.currentTarget.style.setProperty('--px', 0);
    e.currentTarget.style.setProperty('--py', 0);
  };

  return (
    <main className={`room weather-${weather}`}>
      <div className="window">
        <div
          className="glass"
          onPointerMove={handleMove}
          onPointerLeave={handleLeave}
        >
          <Scene />
          <Rain active={weather === 'rainy'} />

          <div className={`lightning ${flash ? 'on' : ''}`} aria-hidden="true" />

          {/* Form baru aktif setelah jendela diangkat */}
          <div className={`form-wrap ${opened ? 'is-active' : ''}`}>
            <LoginForm
              weather={weather}
              onError={triggerFlash}
              onSuccess={() => setHome(true)}
              onLogout={() => setHome(false)}
            />
          </div>

          {/* Daun jendela sash: aksi pertama pengguna */}
          <SashWindow
            open={opened}
            lifted={lifted}
            onOpen={() => setOpened(true)}
          />
        </div>
      </div>

      <WeatherToggle weather={weather} onChange={setWeather} />
    </main>
  );
}