
/* 
    ConnectorGraph.js 
    Tree/Hierarchy Builder for Sentence Construction
    Allows arranging words into indented rows (Sentence Diagram).
*/

const ConnectorGraph = {
    isOpen: false,
    containerId: 'connector-graph-modal',
    
    // State for Linking
    isLinking: false,
    linkingChildId: null,

    init: function() {
        if (document.getElementById(this.containerId)) return;
        
        // Create Modal HTML
        const modal = document.createElement('div');
        modal.id = this.containerId;
        modal.className = 'connector-graph-modal';
        modal.style.display = 'none';
        modal.innerHTML = `
            <div class="connector-graph-content">
                <div class="connector-graph-header">
                    <h3>ตัวสร้างโครงสร้างประโยค (Sentence Builder)</h3>
                    <div class="graph-controls">
                        <button class="btn-save" onclick="ConnectorGraph.manualSave()">
                            <i class="fa-solid fa-save"></i> บันทึก
                        </button>
                         <button class="btn-reset" onclick="ConnectorGraph.resetAll()">
                            <i class="fa-solid fa-rotate-left"></i> ล้างทั้งหมด
                        </button>
                        <button class="close-btn" onclick="ConnectorGraph.close()"><i class="fa-solid fa-times"></i></button>
                    </div>
                </div>
                <div class="connector-graph-body">
                    <div class="graph-pane left-pane">
                        <h4>คำศัพท์ (Word Bank)</h4>
                        <div id="graph-word-bank" class="word-container"></div>
                    </div>
                    <div class="graph-pane right-pane">
                        <h4>พื้นที่จัดเรียง (Structure Canvas)</h4>
                        <div id="graph-canvas" class="canvas-container">
                            <svg id="graph-svg-layer">
                                <defs>
                                    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                                        <polygon points="0 0, 10 3.5, 0 7" fill="#3498db" />
                                    </marker>
                                </defs>
                            </svg>
                            <!-- Rows will be generated here -->
                        </div>
                        <button class="btn-add-row" onclick="ConnectorGraph.addRow()">+ เพิ่มบรรทัดใหม่</button>
                    </div>
                </div>
            </div>
            <style>
                .connector-graph-modal {
                    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                    background: rgba(0,0,0,0.8); z-index: 2000;
                    display: flex; justify-content: center; align-items: center;
                    font-family: 'Sarabun', sans-serif;
                }
                .connector-graph-content {
                    background: white; width: 95%; height: 95%; border-radius: 12px;
                    display: flex; flex-direction: column; overflow: hidden;
                    box-shadow: 0 10px 25px rgba(0,0,0,0.5);
                }
                .connector-graph-header {
                    padding: 15px 20px; border-bottom: 1px solid #eee; display: flex; justify-content: space-between; align-items: center;
                    background: linear-gradient(to right, #ffffff, #f8f9fa);
                }
                .connector-graph-header h3 { margin: 0; color: #2c3e50; font-weight: 600; display: flex; align-items: center; gap: 10px; }
                .connector-graph-header h3::before { content: '🏗️'; font-size: 1.2em; }
                
                .graph-controls { display: flex; align-items: center; gap: 8px; }

                .connector-graph-body {
                    flex: 1; display: flex; overflow: hidden; background: #f0f2f5;
                }
                .graph-pane {
                    padding: 15px; overflow-y: auto;
                    display: flex; flex-direction: column;
                }
                .left-pane {
                    width: 250px; /* Fixed width as requested to shrink */
                    border-right: 1px solid #ddd; background: #ffffff;
                    flex-shrink: 0;
                }
                .right-pane {
                    flex: 1; /* Take remaining space */
                    background: #ffffff;
                    position: relative;
                    background-image: radial-gradient(#e1e1e1 1px, transparent 1px);
                    background-size: 20px 20px; /* Dot grid pattern */
                }
                .word-container {
                    flex: 1; display: flex; flex-wrap: wrap; align-content: flex-start; gap: 6px;
                    padding: 5px; 
                    min-height: 200px;
                }
                
                /* Word Bank Items - Smaller */
                #graph-word-bank .word-card {
                    padding: 2px 8px; font-size: 12px; background: #f8f9fa; border: 1px solid #ddd;
                    color: #555; border-radius: 12px;
                }
                #graph-word-bank .word-card:hover { background: #e9ecef; border-color: #bbb; color: #333; }
                
                .canvas-container {
                    flex: 1; display: flex; flex-direction: column; gap: 0;
                    padding: 30px; /* More padding for presentation */
                    position: relative; /* For SVG positioning */
                    min-height: 100%; /* Ensure full height */
                }
                
                #graph-svg-layer {
                    position: absolute;
                    top: 0; left: 0; width: 100%; height: 100%;
                    pointer-events: none; /* Let clicks pass through */
                    z-index: 0;
                    overflow: visible;
                }
                
                /* SVG Line Styles */
                .word-link-line {
                    stroke: #3498db;
                    stroke-width: 2;
                    fill: none;
                    marker-end: url(#arrowhead);
                    transition: stroke 0.2s, stroke-width 0.2s;
                    pointer-events: stroke; /* Enable interaction even if parent is none */
                }
                .word-link-line:hover {
                    stroke: #e74c3c;
                    stroke-width: 4;
                    cursor: pointer;
                }
                
                .graph-row {
                    display: flex; align-items: flex-start;
                    min-height: auto;
                    position: relative;
                    border-bottom: none;
                    padding-bottom: 0;
                    margin-bottom: 4px; /* More breathing room */
                    z-index: 1; /* Above SVG */
                }
                
                /* Tree Connection Line - Anchored to Row (Parent Indent) */
                .graph-row[data-has-line="true"]::before {
                    content: '';
                    position: absolute;
                    /* Vertical Line starts at Parent Indent + Controls Width (110px) + Offset */
                    left: calc(110px + var(--parent-indent) * 40px + 12px); 
                    /* Horizontal Line stretches from Parent to Current Indent */
                    width: calc((var(--indent) - var(--parent-indent)) * 40px - 5px);
                    
                    /* Dynamic Vertical Position based on Parent Location */
                    top: calc(var(--line-top) * 1px);
                    height: calc(var(--line-height) * 1px);
                    
                    border-left: 2px solid #bdc3c7;
                    border-bottom: 2px solid #bdc3c7;
                    border-bottom-left-radius: 12px;
                    pointer-events: none;
                    z-index: 1;
                }
                
                .row-controls {
                    display: flex; flex-direction: row; gap: 4px;
                    margin-right: 8px;
                    width: 110px; /* Fixed width to ensure stable alignment */
                    flex-shrink: 0;
                    opacity: 0;
                    transition: opacity 0.2s;
                    align-items: center;
                    margin-top: 5px; /* Align with text */
                    /* Fixed at start, does not indent */
                }
                .graph-row:hover .row-controls { opacity: 1; }
                .graph-row.linking-source .row-controls { opacity: 1; } /* Keep controls visible when linking */
                
                .btn-row-ctrl {
                    border: none; background: #fff; color: #95a5a6;
                    width: 24px; height: 24px; border-radius: 50%; /* Circle buttons */
                    cursor: pointer; font-size: 11px;
                    display: flex; align-items: center; justify-content: center;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
                    transition: all 0.2s;
                }
                .btn-row-ctrl:hover { background: #3498db; color: #fff; transform: translateY(-1px); box-shadow: 0 3px 6px rgba(0,0,0,0.15); }
                .btn-row-ctrl.delete:hover { background: #e74c3c; }
                .btn-row-ctrl.active-link { background: #f1c40f; color: white; }
                
                /* Linking Mode Styles */
                .graph-canvas.linking-mode .graph-row { opacity: 0.4; pointer-events: none; }
                .graph-canvas.linking-mode .graph-row.linking-source { opacity: 1; pointer-events: auto; border: 2px dashed #f1c40f; border-radius: 8px; }
                .graph-canvas.linking-mode .graph-row.linking-target { opacity: 1; pointer-events: auto; cursor: pointer; border: 2px solid #2ecc71; border-radius: 8px; background: #e8f8f5; }
                .graph-canvas.linking-mode .graph-row.linking-target:hover { background: #d1f2eb; transform: scale(1.01); }
                
                .row-content {
                    flex: 1; display: flex; flex-wrap: wrap; gap: 6px; align-items: center;
                    padding: 4px 8px; border: 1px dashed transparent; border-radius: 6px;
                    min-height: 36px;
                    transition: margin-left 0.2s; /* Animate indentation */
                    position: relative; /* For tree line positioning */
                }
                .graph-row:hover .row-content { border-color: #f0f0f0; background: rgba(248,249,250,0.5); }
                .row-content.drag-over {
                    background-color: #e3f2fd; border-color: #2196f3; border-style: solid;
                }
                
                /* Canvas Word Cards - Presentation Style */
                #graph-canvas .word-card {
                    padding: 6px 14px; background: white; border: 1px solid #dcdcdc; border-radius: 6px;
                    cursor: grab; font-size: 16px; user-select: none; /* Larger font */
                    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
                    display: flex; align-items: center; gap: 5px;
                    font-weight: 500; color: #2c3e50;
                    transition: transform 0.1s, box-shadow 0.1s;
                }
                #graph-canvas .word-card:hover { border-color: #3498db; transform: translateY(-1px); box-shadow: 0 4px 8px rgba(0,0,0,0.08); }
                #graph-canvas .word-card.is-dragging { opacity: 0.5; transform: scale(0.95); }
                
                .word-card { /* Base class (reset by specifics above) */
                    padding: 4px 10px; background: white; border: 1px solid #ccc; border-radius: 4px;
                    cursor: grab; font-size: 14px; user-select: none;
                    box-shadow: 0 1px 1px rgba(0,0,0,0.05);
                    display: flex; align-items: center; gap: 5px;
                    position: relative; /* For anchors */
                }
                
                /* Word Anchors */
                .word-anchor {
                    position: absolute;
                    width: 10px; height: 10px;
                    background: #bdc3c7;
                    border: 1px solid #fff;
                    border-radius: 50%;
                    opacity: 0;
                    transition: opacity 0.2s, transform 0.2s, background 0.2s;
                    cursor: crosshair;
                    z-index: 10;
                }
                .word-card:hover .word-anchor { opacity: 0.5; }
                .word-anchor:hover { transform: scale(1.4); opacity: 1 !important; background: #e74c3c; border-color: #e74c3c; }
                
                .anchor-top { top: -6px; left: 50%; transform: translateX(-50%); }
                .anchor-right { top: 50%; right: -6px; transform: translateY(-50%); }
                .anchor-bottom { bottom: -6px; left: 50%; transform: translateX(-50%); }
                .anchor-left { top: 50%; left: -6px; transform: translateY(-50%); }

                /* .seq-badge removed */
                
                .btn-add-row {
                    margin-top: 15px; padding: 12px;
                    background: white; border: 2px dashed #dce1e6;
                    color: #7f8c8d; cursor: pointer; border-radius: 8px;
                    width: 100%; text-align: center; font-weight: 600;
                    transition: all 0.2s;
                }
                .btn-add-row:hover { background: #f8f9fa; border-color: #3498db; color: #3498db; }
                
                .close-btn { background: none; border: none; font-size: 1.5em; cursor: pointer; color: #95a5a6; transition: color 0.2s; }
                .close-btn:hover { color: #e74c3c; }
                
                .btn-save { 
                    background: #2ecc71; color: white; border: none; 
                    padding: 6px 14px; border-radius: 20px; cursor: pointer; font-size: 13px; font-weight: 600;
                    transition: all 0.2s; margin-right: 8px; display: flex; align-items: center; gap: 5px;
                    box-shadow: 0 2px 4px rgba(46, 204, 113, 0.2);
                }
                .btn-save:hover { background: #27ae60; transform: translateY(-1px); box-shadow: 0 4px 8px rgba(46, 204, 113, 0.3); }

                .btn-reset { 
                    background: white; color: #e74c3c; border: 1px solid #e74c3c; 
                    padding: 6px 14px; border-radius: 20px; cursor: pointer; font-size: 13px; font-weight: 600;
                    transition: all 0.2s;
                }
                .btn-reset:hover { background: #e74c3c; color: white; }
                
                /* Scrollbar Styling */
                .graph-pane::-webkit-scrollbar { width: 6px; }
                .graph-pane::-webkit-scrollbar-track { background: #f1f1f1; }
                .graph-pane::-webkit-scrollbar-thumb { background: #ccc; border-radius: 3px; }
                .graph-pane::-webkit-scrollbar-thumb:hover { background: #aaa; }

            </style>
        `;
        document.body.appendChild(modal);
        
        this.setupDragDrop();
    },

    open: function() {
        this.init();
        document.getElementById(this.containerId).style.display = 'flex';
        this.isOpen = true;
        this.render();
    },

    close: function() {
        const el = document.getElementById(this.containerId);
        if (el) el.style.display = 'none';
        this.isOpen = false;
    },
    
    manualSave: function() {
        this.saveState();
        if (typeof showToast === 'function') {
            showToast('บันทึกโครงสร้างประโยคเรียบร้อยแล้ว', 'success');
        } else {
            alert('บันทึกโครงสร้างประโยคเรียบร้อยแล้ว');
        }
    },

    // Default Colors for Rows (cycled)
    rowColors: ['#e74c3c', '#3498db', '#2ecc71', '#9b59b6', '#f1c40f', '#e67e22'],

    render: function() {
        const bank = document.getElementById('graph-word-bank');
        const canvas = document.getElementById('graph-canvas');
        if (!bank || !canvas) return;

        bank.innerHTML = '';
        // Restore SVG Layer
        canvas.innerHTML = `
            <svg id="graph-svg-layer">
                <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#3498db" />
                    </marker>
                </defs>
            </svg>
        `;

        // 1. Get all words
        let wordContainer = document.getElementById('paliContent');
        
        // Handle Reader Mode (Multi-sentence)
        if (!wordContainer && document.getElementById('pageContent')) {
            const page = document.getElementById('pageContent');
            if (typeof window.currentConnectorSentenceIndex !== 'undefined' && window.currentConnectorSentenceIndex !== null) {
                 // Specific sentence
                 wordContainer = page.children[window.currentConnectorSentenceIndex];
            } else {
                 wordContainer = page;
            }
        }
        
        // Fallback to Connector container if set
        if (!wordContainer && window.Connector && window.Connector.container) {
            wordContainer = window.Connector.container;
        }

        if (!wordContainer) return;

        const wordElements = Array.from(wordContainer.querySelectorAll('.word-span'));
        const allWords = wordElements.map(el => {
            // Clone and remove badges/numbers to get clean text
            const clone = el.cloneNode(true);
            clone.querySelectorAll('.connector-badge, sup').forEach(n => n.remove());
            
            const id = el.getAttribute('data-idx') || el.getAttribute('data-note-id');
            if (!id) return null;

            return {
                id: id,
                text: clone.innerText.trim()
            };
        }).filter(w => w && w.text.length > 0);

        // 2. Load Layout
        let layout = Connector.layout || [];
        
        // Migration: If no layout but sequences exist, create layout from sequences
        if (layout.length === 0 && Object.keys(Connector.sequences || {}).length > 0) {
            layout = this.migrateFromSequences(Connector.sequences);
        }
        
        // If still empty, create one default row
        if (layout.length === 0) {
            layout = [{ id: 'row-' + Date.now(), color: this.rowColors[0], indent: 0, words: [] }];
        }

        const usedWordIds = new Set();

        // 3. Render Rows
        layout.forEach(row => {
            const rowEl = this.createRowEl(row);
            const contentEl = rowEl.querySelector('.row-content');
            
            // Render words in this row
            if (row.words && row.words.length > 0) {
                row.words.forEach((wordId, idx) => {
                    const word = allWords.find(w => w.id === wordId);
                    if (word) {
                        usedWordIds.add(wordId);
                        const isHighlighted = row.highlights && row.highlights.includes(wordId);
                        const card = this.createWordCard(word, row.color, isHighlighted); // Pass color
                        // We will number them sequentially later or in real-time?
                        // For now, let's just append. Numbering happens in saveState/re-render.
                        contentEl.appendChild(card);
                    }
                });
            }
            canvas.appendChild(rowEl);
        });

        // 4. Populate Word Bank (Unused Words)
        allWords.forEach(word => {
            if (!usedWordIds.has(word.id)) {
                const card = this.createWordCard(word, null);
                bank.appendChild(card);
            }
        });
        
        // 5. Update Badges based on current visual order
        this.updateBadges();
        
        // 6. Update Connection Lines
        this.updateLines();
        
        // 7. Update Word Links
        this.updateWordLines();
    },

    updateLines: function() {
        const rows = Array.from(document.querySelectorAll('.graph-row'));
        rows.forEach((row, idx) => {
            const currentIndent = parseInt(row.getAttribute('data-indent') || 0);
            const explicitParentId = row.getAttribute('data-parent-id');
            
            let parentRow = null;
            let parentIndent = 0;
            
            // 1. Try Explicit Parent
            if (explicitParentId) {
                parentRow = document.getElementById(explicitParentId);
                // Validate parent still exists and is above (optional, but safer)
                // If parent is below, the line drawing might look weird but we allow it for flexibility
            }
            
            // 2. Fallback to Auto Parent (Nearest Previous with smaller indent)
            if (!parentRow) {
                for (let i = idx - 1; i >= 0; i--) {
                    const prevIndent = parseInt(rows[i].getAttribute('data-indent') || 0);
                    if (prevIndent < currentIndent) {
                        parentRow = rows[i];
                        break;
                    }
                }
            }
            
            if (parentRow) {
                parentIndent = parseInt(parentRow.getAttribute('data-indent') || 0);
                
                // Calculate geometry
                const rowRect = row.getBoundingClientRect();
                const parentRect = parentRow.getBoundingClientRect();
                
                // Vertical Line Logic:
                // Starts from Parent's baseline area.
                // Ends at Child's curve start (approx 20px down from Child Top).
                // "top" CSS property is relative to Child Top.
                
                // Distance from Child Top to Parent Bottom
                const offsetTop = parentRect.bottom - rowRect.top; 
                
                // We want line to start slightly inside the parent (e.g. 10px up from bottom)
                // And go down to Child Top + 20px.
                // So Top = offsetTop - 10.
                // Height = Abs(Top) + 20.
                
                const lineTop = offsetTop - 10;
                const lineHeight = Math.abs(lineTop) + 20;
                
                row.style.setProperty('--line-top', lineTop);
                row.style.setProperty('--line-height', lineHeight);
                row.style.setProperty('--indent', currentIndent);
                row.style.setProperty('--parent-indent', parentIndent);
                
                // Only show line if indented > 0 or has explicit parent (even if indent 0?)
                // Usually root nodes (indent 0) don't have lines. 
                // But if user manually links Row 0 to something, maybe they want a line?
                // Let's stick to currentIndent > 0 OR explicitParentId present.
                
                if (currentIndent > 0 || explicitParentId) {
                     row.setAttribute('data-has-line', 'true');
                } else {
                     row.removeAttribute('data-has-line');
                }
            } else {
                row.removeAttribute('data-has-line');
            }
        });
    },

    migrateFromSequences: function(sequences) {
        // Group by color
        const groups = {};
        Object.entries(sequences).forEach(([id, val]) => {
            let color = '#e74c3c';
            let num = val;
            if (typeof val === 'object') {
                color = val.color || '#e74c3c';
                num = val.num;
            }
            if (!groups[color]) groups[color] = [];
            groups[color].push({ id, num });
        });
        
        // Convert to Rows
        const newLayout = [];
        Object.keys(groups).forEach((color, idx) => {
            // Sort by num
            groups[color].sort((a, b) => a.num - b.num);
            newLayout.push({
                id: 'row-mig-' + idx,
                color: color,
                indent: 0,
                parentId: null, // Init with null
                words: groups[color].map(item => item.id)
            });
        });
        return newLayout;
    },

    createRowEl: function(row) {
        const div = document.createElement('div');
        div.className = 'graph-row';
        div.id = row.id;
        div.setAttribute('data-color', row.color);
        div.setAttribute('data-indent', row.indent);
        if (row.parentId) div.setAttribute('data-parent-id', row.parentId);
        
        // Add click handler for linking target
        div.onclick = (e) => {
            if (ConnectorGraph.isLinking) {
                // Prevent self-linking or circular (simple check)
                if (div.id !== ConnectorGraph.linkingChildId) {
                    ConnectorGraph.setParent(ConnectorGraph.linkingChildId, div.id);
                }
            }
        };

        const linkBtnClass = row.parentId ? 'btn-row-ctrl active-link' : 'btn-row-ctrl';
        
        div.innerHTML = `
            <div class="row-controls">
                <button class="${linkBtnClass}" onclick="event.stopPropagation(); ConnectorGraph.toggleLinkMode('${row.id}')" title="เชื่อมโยงเส้น (Link)"><i class="fa-solid fa-link"></i></button>
                <button class="btn-row-ctrl" onclick="event.stopPropagation(); ConnectorGraph.changeIndent('${row.id}', -1)" title="ขยับซ้าย"><i class="fa-solid fa-chevron-left"></i></button>
                <button class="btn-row-ctrl" onclick="event.stopPropagation(); ConnectorGraph.changeIndent('${row.id}', 1)" title="ขยับขวา"><i class="fa-solid fa-chevron-right"></i></button>
                <button class="btn-row-ctrl" onclick="event.stopPropagation(); ConnectorGraph.changeColor('${row.id}')" title="เปลี่ยนสี" style="color:${row.color}"><i class="fa-solid fa-circle"></i></button>
                <button class="btn-row-ctrl delete" onclick="event.stopPropagation(); ConnectorGraph.removeRow('${row.id}')" title="ลบบรรทัด"><i class="fa-solid fa-times"></i></button>
            </div>
            <div class="row-content" style="margin-left: ${(row.indent * 40)}px"></div>
        `;
        return div;
    },

    createWordCard: function(word, color, isHighlighted) {
        const div = document.createElement('div');
        div.className = 'word-card';
        if (isHighlighted) {
            div.classList.add('is-highlighted');
            div.style.backgroundColor = color;
            div.style.color = 'white';
            div.style.borderColor = color;
        }
        div.draggable = true;
        div.setAttribute('data-id', word.id);
        
        // Context Menu for Highlight Toggle
        div.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            e.stopPropagation();
            ConnectorGraph.toggleHighlight(word.id);
        });
        
        // Anchors
        const positions = ['top', 'right', 'bottom', 'left'];
        positions.forEach(pos => {
            const anchor = document.createElement('div');
            anchor.className = `word-anchor anchor-${pos}`;
            anchor.setAttribute('data-pos', pos);
            anchor.onmousedown = (e) => ConnectorGraph.handleAnchorMouseDown(e, word.id, pos);
            div.appendChild(anchor);
        });

        // Removed badge creation completely
        
        div.appendChild(document.createTextNode(word.text));
        
        return div;
    },

    updateBadges: function() {
        // Function disabled to prevent any number badges from appearing
    },

    addRow: function() {
        const layout = this.getLayoutFromDOM();
        const nextColor = this.rowColors[layout.length % this.rowColors.length];
        layout.push({
            id: 'row-' + Date.now(),
            color: nextColor,
            indent: 0,
            parentId: null,
            words: []
        });
        Connector.layout = layout;
        this.render(); // Re-render to show new row
        this.saveState();
    },

    removeRow: function(rowId) {
        if (confirm('ลบบรรทัดนี้? คำศัพท์จะกลับไปที่คลังคำ')) {
            const layout = this.getLayoutFromDOM();
            const idx = layout.findIndex(r => r.id === rowId);
            if (idx !== -1) {
                // Clear parentId for any row that pointed to this one
                layout.forEach(r => {
                    if (r.parentId === rowId) r.parentId = null;
                });
                
                layout.splice(idx, 1);
                Connector.layout = layout;
                this.render();
                this.saveState();
            }
        }
    },
    
    toggleHighlight: function(wordId) {
        const card = document.querySelector(`.word-card[data-id="${wordId}"]`);
        if (card) {
            card.classList.toggle('is-highlighted');
            // Re-apply styles if highlighted, or remove if not
            const row = card.closest('.graph-row');
            if (row) {
                const color = row.getAttribute('data-color');
                if (card.classList.contains('is-highlighted')) {
                    card.style.backgroundColor = color;
                    card.style.color = 'white';
                    card.style.borderColor = color;
                } else {
                    card.style.backgroundColor = '';
                    card.style.color = '';
                    card.style.borderColor = '';
                }
            }
            this.saveState();
        }
    },
    
    toggleLinkMode: function(rowId) {
        if (this.isLinking) {
            // Cancel if clicking same row or just toggle off
            this.isLinking = false;
            this.linkingChildId = null;
            document.getElementById('graph-canvas').classList.remove('linking-mode');
            document.querySelectorAll('.graph-row').forEach(r => {
                r.classList.remove('linking-source');
                r.classList.remove('linking-target');
            });
            
            // If clicking same row that has a parent, maybe we want to clear the parent?
            const row = document.getElementById(rowId);
            if (row && row.getAttribute('data-parent-id')) {
                 if (confirm('ยกเลิกการเชื่อมโยงเส้น? (Remove Link)')) {
                     this.setParent(rowId, null);
                 }
            }
        } else {
            // Start Linking
            this.isLinking = true;
            this.linkingChildId = rowId;
            const canvas = document.getElementById('graph-canvas');
            canvas.classList.add('linking-mode');
            
            const rows = document.querySelectorAll('.graph-row');
            let foundSource = false;
            
            // Mark source
            document.getElementById(rowId).classList.add('linking-source');
            
            // Mark targets (only rows BEFORE the source, to maintain flow? or ANY row?)
            // Allowing any row allows flexible graph but might be confusing.
            // Let's allow ANY row except self.
            rows.forEach(r => {
                if (r.id !== rowId) {
                    r.classList.add('linking-target');
                }
            });
        }
    },
    
    setParent: function(childId, parentId) {
        const layout = this.getLayoutFromDOM();
        const child = layout.find(r => r.id === childId);
        if (child) {
            child.parentId = parentId;
            Connector.layout = layout;
            
            // Reset UI
            this.isLinking = false;
            this.linkingChildId = null;
            document.getElementById('graph-canvas').classList.remove('linking-mode');
            
            this.render();
            this.saveState();
        }
    },

    changeIndent: function(rowId, delta) {
        const row = document.getElementById(rowId);
        if (row) {
            let indent = parseInt(row.getAttribute('data-indent') || 0);
            indent += delta;
            if (indent < 0) indent = 0;
            if (indent > 10) indent = 10;
            
            // row.style.marginLeft = (indent * 40) + 'px'; // REMOVED
            row.querySelector('.row-content').style.marginLeft = (indent * 40) + 'px';
            
            row.setAttribute('data-indent', indent);
            this.saveState();
            this.updateLines();
            this.updateWordLines();
        }
    },
    
    changeColor: function(rowId) {
        const row = document.getElementById(rowId);
        if (row) {
            let currentColor = row.getAttribute('data-color');
            let idx = this.rowColors.indexOf(currentColor);
            let nextColor = this.rowColors[(idx + 1) % this.rowColors.length];
            
            row.setAttribute('data-color', nextColor);
            row.querySelector('.btn-row-ctrl[title="เปลี่ยนสี"]').style.color = nextColor;
            
            // Update badges in this row
            // row.querySelectorAll('.seq-badge').forEach(b => b.style.backgroundColor = nextColor);
            
            this.saveState();
        }
    },

    resetAll: function() {
        if(confirm('ล้างข้อมูลทั้งหมด?')) {
            Connector.sequences = {};
            Connector.links = [];
            Connector.layout = [];
            Connector.saveData();
            Connector.render();
            this.render();
        }
    },

    getLayoutFromDOM: function() {
        const rows = document.querySelectorAll('.graph-row');
        const layout = [];
        
        rows.forEach(row => {
            const id = row.id;
            const color = row.getAttribute('data-color');
            const indent = parseInt(row.getAttribute('data-indent') || 0);
            const parentId = row.getAttribute('data-parent-id') || null;
            const words = Array.from(row.querySelectorAll('.word-card')).map(c => c.getAttribute('data-id'));
            const highlights = Array.from(row.querySelectorAll('.word-card.is-highlighted')).map(c => c.getAttribute('data-id'));
            
            layout.push({ id, color, indent, parentId, words, highlights });
        });
        return layout;
    },

    saveState: function() {
        const layout = this.getLayoutFromDOM();
        
        // Reconstruct Connector.sequences and Connector.links
        const newSequences = {};
        const newLinks = [];
        let seqCounter = 1;
        let prevWordId = null;

        layout.forEach(row => {
            row.words.forEach(wordId => {
                newSequences[wordId] = {
                    num: seqCounter++,
                    color: row.color
                };
                
                // Link from previous word to this word (Linear)
                if (prevWordId) {
                    newLinks.push({
                        startId: prevWordId,
                        endId: wordId,
                        color: row.color // Or maybe sequence color?
                    });
                }
                prevWordId = wordId;
            });
        });

        Connector.layout = layout;
        Connector.sequences = newSequences;
        Connector.links = newLinks;
        Connector.saveData();
        Connector.render(); // Update main view
    },

    // Word Linking Logic
    activeAnchor: null,
    tempLine: null,
    
    handleAnchorMouseDown: function(e, wordId, pos) {
        e.stopPropagation();
        e.preventDefault();
        this.activeAnchor = { wordId, pos, el: e.target };
        
        // Create temp line
        const svg = document.getElementById('graph-svg-layer');
        if (!svg) return;
        
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('class', 'word-link-line');
        path.style.strokeDasharray = '5,5';
        svg.appendChild(path);
        this.tempLine = path;
        
        // Bind functions to this instance for event listeners
        this._boundMouseMove = this.handleAnchorMouseMove.bind(this);
        this._boundMouseUp = this.handleAnchorMouseUp.bind(this);
        
        document.addEventListener('mousemove', this._boundMouseMove);
        document.addEventListener('mouseup', this._boundMouseUp);
    },
    
    handleAnchorMouseMove: function(e) {
        if (!this.activeAnchor) return;
        const startRect = this.activeAnchor.el.getBoundingClientRect();
        const svg = document.getElementById('graph-svg-layer');
        const svgRect = svg.getBoundingClientRect();
        
        const startX = startRect.left + startRect.width/2 - svgRect.left;
        const startY = startRect.top + startRect.height/2 - svgRect.top;
        
        const endX = e.clientX - svgRect.left;
        const endY = e.clientY - svgRect.top;
        
        // Simple Curve for temp line
        const d = `M ${startX} ${startY} L ${endX} ${endY}`;
        this.tempLine.setAttribute('d', d);
    },
    
    handleAnchorMouseUp: function(e) {
        document.removeEventListener('mousemove', this._boundMouseMove);
        document.removeEventListener('mouseup', this._boundMouseUp);
        
        if (this.tempLine) {
            this.tempLine.remove();
            this.tempLine = null;
        }
        
        // Hide standard linking UI to avoid confusion
        const targetEl = document.elementFromPoint(e.clientX, e.clientY);
        if (targetEl && targetEl.classList.contains('word-anchor')) {
            const targetWordId = targetEl.parentElement.getAttribute('data-id');
            const targetPos = targetEl.getAttribute('data-pos');
            
            if (targetWordId && targetWordId !== this.activeAnchor.wordId) {
                this.addWordLink(
                    this.activeAnchor.wordId,
                    targetWordId,
                    this.activeAnchor.pos,
                    targetPos
                );
            }
        }
        
        this.activeAnchor = null;
    },
    
    addWordLink: function(startId, endId, startAnchor, endAnchor) {
        Connector.wordLinks = Connector.wordLinks || [];
        // Check duplicate
        const exists = Connector.wordLinks.find(l => 
            l.startId === startId && l.endId === endId && 
            l.startAnchor === startAnchor && l.endAnchor === endAnchor
        );
        if (!exists) {
            Connector.wordLinks.push({
                id: 'link-' + Date.now(),
                startId, endId, startAnchor, endAnchor
            });
            Connector.saveData();
            this.updateWordLines();
        }
    },
    
    removeWordLink: function(linkId) {
        if (confirm('ลบเส้นเชื่อมโยงนี้?')) {
            Connector.wordLinks = Connector.wordLinks.filter(l => l.id !== linkId);
            Connector.saveData();
            this.updateWordLines();
        }
    },
    
    updateWordLines: function() {
        const svg = document.getElementById('graph-svg-layer');
        if (!svg) return;
        
        // Remove existing permanent lines
        Array.from(svg.querySelectorAll('.permanent-link')).forEach(el => el.remove());
        
        const links = Connector.wordLinks || [];
        links.forEach(link => {
            const startCard = document.querySelector(`.word-card[data-id="${link.startId}"]`);
            const endCard = document.querySelector(`.word-card[data-id="${link.endId}"]`);
            
            if (startCard && endCard) {
                // Find anchors
                const startAnchor = startCard.querySelector(`.anchor-${link.startAnchor}`);
                const endAnchor = endCard.querySelector(`.anchor-${link.endAnchor}`);
                
                if (startAnchor && endAnchor) {
                    const startRect = startAnchor.getBoundingClientRect();
                    const endRect = endAnchor.getBoundingClientRect();
                    const svgRect = svg.getBoundingClientRect();
                    
                    const x1 = startRect.left + startRect.width/2 - svgRect.left;
                    const y1 = startRect.top + startRect.height/2 - svgRect.top;
                    const x2 = endRect.left + endRect.width/2 - svgRect.left;
                    const y2 = endRect.top + endRect.height/2 - svgRect.top;
                    
                    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                    path.setAttribute('class', 'word-link-line permanent-link');
                    
                    // Curve Logic
                    let cp1x = x1, cp1y = y1, cp2x = x2, cp2y = y2;
                    const curve = 40;
                    
                    if (link.startAnchor === 'top') cp1y -= curve;
                    else if (link.startAnchor === 'bottom') cp1y += curve;
                    else if (link.startAnchor === 'left') cp1x -= curve;
                    else if (link.startAnchor === 'right') cp1x += curve;
                    
                    if (link.endAnchor === 'top') cp2y -= curve;
                    else if (link.endAnchor === 'bottom') cp2y += curve;
                    else if (link.endAnchor === 'left') cp2x -= curve;
                    else if (link.endAnchor === 'right') cp2x += curve;
                    
                    const d = `M ${x1} ${y1} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${x2} ${y2}`;
                    
                    path.setAttribute('d', d);
                    path.onclick = (e) => {
                        e.stopPropagation();
                        ConnectorGraph.removeWordLink(link.id);
                    };
                    
                    svg.appendChild(path);
                }
            }
        });
    },

    // Drag & Drop Logic
    draggedEl: null,
    
    setupDragDrop: function() {
        document.addEventListener('dragstart', (e) => {
            if (e.target.classList.contains('word-card')) {
                this.draggedEl = e.target;
                e.target.classList.add('is-dragging');
                e.dataTransfer.effectAllowed = 'move';
            }
        });

        document.addEventListener('dragend', (e) => {
            if (e.target.classList.contains('word-card')) {
                e.target.classList.remove('is-dragging');
                this.draggedEl = null;
                this.saveState();
                this.updateWordLines();
            }
        });

        document.addEventListener('dragover', (e) => {
            e.preventDefault();
            const rowContent = e.target.closest('.row-content');
            const wordBank = e.target.closest('#graph-word-bank');
            
            if (rowContent) {
                rowContent.classList.add('drag-over');
                const afterElement = this.getDragAfterElement(rowContent, e.clientX, e.clientY);
                if (this.draggedEl) {
                    if (afterElement == null) {
                        rowContent.appendChild(this.draggedEl);
                    } else {
                        rowContent.insertBefore(this.draggedEl, afterElement);
                    }
                }
            } else if (wordBank) {
                 if (this.draggedEl) wordBank.appendChild(this.draggedEl);
            }
            
            document.querySelectorAll('.row-content').forEach(el => {
                if (el !== rowContent) el.classList.remove('drag-over');
            });
        });
        
        document.addEventListener('dragleave', (e) => {
             const rowContent = e.target.closest('.row-content');
             if (rowContent) rowContent.classList.remove('drag-over');
        });
    },

    getDragAfterElement: function(container, x, y) {
        const draggableElements = [...container.querySelectorAll('.word-card:not(.is-dragging)')];
        
        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = x - box.left - box.width / 2;
            
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }
};

window.ConnectorGraph = ConnectorGraph;
