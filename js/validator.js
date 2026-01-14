// js/validator.js
// Input validation and sanitization utilities

/**
 * Validate and sanitize email
 * @param {string} email - Email to validate
 * @returns {Object} {valid: boolean, message: string, sanitized: string}
 */
function validateEmail(email) {
    if (!email || typeof email !== 'string') {
        return { valid: false, message: 'Email is required', sanitized: '' };
    }
    
    // Remove whitespace
    const sanitized = email.trim();
    
    // RFC 5322 simplified email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(sanitized)) {
        return { valid: false, message: 'Invalid email format', sanitized };
    }
    
    if (sanitized.length > 254) {
        return { valid: false, message: 'Email is too long', sanitized };
    }
    
    return { valid: true, message: '', sanitized };
}

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {Object} {valid: boolean, message: string, strength: 'weak'|'medium'|'strong'}
 */
function validatePassword(password) {
    if (!password || typeof password !== 'string') {
        return { valid: false, message: 'Password is required', strength: 'weak' };
    }
    
    if (password.length < 6) {
        return { valid: false, message: 'Password must be at least 6 characters', strength: 'weak' };
    }
    
    if (password.length > 128) {
        return { valid: false, message: 'Password is too long', strength: 'weak' };
    }
    
    // Check strength
    let strength = 'weak';
    let score = 0;
    
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^a-zA-Z0-9]/.test(password)) score++;
    
    if (password.length >= 8) score++;
    
    if (score >= 3) strength = 'medium';
    if (score >= 4) strength = 'strong';
    
    return { valid: true, message: '', strength };
}

/**
 * Validate and sanitize search query
 * @param {string} query - Search query
 * @returns {Object} {valid: boolean, message: string, sanitized: string}
 */
function validateSearchQuery(query) {
    if (!query || typeof query !== 'string') {
        return { valid: false, message: 'Search query is required', sanitized: '' };
    }
    
    // Remove whitespace
    const sanitized = query.trim();
    
    if (sanitized.length === 0) {
        return { valid: false, message: 'Search query cannot be empty', sanitized: '' };
    }
    
    if (sanitized.length > 1000) {
        return { valid: false, message: 'Search query is too long', sanitized: '' };
    }
    
    // Remove dangerous characters
    const cleaned = sanitized
        .replace(/[<>\"'`]/g, '') // Remove HTML chars
        .replace(/[;\\]/g, '');     // Remove SQL chars
    
    return { valid: true, message: '', sanitized: cleaned };
}

/**
 * Validate level/classroom input
 * @param {string} level - Level code (e.g., 'pt1', 'pt12')
 * @returns {Object} {valid: boolean, message: string, sanitized: string}
 */
function validateLevel(level) {
    const validLevels = ['pt1', 'pt2', 'pt12', 'pt3', 'pt4', 'pt5', 'pt6', 'pt7', 'pt8', 'pt9'];
    
    if (!level || typeof level !== 'string') {
        return { valid: false, message: 'Level is required', sanitized: '' };
    }
    
    const sanitized = level.toLowerCase().trim();
    
    if (!validLevels.includes(sanitized)) {
        return { valid: false, message: `Invalid level. Valid levels are: ${validLevels.join(', ')}`, sanitized: '' };
    }
    
    return { valid: true, message: '', sanitized };
}

/**
 * Validate Firestore document ID
 * @param {string} docId - Document ID
 * @returns {Object} {valid: boolean, message: string, sanitized: string}
 */
function validateDocumentId(docId) {
    if (!docId || typeof docId !== 'string') {
        return { valid: false, message: 'Document ID is required', sanitized: '' };
    }
    
    const sanitized = docId.trim();
    
    // Firestore allows: [a-zA-Z0-9_-]
    if (!/^[a-zA-Z0-9_-]+$/.test(sanitized)) {
        return { valid: false, message: 'Invalid document ID format', sanitized: '' };
    }
    
    if (sanitized.length > 1500) {
        return { valid: false, message: 'Document ID is too long', sanitized: '' };
    }
    
    return { valid: true, message: '', sanitized };
}

/**
 * Validate JSON data
 * @param {string} jsonString - JSON string to validate
 * @returns {Object} {valid: boolean, message: string, data: Object}
 */
function validateJSON(jsonString) {
    if (typeof jsonString !== 'string') {
        return { valid: false, message: 'Input must be a string', data: null };
    }
    
    try {
        const data = JSON.parse(jsonString);
        return { valid: true, message: '', data };
    } catch (error) {
        return { valid: false, message: `Invalid JSON: ${error.message}`, data: null };
    }
}

/**
 * Validate number input
 * @param {any} value - Value to validate
 * @param {Object} options - Validation options {min, max, integer}
 * @returns {Object} {valid: boolean, message: string, sanitized: number}
 */
function validateNumber(value, options = {}) {
    const { min, max, integer = false } = options;
    
    if (value === null || value === undefined || value === '') {
        return { valid: false, message: 'Number is required', sanitized: 0 };
    }
    
    let num = Number(value);
    
    if (isNaN(num)) {
        return { valid: false, message: 'Must be a valid number', sanitized: 0 };
    }
    
    if (integer && !Number.isInteger(num)) {
        return { valid: false, message: 'Must be an integer', sanitized: 0 };
    }
    
    if (min !== undefined && num < min) {
        return { valid: false, message: `Must be at least ${min}`, sanitized: 0 };
    }
    
    if (max !== undefined && num > max) {
        return { valid: false, message: `Must be at most ${max}`, sanitized: 0 };
    }
    
    return { valid: true, message: '', sanitized: num };
}

// Export validators
window.validator = {
    validateEmail,
    validatePassword,
    validateSearchQuery,
    validateLevel,
    validateDocumentId,
    validateJSON,
    validateNumber
};
