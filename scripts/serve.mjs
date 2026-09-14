import { createServer } from 'node:http';
import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';

const root = resolve(process.argv.includes('--production') ? 'dist' : 'public');
const port = Number(process.env.PORT || 4173);
const mime = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.mp4': 'video/mp4', '.woff2': 'font/woff2' };

createServer(async (req, res) => {
  try {
    if (!['GET', 'HEAD'].includes(req.method)) { res.writeHead(405).end(); return; }
    let pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    if (pathname.endsWith('/')) pathname += 'index.html';
    const path = resolve(root, '.' + pathname);
    if (!path.startsWith(root + sep)) { res.writeHead(403).end(); return; }
    const info = await stat(path);
    if (!info.isFile()) { res.writeHead(404).end(); return; }
    const headers = { 'Content-Type': mime[extname(path)] || 'application/octet-stream', 'X-Content-Type-Options': 'nosniff', 'Cache-Control': 'no-cache', 'Accept-Ranges': 'bytes' };
    const range = req.headers.range?.match(/^bytes=(\d+)-(\d*)$/);
    if (range) {
      const start = Number(range[1]);
      const end = range[2] ? Math.min(Number(range[2]), info.size - 1) : info.size - 1;
      if (start >= info.size || end < start) { res.writeHead(416, { 'Content-Range': `bytes */${info.size}` }).end(); return; }
      res.writeHead(206, { ...headers, 'Content-Range': `bytes ${start}-${end}/${info.size}`, 'Content-Length': end - start + 1 });
      if (req.method === 'HEAD') res.end(); else createReadStream(path, { start, end }).pipe(res);
    } else {
      res.writeHead(200, { ...headers, 'Content-Length': info.size });
      if (req.method === 'HEAD') res.end(); else createReadStream(path).pipe(res);
    }
  } catch { res.writeHead(404, { 'Content-Type': 'text/plain' }).end('Page not found'); }
}).listen(port, '127.0.0.1', () => console.log(`BVS preview: http://localhost:${port}`));
