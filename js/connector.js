const Connector = {
    isActive: false,
    isVisible: true,
    links: [], // { startId, endId, color }
    sequences: {}, // { wordId: { num: number, color: string } }
    layout: [], // { id: string, color: string, indent: number }
    nextSequence: 1,
    currentColor: '#e74c3c', // Default Red
    lastNodeId: null,
    
    svgLayer: null,
    container: null,
    getContextId: null, // Function to get current unique ID (page/slide)
    
    init: function(container, contextIdFn) {
        if (typeof container === 'string') {
            this.container = document.getElementById(container);
        } else {
            this.container = container;
        }
        
        this.getContextId = contextIdFn;
        
        if (!this.container) return;

        // Create SVG Layer if not exists (Kept for future use or compatibility, though not drawing lines now)
        if (!document.getElementById('connector-layer')) {
            this.svgLayer = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            this.svgLayer.style.position = "absolute";
            this.svgLayer.style.top = "0";
            this.svgLayer.style.left = "0";
            this.svgLayer.style.width = "100%";
            this.svgLayer.style.height = "100%";
            this.svgLayer.style.pointerEvents = "none";
            this.svgLayer.style.zIndex = "10"; 
            this.svgLayer.id = "connector-layer";
            
            // Ensure container has relative position
            const computedStyle = window.getComputedStyle(this.container);
            if (computedStyle.position === 'static') {
                this.container.style.position = 'relative';
            }
            this.container.appendChild(this.svgLayer);
        } else {
            this.svgLayer = document.getElementById('connector-layer');
        }
        
        this.loadData();
        
        // Listen for resize
        window.addEventListener('resize', () => this.render());
        
        // Add CSS for badges
        if (!document.getElementById('connector-styles')) {
            const style = document.createElement('style');
            style.id = 'connector-styles';
            style.textContent = `
                .connector-mode .word-span {
                    cursor: crosshair; /* Fallback */
                }
                .connector-badge {
                    position: absolute;
                    background-color: #e74c3c;
                    color: white;
                    border-radius: 50%;
                    width: 20px;
                    height: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 11px;
                    font-weight: bold;
                    z-index: 20;
                    box-shadow: 0 1px 2px rgba(0,0,0,0.3);
                    /* Position relative to parent word */
                    top: -10px;
                    left: 50%;
                    transform: translateX(-50%);
                    white-space: nowrap; /* Prevent number wrap */
                    cursor: pointer; /* Change to pointer to indicate clickable */
                    line-height: 1; /* Reset line-height */
                }
                .connector-badge:hover {
                    transform: translateX(-50%) scale(1.1);
                    z-index: 21;
                }
            `;
            document.head.appendChild(style);
        }
    },
    
    toggleMode: function(btn) {
        this.isActive = !this.isActive;
        
        if (btn) {
            btn.classList.toggle('active', this.isActive);
            // Visual feedback
            if (this.isActive) {
                btn.style.backgroundColor = '#e74c3c';
                btn.style.color = 'white';
            } else {
                btn.style.backgroundColor = '';
                btn.style.color = '';
            }
        }
        document.body.classList.toggle('connector-mode', this.isActive);
        
        if (this.isActive) {
            // Determine next sequence based on existing max
            // Need to handle object structure now
            const values = Object.values(this.sequences).map(v => (typeof v === 'object' ? v.num : v));
            const maxSeq = values.length > 0 ? Math.max(...values) : 0;
            this.nextSequence = maxSeq + 1;
            this.lastNodeId = null; // Start new chain segment
            this.updateCursor();
        } else {
            document.body.style.cursor = '';
            this.lastNodeId = null;
        }
        
        this.render();
    },

    setColor: function(color) {
        this.currentColor = color;
        this.nextSequence = 1;
        this.lastNodeId = null;
        this.updateCursor();
    },

    removeNode: function(id) {
        // Confirm removal (optional, maybe better without confirm for speed? User asked "how to delete", prompt is safer)
        if (confirm('ลบจุดนี้ใช่หรือไม่?')) {
            delete this.sequences[id];
            // Remove links connected to this node
            this.links = this.links.filter(l => l.startId !== id && l.endId !== id);
            this.saveData();
            this.render();
            // Re-calc next sequence? No, keep current counter to avoid confusion.
        }
    },
    
    handleWordClick: function(el) {
        if (!this.isActive) return false;
        
        const id = el.getAttribute('data-idx') || el.getAttribute('data-note-id'); // Support both formats
        if (!id) return false;
        
        // 1. Assign Number
        this.sequences[id] = { num: this.nextSequence, color: this.currentColor };
        
        // 2. Link from last node (if exists and not same)
        if (this.lastNodeId && this.lastNodeId !== id) {
            this.addLink(this.lastNodeId, id);
        }
        
        // 3. Update State
        this.lastNodeId = id;
        this.nextSequence++;
        
        // 4. Save & Render
        this.saveData();
        this.render();
        this.updateCursor();
        
        return true;
    },
    
    addLink: function(startId, endId) {
        // Avoid duplicates
        const exists = this.links.some(l => l.startId === startId && l.endId === endId);
        if (!exists) {
            this.links.push({ startId, endId, color: this.currentColor }); // Use current color for link too
        }
        
        // Notify Graph if open
        if (window.ConnectorGraph && window.ConnectorGraph.isOpen) {
            window.ConnectorGraph.render();
        }
    },
    
    saveData: function() {
        if (!this.getContextId) return;
        const contextId = this.getContextId();
        if (contextId) {
            localStorage.setItem('connector_links_' + contextId, JSON.stringify(this.links));
            localStorage.setItem('connector_sequences_' + contextId, JSON.stringify(this.sequences));
            localStorage.setItem('connector_layout_' + contextId, JSON.stringify(this.layout));
        }
    },
    
    loadData: function() {
        if (!this.getContextId) return;
        const contextId = this.getContextId();
        if (contextId) {
            const linksData = localStorage.getItem('connector_links_' + contextId);
            const seqData = localStorage.getItem('connector_sequences_' + contextId);
            const layoutData = localStorage.getItem('connector_layout_' + contextId);
            this.links = linksData ? JSON.parse(linksData) : [];
            this.sequences = seqData ? JSON.parse(seqData) : {};
            this.layout = layoutData ? JSON.parse(layoutData) : [];
        } else {
            this.links = [];
            this.sequences = {};
            this.layout = [];
        }
    },
    
    reload: function() {
        this.loadData();
    },

    toggleVisibility: function() {
        this.isVisible = !this.isVisible;
        this.render();
        return this.isVisible;
    },

    clearAll: function() {
        this.sequences = {};
        this.links = [];
        this.layout = [];
        this.wordLinks = [];
        this.nextSequence = 1;
        this.lastNodeId = null;
        this.saveData();
        this.render();
        this.updateCursor();
        
        // Notify Graph if open
        if (window.ConnectorGraph && window.ConnectorGraph.isOpen) {
            window.ConnectorGraph.render();
        }
    },
    
    render: function() {
        if (!this.container) return;
        
        // 1. Clear Lines (We don't draw lines in main view anymore)
        if (this.svgLayer) {
            this.svgLayer.innerHTML = '';
            // Update SVG size just in case we need it later
            this.svgLayer.style.height = this.container.scrollHeight + 'px';
            this.svgLayer.style.width = this.container.scrollWidth + 'px';
        }
        
        // 2. Clear Old Styles (Color text)
        // Only clear within container to support multiple active connectors
        const scope = this.container || document;
        scope.querySelectorAll('.word-span').forEach(el => {
            el.style.color = '';
            el.style.fontWeight = '';
            el.classList.remove('has-connector-color');
            
            // Remove handlers attached via properties if any (not used here, but good practice)
        });
        
        if (!this.isVisible) return;

        // 3. Draw Styles
        Object.entries(this.sequences).forEach(([id, data]) => {
            const el = this.findEl(id);
            if (el) {
                // Support legacy data (number only)
                // const num = typeof data === 'object' ? data.num : data; // Number unused now
                const color = typeof data === 'object' ? data.color : '#e74c3c';
                this.applyColor(el, color, id);
            }
        });
    },
    
    findEl: function(id) {
        if (this.container) {
            return this.container.querySelector(`.word-span[data-idx="${id}"]`) || this.container.querySelector(`.word-span[data-note-id="${id}"]`);
        }
        return document.querySelector(`[data-idx="${id}"]`) || document.querySelector(`[data-note-id="${id}"]`);
    },
    
    applyColor: function(el, color, id) {
        el.style.color = color || '#e74c3c';
        el.style.fontWeight = 'bold'; // Make it bold to stand out
        el.classList.add('has-connector-color');
        
        // Add delete handler (Right-Click on the word itself)
        // Note: This might conflict with other context menus, but for now it's consistent with previous behavior
        // To avoid piling up event listeners, we set it as a property or assume re-render clears them? 
        // Actually, re-render doesn't replace the element, so listeners pile up.
        // Better to use a dedicated property on the element or delegate.
        // For simplicity in this legacy codebase structure, we'll try to handle it carefully.
        
        // Remove old handler if stored
        if (el._connectorRightClick) {
            el.removeEventListener('contextmenu', el._connectorRightClick);
        }
        
        const handler = (e) => {
            if (Connector.isActive) {
                e.preventDefault();
                e.stopPropagation();
                Connector.removeNode(id);
            }
        };
        
        el.addEventListener('contextmenu', handler);
        el._connectorRightClick = handler;
    },
    
    updateCursor: function() {
        if (!this.isActive) {
            document.body.style.cursor = '';
            return;
        }
        
        // Create SVG cursor with number
        const num = this.nextSequence;
        const color = this.currentColor || '#e74c3c';
        const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
            <circle cx="16" cy="16" r="12" fill="${color}" fill-opacity="0.9" stroke="white" stroke-width="2"/>
            <text x="16" y="20.5" font-family="Arial" font-size="12" fill="white" text-anchor="middle" font-weight="bold">${num}</text>
        </svg>`;
        
        const url = `data:image/svg+xml;base64,${btoa(svg)}`;
        document.body.style.cursor = `url('${url}') 16 16, auto`;
    }
};

window.Connector = Connector;
