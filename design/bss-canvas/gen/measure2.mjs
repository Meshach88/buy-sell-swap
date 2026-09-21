import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer-core';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const manifest = JSON.parse(fs.readFileSync(`${ROOT}/gen/manifest.json`, 'utf8'));
const TYPES = { '.html': 'text/html', '.jpg': 'image/jpeg', '.woff2': 'font/woff2' };
const server = http.createServer((req, res) => {
  const fp = path.join(ROOT, decodeURIComponent(req.url.split('?')[0]));
  if (!fp.startsWith(ROOT) || !fs.existsSync(fp) || fs.statSync(fp).isDirectory()) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'Content-Type': TYPES[path.extname(fp)] || 'application/octet-stream' });
  fs.createReadStream(fp).pipe(res);
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const port = server.address().port;

const browser = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true, userDataDir: `${ROOT}/.chrome-profile2`, args: ['--no-first-run', '--hide-scrollbars'] });
const page = await browser.newPage();
const out = {}; let bad = 0;
for (const it of manifest) {
  await page.setViewport({ width: it.w, height: 900 });
  await page.goto(`http://127.0.0.1:${port}/preview/${it.file}.html`, { waitUntil: 'load', timeout: 20000 });
  const r = await page.evaluate(async () => {
    await document.fonts.ready;
    await new Promise((x) => setTimeout(x, 150));
    const root = document.body.lastElementChild; const b = root.getBoundingClientRect();
    return { h: Math.ceil(b.height), sw: root.scrollWidth, sora: document.fonts.check('16px Sora'), imgs: [...document.images].filter((i) => !i.complete || i.naturalWidth === 0).length };
  });
  out[it.file] = r.h;
  if (r.sw > it.w + 1) { console.log(`OVERFLOW-X ${it.file}: ${r.sw} > ${it.w}`); bad++; }
  if (!r.sora) console.log(`FONT ${it.file}: Sora not loaded`);
  if (r.imgs) { console.log(`IMG ${it.file}: ${r.imgs} broken`); bad++; }
}
await browser.close(); server.close();
fs.writeFileSync(`${ROOT}/gen/heights.json`, JSON.stringify(out, null, 1));
console.log(`measured ${Object.keys(out).length}/${manifest.length}; issues: ${bad}`);
console.log(Object.entries(out).map(([k, v]) => `${k}:${v}`).join('  '));
process.exit(0);
