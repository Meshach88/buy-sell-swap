import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const manifest = JSON.parse(fs.readFileSync(`${ROOT}/gen/manifest.json`, 'utf8'));
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const TYPES = { '.html': 'text/html', '.jpg': 'image/jpeg', '.css': 'text/css', '.js': 'text/javascript' };

const page = `<!doctype html><html><head><meta charset="utf-8"><title>m</title></head><body><script>
const items = ${JSON.stringify(manifest)};
const res = {}; let idx = 0, active = 0;
function finish(){ document.body.setAttribute('data-results', JSON.stringify(res)); document.title = 'done'; }
function next(){
  if (idx >= items.length) { if (active === 0) finish(); return; }
  const it = items[idx++]; active++;
  const f = document.createElement('iframe');
  f.style.cssText = 'width:' + it.w + 'px;height:3000px;border:0;position:absolute;left:0;top:0;visibility:hidden';
  f.src = '/preview/' + it.file + '.html';
  f.onload = async () => {
    try {
      const doc = f.contentDocument; await doc.fonts.ready; await new Promise(r => setTimeout(r, 500));
      const root = doc.body.lastElementChild; const r = root.getBoundingClientRect();
      res[it.file] = { h: Math.ceil(r.height), sw: root.scrollWidth, w: it.w, sora: doc.fonts.check('16px Sora') };
    } catch (e) { res[it.file] = { err: String(e) }; }
    f.remove(); active--; next();
  };
  document.body.appendChild(f);
}
for (let i = 0; i < 6; i++) next();
</script></body></html>`;
fs.writeFileSync(`${ROOT}/measure.html`, page);

const server = http.createServer((req, res) => {
  const u = decodeURIComponent(req.url.split('?')[0]);
  const fp = path.join(ROOT, u);
  if (!fp.startsWith(ROOT) || !fs.existsSync(fp) || fs.statSync(fp).isDirectory()) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'Content-Type': TYPES[path.extname(fp)] || 'application/octet-stream' });
  fs.createReadStream(fp).pipe(res);
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const port = server.address().port;
let dom = '';
try {
  dom = execFileSync(CHROME, ['--headless=new', '--user-data-dir=' + ROOT + '/.chrome-profile', '--no-first-run', '--disable-gpu', '--hide-scrollbars', '--dump-dom', '--virtual-time-budget=60000', `http://127.0.0.1:${port}/measure.html`], { encoding: 'utf8', maxBuffer: 1 << 28, timeout: 170000 });
} catch (e) { dom = String(e.stdout || ''); console.error('chrome exit:', String(e.message).slice(0, 200)); }
server.close();
const m = dom.match(/data-results="([^"]*)"/);
if (!m) { console.error('no results in DOM; length', dom.length); process.exit(1); }
const res = JSON.parse(m[1].replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>'));
const out = {};
let bad = 0;
for (const [k, v] of Object.entries(res)) {
  if (v.err) { console.log('ERR', k, v.err); bad++; continue; }
  out[k] = v.h;
  if (v.sw > v.w + 1) { console.log(`OVERFLOW-X ${k}: scrollWidth ${v.sw} > ${v.w}`); bad++; }
  if (!v.sora) console.log(`FONT ${k}: Sora not loaded`);
}
fs.writeFileSync(`${ROOT}/gen/heights.json`, JSON.stringify(out, null, 1));
console.log(`measured ${Object.keys(out).length}/${manifest.length}; issues: ${bad}`);
console.log(Object.entries(out).map(([k, v]) => `${k}:${v}`).join('  '));
