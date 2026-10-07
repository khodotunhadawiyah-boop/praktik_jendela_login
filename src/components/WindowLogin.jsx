import { useRef, useState } from 'react';
import Scene from './Scene';
import Rain from './Rain';
import WeatherToggle from './WeatherToggle';
import LoginForm from './LoginForm';
import './WindowLogin.css';

export default function WindowLogin() {
  const [weather, setWeather] = useState('sunny'); // 'sunny' | 'rainy' | 'night'
  const [flash, setFlash] = useState(false);
  const flashTimer = useRef(null);

  // Kilat menyambar saat login gagal
  const triggerFlash = () => {
    clearTimeout(flashTimer.current);
    setFlash(true);
    flashTimer.current = setTimeout(() => setFlash(false), 600);
  };

  return (
    <main className={`room weather-${weather}`}>
      <div className="window">
        <div className="glass">
          <Scene />
          <Rain active={weather === 'rainy'} />
          <div className={`lightning ${flash ? 'on' : ''}`} aria-hidden="true" />
          <LoginForm weather={weather} onError={triggerFlash} />
        </div>
      </div>

      <WeatherToggle weather={weather} onChange={setWeather} />
    </main>
  );
}