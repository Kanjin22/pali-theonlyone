// js/error-handler.js
// Centralized error handling for the application

class AppError extends Error {
    constructor(message, statusCode = 400) {
        super(message);
        this.statusCode = statusCode;
        this.timestamp = new Date();
    }
}

/**
 * Global error handler for async operations
 */
function handleAsyncError(fn) {
    return function asyncUtilWrap(...args) {
        const fnReturn = fn(...args);
        const promise = Promise.resolve(fnReturn);
        promise.catch((error) => {
            logError('Async operation failed:', error);
            showErrorNotification('An error occurred. Please try again.');
        });
        return promise;
    };
}

/**
 * Display error notification to user
 */
function showErrorNotification(message, type = 'error') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 20px;
        background: ${type === 'error' ? '#e74c3c' : '#f39c12'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 9999;
        font-size: 14px;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

/**
 * Log error safely
 */
function logError(context, error) {
    const errorInfo = {
        context,
        message: error?.message || String(error),
        stack: error?.stack,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        userAgent: navigator.userAgent
    };
    
    if (typeof process === 'undefined' || !process.env || process.env.NODE_ENV !== 'production') {
        console.error('[Error]', errorInfo);
    }
    
    // In production, could send to external logging service
    // logToServer(errorInfo);
}

/**
 * Safe Firestore operations with error handling
 */
async function safeFirestoreRead(collectionPath, docId) {
    try {
        const doc = await firebase.firestore().collection(collectionPath).doc(docId).get();
        if (!doc.exists) {
            throw new AppError('Document not found', 404);
        }
        return doc.data();
    } catch (error) {
        logError(`Firestore read: ${collectionPath}/${docId}`, error);
        throw error;
    }
}

/**
 * Safe Firestore write with validation
 */
async function safeFirestoreWrite(collectionPath, docId, data) {
    try {
        if (!collectionPath || !docId) {
            throw new AppError('Invalid collection or document ID', 400);
        }
        
        await firebase.firestore().collection(collectionPath).doc(docId).set(data, { merge: true });
        return true;
    } catch (error) {
        logError(`Firestore write: ${collectionPath}/${docId}`, error);
        throw error;
    }
}

/**
 * Safe fetch with timeout
 */
async function safeFetch(url, options = {}, timeout = 10000) {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);
        
        const response = await fetch(url, {
            ...options,
            signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
            throw new AppError(`HTTP ${response.status}: ${response.statusText}`, response.status);
        }
        
        return await response.json();
    } catch (error) {
        if (error.name === 'AbortError') {
            throw new AppError('Request timeout', 408);
        }
        logError(`Fetch: ${url}`, error);
        throw error;
    }
}

// Export error utilities
window.AppError = AppError;
window.errorHandler = {
    AppError,
    handleAsyncError,
    showErrorNotification,
    logError,
    safeFirestoreRead,
    safeFirestoreWrite,
    safeFetch
};

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
    }
`;
document.head.appendChild(style);
