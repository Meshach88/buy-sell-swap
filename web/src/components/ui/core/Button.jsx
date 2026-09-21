import React from 'react';

const PAD = { sm: '0 14px', md: '0 20px', lg: '0 28px' };
const HEIGHT = { sm: 34, md: 44, lg: 54 };
const FONT = { sm: 13, md: 15, lg: 17 };

function skin(variant, state) {
  const hov = state === 'hover';
  switch (variant) {
    case 'primary':
      return { background: hov ? 'var(--brand-primary-hover)' : 'var(--brand-primary)', color: 'var(--text-on-primary)', border: '1px solid transparent', boxShadow: hov ? 'var(--shadow-brand)' : 'var(--shadow-xs)' };
    case 'accent':
      return { background: hov ? 'var(--brand-accent-hover)' : 'var(--brand-accent)', color: 'var(--text-on-accent)', border: '1px solid transparent', boxShadow: hov ? 'var(--shadow-accent)' : 'var(--shadow-xs)' };
    case 'secondary':
      return { background: hov ? 'var(--blue-50)' : 'var(--surface-card)', color: 'var(--brand-primary)', border: '1px solid var(--border-brand)', boxShadow: 'none' };
    case 'ghost':
      return { background: hov ? 'var(--ink-100)' : 'transparent', color: 'var(--text-body)', border: '1px solid transparent', boxShadow: 'none' };
    case 'inverse':
      return { background: hov ? 'var(--ink-800)' : 'var(--surface-inverse)', color: 'var(--white)', border: '1px solid transparent', boxShadow: 'none' };
    case 'danger':
      return { background: hov ? '#C93A3F' : 'var(--red-500)', color: 'var(--white)', border: '1px solid transparent', boxShadow: 'none' };
    default:
      return {};
  }
}

export function Button({ variant = 'primary', size = 'md', children, icon, iconRight, fullWidth = false, disabled = false, type = 'button', onClick }) {
  const [state, setState] = React.useState('rest');
  const style = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-2)',
    height: HEIGHT[size], padding: PAD[size], fontFamily: 'var(--font-sans)', fontSize: FONT[size],
    fontWeight: 'var(--weight-semibold)', letterSpacing: '-0.01em', borderRadius: 'var(--radius-control)',
    cursor: disabled ? 'not-allowed' : 'pointer', width: fullWidth ? '100%' : undefined,
    opacity: disabled ? 0.45 : 1, transition: 'var(--transition-control)',
    transform: state === 'press' ? 'scale(var(--press-scale))' : 'none', whiteSpace: 'nowrap',
    ...skin(variant, disabled ? 'rest' : state),
  };
  return (
    <button type={type} disabled={disabled} onClick={onClick} style={style}
      onMouseEnter={() => !disabled && setState('hover')} onMouseLeave={() => setState('rest')}
      onMouseDown={() => !disabled && setState('press')} onMouseUp={() => !disabled && setState('hover')}>
      {icon}{children}{iconRight}
    </button>
  );
}
