const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const ROOT = __dirname;

const MIME_TYPES = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
    console.log(`${req.method} ${req.url}`);

    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    if (req.url === '/save-content' && req.method === 'POST') {
        req.setEncoding('utf8');
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            try {
                const { filename, key, data } = JSON.parse(body);
                // Security check: only allow files in data/
                // Allow filename to be just "content-dhamma01.js"
                if (!filename || filename.includes('..') || !filename.endsWith('.js')) {
                    throw new Error("Invalid filename");
                }
                
                const filePath = path.join(ROOT, 'data', filename);
                if (!fs.existsSync(filePath)) {
                    throw new Error("File not found: " + filePath);
                }

                let content = fs.readFileSync(filePath, 'utf8');
                const newDataJson = JSON.stringify(data, null, 4);

                // Regex to find the key
                // Matches: "key": [ or key: [
                // We need to be careful with regex.
                // Let's use the logic: find key, then find matching bracket.
                
                // Escape key for regex
                const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                // Look for key followed by colon and start bracket
                const keyRegex = new RegExp(`(["']?${escapedKey}["']?\\s*:\\s*\\[)`);
                const match = content.match(keyRegex);

                if (match) {
                    // Update existing
                    const startIndex = match.index + match[0].length - 1; // pointing to '['
                    
                    let depth = 0;
                    let endIndex = -1;
                    
                    for (let i = startIndex; i < content.length; i++) {
                        if (content[i] === '[') depth++;
                        else if (content[i] === ']') depth--;
                        
                        if (depth === 0) {
                            endIndex = i + 1;
                            break;
                        }
                    }

                    if (endIndex !== -1) {
                        content = content.substring(0, startIndex) + 
                                  newDataJson + 
                                  content.substring(endIndex);
                    } else {
                        throw new Error("Could not find closing bracket for key in file");
                    }

                } else {
                    // Insert new
                    // Find the last closing brace '};' of the file (or just '}')
                    const lastBrace = content.lastIndexOf('}');
                    if (lastBrace === -1) throw new Error("Invalid file format: No closing brace found");

                    // Check if we need a comma
                    // Look back from lastBrace to find non-whitespace
                    let needsComma = false;
                    let i = lastBrace - 1;
                    while (i >= 0 && /\s/.test(content[i])) i--;
                    // If the last character was not a comma and not the opening brace (empty object), we need a comma
                    if (i >= 0 && content[i] !== ',' && content[i] !== '{') {
                        needsComma = true;
                    }

                    const insertStr = (needsComma ? ',' : '') + 
                                      `\n\n    "${key}": ${newDataJson}\n`;
                    
                    content = content.substring(0, lastBrace) + insertStr + content.substring(lastBrace);
                }

                fs.writeFileSync(filePath, content, 'utf8');
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true, message: "บันทึกเรียบร้อย!" }));

            } catch (err) {
                console.error(err);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, message: err.message }));
            }
        });
        return;
    }

    // Static File Serving
    let filePath = path.join(ROOT, req.url === '/' ? 'index.html' : req.url);
    // Decode URL (handle spaces etc)
    filePath = decodeURIComponent(filePath);

    // Prevent directory traversal
    if (!filePath.startsWith(ROOT)) {
        res.writeHead(403);
        res.end('403 Forbidden');
        return;
    }

    const ext = path.extname(filePath).toLowerCase();
    
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if(err.code === 'ENOENT') {
                 res.writeHead(404);
                 res.end('404 Not Found');
            } else {
                 res.writeHead(500);
                 res.end('500 Server Error: ' + err.code);
            }
        } else {
            res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
    console.log(`- API Endpoint: http://localhost:${PORT}/save-content`);
});
