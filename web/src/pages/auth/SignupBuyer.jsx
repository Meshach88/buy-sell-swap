import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthLayout } from './AuthLayout.jsx';
import { Input } from '../../components/ui/forms/Input.jsx';
import { Button } from '../../components/ui/core/Button.jsx';
import { useAuth } from '../../lib/auth.jsx';
import { ApiError } from '../../lib/api.js';

export function SignupBuyer() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = React.useState({ name: '', phone: '', area: '', password: '' });
  const [errors, setErrors] = React.useState({});
  const [busy, setBusy] = React.useState(false);

  const set = (key) => (value) => setForm((f) => ({ ...f, [key]: value }));

  async function onSubmit(e) {
    e.preventDefault();
    setBusy(true);
    setErrors({});
    try {
      const res = await register({ ...form, role: 'customer' });
      navigate('/verify', { state: { phone: form.phone, debugCode: res.debug_code } });
    } catch (err) {
      if (err instanceof ApiError && err.errors) setErrors(err.errors);
      else setErrors({ form: [err.message] });
    } finally {
      setBusy(false);
    }
  }

  return (
    <AuthLayout onBack title="Your details">
      <form onSubmit={onSubmit} style={{ display: 'grid', gap: 'var(--space-4)' }}>
        <Input label="Full name" value={form.name} onChange={set('name')} error={errors.name?.[0]} />
        <Input label="Phone number" type="tel" value={form.phone} onChange={set('phone')} error={errors.phone?.[0]} />
        <Input label="Delivery area" value={form.area} onChange={set('area')} hint="e.g. Barnawa, Malali, Kawo" error={errors.area?.[0]} />
        <Input label="Password" type="password" value={form.password} onChange={set('password')} error={errors.password?.[0]} />
        {errors.form ? <p style={{ color: 'var(--red-500)', fontSize: 'var(--text-sm)' }}>{errors.form[0]}</p> : null}
        <Button type="submit" fullWidth size="lg" disabled={busy}>{busy ? 'Creating account…' : 'Create account'}</Button>
      </form>
    </AuthLayout>
  );
}
