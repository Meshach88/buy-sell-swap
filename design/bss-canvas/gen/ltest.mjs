import fs from 'node:fs'; import http from 'node:http'; import path from 'node:path'; import { fileURLToPath } from 'node:url'; import puppeteer from 'puppeteer-core';
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const server = http.createServer((q,r)=>{const fp=path.join(ROOT,decodeURIComponent(q.url.split('?')[0]));if(!fs.existsSync(fp)||fs.statSync(fp).isDirectory()){r.writeHead(404);r.end();return;}r.writeHead(200,{'Content-Type':{'.html':'text/html','.woff2':'font/woff2'}[path.extname(fp)]||'application/octet-stream'});fs.createReadStream(fp).pipe(r);});
await new Promise(r=>server.listen(0,'127.0.0.1',r)); const port=server.address().port;
const b = await puppeteer.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,userDataDir:`${ROOT}/.chrome-profile2`});
const p = await b.newPage(); await p.setViewport({width:900,height:420}); await p.goto(`http://127.0.0.1:${port}/preview/ltest.html`); await p.evaluate(()=>document.fonts.ready); await p.screenshot({path:`${ROOT}/shots/ltest.png`}); await b.close(); server.close(); process.exit(0);
