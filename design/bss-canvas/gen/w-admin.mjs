import { T, R, C, G, d, sp, p, h, im, N, icon, btn, badge, cond, tag, pill, price, avatar, iconBtn, card, field, area, sel, check, radio, toggle, search, tabsU, tabsS, sellerRow, listingCard, wordmark, steps, dc, dash, table, kpi, cellMain, mono, thumb, bars, line } from './lib.mjs';
import { L, SELLERS } from './data.mjs';

export const screens = [];
const add = (file, title, row, fn, minH = 960) => screens.push({ file, title, row, w: 1440, minH, fn });
const medal = (ic, bg = T.blue50, col = T.blue600, s = 40) => `<span style="width:${s}px;height:${s}px;display:grid;place-items:center;border-radius:999px;background:${bg};flex:0 0 auto;">${icon(ic, Math.round(s * 0.45), col)}</span>`;
const A = (o) => dash({ role: 'admin', ...o });
const st = (t, tone) => badge(t, { tone, s: 'sm' });
const pt = (t) => `<h3 style="font-size:17px;">${t}</h3>`;
const ln = (k, v, b) => `<div style="${R(0, 'justify-content:space-between;')}"><span style="font-size:14px;color:${T.ink500};">${k}</span><span style="font-size:14px;${b ? 'font-weight:700;' : ''}">${v}</span></div>`;
const dots = icon('ellipsis', 18, T.ink400);
const link = (t) => `<span style="font-size:13px;font-weight:600;color:${T.blue600};">${t}</span>`;
const seller = (s, sub) => `<div style="${R(12)}">${avatar(s.name, { size: 'sm', verified: s.verified })}<div style="${C(0)}"><span style="font-weight:600;color:${T.ink950};">${s.name}</span><span style="font-size:13px;color:${T.ink500};">${sub || s.loc + ', Kaduna'}</span></div></div>`;
const prod = (l, sub) => `<div style="${R(12)}">${thumb(l.img, 44)}<div style="${C(0, 'min-width:0;')}"><span style="font-weight:600;color:${T.ink950};line-height:1.3;">${l.title}</span><span style="font-size:13px;color:${T.ink500};">${sub || l.seller.name}</span></div></div>`;
const filt = () => `<div style="${R(10)}">${tag('Last 30 days')}${tag('All areas')}${tag('+ Add filter')}</div>`;

/* 1. Overview */
add('WaOverview', 'Overview', 'Marketplace', (H) => {
  const tiles = `<div style="${G(4, 16)}">${kpi('Gross sales (30 days)', '₦18.4M', { delta: '▲ 12% vs last period', ic: 'trending-up' })}${kpi('Orders', '412', { ic: 'receipt', delta: '▲ 8%' })}${kpi('Active sellers', '86', { ic: 'store', delta: '14 awaiting KYC', tone: 'pending' })}${kpi('Held in escrow', N(4120000), { ic: 'lock', delta: '38 open orders', tone: 'neutral' })}</div>`;
  const chart = card(`<div style="${C(16)}"><div style="${R(0, 'justify-content:space-between;')}">${pt('Gross sales')}${tabsS(['30 days', '90 days'], '30 days')}</div>${line(700, 230, [3.1, 4.2, 3.8, 5.6, 5.1, 6.4, 7.9, 6.8, 8.6, 9.4], ['Wk 1', '', 'Wk 2', '', 'Wk 3', '', 'Wk 4', '', 'Wk 5', 'Now'])}</div>`, { pad: 'lg' });
  const queue = (ic, t, n, s) => `<div style="${R(12, `padding:14px 0;border-bottom:1px solid ${T.ink100};`)}">${medal(ic)}<div style="${C(0, 'flex:1;')}"><span style="font-size:14px;font-weight:600;color:${T.ink950};">${t}</span><span style="font-size:13px;color:${T.ink500};">${s}</span></div><span style="min-width:28px;height:28px;padding:0 8px;display:grid;place-items:center;background:${T.lemon400};color:${T.ink950};border-radius:999px;font-size:13px;font-weight:700;">${n}</span></div>`;
  const q = card(`<div style="${C(0)}">${pt('Work queue')}${queue('users', 'Seller KYC to review', 14, 'Oldest waiting 3 days')}${queue('shield-check', 'Device inspections', 9, '2 are high value')}${queue('rotate-ccw', 'Refund requests', 4, '₦412,000 held')}${queue('gavel', 'Open disputes', 3, '1 marked urgent')}</div>`, { pad: 'lg' });
  const top = table(['Seller', 'Orders', 'Sales', 'Rating', 'Status'], [
    [seller(SELLERS.techhub), '88', '₦4.1M', '★ 4.8', st('Verified', 'verified')],
    [seller(SELLERS.gadgetworld), '64', '₦3.2M', '★ 4.9', st('Verified', 'verified')],
    [seller(SELLERS.direct, 'BuySellSwap own stock'), '52', '₦2.9M', '★ 4.9', st('Own inventory', 'brand')],
    [seller(SELLERS.mobilepoint), '41', '₦1.8M', '★ 4.6', st('Verified', 'verified')],
  ], { tpl: '2fr 90px 110px 90px 140px' });
  return A({ H, active: 'Overview', title: 'Overview', sub: 'Kaduna market · Saturday 19 September 2026', actions: filt(), search: 'Search anything', body: `${tiles}<div style="display:grid;grid-template-columns:1.6fr 1fr;gap:20px;align-items:start;">${chart}${q}</div><div style="${C(12)}">${pt('Top sellers')}${top}</div>` });
}, 1100);

/* 2. Sellers */
add('WaSellers', 'Sellers', 'Marketplace', (H) => {
  const rows = [
    [seller(SELLERS.techhub), '42', '★ 4.8', st('Verified', 'verified'), mono('Tier 2 · 8%'), 'Mar 2023', dots],
    [seller(SELLERS.mobilepoint), '27', '★ 4.6', st('Verified', 'verified'), mono('Tier 1 · 10%'), 'Jan 2024', dots],
    [seller(SELLERS.gadgetworld), '61', '★ 4.9', st('Verified', 'verified'), mono('Tier 3 · 6%'), 'Aug 2023', dots],
    [seller({ name: 'Aisha Lawal', loc: 'Rigasa', verified: false }), '0', '—', st('KYC pending', 'pending'), mono('Tier 1 · 10%'), '17 Sep', link('Review')],
    [seller({ name: 'Nasir Abdullahi', loc: 'Tudun Wada', verified: false }), '9', '★ 3.9', st('Suspended', 'danger'), mono('Tier 1 · 10%'), 'Jun 2025', dots],
  ];
  return A({ H, active: 'Sellers', title: 'Sellers', sub: '86 active · 14 awaiting KYC', actions: btn('Invite seller', { ic: 'plus' }), search: 'Search sellers', body: `${tabsU([{ l: 'All', c: 100 }, { l: 'Pending KYC', c: 14 }, { l: 'Active', c: 86 }, { l: 'Suspended', c: 2 }], 'All')}${table(['Seller', 'Listings', 'Rating', 'Status', 'Commission', 'Joined', ''], rows, { tpl: '2.2fr 90px 90px 140px 130px 100px 70px' })}` });
});

/* 3. Seller KYC review */
add('WaSellerReview', 'Seller KYC review', 'Marketplace', (H) => {
  const doc = (t, ic) => `<div style="${C(8)}"><div style="height:170px;border-radius:14px;background:${T.ink100};display:grid;place-items:center;">${icon(ic, 40, T.ink400, 1.5)}</div><span style="font-size:13px;font-weight:600;color:${T.ink800};">${t}</span></div>`;
  const left = `<div style="${C(20)}">${card(`<div style="${C(16)}">${pt('Applicant')}<div style="${R(14)}">${avatar('Aisha Lawal', { size: 'lg' })}<div style="${C(0)}"><span style="font-size:18px;font-weight:700;color:${T.ink950};">Aisha Lawal</span><span style="font-size:14px;color:${T.ink500};">Aisha Phones, Rigasa, Kaduna · applied 17 Sep</span></div></div><div style="${G(3, 16)}">${[['Phone', '0805 555 0119'], ['NIN', '2234 •••• 901'], ['Bank', 'Zenith ••7730']].map(([k, v]) => `<div style="${C(2)}"><span style="font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:${T.ink500};font-weight:600;">${k}</span><span style="font-size:15px;font-weight:600;color:${T.ink950};">${v}</span></div>`).join('')}</div></div>`, { pad: 'lg' })}${card(`<div style="${C(16)}">${pt('Documents')}<div style="${G(2, 16)}">${doc('National ID photo', 'id-card')}${doc('Selfie', 'user')}</div><div style="${R(12)}">${badge('Face match 96%', { tone: 'verified', ic: 'circle-check' })}${badge('NIN matches name', { tone: 'verified', ic: 'circle-check' })}${badge('Bank name matches', { tone: 'pending', ic: 'triangle-alert' })}</div></div>`, { pad: 'lg' })}</div>`;
  const right = `<div style="${C(20)}">${card(`<div style="${C(14)}">${pt('Checklist')}${check('Identity matches NIN', { on: true })}${check('Selfie matches ID photo', { on: true })}${check('Bank account name matches', {})}${check('Shop address is in Kaduna', { on: true })}</div>`, { pad: 'lg' })}${card(`<div style="${C(14)}">${pt('Decision')}${area('Note to seller (optional)', { ph: 'Explain what needs fixing…', hh: 90 })}${btn('Approve seller', { s: 'lg', full: true, ic: 'check' })}${btn('Request changes', { v: 'secondary', s: 'lg', full: true })}${btn('Reject application', { v: 'danger', s: 'lg', full: true })}</div>`, { pad: 'lg' })}${card(`<div style="${C(10)}">${pt('Audit trail')}<span style="font-size:13px;color:${T.ink500};">17 Sep, 4:10 pm · Application submitted</span><span style="font-size:13px;color:${T.ink500};">17 Sep, 4:12 pm · Identity check ran</span><span style="font-size:13px;color:${T.ink500};">19 Sep, 9:01 am · Opened by Amina Bello</span></div>`, { pad: 'lg' })}</div>`;
  return A({ H, active: 'Sellers', title: 'Review application', sub: 'Aisha Lawal · Tier 1 by default', actions: st('KYC pending', 'pending'), search: 'Search sellers', body: `<div style="display:grid;grid-template-columns:1.4fr 1fr;gap:20px;align-items:start;">${left}${right}</div>` });
}, 1200);

/* 4. Listings */
add('WaListings', 'Listings', 'Marketplace', (H) => {
  const rows = [
    [prod(L.l1), cond('uk-used', 'sm'), `<b>${N(415000)}</b>`, st('Live', 'verified'), badge('Grade A', { tone: 'verified', s: 'sm', ic: 'shield-check' }), dots],
    [prod(L.l3), cond('uk-used', 'sm'), `<b>${N(1150000)}</b>`, st('Pending review', 'pending'), st('Inspecting', 'pending'), link('Open')],
    [prod(L.l6), cond('for-parts', 'sm'), `<b>${N(185000)}</b>`, st('Flagged', 'danger'), st('Not started', 'neutral'), link('Open')],
    [prod(L.l2), cond('brand-new', 'sm'), `<b>${N(289000)}</b>`, st('Live', 'verified'), st('Not required', 'neutral'), dots],
    [prod(L.l5), cond('uk-used', 'sm'), `<b>${N(520000)}</b>`, st('Live', 'verified'), badge('Grade A', { tone: 'verified', s: 'sm', ic: 'shield-check' }), dots],
  ];
  const flag = card(`<div style="${R(14)}">${medal('siren', T.red100, T.red500, 40)}<div style="${C(2, 'flex:1;')}"><span style="font-size:14px;font-weight:600;color:${T.ink950};">1 listing was flagged</span><span style="font-size:13px;color:${T.ink600};">Dell XPS 13 Plus: price far below similar listings and no IMEI or serial supplied.</span></div>${btn('Review', { s: 'sm' })}</div>`, { pad: 'md', style: `background:${T.red100};border-color:transparent;` });
  return A({ H, active: 'Listings', title: 'Listings', sub: '412 listings · 9 need review', actions: btn('Export', { v: 'secondary', ic: 'download' }), search: 'Search listings', body: `${flag}${tabsU([{ l: 'All', c: 412 }, { l: 'Live', c: 388 }, { l: 'Pending review', c: 9 }, { l: 'Flagged', c: 1 }, { l: 'Removed', c: 14 }], 'All')}${table(['Listing', 'Condition', 'Price', 'Status', 'Verification', ''], rows, { tpl: '2.6fr 120px 130px 140px 150px 70px' })}` });
});

/* 5. Catalogue */
add('WaCatalogue', 'Product catalogue', 'Marketplace', (H) => {
  const cats = card(`<div style="${C(4)}">${['Phones', 'Laptops', 'Consoles', 'Audio', 'Tablets', 'Accessories'].map((t, i) => `<div style="${R(10, `height:42px;padding:0 14px;border-radius:999px;font-size:14px;font-weight:${i === 0 ? 600 : 500};background:${i === 0 ? T.blue50 : 'transparent'};color:${i === 0 ? T.blue600 : T.ink800};`)}"><span style="flex:1;">${t}</span><span style="font-size:12px;color:${T.ink500};">${[42, 26, 8, 15, 11, 30][i]}</span></div>`).join('')}</div>`, { pad: 'sm' });
  const rows = [
    [`<div style="${R(12)}">${medal('smartphone', T.ink100, T.blue600, 40)}<div style="${C(0)}"><span style="font-weight:600;color:${T.ink950};">iPhone 13 Pro</span><span style="font-size:13px;color:${T.ink500};">Apple</span></div></div>`, '4 storage · 4 colours', '18', st('Active', 'verified'), dots],
    [`<div style="${R(12)}">${medal('smartphone', T.ink100, T.blue600, 40)}<div style="${C(0)}"><span style="font-weight:600;color:${T.ink950};">Galaxy S24</span><span style="font-size:13px;color:${T.ink500};">Samsung</span></div></div>`, '2 storage · 4 colours', '11', st('Active', 'verified'), dots],
    [`<div style="${R(12)}">${medal('smartphone', T.ink100, T.blue600, 40)}<div style="${C(0)}"><span style="font-weight:600;color:${T.ink950};">Redmi Note 13 Pro+</span><span style="font-size:13px;color:${T.ink500};">Xiaomi</span></div></div>`, '3 storage · 3 colours', '7', st('Active', 'verified'), dots],
    [`<div style="${R(12)}">${medal('smartphone', T.ink100, T.blue600, 40)}<div style="${C(0)}"><span style="font-weight:600;color:${T.ink950};">Infinix Note 30 Pro</span><span style="font-size:13px;color:${T.ink500};">Infinix</span></div></div>`, '2 storage · 2 colours', '0', st('Requested by seller', 'pending'), link('Approve')],
  ];
  const dup = card(`<div style="${R(14)}">${medal('copy', T.amber100, T.penFg, 40)}<div style="${C(2, 'flex:1;')}"><span style="font-size:14px;font-weight:600;color:${T.ink950};">Possible duplicate models</span><span style="font-size:13px;color:${T.ink600};">“iPhone 13 Pro Max” and “iPhone 13 ProMax” look the same. Merge them to keep search clean.</span></div>${btn('Merge', { v: 'secondary', s: 'sm' })}</div>`, { pad: 'md', tone: 'sunken' });
  return A({ H, active: 'Catalogue', title: 'Product catalogue', sub: 'Standard models sellers list against', actions: btn('Add model', { ic: 'plus' }), search: 'Search models', body: `${dup}<div style="display:grid;grid-template-columns:240px 1fr;gap:20px;align-items:start;">${cats}${table(['Model', 'Variants', 'Live listings', 'Status', ''], rows, { tpl: '2fr 1.4fr 110px 170px 80px' })}</div>` });
});

/* 6. Verification queue */
add('WaVerification', 'Verification queue', 'Trust', (H) => {
  const rows = [
    [prod(L.l3, 'BuySellSwap Direct'), 'Used · high value', '18 Sep', 'Amina Bello', st('In inspection', 'pending'), link('Open')],
    [prod(L.l8, 'TechHub Kaduna'), 'Used', '18 Sep', 'Unassigned', st('Waiting', 'neutral'), link('Assign')],
    [prod(L.l4, 'GadgetWorld Kd'), 'Used', '17 Sep', 'Yusuf Danladi', st('In inspection', 'pending'), link('Open')],
    [prod(L.l9, 'GadgetWorld Kd'), 'Used', '17 Sep', 'Unassigned', st('Needs photos', 'danger'), link('Open')],
    [prod(L.l7, 'Mobile Point NG'), 'Used', '16 Sep', 'Yusuf Danladi', st('Ready to approve', 'verified'), link('Approve')],
  ];
  return A({ H, active: 'Verification', title: 'Verification queue', sub: '9 devices waiting · 2 high value', actions: btn('Assign inspector', { v: 'secondary', ic: 'users' }), search: 'Search device or IMEI', body: `<div style="${G(3, 16)}">${kpi('Waiting', '9', { ic: 'clock', delta: 'Oldest 3 days', tone: 'pending' })}${kpi('Verified this week', '31', { ic: 'shield-check', delta: '▲ 6' })}${kpi('Rejected this week', '3', { ic: 'triangle-alert', delta: '2 blacklisted IMEIs', tone: 'danger' })}</div>${tabsU([{ l: 'Queue', c: 9 }, { l: 'Verified' }, { l: 'Rejected' }], 'Queue')}${table(['Device', 'Type', 'Submitted', 'Inspector', 'Status', ''], rows, { tpl: '2.4fr 150px 100px 150px 160px 80px' })}` });
});

/* 7. Device inspection */
add('WaInspection', 'Device inspection', 'Trust', (H) => {
  const left = `<div style="${C(20)}">${card(`<div style="${C(14)}">${pt('Seller photos')}<div style="${G(4, 12)}">${['laptop-minimal-white.jpg', 'laptop-white-room.jpg', 'laptop-screen-dark.jpg', 'laptops-two-people.jpg'].map((f) => `<div style="height:130px;border-radius:14px;overflow:hidden;">${im(f, 'width:100%;height:100%;object-fit:cover;')}</div>`).join('')}</div></div>`, { pad: 'lg' })}${card(`<div style="${C(14)}">${pt('IMEI and serial check')}<div style="${R(12)}">${medal('scan-line', T.green100, T.green500, 40)}<div style="${C(0, 'flex:1;')}"><span style="font-size:15px;font-weight:600;color:${T.ink950};">Serial FVFH1234Q6L4 · not blacklisted</span><span style="font-size:13px;color:${T.ink500};">Checked 19 Sep, 9:30 am · matches the model MacBook Air M2</span></div>${badge('Clean', { tone: 'verified', ic: 'circle-check' })}</div></div>`, { pad: 'lg' })}${card(`<div style="${C(14)}">${pt('Condition checklist')}<div style="${G(2, 14)}">${['Screen has no cracks or dead pixels', 'Body has no dents or bends', 'Battery health above 80%', 'All ports and keys work', 'No water damage indicators', 'Original charger present'].map((t, i) => check(t, { on: i !== 5 })).join('')}</div></div>`, { pad: 'lg' })}</div>`;
  const right = `<div style="${C(20)}">${card(`<div style="${C(12)}">${prod(L.l3, 'BuySellSwap Direct')}${ln('Price', N(1150000))}${ln('Seller type', 'BuySellSwap own stock')}${ln('Submitted', '18 Sep')}</div>`, { pad: 'lg' })}${card(`<div style="${C(14)}">${pt('Grade')}${radio('Grade A', { on: true, desc: 'Like new, minimal signs of use' })}${radio('Grade B', { desc: 'Light wear, fully working' })}${radio('Grade C', { desc: 'Visible wear, fully working' })}${area('Inspector note', { value: 'Cycle count 142. Clean body, one tiny scuff on lid.', hh: 80 })}</div>`, { pad: 'lg' })}<div style="${C(10)}">${btn('Approve as Grade A', { s: 'lg', full: true, ic: 'shield-check' })}${btn('Ask for new photos', { v: 'secondary', s: 'lg', full: true })}${btn('Reject listing', { v: 'danger', s: 'lg', full: true })}</div></div>`;
  return A({ H, active: 'Verification', title: 'Inspect MacBook Air M2', sub: 'High-value used device · assigned to Amina Bello', actions: st('In inspection', 'pending'), search: 'Search', body: `<div style="display:grid;grid-template-columns:1.5fr 1fr;gap:20px;align-items:start;">${left}${right}</div>` });
}, 1200);

/* 8. Orders */
add('WaOrders', 'Orders', 'Money', (H) => {
  const rows = [
    [mono('#BSS-10436'), cellMain('Musa Ibrahim', 'Unguwan Rimi'), seller(SELLERS.techhub, 'iPhone 13 Pro'), `<b>${N(416500)}</b>`, st('Held', 'verified'), st('New', 'brand'), dots],
    [mono('#BSS-10432'), cellMain('Musa Ibrahim', 'Unguwan Rimi'), 'TechHub + Mobile Point', `<b>${N(662500)}</b>`, st('Held', 'verified'), st('Out for delivery', 'brand'), dots],
    [mono('#BSS-10424'), cellMain('Zainab Aliyu', 'Kawo'), seller(SELLERS.mobilepoint, 'iPhone 11'), `<b>${N(236500)}</b>`, st('Awaiting confirm', 'pending'), st('Delivered', 'verified'), dots],
    [mono('#BSS-10418'), cellMain('Hauwa Bello', 'Barnawa'), seller(SELLERS.direct, 'MacBook Air M2'), `<b>${N(1151500)}</b>`, st('Refund review', 'danger'), st('Delivered', 'verified'), dots],
    [mono('#BSS-10377'), cellMain('Ibrahim Sani', 'Malali'), seller(SELLERS.gadgetworld, 'MacBook Air 2020'), `<b>${N(546500)}</b>`, st('Released', 'neutral'), st('Completed', 'verified'), dots],
  ];
  return A({ H, active: 'Orders', title: 'Orders', sub: '412 orders in the last 30 days', actions: btn('Export', { v: 'secondary', ic: 'download' }), search: 'Search order or buyer', body: `${filt()}${tabsU([{ l: 'All', c: 412 }, { l: 'Awaiting seller', c: 11 }, { l: 'In delivery', c: 17 }, { l: 'Delivered', c: 24 }, { l: 'Problems', c: 5 }], 'All')}${table(['Order', 'Buyer', 'Seller', 'Total', 'Payment', 'Status', ''], rows, { tpl: '110px 1.2fr 1.6fr 120px 140px 140px 60px' })}` });
});

/* 9. Payments */
add('WaPayments', 'Payments', 'Money', (H) => {
  const rows = [
    [mono('PSK_8f21a9'), mono('#BSS-10436'), 'Bank transfer', N(416500), N(1500), st('Success', 'verified'), '9:04'],
    [mono('PSK_7c03bd'), mono('#BSS-10432'), 'Bank transfer', N(662500), N(2000), st('Success', 'verified'), '8:44'],
    [mono('PSK_6a77e0'), mono('#BSS-10435'), 'Card', N(691500), N(2000), st('Success', 'verified'), '8:12'],
    [mono('PSK_5d19c4'), mono('#BSS-10437'), 'USSD', N(289000), N(1500), st('Pending', 'pending'), '8:01'],
    [mono('PSK_4b82f1'), mono('#BSS-10433'), 'Card', N(520000), N(1500), st('Failed', 'danger'), 'Yesterday'],
  ];
  const health = card(`<div style="${R(14)}">${medal('circle-check', T.green100, T.green500, 40)}<div style="${C(2, 'flex:1;')}"><span style="font-size:14px;font-weight:600;color:${T.ink950};">Paystack webhooks healthy</span><span style="font-size:13px;color:${T.ink500};">Last event 2 minutes ago · 0 failed in 24 hours</span></div>${badge('Live', { tone: 'verified', s: 'sm' })}</div>`, { pad: 'md' });
  return A({ H, active: 'Payments', title: 'Payments', sub: 'Every transaction through the gateway', actions: btn('Export', { v: 'secondary', ic: 'download' }), search: 'Search reference or order', body: `<div style="${G(4, 16)}">${kpi('Held in escrow', N(4120000), { ic: 'lock' })}${kpi('Released today', N(1310000), { ic: 'landmark' })}${kpi('Refunded (30 days)', N(742000), { ic: 'rotate-ccw', delta: '4 pending', tone: 'pending' })}${kpi('Gateway fees (30 days)', N(276500), { ic: 'percent' })}</div>${health}${table(['Reference', 'Order', 'Method', 'Amount', 'Gateway fee', 'Status', 'Time'], rows, { tpl: '140px 120px 140px 130px 120px 130px 1fr' })}` });
});

/* 10. Commissions and settlements */
add('WaSettlements', 'Commissions and settlements', 'Money', (H) => {
  const rules = card(`<div style="${C(14)}">${pt('Commission by seller tier')}${[['Tier 1 · New sellers', '10%', '54 sellers'], ['Tier 2 · Trusted', '8%', '22 sellers'], ['Tier 3 · Top rated', '6%', '10 sellers']].map(([k, v, s]) => `<div style="${R(12, `padding:12px 0;border-bottom:1px solid ${T.ink100};`)}"><div style="${C(0, 'flex:1;')}"><span style="font-size:14px;font-weight:600;color:${T.ink950};">${k}</span><span style="font-size:13px;color:${T.ink500};">${s}</span></div><span style="font-size:20px;font-weight:800;letter-spacing:-0.03em;">${v}</span></div>`).join('')}${btn('Edit rates', { v: 'secondary', full: true })}</div>`, { pad: 'lg' });
  const rows = [
    [cellMain('BATCH-0918', '31 sellers'), `<b>${N(14820000)}</b>`, N(1186000), st('Paid', 'verified'), 'Fri 18 Sep', link('View')],
    [cellMain('BATCH-0925', '34 sellers'), `<b>${N(16410000)}</b>`, N(1312000), st('Ready to approve', 'pending'), 'Fri 25 Sep', btn('Review', { s: 'sm', style: 'padding:0 12px;' })],
    [cellMain('BATCH-0911', '29 sellers'), `<b>${N(13260000)}</b>`, N(1061000), st('Paid', 'verified'), 'Fri 11 Sep', link('View')],
  ];
  return A({ H, active: 'Settlements', title: 'Commissions and settlements', sub: 'Weekly seller payouts', actions: btn('Create payout batch', { ic: 'plus' }), search: 'Search batches', body: `<div style="${G(3, 16)}">${kpi('Commission earned (30 days)', N(4620000), { ic: 'percent', delta: '▲ 11%' })}${kpi('Next batch', 'Fri 25 Sep', { ic: 'calendar', delta: '34 sellers', tone: 'neutral' })}${kpi('Pending seller payouts', N(16410000), { ic: 'wallet' })}</div><div style="display:grid;grid-template-columns:minmax(0,1fr) 300px;gap:20px;align-items:start;"><div style="${C(12)}">${pt('Payout batches')}${table(['Batch', 'Payout total', 'Commission', 'Status', 'Date', ''], rows, { tpl: '120px 120px 110px 150px 90px 80px' })}</div>${rules}</div>` });
});

/* 11. Returns and refunds */
add('WaReturns', 'Returns and refunds', 'Money', (H) => {
  const rows = [
    [mono('RET-0142'), prod(L.l3, 'Order #BSS-10418'), 'Not as described', 'Refund', `<b>${N(1150000)}</b>`, st('Seller responded', 'pending'), link('Review')],
    [mono('RET-0141'), prod(L.l7, 'Order #BSS-10390'), 'Delivered late', 'Refund', `<b>${N(235000)}</b>`, st('Approved', 'verified'), link('Refund')],
    [mono('RET-0139'), prod(L.l2, 'Order #BSS-10377'), 'Does not work', 'Replacement', `<b>${N(289000)}</b>`, st('Awaiting seller', 'pending'), link('Review')],
    [mono('RET-0136'), prod(L.l9, 'Order #BSS-10360'), 'Changed mind', 'Refund', `<b>${N(545000)}</b>`, st('Rejected', 'danger'), dots],
  ];
  return A({ H, active: 'Returns and refunds', title: 'Returns and refunds', sub: '4 waiting on you · ₦1.7M held', actions: btn('Refund policy', { v: 'secondary', ic: 'file-text' }), search: 'Search return or order', body: `${tabsU([{ l: 'Open', c: 4 }, { l: 'Approved', c: 9 }, { l: 'Refunded', c: 31 }, { l: 'Rejected', c: 6 }], 'Open')}${table(['Return', 'Item', 'Reason', 'Wants', 'Amount', 'Status', ''], rows, { tpl: '110px 2.2fr 150px 120px 130px 170px 80px' })}` });
});

/* 12. Disputes */
add('WaDisputes', 'Disputes', 'Money', (H) => {
  const item = (id, t, s, tone, on) => `<div style="${C(6, `padding:16px;border-radius:14px;background:${on ? T.blue50 : '#fff'};border:${on ? `1.5px solid ${T.blue600}` : `1px solid ${T.ink200}`};`)}"><div style="${R(0, 'justify-content:space-between;')}"><span style="font-size:14px;font-weight:700;color:${T.ink950};">${id}</span>${st(s, tone)}</div><span style="font-size:13px;color:${T.ink600};">${t}</span></div>`;
  const list = `<div style="${C(10)}">${item('#10418 · MacBook Air M2', 'Hauwa Bello vs BuySellSwap Direct', 'Urgent', 'danger', true)}${item('#10390 · iPhone 11', 'Tunde A. vs Mobile Point NG', 'Reviewing', 'pending', false)}${item('#10377 · Galaxy Buds', 'Ngozi E. vs GadgetWorld Kd', 'Reviewing', 'pending', false)}</div>`;
  const msg = (n, r, t, when) => `<div style="${C(6, `padding:16px;border-radius:14px;background:${T.ink50};`)}"><div style="${R(10)}">${avatar(n, { size: 'sm' })}<div style="${C(0, 'flex:1;')}"><span style="font-size:14px;font-weight:600;color:${T.ink950};">${n}</span><span style="font-size:12px;color:${T.ink500};">${r} · ${when}</span></div></div><p style="font-size:14px;color:${T.ink800};">${t}</p></div>`;
  const detail = card(`<div style="${C(20)}"><div style="${R(12, 'justify-content:space-between;')}"><div style="${C(2)}"><h2 style="font-size:22px;">#10418 · MacBook Air M2</h2><span style="font-size:14px;color:${T.ink500};">Opened 1 day ago · Not as described</span></div>${st('Urgent', 'danger')}</div>${msg('Hauwa Bello', 'Buyer', 'The listing said 142 battery cycles. The laptop shows 410, and the charger is not original.', 'Yesterday')}${msg('BuySellSwap Direct', 'Seller', 'We will check the inspection report. The report recorded 142 cycles on 18 Sep.', 'Today, 8:10')}<div style="${G(3, 12)}">${['laptop-minimal-white.jpg', 'laptop-white-room.jpg'].map((f) => `<div style="height:110px;border-radius:14px;overflow:hidden;">${im(f, 'width:100%;height:100%;object-fit:cover;')}</div>`).join('')}<div style="height:110px;border-radius:14px;background:${T.ink100};display:grid;place-items:center;font-size:13px;color:${T.ink500};">Inspection report</div></div><div style="height:1px;background:${T.ink100};"></div>${ln('Payment held', N(1151500), true)}<div style="${R(10)}">${btn('Refund buyer', { s: 'md' })}${btn('Release to seller', { v: 'secondary' })}${btn('Partial refund', { v: 'ghost' })}</div></div>`, { pad: 'lg' });
  return A({ H, active: 'Disputes', title: 'Disputes', sub: '3 open · 1 urgent', actions: '', search: 'Search case or order', body: `<div style="display:grid;grid-template-columns:340px 1fr;gap:20px;align-items:start;">${list}${detail}</div>` });
}, 1100);

/* 13. Customers */
add('WaCustomers', 'Customers', 'Operations', (H) => {
  const cu = (n, ph) => `<div style="${R(12)}">${avatar(n, { size: 'sm' })}<div style="${C(0)}"><span style="font-weight:600;color:${T.ink950};">${n}</span><span style="font-size:13px;color:${T.ink500};">${ph}</span></div></div>`;
  const rows = [
    [cu('Musa Ibrahim', '0803 555 0142'), 'Unguwan Rimi', '4', `<b>${N(1378500)}</b>`, '19 Sep', st('Active', 'verified'), dots],
    [cu('Hauwa Bello', '0806 555 0128'), 'Barnawa', '3', `<b>${N(1842000)}</b>`, '15 Sep', st('Active', 'verified'), dots],
    [cu('Zainab Aliyu', '0809 555 0166'), 'Kawo', '2', `<b>${N(471000)}</b>`, '14 Sep', st('Active', 'verified'), dots],
    [cu('Tunde Adeyemi', '0701 555 0134'), 'Malali', '1', `<b>${N(235000)}</b>`, '3 Sep', st('Flagged: 2 refunds', 'pending'), link('Review')],
  ];
  return A({ H, active: 'Customers', title: 'Customers', sub: '1,284 registered · 412 bought in 30 days', actions: btn('Export', { v: 'secondary', ic: 'download' }), search: 'Search name or phone', body: `${tabsU([{ l: 'All', c: 1284 }, { l: 'Bought in 30 days', c: 412 }, { l: 'Flagged', c: 6 }], 'All')}${table(['Customer', 'Area', 'Orders', 'Spend', 'Last order', 'Status', ''], rows, { tpl: '2fr 130px 90px 140px 110px 170px 70px' })}` });
});

/* 14. BSS inventory */
add('WaInventory', 'BuySellSwap inventory', 'Operations', (H) => {
  const rows = [
    [mono('BSS-MBA-M2-01'), prod(L.l3, 'MacBook Air M2 16GB/512GB'), cond('uk-used', 'sm'), N(980000), `<b>${N(1150000)}</b>`, '3', 'Malali store', st('Live', 'verified')],
    [mono('BSS-IP13P-07'), prod(L.l1, 'iPhone 13 Pro 256GB'), cond('uk-used', 'sm'), N(340000), `<b>${N(415000)}</b>`, '5', 'Malali store', st('Live', 'verified')],
    [mono('BSS-RN13-12'), prod(L.l2, 'Redmi Note 13 Pro+'), cond('brand-new', 'sm'), N(245000), `<b>${N(289000)}</b>`, '12', 'Warehouse', st('Live', 'verified')],
    [mono('BSS-S24-03'), prod(L.l5, 'Galaxy S24 128GB'), cond('uk-used', 'sm'), N(430000), `<b>${N(520000)}</b>`, '0', 'Malali store', st('Out of stock', 'neutral')],
  ];
  return A({ H, active: 'BSS inventory', title: 'BuySellSwap inventory', sub: 'Stock BuySellSwap owns and sells directly', actions: btn('Add stock', { ic: 'plus' }), search: 'Search SKU or product', body: `<div style="${G(4, 16)}">${kpi('Units in stock', '20', { ic: 'boxes' })}${kpi('Stock value (cost)', N(19240000), { ic: 'wallet' })}${kpi('Sold (30 days)', '52', { ic: 'trending-up', delta: '▲ 14%' })}${kpi('Low stock SKUs', '3', { ic: 'triangle-alert', delta: 'Reorder soon', tone: 'pending' })}</div>${table(['SKU', 'Product', 'Condition', 'Cost', 'Sell price', 'Stock', 'Location', 'Status'], rows, { tpl: '150px 2.2fr 110px 120px 130px 70px 120px 120px' })}` });
});

/* 15. Logistics */
add('WaLogistics', 'Logistics', 'Operations', (H) => {
  const job = (id, a, b, who) => `<div style="${C(8, `padding:14px;border-radius:14px;background:#fff;border:1px solid ${T.ink200};`)}"><div style="${R(8, 'justify-content:space-between;')}"><span style="font-size:13px;font-weight:700;color:${T.ink950};">${id}</span>${who ? avatar(who, { size: 'xs' }) : `<span style="font-size:12px;font-weight:600;color:${T.blue600};">Assign</span>`}</div><div style="${R(8, `font-size:13px;color:${T.ink600};`)}">${icon('map-pin', 14, T.ink400)}${a} → ${b}</div></div>`;
  const col = (t, n, jobs) => `<div style="${C(12, `padding:16px;border-radius:20px;background:${T.ink100};`)}"><div style="${R(8)}"><span style="font-size:13px;font-weight:700;color:${T.ink950};flex:1;">${t}</span><span style="font-size:12px;font-weight:700;color:${T.ink600};">${n}</span></div>${jobs}</div>`;
  const board = `<div style="${G(4, 16)}">${col('To assign', 3, job('#BSS-10437', 'Barnawa', 'Kawo') + job('#BSS-10436', 'Barnawa', 'Unguwan Rimi') + job('#BSS-10435', 'Kawo', 'Barnawa'))}${col('Assigned', 2, job('#BSS-10431', 'Malali', 'Rigasa', 'Musa Bello') + job('#BSS-10429', 'Kakuri', 'Narayi', 'Sani Yakubu'))}${col('In transit', 2, job('#BSS-10432', 'Barnawa', 'Unguwan Rimi', 'Musa Bello') + job('#BSS-10428', 'Kawo', 'Kawo', 'Sani Yakubu'))}${col('Delivered · Failed', 3, job('#BSS-10424', 'Kawo', 'Kawo', 'Musa Bello') + `<div style="${C(8, `padding:14px;border-radius:14px;background:${T.red100};`)}"><span style="font-size:13px;font-weight:700;color:${T.danFg};">#BSS-10419 · Failed</span><span style="font-size:13px;color:${T.danFg};">Buyer unreachable · rebook</span></div>`)}</div>`;
  const riders = card(`<div style="${C(12)}">${pt('Riders')}${[['Musa Bello', 'On a delivery'], ['Sani Yakubu', 'On a delivery'], ['Yusuf Danladi', 'Available']].map(([n, s]) => `<div style="${R(12)}">${avatar(n, { size: 'sm' })}<span style="flex:1;font-size:14px;font-weight:600;color:${T.ink950};">${n}</span>${st(s, s === 'Available' ? 'verified' : 'brand')}</div>`).join('')}</div>`, { pad: 'lg' });
  const zones = table(['Zone', 'Areas', 'Fee', 'ETA', 'Status'], [
    ['<b>Kaduna North</b>', 'Unguwan Rimi, Kawo, Malali', N(1500), 'Same day', st('Active', 'verified')],
    ['<b>Kaduna South</b>', 'Barnawa, Sabon Tasha, Kakuri', N(1500), 'Same day', st('Active', 'verified')],
    ['<b>Outer Kaduna</b>', 'Rigasa, Narayi, Tudun Wada', N(2500), 'Next day', st('Active', 'verified')],
    ['<b>Abuja</b>', 'Not yet open', '—', '—', st('Coming soon', 'neutral')],
  ], { tpl: '1fr 2fr 100px 110px 130px' });
  return A({ H, active: 'Logistics', title: 'Logistics', sub: 'Dispatch board and delivery zones', actions: btn('New delivery job', { ic: 'plus' }), search: 'Search order or rider', body: `${board}<div style="display:grid;grid-template-columns:minmax(0,1fr) 340px;gap:20px;align-items:start;"><div style="${C(12)}">${pt('Delivery zones')}${zones}</div>${riders}</div>` });
}, 1100);

/* 16. Promotions */
add('WaPromotions', 'Promotions', 'Operations', (H) => {
  const rows = [
    [mono('WELCOME5'), '5% off first order', '18 used', '1 Sep to 30 Sep', st('Active', 'verified'), dots],
    [mono('FREEDELIVERY'), 'Free delivery over ' + N(200000), '41 used', '15 Sep to 22 Sep', st('Active', 'verified'), dots],
    [mono('MACSALE'), N(30000) + ' off MacBooks', '6 used', '20 Sep to 27 Sep', st('Scheduled', 'brand'), dots],
    [mono('RAMADAN20'), '20% off accessories', '212 used', 'Ended', st('Ended', 'neutral'), dots],
  ];
  const create = card(`<div style="${C(14)}">${pt('New promotion')}${field('Code', { value: 'MACSALE' })}${sel('Type', 'Fixed amount off')}${field('Amount', { value: '30,000', pre: '₦' })}${sel('Applies to', 'Laptops')}<div style="${G(2, 12)}">${field('Starts', { value: '20 Sep' })}${field('Ends', { value: '27 Sep' })}</div>${toggle('Funded by BuySellSwap', { on: true, desc: 'Sellers are paid in full' })}${btn('Schedule promotion', { full: true })}</div>`, { pad: 'lg' });
  return A({ H, active: 'Promotions', title: 'Promotions', sub: 'Codes and campaigns', actions: btn('Featured listings', { v: 'secondary', ic: 'star' }), search: 'Search codes', body: `<div style="display:grid;grid-template-columns:minmax(0,1fr) 340px;gap:20px;align-items:start;"><div style="${C(12)}">${pt('Campaigns')}${table(['Code', 'Discount', 'Usage', 'Dates', 'Status', ''], rows, { tpl: '130px minmax(0,1.6fr) 80px 130px 110px 30px' })}</div>${create}</div>` });
}, 1000);

/* 17. Reports */
add('WaReports', 'Reports and analytics', 'Insights', (H) => {
  const share = card(`<div style="${C(14)}">${pt('Sales by category')}${[['Phones', 58], ['Laptops', 27], ['Audio', 7], ['Consoles', 5], ['Accessories', 3]].map(([k, v]) => `<div style="${R(12)}"><span style="width:96px;font-size:14px;color:${T.ink800};">${k}</span><div style="flex:1;height:10px;border-radius:10px;background:${T.ink100};"><div style="width:${v}%;height:10px;border-radius:10px;background:${T.blue600};"></div></div><span style="width:38px;font-size:13px;color:${T.ink500};text-align:right;">${v}%</span></div>`).join('')}</div>`, { pad: 'lg' });
  const conv = card(`<div style="${C(14)}">${pt('Marketplace health')}${ln('Buyer to order conversion', '3.4%')}${ln('Average order value', N(447000))}${ln('Orders delivered on time', '94%')}${ln('Disputes per 100 orders', '1.2')}${ln('Repeat buyers', '38%')}</div>`, { pad: 'lg' });
  const rows = table(['Report', 'Range', 'Format', ''], [
    ['<b>Sales and commission</b>', 'Monthly', 'CSV · PDF', link('Download')],
    ['<b>Seller performance</b>', 'Weekly', 'CSV', link('Download')],
    ['<b>Payments and refunds</b>', 'Daily', 'CSV', link('Download')],
  ], { tpl: '2fr 1fr 1fr 110px' });
  return A({ H, active: 'Reports', title: 'Reports and analytics', sub: 'Kaduna market performance', actions: filt(), search: 'Search reports', body: `<div style="${G(4, 16)}">${kpi('Gross sales', '₦18.4M', { ic: 'trending-up', delta: '▲ 12%' })}${kpi('Orders', '412', { ic: 'receipt', delta: '▲ 8%' })}${kpi('New buyers', '186', { ic: 'users', delta: '▲ 21%' })}${kpi('New sellers', '17', { ic: 'store', delta: '▲ 4' })}</div><div style="display:grid;grid-template-columns:1.6fr 1fr;gap:20px;align-items:start;">${card(`<div style="${C(16)}">${pt('Orders per day')}${bars(700, 220, [11, 14, 9, 17, 15, 21, 13, 12, 18, 16, 20, 24], ['1', '3', '5', '7', '9', '11', '13', '15', '17', '19', '21', '23'], 11)}</div>`, { pad: 'lg' })}${share}</div><div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;align-items:start;">${conv}<div style="${C(12)}">${pt('Downloads')}${rows}</div></div>` });
}, 1100);
