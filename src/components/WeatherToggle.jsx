const OPTIONS = [
  { value: 'sunny', label: 'Cerah', icon: '☀️' },
  { value: 'rainy', label: 'Hujan', icon: '🌧️' },
  { value: 'night', label: 'Malam', icon: '🌙' },
];

export default function WeatherToggle({ weather, onChange }) {
  return (
    <div className="sill" role="group" aria-label="Pilih cuaca di luar jendela">
      {OPTIONS.map((o) => (
        <button
          key={o.value}
          type="button"
          className={`sill-btn ${weather === o.value ? 'is-on' : ''}`}
          aria-pressed={weather === o.value}
          onClick={() => onChange(o.value)}
        >
          <span aria-hidden="true">{o.icon}</span> {o.label}
        </button>
      ))}
    </div>
  );
}