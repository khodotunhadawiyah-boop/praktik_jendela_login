import { useState } from 'react';

// Hanya untuk demo. Ganti dengan panggilan ke API sungguhan.
const DEMO_PASSWORD = 'jendela123';

const TEXT = {
  sunny: { title: 'Selamat pagi', sub: 'Cuaca cerah, yuk masuk.' },
  rainy: { title: 'Hujan di luar', sub: 'Masuk dulu, di sini hangat.' },
  night: { title: 'Selamat malam', sub: 'Sudah larut, masuk dulu ya.' },
};

export default function LoginForm({ weather, onError, onSuccess, onLogout }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | loading | success
  const [shake, setShake] = useState(false);
  const [showPw, setShowPw] = useState(false);

  const fail = () => {
    setShake(true);
    onError();
    setTimeout(() => setShake(false), 500);
  };

  const validate = () => {
    const e = {};
    if (!form.email.trim()) e.email = 'Email wajib diisi.';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Format email belum benar.';
    if (!form.password) e.password = 'Password wajib diisi.';
    else if (form.password.length < 6) e.password = 'Password minimal 6 karakter.';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (status === 'loading') return;

    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      fail();
      return;
    }

    setStatus('loading');
    setTimeout(() => {
      if (form.password === DEMO_PASSWORD) {
        setStatus('success');
        onSuccess(); // ← baru: tirai menutup
      } else {
        setStatus('idle');
        setErrors({ password: 'Password salah. Coba: jendela123' });
        fail();
      }
    }, 900);
  };

  const logout = () => {
    setForm({ email: '', password: '' });
    setErrors({});
    setStatus('idle');
    onLogout(); // ← baru: tirai terbuka lagi
  };

  if (status === 'success') {
    return (
      <div className="card card-success" role="status">
        <div className="check" aria-hidden="true">✓</div>
        <h2>Selamat datang!</h2>
        <p className="sub">{form.email}</p>
        <button type="button" className="btn" onClick={logout}>
          Keluar
        </button>
      </div>
    );
  }

  return (
    <form
      className={`card ${shake ? 'shake' : ''}`}
      onSubmit={handleSubmit}
      noValidate
    >
      <h2>{TEXT[weather].title}</h2>
      <p className="sub">{TEXT[weather].sub}</p>

      <div className="field">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="nama@email.com"
          value={form.email}
          onChange={handleChange}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-err' : undefined}
        />
        {errors.email && (
          <span id="email-err" className="err" role="alert">{errors.email}</span>
        )}
      </div>

      <div className="field">
        <label htmlFor="password">Password</label>
        <div className="pw">
          <input
            id="password"
            name="password"
            type={showPw ? 'text' : 'password'}
            autoComplete="current-password"
            placeholder="••••••"
            value={form.password}
            onChange={handleChange}
            aria-invalid={!!errors.password}
            aria-describedby={errors.password ? 'pw-err' : undefined}
          />
          <button
            type="button"
            className="pw-toggle"
            onClick={() => setShowPw((s) => !s)}
            aria-label={showPw ? 'Sembunyikan password' : 'Tampilkan password'}
          >
            {showPw ? '🙈' : '👁️'}
          </button>
        </div>
        {errors.password && (
          <span id="pw-err" className="err" role="alert">{errors.password}</span>
        )}
      </div>

      <button type="submit" className="btn" disabled={status === 'loading'}>
        {status === 'loading' ? 'Memeriksa...' : 'Masuk'}
      </button>
    </form>
  );
}