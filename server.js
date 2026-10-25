const http = require('http');
const fs = require('fs');
const path = require('path');

let PORT = process.env.PORT || 3050;
const BASE_DIR = __dirname;

const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.woff2': 'font/woff2',
    '.woff': 'font/woff'
};

const server = http.createServer((req, res) => {
    let reqUrl = req.url.split('?')[0];
    let filePath = path.join(BASE_DIR, reqUrl === '/' ? 'index.html' : reqUrl);

    fs.stat(filePath, (err, stats) => {
        if (err || !stats.isFile()) {
            res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('404 Not Found');
            return;
        }

        const ext = path.extname(filePath).toLowerCase();
        const contentType = MIME_TYPES[ext] || 'application/octet-stream';

        res.writeHead(200, { 'Content-Type': contentType });
        fs.createReadStream(filePath).pipe(res);
    });
});

server.on('error', (e) => {
    if (e.code === 'EADDRINUSE') {
        console.log(`Port ${PORT} in use, trying ${Number(PORT) + 1}...`);
        PORT = Number(PORT) + 1;
        server.listen(PORT);
    } else {
        console.error('Server error:', e);
    }
});

server.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(` موقع بورتفوليو المهندس حازم ابوسعيفة يعمل بنجاح!`);
    console.log(` الرابط المحلي: http://localhost:${PORT}`);
    console.log(`====================================================`);
});
