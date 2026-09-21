import fs from 'node:fs';

const ICON_DIR = '/private/tmp/claude-502/-Users-meshachesuabom-development-smartify/98ad6b42-0ddd-48d9-b5c0-72656c9d2c7d/scratchpad/lucide/package/icons';

/* ---------- Tokens (resolved values from the BuySellSwap design system) ---------- */
export const T = {
  blue50: '#EEF2FF', blue100: '#DCE4FF', blue200: '#B9C9FF', blue300: '#8EA6FF', blue400: '#5B7DFF',
  blue500: '#2E56FB', blue600: '#1B3FEA', blue700: '#1430BC', blue800: '#102796', blue900: '#0B1B68', blue950: '#060F3B',
  lemon50: '#FAFFE8', lemon100: '#F2FFC2', lemon200: '#E7FF87', lemon300: '#DAFA4E', lemon400: '#CDF23C',
  lemon500: '#B4DC15', lemon600: '#8FB40C', lemon700: '#6B860C', lemon800: '#4E620F', lemon900: '#3A4A10',
  ink950: '#070A18', ink900: '#0E1327', ink800: '#1B2138', ink700: '#2E3650', ink600: '#4A5470', ink500: '#6B768F',
  ink400: '#949EB4', ink300: '#C1C8D6', ink200: '#DDE2EB', ink100: '#EDF0F5', ink50: '#F6F8FB',
  green500: '#12B76A', green100: '#D6F6E6', amber500: '#F59E0B', amber100: '#FEF0CD', red500: '#E5484D', red100: '#FCE0E1',
  verFg: '#06623B', penFg: '#7A4A05', danFg: '#8E1F23',
  sh: {
    xs: '0 1px 2px rgba(7,10,24,.06)', sm: '0 2px 6px rgba(7,10,24,.07)', md: '0 6px 18px -4px rgba(7,10,24,.12)',
    lg: '0 18px 40px -12px rgba(7,10,24,.18)', brand: '0 10px 24px -8px rgba(27,63,234,.45)', accent: '0 10px 24px -8px rgba(180,220,21,.5)',
  },
  scrim: 'linear-gradient(to top,rgba(7,10,24,.78) 0%,rgba(7,10,24,.35) 45%,rgba(7,10,24,0) 100%)',
  glass: 'background:rgba(7,10,24,.45);border:1px solid rgba(255,255,255,.18);backdrop-filter:saturate(140%) blur(14px);-webkit-backdrop-filter:saturate(140%) blur(14px);',
};

/* ---------- Tiny HTML helpers ---------- */
export const R = (gap = 0, extra = '') => `display:flex;align-items:center;gap:${gap}px;${extra}`;
export const C = (gap = 0, extra = '') => `display:flex;flex-direction:column;gap:${gap}px;${extra}`;
export const G = (cols, gap = 16, extra = '') => `display:grid;grid-template-columns:repeat(${cols},minmax(0,1fr));gap:${gap}px;${extra}`;
export const d = (s, ...k) => `<div style="${s}">${k.join('')}</div>`;
export const sp = (s, ...k) => `<span style="${s}">${k.join('')}</span>`;
export const p = (s, ...k) => `<p style="${s}">${k.join('')}</p>`;
export const h = (n, s, ...k) => `<h${n} style="${s}">${k.join('')}</h${n}>`;
export const im = (file, s = '') => `<img src="${file}" alt="" style="${s}">`;
export const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
let _uid = 0;
export const resetIds = () => { _uid = 0; };
const nid = (t) => `f${++_uid}-${String(t || 'field').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 24)}`;
const RESET = 'appearance:none;-webkit-appearance:none;margin:0;font-family:inherit;line-height:1.2;cursor:pointer;';
export const fmt = (n) => (typeof n === 'number' ? n.toLocaleString('en-US') : n);
export const N = (n) => `₦${fmt(n)}`;

/* ---------- Icons (Lucide 0.454, inlined) ---------- */
const iconCache = {};
export function icon(name, size = 18, color = 'currentColor', sw = 2, fill = 'none') {
  if (!iconCache[name]) {
    const svg = fs.readFileSync(`${ICON_DIR}/${name}.svg`, 'utf8');
    iconCache[name] = svg.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>[\s\S]*$/, '').trim().replace(/\s*\n\s*/g, ' ');
  }
  return `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="${fill}" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" style="color:${color};flex:0 0 auto;display:block;">${iconCache[name]}</svg>`;
}

/* ---------- Atoms ---------- */
const BTN = {
  primary: `background:${T.blue600};color:#fff;border:1px solid transparent;box-shadow:${T.sh.xs};`,
  accent: `background:${T.lemon400};color:${T.ink950};border:1px solid transparent;box-shadow:${T.sh.xs};`,
  secondary: `background:#fff;color:${T.blue600};border:1px solid ${T.blue600};`,
  ghost: `background:transparent;color:${T.ink800};border:1px solid transparent;`,
  inverse: `background:${T.ink950};color:#fff;border:1px solid transparent;`,
  danger: `background:${T.red500};color:#fff;border:1px solid transparent;`,
};
const BH = { sm: 34, md: 44, lg: 54 }, BP = { sm: '0 14px', md: '0 20px', lg: '0 28px' }, BF = { sm: 13, md: 15, lg: 17 };
export const btn = (label, o = {}) => {
  const { v = 'primary', s = 'md', ic, icr, full = false, dis = false, style = '' } = o;
  const isz = s === 'lg' ? 18 : s === 'md' ? 17 : 16;
  return `<button type="button"${dis ? ' disabled' : ''} style="${RESET}display:${full ? 'flex' : 'inline-flex'};align-items:center;justify-content:center;gap:8px;height:${BH[s]}px;padding:${BP[s]};font-size:${BF[s]}px;font-weight:600;letter-spacing:-0.01em;border-radius:999px;white-space:nowrap;${full ? 'width:100%;' : ''}${dis ? 'opacity:.45;cursor:not-allowed;' : ''}${BTN[v]}${style}">${ic ? icon(ic, isz) : ''}${label}${icr ? icon(icr, isz) : ''}</button>`;
};

const BT = { brand: [T.blue50, T.blue700], accent: [T.lemon400, T.ink950], neutral: [T.ink100, T.ink700], verified: [T.green100, T.verFg], pending: [T.amber100, T.penFg], danger: [T.red100, T.danFg], inverse: [T.ink950, '#fff'] };
export const badge = (label, o = {}) => {
  const { tone = 'neutral', s = 'md', ic, style = '' } = o;
  const [bg, fg] = BT[tone];
  return `<span style="display:inline-flex;align-items:center;gap:6px;height:${s === 'sm' ? 22 : 28}px;padding:${s === 'sm' ? '0 8px' : '0 12px'};font-size:${s === 'sm' ? 11 : 12}px;font-weight:600;letter-spacing:.01em;border-radius:999px;white-space:nowrap;background:${bg};color:${fg};${style}">${ic ? icon(ic, s === 'sm' ? 12 : 14) : ''}${label}</span>`;
};

const CM = { 'brand-new': ['Brand new', T.green100, T.verFg], 'uk-used': ['UK used', T.blue50, T.blue700], 'ng-used': ['Nigerian used', T.ink100, T.ink700], 'for-parts': ['For parts', T.amber100, T.penFg], 'open-swap': ['Open to swap', T.lemon400, T.ink950] };
export const cond = (k, s = 'md') => {
  const [l, bg, fg] = CM[k];
  return `<span style="display:inline-flex;align-items:center;height:${s === 'sm' ? 22 : 26}px;padding:0 10px;border-radius:6px;background:${bg};color:${fg};font-size:${s === 'sm' ? 11 : 12}px;font-weight:600;letter-spacing:.01em;white-space:nowrap;">${l}</span>`;
};

export const tag = (label, o = {}) => {
  const { sel = false, rm = false } = o;
  return `<button type="button" style="${RESET}display:inline-flex;align-items:center;gap:6px;height:32px;padding:${rm ? '0 8px 0 14px' : '0 14px'};font-size:13px;font-weight:500;border-radius:999px;white-space:nowrap;flex:0 0 auto;background:${sel ? T.ink950 : '#fff'};color:${sel ? '#fff' : T.ink800};border:1px solid ${sel ? 'transparent' : T.ink200};">${label}${rm ? `<span style="width:18px;height:18px;display:grid;place-items:center;border-radius:999px;background:${sel ? 'rgba(255,255,255,.2)' : T.ink100};font-size:12px;line-height:1;">×</span>` : ''}</button>`;
};

export const pill = (label, o = {}) => {
  const { count, ic, on = false } = o;
  return `<button type="button" style="${RESET}display:inline-flex;align-items:center;gap:8px;height:40px;padding:0 16px;border-radius:999px;font-size:14px;font-weight:600;white-space:nowrap;flex:0 0 auto;background:${on ? T.blue600 : '#fff'};color:${on ? '#fff' : T.ink800};border:1px solid ${on ? 'transparent' : T.ink200};">${ic ? icon(ic, 16) : ''}${label}${count != null ? `<span style="font-size:12px;font-weight:500;color:${on ? 'rgba(255,255,255,.72)' : T.ink400};">${count}</span>` : ''}</button>`;
};

export const price = (amount, o = {}) => {
  const { size = 'md', was, note } = o;
  const sz = { sm: 16, md: 20, lg: 28, xl: 36 }[size];
  return `<span style="display:inline-flex;flex-wrap:wrap;align-items:baseline;column-gap:8px;row-gap:2px;"><span style="font-size:${sz}px;font-weight:800;letter-spacing:-0.02em;color:${T.ink950};">${N(amount)}</span>${was ? `<span style="font-size:${Math.max(12, Math.round(sz * 0.62))}px;color:${T.ink400};text-decoration:line-through;">${N(was)}</span>` : ''}${note ? `<span style="font-size:12px;font-weight:600;color:${T.lemon700};">${note}</span>` : ''}</span>`;
};

const AV = { xs: 24, sm: 32, md: 40, lg: 56, xl: 72 };
export const avatar = (name, o = {}) => {
  const { size = 'md', verified = false } = o;
  const px = AV[size];
  const ini = name.split(' ').filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase();
  const vd = Math.max(12, Math.round(px * 0.3));
  return `<span style="position:relative;display:inline-block;width:${px}px;height:${px}px;flex:0 0 auto;"><span style="width:${px}px;height:${px}px;display:grid;place-items:center;border-radius:999px;background:${T.blue100};color:${T.blue700};font-weight:700;font-size:${Math.round(px * 0.38)}px;letter-spacing:-0.01em;">${ini}</span>${verified ? `<span style="position:absolute;right:-1px;bottom:-1px;width:${vd}px;height:${vd}px;border-radius:999px;background:${T.green500};border:2px solid #fff;"></span>` : ''}</span>`;
};

const IB = { sm: 32, md: 40, lg: 48 };
const ARIA = { 'arrow-left': 'Back', x: 'Close', heart: 'Save', 'shopping-bag': 'Cart', bell: 'Notifications', 'share-2': 'Share', phone: 'Call', settings: 'Settings', download: 'Download', 'sliders-horizontal': 'Filters', ellipsis: 'More options', search: 'Search' };
export const iconBtn = (name, o = {}) => {
  const { v = 'ghost', s = 'md', badge: bd, color, isz = 18, label } = o;
  const skins = {
    ghost: `background:transparent;color:${T.ink800};border:1px solid transparent;`,
    outline: `background:#fff;color:${T.ink800};border:1px solid ${T.ink200};`,
    solid: `background:${T.blue600};color:#fff;border:1px solid transparent;`,
    glass: `${T.glass}color:#fff;`,
  };
  return `<button type="button" aria-label="${esc(label || ARIA[name] || name.replace(/-/g, ' '))}" style="${RESET}position:relative;width:${IB[s]}px;height:${IB[s]}px;display:inline-grid;place-items:center;padding:0;border-radius:999px;flex:0 0 auto;${skins[v]}">${icon(name, isz, color || 'currentColor')}${bd ? `<span style="position:absolute;top:-2px;right:-2px;min-width:18px;height:18px;padding:0 5px;display:grid;place-items:center;background:${T.lemon400};color:${T.ink950};font-size:11px;font-weight:700;border-radius:999px;border:2px solid ${v === 'glass' ? T.blue600 : '#fff'};">${bd}</span>` : ''}</button>`;
};

export const card = (inner, o = {}) => {
  const { pad = 'md', tone = 'default', style = '' } = o;
  const pads = { none: '0', sm: '12px', md: '20px', lg: '24px' };
  const tones = {
    default: `background:#fff;border:1px solid ${T.ink200};color:${T.ink800};`,
    brand: `background:${T.blue600};border:1px solid transparent;color:#fff;`,
    accent: `background:${T.lemon400};border:1px solid transparent;color:${T.ink950};`,
    inverse: `background:${T.ink950};border:1px solid transparent;color:#fff;`,
    sunken: `background:${T.ink100};border:1px solid transparent;color:${T.ink800};`,
  };
  return `<div style="border-radius:20px;padding:${pads[pad]};overflow:hidden;box-shadow:${T.sh.xs};${tones[tone]}${style}">${inner}</div>`;
};

/* form controls */
const INP = `flex:1;min-width:0;border:0;outline:0;background:transparent;padding:0;margin:0;font-family:inherit;font-size:16px;color:${T.ink950};`;
export const field = (label, o = {}) => {
  const { value = '', ph = '', pre, suf, hint, err, focus = false, hh = 48, aria, type = 'text' } = o;
  const bc = err ? T.red500 : focus ? T.blue500 : T.ink200;
  const id = nid(label || aria || ph);
  return `<div style="${C(8)}">${label ? `<label for="${id}" style="font-size:13px;font-weight:600;color:${T.ink950};">${label}</label>` : ''}<div style="display:flex;align-items:center;gap:8px;height:${hh}px;padding:0 16px;background:#fff;border:1px solid ${bc};border-radius:14px;${focus ? `box-shadow:0 0 0 3px ${T.blue200};` : ''}">${pre ? `<span style="color:${T.ink500};display:inline-flex;font-size:16px;">${pre}</span>` : ''}<input id="${id}" type="${type}" value="${esc(value)}" placeholder="${esc(ph)}"${label ? '' : ` aria-label="${esc(aria || ph || 'Value')}"`} style="${INP}">${suf ? `<span style="color:${T.ink500};display:inline-flex;">${suf}</span>` : ''}</div>${hint || err ? `<span style="font-size:13px;color:${err ? T.red500 : T.ink500};">${err || hint}</span>` : ''}</div>`;
};
export const area = (label, o = {}) => {
  const { value = '', ph = '', hh = 110, hint } = o;
  const id = nid(label || ph);
  return `<div style="${C(8)}">${label ? `<label for="${id}" style="font-size:13px;font-weight:600;color:${T.ink950};">${label}</label>` : ''}<textarea id="${id}" placeholder="${esc(ph)}"${label ? '' : ` aria-label="${esc(ph || 'Text')}"`} style="display:block;width:100%;height:${hh}px;resize:none;padding:14px 16px;margin:0;background:#fff;border:1px solid ${T.ink200};border-radius:14px;outline:0;font-family:inherit;font-size:15px;line-height:1.5;color:${T.ink950};">${esc(value)}</textarea>${hint ? `<span style="font-size:13px;color:${T.ink500};">${hint}</span>` : ''}</div>`;
};
export const sel = (label, value, o = {}) => {
  const { hint, ph = false, aria } = o;
  const id = nid(label || aria || value);
  return `<div style="${C(8)}">${label ? `<label for="${id}" style="font-size:13px;font-weight:600;color:${T.ink950};">${label}</label>` : ''}<div style="position:relative;display:flex;align-items:center;height:48px;background:#fff;border:1px solid ${T.ink200};border-radius:14px;"><select id="${id}"${label ? '' : ` aria-label="${esc(aria || 'Select')}"`} style="appearance:none;-webkit-appearance:none;flex:1;min-width:0;height:100%;padding:0 40px 0 16px;margin:0;border:0;outline:0;background:transparent;border-radius:14px;font-family:inherit;font-size:16px;color:${ph ? T.ink500 : T.ink950};"><option>${esc(value)}</option></select><span style="position:absolute;right:14px;top:16px;pointer-events:none;">${icon('chevron-down', 16, T.ink500, 2.4)}</span></div>${hint ? `<span style="font-size:13px;color:${T.ink500};">${hint}</span>` : ''}</div>`;
};
export const check = (label, o = {}) => {
  const { desc, on = false } = o;
  return `<div style="display:flex;gap:12px;align-items:${desc ? 'flex-start' : 'center'};"><span style="flex:0 0 auto;width:22px;height:22px;margin-top:${desc ? 2 : 0}px;display:grid;place-items:center;border-radius:6px;background:${on ? T.blue600 : '#fff'};border:1px solid ${on ? T.blue600 : T.ink300};">${on ? icon('check', 14, '#fff', 3.2) : ''}</span><div style="${C(2)}"><span style="font-size:14px;font-weight:500;color:${T.ink950};">${label}</span>${desc ? `<span style="font-size:13px;color:${T.ink500};">${desc}</span>` : ''}</div></div>`;
};
export const radio = (title, o = {}) => {
  const { desc, on = false, right = '' } = o;
  return `<div style="display:flex;align-items:center;gap:14px;padding:14px 16px;border-radius:14px;background:${on ? T.blue50 : '#fff'};border:${on ? `1.5px solid ${T.blue600}` : `1px solid ${T.ink200}`};"><span style="flex:0 0 auto;width:22px;height:22px;border-radius:999px;display:grid;place-items:center;border:2px solid ${on ? T.blue600 : T.ink300};background:#fff;">${on ? `<span style="width:10px;height:10px;border-radius:999px;background:${T.blue600};"></span>` : ''}</span><div style="${C(2, 'flex:1;min-width:0;')}"><span style="font-size:14px;font-weight:600;color:${T.ink950};">${title}</span>${desc ? `<span style="font-size:13px;color:${T.ink500};">${desc}</span>` : ''}</div>${right}</div>`;
};
export const toggle = (label, o = {}) => {
  const { on = false, desc } = o;
  return `<div style="display:flex;align-items:center;justify-content:space-between;gap:16px;"><div style="${C(2)}"><span style="font-size:14px;font-weight:500;color:${T.ink950};">${label}</span>${desc ? `<span style="font-size:13px;color:${T.ink500};">${desc}</span>` : ''}</div><span style="position:relative;display:inline-block;width:46px;height:28px;border-radius:999px;flex:0 0 auto;background:${on ? T.blue600 : T.ink300};"><span style="position:absolute;top:3px;left:${on ? 21 : 3}px;width:22px;height:22px;border-radius:999px;background:#fff;box-shadow:${T.sh.sm};"></span></span></div>`;
};
export const search = (o = {}) => {
  const { ph = 'Search phones, laptops, consoles…', value = '', s = 'md', button = false, style = '' } = o;
  const hh = s === 'lg' ? 56 : 48;
  const id = nid('search');
  return `<div style="display:flex;align-items:center;gap:8px;height:${hh}px;padding:${button ? '0 6px 0 16px' : '0 16px'};background:#fff;border:1px solid ${T.ink200};border-radius:999px;box-shadow:${T.sh.xs};${style}">${icon('search', 18, T.ink500, 2.2)}<input id="${id}" type="search" value="${esc(value)}" placeholder="${esc(ph)}" aria-label="Search" style="${INP}">${button ? `<button type="button" style="${RESET}display:inline-flex;align-items:center;height:${hh - 12}px;padding:0 18px;background:${T.blue600};color:#fff;border:0;border-radius:999px;font-size:14px;font-weight:600;">Search</button>` : ''}</div>`;
};

/* tabs */
export const tabsU = (tabs, active, style = '') =>
  `<div style="display:flex;gap:24px;border-bottom:1px solid ${T.ink200};${style}">${tabs.map((t) => { const on = t.l === active; return `<span style="position:relative;padding:0 0 12px;font-size:14px;font-weight:${on ? 600 : 500};color:${on ? T.ink950 : T.ink500};white-space:nowrap;">${t.l}${t.c != null ? `<span style="margin-left:6px;color:${T.ink400};font-size:12px;">${t.c}</span>` : ''}<span style="position:absolute;left:0;right:0;bottom:-1px;height:3px;border-radius:3px;background:${on ? T.blue600 : 'transparent'};"></span></span>`; }).join('')}</div>`;
export const tabsS = (tabs, active) =>
  `<div style="display:inline-flex;padding:4px;gap:4px;background:${T.ink100};border-radius:999px;">${tabs.map((t) => { const on = t === active; return `<span style="display:inline-flex;align-items:center;height:34px;padding:0 16px;border-radius:999px;font-size:13px;font-weight:600;white-space:nowrap;background:${on ? '#fff' : 'transparent'};color:${on ? T.ink950 : T.ink500};box-shadow:${on ? T.sh.xs : 'none'};">${t}</span>`; }).join('')}</div>`;

/* seller row */
export const sellerRow = (s, o = {}) => {
  const { compact = false, action = '', pill = true } = o;
  return `<div style="display:flex;align-items:center;gap:12px;">${avatar(s.name, { size: compact ? 'md' : 'lg', verified: s.verified })}<div style="${C(2, 'min-width:0;flex:1;')}"><div style="${R(6)}"><span style="font-size:${compact ? 14 : 16}px;font-weight:600;color:${T.ink950};white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${s.name}</span>${s.verified && pill ?`<span style="height:20px;padding:0 8px;display:inline-flex;align-items:center;background:${T.green100};color:${T.verFg};border-radius:999px;font-size:10px;font-weight:700;letter-spacing:.04em;">VERIFIED</span>` : ''}</div><div style="display:flex;gap:8px;flex-wrap:wrap;font-size:13px;color:${T.ink500};">${s.rating ? `<span style="color:${T.ink800};font-weight:600;">★ ${s.rating}</span>` : ''}${s.deals ? `<span>${s.deals} deals</span>` : ''}${s.loc ? `<span>${s.loc}</span>` : ''}${s.since && !compact ? `<span>Joined ${s.since}</span>` : ''}</div></div>${action}</div>`;
};

/* listing card */
export const listingCard = (l, o = {}) => {
  const { row = false, saved = false } = o;
  const photo = `<div style="position:relative;${row ? 'width:116px;height:116px;' : 'aspect-ratio:4 / 3;'}background:${T.ink100};overflow:hidden;flex:0 0 auto;">${im(l.img, 'width:100%;height:100%;object-fit:cover;')}${l.swap && !row ? `<span style="position:absolute;top:10px;left:10px;height:24px;padding:0 10px;display:inline-flex;align-items:center;background:${T.lemon400};color:${T.ink950};border-radius:999px;font-size:11px;font-weight:700;letter-spacing:.02em;">OPEN TO SWAP</span>` : ''}${!row ? `<span style="position:absolute;top:8px;right:8px;width:34px;height:34px;display:grid;place-items:center;border-radius:999px;${T.glass}color:${saved ? T.lemon300 : '#fff'};">${icon('heart', 17, 'currentColor', 2, saved ? 'currentColor' : 'none')}</span>` : ''}</div>`;
  const body = `<div style="${C(8, row ? 'padding:12px 16px 12px 0;min-width:0;flex:1;justify-content:center;' : 'padding:16px;')}"><div style="${R(6, 'flex-wrap:nowrap;')}">${cond(l.cond, 'sm')}${l.swap && row ? cond('open-swap', 'sm') : ''}${l.ver && !row ? `<span style="margin-left:auto;">${icon('shield-check', 16, T.green500, 2.2)}</span>` : ''}</div><div style="font-size:14px;font-weight:600;line-height:1.35;color:${T.ink950};display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">${l.title}</div>${price(l.price, { size: row ? 'sm' : 'md', was: l.was })}<div style="${R(6)}"><span style="font-size:${row ? 13 : 12}px;color:${T.ink500};white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0;">${l.loc} · ${l.when}</span>${l.ver && row ? `<span style="margin-left:auto;">${icon('shield-check', 15, T.green500, 2.2)}</span>` : ''}</div></div>`;
  return `<div style="${row ? 'display:flex;gap:16px;align-items:stretch;' : 'display:block;'}background:#fff;border:1px solid ${T.ink200};border-radius:20px;overflow:hidden;box-shadow:${T.sh.xs};min-width:0;">${photo}${body}</div>`;
};

/* wordmark */
export const wordmark = (size = 19, color = T.ink950, ls = '-0.04em') => `<span style="font-size:${size}px;font-weight:800;letter-spacing:${ls};color:${color};line-height:1;white-space:nowrap;">BuySellSwap</span>`;

/* status stepper item list */
export const steps = (items) =>
  `<div style="${C(0)}">${items.map((s, i) => {
    const last = i === items.length - 1;
    const dot = s.st === 'done'
      ? `<span style="width:22px;height:22px;border-radius:999px;background:${T.blue600};display:grid;place-items:center;">${icon('check', 13, '#fff', 3.2)}</span>`
      : s.st === 'now'
        ? `<span style="width:22px;height:22px;border-radius:999px;background:#fff;border:2px solid ${T.blue600};display:grid;place-items:center;box-shadow:0 0 0 4px ${T.blue100};"><span style="width:8px;height:8px;border-radius:999px;background:${T.blue600};"></span></span>`
        : `<span style="width:22px;height:22px;border-radius:999px;background:#fff;border:2px solid ${T.ink200};"></span>`;
    return `<div style="display:flex;gap:14px;"><div style="display:flex;flex-direction:column;align-items:center;">${dot}${last ? '' : `<span style="width:2px;flex:1;min-height:26px;background:${s.st === 'done' ? T.blue600 : T.ink200};margin:2px 0;"></span>`}</div><div style="${C(2, `padding-bottom:${last ? 0 : 14}px;`)}"><span style="font-size:14px;font-weight:600;color:${s.st === 'todo' ? T.ink400 : T.ink950};">${s.t}</span>${s.d ? `<span style="font-size:13px;color:${T.ink500};">${s.d}</span>` : ''}</div></div>`;
  }).join('')}</div>`;

/* charts */
export const bars = (w, hh, vals, labels, hi = -1) => {
  const max = Math.max(...vals) * 1.1, pad = 26, bw = (w - 20) / vals.length;
  const ch = hh - pad;
  const g = [0.25, 0.5, 0.75, 1].map((f) => `<line x1="0" x2="${w}" y1="${(ch - ch * f).toFixed(1)}" y2="${(ch - ch * f).toFixed(1)}" stroke="${T.ink100}" stroke-width="1"/>`).join('');
  const b = vals.map((v, i) => { const bh = (v / max) * ch; const x = 10 + i * bw + bw * 0.18; return `<rect x="${x.toFixed(1)}" y="${(ch - bh).toFixed(1)}" width="${(bw * 0.64).toFixed(1)}" height="${bh.toFixed(1)}" rx="6" fill="${i === hi ? T.blue600 : T.blue100}"/><text x="${(x + bw * 0.32).toFixed(1)}" y="${hh - 6}" text-anchor="middle" font-size="11" fill="${T.ink500}" font-family="Sora, Lexend, sans-serif">${labels[i]}</text>`; }).join('');
  return `<svg viewBox="0 0 ${w} ${hh}" width="100%" height="${hh}" style="display:block;">${g}${b}</svg>`;
};
export const line = (w, hh, vals, labels) => {
  const max = Math.max(...vals) * 1.12, pad = 26, ch = hh - pad, step = (w - 24) / (vals.length - 1);
  const pts = vals.map((v, i) => [12 + i * step, ch - (v / max) * ch]);
  const path = pts.map((q, i) => `${i ? 'L' : 'M'}${q[0].toFixed(1)} ${q[1].toFixed(1)}`).join(' ');
  const area = `${path} L${pts[pts.length - 1][0].toFixed(1)} ${ch} L${pts[0][0].toFixed(1)} ${ch} Z`;
  const g = [0.25, 0.5, 0.75, 1].map((f) => `<line x1="0" x2="${w}" y1="${(ch - ch * f).toFixed(1)}" y2="${(ch - ch * f).toFixed(1)}" stroke="${T.ink100}" stroke-width="1"/>`).join('');
  const lab = labels.map((t, i) => `<text x="${(12 + i * step).toFixed(1)}" y="${hh - 6}" text-anchor="middle" font-size="11" fill="${T.ink500}" font-family="Sora, Lexend, sans-serif">${t}</text>`).join('');
  const last = pts[pts.length - 1];
  return `<svg viewBox="0 0 ${w} ${hh}" width="100%" height="${hh}" style="display:block;">${g}<path d="${area}" fill="${T.blue50}" stroke="none"/><path d="${path}" fill="none" stroke="${T.blue600}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="${last[0].toFixed(1)}" cy="${last[1].toFixed(1)}" r="5" fill="${T.blue600}" stroke="#fff" stroke-width="2.5"/>${lab}</svg>`;
};

/* ---------- Document wrapper ---------- */
export const HELMET = `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Sora:wght@100..800&display=swap">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Lexend:wght@100..900&text=%E2%82%A6&display=swap">
<style>
*,*::before,*::after{box-sizing:border-box}
body{margin:0;font-family:'Sora','Lexend',ui-sans-serif,system-ui,sans-serif;font-size:16px;line-height:1.55;color:${T.ink800};background:${T.ink50};-webkit-font-smoothing:antialiased}
h1,h2,h3,h4,h5,h6{margin:0;font-weight:700;line-height:1.2;letter-spacing:-0.015em;color:${T.ink950}}
p{margin:0;text-wrap:pretty}
a{color:${T.blue600};text-decoration:none;font-weight:500}
a:hover{color:${T.blue800}}
img{max-width:100%;display:block}
::selection{background:${T.lemon300};color:${T.ink950}}
.hs::-webkit-scrollbar{display:none}
input::placeholder,textarea::placeholder{color:${T.ink500};opacity:1}
input[type=search]::-webkit-search-cancel-button{display:none}
</style>`;

export function dc(w, H, inner, o = {}) {
  const { bg = T.ink50, row = false, style = '' } = o;
  return `<!doctype html>
<html>
<head>
<meta charset="utf-8">
<script src="./support.js"></script>
</head>
<body>
<x-dc>
<helmet>
${HELMET}
</helmet>
<div style="width:${w}px;min-height:${H}px;background:${bg};position:relative;display:flex;flex-direction:${row ? 'row' : 'column'};${style}">${inner}</div>
</x-dc>
</body>
</html>
`;
}

/* ---------- Mobile chrome ---------- */
export const topBar = (o = {}) => {
  const { title, sub, left = '', right = '', tone = 'light' } = o;
  const dark = tone === 'brand' || tone === 'inverse';
  return `<div style="display:flex;align-items:center;gap:12px;min-height:60px;padding:0 16px;background:${tone === 'brand' ? T.blue600 : tone === 'inverse' ? T.ink950 : '#fff'};color:${dark ? '#fff' : T.ink950};border-bottom:1px solid ${dark ? 'rgba(255,255,255,.1)' : T.ink200};flex:0 0 auto;">${left}<div style="${C(0, 'flex:1;min-width:0;')}">${title ? `<span style="font-size:17px;font-weight:700;letter-spacing:-0.02em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${title}</span>` : ''}${sub ? `<span style="font-size:12px;color:${dark ? 'rgba(255,255,255,.7)' : T.ink500};">${sub}</span>` : ''}</div><div style="${R(4)}">${right}</div></div>`;
};
export const back = (name = 'arrow-left') => iconBtn(name, { v: 'ghost' });

export const bottomNav = (items, active) =>
  `<div style="display:grid;grid-template-columns:repeat(${items.length},minmax(0,1fr));align-items:stretch;background:#fff;border-top:1px solid ${T.ink200};padding-bottom:6px;flex:0 0 auto;">${items.map((it) => {
    const on = it.id === active;
    if (it.primary) return `<div style="display:grid;place-items:center;gap:2px;padding:6px 0 2px;"><span style="width:46px;height:34px;display:grid;place-items:center;background:${T.blue600};color:#fff;border-radius:999px;box-shadow:${T.sh.brand};">${icon(it.ic, 20, '#fff')}</span><span style="font-size:10px;font-weight:600;color:${T.blue600};">${it.l}</span></div>`;
    return `<div style="position:relative;display:grid;place-items:center;gap:4px;min-height:44px;padding:10px 0 4px;color:${on ? T.blue600 : T.ink500};">${icon(it.ic, 22)}<span style="font-size:10px;font-weight:${on ? 600 : 500};">${it.l}</span>${it.b ? `<span style="position:absolute;top:6px;left:calc(50% + 6px);min-width:16px;height:16px;padding:0 4px;display:grid;place-items:center;background:${T.lemon400};color:${T.ink950};border-radius:999px;font-size:10px;font-weight:700;">${it.b}</span>` : ''}</div>`;
  }).join('')}</div>`;
export const NAV_BUY = (badge) => [
  { id: 'home', l: 'Home', ic: 'house' }, { id: 'search', l: 'Search', ic: 'search' }, { id: 'sell', l: 'Sell', ic: 'plus', primary: true },
  { id: 'orders', l: 'Orders', ic: 'package', b: badge }, { id: 'account', l: 'Account', ic: 'user' },
];
export const NAV_SELL = (badge) => [
  { id: 'home', l: 'Home', ic: 'layout-dashboard' }, { id: 'stock', l: 'Inventory', ic: 'boxes' }, { id: 'new', l: 'List', ic: 'plus', primary: true },
  { id: 'orders', l: 'Orders', ic: 'receipt', b: badge }, { id: 'money', l: 'Earnings', ic: 'wallet' },
];
export const actionBar = (inner) => `<div style="display:flex;gap:10px;padding:14px;background:rgba(255,255,255,.92);border-top:1px solid ${T.ink200};flex:0 0 auto;">${inner}</div>`;
export const scrollBody = (inner, style = '') => `<div style="flex:1;${style}">${inner}</div>`;
export const progress = (n, total) => `<div style="display:flex;gap:6px;">${Array.from({ length: total }, (_, i) => `<span style="flex:1;height:4px;border-radius:4px;background:${i < n ? T.blue600 : T.ink200};"></span>`).join('')}</div>`;

/* ---------- Desktop chrome ---------- */
export const wrap = (inner, style = '') => `<div style="width:1200px;max-width:100%;margin:0 auto;padding:0 32px;${style}">${inner}</div>`;
export const siteHeader = (o = {}) => {
  const { active = '', cart, user = false } = o;
  return `<header style="background:rgba(255,255,255,.92);border-bottom:1px solid ${T.ink200};flex:0 0 auto;"><div style="width:1200px;margin:0 auto;padding:0 32px;height:72px;display:flex;align-items:center;gap:32px;">${wordmark(19)}<nav style="display:flex;gap:24px;flex:1;">${['Buy', 'Sell', 'Swap', 'Safety', 'Help'].map((l) => `<a href="#" style="font-size:14px;font-weight:500;color:${l === active ? T.blue600 : T.ink800};">${l}</a>`).join('')}</nav>${iconBtn('heart', { v: 'ghost' })}${iconBtn('shopping-bag', { v: 'ghost', badge: cart })}${user ? avatar('Musa Ibrahim', { size: 'sm' }) : btn('Log in', { v: 'ghost', s: 'sm' })}${btn('Start selling', { s: 'sm', ic: 'plus' })}</div></header>`;
};
export const siteFooter = () => {
  const cols = [['Marketplace', ['Phones', 'Laptops', 'Consoles', 'Audio', 'Accessories']], ['Selling', ['Start selling', 'Seller guide', 'Fees and payouts', 'Seller verification']], ['Trust', ['Payment protection', 'Verified devices', 'IMEI check', 'Returns and refunds']], ['Company', ['About', 'Contact', 'Terms', 'Privacy']]];
  return `<footer style="background:${T.ink950};color:rgba(255,255,255,.72);padding:64px 0 40px;flex:0 0 auto;"><div style="width:1200px;margin:0 auto;padding:0 32px;display:grid;grid-template-columns:1.4fr repeat(4,minmax(0,1fr));gap:32px;"><div style="${C(12, 'align-content:start;')}"><div style="font-size:22px;font-weight:800;letter-spacing:-0.04em;color:#fff;line-height:1;">BuySellSwap</div><p style="font-size:13px;max-width:240px;">Kaduna's gadget marketplace. Buy verified devices, sell the one in your drawer, swap when a seller is open to it.</p></div>${cols.map(([hd, it]) => `<div style="${C(10, 'align-content:start;')}"><div style="font-size:11px;letter-spacing:.14em;font-weight:700;color:${T.lemon300};">${hd.toUpperCase()}</div>${it.map((x) => `<span style="font-size:13px;color:rgba(255,255,255,.72);">${x}</span>`).join('')}</div>`).join('')}</div><div style="width:1200px;margin:40px auto 0;padding:20px 32px 0;border-top:1px solid rgba(255,255,255,.1);display:flex;justify-content:space-between;font-size:12px;"><span>© 2026 BuySellSwap, a SMARTiFy company. Kaduna, Nigeria.</span><span style="display:flex;gap:18px;"><span>Terms</span><span>Privacy</span></span></div></footer>`;
};

/* ---------- Dashboards (seller = light, admin = ink) ---------- */
export const SELLER_NAV = [
  ['layout-dashboard', 'Overview'], ['boxes', 'Inventory'], ['receipt', 'Orders', 3], ['wallet', 'Earnings'], ['star', 'Reviews'], ['shield-check', 'Verification'], ['store', 'Store profile'], ['settings', 'Settings'],
];
export const ADMIN_NAV = [
  ['g', 'Marketplace'], ['layout-dashboard', 'Overview'], ['users', 'Sellers', 14], ['boxes', 'Listings'], ['tag', 'Catalogue'], ['shield-check', 'Verification', 9],
  ['g', 'Money'], ['receipt', 'Orders'], ['credit-card', 'Payments'], ['landmark', 'Settlements'], ['rotate-ccw', 'Returns and refunds', 4], ['gavel', 'Disputes', 3],
  ['g', 'Operations'], ['user', 'Customers'], ['warehouse', 'BSS inventory'], ['truck', 'Logistics'], ['ticket', 'Promotions'], ['chart-column', 'Reports'],
];
export function dash(o) {
  const { role, active, title, sub = '', actions = '', body, search: sr = 'Search', H = 1 } = o;
  const admin = role === 'admin';
  const nav = admin ? ADMIN_NAV : SELLER_NAV;
  const items = nav.map((n) => {
    if (n[0] === 'g') return `<div style="font-size:11px;letter-spacing:.14em;font-weight:700;color:rgba(255,255,255,.4);padding:14px 14px 4px;">${n[1].toUpperCase()}</div>`;
    const on = n[1] === active;
    const bg = on ? (admin ? T.blue600 : T.blue50) : 'transparent';
    const col = on ? (admin ? '#fff' : T.blue600) : (admin ? 'rgba(255,255,255,.72)' : T.ink800);
    return `<div style="display:flex;align-items:center;gap:10px;height:${admin ? 38 : 42}px;padding:0 14px;border-radius:999px;font-size:14px;font-weight:${on ? 600 : 500};color:${col};background:${bg};">${icon(n[0], 18)}<span style="flex:1;white-space:nowrap;">${n[1]}</span>${n[2] ? `<span style="min-width:20px;height:20px;padding:0 6px;display:grid;place-items:center;background:${T.lemon400};color:${T.ink950};border-radius:999px;font-size:11px;font-weight:700;">${n[2]}</span>` : ''}</div>`;
  }).join('');
  const user = admin
    ? `<div style="${R(10, 'padding:12px;border-radius:14px;background:rgba(255,255,255,.06);')}">${avatar('Amina Bello', { size: 'sm' })}<div style="${C(0)}"><span style="font-size:13px;font-weight:600;color:#fff;">Amina Bello</span><span style="font-size:12px;color:rgba(255,255,255,.55);">Operations admin</span></div></div>`
    : `<div style="${R(10, `padding:12px;border-radius:14px;background:${T.ink50};`)}">${avatar('TechHub Kaduna', { size: 'sm', verified: true })}<div style="${C(0)}"><span style="font-size:13px;font-weight:600;color:${T.ink950};">TechHub Kaduna</span><span style="font-size:12px;color:${T.ink500};">Verified seller</span></div></div>`;
  const side = `<aside style="width:${admin ? 248 : 248}px;flex:0 0 auto;background:${admin ? T.ink950 : '#fff'};border-right:1px solid ${admin ? 'transparent' : T.ink200};padding:22px 16px;display:flex;flex-direction:column;gap:${admin ? 6 : 18}px;"><div style="${R(10, 'padding:4px 10px 14px;')}">${wordmark(19, admin ? '#fff' : T.ink950)}<span style="height:20px;padding:0 8px;display:inline-flex;align-items:center;border-radius:999px;font-size:10px;font-weight:700;letter-spacing:.06em;background:${admin ? T.lemon400 : T.blue50};color:${admin ? T.ink950 : T.blue700};">${admin ? 'ADMIN' : 'SELLER'}</span></div><div style="${C(2, 'flex:1;')}">${items}</div>${user}</aside>`;
  const main = `<main style="flex:1;min-width:0;padding:28px 36px 40px;display:flex;flex-direction:column;gap:24px;"><div style="${R(16)}"><div style="${C(2, 'flex:1;min-width:0;')}"><h1 style="font-size:26px;letter-spacing:-0.02em;">${title}</h1>${sub ? `<span style="font-size:14px;color:${T.ink500};">${sub}</span>` : ''}</div>${actions}<div style="${R(8, `height:40px;padding:0 14px;min-width:220px;background:#fff;border:1px solid ${T.ink200};border-radius:999px;`)}">${icon('search', 16, T.ink500)}<span style="font-size:14px;color:${T.ink500};">${sr}</span></div>${iconBtn('bell', { v: 'outline', badge: admin ? 12 : 3 })}</div>${body}</main>`;
  return dc(1440, H, `${side}${main}`, { row: true });
}

/* data table (card) */
export const table = (cols, rows, o = {}) => {
  const { tpl = cols.map(() => '1fr').join(' ') } = o;
  const head = `<div style="display:grid;grid-template-columns:${tpl};gap:16px;padding:12px 20px;background:${T.ink50};border-bottom:1px solid ${T.ink200};">${cols.map((c) => `<span style="font-size:11px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:${T.ink500};">${c}</span>`).join('')}</div>`;
  const body = rows.map((r, i) => `<div style="display:grid;grid-template-columns:${tpl};gap:16px;align-items:center;padding:14px 20px;${i < rows.length - 1 ? `border-bottom:1px solid ${T.ink100};` : ''}font-size:14px;color:${T.ink800};">${r.map((c) => `<div style="min-width:0;">${c}</div>`).join('')}</div>`).join('');
  return `<div style="background:#fff;border:1px solid ${T.ink200};border-radius:20px;overflow:hidden;box-shadow:${T.sh.xs};">${head}${body}</div>`;
};
export const kpi = (label, value, o = {}) => {
  const { delta, tone = 'verified', ic } = o;
  return card(`<div style="${C(10)}"><div style="${R(8)}"><span style="font-size:13px;font-weight:500;color:${T.ink500};flex:1;">${label}</span>${ic ? `<span style="width:32px;height:32px;display:grid;place-items:center;border-radius:999px;background:${T.blue50};">${icon(ic, 16, T.blue600)}</span>` : ''}</div><span style="font-size:28px;font-weight:800;letter-spacing:-0.03em;color:${T.ink950};line-height:1.1;">${value}</span>${delta ? `<div>${badge(delta, { tone, s: 'sm' })}</div>` : ''}</div>`);
};
export const cellMain = (t, sub) => `<div style="${C(2)}"><span style="font-weight:600;color:${T.ink950};">${t}</span>${sub ? `<span style="font-size:13px;color:${T.ink500};">${sub}</span>` : ''}</div>`;
export const mono = (t) => `<span style="font-size:13px;font-weight:600;color:${T.ink700};letter-spacing:.02em;">${t}</span>`;
export const thumb = (img, s = 40) => im(img, `width:${s}px;height:${s}px;object-fit:cover;border-radius:10px;flex:0 0 auto;`);
