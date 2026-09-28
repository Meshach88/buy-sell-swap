import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthLayout } from './AuthLayout.jsx';
import { Input } from '../../components/ui/forms/Input.jsx';
import { Button } from '../../components/ui/core/Button.jsx';
import { useAuth } from '../../lib/auth.jsx';
import { ApiError } from '../../lib/api.js';

export function VerifyOtp() {
  const navigate = useNavigate();
  const location = useLocation();
  const { verifyOtp, resendOtp } = useAuth();
  const phone = location.state?.phone;
  const debugCode = location.state?.debugCode;
  const purpose = location.state?.purpose ?? 'register';

  const [code, setCode] = React.useState('');
  const [error, setError] = React.useState('');
  const [busy, setBusy] = React.useState(false);
  const [resent, setResent] = React.useState(false);

  React.useEffect(() => {
    if (!phone) navigate('/welcome', { replace: true });
  }, [phone, navigate]);

  async function onSubmit(e) {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      await verifyOtp({ phone, code, purpose });
      navigate('/', { replace: true });
    } catch (err) {
      setError(err instanceof ApiError ? (err.errors?.code?.[0] ?? err.message) : 'Something went wrong.');
    } finally {
      setBusy(false);
    }
  }

  async function onResend() {
    setError('');
    setResent(false);
    try {
      await resendOtp({ phone, purpose });
      setResent(true);
    } catch (err) {
      setError(err.message);
    }
  }

  if (!phone) return null;

  return (
    <AuthLayout onBack title="Enter the code" subtitle={`We sent a 6-digit code to ${phone}.`}>
      <form onSubmit={onSubmit} style={{ display: 'grid', gap: 'var(--space-4)' }}>
        <Input label="Code" value={code} onChange={setCode} error={error} placeholder="000000" />
        {debugCode ? (
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
            Development mode (no SMS provider yet): your code is <strong>{debugCode}</strong>.
          </p>
        ) : null}
        <Button type="submit" fullWidth size="lg" disabled={busy || code.length < 6}>{busy ? 'Verifying…' : 'Verify'}</Button>
        <button type="button" onClick={onResend} style={{ all: 'unset', cursor: 'pointer', justifySelf: 'center', color: 'var(--text-link)', fontSize: 'var(--text-sm)', fontWeight: 600 }}>
          {resent ? 'Code resent ✓' : "Didn't get a code? Resend"}
        </button>
      </form>
    </AuthLayout>
  );
}
