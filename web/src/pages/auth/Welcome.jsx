import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/core/Button.jsx';

export function Welcome() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>
      <section style={{ flex: 1, background: 'var(--surface-brand)', color: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 'var(--space-9) var(--gutter-mobile) var(--space-8)', borderBottomLeftRadius: 26, borderBottomRightRadius: 26 }}>
        <h1 style={{ fontSize: 'var(--text-display-2)', lineHeight: 'var(--lh-display)', letterSpacing: 'var(--ls-display)', fontWeight: 800 }}>
          Buy clean gadgets.<br />Sell yours today.
        </h1>
        <p style={{ marginTop: 'var(--space-4)', maxWidth: 420, color: 'rgba(255,255,255,.85)' }}>
          Verified sellers in Kaduna. Your payment is held until the device is in your hands.
        </p>
      </section>

      <div style={{ padding: 'var(--space-6) var(--gutter-mobile)', display: 'grid', gap: 'var(--space-3)', maxWidth: 440, width: '100%', margin: '0 auto' }}>
        <Button fullWidth size="lg" onClick={() => navigate('/signup')}>Create account</Button>
        <Button fullWidth size="lg" variant="secondary" onClick={() => navigate('/login')}>Log in</Button>
      </div>
    </div>
  );
}
