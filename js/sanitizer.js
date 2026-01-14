// js/sanitizer.js
// HTML Sanitization utility to prevent XSS attacks
// Uses DOMPurify library for safe HTML rendering

/**
 * Sanitize HTML content to prevent XSS attacks
 * @param {string} html - HTML string to sanitize
 * @param {Object} config - Optional DOMPurify config
 * @returns {string} Sanitized HTML safe to use with innerHTML
 */
function sanitizeHTML(html, config = {}) {
    if (!window.DOMPurify) {
        console.warn('DOMPurify not loaded, using escaped text instead');
        return escapeHTML(html);
    }
    
    const defaultConfig = {
        ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br', 'span', 'div', 'ul', 'li', 'ol', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
        ALLOWED_ATTR: ['href', 'title', 'target', 'rel', 'class', 'id', 'style'],
        KEEP_CONTENT: true
    };
    
    return DOMPurify.sanitize(html, { ...defaultConfig, ...config });
}

/**
 * Safe text content setter
 * @param {HTMLElement} element - DOM element to update
 * @param {string} text - Text content to set
 */
function safeSetTextContent(element, text) {
    if (element) {
        element.textContent = text;
    }
}

/**
 * Safe HTML content setter with sanitization
 * @param {HTMLElement} element - DOM element to update
 * @param {string} html - HTML content to set
 * @param {Object} config - Optional sanitization config
 */
function safeSetInnerHTML(element, html, config = {}) {
    if (element) {
        element.innerHTML = sanitizeHTML(html, config);
    }
}

/**
 * Escape HTML special characters (alternative to sanitization)
 * @param {string} text - Text to escape
 * @returns {string} Escaped HTML
 */
function escapeHTML(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

/**
 * Create safe DOM element with text content
 * @param {string} tagName - HTML tag name
 * @param {string} text - Text content
 * @param {Object} attributes - Optional attributes to set
 * @returns {HTMLElement} Created element
 */
function createSafeElement(tagName, text = '', attributes = {}) {
    const element = document.createElement(tagName);
    if (text) {
        element.textContent = text;
    }
    
    // Set attributes safely
    Object.entries(attributes).forEach(([key, value]) => {
        if (key.startsWith('on')) {
            console.warn(`Skipping event handler attribute: ${key}`);
            return;
        }
        element.setAttribute(key, String(value));
    });
    
    return element;
}

// Export for use in other modules
window.sanitizer = {
    sanitizeHTML,
    safeSetTextContent,
    safeSetInnerHTML,
    escapeHTML,
    createSafeElement
};
