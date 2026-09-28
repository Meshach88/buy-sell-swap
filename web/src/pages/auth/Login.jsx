import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthLayout } from './AuthLayout.jsx';
import { Input } from '../../components/ui/forms/Input.jsx';
import { Button } from '../../components/ui/core/Button.jsx';
import { useAuth } from '../../lib/auth.jsx';
import { ApiError } from '../../lib/api.js';

export function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = React.useState({ phone: '', password: '' });
  const [error, setError] = React.useState('');
  const [busy, setBusy] = React.useState(false);

  const set = (key) => (value) => setForm((f) => ({ ...f, [key]: value }));

  async function onSubmit(e) {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      await login(form);
      navigate('/', { replace: true });
    } catch (err) {
      if (err instanceof ApiError && err.status === 403 && err.errors == null) {
        navigate('/verify', { state: { phone: form.phone, purpose: 'login', debugCode: err.body?.debug_code } });
        return;
      }
      setError(err instanceof ApiError ? (err.errors?.phone?.[0] ?? err.message) : 'Something went wrong.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <AuthLayout onBack title="Welcome back">
      <form onSubmit={onSubmit} style={{ display: 'grid', gap: 'var(--space-4)' }}>
        <Input label="Phone number" type="tel" value={form.phone} onChange={set('phone')} />
        <Input label="Password" type="password" value={form.password} onChange={set('password')} />
        {error ? <p style={{ color: 'var(--red-500)', fontSize: 'var(--text-sm)' }}>{error}</p> : null}
        <Button type="submit" fullWidth size="lg" disabled={busy}>{busy ? 'Logging in…' : 'Log in'}</Button>
      </form>
    </AuthLayout>
  );
}
