(function() {
  try {
    var s = document.createElement('script');
    s.src = '../data/vocab-sc.js';
    s.async = false;
    var current = document.currentScript;
    if (current && current.parentNode) {
      current.parentNode.insertBefore(s, current.nextSibling);
    } else {
      document.head.appendChild(s);
    }
  } catch (e) {
    console.error('Failed to load vocab-sc.js from original path:', e);
  }
})();
