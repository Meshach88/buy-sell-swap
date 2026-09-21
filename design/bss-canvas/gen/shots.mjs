import fs from 'node:fs'; import http from 'node:http'; import path from 'node:path'; import { fileURLToPath } from 'node:url'; import puppeteer from 'puppeteer-core';
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const want = process.argv.slice(2);
const server = http.createServer((req,res)=>{const fp=path.join(ROOT,decodeURIComponent(req.url.split('?')[0]));if(!fs.existsSync(fp)||fs.statSync(fp).isDirectory()){res.writeHead(404);res.end();return;}res.writeHead(200,{'Content-Type':{'.html':'text/html','.jpg':'image/jpeg','.woff2':'font/woff2'}[path.extname(fp)]||'application/octet-stream'});fs.createReadStream(fp).pipe(res);});
await new Promise(r=>server.listen(0,'127.0.0.1',r)); const port=server.address().port;
const manifest = JSON.parse(fs.readFileSync(`${ROOT}/gen/manifest.json`,'utf8'));
const b = await puppeteer.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,userDataDir:`${ROOT}/.chrome-profile2`,args:['--no-first-run','--hide-scrollbars']});
const p = await b.newPage(); fs.mkdirSync(`${ROOT}/shots`,{recursive:true});
for (const f of want) { const it = manifest.find(m=>m.file===f); await p.setViewport({width:it.w,height:900,deviceScaleFactor:1}); await p.goto(`http://127.0.0.1:${port}/preview/${f}.html`,{waitUntil:'load'}); await p.evaluate(()=>document.fonts.ready); await new Promise(r=>setTimeout(r,200)); await p.screenshot({path:`${ROOT}/shots/${f}.png`,fullPage:true}); }
await b.close(); server.close(); process.exit(0);
