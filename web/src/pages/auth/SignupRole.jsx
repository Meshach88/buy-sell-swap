import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthLayout } from './AuthLayout.jsx';
import { Card } from '../../components/ui/core/Card.jsx';
import { Icon } from '../../components/ui/core/Icon.jsx';
import { Button } from '../../components/ui/core/Button.jsx';

const ROLES = [
  { key: 'buyer', icon: 'shopping-bag', title: 'I want to buy', body: 'Browse verified gadgets, pay safely and track delivery to your door.', to: '/signup/buyer' },
  { key: 'seller', icon: 'store', title: 'I want to sell', body: 'List your gadgets, get orders and be paid every week.', to: '/signup/seller' },
];

export function SignupRole() {
  const navigate = useNavigate();
  const [picked, setPicked] = React.useState(null);

  return (
    <AuthLayout onBack title="How will you use BuySellSwap?">
      <div style={{ display: 'grid', gap: 'var(--space-3)' }}>
        {ROLES.map((role) => {
          const active = picked === role.key;
          return (
            <Card key={role.key} interactive padding="md"
              style={{ cursor: 'pointer', border: `1px solid ${active ? 'var(--border-brand)' : 'var(--border-subtle)'}`, boxShadow: active ? 'var(--focus-ring)' : undefined }}>
              <button type="button" onClick={() => setPicked(role.key)}
                style={{ all: 'unset', display: 'flex', gap: 'var(--space-4)', alignItems: 'flex-start', width: '100%', cursor: 'pointer' }}>
                <span style={{ flex: '0 0 auto', width: 44, height: 44, display: 'grid', placeItems: 'center', borderRadius: '999px', background: active ? 'var(--brand-primary)' : 'var(--surface-sunken)' }}>
                  <Icon name={role.icon} size={20} color={active ? '#fff' : 'var(--text-body)'} />
                </span>
                <span style={{ display: 'grid', gap: 2 }}>
                  <span style={{ fontWeight: 700, color: 'var(--text-strong)' }}>{role.title}</span>
                  <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>{role.body}</span>
                </span>
              </button>
            </Card>
          );
        })}
      </div>

      <Button fullWidth size="lg" disabled={!picked} onClick={() => navigate(ROLES.find((r) => r.key === picked).to)}>
        Continue
      </Button>
    </AuthLayout>
  );
}
