const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 8086;
const LOG_FILE = path.join(__dirname, 'server.log');

function log(message) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}\n`;
    console.log(message);
    try {
        fs.appendFileSync(LOG_FILE, logMessage);
    } catch (e) {
        console.error("Failed to write to log file:", e);
    }
}

const server = http.createServer((req, res) => {
    // Parse URL to handle query parameters correctly
    const parsedUrl = url.parse(req.url);
    let pathname = parsedUrl.pathname;
    
    // Decode URL-encoded characters (e.g., spaces, Thai characters)
    try {
        pathname = decodeURIComponent(pathname);
    } catch (e) {
        log(`Error decoding URI: ${e.message}`);
        res.writeHead(400);
        res.end('Bad Request');
        return;
    }

    log(`Request: ${req.method} ${req.url} -> Path: ${pathname}`);

    let filePath = '.' + pathname;
    if (filePath.endsWith('/')) filePath += 'index.html';

    // Prevent directory traversal
    filePath = path.resolve(filePath);
    if (!filePath.startsWith(__dirname)) {
        log(`Blocked traversal attempt: ${filePath}`);
        res.writeHead(403);
        res.end('Forbidden');
        return;
    }

    const extname = path.extname(filePath);
    let contentType = 'text/html';
    switch (extname) {
        case '.js': contentType = 'text/javascript'; break;
        case '.css': contentType = 'text/css'; break;
        case '.json': contentType = 'application/json'; break;
        case '.png': contentType = 'image/png'; break;
        case '.jpg': contentType = 'image/jpg'; break;
        case '.svg': contentType = 'image/svg+xml'; break;
        case '.woff': contentType = 'font/woff'; break;
        case '.woff2': contentType = 'font/woff2'; break;
        case '.ttf': contentType = 'font/ttf'; break;
        case '.otf': contentType = 'font/otf'; break;
    }

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if(error.code == 'ENOENT'){
                log(`404 Not Found: ${filePath}`);
                res.writeHead(404);
                res.end(`404 Not Found: ${pathname}`);
            }
            else {
                log(`500 Error: ${error.code} for ${filePath}`);
                res.writeHead(500);
                res.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
            }
        }
        else {
            log(`200 OK: ${filePath}`);
            res.writeHead(200, { 
                'Content-Type': contentType,
                'Cross-Origin-Opener-Policy': 'same-origin-allow-popups',
                'Cross-Origin-Embedder-Policy': 'unsafe-none'
            });
            res.end(content, 'utf-8');
        }
    });
});

server.on('error', (e) => {
    if (e.code === 'EADDRINUSE') {
        log(`Address 127.0.0.1:${PORT} in use, retrying...`);
        setTimeout(() => {
            server.close();
            server.listen(PORT);
        }, 1000);
    } else {
        log(`Server error: ${e.message}`);
    }
});

server.listen(PORT, () => {
    log(`Server running at http://127.0.0.1:${PORT}/`);
});
