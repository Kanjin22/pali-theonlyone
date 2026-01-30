
const Connector = {
    isActive: false,
    startNode: null,
    links: [], // { startId, endId, color }
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

        // Create SVG Layer if not exists
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
        
        this.loadLinks();
        
        // Listen for resize
        window.addEventListener('resize', () => this.render());
        
        // Add CSS for selected state
        if (!document.getElementById('connector-styles')) {
            const style = document.createElement('style');
            style.id = 'connector-styles';
            style.textContent = `
                .connector-selected {
                    background-color: #f1c40f !important;
                    color: #000 !important;
                    border-radius: 4px;
                    box-shadow: 0 0 5px rgba(0,0,0,0.3);
                }
                .connector-mode .word-span {
                    cursor: crosshair !important;
                }
            `;
            document.head.appendChild(style);
        }
    },
    
    toggleMode: function(btn) {
        this.isActive = !this.isActive;
        this.startNode = null;
        document.querySelectorAll('.connector-selected').forEach(el => el.classList.remove('connector-selected'));
        
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
        // Re-render to ensure lines are correct when showing/hiding
        if (this.isActive) this.render();
    },
    
    handleWordClick: function(el) {
        if (!this.isActive) return false;
        
        const id = el.getAttribute('data-idx') || el.getAttribute('data-note-id'); // Support both formats
        if (!id) return false;
        
        if (!this.startNode) {
            // Select Start
            this.startNode = el;
            el.classList.add('connector-selected');
        } else {
            // Select End
            const startId = this.startNode.getAttribute('data-idx') || this.startNode.getAttribute('data-note-id');
            
            if (startId === id) {
                // Cancel if clicking same node
                this.startNode.classList.remove('connector-selected');
                this.startNode = null;
                return true;
            }
            
            // Add Link
            this.addLink(startId, id);
            
            this.startNode.classList.remove('connector-selected');
            this.startNode = null;
        }
        return true;
    },
    
    addLink: function(startId, endId) {
        const link = { startId, endId, color: '#e67e22' };
        
        // Check duplicate
        const existsIndex = this.links.findIndex(l => 
            (l.startId === startId && l.endId === endId) || 
            (l.startId === endId && l.endId === startId)
        );
        
        if (existsIndex >= 0) {
            // Remove (Toggle)
            this.links.splice(existsIndex, 1);
        } else {
            this.links.push(link);
        }
        
        this.saveLinks();
        this.render();
    },
    
    saveLinks: function() {
        if (!this.getContextId) return;
        const contextId = this.getContextId();
        if (contextId) {
            localStorage.setItem('connector_links_' + contextId, JSON.stringify(this.links));
        }
    },
    
    loadLinks: function() {
        if (!this.getContextId) return;
        const contextId = this.getContextId();
        if (contextId) {
            const data = localStorage.getItem('connector_links_' + contextId);
            this.links = data ? JSON.parse(data) : [];
            this.render();
        } else {
            this.links = [];
            this.render();
        }
    },
    
    reload: function() {
        this.loadLinks();
    },
    
    updateAllLines: function() {
        this.render();
    },

    render: function() {
        if (!this.svgLayer || !this.container) return;
        this.svgLayer.innerHTML = ''; // Clear
        
        // Resize SVG to match container scrollHeight
        this.svgLayer.style.height = this.container.scrollHeight + 'px';
        this.svgLayer.style.width = this.container.scrollWidth + 'px';

        this.links.forEach(link => {
            const startEl = this.findEl(link.startId);
            const endEl = this.findEl(link.endId);
            
            if (startEl && endEl) {
                this.drawLine(startEl, endEl, link.color);
            }
        });
    },
    
    findEl: function(id) {
        return document.querySelector(`[data-idx="${id}"]`) || document.querySelector(`[data-note-id="${id}"]`);
    },
    
    drawLine: function(startEl, endEl, color) {
        const startRect = startEl.getBoundingClientRect();
        const endRect = endEl.getBoundingClientRect();
        const containerRect = this.container.getBoundingClientRect();
        
        // Calculate coordinates relative to container
        const scrollTop = this.container.scrollTop;
        const scrollLeft = this.container.scrollLeft;
        
        // Correct calculation for absolute SVG inside relative container
        const x1 = startRect.left - containerRect.left + scrollLeft + (startRect.width / 2);
        const y1 = startRect.bottom - containerRect.top + scrollTop;
        const x2 = endRect.left - containerRect.left + scrollLeft + (endRect.width / 2);
        const y2 = endRect.top - containerRect.top + scrollTop;
        
        // Draw Curve
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        
        const yDiff = Math.abs(y1 - y2);
        
        let d = "";
        
        if (yDiff < 20) {
            // Same line roughly (connect side-by-side or far apart)
            const midX = (x1 + x2) / 2;
            const arcH = 25; // Height of arc
            d = `M ${x1} ${y1} Q ${midX} ${y1 + arcH}, ${x2} ${y2}`;
        } else {
            // Different lines (S-curve)
            const cp1x = x1;
            const cp1y = y1 + 30;
            const cp2x = x2;
            const cp2y = y2 - 30;
            d = `M ${x1} ${y1} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${x2} ${y2}`;
        }
        
        path.setAttribute("d", d);
        path.setAttribute("stroke", color);
        path.setAttribute("stroke-width", "2");
        path.setAttribute("fill", "none");
        path.setAttribute("stroke-linecap", "round");
        path.style.transition = "d 0.3s ease";
        path.style.pointerEvents = "none"; // Let clicks pass through
        
        this.svgLayer.appendChild(path);
    }
};

window.Connector = Connector;
