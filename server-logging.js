// Server-side logging with Winston
// File: server-logging.js

const fs = require('fs');
const path = require('path');

// Create logs directory if it doesn't exist
const logsDir = path.join(__dirname, '..', 'logs');
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
}

// Simple file logger (Winston would be better for production)
class Logger {
    constructor(filename = 'app.log', level = 'info') {
        this.filename = path.join(logsDir, filename);
        this.level = level;
        this.levels = { debug: 0, info: 1, warn: 2, error: 3 };
    }
    
    log(level, message, metadata = {}) {
        if (this.levels[level] < this.levels[this.level]) return;
        
        const timestamp = new Date().toISOString();
        const logEntry = {
            timestamp,
            level: level.toUpperCase(),
            message,
            ...metadata
        };
        
        const logLine = JSON.stringify(logEntry) + '\n';
        
        // Write to file
        fs.appendFileSync(this.filename, logLine, 'utf8');
        
        // Also log to console in development
        if (process.env.NODE_ENV !== 'production') {
            console[level === 'error' ? 'error' : level === 'warn' ? 'warn' : 'log'](
                `[${timestamp}] [${level.toUpperCase()}]`,
                message,
                metadata
            );
        }
    }
    
    debug(message, metadata) { this.log('debug', message, metadata); }
    info(message, metadata) { this.log('info', message, metadata); }
    warn(message, metadata) { this.log('warn', message, metadata); }
    error(message, metadata) { this.log('error', message, metadata); }
}

// Export for use in server.js
module.exports = { Logger, logsDir };
