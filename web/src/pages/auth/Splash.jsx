import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../lib/auth.jsx';

/** Brand moment on cold start, then routes to the app or the welcome screen. */
export function Splash() {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();

  React.useEffect(() => {
    if (isLoading) return;
    const id = setTimeout(() => navigate(user ? '/' : '/welcome', { replace: true }), 900);
    return () => clearTimeout(id);
  }, [isLoading, user, navigate]);

  return (
    <div style={{ minHeight: '100dvh', background: 'var(--surface-brand)', display: 'grid', placeItems: 'center', gap: 'var(--space-4)' }}>
      <div style={{ display: 'grid', justifyItems: 'center', gap: 'var(--space-3)' }}>
        <span style={{ fontSize: 'var(--text-display-2)', fontWeight: 800, letterSpacing: '-0.04em', color: '#fff' }}>BuySellSwap</span>
        <span style={{ color: 'var(--lemon-300)', fontSize: 'var(--text-sm)', fontWeight: 600 }}>Kaduna's gadget marketplace</span>
      </div>
    </div>
  );
}
