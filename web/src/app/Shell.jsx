import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Icon } from '../components/ui/core/Icon.jsx';

const TOP = [['Buy', '/'], ['Sell', '/sell'], ['Swap', '/swap'], ['Safety', '/safety'], ['Help', '/help']];
const TABS = [
  { to: '/', label: 'Home', icon: 'house', end: true },
  { to: '/search', label: 'Search', icon: 'search' },
  { to: '/sell', label: 'Sell', icon: 'plus', primary: true },
  { to: '/orders', label: 'Orders', icon: 'package' },
  { to: '/account', label: 'Account', icon: 'user' },
];

export function Shell() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <NavLink to="/" className="app-wordmark" end>BuySellSwap</NavLink>
        <nav className="app-nav-top" aria-label="Main">
          {TOP.map(([label, to]) => <NavLink key={label} to={to} end={to === '/'}>{label}</NavLink>)}
        </nav>
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
