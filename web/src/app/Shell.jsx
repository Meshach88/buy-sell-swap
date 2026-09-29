import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Icon } from '../components/ui/core/Icon.jsx';
import { Button } from '../components/ui/core/Button.jsx';
import { useAuth } from '../lib/auth.jsx';
import { useToast } from '../lib/toast.jsx';

const TOP = [['Buy', '/'], ['Sell', '/sell'], ['Swap', '/swap'], ['Safety', '/safety'], ['Help', '/help']];

export function Shell() {
  const { user, logout } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const isSeller = user?.roles?.includes('seller');

  const TABS = [
    { to: '/', label: 'Home', icon: 'house', end: true },
    { to: '/search', label: 'Search', icon: 'search' },
    { to: isSeller ? '/sell' : '/signup/seller', label: 'Sell', icon: 'plus', primary: true },
    { to: '/orders', label: 'Orders', icon: 'package' },
    { to: user ? '/account' : '/login', label: 'Account', icon: 'user' },
  ];

  async function onLogout() {
    await logout();
    toast.show('Logged out.');
    navigate('/');
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <NavLink to="/" className="app-wordmark" end>BuySellSwap</NavLink>
        <nav className="app-nav-top" aria-label="Main">
          {TOP.map(([label, to]) => <NavLink key={label} to={to} end={to === '/'}>{label}</NavLink>)}
        </nav>
        <div className="app-header-actions">
          {user ? (
            <>
              <span className="app-header-greeting">Hi, {user.name.split(' ')[0]}</span>
              <Button variant="ghost" size="sm" onClick={onLogout}>Log out</Button>
            </>
          ) : (
            <>
              <button type="button" className="app-header-loginlink" onClick={() => navigate('/login')}>Log in</button>
              <Button size="sm" icon={<Icon name="plus" size={16} />} onClick={() => navigate('/signup/seller')}>Start selling</Button>
            </>
          )}
        </div>
      </header>

      <main className="app-main"><Outlet /></main>

      <nav className="bottom-nav" aria-label="Tabs">
        {TABS.map((t) => (
          <NavLink key={t.to} to={t.to} end={t.end} className={t.primary ? 'sell-tab' : undefined}>
            {t.primary
              ? <span className="pill"><Icon name={t.icon} size={20} color="#fff" /></span>
              : <Icon name={t.icon} size={22} />}
            <span>{t.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
