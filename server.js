const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 3000;
const ROOT = __dirname;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf'
};

const server = http.createServer((req, res) => {
  const parsed = url.parse(req.url);
  let pathname = decodeURIComponent(parsed.pathname || '/');

  // Route alias resolution
  if (pathname === '/') pathname = '/index.html';
  if (pathname === '/ponuda') pathname = '/ponuda.html';
  if (pathname === '/vozilo') pathname = '/vozilo.html';
  if (pathname === '/index') pathname = '/index.html';

  let filePath = path.join(ROOT, pathname);

  // Security check to avoid directory traversal
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    return res.end('403 Forbidden');
  }

  // If directory, look for index.html
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  // Fallback check: if /something without .html exists with .html
  if (!fs.existsSync(filePath) && fs.existsSync(filePath + '.html')) {
    filePath = filePath + '.html';
  }

  fs.stat(filePath, (err, stat) => {
    if (err || !stat.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      return res.end(`
        <!DOCTYPE html>
        <html lang="hr">
        <head><meta charset="utf-8"><title>404 · Nije pronađeno</title><link rel="stylesheet" href="/css/style.css"></head>
        <body style="min-height:100vh;display:flex;align-items:center;justify-content:center;flex-direction:column;font-family:sans-serif;background:#0b0b0a;color:#ece8df;text-align:center;padding:2rem">
          <h1 style="font-size:4rem;margin:0;color:#ff4f1a;font-family:'Instrument Serif',serif">404</h1>
          <p style="font-size:1.2rem;opacity:.7">Stranica nije pronađena.</p>
          <a href="/" style="margin-top:1.5rem;display:inline-block;padding:.8rem 1.6rem;background:#ff4f1a;color:#fff;text-decoration:none;border-radius:999px;font-weight:600">Natrag na početnu</a>
        </body>
        </html>
      `);
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Content-Length': stat.size,
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Access-Control-Allow-Origin': '*'
    });

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`\n=================================================`);
  console.log(` INDIVIDUAL Car Company — Premium Server Aktivan `);
  console.log(`=================================================`);
  console.log(` Local:   http://localhost:${PORT}/`);
  console.log(` Ponuda:  http://localhost:${PORT}/ponuda.html`);
  console.log(` Vozilo:  http://localhost:${PORT}/vozilo.html?v=bmw-2-active-tourer`);
  console.log(`=================================================\n`);
});
