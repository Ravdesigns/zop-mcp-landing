// Zero-dependency static server. zopcloud detects the framework and the port,
// so a plain Node process that honours $PORT is the least ambiguous thing to
// hand it: nothing to install, nothing to build, no Dockerfile.
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, 'public');
const PORT = process.env.PORT || 8080;

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.mp4': 'video/mp4',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
};

http.createServer((req, res) => {
  const url = decodeURIComponent((req.url || '/').split('?')[0]);
  let file = path.join(ROOT, url === '/' ? 'index.html' : url);

  // Never serve outside the public directory, whatever the request says.
  if (!file.startsWith(ROOT)) {
    res.writeHead(403).end('Forbidden');
    return;
  }

  fs.stat(file, (err, stat) => {
    if (err || !stat.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain' }).end('Not found');
      return;
    }
    res.writeHead(200, {
      'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream',
      'Content-Length': stat.size,
      // The video is immutable; the page is not.
      'Cache-Control': file.endsWith('.html') ? 'no-cache' : 'public, max-age=31536000',
    });
    fs.createReadStream(file).pipe(res);
  });
}).listen(PORT, () => console.log('listening on ' + PORT));
