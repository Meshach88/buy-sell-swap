import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { resetIds } from './lib.mjs';
import * as brand from './brand.mjs';
import * as st from './m-start.mjs';
import * as mc from './m-customer.mjs';
import * as ms from './m-seller.mjs';
import * as wc from './w-customer.mjs';
import * as ws from './w-seller.mjs';
import * as wa from './w-admin.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const mode = process.argv[2] || 'publish';
const heights = fs.existsSync(`${ROOT}/gen/heights.json`) ? JSON.parse(fs.readFileSync(`${ROOT}/gen/heights.json`, 'utf8')) : {};
const assets = fs.existsSync(`${ROOT}/gen/assets.json`) ? JSON.parse(fs.readFileSync(`${ROOT}/gen/assets.json`, 'utf8')) : {};

const PAGES = [
  { id: 'brand', name: 'Brand' }, { id: 'm-start', name: 'Mobile · Start' }, { id: 'm-customer', name: 'Mobile · Customer' }, { id: 'm-seller', name: 'Mobile · Seller' },
  { id: 'w-customer', name: 'Web · Customer' }, { id: 'w-seller', name: 'Web · Seller' }, { id: 'w-admin', name: 'Web · Admin' },
];
const START = new Set(['McSplash', 'McWelcome', 'McSignup', 'McSignupBuyer', 'McSignupSeller', 'McSignIn', 'McOtp']);
const pageOf = (f) => (START.has(f) ? 'm-start' : f.startsWith('Mc') ? 'm-customer' : f.startsWith('Ms') ? 'm-seller' : f.startsWith('Wc') ? 'w-customer' : f.startsWith('Ws') ? 'w-seller' : f.startsWith('Wa') ? 'w-admin' : 'brand');

const all = [...brand.screens, ...st.screens, ...mc.screens, ...ms.screens, ...wc.screens, ...ws.screens, ...wa.screens].map((s) => ({ ...s, page: pageOf(s.file) }));
all.splice(1, 0, { file: 'ScreenMap', title: 'Screen map', row: 'Brand', w: 1280, minH: 900, page: 'brand', fn: null });
all[1].fn = brand.screenMap(all.filter((s) => s.file !== 'ScreenMap'));

const LOCAL_FONTS = `<style>@font-face{font-family:'Sora';src:url(/fonts/sora-latin.woff2) format('woff2');font-weight:100 800;unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}@font-face{font-family:'Sora';src:url(/fonts/sora-latinext.woff2) format('woff2');font-weight:100 800;unicode-range:U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:'Lexend';src:url(/fonts/lexend-naira.woff2) format('woff2');font-weight:100 900;unicode-range:U+20A6}</style>`;
const toPreview = (html) => html
  .replace('<script src="./support.js"></script>', '')
  .replace(/<link rel="stylesheet" href="https:\/\/fonts\.googleapis[^>]*>\n?/g, '')
  .replace('<x-dc>', '').replace('</x-dc>', '').replace('<helmet>', '').replace('</helmet>', '')
  .replace('<head>', `<head>\n<base href="/img/">\n${LOCAL_FONTS}`);

const now = new Date().toISOString().replace(/\.\d+Z$/, 'Z');
const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const toPublish = (html, s) => {
  const dims = { width: s.w, height: s.H };
  let out = html
    .replace('<html>', '<html lang="en">')
    .replace('<meta charset="utf-8">', `<meta charset="utf-8">\n<title>${esc(s.title)}</title>`)
    .replace(`width:${s.w}px;min-height:${s.H}px;`, `width:${s.w}px;height:${s.H}px;`)
    .replace('</x-dc>', `</x-dc>\n<script type="text/x-dc" data-dc-script data-props='${JSON.stringify({ $preview: dims })}'>\nclass Component extends DCLogic {\n  renderVals() { return {}; }\n}\n</script>`)
    .replace(/src="([a-z0-9-]+\.jpg)"/g, (m, f) => (assets[f] ? `src="${assets[f]}"` : m));
  if (!out.includes(`height:${s.H}px;`)) throw new Error('root height not applied: ' + s.file);
  return out;
};

fs.mkdirSync(`${ROOT}/preview`, { recursive: true });
const manifest = [];
const pubDir = `${ROOT}/publish/project`;
if (mode === 'publish') { fs.rmSync(`${ROOT}/publish`, { recursive: true, force: true }); fs.mkdirSync(pubDir, { recursive: true }); }
for (const s of all) {
  s.H = mode === 'prep' ? 1 : Math.max(s.minH, Math.ceil(heights[s.file] || 0)) + (mode === 'publish' ? 8 : 0);
  resetIds();
  const html = s.fn(s.H);
  fs.writeFileSync(`${ROOT}/preview/${s.file}.html`, toPreview(html));
  manifest.push({ file: s.file, w: s.w });
  if (mode === 'publish') {
    fs.writeFileSync(`${pubDir}/${s.file}.dc.html`, toPublish(html, s));
    fs.writeFileSync(`${ROOT}/${s.file}.dc.html`, toPublish(html, s));
  }
}
fs.writeFileSync(`${ROOT}/gen/manifest.json`, JSON.stringify(manifest, null, 1));

if (mode === 'publish') {
  const cols = { brand: 2, 'm-start': 7, 'm-customer': 6, 'm-seller': 6, 'w-customer': 3, 'w-seller': 3, 'w-admin': 3 };
  const gx = { brand: 120, 'm-start': 90, 'm-customer': 90, 'm-seller': 90, 'w-customer': 110, 'w-seller': 110, 'w-admin': 110 };
  const boards = {}, order = [], notes = {};
  for (const pg of PAGES) {
    const list = all.filter((s) => s.page === pg.id);
    let y = 0, ni = 0;
    for (let i = 0; i < list.length; i += cols[pg.id]) {
      const rowItems = list.slice(i, i + cols[pg.id]);
      let x = 0, groupStart = null;
      const placed = [];
      for (const s of rowItems) { placed.push({ s, x }); x += s.w + gx[pg.id]; }
      let g = 0;
      while (g < placed.length) {
        let e = g; while (e + 1 < placed.length && placed[e + 1].s.row === placed[g].s.row) e++;
        const gw = placed[e].x + placed[e].s.w - placed[g].x;
        notes[`t-${pg.id}-${ni++}`] = { x: placed[g].x, y: y - 300, text: placed[g].s.row, kind: 'title1', maxW: gw, page: pg.id };
        g = e + 1;
      }
      for (const { s, x: bx } of placed) { boards[`${s.file}.dc.html`] = { x: bx, y, w: s.w, h: s.H, title: s.title, page: pg.id }; order.push(`${s.file}.dc.html`); }
      y += Math.max(...rowItems.map((s) => s.H)) + 420;
    }
  }
  const canvas = { v: 3, createdOnFiles: { v: 1, at: now }, title: 'BuySellSwap App Screens', launch: { view: 'canvas', page: 'brand' }, pages: PAGES, boards, order, notes, designSystems: [] };
  fs.writeFileSync(`${pubDir}/canvas.json`, JSON.stringify(canvas, null, 1));
  const files = Object.fromEntries(order.map((f) => [`project/${f}`, `project/${f}`]));
  fs.writeFileSync(`${ROOT}/gen/files-map.json`, JSON.stringify(files));
  console.log(`publish: ${all.length} artboards, ${Object.keys(notes).length} titles -> ${pubDir}`);
} else {
  console.log(`${mode}: wrote ${all.length} previews`);
}
