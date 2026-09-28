import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { api } from '../lib/api.js';
import { useAuth } from '../lib/auth.jsx';
import { Badge } from '../components/ui/core/Badge.jsx';
import { Card } from '../components/ui/core/Card.jsx';
import { Button } from '../components/ui/core/Button.jsx';

function useHealth() {
  return useQuery({ queryKey: ['health'], queryFn: () => api('/health') });
}

export function Home() {
  const { data, isPending, isError } = useHealth();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <section style={{ background: 'var(--surface-brand)', color: '#fff', padding: 'var(--space-9) 0 var(--space-10)', borderBottomLeftRadius: 26, borderBottomRightRadius: 26 }}>
        <div className="page" style={{ display: 'grid', gap: 'var(--space-4)', paddingTop: 0, paddingBottom: 0 }}>
          <h1 style={{ fontSize: 'var(--text-display-2)', lineHeight: 'var(--lh-display)', letterSpacing: 'var(--ls-display)', color: '#fff', fontWeight: 800 }}>
            Buy clean gadgets.<br />Sell yours today.<br />
            <span style={{ color: 'var(--lemon-300)' }}>Swap up anytime.</span>
          </h1>
          <p style={{ maxWidth: 460, color: 'rgba(255,255,255,.8)' }}>Verified sellers in Kaduna. Your payment is held until the device is in your hands.</p>
        </div>
      </section>

      <div className="page">
        <Card padding="md">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-4)' }}>
            <div style={{ display: 'grid', gap: 2 }}>
              <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-strong)' }}>Build status</span>
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>Phase 0: foundations. Catalogue arrives in Phase 1.</span>
            </div>
            {isPending ? <Badge>Checking API…</Badge> : isError ? <Badge tone="danger">API offline</Badge> : <Badge tone={data.database === 'ok' ? 'verified' : 'pending'}>API and database {data.database}</Badge>}
          </div>
        </Card>

        <Card padding="md" style={{ marginTop: 'var(--space-4)' }}>
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-4)' }}>
              <div style={{ display: 'grid', gap: 2 }}>
                <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-strong)' }}>Welcome back, {user.name.split(' ')[0]}</span>
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>{user.roles.includes('seller') ? user.seller?.shop_name : 'Buyer account'}</span>
              </div>
              <Button variant="ghost" onClick={logout}>Log out</Button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-4)' }}>
              <div style={{ display: 'grid', gap: 2 }}>
                <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-strong)' }}>New here?</span>
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>Create an account to buy or start selling.</span>
              </div>
              <Button onClick={() => navigate('/welcome')}>Get started</Button>
            </div>
          )}
        </Card>
      </div>
    </>
  );
}
