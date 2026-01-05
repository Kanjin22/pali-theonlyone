/* Dhammapada Online Vue 3 Application */
const { createApp } = Vue;

createApp({
    data() {
        return {
            // Core data
            currentBook: null,
            currentPage: null,
            availablePages: [],
            currentData: [],
            viewMode: 'column',
            displayMode: 'both',
            tocData: [],
            fontSize: 100,
            
            // Translation properties
            dictionary: [],
            selectedWord: '',
            lastTranslatedWord: '',
            currentHighlightedWord: null,
            translationInitialized: false,
            translationOffcanvas: null,
            searchMode: 'pali',
            
            // Search properties
            searchInitialized: false,
            searchTermIndex: 1,
            
            // UI state
            lastScrollTop: 0,
            isNavVisible: true,
            expandedDetails: new Set(),
            
            // Word-by-word translation
            wordByWordData: {},
            wordByWordWarningShown: this.getWordByWordWarningStatus(),
            
            // Punctuation hiding
            isPunctuationHidden: false,

            // Highlight System
            wordHighlights: {},
            wordNotes: {},
            selectedWord: null,
            selectedWordElement: null,
            showFloatingMenu: false,
            floatingMenuPosition: { x: 0, y: 0 },
            currentNote: '',
            activeNoteKey: null,
            notePosition: { x: 0, y: 0 },

            // Text Selection System
            showSelectionMenu: false,
            selectionMenuPosition: { x: 0, y: 0 },
            selectedRange: null,
            textSelections: [],
            
            // UI Color Palette
            highlightColors: [
                { name: 'light-yellow', value: '#FFFFD0' },
                { name: 'yellow', value: '#ffe46e' },
                { name: 'apricot', value: '#FFE5CA' },
                { name: 'orange', value: '#FFD8A9' },
                { name: 'peach', value: '#FFDDD2' },
                { name: 'pink', value: '#ffc8dd' },
                { name: 'coral', value: '#FFB4B4' },
                { name: 'green', value: '#b5e48c' },
                { name: 'mint', value: '#B5F1CC' },
                { name: 'sage', value: '#D1E7DD' },
                { name: 'blue', value: '#a2d2ff' },
                { name: 'lavender', value: '#E7E0FF' },
                { name: 'purple', value: '#E5B8F4' }
            ],
            
            // Export Settings
            exportSettings: {
                selectedBook: '',
                fromPage: '',
                toPage: '',
                format: 'pali-thai',
                fontSize: '18',
                numberingStyle: 'number',
                includePunctuation: true,
                replacePeriodWithPaiyannoi: false
            },

            // Page Status
            pageStatuses: {},

        }
    },
    
    computed: {
        
        floatingMenuStyles() {
            return {
                top: `${this.floatingMenuPosition.y}px`,
                left: `${this.floatingMenuPosition.x}px`
            };
        },
        
        floatingNoteStyles() {
            return {
                top: `${this.notePosition.y}px`,
                left: `${this.notePosition.x}px`
            };
        },

        selectionMenuStyles() {
            return {
                top: `${this.selectionMenuPosition.y}px`,
                left: `${this.selectionMenuPosition.x}px`
            };
        },
        
        // Export computed properties
        canExport() {
            return this.exportSettings.selectedBook && 
                   this.exportSettings.fromPage && 
                   this.exportSettings.toPage &&
                   parseInt(this.exportSettings.fromPage) <= parseInt(this.exportSettings.toPage);
        }
    },
    
    watch: {
        'exportSettings.selectedBook'(newBook) {
            if (newBook) {
                this.loadAvailablePagesForExport(newBook);
            } else {
                this.availablePages = [];
            }
            // Reset page selections when book changes
            this.exportSettings.fromPage = '';
            this.exportSettings.toPage = '';
        }
    },
    
    async mounted() {
        this.initializeElements();
        this.bindEvents();
        this.loadFromLocalStorage();
        this.loadFontSize();
        this.loadHighlightData();
        this.loadBracketData();
        this.loadTextSelections();

        // Document event listeners
        document.addEventListener('click', this.handleDocumentClick);
        document.addEventListener('mouseup', this.handleTextSelection);
    },
    
    methods: {
        initializeElements() {
            // Get DOM elements
            this.bookSelect = document.getElementById('bookSelect');
            this.pageSelect = document.getElementById('pageSelect');
            this.tocSelect = document.getElementById('tocSelect');
            this.prevPageBtn = document.getElementById('prevPage');
            this.nextPageBtn = document.getElementById('nextPage');
            this.prevPageBottomBtn = document.getElementById('prevPageBottom');
            this.nextPageBottomBtn = document.getElementById('nextPageBottom');
            this.backToBookSelectionBtn = document.getElementById('backToBookSelection');
            this.viewModeSelect = document.getElementById('viewMode');
            this.displayModeSelect = document.getElementById('displayMode');
            this.lineViewOptions = document.getElementById('lineViewOptions');
            this.revealAllBtn = document.getElementById('revealAll');
            this.hideAllBtn = document.getElementById('hideAll');
            this.hidePunctuationBtn = document.getElementById('hidePunctuation');
            this.searchBtn = document.getElementById('searchBtn');
            this.decreaseFontBtn = document.getElementById('decreaseFontSize');
            this.increaseFontBtn = document.getElementById('increaseFontSize');
            this.resetFontBtn = document.getElementById('resetFontSize');
            this.fontSizeDisplay = document.getElementById('fontSizeDisplay');
            
            this.loadingMessage = document.getElementById('loadingMessage');
            this.bookGrid = document.getElementById('bookGrid');
            this.columnView = document.getElementById('columnView');
            this.lineView = document.getElementById('lineView');
            this.pageInfo = document.getElementById('pageInfo');
            this.bottomNavigation = document.getElementById('bottomNavigation');
            this.navigationControls = document.querySelector('.navigation-controls');
            this.panelToggle = document.getElementById('panelToggle');
            this.mainTitle = document.getElementById('mainTitle');
        },
        
        bindEvents() {
            this.bookSelect.addEventListener('change', () => this.onBookChange());
            this.pageSelect.addEventListener('change', () => this.onPageChange());
            this.prevPageBtn.addEventListener('click', () => this.goToPrevPage());
            this.nextPageBtn.addEventListener('click', () => this.goToNextPage());
            this.prevPageBottomBtn.addEventListener('click', () => this.goToPrevPage());
            this.nextPageBottomBtn.addEventListener('click', () => this.goToNextPage());
            this.backToBookSelectionBtn.addEventListener('click', () => this.backToBookSelection());
            this.viewModeSelect.addEventListener('change', () => this.onViewModeChange());
            this.displayModeSelect.addEventListener('change', () => this.onDisplayModeChange());
            this.revealAllBtn.addEventListener('click', () => this.revealAllThai());
            this.hideAllBtn.addEventListener('click', () => this.hideAllThai());
            this.hidePunctuationBtn.addEventListener('click', () => this.togglePunctuation());
            
            // Word-by-word button
            this.searchBtn.addEventListener('click', () => this.openSearchOffcanvas());
            this.decreaseFontBtn.addEventListener('click', () => this.decreaseFontSize());
            this.increaseFontBtn.addEventListener('click', () => this.increaseFontSize());
            this.resetFontBtn.addEventListener('click', () => this.resetFontSize());
            
            window.addEventListener('scroll', () => this.handleScroll());
            this.panelToggle.addEventListener('click', () => this.toggleNavigationPanel());
            
            // Initialize from URL parameters
            this.initializeFromURL();
            
            // Setup browser back/forward button handling
            window.addEventListener('popstate', (event) => this.handlePopState(event));
            
            // Make methods globally accessible for onclick handlers
            window.ebookReader = this;
        },

        // URL Management Functions
        updateURL() {
            const params = new URLSearchParams();
            
            if (this.currentBook) {
                params.set('book', this.currentBook);
            }
            
            if (this.currentPage) {
                params.set('page', this.currentPage);
            }
            
            if (this.viewMode && this.viewMode !== 'column') {
                params.set('view', this.viewMode);
            }
            
            if (this.displayMode && this.displayMode !== 'both') {
                params.set('display', this.displayMode);
            }
            
            const url = window.location.pathname + (params.toString() ? '?' + params.toString() : '');
            
            // Use pushState to update URL without page reload
            // Only store simple data that can be cloned
            const stateData = {
                book: this.currentBook ? String(this.currentBook) : null,
                page: this.currentPage ? String(this.currentPage) : null,
                view: this.viewMode ? String(this.viewMode) : null,
                display: this.displayMode ? String(this.displayMode) : null
            };

            try {
                window.history.pushState(stateData, '', url);
            } catch (e) {
                // Fallback if pushState fails
                console.warn('Failed to update history state:', e);
                // Still update the URL without state
                window.history.replaceState(null, '', url);
            }
        },

        loadFromURL() {
            const urlParams = new URLSearchParams(window.location.search);
            
            const book = urlParams.get('book');
            const page = urlParams.get('page');
            const view = urlParams.get('view');
            const display = urlParams.get('display');
            
            return {
                book: book ? parseInt(book) : null,
                page: page ? parseInt(page) : null,
                view: view || 'column',
                display: display || 'both'
            };
        },

        async initializeFromURL() {
            const urlState = this.loadFromURL();
            
            if (urlState.book) {
                // Set view mode and display mode before loading book
                this.viewMode = urlState.view;
                this.viewModeSelect.value = urlState.view;
                this.displayMode = urlState.display;
                this.displayModeSelect.value = urlState.display;
                
                // Update UI based on modes
                this.lineViewOptions.style.display = this.viewMode === 'line' ? 'flex' : 'none';
                this.updateRevealButtons();
                
                // Load the book and page
                await this.selectBookFromGrid(urlState.book);
                
                if (urlState.page && this.availablePages.includes(urlState.page)) {
                    this.pageSelect.value = urlState.page;
                    await this.onPageChange();
                }
            }
        },

        handlePopState(event) {
            if (event.state) {
                // Browser back/forward button was pressed
                this.currentBook = event.state.book;
                this.currentPage = event.state.page;
                this.viewMode = event.state.view || 'column';
                this.displayMode = event.state.display || 'both';
                
                // Update UI elements
                this.bookSelect.value = this.currentBook || '';
                this.pageSelect.value = this.currentPage || '';
                this.viewModeSelect.value = this.viewMode;
                this.displayModeSelect.value = this.displayMode;
                
                // Re-render content with new state
                if (this.currentBook && this.currentPage) {
                    this.onPageChange();
                } else if (!this.currentBook) {
                    this.resetContent();
                }
            }
        },
        
        async selectBookFromGrid(bookNumber) {
            this.bookSelect.value = bookNumber;
            this.bookGrid.style.display = 'none';
            this.showLoading();
            
            this.currentBook = parseInt(bookNumber);
            await this.loadAvailablePages();
            await this.loadTableOfContents();
            await this.loadPageStatuses(bookNumber);
            
            const hasSettings = await this.loadBookSettings(parseInt(bookNumber));
            
            if (!hasSettings && this.availablePages.length > 0) {
                const firstPage = this.availablePages[0];
                this.pageSelect.value = firstPage;
                this.currentPage = firstPage;
            } else if (this.availablePages.length === 0) {
                this.resetPage();
                return;
            }
            
            await this.onPageChange();
            this.onViewModeChange();
            this.onDisplayModeChange();
            this.saveToLocalStorage();
        },
        
        async onBookChange() {
            const bookId = this.bookSelect.value;
            if (!bookId) {
                this.resetPage();
                return;
            }
            
            this.currentBook = parseInt(bookId);
            await this.loadAvailablePages();
            await this.loadTableOfContents();
            await this.loadPageStatuses(this.currentBook);
            
            if (this.availablePages.length > 0) {
                const firstPage = this.availablePages[0];
                this.pageSelect.value = firstPage;
                await this.onPageChange();
            } else {
                this.resetPage();
            }
        },
        
        async loadAvailablePages() {
            try {
                const response = await fetch(`api/get_pages.php?book=${this.currentBook}`);
                const data = await response.json();
                
                if (data.error) {
                    console.error('Error:', data.error);
                    return;
                }
                
                this.availablePages = data.pages || [];
                this.populatePageSelect();
            } catch (error) {
                console.error('Error loading pages:', error);
            }
        },
        
        populatePageSelect() {
            this.pageSelect.innerHTML = '<option value="">เลือก</option>';
            this.availablePages.forEach(page => {
                const option = document.createElement('option');
                option.value = page;
                option.textContent = `${page}`;
                this.pageSelect.appendChild(option);
            });
            this.pageSelect.disabled = this.availablePages.length === 0;
        },
        
        async loadTableOfContents() {
            try {
                const response = await fetch(`api/get_toc.php?book=${this.currentBook}`);
                const data = await response.json();
                
                if (data.error) {
                    console.error('Error:', data.error);
                    return;
                }
                
                this.tocData = data.toc || [];
                this.populateTocSelect();
            } catch (error) {
                console.error('Error loading table of contents:', error);
            }
        },
        
        populateTocSelect() {
            if ($(this.tocSelect).hasClass('select2-hidden-accessible')) {
                $(this.tocSelect).select2('destroy');
            }
            
            this.tocSelect.innerHTML = '<option value="">เลือกเรื่อง</option>';
            this.tocData.forEach((chapter, index) => {
                const option = document.createElement('option');
                option.value = index;
                // Add page range to title display
                let displayText = chapter.title;
                if (chapter.pageStart && chapter.pageEnd) {
                    if (chapter.pageStart === chapter.pageEnd) {
                        displayText += ` น.${chapter.pageStart}`;
                    } else {
                        displayText += ` น.${chapter.pageStart}-${chapter.pageEnd}`;
                    }
                }
                option.textContent = displayText;
                this.tocSelect.appendChild(option);
            });
            
            $(this.tocSelect).select2({
                placeholder: 'ค้นหาเรื่อง...',
                allowClear: true,
                disabled: this.tocData.length === 0,
                language: {
                    noResults: function() {
                        return "ไม่พบผลลัพธ์";
                    },
                    searching: function() {
                        return "กำลังค้นหา...";
                    }
                }
            });
            
            $(this.tocSelect).off('change.toc').on('change.toc', () => {
                this.onTocChange();
            });
            
            this.tocSelect.disabled = this.tocData.length === 0;
        },
        
        async onPageChange() {
            const pageId = this.pageSelect.value;
            if (!pageId || !this.currentBook) {
                this.resetContent();
                return;
            }
            
            this.currentPage = parseInt(pageId);
            await this.loadPageContent();
            this.updateNavigationButtons();
            this.updatePageInfo();
            this.updateTocSelection();
            this.saveToLocalStorage();
            this.updateURL(); // Add URL update
        },
        
        async onTocChange() {
            const tocIndex = $(this.tocSelect).val();
            if (!tocIndex || tocIndex === '') {
                return;
            }
            
            const selectedChapter = this.tocData[parseInt(tocIndex)];
            if (selectedChapter && selectedChapter.pageStart) {
                this.pageSelect.value = selectedChapter.pageStart;
                await this.onPageChange();
            }
        },
        
        getCurrentChapter() {
            if (!this.currentPage || this.tocData.length === 0) {
                return null;
            }
            
            return this.tocData.find(chapter => {
                const pageStart = chapter.pageStart;
                const pageEnd = chapter.pageEnd;
                
                if (!pageEnd || pageEnd === 0) {
                    const currentChapterIndex = this.tocData.indexOf(chapter);
                    const nextChapter = this.tocData[currentChapterIndex + 1];
                    
                    if (nextChapter) {
                        return this.currentPage >= pageStart && this.currentPage < nextChapter.pageStart;
                    } else {
                        return this.currentPage >= pageStart;
                    }
                }
                
                return this.currentPage >= pageStart && this.currentPage <= pageEnd;
            });
        },
        
        updateTocSelection() {
            if (!this.currentPage || this.tocData.length === 0) {
                return;
            }
            
            const currentChapter = this.getCurrentChapter();
            const currentChapterIndex = currentChapter ? this.tocData.indexOf(currentChapter) : -1;
            
            if (currentChapterIndex >= 0) {
                $(this.tocSelect).off('change.toc');
                $(this.tocSelect).val(currentChapterIndex).trigger('change');
                $(this.tocSelect).on('change.toc', () => {
                    this.onTocChange();
                });
            } else {
                $(this.tocSelect).off('change.toc');
                $(this.tocSelect).val('').trigger('change');
                $(this.tocSelect).on('change.toc', () => {
                    this.onTocChange();
                });
            }
        },
        
        async loadPageContent() {
            try {
                this.showLoading();
                
                const response = await fetch(
                    `api/get_lines.php?book=${this.currentBook}&page_start=${this.currentPage}&per_page=1000`
                );
                const data = await response.json();
                
                if (data.error) {
                    console.error('Error:', data.error);
                    return;
                }
                
                this.currentData = data.lines || [];
                this.renderContent();
                this.hideLoading();
                
                // Ensure highlights are applied after page load
                setTimeout(() => this.applyHighlights(), 200);
            } catch (error) {
                console.error('Error loading content:', error);
                this.hideLoading();
            }
        },
        
        onViewModeChange() {
            this.viewMode = this.viewModeSelect.value;
            this.lineViewOptions.style.display = this.viewMode === 'line' ? 'flex' : 'none';
            this.renderContent();
            this.saveToLocalStorage();
            this.updateURL(); // Add URL update
            
            // Reapply highlights after view mode change
            this.scheduleHighlightApplication();
        },
        
        onDisplayModeChange() {
            this.displayMode = this.displayModeSelect.value;
            this.updateRevealButtons();
            this.renderContent();
            this.saveToLocalStorage();
            this.updateURL(); // Add URL update
            
            // Reapply highlights after display mode change
            this.scheduleHighlightApplication();
        },
        
        updateRevealButtons() {
            const showButtons = this.displayMode === 'quiz';
            this.revealAllBtn.style.display = showButtons ? 'inline-block' : 'none';
            this.hideAllBtn.style.display = showButtons ? 'inline-block' : 'none';
        },
        
        renderContent() {
            if (this.currentData.length === 0) {
                this.resetContent();
                return;
            }
            
            if (this.viewMode === 'column') {
                this.renderColumnView();
            } else {
                this.renderLineView();
            }
            
            this.showContent();
            
            // Apply highlights after content is rendered
            this.scheduleHighlightApplication();
        },
        
        scheduleHighlightApplication() {
            // Clear any existing timeout to avoid multiple calls
            if (this.highlightTimeout) {
                clearTimeout(this.highlightTimeout);
            }

            this.highlightTimeout = setTimeout(() => {
                this.applyHighlights();
                this.loadBracketData();
                this.loadTextSelections();
            }, 400);
        },
        
        renderColumnView() {
            const columnContent = document.getElementById('columnContent');
            columnContent.innerHTML = '';
            
            this.currentData.forEach((item, index) => {
                const rowDiv = document.createElement('div');
                rowDiv.className = 'column-row';
                
                const thaiText = this.processTextForWordClick(item.thai, false, index);
                const paliText = this.processTextForWordClick(item.pali, true, index);
                
                rowDiv.innerHTML = `
                    <div class="column-item">
                        <div class="thai-text text-black w-full">
                            <span class="text-xs text-gray-400 mr-2">${index + 1}.</span>${thaiText}
                        </div>
                    </div>
                    <div class="column-item">
                        <div class="pali-text text-amber-900 w-full">
                            <span class="text-xs text-gray-400 mr-2">${index + 1}.</span>${paliText}
                        </div>
                    </div>
                `;
                
                columnContent.appendChild(rowDiv);
            });
        },
        
        renderLineView() {
            const lineContent = document.getElementById('lineContent');
            lineContent.innerHTML = '';
            
            this.currentData.forEach((item, index) => {
                const sentenceDiv = document.createElement('div');
                sentenceDiv.className = 'sentence-pair';

                let content = '';

                const thaiText = this.processTextForWordClick(item.thai, false, index);
                const paliText = this.processTextForWordClick(item.pali, true, index);
                const thaiAtthaText = item.thai_attha || '';

                if (this.displayMode === 'both') {
                    content = `
                        <div class="pali-text text-amber-900 mb-2" data-original="${item.pali.replace(/"/g, '&quot;')}">
                            <span class="text-xs text-gray-400 mr-2">${index + 1}.</span>${paliText}
                            <button class="word-by-word-btn bg-purple-500 text-white px-2 py-1 rounded text-xs hover:bg-purple-600 ml-2" data-index="${index}">
                                <i class="bi bi-translate"></i>
                            </button>
                        </div>
                        <div class="thai-text text-black" data-original="${item.thai.replace(/"/g, '&quot;')}"><span class="text-xs text-gray-400 mr-2">${index + 1}.</span>${thaiText}</div>
                    `;
                } else if (this.displayMode === 'pali-thai-attha') {
                    content = `
                        <div class="pali-text text-amber-900 mb-2" data-original="${item.pali.replace(/"/g, '&quot;')}">
                            <span class="text-xs text-gray-400 mr-2">${index + 1}.</span>${paliText}
                            <button class="word-by-word-btn bg-purple-500 text-white px-2 py-1 rounded text-xs hover:bg-purple-600 ml-2" data-index="${index}">
                                <i class="bi bi-translate"></i>
                            </button>
                        </div>
                        <div class="thai-text text-black mb-2" data-original="${item.thai.replace(/"/g, '&quot;')}"><span class="text-xs text-gray-400 mr-2">${index + 1}.</span>${thaiText}</div>
                        ${thaiAtthaText ? `<div class="thai-attha-text text-blue-900" data-original="${(item.thai_attha || '').replace(/"/g, '&quot;')}"><span class="text-xs text-gray-400 mr-2">${index + 1}.</span>${thaiAtthaText}</div>` : ''}
                    `;
                } else if (this.displayMode === 'attha-thai-pali') {
                    content = `
                        ${thaiAtthaText ? `<div class="thai-attha-text text-blue-900 mb-2" data-original="${(item.thai_attha || '').replace(/"/g, '&quot;')}"><span class="text-xs text-gray-400 mr-2">${index + 1}.</span>${thaiAtthaText}</div>` : ''}
                        <div class="thai-text text-black mb-2" data-original="${item.thai.replace(/"/g, '&quot;')}"><span class="text-xs text-gray-400 mr-2">${index + 1}.</span>${thaiText}</div>
                        <div class="pali-text text-amber-900 mb-2" data-original="${item.pali.replace(/"/g, '&quot;')}">
                            <span class="text-xs text-gray-400 mr-2">${index + 1}.</span>${paliText}
                            <button class="word-by-word-btn bg-purple-500 text-white px-2 py-1 rounded text-xs hover:bg-purple-600 ml-2" data-index="${index}">
                                <i class="bi bi-translate"></i>
                            </button>
                        </div>
                    `;
                } else if (this.displayMode === 'pali') {
                    content = `
                        <div class="pali-text text-amber-900" data-original="${item.pali.replace(/"/g, '&quot;')}">
                            <span class="text-xs text-gray-400 mr-2">${index + 1}.</span>${paliText}
                            <button class="word-by-word-btn bg-purple-500 text-white px-2 py-1 rounded text-xs hover:bg-purple-600 ml-2" data-index="${index}">
                                <i class="bi bi-translate"></i>
                            </button>
                        </div>
                    `;
                } else if (this.displayMode === 'thai') {
                    content = `<div class="thai-text text-black" data-original="${item.thai.replace(/"/g, '&quot;')}"><span class="text-xs text-gray-400 mr-2">${index + 1}.</span>${thaiText}</div>`;
                } else if (this.displayMode === 'attha') {
                    content = `<div class="thai-attha-text text-blue-900" data-original="${(item.thai_attha || '').replace(/"/g, '&quot;')}"><span class="text-xs text-gray-400 mr-2">${index + 1}.</span>${thaiAtthaText}</div>`;
                } else if (this.displayMode === 'quiz') {
                    content = `
                        <div class="pali-text text-amber-900 mb-2" data-original="${item.pali.replace(/"/g, '&quot;')}">
                            <span class="text-xs text-gray-400 mr-2">${index + 1}.</span>${paliText}
                            <button class="word-by-word-btn bg-purple-500 text-white px-2 py-1 rounded text-xs hover:bg-purple-600 ml-2" data-index="${index}">
                                <i class="bi bi-translate"></i>
                            </button>
                        </div>
                        <div class="thai-text text-black hidden-thai" data-original="${item.thai.replace(/"/g, '&quot;')}" onclick="window.ebookReader.toggleReveal(this)"><div><span class="text-xs text-gray-400 mr-2">${index + 1}.</span>${thaiText}</div></div>
                        <div class="text-xs text-gray-400 mt-1">คลิกที่แถบสีเทาเพื่อดูหรือซ่อนคำแปล</div>
                    `;
                }

                sentenceDiv.innerHTML = content;
                sentenceDiv.dataset.sentenceIndex = item.sentence_index;
                lineContent.appendChild(sentenceDiv);
                
                // Add event listener for word-by-word button if it exists
                const wordByWordBtn = sentenceDiv.querySelector('.word-by-word-btn');
                if (wordByWordBtn) {
                    wordByWordBtn.addEventListener('click', (e) => {
                        e.preventDefault();
                        this.toggleSentenceWordByWord(index, wordByWordBtn);
                    });
                }
            });
        },
        
        revealAllThai() {
            const hiddenElements = document.querySelectorAll('.hidden-thai');
            hiddenElements.forEach(el => el.classList.add('reveal-thai'));
        },
        
        hideAllThai() {
            const revealedElements = document.querySelectorAll('.reveal-thai');
            revealedElements.forEach(el => el.classList.remove('reveal-thai'));
        },
        
        togglePunctuation() {
            this.isPunctuationHidden = !this.isPunctuationHidden;
            
            // Update button appearance
            if (this.isPunctuationHidden) {
                this.hidePunctuationBtn.innerHTML = '<i class="bi bi-eye"></i> แสดงเครื่องหมาย';
                this.hidePunctuationBtn.classList.remove('bg-blue-500', 'hover:bg-blue-600');
                this.hidePunctuationBtn.classList.add('bg-orange-500', 'hover:bg-orange-600');
            } else {
                this.hidePunctuationBtn.innerHTML = '<i class="bi bi-eye-slash"></i> ซ่อนเครื่องหมาย';
                this.hidePunctuationBtn.classList.remove('bg-orange-500', 'hover:bg-orange-600');
                this.hidePunctuationBtn.classList.add('bg-blue-500', 'hover:bg-blue-600');
            }
            
            // Apply/remove punctuation hiding
            this.applyPunctuationToggle();
        },
        
        applyPunctuationToggle() {
            const paliDivs = document.querySelectorAll('.pali-text');
            
            paliDivs.forEach(paliDiv => {
                if (!paliDiv.dataset.originalText) {
                    // Store original text first time
                    paliDiv.dataset.originalText = paliDiv.innerHTML;
                }
                
                // Find and preserve button
                const btn = paliDiv.querySelector('.word-by-word-btn');
                let buttonHtml = '';
                if (btn) {
                    buttonHtml = btn.outerHTML;
                }
                
                if (this.isPunctuationHidden) {
                    // Hide quotes and commas, keep periods
                    let modifiedText = paliDiv.dataset.originalText
                        .replace(/"/g, '')
                        .replace(/"/g, '')
                        .replace(/“/g, '')
                        .replace(/”/g, '')
                        .replace(/,/g, '');
                    
                    // Re-add button
                    if (buttonHtml) {
                        modifiedText = modifiedText.replace(buttonHtml, '') + buttonHtml;
                    }
                    paliDiv.innerHTML = modifiedText;
                } else {
                    // Restore original text
                    paliDiv.innerHTML = paliDiv.dataset.originalText;
                }
                
                // Re-attach event listener to button
                const newBtn = paliDiv.querySelector('.word-by-word-btn');
                if (newBtn) {
                    const index = parseInt(newBtn.dataset.index);
                    newBtn.addEventListener('click', (e) => {
                        e.preventDefault();
                        this.toggleSentenceWordByWord(index, newBtn);
                    });
                }
            });
        },
        
        getWordByWordWarningStatus() {
            try {
                return localStorage.getItem('wordByWordWarningShown') === 'true';
            } catch (e) {
                return false;
            }
        },
        
        setWordByWordWarningShown() {
            try {
                localStorage.setItem('wordByWordWarningShown', 'true');
                this.wordByWordWarningShown = true;
            } catch (e) {
                // Fallback if localStorage is not available
                this.wordByWordWarningShown = true;
            }
        },
        
        // Word-by-word translation methods - per sentence
        async toggleSentenceWordByWord(sentenceIndex, btn) {
            // Show warning modal on first use
            if (!this.wordByWordWarningShown) {
                const confirmed = await this.showWordByWordWarning();
                if (!confirmed) {
                    return; // User cancelled
                }
                this.setWordByWordWarningShown();
            }
            
            // Check actual DOM state - look for word-by-word translation div
            const lineViewContent = document.getElementById('lineContent');
            const sentenceDiv = lineViewContent.children[sentenceIndex];
            const hasTranslation = sentenceDiv.querySelector('.word-by-word-translation');
            
            if (hasTranslation) {
                // Currently showing word-by-word, so hide it
                btn.innerHTML = '<i class="bi bi-translate"></i>';
                btn.classList.remove('bg-orange-500', 'hover:bg-orange-600');
                btn.classList.add('bg-purple-500', 'hover:bg-purple-600');
                
                this.hideSentenceWordByWord(sentenceIndex);
            } else {
                // Currently showing normal text, so show word-by-word
                // Show loading state
                btn.innerHTML = '<i class="bi bi-arrow-clockwise spinner-loading"></i>';
                btn.disabled = true;
                btn.classList.remove('bg-purple-500', 'hover:bg-purple-600');
                btn.classList.add('bg-gray-500');
                
                try {
                    await this.showSentenceWordByWord(sentenceIndex);
                    
                    // Success state - show hide icon
                    btn.innerHTML = '<i class="bi bi-eye-slash"></i>';
                    btn.classList.remove('bg-gray-500');
                    btn.classList.add('bg-orange-500', 'hover:bg-orange-600');
                    btn.disabled = false;
                } catch (error) {
                    // Error state - revert to original icon
                    btn.innerHTML = '<i class="bi bi-translate"></i>';
                    btn.classList.remove('bg-gray-500');
                    btn.classList.add('bg-purple-500', 'hover:bg-purple-600');
                    btn.disabled = false;
                    console.error('Error loading word-by-word:', error);
                }
            }
        },
        
        showWordByWordWarning() {
            return new Promise((resolve) => {
                // Create modal HTML
                const modalHtml = `
                    <div class="modal fade" id="wordByWordWarningModal" tabindex="-1" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">
                                        <i class="bi bi-exclamation-triangle-fill text-warning me-2"></i>
                                        การแปลยกศัพท์ (ทดลอง)
                                    </h5>
                                </div>
                                <div class="modal-body">
                                    <p class="mb-3">การแปลยกศัพท์ยังอยู่ในการทดลอง อาจจะยังมีข้อผิดพลาด</p>
                                    <p class="mb-0 text-muted">ขอให้พิจารณาคำแปลจริงประกอบไปด้วยนะครับ</p>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-primary" id="confirmWordByWord">
                                        เข้าใจแล้ว
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                
                // Add modal to DOM
                document.body.insertAdjacentHTML('beforeend', modalHtml);
                
                // Show modal
                const modal = new bootstrap.Modal(document.getElementById('wordByWordWarningModal'));
                modal.show();
                
                // Handle confirm button
                document.getElementById('confirmWordByWord').addEventListener('click', () => {
                    modal.hide();
                    resolve(true);
                });
                
                // Clean up when modal is hidden
                document.getElementById('wordByWordWarningModal').addEventListener('hidden.bs.modal', () => {
                    document.getElementById('wordByWordWarningModal').remove();
                });
            });
        },
        
        async showSentenceWordByWord(sentenceIndex) {
            const lineViewContent = document.getElementById('lineContent');
            if (!lineViewContent) return;
            
            const sentenceDiv = lineViewContent.children[sentenceIndex];
            if (!sentenceDiv) return;
            
            const paliText = this.currentData[sentenceIndex].pali;
            const thaiText = this.currentData[sentenceIndex].thai;
            
            try {
                const translations = await this.getWordByWordTranslation(paliText, thaiText);
                this.insertWordByWordTranslation(sentenceDiv, translations.pali_ordered, translations.thai_ordered, translations.thai_words);
            } catch (error) {
                console.error('Error getting word-by-word translation:', error);
                throw error; // Re-throw to handle in toggle function
            }
        },
        
        hideSentenceWordByWord(sentenceIndex) {
            const lineViewContent = document.getElementById('lineContent');
            if (!lineViewContent) return;
            
            const sentenceDiv = lineViewContent.children[sentenceIndex];
            if (!sentenceDiv) return;
            
            // Remove the word-by-word translation div
            const wordByWordDiv = sentenceDiv.querySelector('.word-by-word-translation');
            if (wordByWordDiv) {
                wordByWordDiv.remove();
            }
        },
        
        insertWordByWordTranslation(sentenceDiv, paliOrderedTranslations, thaiOrderedTranslations, thaiWords) {
            // Remove existing translation if any
            const existingTranslation = sentenceDiv.querySelector('.word-by-word-translation');
            if (existingTranslation) {
                existingTranslation.remove();
            }
            
            // Create word-by-word translation div
            const translationDiv = document.createElement('div');
            translationDiv.className = 'word-by-word-translation mt-2 mb-2 p-3 bg-gray-50 rounded border-l-4 border-purple-400';
            
            // Build translation content - Pali order
            let html = '<div class="text-xs text-gray-600 mb-2">แปลยกศัพท์ (เรียงตามบาลี):</div>';
            html += '<div class="leading-relaxed mb-3 text-lg">';
            
            const paliTranslationParts = [];
            paliOrderedTranslations.forEach(translation => {
                const isNotFound = translation.thai_translation === '(ไม่พบ)';

                if (isNotFound) {
                    // Check if we have dictionary_meaning as fallback
                    if (translation.dictionary_meaning) {
                        // Use dictionary meaning with lower confidence indication
                        const showPercentage = translation.confidence_score < 50;
                        paliTranslationParts.push(`
                            <span class="font-semibold text-amber-800">${translation.pali_word}</span>
                            <span class="text-blue-600 ml-1">${translation.dictionary_meaning}</span>
                            ${showPercentage ? `<span class="text-gray-400 text-xs ml-1">(${translation.confidence_score}%)</span>` : ''}
                        `);
                    } else {
                        // For truly not found words: show "คำบาลี ไม่พบ" in red
                        paliTranslationParts.push(`
                            <span class="font-semibold text-amber-800">${translation.pali_word}</span>
                            <span class="text-red-600 text-sm ml-1">ไม่พบ</span>
                        `);
                    }
                } else {
                    // For found words: show normal format with optional %
                    const showPercentage = translation.confidence_score < 50;
                    
                    let translationText = `
                        <span class="font-semibold text-amber-800">${translation.pali_word}</span>
                        <span class="text-gray-600">(</span><span class="text-gray-700">${translation.thai_translation}</span>
                    `;
                    
                    if (showPercentage) {
                        const confidenceClass = this.getConfidenceClass(translation.confidence_score);
                        translationText += `<span class="text-xs px-1 py-0.5 rounded ${confidenceClass} ml-1">${translation.confidence_score}%</span>`;
                    }
                    
                    translationText += `<span class="text-gray-600">)</span>`;
                    paliTranslationParts.push(translationText);
                }
            });
            
            html += paliTranslationParts.join(' ');
            html += '</div>';
            
            // Build translation content - Thai order (complete Thai with Pali translations)
            html += '<div class="text-xs text-gray-600 mb-2">แปลยกศัพท์ (เรียงตามไทย):</div>';
            html += '<div class="leading-relaxed text-lg">';
            
            // Create a map of Thai words to their Pali translations
            const thaiToPaliMap = {};
            thaiOrderedTranslations.forEach(translation => {
                if (translation.thai_translation !== '(ไม่พบ)') {
                    thaiToPaliMap[translation.thai_translation] = translation;
                }
            });
            
            const completeThaiParts = [];
            thaiWords.forEach(thaiWord => {
                if (thaiToPaliMap[thaiWord]) {
                    // Found corresponding Pali word
                    const translation = thaiToPaliMap[thaiWord];
                    const showPercentage = translation.confidence_score < 50;
                    
                    let translationText = `
                        <span class="text-gray-700">${thaiWord}</span>
                        <span class="text-gray-600">(</span><span class="font-semibold text-amber-800">${translation.pali_word}</span>
                    `;
                    
                    if (showPercentage) {
                        const confidenceClass = this.getConfidenceClass(translation.confidence_score);
                        translationText += `<span class="text-xs px-1 py-0.5 rounded ${confidenceClass} ml-1">${translation.confidence_score}%</span>`;
                    }
                    
                    translationText += `<span class="text-gray-600">)</span>`;
                    completeThaiParts.push(translationText);
                } else {
                    // Thai word without corresponding Pali translation - show as gap
                    completeThaiParts.push(`<span class="text-gray-500">${thaiWord}</span>`);
                }
            });
            
            html += completeThaiParts.join(' ');
            html += '</div>';
            translationDiv.innerHTML = html;
            
            // Insert between pali and thai divs
            const paliDiv = sentenceDiv.querySelector('.pali-text');
            const thaiDiv = sentenceDiv.querySelector('.thai-text');
            
            if (paliDiv && thaiDiv) {
                sentenceDiv.insertBefore(translationDiv, thaiDiv);
            } else {
                // Fallback: append to sentence div
                sentenceDiv.appendChild(translationDiv);
            }
        },
        
        inlineWordByWordTranslation(paliDiv, translations, sentenceIndex) {
            // Store original content if not already stored
            if (!paliDiv.dataset.original) {
                paliDiv.dataset.original = paliDiv.innerHTML;
            }
            
            // Find and preserve the button
            const btn = paliDiv.querySelector('.word-by-word-btn');
            let buttonHtml = '';
            if (btn) {
                buttonHtml = btn.outerHTML;
            }
            
            // Build new content with inline translations
            const lineNumber = sentenceIndex + 1;
            let newContent = `<span class="text-xs text-gray-400 mr-2">${lineNumber}.</span>`;
            
            // Create inline translation parts
            const translationParts = [];
            translations.forEach(translation => {
                const isNotFound = translation.thai_translation === '(ไม่พบ)';

                if (isNotFound) {
                    // Check if we have dictionary_meaning as fallback
                    if (translation.dictionary_meaning) {
                        // Use dictionary meaning with lower confidence indication
                        const showPercentage = translation.confidence_score < 50;
                        translationParts.push(`
                            <span class="font-semibold text-amber-800">${translation.pali_word}</span>
                            <span class="text-gray-600">(</span><span class="text-blue-600">${translation.dictionary_meaning}</span>
                            ${showPercentage ? `<span class="text-gray-400 text-xs ml-1">${translation.confidence_score}%</span>` : ''}
                            <span class="text-gray-600">)</span>
                        `);
                    } else {
                        // For truly not found words: show "คำบาลี ไม่พบ" in red
                        translationParts.push(`
                            <span class="font-semibold text-amber-800">${translation.pali_word}</span>
                            <span class="text-red-600 text-sm ml-1">ไม่พบ</span>
                        `);
                    }
                } else {
                    // For found words: show normal format with optional %
                    const showPercentage = translation.confidence_score < 50;
                    
                    let translationText = `
                        <span class="font-semibold text-amber-800">${translation.pali_word}</span>
                        <span class="text-gray-600">(</span><span class="text-gray-700">${translation.thai_translation}</span>
                    `;
                    
                    if (showPercentage) {
                        const confidenceClass = this.getConfidenceClass(translation.confidence_score);
                        translationText += `<span class="text-xs px-1 py-0.5 rounded ${confidenceClass} ml-1">${translation.confidence_score}%</span>`;
                    }
                    
                    translationText += `<span class="text-gray-600">)</span>`;
                    translationParts.push(translationText);
                }
            });
            
            newContent += translationParts.join(' ') + buttonHtml;
            paliDiv.innerHTML = newContent;
            
            // Re-attach event listener to the new button
            const newBtn = paliDiv.querySelector('.word-by-word-btn');
            if (newBtn) {
                newBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.toggleSentenceWordByWord(sentenceIndex, newBtn);
                });
            }
        },
        
        
        
        async getWordByWordTranslation(paliSentence, thaiSentence) {
            // Use cleaned text for cache key
            const cleanPali = this.cleanTextForTranslation(paliSentence);
            const cleanThai = this.cleanTextForTranslation(thaiSentence);
            
            // console.log('Original:', paliSentence, '|', thaiSentence);
            // console.log('Cleaned:', cleanPali, '|', cleanThai);
            
            const cacheKey = `${cleanPali}_${cleanThai}`;
            
            // Check cache first
            if (this.wordByWordData[cacheKey]) {
                return this.wordByWordData[cacheKey];
            }
            
            const response = await fetch('/page/dhammabot/api/word-by-word-clean.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    pali: cleanPali,
                    thai: cleanThai
                })
            });
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            const data = await response.json();
            
            if (data.error) {
                throw new Error(data.error);
            }
            
            // Cache the result
            this.wordByWordData[cacheKey] = {
                pali_ordered: data.word_translations,
                thai_ordered: data.thai_ordered_translations,
                thai_words: data.thai_words
            };
            
            return {
                pali_ordered: data.word_translations,
                thai_ordered: data.thai_ordered_translations,
                thai_words: data.thai_words
            };
        },
        
        cleanTextForTranslation(text) {
            if (!text) return '';
            
            // Remove symbols that shouldn't be translated
            const symbolsToRemove = ['!', ',', ':', '"', "'", '“', '”',];
            let cleanText = text;
            
            symbolsToRemove.forEach(symbol => {
                cleanText = cleanText.replace(new RegExp(symbol.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), ' ');
            });
            
            return cleanText.trim();
        },
        
        getConfidenceClass(score) {
            if (score >= 80) return 'bg-green-100 text-green-800';
            if (score >= 60) return 'bg-blue-100 text-blue-800';
            if (score >= 40) return 'bg-orange-100 text-orange-800';
            return 'bg-red-100 text-red-800';
        },
        
        formatGrammarInfo(analysis) {
            if (!analysis || analysis.type === 'unknown') return '';
            
            let info = [];
            
            if (analysis.type === 'minor_verb') {
                info.push('กิริยากิตก์');
                if (analysis.tense) {
                    const tenseNames = {
                        'present': 'ปัจจุบัน',
                        'past': 'อดีต',
                        'begging': 'ควร'
                    };
                    info.push(tenseNames[analysis.tense] || analysis.tense);
                }
                if (analysis.paccaya) {
                    info.push(`ปัจจัย: ${analysis.paccaya}`);
                }
            } else if (analysis.type === 'verb') {
                info.push('กิริยา');
                if (analysis.tense) {
                    const tenseNames = {
                        'present': 'ปัจจุบัน',
                        'past': 'อดีต',
                        'future': 'อนาคต',
                        'command': 'อาณัติ'
                    };
                    info.push(tenseNames[analysis.tense] || analysis.tense);
                }
                if (analysis.person) {
                    const personNames = {
                        'ปฐมบุรุษ': '๑',
                        'มัธยมบุรุษ': '๒',
                        'อุตตมบุรุษ': '๓'
                    };
                    info.push(personNames[analysis.person] || analysis.person);
                }
                if (analysis.number === 'plural') info.push('พหุ');
            } else if (analysis.type === 'noun') {
                info.push('นาม');
                if (analysis.declension) {
                    const declNames = ['', 'ป.', 'ทุ.', 'ต.', 'จ.', 'ปญ.', 'ฉ.', 'ส.', 'อา.'];
                    info.push(declNames[analysis.declension] || analysis.declension);
                }
                if (analysis.number === 'plural') info.push('พหุ');
            }
            
            return info.length > 0 ? `(${info.join(' ')})` : '';
        },
        
        goToPrevPage() {
            const currentIndex = this.availablePages.indexOf(this.currentPage);
            if (currentIndex > 0) {
                const prevPage = this.availablePages[currentIndex - 1];
                this.pageSelect.value = prevPage;
                this.onPageChange();
            }
        },
        
        goToNextPage() {
            const currentIndex = this.availablePages.indexOf(this.currentPage);
            if (currentIndex < this.availablePages.length - 1) {
                const nextPage = this.availablePages[currentIndex + 1];
                this.pageSelect.value = nextPage;
                this.onPageChange();
            }
        },
        
        updateNavigationButtons() {
            const currentIndex = this.availablePages.indexOf(this.currentPage);
            const isFirst = currentIndex <= 0;
            const isLast = currentIndex >= this.availablePages.length - 1;
            
            this.prevPageBtn.disabled = isFirst;
            this.nextPageBtn.disabled = isLast;
            this.prevPageBottomBtn.disabled = isFirst;
            this.nextPageBottomBtn.disabled = isLast;
        },
        
        updatePageInfo() {
            const currentIndex = this.availablePages.indexOf(this.currentPage);
            const pageInfoText = document.getElementById('pageInfoText');
            
            const currentChapter = this.getCurrentChapter();
            const chapterTitle = currentChapter ? currentChapter.title : '';
            
            let infoText = `หน้า ${this.currentPage} (${currentIndex + 1}/${this.availablePages.length}) | ${this.currentData.length} ประโยค`;
            if (chapterTitle) {
                infoText += ` | ${chapterTitle}`;
            }

            // Check for page status
            const pageStatus = this.pageStatuses[this.currentPage];
            if (pageStatus && pageStatus.checked) {
                infoText += `<br><span class="text-success">ตรวจแล้ว โดย ${pageStatus.checked_by}</span>`;
            }
            
            pageInfoText.innerHTML = infoText;
        },
        
        showLoading() {
            this.loadingMessage.innerHTML = '<div class="text-gray-500">กำลังโหลด...</div>';
            this.loadingMessage.style.display = 'block';
            this.hideContent();
        },
        
        hideLoading() {
            this.loadingMessage.style.display = 'none';
        },
        
        showContent() {
            this.bookGrid.style.display = 'none';
            this.mainTitle.style.display = 'none';
            this.columnView.style.display = this.viewMode === 'column' ? 'grid' : 'none';
            this.lineView.style.display = this.viewMode === 'line' ? 'block' : 'none';
            this.pageInfo.style.display = 'block';
            this.bottomNavigation.style.display = 'block';
            
            document.getElementById('footerCredits').style.display = 'none';
            
            this.navigationControls.style.display = 'block';
            this.navigationControls.classList.remove('hidden');
            this.panelToggle.style.display = 'none';
            this.isNavVisible = true;
            
            const mainContent = document.querySelector('.main-content');
            mainContent.classList.add('has-nav');
            mainContent.classList.remove('book-grid-view');
        },
        
        hideContent() {
            this.columnView.style.display = 'none';
            this.lineView.style.display = 'none';
            this.pageInfo.style.display = 'none';
            this.bottomNavigation.style.display = 'none';
        },

        async loadPageStatuses(bookId) {
            try {
                const response = await fetch(`api/get_page_status.php?book=${bookId}`);
                const data = await response.json();
                
                if (data.success) {
                    this.pageStatuses = {};
                    data.pages.forEach(page => {
                        this.pageStatuses[page.page] = page;
                    });
                }
            } catch (error) {
                console.error('Error loading page statuses:', error);
            }
        },
        
        showBookGrid() {
            this.bookGrid.style.display = 'grid';
            this.mainTitle.style.display = 'block';
            this.hideContent();
            this.loadingMessage.style.display = 'none';
            
            this.navigationControls.style.display = 'none';
            this.panelToggle.style.display = 'none';
            
            document.getElementById('footerCredits').style.display = 'block';
            
            const mainContent = document.querySelector('.main-content');
            mainContent.classList.add('book-grid-view');
            mainContent.classList.remove('has-nav');
        },
        
        backToBookSelection() {
            this.bookSelect.value = '';
            this.pageSelect.value = '';
            this.pageSelect.innerHTML = '<option value="">หน้า</option>';
            this.pageSelect.disabled = true;
            
            if ($(this.tocSelect).hasClass('select2-hidden-accessible')) {
                $(this.tocSelect).select2('destroy');
            }
            this.tocSelect.innerHTML = '<option value="">เลือกเรื่อง</option>';
            this.tocSelect.disabled = true;
            
            this.currentBook = null;
            this.currentPage = null;
            this.availablePages = [];
            this.currentData = [];
            this.tocData = [];
            
            this.showBookGrid();
            this.updateNavigationButtons();
            this.updateURL(); // Update URL to clear parameters
        },
        
        saveToLocalStorage() {
            let allBooksData = {};
            try {
                const existing = localStorage.getItem('dhamma-ebook-books');
                if (existing) {
                    allBooksData = JSON.parse(existing);
                }
            } catch (e) {
                console.error('Error reading existing localStorage:', e);
            }
            
            if (this.currentBook && this.currentPage) {
                allBooksData[this.currentBook] = {
                    currentPage: this.currentPage,
                    viewMode: this.viewMode,
                    displayMode: this.displayMode
                };
            }
            
            const generalState = {
                lastBook: this.currentBook,
                globalViewMode: this.viewMode,
                globalDisplayMode: this.displayMode
            };
            
            localStorage.setItem('dhamma-ebook-books', JSON.stringify(allBooksData));
            localStorage.setItem('dhamma-ebook-state', JSON.stringify(generalState));
        },
        
        async loadFromLocalStorage() {
            return;
        },

        async loadBookSettings(bookNumber) {
            try {
                const allBooksData = localStorage.getItem('dhamma-ebook-books');
                if (allBooksData) {
                    const booksData = JSON.parse(allBooksData);
                    const bookData = booksData[bookNumber];
                    
                    if (bookData) {
                        if (bookData.viewMode) {
                            this.viewMode = bookData.viewMode;
                            this.viewModeSelect.value = bookData.viewMode;
                        }
                        
                        if (bookData.displayMode) {
                            this.displayMode = bookData.displayMode;
                            this.displayModeSelect.value = bookData.displayMode;
                        }

                        if (bookData.currentPage && this.availablePages.includes(bookData.currentPage)) {
                            this.currentPage = bookData.currentPage;
                            this.pageSelect.value = bookData.currentPage;
                            return true;
                        }
                    }
                }
            } catch (error) {
                console.error('Error loading book settings:', error);
            }
            return false;
        },
        
        handleScroll() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollThreshold = 50;
            const scrollDelta = 50;
            
            if (this.bookGrid.style.display !== 'none') {
                return;
            }
            
            if (scrollTop > this.lastScrollTop && scrollTop > scrollThreshold) {
                this.hideNavigationPanel();
            } else if (scrollTop < this.lastScrollTop && (this.lastScrollTop - scrollTop) > scrollDelta) {
                this.showNavigationPanel();
            }
            
            this.lastScrollTop = scrollTop;
        },
        
        hideNavigationPanel() {
            if (this.isNavVisible) {
                this.navigationControls.classList.add('hidden');
                this.panelToggle.style.display = 'block';
                this.isNavVisible = false;
            }
        },
        
        showNavigationPanel() {
            if (!this.isNavVisible) {
                this.navigationControls.classList.remove('hidden');
                this.panelToggle.style.display = 'none';
                this.isNavVisible = true;
            }
        },
        
        toggleNavigationPanel() {
            if (this.isNavVisible) {
                this.hideNavigationPanel();
            } else {
                this.showNavigationPanel();
            }
        },
        
        resetContent() {
            this.currentData = [];
            this.showBookGrid();
        },
        
        resetPage() {
            this.currentPage = null;
            this.pageSelect.value = '';
            this.resetContent();
            this.updateNavigationButtons();
            this.updateURL(); // Update URL when page is reset
        },

        toggleReveal(element) {
            element.classList.toggle('reveal-thai');
        },
        
        openSearchOffcanvas() {
            const searchOffcanvas = new bootstrap.Offcanvas(document.getElementById('searchOffcanvas'));
            searchOffcanvas.show();
            
            if (!this.searchInitialized) {
                this.initializeSearch();
            }
        },
        
        initializeSearch() {
            this.searchInitialized = true;
            this.searchTermIndex = 1;
            
            const performSearchBtn = document.getElementById('performSearch');
            
            document.querySelector('.search-term-input').addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.performSearch();
                }
            });
            
            performSearchBtn.addEventListener('click', () => {
                this.performSearch();
            });

            // Add event listener for offcanvas close to clear search highlights
            const searchOffcanvasElement = document.getElementById('searchOffcanvas');
            searchOffcanvasElement.addEventListener('hidden.bs.offcanvas', () => {
                this.clearSearchHighlights();
            });
        },
        
        addSearchTerm() {
            const container = document.getElementById('searchTermsContainer');
            const termGroup = document.createElement('div');
            termGroup.className = 'search-term-group mb-2';
            termGroup.setAttribute('data-term-index', this.searchTermIndex);
            
            termGroup.innerHTML = `
                <div class="input-group">
                    <input type="text" class="form-control search-term-input" placeholder="คำค้นหาเพิ่มเติม..." data-term-index="${this.searchTermIndex}">
                    <button class="btn btn-danger remove-search-term" type="button">
                        <i class="bi bi-dash"></i>
                    </button>
                </div>
            `;
            
            container.appendChild(termGroup);
            
            const input = termGroup.querySelector('.search-term-input');
            const removeBtn = termGroup.querySelector('.remove-search-term');
            
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.performSearch();
                }
            });
            
            removeBtn.addEventListener('click', () => {
                this.removeSearchTerm(termGroup);
            });
            
            this.searchTermIndex++;
            this.updateSearchLogicVisibility();
            input.focus();
        },
        
        removeSearchTerm(termGroup) {
            termGroup.remove();
            this.updateSearchLogicVisibility();
        },
        
        updateSearchLogicVisibility() {
            const searchTermGroups = document.querySelectorAll('.search-term-group');
            const searchLogicContainer = document.getElementById('searchLogicContainer');
            
            if (searchTermGroups.length > 1) {
                searchLogicContainer.style.display = 'block';
            } else {
                searchLogicContainer.style.display = 'none';
            }
        },
        
        async performSearch() {
            const searchInputs = document.querySelectorAll('.search-term-input');
            const searchTerms = [];
            
            searchInputs.forEach(input => {
                const term = input.value.trim();
                if (term.length >= 2) {
                    searchTerms.push(term);
                }
            });
            
            if (searchTerms.length === 0) {
                alert('กรุณาป้อนคำค้นหาอย่างน้อย 1 คำ (อย่างน้อย 2 ตัวอักษร)');
                return;
            }
            
            const searchType = document.querySelector('input[name="searchType"]:checked').value;
            const searchLogic = document.querySelector('input[name="searchLogic"]:checked').value;
            const searchMode = document.querySelector('input[name="searchMode"]:checked').value;
            const searchBook = document.querySelector('select[name="searchBook"]').value;
            
            this.showSearchLoading();
            
            try {
                const url = new URL('api/search.php', window.location.origin + window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1));
                searchTerms.forEach((term, index) => {
                    url.searchParams.append(`terms[${index}]`, term);
                });
                url.searchParams.append('type', searchType);
                url.searchParams.append('logic', searchLogic);
                url.searchParams.append('mode', searchMode);
                if (searchBook) {
                    url.searchParams.append('book', searchBook);
                }
                url.searchParams.append('limit', '100');
                
                const response = await fetch(url.toString());
                const data = await response.json();
                
                if (data.error) {
                    throw new Error(data.error);
                }
                
                this.displaySearchResults(data.results, data.total, searchTerms, searchLogic, searchMode);
                
            } catch (error) {
                console.error('Search error:', error);
                this.hideSearchLoading();
                alert('เกิดข้อผิดพลาดในการค้นหา: ' + error.message);
            }
        },
        
        showSearchLoading() {
            document.getElementById('searchLoading').style.display = 'block';
            document.getElementById('searchResultsContainer').style.display = 'none';
            document.getElementById('searchNoResults').style.display = 'none';
        },
        
        hideSearchLoading() {
            document.getElementById('searchLoading').style.display = 'none';
        },
        
        displaySearchResults(results, total, searchTerms, searchLogic, searchMode) {
            this.hideSearchLoading();
            
            if (results.length === 0) {
                document.getElementById('searchNoResults').style.display = 'block';
                document.getElementById('searchResultsContainer').style.display = 'none';
                return;
            }
            
            const logicText = searchLogic === 'and' ? 'ต้องมีทุกคำ' : 'มีคำใดคำหนึ่ง';
            document.getElementById('searchResultsCount').textContent = `${total} ผลลัพธ์ (${logicText})`;
            
            const tableBody = document.getElementById('searchResultsTable');
            tableBody.innerHTML = '';
            
            results.forEach(result => {
                const row = document.createElement('tr');
                row.style.cursor = 'pointer';
                row.addEventListener('click', () => {
                    this.navigateToSearchResult(result.book, result.page, searchTerms, result.sentence_index);
                });
                
                const highlightedPali = this.highlightSearchTermsYellow(result.pali, searchTerms, searchMode);
                const highlightedThai = this.highlightSearchTermsYellow(result.thai, searchTerms, searchMode);
                
                row.innerHTML = `
                    <td class="text-center fw-bold">${result.book}</td>
                    <td class="text-center">${result.page}</td>
                    <td>
                        <div class="pali-text text-amber-900 mb-1 small">${highlightedPali}</div>
                        <div class="thai-text text-black small">${highlightedThai}</div>
                    </td>
                `;
                
                tableBody.appendChild(row);
            });
            
            document.getElementById('searchResultsContainer').style.display = 'block';
            document.getElementById('searchNoResults').style.display = 'none';
        },
        
        highlightSearchTermsYellow(text, searchTerms, searchMode = 'partial') {
            if (!searchTerms || !Array.isArray(searchTerms) || searchTerms.length === 0) {
                return text;
            }

            let highlightedText = text;

            searchTerms.forEach((term) => {
                if (term && term.length >= 2) {
                    const escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

                    let regex;
                    if (searchMode === 'whole') {
                        // Match whole words with punctuation support
                        regex = new RegExp(`(^|\\s)(${escapedTerm})([\\s.,;:!?๏๚๛]|$)`, 'gi');
                        highlightedText = highlightedText.replace(regex, '$1<mark class="bg-warning">$2</mark>$3');
                    } else {
                        // Partial match (default behavior)
                        regex = new RegExp(`(${escapedTerm})`, 'gi');
                        highlightedText = highlightedText.replace(regex, `<mark class="bg-warning">$1</mark>`);
                    }
                }
            });

            return highlightedText;
        },

        highlightSearchTerms(text, searchTerms, searchMode = 'partial') {
            if (!searchTerms || !Array.isArray(searchTerms) || searchTerms.length === 0) {
                return text;
            }

            let highlightedText = text;
            const colors = ['bg-warning', 'bg-info', 'bg-success', 'bg-danger', 'bg-primary'];

            searchTerms.forEach((term, index) => {
                if (term && term.length >= 2) {
                    const color = colors[index % colors.length];
                    const escapedTerm = term.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&');

                    let regex;
                    if (searchMode === 'whole') {
                        // Match whole words with punctuation support
                        regex = new RegExp(`(^|\\\\s)(${escapedTerm})([\\\\s.,;:!?๏๚๛]|$)`, 'gi');
                        highlightedText = highlightedText.replace(regex, '$1<mark class="' + color + '">$2</mark>$3');
                    } else {
                        // Partial match (default behavior)
                        regex = new RegExp(`(${escapedTerm})`, 'gi');
                        highlightedText = highlightedText.replace(regex, `<mark class="${color}">$1</mark>`);
                    }
                }
            });

            return highlightedText;
        },
        
        highlightSearchTerm(text, searchTerm) {
            if (!searchTerm) return text;
            
            const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&')})`, 'gi');
            return text.replace(regex, '<mark class="bg-warning">$1</mark>');
        },
        
        navigateToSearchResult(book, page, searchTerms = [], sentenceIndex = null) {
            // Don't close offcanvas - allow user to continue browsing search results

            // Store search terms and sentence index for highlighting after page load
            this.pendingSearchHighlight = {
                searchTerms: searchTerms,
                sentenceIndex: sentenceIndex
            };

            this.selectBookFromGrid(book).then(() => {
                this.pageSelect.value = page;
                this.onPageChange().then(() => {
                    // Apply highlighting and scrolling after page content is loaded
                    if (this.pendingSearchHighlight) {
                        this.highlightAndScrollToSearchResult();
                    }
                });
            });
        },

        highlightAndScrollToSearchResult() {
            if (!this.pendingSearchHighlight || !this.pendingSearchHighlight.searchTerms) {
                return;
            }

            const { searchTerms, sentenceIndex } = this.pendingSearchHighlight;

            // Clear any existing search highlights
            this.clearSearchHighlights();

            // Get the line content container
            const lineContent = document.getElementById('lineContent');
            if (!lineContent) {
                this.pendingSearchHighlight = null;
                return;
            }

            let targetSentence = null;

            // Find the target sentence by matching sentence_index from database
            if (sentenceIndex !== null && sentenceIndex !== undefined) {
                const sentences = Array.from(lineContent.children);
                targetSentence = sentences.find(sentence =>
                    parseFloat(sentence.dataset.sentenceIndex) === parseFloat(sentenceIndex)
                );
            }

            // If we couldn't find by index, find the first sentence containing any search term
            if (!targetSentence) {
                const sentences = lineContent.children;
                for (let i = 0; i < sentences.length; i++) {
                    const sentence = sentences[i];
                    const textContent = sentence.textContent.toLowerCase();
                    const hasSearchTerm = searchTerms.some(term =>
                        textContent.includes(term.toLowerCase())
                    );
                    if (hasSearchTerm) {
                        targetSentence = sentence;
                        break;
                    }
                }
            }

            if (targetSentence) {
                // Apply temporary highlight to the sentence
                this.applyTemporaryHighlight(targetSentence, searchTerms);

                // Scroll to the sentence
                targetSentence.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });

                // Remove highlight after 3 seconds
                setTimeout(() => {
                    this.clearSearchHighlights();
                }, 3000);
            }

            // Clear the pending highlight
            this.pendingSearchHighlight = null;
        },

        applyTemporaryHighlight(sentence, searchTerms) {
            // Mark this sentence as search highlighted
            sentence.classList.add('search-highlighted');

            // Highlight search terms within the sentence using DOM manipulation
            // to preserve event listeners
            const paliElement = sentence.querySelector('.pali-text');
            const thaiElement = sentence.querySelector('.thai-text');

            if (paliElement) {
                this.highlightElementText(paliElement, searchTerms);
            }

            if (thaiElement) {
                this.highlightElementText(thaiElement, searchTerms);
            }
        },

        highlightElementText(element, searchTerms) {
            // Walk through text nodes and highlight search terms without destroying DOM structure
            const walker = document.createTreeWalker(
                element,
                NodeFilter.SHOW_TEXT,
                {
                    acceptNode: function(node) {
                        // Skip if parent is a button or script
                        if (node.parentElement.tagName === 'BUTTON' ||
                            node.parentElement.tagName === 'SCRIPT' ||
                            node.parentElement.classList.contains('text-xs') ||
                            node.parentElement.classList.contains('bi')) {
                            return NodeFilter.FILTER_REJECT;
                        }
                        return NodeFilter.FILTER_ACCEPT;
                    }
                }
            );

            const textNodes = [];
            let currentNode;
            while (currentNode = walker.nextNode()) {
                textNodes.push(currentNode);
            }

            // Process text nodes in reverse to avoid position issues
            textNodes.reverse().forEach(textNode => {
                const text = textNode.textContent;
                let hasMatch = false;
                const parent = textNode.parentNode;

                // Check if any search term matches
                searchTerms.forEach((term) => {
                    if (term && term.length >= 2 && text.toLowerCase().includes(term.toLowerCase())) {
                        hasMatch = true;
                    }
                });

                if (hasMatch) {
                    // Create a temporary container to parse HTML
                    let newHTML = text;
                    searchTerms.forEach((term) => {
                        if (term && term.length >= 2) {
                            const escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                            const regex = new RegExp(`(${escapedTerm})`, 'gi');
                            newHTML = newHTML.replace(regex, '<mark class="bg-warning">$1</mark>');
                        }
                    });

                    const fragment = document.createRange().createContextualFragment(newHTML);
                    parent.replaceChild(fragment, textNode);
                }
            });
        },

        clearSearchHighlights() {
            const lineContent = document.getElementById('lineContent');
            if (!lineContent) return;

            const highlightedSentences = lineContent.querySelectorAll('.search-highlighted');
            highlightedSentences.forEach(sentence => {
                sentence.classList.remove('search-highlighted');

                // Remove all mark tags by unwrapping them
                const marks = sentence.querySelectorAll('mark.bg-warning');
                marks.forEach(mark => {
                    const parent = mark.parentNode;
                    while (mark.firstChild) {
                        parent.insertBefore(mark.firstChild, mark);
                    }
                    parent.removeChild(mark);
                });

                // Normalize text nodes to merge adjacent text nodes
                sentence.normalize();
            });
        },

        decreaseFontSize() {
            if (this.fontSize > 80) {
                this.fontSize -= 10;
                this.applyFontSize();
                this.saveFontSize();
            }
        },
        
        increaseFontSize() {
            if (this.fontSize < 200) {
                this.fontSize += 10;
                this.applyFontSize();
                this.saveFontSize();
            }
        },
        
        resetFontSize() {
            this.fontSize = 100;
            this.applyFontSize();
            this.saveFontSize();
        },
        
        applyFontSize() {
            // Apply to main content
            const contentElements = [this.columnView, this.lineView];
            contentElements.forEach(element => {
                if (element) {
                    element.classList.remove(
                        'content-font-size-80', 'content-font-size-90', 
                        'content-font-size-110', 'content-font-size-120', 
                        'content-font-size-130', 'content-font-size-140', 
                        'content-font-size-150', 'content-font-size-160',
                        'content-font-size-170', 'content-font-size-180',
                        'content-font-size-190', 'content-font-size-200'
                    );
                    
                    if (this.fontSize !== 100) {
                        element.classList.add(`content-font-size-${this.fontSize}`);
                    }
                }
            });
            
            // Apply to translation offcanvas
            const translationOffcanvas = document.getElementById('translationOffcanvas');
            if (translationOffcanvas) {
                translationOffcanvas.classList.remove(
                    'translation-font-size-80', 'translation-font-size-90', 
                    'translation-font-size-110', 'translation-font-size-120', 
                    'translation-font-size-130', 'translation-font-size-140', 
                    'translation-font-size-150', 'translation-font-size-160',
                    'translation-font-size-170', 'translation-font-size-180',
                    'translation-font-size-190', 'translation-font-size-200'
                );
                
                if (this.fontSize !== 100) {
                    translationOffcanvas.classList.add(`translation-font-size-${this.fontSize}`);
                }
                
                // Re-initialize any Bootstrap collapse components that might have been affected
                translationOffcanvas.querySelectorAll('.collapse').forEach(collapseEl => {
                    if (collapseEl.classList.contains('show')) {
                        // Keep expanded collapses open
                        collapseEl.style.display = 'block';
                    }
                });
            }
            
            this.fontSizeDisplay.textContent = `${this.fontSize}%`;
        },
        
        saveFontSize() {
            localStorage.setItem('dhamma-ebook-font-size', this.fontSize.toString());
        },
        
        loadFontSize() {
            const savedFontSize = localStorage.getItem('dhamma-ebook-font-size');
            if (savedFontSize) {
                this.fontSize = parseInt(savedFontSize);
                this.applyFontSize();
            } else {
                this.applyFontSize();
            }
        },
        
        async initializeTranslation() {
            if (this.translationInitialized) return;
            
            this.translationInitialized = true;
            this.selectedWord = '';
            this.currentHighlightedWord = null;
            this.searchMode = 'pali';
            
            // Dictionary will be loaded via API calls instead of preloading
            
            this.translationOffcanvas = new bootstrap.Offcanvas(document.getElementById('translationOffcanvas'));
            
            // Add event listener to remove word highlighting when offcanvas is hidden
            document.getElementById('translationOffcanvas').addEventListener('hidden.bs.offcanvas', () => {
                if (this.currentHighlightedWord) {
                    this.currentHighlightedWord.classList.remove('word-highlighted');
                    this.currentHighlightedWord = null;
                }
            });
            
            document.getElementById('searchWordBtn').addEventListener('click', () => this.searchSelectedWord());
            document.getElementById('selectedWordInput').addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.searchSelectedWord();
                }
            });
            
            // Add dropdown event listeners
            document.querySelectorAll('[data-mode]').forEach(item => {
                item.addEventListener('click', (e) => {
                    e.preventDefault();
                    const mode = e.target.getAttribute('data-mode');
                    this.setSearchMode(mode);
                });
            });
        },
        
        processTextForWordClick(text, isPali = true, dataIndex = 0) {
            if (!text) return '';

            let globalWordIndex = 0;

            // Split by newlines and process each line
            const lines = text.split('\n');
            const processedLines = lines.map(line => {
                // Use regex to find and wrap words while preserving all whitespace
                let processedLine = line.replace(/[^\s]+/g, (word) => {
                    // Skip if it's only punctuation
                    if (/^[.,;:!?ฯๆ๏๚๛๐-๙]+$/.test(word)) {
                        return word;
                    }

                    // Clean word by removing punctuation, quotes, brackets, and other symbols from both ends
                    let cleanWord = word.replace(/^[.,;:!?ฯๆ๏๚๛\s๐-๙"'`"""''"()[\]{}\/\\|@#$%^&*+=<>~\-_]+/, '').replace(/[.,;:!?ฯๆ๏๚๛\s๐-๙"'`"""''()[\]{}\/\\|@#$%^&*+=<>~\-_]+$/, '');
                    const beforePunctuation = word.substring(0, word.indexOf(cleanWord));
                    const afterPunctuation = word.substring(word.indexOf(cleanWord) + cleanWord.length);

                    const wordType = isPali ? 'pali' : 'thai';
                    const wordId = `${dataIndex}_${wordType}_${globalWordIndex}`;
                    globalWordIndex++;

                    // Check if this word has a note
                    const bookPage = `${this.currentBook}_${this.currentPage}`;
                    const noteKey = `${bookPage}_${wordId}_${cleanWord}`;
                    const hasNote = this.wordNotes[noteKey] ? true : false;
                    const savedData = this.wordNotes[noteKey];
                    const noteText = hasNote ? (typeof savedData === 'object' ? savedData.text : savedData).replace(/"/g, '&quot;') : '';
                    const noteColor = hasNote && typeof savedData === 'object' ? savedData.color : '#3b82f6';

                    if (isPali && cleanWord.length >= 2) {
                        const noteAttrs = hasNote ? ` data-has-note="true" data-note-text="${noteText}" data-note-color="${noteColor}" style="--note-color: ${noteColor}"` : '';
                        return `${beforePunctuation}<span class="pali-word" data-word-id="${wordId}"${noteAttrs} onclick="window.ebookReader.handleWordClickWithHighlight('${cleanWord}', this, true, event)">${cleanWord}</span>${afterPunctuation}`;
                    } else if (!isPali) {
                        const noteAttrs = hasNote ? ` data-has-note="true" data-note-text="${noteText}" data-note-color="${noteColor}" style="--note-color: ${noteColor}"` : '';
                        return `${beforePunctuation}<span class="thai-word" data-word-id="${wordId}"${noteAttrs} onclick="window.ebookReader.handleWordClickWithHighlight('${cleanWord}', this, false, event)">${cleanWord}</span>${afterPunctuation}`;
                    }

                    return word;
                });

                // Replace multiple spaces with &nbsp; to preserve them in HTML
                processedLine = processedLine.replace(/ {2,}/g, (spaces) => {
                    return spaces.split('').map(() => '&nbsp;').join('');
                });

                return processedLine;
            });

            // Join lines with <br> tags
            return processedLines.join('<br>');
        },
        
        async onWordClick(word, element, isPali = true) {
            if (!this.translationInitialized) {
                await this.initializeTranslation();
            }
            
            // Dictionary is now loaded via API, no need to check
            
            if (this.currentHighlightedWord) {
                this.currentHighlightedWord.classList.remove('word-highlighted');
            }
            
            element.classList.add('word-highlighted');
            this.currentHighlightedWord = element;
            
            // Clean the word again to remove any remaining punctuation
            const cleanedWord = word.replace(/^[.,;:!?ฯๆ๏๚๛\s๐-๙"'`"""''()[\]{}\/\\|@#$%^&*+=<>~\-_]+/, '').replace(/[.,;:!?ฯๆ๏๚๛\s๐-๙"'`"""''()[\]{}\/\\|@#$%^&*+=<>~\-_]+$/, '');
            
            this.selectedWord = cleanedWord;
            this.searchMode = isPali ? 'pali' : 'thai';
            this.setSearchMode(this.searchMode);
            document.getElementById('selectedWordInput').value = cleanedWord;
            
            this.showTranslation(cleanedWord);
        },
        
        setSearchMode(mode) {
            this.searchMode = mode;
            const searchModeText = document.getElementById('searchModeText');
            if (searchModeText) {
                searchModeText.textContent = mode === 'pali' ? 'บาลี' : 'ไทย';
            }
            
            // Update placeholder text
            const searchInput = document.getElementById('selectedWordInput');
            if (searchInput) {
                searchInput.placeholder = mode === 'pali' ? 'ค้นหาคำบาลี...' : 'ค้นหาความหมายไทย...';
            }
        },
        
        // Clean Thai/Pali word by removing grammatical markers before searching
        cleanSearchWord(word) {
            if (!word) return '';
            
            const grammaticalMarkers = [
                'อ.',        // nominative case marker
                'ก.',        // also nominative
                'ท.',        // plural marker
                'ข้าแต่',    // vocative marker
                'แน่ะ',      // vocative marker
                'ดูก่อน',    // vocative marker
                'ซึ่ง',      // relative pronoun
                'อัน',       // relative pronoun
                'ที่',       // relative pronoun
                'เมื่อ',     // temporal marker
                'ครั้นเมื่อ', // temporal marker
                'ในเพราะ',   // causal marker
                'แต่',       // ablative marker
                'จาก',       // ablative marker
                'กว่า',      // comparative marker
                'เหตุ',      // causal marker
                'แห่ง',      // genitive marker
                'ของ',       // genitive marker
                'แก่',       // dative marker
                'เพื่อ',     // dative marker
                'ต่อ',       // dative marker
                'ด้วย',      // instrumental marker
                'โดย',       // instrumental marker
                'ตาม',       // instrumental marker
                'เพราะ',     // instrumental marker
                'มี',        // instrumental marker
                'ด้วยทั้ง',   // instrumental marker
                'ใน',        // locative marker
                'ใกล้',      // locative marker
                'เหนือ',     // locative marker
                'บน',        // locative marker
            ];
            
            let cleaned = word.trim();
            
            // Remove grammatical markers from beginning (with or without spaces)
            for (const marker of grammaticalMarkers) {
                // With space after
                if (cleaned.startsWith(marker + ' ')) {
                    cleaned = cleaned.substring(marker.length + 1).trim();
                }
                // Without space (direct attachment)  
                else if (cleaned.startsWith(marker)) {
                    cleaned = cleaned.substring(marker.length).trim();
                }
            }
            
            // Remove grammatical markers from end (with or without spaces)  
            for (const marker of grammaticalMarkers) {
                // With space before
                if (cleaned.endsWith(' ' + marker)) {
                    cleaned = cleaned.substring(0, cleaned.length - marker.length - 1).trim();
                }
                // Without space (direct attachment)
                else if (cleaned.endsWith(marker)) {
                    cleaned = cleaned.substring(0, cleaned.length - marker.length).trim();
                }
            }
            
            // Remove grammatical markers from middle (with spaces around them)
            for (const marker of grammaticalMarkers) {
                cleaned = cleaned.replace(new RegExp(`\\s+${marker.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s+`, 'g'), ' ');
            }
            
            // Clean up multiple spaces
            cleaned = cleaned.replace(/\s+/g, ' ').trim();
            
            // If cleaned query is empty, return original
            if (cleaned === '') {
                return word;
            }
            
            return cleaned;
        },

        async showTranslation(word) {
            this.translationOffcanvas.show();
            this.showTranslationLoading();
            
            try {
                const searchMode = this.searchMode || 'pali';
                
                // Clean the word before searching to reduce API load
                const cleanedWord = this.cleanSearchWord(word);
                
                // Update the search input with cleaned word
                const searchInput = document.getElementById('selectedWordInput');
                if (searchInput) {
                    searchInput.value = cleanedWord;
                }
                
                // Get API data directly for proper exact match detection
                const response = await fetch(`/page/dict/api/search.php?word=${encodeURIComponent(cleanedWord)}&mode=${searchMode}`);
                const apiData = await response.json();

                console.log('API Response:', apiData);

                if (apiData.error) {
                    console.error('Dictionary API error:', apiData.error);
                    this.displayTranslationResults(null, [], word);
                    return;
                }
                
                let exactMatch = null;
                let similarWords = [];

                // Use exact matches from API (highest priority)
                let usedVocab3AsExact = false;
                if (apiData.exact_matches && apiData.exact_matches.length > 0) {
                    exactMatch = apiData.exact_matches[0];
                }
                // If no exact match, check vocab3_matches
                else if (apiData.vocab3_matches && apiData.vocab3_matches.length > 0) {
                    console.log('Using vocab3 match:', apiData.vocab3_matches[0]);
                    exactMatch = apiData.vocab3_matches[0];
                    usedVocab3AsExact = true;
                }

                // Combine all other matches for similar words
                const allOtherMatches = [
                    ...(apiData.exact_matches && apiData.exact_matches.length > 1 ? apiData.exact_matches.slice(1) : []),
                    ...(apiData.declension_matches || []),
                    ...(apiData.contains_matches || []),
                    ...(apiData.similar_matches || [])
                ];

                // Only add vocab3_matches to similar words if not used as exact match
                if (!usedVocab3AsExact && apiData.vocab3_matches && apiData.vocab3_matches.length > 0) {
                    allOtherMatches.push(...apiData.vocab3_matches);
                }

                similarWords = allOtherMatches.slice(0, 10); // Limit to 10 results
                
                if (this.lastTranslatedWord !== word) {
                    this.displayTranslationResults(exactMatch, similarWords, word);
                    this.lastTranslatedWord = word;
                } else {
                    this.hideTranslationLoading();
                    document.getElementById('translationResults').style.display = 'block';
                }
                
            } catch (error) {
                console.error('Translation error:', error);
                this.hideTranslationLoading();
                document.getElementById('noResultsSection').style.display = 'block';
            }
        },
        
        async searchSelectedWord() {
            const word = document.getElementById('selectedWordInput').value.trim();
            if (!word) return;
            
            // Clean the word before searching
            const cleanedWord = this.cleanSearchWord(word);
            
            this.selectedWord = cleanedWord;
            this.showTranslation(cleanedWord);
        },
        
        async findSimilarWords(word, maxResults = 20, searchMode = 'pali') {
            try {
                const response = await fetch(`/page/dict/api/search.php?word=${encodeURIComponent(word)}&mode=${searchMode}`);
                const data = await response.json();
                
                if (data.error) {
                    console.error('Dictionary API error:', data.error);
                    return [];
                }
                
                // Combine all match types in priority order, filtering out empty arrays
                const allMatches = [];

                // Add exact matches first (highest priority)
                if (data.exact_matches && data.exact_matches.length > 0) {
                    allMatches.push(...data.exact_matches);
                }

                // Add vocab3 matches if no exact matches
                if (data.vocab3_matches && data.vocab3_matches.length > 0) {
                    allMatches.push(...data.vocab3_matches);
                }

                // Add declension matches second
                if (data.declension_matches && data.declension_matches.length > 0) {
                    allMatches.push(...data.declension_matches);
                }

                // Add contains matches third
                if (data.contains_matches && data.contains_matches.length > 0) {
                    allMatches.push(...data.contains_matches);
                }

                // Add similar matches last
                if (data.similar_matches && data.similar_matches.length > 0) {
                    allMatches.push(...data.similar_matches);
                }

                // Limit results
                return allMatches.slice(0, maxResults);
                
            } catch (error) {
                console.error('Error searching dictionary:', error);
                return [];
            }
        },
        
        getCommonPrefix(str1, str2) {
            let i = 0;
            const minLength = Math.min(str1.length, str2.length);
            while (i < minLength && str1[i] === str2[i]) {
                i++;
            }
            return str1.substring(0, i);
        },
        
        showTranslationLoading() {
            document.getElementById('translationLoading').style.display = 'block';
            document.getElementById('translationResults').style.display = 'none';
        },
        
        hideTranslationLoading() {
            document.getElementById('translationLoading').style.display = 'none';
        },
        
        displayTranslationResults(exactMatch, similarWords, word) {
            this.hideTranslationLoading();
            
            const exactSection = document.getElementById('exactMatchSection');
            const similarSection = document.getElementById('similarWordsSection');
            const noResultsSection = document.getElementById('noResultsSection');
            const translationResults = document.getElementById('translationResults');
            
            if (!this.expandedDetails) {
                this.expandedDetails = new Set();
            }
            
            exactSection.style.display = 'none';
            similarSection.style.display = 'none';
            noResultsSection.style.display = 'none';
            translationResults.style.display = 'block';
            
            if (exactMatch) {
                const highlightedWord = this.highlightSearchTerm(exactMatch.word, word);
                const meaning = exactMatch.meaning || exactMatch.meanings || 'ไม่มีความหมาย';
                const category = exactMatch.category ? ` <small class="text-muted" style="font-size: 0.75rem;">(${exactMatch.category})</small>` : '';
                const note = exactMatch.note ? `<div class="mt-2 small text-secondary">${exactMatch.note}</div>` : '';
                const detailsId = `exact-details`;
                const hasDetails = exactMatch.meanings_original;
                const isExpanded = this.expandedDetails.has(detailsId);
                const infoIcon = hasDetails ? 
                    `<i class="bi bi-info-circle ms-2 text-muted" style="font-size: 0.875rem;"></i>` : '';
                const detailsSection = hasDetails ? 
                    `<div class="details-content mt-2" id="${detailsId}" style="display: ${isExpanded ? 'block' : 'none'};">
                        <div class="card card-body small bg-very-light">
                            <strong class="text-secondary mb-2">รายละเอียด:</strong>
                            <div>${exactMatch.meanings_original}</div>
                        </div>
                    </div>` : '';
                
                document.getElementById('exactMatchContent').innerHTML = `
                    <div class="similar-word mb-2 border-success">
                        <div class="meaning-line ${hasDetails ? 'clickable-meaning' : ''}" ${hasDetails ? `data-target="${detailsId}"` : ''}>
                            <div class="d-flex align-items-center">
                                <div class="flex-grow-1">
                                    <strong>${highlightedWord}</strong>${category}: 
                                    <span>${meaning}</span>
                                </div>
                                ${infoIcon}
                            </div>
                            ${note}
                        </div>
                        ${detailsSection}
                    </div>
                `;
                exactSection.style.display = 'block';
            }
            
            if (similarWords.length > 0) {
                const similarContent = document.getElementById('similarWordsContent');
                similarContent.innerHTML = '';
                
                similarWords.forEach((entry, index) => {
                    const wordDiv = document.createElement('div');
                    wordDiv.className = 'similar-word mb-2';
                    
                    let matchTypeClass = '';
                    
                    if (entry.word.includes(word) || entry.word.startsWith(word)) {
                        matchTypeClass = 'border-secondary';
                    } else {
                        const declensionPatterns = [
                            { from: 'โ', to: '' },
                            { from: 'เ(.*)น$', to: '$1' },
                            { from: 'านิ$', to: '' },
                            { from: 'านิ$', to: 'า' },
                            { from: 'ิานิ$', to: 'ิ' },
                            { from: 'ุานิ$', to: 'ุ' },
                            { from: 'สฺส$', to: '' },
                            { from: 'สฺมึ$', to: '' },
                            { from: 'สฺมา$', to: '' },
                            { from: 'มฺหิ$', to: '' },
                            { from: 'มฺหา$', to: '' },
                            { from: 'าย$', to: '' },
                            { from: 'านํ$', to: '' },
                            { from: 'าหิ$', to: '' },
                            { from: 'าภิ$', to: '' },
                            { from: 'าสุ$', to: '' },
                            { from: 'นา$', to: '' },
                            { from: 'ินา$', to: 'ิ' },
                            { from: 'ีหิ$', to: 'ี' },
                            { from: 'ุนา$', to: 'ุ' },
                            { from: 'เน$', to: '' },
                            { from: 'โน$', to: '' }
                        ];
                        
                        let isDeclensionMatch = false;
                        for (const pattern of declensionPatterns) {
                            const regex = new RegExp(pattern.from);
                            if (word.match(regex)) {
                                const baseForm = word.replace(regex, pattern.to);
                                if (entry.word === baseForm) {
                                    isDeclensionMatch = true;
                                    break;
                                }
                            }
                        }
                        
                        if (isDeclensionMatch) {
                            matchTypeClass = 'border-warning';
                        } else {
                            matchTypeClass = 'border-info';
                        }
                    }
                    
                    wordDiv.classList.add(matchTypeClass);
                    
                    const highlightedWord = this.highlightSearchTerm(entry.word, word);
                    
                    const meaning = entry.meaning || entry.meanings || 'ไม่มีความหมาย';
                    const category = entry.category ? ` <small class="text-muted" style="font-size: 0.75rem;">(${entry.category})</small>` : '';
                    const detailsId = `similar-details-${index}`;
                    const hasDetails = entry.meanings_original;
                    const isExpanded = this.expandedDetails.has(detailsId);
                    const infoIcon = hasDetails ? 
                        `<i class="bi bi-info-circle ms-2 text-muted" style="font-size: 0.875rem;"></i>` : '';
                    const detailsSection = hasDetails ? 
                        `<div class="details-content mt-2" id="${detailsId}" style="display: ${isExpanded ? 'block' : 'none'};">
                            <div class="card card-body small bg-very-light">
                                <strong class="text-secondary mb-2">รายละเอียดฉบับเต็ม:</strong>
                                <div>${entry.meanings_original}</div>
                            </div>
                        </div>` : '';
                    
                    wordDiv.innerHTML = `
                        <div class="meaning-line ${hasDetails ? 'clickable-meaning' : ''}" ${hasDetails ? `data-target="${detailsId}"` : ''}>
                            <div class="d-flex align-items-center">
                                <div class="flex-grow-1">
                                    <strong>${highlightedWord}</strong>${category}: 
                                    <span>${meaning}</span>
                                </div>
                                ${infoIcon}
                            </div>
                        </div>
                        ${detailsSection}
                    `;
                    
                    similarContent.appendChild(wordDiv);
                });
                
                similarSection.style.display = 'block';
            }
            
            if (!exactMatch && similarWords.length === 0) {
                noResultsSection.style.display = 'block';
            }
            
            // Add click event listeners to meaning lines
            setTimeout(() => {
                const meaningLines = translationResults.querySelectorAll('.clickable-meaning');
                meaningLines.forEach(line => {
                    line.addEventListener('click', (e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        
                        const targetId = line.getAttribute('data-target');
                        const targetElement = document.getElementById(targetId);
                        
                        if (targetElement) {
                            const isCurrentlyVisible = targetElement.style.display === 'block';
                            
                            if (isCurrentlyVisible) {
                                targetElement.style.display = 'none';
                                this.expandedDetails.delete(targetId);
                            } else {
                                targetElement.style.display = 'block';
                                this.expandedDetails.add(targetId);
                            }
                        }
                    });
                });
            }, 50);
        },
        
        // Highlight System Methods

        handleDocumentClick(event) {
            const clickedElement = event.target;

            // Close floating menu if clicking outside
            if (!clickedElement.closest('.floating-menu') && !clickedElement.closest('.pali-word, .thai-word')) {
                this.showFloatingMenu = false;
            }

            // Close selection menu if clicking outside (but not if we just selected text)
            const selection = window.getSelection();
            const hasSelection = selection.toString().trim().length > 0;

            if (!clickedElement.closest('.selection-menu') && !hasSelection) {
                this.showSelectionMenu = false;
            }

            // Close floating note if clicking outside
            if (!clickedElement.closest('.floating-note') && !clickedElement.closest('.pali-word[data-has-note], .thai-word[data-has-note]')) {
                this.activeNoteKey = null;
            }

            // Remove word highlighting when clicking outside of dictionary-related elements
            if (!clickedElement.closest('.pali-word, .thai-word') &&
                !clickedElement.closest('.offcanvas') &&
                !clickedElement.closest('.modal') &&
                this.currentHighlightedWord) {
                this.currentHighlightedWord.classList.remove('word-highlighted');
                this.currentHighlightedWord = null;
            }
        },

        handleTextSelection(event) {
            // Get the selection
            const selection = window.getSelection();
            const selectedText = selection.toString().trim();

            // Only show menu if text is selected and within content area
            if (selectedText.length > 0) {
                const range = selection.getRangeAt(0);
                const container = range.commonAncestorContainer;

                // Check if selection is within content area (check multiple possible containers)
                let element = container.nodeType === Node.TEXT_NODE ? container.parentElement : container;
                const contentArea = element.closest('#columnContent, #lineContent, #columnView, #lineView');

                console.log('Selection detected:', {
                    text: selectedText,
                    container: container,
                    element: element,
                    contentArea: contentArea
                });

                if (contentArea) {
                    // Store the range for later use
                    this.selectedRange = range.cloneRange();

                    // Get selection position
                    const rect = range.getBoundingClientRect();
                    const menuHeight = 180;
                    const menuWidth = 220;

                    // Position menu above or below selection
                    let yPosition = rect.top - menuHeight - 10;
                    if (yPosition < 0) {
                        yPosition = rect.bottom + 10;
                    }

                    // Center menu horizontally
                    let xPosition = rect.left + (rect.width / 2) - (menuWidth / 2);

                    this.selectionMenuPosition = {
                        x: Math.max(10, xPosition),
                        y: Math.max(10, yPosition)
                    };

                    console.log('Showing selection menu at:', this.selectionMenuPosition);
                    this.showSelectionMenu = true;

                    // Debug: Check if Vue is updating
                    this.$nextTick(() => {
                        console.log('After nextTick - showSelectionMenu:', this.showSelectionMenu);
                        const menuElement = document.querySelector('.selection-menu');
                        console.log('Menu element in DOM:', menuElement);
                        if (menuElement) {
                            console.log('Menu element styles:', {
                                display: window.getComputedStyle(menuElement).display,
                                visibility: window.getComputedStyle(menuElement).visibility,
                                opacity: window.getComputedStyle(menuElement).opacity,
                                zIndex: window.getComputedStyle(menuElement).zIndex,
                                position: window.getComputedStyle(menuElement).position,
                                top: window.getComputedStyle(menuElement).top,
                                left: window.getComputedStyle(menuElement).left
                            });
                        }
                    });
                } else {
                    console.log('Selection not in content area');
                    this.showSelectionMenu = false;
                }
            } else {
                this.showSelectionMenu = false;
            }
        },
        
        handleWordClickWithHighlight(word, element, isPali = true, event) {
            const hasNote = element.getAttribute('data-has-note') === 'true';

            // Edit mode (always active)
            if (hasNote && event) {
                // Check if clicked on the note (pseudo-element area above the word)
                const rect = element.getBoundingClientRect();
                const clickY = event.clientY;
                const wordTop = rect.top;

                // If clicked above the word (in the note area), show editor
                if (clickY < wordTop) {
                    this.showInlineNoteEditor(word, element);
                    return;
                }
            }

            // Otherwise show highlight menu
            this.showHighlightMenu(word, element);
        },
        
        showHighlightMenu(word, element) {
            this.selectedWord = word;
            this.selectedWordElement = element;

            const rect = element.getBoundingClientRect();
            const menuHeight = 120; // Approximate height of floating menu (2 rows of colors + note button)
            const viewportHeight = window.innerHeight;
            const spaceBelow = viewportHeight - rect.bottom;
            const spaceAbove = rect.top;
            const offset = 5; // Small gap between word and menu

            // If not enough space below, show menu above the word
            let yPosition;
            if (spaceBelow < menuHeight && spaceAbove > menuHeight) {
                // Show above - use fixed position (no scrollY needed)
                yPosition = rect.top - menuHeight - offset;
            } else {
                // Show below (default) - use fixed position (no scrollY needed)
                yPosition = rect.bottom + offset;
            }

            this.floatingMenuPosition = {
                x: rect.left, // Use fixed position (no scrollX needed)
                y: yPosition
            };

            this.showFloatingMenu = true;
        },
        
        highlightWord(color) {
            if (!this.selectedWord || !this.selectedWordElement) return;
            
            const wordKey = this.createWordKey(this.selectedWord, this.selectedWordElement);
            this.wordHighlights[wordKey] = color;
            this.selectedWordElement.style.backgroundColor = color;
            
            this.saveHighlightData();
            this.showFloatingMenu = false;
        },
        
        clearHighlight() {
            if (!this.selectedWord || !this.selectedWordElement) return;
            
            const wordKey = this.createWordKey(this.selectedWord, this.selectedWordElement);
            delete this.wordHighlights[wordKey];
            this.selectedWordElement.style.backgroundColor = '';
            
            this.saveHighlightData();
            this.showFloatingMenu = false;
        },
        
        openNoteEditor() {
            if (!this.selectedWord || !this.selectedWordElement) return;

            // Use inline editor instead of modal
            this.showInlineNoteEditor(this.selectedWord, this.selectedWordElement);
            this.showFloatingMenu = false;
        },

        openNoteEditorWithWord() {
            if (!this.selectedWord || !this.selectedWordElement) return;

            // Use inline editor with the word pre-filled
            this.showInlineNoteEditor(this.selectedWord, this.selectedWordElement, this.selectedWord);
            this.showFloatingMenu = false;
        },

        openDictionary() {
            if (!this.selectedWord || !this.selectedWordElement) return;

            // Open dictionary for the selected word
            this.onWordClick(this.selectedWord, this.selectedWordElement, true);
            this.showFloatingMenu = false;
        },

        addBracketBefore() {
            if (!this.selectedWord || !this.selectedWordElement) return;

            // Check if bracket already exists
            const previousSibling = this.selectedWordElement.previousSibling;
            if (previousSibling && previousSibling.classList && previousSibling.classList.contains('bracket-marker')) {
                // Remove existing bracket
                previousSibling.remove();
            } else {
                // Add bracket before the word
                const bracket = document.createElement('span');
                bracket.className = 'bracket-marker';
                bracket.textContent = '[';
                bracket.setAttribute('data-bracket-id', this.createWordKey(this.selectedWord, this.selectedWordElement));
                this.selectedWordElement.parentNode.insertBefore(bracket, this.selectedWordElement);
            }

            this.saveBracketData();
            this.showFloatingMenu = false;
        },

        addBracketAfter() {
            if (!this.selectedWord || !this.selectedWordElement) return;

            // Check if bracket already exists
            const nextSibling = this.selectedWordElement.nextSibling;
            if (nextSibling && nextSibling.classList && nextSibling.classList.contains('bracket-marker')) {
                // Remove existing bracket
                nextSibling.remove();
            } else {
                // Add bracket after the word
                const bracket = document.createElement('span');
                bracket.className = 'bracket-marker';
                bracket.textContent = ']';
                bracket.setAttribute('data-bracket-id', this.createWordKey(this.selectedWord, this.selectedWordElement));
                this.selectedWordElement.parentNode.insertBefore(bracket, this.selectedWordElement.nextSibling);
            }

            this.saveBracketData();
            this.showFloatingMenu = false;
        },

        saveBracketData() {
            // Collect all bracket positions
            const brackets = {};
            document.querySelectorAll('.bracket-marker').forEach(bracket => {
                const bracketId = bracket.getAttribute('data-bracket-id');
                if (bracketId) {
                    if (!brackets[bracketId]) {
                        brackets[bracketId] = {};
                    }
                    if (bracket.textContent === '[') {
                        brackets[bracketId].before = true;
                    } else if (bracket.textContent === ']') {
                        brackets[bracketId].after = true;
                    }
                }
            });

            // Save to localStorage
            const storageKey = `brackets_book${this.currentBookNumber}_page${this.currentPageNumber}`;
            localStorage.setItem(storageKey, JSON.stringify(brackets));
        },

        loadBracketData() {
            const storageKey = `brackets_book${this.currentBookNumber}_page${this.currentPageNumber}`;
            const savedData = localStorage.getItem(storageKey);

            if (!savedData) return;

            try {
                const brackets = JSON.parse(savedData);

                // Apply brackets after a short delay to ensure words are rendered
                setTimeout(() => {
                    Object.keys(brackets).forEach(bracketId => {
                        const wordElement = this.findElementByWordKey(bracketId);
                        if (!wordElement) return;

                        const data = brackets[bracketId];

                        // Add bracket before
                        if (data.before) {
                            const previousSibling = wordElement.previousSibling;
                            if (!previousSibling || !previousSibling.classList || !previousSibling.classList.contains('bracket-marker')) {
                                const bracket = document.createElement('span');
                                bracket.className = 'bracket-marker';
                                bracket.textContent = '[';
                                bracket.setAttribute('data-bracket-id', bracketId);
                                wordElement.parentNode.insertBefore(bracket, wordElement);
                            }
                        }

                        // Add bracket after
                        if (data.after) {
                            const nextSibling = wordElement.nextSibling;
                            if (!nextSibling || !nextSibling.classList || !nextSibling.classList.contains('bracket-marker')) {
                                const bracket = document.createElement('span');
                                bracket.className = 'bracket-marker';
                                bracket.textContent = ']';
                                bracket.setAttribute('data-bracket-id', bracketId);
                                wordElement.parentNode.insertBefore(bracket, wordElement.nextSibling);
                            }
                        }
                    });
                }, 100);
            } catch (e) {
                console.error('Error loading bracket data:', e);
            }
        },

        // Text Selection Methods
        applyTextHighlight(color) {
            if (!this.selectedRange) return;

            // Wrap selection with span
            const span = document.createElement('span');
            span.className = 'text-highlight';
            span.style.backgroundColor = color;
            span.setAttribute('data-highlight-id', Date.now().toString());

            try {
                this.selectedRange.surroundContents(span);
            } catch (e) {
                // If surroundContents fails (e.g., partial element selection), use a different approach
                const fragment = this.selectedRange.extractContents();
                span.appendChild(fragment);
                this.selectedRange.insertNode(span);
            }

            // Clear selection
            window.getSelection().removeAllRanges();
            this.showSelectionMenu = false;
            this.selectedRange = null;

            // Save to localStorage
            this.saveTextSelections();
        },

        applyTextUnderline(color) {
            if (!this.selectedRange) return;

            // Wrap selection with span
            const span = document.createElement('span');
            span.className = 'text-underline';
            span.style.borderBottomColor = color;
            span.setAttribute('data-underline-id', Date.now().toString());

            try {
                this.selectedRange.surroundContents(span);
            } catch (e) {
                // If surroundContents fails, use a different approach
                const fragment = this.selectedRange.extractContents();
                span.appendChild(fragment);
                this.selectedRange.insertNode(span);
            }

            // Clear selection
            window.getSelection().removeAllRanges();
            this.showSelectionMenu = false;
            this.selectedRange = null;

            // Save to localStorage
            this.saveTextSelections();
        },

        removeTextStyle() {
            if (!this.selectedRange) return;

            // Find if selection is within a styled element
            let node = this.selectedRange.commonAncestorContainer;
            if (node.nodeType === Node.TEXT_NODE) {
                node = node.parentElement;
            }

            // Remove highlight or underline class
            if (node.classList.contains('text-highlight') || node.classList.contains('text-underline')) {
                const parent = node.parentElement;
                while (node.firstChild) {
                    parent.insertBefore(node.firstChild, node);
                }
                parent.removeChild(node);
            }

            // Clear selection
            window.getSelection().removeAllRanges();
            this.showSelectionMenu = false;
            this.selectedRange = null;

            // Save to localStorage
            this.saveTextSelections();
        },

        saveTextSelections() {
            // Collect all text selections
            const selections = [];
            document.querySelectorAll('.text-highlight, .text-underline').forEach(element => {
                const data = {
                    type: element.classList.contains('text-highlight') ? 'highlight' : 'underline',
                    color: element.classList.contains('text-highlight')
                        ? element.style.backgroundColor
                        : element.style.borderBottomColor,
                    text: element.textContent,
                    id: element.getAttribute('data-highlight-id') || element.getAttribute('data-underline-id')
                };
                selections.push(data);
            });

            // Save to localStorage
            const storageKey = `textSelections_book${this.currentBookNumber}_page${this.currentPageNumber}`;
            localStorage.setItem(storageKey, JSON.stringify(selections));
        },

        loadTextSelections() {
            const storageKey = `textSelections_book${this.currentBookNumber}_page${this.currentPageNumber}`;
            const savedData = localStorage.getItem(storageKey);

            if (!savedData) return;

            try {
                const selections = JSON.parse(savedData);

                // Apply selections after a short delay to ensure content is rendered
                setTimeout(() => {
                    selections.forEach(selection => {
                        // Find matching text and apply style
                        // This is a simplified approach - in production you'd want more robust text matching
                        this.applyStoredSelection(selection);
                    });
                }, 200);
            } catch (e) {
                console.error('Error loading text selections:', e);
            }
        },

        applyStoredSelection(selection) {
            // This is a placeholder - implementing robust text selection restoration
            // requires more complex logic to handle dynamic content
            console.log('Restoring selection:', selection);
        },

        saveNote() {
            if (!this.selectedWord || !this.selectedWordElement) return;

            const wordKey = this.createWordKey(this.selectedWord, this.selectedWordElement);

            if (this.currentNote.trim()) {
                this.wordNotes[wordKey] = {
                    text: this.currentNote.trim(),
                    color: '#3b82f6'
                };
                this.selectedWordElement.setAttribute('data-has-note', 'true');
                this.selectedWordElement.setAttribute('data-note-text', this.currentNote.trim());
                this.selectedWordElement.setAttribute('data-note-color', '#3b82f6');
                this.selectedWordElement.style.setProperty('--note-color', '#3b82f6');
                this.selectedWordElement.classList.add('has-note');
            } else {
                delete this.wordNotes[wordKey];
                this.selectedWordElement.removeAttribute('data-has-note');
                this.selectedWordElement.removeAttribute('data-note-text');
                this.selectedWordElement.removeAttribute('data-note-color');
                this.selectedWordElement.style.removeProperty('--note-color');
                this.selectedWordElement.classList.remove('has-note');
            }

            this.saveHighlightData();
            this.applyHighlights(); // Apply highlights to show note icon immediately

            const noteModal = bootstrap.Modal.getInstance(document.getElementById('noteEditorModal'));
            noteModal.hide();
        },

        showInlineNoteEditor(word, element, prefillText = null) {
            this.selectedWord = word;
            this.selectedWordElement = element;

            // Remove any existing inline editor
            const existingEditor = document.querySelector('.inline-note-editor');
            if (existingEditor) {
                existingEditor.remove();
            }

            // Get current note or use prefilled text
            const wordKey = this.createWordKey(word, element);
            const savedData = this.wordNotes[wordKey];
            const currentNote = prefillText !== null ? prefillText : (typeof savedData === 'object' ? savedData.text : (savedData || ''));
            const currentColor = typeof savedData === 'object' ? savedData.color : '#3b82f6';

            // สีที่ให้เลือก - สีสดใส
            const colorOptions = [
                '#3b82f6', // น้ำเงินสด
                '#ef4444', // แดงสด
                '#10b981', // เขียวสด
                '#f97316', // ส้มสด
                '#a855f7', // ม่วงสด
                '#06b6d4', // ฟ้าสด
                '#eab308', // เหลืองสด
                '#ec4899', // ชมพูสด
                '#0ea5e9', // ฟ้าอ่อน
                '#84cc16', // เขียวมะนาว
                '#000000', // ดำ
                '#6b7280'  // เทา
            ];

            // Create inline editor
            const editor = document.createElement('div');
            editor.className = 'inline-note-editor';

            const colorSwatchesHtml = colorOptions.map(color =>
                `<button class="color-swatch ${color === currentColor ? 'selected' : ''}"
                        style="background-color: ${color}"
                        data-color="${color}"
                        type="button"></button>`
            ).join('');

            editor.innerHTML = `
                <div class="editor-top">
                    <input type="text" class="note-input" value="${currentNote.replace(/"/g, '&quot;')}" placeholder="เพิ่มโน้ต..." style="color: ${currentColor};" />
                    <button class="btn-save">บันทึก</button>
                    <button class="btn-cancel">ยกเลิก</button>
                </div>
                <div class="color-swatches">
                    ${colorSwatchesHtml}
                </div>
            `;

            // Position editor above the word
            element.style.position = 'relative';
            element.appendChild(editor);

            // Adjust position if off-screen
            requestAnimationFrame(() => {
                const rect = editor.getBoundingClientRect();
                const windowWidth = window.innerWidth;
                const padding = 20; // เพิ่ม padding ให้มากขึ้น

                // คำนวณตำแหน่งใหม่
                let newLeft = 0;

                // ถ้าโดนขอบขวา
                if (rect.right > windowWidth - padding) {
                    const overflow = rect.right - (windowWidth - padding);
                    newLeft = -overflow;
                    editor.style.left = `${newLeft}px`;
                    editor.style.right = 'auto';
                    editor.style.transform = 'none';
                }
                // ถ้าโดนขอบซ้าย
                else if (rect.left < padding) {
                    const overflow = padding - rect.left;
                    newLeft = overflow;
                    editor.style.left = `${newLeft}px`;
                    editor.style.right = 'auto';
                    editor.style.transform = 'none';
                }

                // ตรวจสอบอีกครั้งหลังปรับ และถ้ากว้างเกินไปให้ลดความกว้าง
                setTimeout(() => {
                    const updatedRect = editor.getBoundingClientRect();
                    if (updatedRect.width > windowWidth - (padding * 2)) {
                        editor.style.maxWidth = `${windowWidth - (padding * 2)}px`;
                        editor.style.left = `${padding - updatedRect.left}px`;
                        editor.style.transform = 'none';
                    }
                }, 10);
            });

            const input = editor.querySelector('.note-input');
            const colorSwatches = editor.querySelectorAll('.color-swatch');
            let selectedColor = currentColor;

            // Prevent input events from triggering outside click handler
            input.addEventListener('mousedown', (e) => {
                e.stopPropagation();
            });
            input.addEventListener('click', (e) => {
                e.stopPropagation();
            });

            // Handle color swatch clicks
            colorSwatches.forEach(swatch => {
                swatch.addEventListener('mousedown', (e) => {
                    e.stopPropagation();
                });
                swatch.addEventListener('click', (e) => {
                    e.stopPropagation();
                    // Remove selected class from all swatches
                    colorSwatches.forEach(s => s.classList.remove('selected'));
                    // Add selected class to clicked swatch
                    swatch.classList.add('selected');
                    // Update selected color
                    selectedColor = swatch.getAttribute('data-color');
                    // เปลี่ยนสีตัวหนังสือใน input ทันที
                    input.style.color = selectedColor;
                });
            });

            // Handle save
            const saveBtn = editor.querySelector('.btn-save');
            saveBtn.onclick = (e) => {
                e.stopPropagation();
                const newNote = input.value.trim();

                if (newNote) {
                    this.wordNotes[wordKey] = {
                        text: newNote,
                        color: selectedColor
                    };
                    element.setAttribute('data-has-note', 'true');
                    element.setAttribute('data-note-text', newNote);
                    element.setAttribute('data-note-color', selectedColor);
                    element.style.setProperty('--note-color', selectedColor);
                    element.classList.add('has-note');
                } else {
                    delete this.wordNotes[wordKey];
                    element.removeAttribute('data-has-note');
                    element.removeAttribute('data-note-text');
                    element.removeAttribute('data-note-color');
                    element.style.removeProperty('--note-color');
                    element.classList.remove('has-note');
                }

                this.saveHighlightData();
                editor.remove();
            };

            // Handle cancel
            const cancelBtn = editor.querySelector('.btn-cancel');
            cancelBtn.onclick = (e) => {
                e.stopPropagation();
                editor.remove();
            };

            // Handle Enter key
            input.onkeydown = (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    saveBtn.click();
                } else if (e.key === 'Escape') {
                    e.preventDefault();
                    cancelBtn.click();
                }
            };

            // Close on click outside (but not when clicking inside input for text selection)
            setTimeout(() => {
                const closeOnClickOutside = (e) => {
                    // Don't close if clicking on the editor itself (input or buttons)
                    if (editor.contains(e.target) || element.contains(e.target)) {
                        return;
                    }
                    editor.remove();
                    document.removeEventListener('mousedown', closeOnClickOutside);
                };
                document.addEventListener('mousedown', closeOnClickOutside);
            }, 0);
        },

        showNote(word, element) {
            const wordKey = this.createWordKey(word, element);
            if (!this.wordNotes[wordKey]) return;
            
            const rect = element.getBoundingClientRect();
            this.notePosition = {
                x: rect.left + window.scrollX,
                y: rect.bottom + window.scrollY + 5
            };
            
            this.activeNoteKey = wordKey;
        },
        
        hideNote() {
            this.activeNoteKey = null;
        },
        
        createWordKey(word, element) {
            // Clean word by removing any emojis and extra whitespace
            const cleanWord = word.replace(/📝/g, '').trim();
            const bookPage = `${this.currentBook}_${this.currentPage}`;
            const wordId = element.getAttribute('data-word-id');
            
            if (wordId) {
                const key = `${bookPage}_${wordId}_${cleanWord}`;
                return key;
            } else {
                // Fallback for elements without data-word-id
                const isPali = element.classList.contains('pali-word');
                const wordType = isPali ? 'pali' : 'thai';
                const allWords = document.querySelectorAll('.pali-word, .thai-word');
                const elementIndex = Array.from(allWords).indexOf(element);
                const key = `${bookPage}_fallback_${wordType}_${elementIndex}_${cleanWord}`;
                return key;
            }
        },
        
        getWordFromKey(key) {
            return key.split('_').pop();
        },

        findElementByWordKey(wordKey) {
            // Try to find element by matching word key
            const allWords = document.querySelectorAll('.pali-word, .thai-word');
            for (const element of allWords) {
                const word = element.textContent.trim();
                const elementKey = this.createWordKey(word, element);
                if (elementKey === wordKey) {
                    return element;
                }
            }
            return null;
        },
        
        applyHighlights() {
            setTimeout(() => {
                const allWords = document.querySelectorAll('.pali-word, .thai-word');
                console.log('Applying highlights to', allWords.length, 'words');
                console.log('Current highlights stored:', Object.keys(this.wordHighlights).length);
                
                allWords.forEach((element) => {
                    const word = element.textContent.trim();
                    const wordKey = this.createWordKey(word, element);
                    
                    if (this.wordHighlights[wordKey]) {
                        console.log('Found highlight for:', wordKey, this.wordHighlights[wordKey]);
                    }
                    
                    this.applyWordHighlight(element, wordKey);
                    this.applyWordNote(element, wordKey);
                });
            }, 100);
        },
        
        applyWordHighlight(element, wordKey) {
            const highlightColor = this.wordHighlights[wordKey];
            element.style.backgroundColor = highlightColor || '';
        },
        
        applyWordNote(element, wordKey) {
            const hasNote = this.wordNotes[wordKey];

            // Remove existing note icon if any
            const existingIcon = element.querySelector('.note-icon-btn');
            if (existingIcon) {
                existingIcon.remove();
            }

            if (hasNote) {
                const savedData = this.wordNotes[wordKey];
                const noteText = typeof savedData === 'object' ? savedData.text : savedData;
                const noteColor = typeof savedData === 'object' ? savedData.color : '#3b82f6';

                element.setAttribute('data-has-note', 'true');
                element.setAttribute('data-note-text', noteText);
                element.setAttribute('data-note-color', noteColor);
                element.style.setProperty('--note-color', noteColor);
                element.classList.add('has-note');
            } else {
                element.removeAttribute('data-has-note');
                element.removeAttribute('data-note-text');
                element.removeAttribute('data-note-color');
                element.style.removeProperty('--note-color');
                element.classList.remove('has-note');
            }
        },
        
        // Data Persistence
        loadHighlightData() {
            const highlightsData = this.getStorageData('dhamma-ebook-highlights');
            const notesData = this.getStorageData('dhamma-ebook-notes');
            
            if (highlightsData) this.wordHighlights = highlightsData;
            if (notesData) this.wordNotes = notesData;
        },
        
        saveHighlightData() {
            this.setStorageData('dhamma-ebook-highlights', this.wordHighlights);
            this.setStorageData('dhamma-ebook-notes', this.wordNotes);
        },
        
        getStorageData(key) {
            try {
                const data = localStorage.getItem(key);
                return data ? JSON.parse(data) : null;
            } catch (error) {
                console.error(`Error loading ${key}:`, error);
                return null;
            }
        },
        
        setStorageData(key, data) {
            try {
                localStorage.setItem(key, JSON.stringify(data));
            } catch (error) {
                console.error(`Error saving ${key}:`, error);
            }
        },
        
        clearAllHighlights() {
            this.wordHighlights = {};
            this.wordNotes = {};
            this.saveHighlightData();
            this.applyHighlights();
        },
        
        // PDF Export Methods
        openExportModal() {
            // Show modal without resetting settings (keep previous values)
            const modal = new bootstrap.Modal(document.getElementById('exportModal'));
            modal.show();
        },
        
        async generatePDF() {
            if (!this.canExport) {
                alert('กรุณาเลือกข้อมูลให้ครบถ้วน');
                return;
            }
            
            try {
                // Show loading
                const exportButton = document.querySelector('.export-pdf-btn');
                if (!exportButton) {
                    throw new Error('Export button not found');
                }
                const originalText = exportButton.innerHTML;
                exportButton.innerHTML = '<i class="spinner-border spinner-border-sm me-2"></i>กำลังสร้าง PDF...';
                exportButton.disabled = true;
                
                // Get data for selected pages using API
                const pageData = await this.getBookData(
                    this.exportSettings.selectedBook, 
                    this.exportSettings.fromPage, 
                    this.exportSettings.toPage
                );
                
                // Create PDF based on format
                const { jsPDF } = window.jspdf;
                const doc = new jsPDF('p', 'mm', 'a4');
                
                await this.setupPDFFont(doc);
                this.addPDFContent(doc, pageData);

                // Add footer to all pages
                this.addFooterToAllPages(doc);

                // Generate filename with format suffix
                let formatSuffix = '';
                switch (this.exportSettings.format) {
                    case 'pali-thai':
                        formatSuffix = '';
                        break;
                    case 'attha-thai-pali':
                        formatSuffix = '-อรรถ-พยัญชนะ-บาลี';
                        break;
                    case 'attha-thai-practice-pali':
                        formatSuffix = '-อรรถ-พยัญชนะ-แบบฝึกหัด-บาลี';
                        break;
                    case 'pali-practice':
                        formatSuffix = '-แบบฝึกหัด';
                        break;
                    case 'pali-thai-practice':
                        formatSuffix = '-พยัญชนะ-แบบฝึกหัด';
                        break;
                    case 'pali-practice-thai':
                        formatSuffix = '-แบบฝึกหัด-พยัญชนะ';
                        break;
                    case 'thai-practice':
                        formatSuffix = '-แบบฝึกหัดพยัญชนะ';
                        break;
                    case 'pali-only':
                        formatSuffix = '-บาลี';
                        break;
                    case 'pali-continuous':
                        formatSuffix = '-บาลีต่อเนื่อง';
                        break;
                    case 'thai-only':
                        formatSuffix = '-พยัญชนะ';
                        break;
                    case 'thai-continuous':
                        formatSuffix = '-พยัญชนะต่อเนื่อง';
                        break;
                    case 'attha-only':
                        formatSuffix = '-อรรถ';
                        break;
                    case 'attha-practice':
                        formatSuffix = '-แบบฝึกหัดอรรถ';
                        break;
                    case 'attha-practice-pali':
                        formatSuffix = '-อรรถ-แบบฝึกหัด-บาลี';
                        break;
                    case 'attha-continuous':
                        formatSuffix = '-อรรถต่อเนื่อง';
                        break;
                }

                const filename = `ธรรมบท-เล่ม${this.exportSettings.selectedBook}-หน้า${this.exportSettings.fromPage}-${this.exportSettings.toPage}${formatSuffix}.pdf`;
                doc.save(filename);


                // Hide modal
                bootstrap.Modal.getInstance(document.getElementById('exportModal')).hide();
                
                // Restore button
                exportButton.innerHTML = originalText;
                exportButton.disabled = false;
                
            } catch (error) {
                console.error('Error generating PDF:', error);
                alert('เกิดข้อผิดพลาดในการสร้าง PDF');

                // Restore button
                const exportButton = document.querySelector('.export-pdf-btn');
                if (exportButton) {
                    exportButton.innerHTML = '<i class="bi bi-file-earmark-pdf"></i> ส่งออก PDF';
                    exportButton.disabled = false;
                }
            }
        },

        async generateWord() {
            if (!this.canExport) {
                alert('กรุณาเลือกข้อมูลให้ครบถ้วน');
                return;
            }

            try {
                // Show loading
                const exportButton = document.querySelector('.export-word-btn');
                if (!exportButton) {
                    throw new Error('Export button not found');
                }
                const originalText = exportButton.innerHTML;
                exportButton.innerHTML = '<i class="spinner-border spinner-border-sm me-2"></i>กำลังสร้าง Word...';
                exportButton.disabled = true;

                // Get data for selected pages using API
                const pageData = await this.getBookData(
                    this.exportSettings.selectedBook,
                    this.exportSettings.fromPage,
                    this.exportSettings.toPage
                );

                // Create Word document based on format
                const doc = await this.createWordDocument(pageData);

                // Generate filename with format suffix
                let formatSuffix = '';
                switch (this.exportSettings.format) {
                    case 'pali-thai':
                        formatSuffix = '';
                        break;
                    case 'attha-thai-pali':
                        formatSuffix = '-อรรถ-พยัญชนะ-บาลี';
                        break;
                    case 'attha-thai-practice-pali':
                        formatSuffix = '-อรรถ-พยัญชนะ-แบบฝึกหัด-บาลี';
                        break;
                    case 'pali-practice':
                        formatSuffix = '-แบบฝึกหัด';
                        break;
                    case 'pali-thai-practice':
                        formatSuffix = '-พยัญชนะ-แบบฝึกหัด';
                        break;
                    case 'pali-practice-thai':
                        formatSuffix = '-แบบฝึกหัด-พยัญชนะ';
                        break;
                    case 'thai-practice':
                        formatSuffix = '-แบบฝึกหัดพยัญชนะ';
                        break;
                    case 'pali-only':
                        formatSuffix = '-บาลี';
                        break;
                    case 'pali-continuous':
                        formatSuffix = '-บาลีต่อเนื่อง';
                        break;
                    case 'thai-only':
                        formatSuffix = '-พยัญชนะ';
                        break;
                    case 'thai-continuous':
                        formatSuffix = '-พยัญชนะต่อเนื่อง';
                        break;
                    case 'attha-only':
                        formatSuffix = '-อรรถ';
                        break;
                    case 'attha-practice':
                        formatSuffix = '-แบบฝึกหัดอรรถ';
                        break;
                    case 'attha-practice-pali':
                        formatSuffix = '-อรรถ-แบบฝึกหัด-บาลี';
                        break;
                    case 'attha-continuous':
                        formatSuffix = '-อรรถต่อเนื่อง';
                        break;
                }

                const filename = `ธรรมบท-เล่ม${this.exportSettings.selectedBook}-หน้า${this.exportSettings.fromPage}-${this.exportSettings.toPage}${formatSuffix}.docx`;

                // Generate and save Word document
                const { Packer } = window.docx;
                const blob = await Packer.toBlob(doc);
                saveAs(blob, filename);

                // Hide modal
                bootstrap.Modal.getInstance(document.getElementById('exportModal')).hide();

                // Restore button
                exportButton.innerHTML = originalText;
                exportButton.disabled = false;

            } catch (error) {
                console.error('Error generating Word:', error);
                alert('เกิดข้อผิดพลาดในการสร้าง Word: ' + error.message);

                // Restore button
                const exportButton = document.querySelector('.export-word-btn');
                if (exportButton) {
                    exportButton.innerHTML = '<i class="bi bi-file-earmark-word"></i> ส่งออก Word';
                    exportButton.disabled = false;
                }
            }
        },

        async createWordDocument(pageData) {
            const { Document, Paragraph, TextRun, AlignmentType, HeadingLevel, BorderStyle } = window.docx;

            const baseFontSize = parseInt(this.exportSettings.fontSize) || 16;
            const titleText = `ธรรมบท ภาค ${this.exportSettings.selectedBook} หน้า ${this.exportSettings.fromPage}-${this.exportSettings.toPage}`;

            let children = [];

            // Add title
            children.push(
                new Paragraph({
                    text: titleText,
                    heading: HeadingLevel.HEADING_1,
                    alignment: AlignmentType.LEFT,
                    spacing: { after: 300 }
                })
            );

            // Add content based on format
            switch (this.exportSettings.format) {
                case 'pali-thai':
                    children = children.concat(this.addWordPaliThaiFormat(pageData, baseFontSize));
                    break;
                case 'attha-thai-pali':
                    children = children.concat(this.addWordAtthaThaiPaliFormat(pageData, baseFontSize));
                    break;
                case 'attha-thai-practice-pali':
                    children = children.concat(this.addWordAtthaThaiPracticePaliFormat(pageData, baseFontSize));
                    break;
                case 'pali-practice':
                    children = children.concat(this.addWordPaliPracticeFormat(pageData, baseFontSize));
                    break;
                case 'pali-thai-practice':
                    children = children.concat(this.addWordPaliThaiPracticeFormat(pageData, baseFontSize));
                    break;
                case 'pali-practice-thai':
                    children = children.concat(this.addWordPaliPracticeThaiFormat(pageData, baseFontSize));
                    break;
                case 'thai-practice':
                    children = children.concat(this.addWordThaiPracticeFormat(pageData, baseFontSize));
                    break;
                case 'pali-only':
                    children = children.concat(this.addWordPaliOnlyFormat(pageData, baseFontSize));
                    break;
                case 'pali-continuous':
                    children = children.concat(this.addWordPaliContinuousFormat(pageData, baseFontSize));
                    break;
                case 'thai-only':
                    children = children.concat(this.addWordThaiOnlyFormat(pageData, baseFontSize));
                    break;
                case 'thai-continuous':
                    children = children.concat(this.addWordThaiContinuousFormat(pageData, baseFontSize));
                    break;
                case 'attha-only':
                    children = children.concat(this.addWordAtthaOnlyFormat(pageData, baseFontSize));
                    break;
                case 'attha-practice':
                    children = children.concat(this.addWordAtthaPracticeFormat(pageData, baseFontSize));
                    break;
                case 'attha-practice-pali':
                    children = children.concat(this.addWordAtthaPracticePaliFormat(pageData, baseFontSize));
                    break;
                case 'attha-continuous':
                    children = children.concat(this.addWordAtthaContinuousFormat(pageData, baseFontSize));
                    break;
            }

            // Add footer
            children.push(
                new Paragraph({
                    text: '©2025 purivaro.com',
                    alignment: AlignmentType.CENTER,
                    spacing: { before: 400 }
                })
            );

            return new Document({
                sections: [{
                    properties: {},
                    children: children
                }]
            });
        },

        addWordPaliThaiFormat(pageData, baseFontSize) {
            const { Paragraph, TextRun } = window.docx;
            let paragraphs = [];
            let currentPage = null;
            let currentStoryTitle = null;
            let verseNumber = 1;

            pageData.forEach(line => {
                const cleanPali = this.cleanText(line.pali, true);
                const cleanThai = this.cleanText(line.thai);
                const cleanTitle = this.cleanText(line.story_title);

                // Add page and story title header
                if ((line.page && line.page !== currentPage) || (cleanTitle && cleanTitle !== currentStoryTitle)) {
                    let headerText = '';
                    if (line.page && line.page !== currentPage) {
                        headerText = `หน้า ${line.page}`;
                        currentPage = line.page;
                        if (cleanTitle) {
                            headerText += ` - ${cleanTitle}`;
                        }
                        currentStoryTitle = cleanTitle;
                    }

                    if (headerText) {
                        paragraphs.push(
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: headerText,
                                        bold: true,
                                        size: (baseFontSize + 2) * 2
                                    })
                                ],
                                spacing: { before: 200, after: 200 }
                            })
                        );
                    }
                }

                // Add Pali-Thai content
                if (cleanPali && cleanThai) {
                    const numberText = this.exportSettings.numberingStyle === 'number' ? `${verseNumber}.` : '•';

                    // Add Pali text
                    paragraphs.push(
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: `${numberText} ${cleanPali}`,
                                    size: baseFontSize * 2
                                })
                            ],
                            spacing: { after: 50 }
                        })
                    );

                    // Add Thai text on new line
                    paragraphs.push(
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: cleanThai,
                                    size: baseFontSize * 2,
                                    color: '00008B'
                                })
                            ],
                            spacing: { after: 150 }
                        })
                    );
                    verseNumber++;
                }
            });

            return paragraphs;
        },

        addWordAtthaThaiPaliFormat(pageData, baseFontSize) {
            const { Paragraph, TextRun } = window.docx;
            let paragraphs = [];
            let currentPage = null;
            let currentStoryTitle = null;
            let verseNumber = 1;

            pageData.forEach(line => {
                const cleanPali = this.cleanText(line.pali, true);
                const cleanThai = this.cleanText(line.thai);
                const cleanAttha = this.cleanText(line.thai_attha);
                const cleanTitle = this.cleanText(line.story_title);

                // Add page and story title header
                if ((line.page && line.page !== currentPage) || (cleanTitle && cleanTitle !== currentStoryTitle)) {
                    let headerText = '';
                    if (line.page && line.page !== currentPage) {
                        headerText = `หน้า ${line.page}`;
                        currentPage = line.page;
                        if (cleanTitle) {
                            headerText += ` - ${cleanTitle}`;
                        }
                        currentStoryTitle = cleanTitle;
                    }

                    if (headerText) {
                        paragraphs.push(
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: headerText,
                                        bold: true,
                                        size: (baseFontSize + 2) * 2
                                    })
                                ],
                                spacing: { before: 200, after: 200 }
                            })
                        );
                    }
                }

                // Add Attha-Thai-Pali content
                if (cleanPali && cleanThai) {
                    const numberText = this.exportSettings.numberingStyle === 'number' ? `${verseNumber}.` : '•';

                    // Add Attha text (if exists) with numbering
                    if (cleanAttha) {
                        paragraphs.push(
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: `${numberText} ${cleanAttha}`,
                                        size: baseFontSize * 2,
                                        color: '00008B'
                                    })
                                ],
                                spacing: { after: 50 }
                            })
                        );
                    }

                    // Add Thai text (without numbering since attha already has it)
                    paragraphs.push(
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: cleanThai,
                                    size: baseFontSize * 2,
                                    color: '000000'
                                })
                            ],
                            spacing: { after: 50 }
                        })
                    );

                    // Add Pali text
                    paragraphs.push(
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: cleanPali,
                                    size: baseFontSize * 2
                                })
                            ],
                            spacing: { after: 150 }
                        })
                    );
                    verseNumber++;
                }
            });

            return paragraphs;
        },

        addWordAtthaThaiPracticePaliFormat(pageData, baseFontSize) {
            const { Paragraph, TextRun } = window.docx;
            let paragraphs = [];
            let currentPage = null;
            let currentStoryTitle = null;
            let verseNumber = 1;

            pageData.forEach(line => {
                const cleanPali = this.cleanText(line.pali, true);
                const cleanThai = this.cleanText(line.thai);
                const cleanAttha = this.cleanText(line.thai_attha);
                const cleanTitle = this.cleanText(line.story_title);

                // Add page and story title header
                if ((line.page && line.page !== currentPage) || (cleanTitle && cleanTitle !== currentStoryTitle)) {
                    let headerText = '';
                    if (line.page && line.page !== currentPage) {
                        headerText = `หน้า ${line.page}`;
                        currentPage = line.page;
                        if (cleanTitle) {
                            headerText += ` - ${cleanTitle}`;
                        }
                        currentStoryTitle = cleanTitle;
                    }

                    if (headerText) {
                        paragraphs.push(
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: headerText,
                                        bold: true,
                                        size: (baseFontSize + 2) * 2
                                    })
                                ],
                                spacing: { before: 200, after: 200 }
                            })
                        );
                    }
                }

                // Add Attha-Thai-Practice-Pali content
                if (cleanPali && cleanThai) {
                    const numberText = this.exportSettings.numberingStyle === 'number' ? `${verseNumber}.` : '•';

                    // Add Attha text (if exists) with numbering
                    if (cleanAttha) {
                        paragraphs.push(
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: `${numberText} ${cleanAttha}`,
                                        size: baseFontSize * 2,
                                        color: '00008B'
                                    })
                                ],
                                spacing: { after: 50 }
                            })
                        );
                    }

                    // Add Thai text (without numbering)
                    paragraphs.push(
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: cleanThai,
                                    size: baseFontSize * 2,
                                    color: '000000'
                                })
                            ],
                            spacing: { after: 100 }
                        })
                    );

                    // Add practice lines
                    paragraphs.push(
                        new Paragraph({
                            text: '_'.repeat(80),
                            spacing: { after: 100 }
                        }),
                        new Paragraph({
                            text: '_'.repeat(80),
                            spacing: { after: 100 }
                        })
                    );

                    // Add Pali text
                    paragraphs.push(
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: cleanPali,
                                    size: baseFontSize * 2
                                })
                            ],
                            spacing: { after: 150 }
                        })
                    );
                    verseNumber++;
                }
            });

            return paragraphs;
        },

        addWordPaliPracticeFormat(pageData, baseFontSize) {
            const { Paragraph, TextRun } = window.docx;
            let paragraphs = [];
            let currentPage = null;
            let currentStoryTitle = null;
            let verseNumber = 1;

            pageData.forEach(line => {
                const cleanPali = this.cleanText(line.pali, true);
                const cleanTitle = this.cleanText(line.story_title);

                if ((line.page && line.page !== currentPage) || (cleanTitle && cleanTitle !== currentStoryTitle)) {
                    let headerText = '';
                    if (line.page && line.page !== currentPage) {
                        headerText = `หน้า ${line.page}`;
                        currentPage = line.page;
                        if (cleanTitle) {
                            headerText += ` - ${cleanTitle}`;
                        }
                        currentStoryTitle = cleanTitle;
                    }

                    if (headerText) {
                        paragraphs.push(
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: headerText,
                                        bold: true,
                                        size: (baseFontSize + 2) * 2
                                    })
                                ],
                                spacing: { before: 200, after: 200 }
                            })
                        );
                    }
                }

                if (cleanPali) {
                    const numberText = this.exportSettings.numberingStyle === 'number' ? `${verseNumber}.` : '•';

                    paragraphs.push(
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: `${numberText} ${cleanPali}`,
                                    size: baseFontSize * 2
                                })
                            ],
                            spacing: { after: 100 }
                        }),
                        new Paragraph({
                            text: '_'.repeat(80),
                            spacing: { after: 100 }
                        }),
                        new Paragraph({
                            text: '_'.repeat(80),
                            spacing: { after: 150 }
                        })
                    );
                    verseNumber++;
                }
            });

            return paragraphs;
        },

        addWordPaliThaiPracticeFormat(pageData, baseFontSize) {
            const { Paragraph, TextRun } = window.docx;
            let paragraphs = [];
            let currentPage = null;
            let currentStoryTitle = null;
            let verseNumber = 1;

            pageData.forEach(line => {
                const cleanPali = this.cleanText(line.pali, true);
                const cleanThai = this.cleanText(line.thai);
                const cleanTitle = this.cleanText(line.story_title);

                if ((line.page && line.page !== currentPage) || (cleanTitle && cleanTitle !== currentStoryTitle)) {
                    let headerText = '';
                    if (line.page && line.page !== currentPage) {
                        headerText = `หน้า ${line.page}`;
                        currentPage = line.page;
                        if (cleanTitle) {
                            headerText += ` - ${cleanTitle}`;
                        }
                        currentStoryTitle = cleanTitle;
                    }

                    if (headerText) {
                        paragraphs.push(
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: headerText,
                                        bold: true,
                                        size: (baseFontSize + 2) * 2
                                    })
                                ],
                                spacing: { before: 200, after: 200 }
                            })
                        );
                    }
                }

                if (cleanPali) {
                    const numberText = this.exportSettings.numberingStyle === 'number' ? `${verseNumber}.` : '•';

                    paragraphs.push(
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: `${numberText} ${cleanPali}`,
                                    size: baseFontSize * 2
                                })
                            ],
                            spacing: { after: 80 }
                        })
                    );

                    if (cleanThai) {
                        paragraphs.push(
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: cleanThai,
                                        size: baseFontSize * 2,
                                        color: '00008B'
                                    })
                                ],
                                spacing: { after: 100 }
                            })
                        );
                    }

                    paragraphs.push(
                        new Paragraph({
                            text: '_'.repeat(80),
                            spacing: { after: 100 }
                        }),
                        new Paragraph({
                            text: '_'.repeat(80),
                            spacing: { after: 150 }
                        })
                    );
                    verseNumber++;
                }
            });

            return paragraphs;
        },

        addWordPaliPracticeThaiFormat(pageData, baseFontSize) {
            const { Paragraph, TextRun } = window.docx;
            let paragraphs = [];
            let currentPage = null;
            let currentStoryTitle = null;
            let verseNumber = 1;

            pageData.forEach(line => {
                const cleanPali = this.cleanText(line.pali, true);
                const cleanThai = this.cleanText(line.thai);
                const cleanTitle = this.cleanText(line.story_title);

                if ((line.page && line.page !== currentPage) || (cleanTitle && cleanTitle !== currentStoryTitle)) {
                    let headerText = '';
                    if (line.page && line.page !== currentPage) {
                        headerText = `หน้า ${line.page}`;
                        currentPage = line.page;
                        if (cleanTitle) {
                            headerText += ` - ${cleanTitle}`;
                        }
                        currentStoryTitle = cleanTitle;
                    }

                    if (headerText) {
                        paragraphs.push(
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: headerText,
                                        bold: true,
                                        size: (baseFontSize + 2) * 2
                                    })
                                ],
                                spacing: { before: 200, after: 200 }
                            })
                        );
                    }
                }

                if (cleanPali) {
                    const numberText = this.exportSettings.numberingStyle === 'number' ? `${verseNumber}.` : '•';

                    paragraphs.push(
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: `${numberText} ${cleanPali}`,
                                    size: baseFontSize * 2
                                })
                            ],
                            spacing: { after: 80 }
                        })
                    );

                    paragraphs.push(
                        new Paragraph({
                            text: '_'.repeat(80),
                            spacing: { after: 100 }
                        }),
                        new Paragraph({
                            text: '_'.repeat(80),
                            spacing: { after: 100 }
                        })
                    );

                    if (cleanThai) {
                        paragraphs.push(
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: cleanThai,
                                        size: baseFontSize * 2,
                                        color: '00008B'
                                    })
                                ],
                                spacing: { after: 150 }
                            })
                        );
                    }

                    verseNumber++;
                }
            });

            return paragraphs;
        },

        addWordThaiPracticeFormat(pageData, baseFontSize) {
            const { Paragraph, TextRun } = window.docx;
            let paragraphs = [];
            let currentPage = null;
            let currentStoryTitle = null;
            let verseNumber = 1;

            pageData.forEach(line => {
                const cleanThai = this.cleanText(line.thai);
                const cleanTitle = this.cleanText(line.story_title);

                if ((line.page && line.page !== currentPage) || (cleanTitle && cleanTitle !== currentStoryTitle)) {
                    let headerText = '';
                    if (line.page && line.page !== currentPage) {
                        headerText = `หน้า ${line.page}`;
                        currentPage = line.page;
                        if (cleanTitle) {
                            headerText += ` - ${cleanTitle}`;
                        }
                        currentStoryTitle = cleanTitle;
                    }

                    if (headerText) {
                        paragraphs.push(
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: headerText,
                                        bold: true,
                                        size: (baseFontSize + 2) * 2
                                    })
                                ],
                                spacing: { before: 200, after: 200 }
                            })
                        );
                    }
                }

                if (cleanThai) {
                    const numberText = this.exportSettings.numberingStyle === 'number' ? `${verseNumber}.` : '•';

                    paragraphs.push(
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: `${numberText} ${cleanThai}`,
                                    size: baseFontSize * 2,
                                    color: '000000'  // Black color for Thai-only format
                                })
                            ],
                            spacing: { after: 100 }
                        }),
                        new Paragraph({
                            text: '_'.repeat(80),
                            spacing: { after: 100 }
                        }),
                        new Paragraph({
                            text: '_'.repeat(80),
                            spacing: { after: 150 }
                        })
                    );
                    verseNumber++;
                }
            });

            return paragraphs;
        },

        addWordPaliOnlyFormat(pageData, baseFontSize) {
            const { Paragraph, TextRun } = window.docx;
            let paragraphs = [];
            let currentPage = null;
            let currentStoryTitle = null;
            let verseNumber = 1;

            pageData.forEach(line => {
                const cleanPali = this.cleanText(line.pali, true);
                const cleanTitle = this.cleanText(line.story_title);

                if ((line.page && line.page !== currentPage) || (cleanTitle && cleanTitle !== currentStoryTitle)) {
                    let headerText = '';
                    if (line.page && line.page !== currentPage) {
                        headerText = `หน้า ${line.page}`;
                        currentPage = line.page;
                        if (cleanTitle) {
                            headerText += ` - ${cleanTitle}`;
                        }
                        currentStoryTitle = cleanTitle;
                    }

                    if (headerText) {
                        paragraphs.push(
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: headerText,
                                        bold: true,
                                        size: (baseFontSize + 2) * 2
                                    })
                                ],
                                spacing: { before: 200, after: 200 }
                            })
                        );
                    }
                }

                if (cleanPali) {
                    const numberText = this.exportSettings.numberingStyle === 'number' ? `${verseNumber}.` : '•';

                    paragraphs.push(
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: `${numberText} ${cleanPali}`,
                                    size: baseFontSize * 2
                                })
                            ],
                            spacing: { after: 150 }
                        })
                    );
                    verseNumber++;
                }
            });

            return paragraphs;
        },

        addWordThaiOnlyFormat(pageData, baseFontSize) {
            const { Paragraph, TextRun } = window.docx;
            let paragraphs = [];
            let currentPage = null;
            let currentStoryTitle = null;
            let verseNumber = 1;

            pageData.forEach(line => {
                const cleanThai = this.cleanText(line.thai);
                const cleanTitle = this.cleanText(line.story_title);

                if ((line.page && line.page !== currentPage) || (cleanTitle && cleanTitle !== currentStoryTitle)) {
                    let headerText = '';
                    if (line.page && line.page !== currentPage) {
                        headerText = `หน้า ${line.page}`;
                        currentPage = line.page;
                        if (cleanTitle) {
                            headerText += ` - ${cleanTitle}`;
                        }
                        currentStoryTitle = cleanTitle;
                    }

                    if (headerText) {
                        paragraphs.push(
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: headerText,
                                        bold: true,
                                        size: (baseFontSize + 2) * 2
                                    })
                                ],
                                spacing: { before: 200, after: 200 }
                            })
                        );
                    }
                }

                if (cleanThai) {
                    const numberText = this.exportSettings.numberingStyle === 'number' ? `${verseNumber}.` : '•';

                    paragraphs.push(
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: `${numberText} ${cleanThai}`,
                                    size: baseFontSize * 2
                                })
                            ],
                            spacing: { after: 150 }
                        })
                    );
                    verseNumber++;
                }
            });

            return paragraphs;
        },

        addWordPaliContinuousFormat(pageData, baseFontSize) {
            const { Paragraph, TextRun } = window.docx;
            let paragraphs = [];
            let currentPage = null;
            let currentStoryTitle = null;
            let continuousText = '';

            pageData.forEach((line, index) => {
                const cleanPali = this.cleanText(line.pali, true);
                const cleanTitle = this.cleanText(line.story_title);

                // Check if we need to output accumulated text before showing new header
                const headerChanged = (line.page && line.page !== currentPage) || (cleanTitle && cleanTitle !== currentStoryTitle);

                if (headerChanged && continuousText) {
                    // Output accumulated continuous text
                    paragraphs.push(
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: continuousText.trim(),
                                    size: baseFontSize * 2
                                })
                            ],
                            spacing: { after: 300 }
                        })
                    );
                    continuousText = '';
                }

                // Show page and story title when it changes
                if (headerChanged) {
                    let headerText = '';
                    if (line.page && line.page !== currentPage) {
                        headerText = `หน้า ${line.page}`;
                        currentPage = line.page;
                    }
                    if (cleanTitle && cleanTitle !== currentStoryTitle) {
                        if (headerText) headerText += ' - ';
                        headerText += cleanTitle;
                        currentStoryTitle = cleanTitle;
                    }

                    if (headerText) {
                        paragraphs.push(
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: headerText,
                                        bold: true,
                                        size: (baseFontSize + 2) * 2
                                    })
                                ],
                                spacing: { before: 200, after: 200 }
                            })
                        );
                    }
                }

                // Accumulate Pali text with space separator
                if (cleanPali) {
                    continuousText += (continuousText ? ' ' : '') + cleanPali;
                }

                // If this is the last line, output remaining text
                if (index === pageData.length - 1 && continuousText) {
                    paragraphs.push(
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: continuousText.trim(),
                                    size: baseFontSize * 2
                                })
                            ],
                            spacing: { after: 150 }
                        })
                    );
                }
            });

            return paragraphs;
        },

        addWordThaiContinuousFormat(pageData, baseFontSize) {
            const { Paragraph, TextRun } = window.docx;
            let paragraphs = [];
            let currentPage = null;
            let currentStoryTitle = null;
            let continuousText = '';

            pageData.forEach((line, index) => {
                const cleanThai = this.cleanText(line.thai);
                const cleanTitle = this.cleanText(line.story_title);

                // Check if we need to output accumulated text before showing new header
                const headerChanged = (line.page && line.page !== currentPage) || (cleanTitle && cleanTitle !== currentStoryTitle);

                if (headerChanged && continuousText) {
                    // Output accumulated continuous text (black color for Thai-only format)
                    paragraphs.push(
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: continuousText.trim(),
                                    size: baseFontSize * 2,
                                    color: '000000'  // Black color
                                })
                            ],
                            spacing: { after: 300 }
                        })
                    );
                    continuousText = '';
                }

                // Show page and story title when it changes
                if (headerChanged) {
                    let headerText = '';
                    if (line.page && line.page !== currentPage) {
                        headerText = `หน้า ${line.page}`;
                        currentPage = line.page;
                    }
                    if (cleanTitle && cleanTitle !== currentStoryTitle) {
                        if (headerText) headerText += ' - ';
                        headerText += cleanTitle;
                        currentStoryTitle = cleanTitle;
                    }

                    if (headerText) {
                        paragraphs.push(
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: headerText,
                                        bold: true,
                                        size: (baseFontSize + 2) * 2
                                    })
                                ],
                                spacing: { before: 200, after: 200 }
                            })
                        );
                    }
                }

                // Accumulate Thai text with space separator
                if (cleanThai) {
                    continuousText += (continuousText ? ' ' : '') + cleanThai;
                }

                // If this is the last line, output remaining text (black color for Thai-only format)
                if (index === pageData.length - 1 && continuousText) {
                    paragraphs.push(
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: continuousText.trim(),
                                    size: baseFontSize * 2,
                                    color: '000000'  // Black color
                                })
                            ],
                            spacing: { after: 150 }
                        })
                    );
                }
            });

            return paragraphs;
        },

        // Word Format: Attha Only (อรรถ อย่างเดียว)
        addWordAtthaOnlyFormat(pageData, baseFontSize) {
            const { Paragraph, TextRun } = window.docx;
            let paragraphs = [];
            let currentPage = null;
            let currentStoryTitle = null;
            let verseNumber = 1;

            pageData.forEach(line => {
                const cleanAttha = this.cleanText(line.thai_attha);
                const cleanTitle = this.cleanText(line.story_title);

                if ((line.page && line.page !== currentPage) || (cleanTitle && cleanTitle !== currentStoryTitle)) {
                    let headerText = '';
                    if (line.page && line.page !== currentPage) {
                        headerText = `หน้า ${line.page}`;
                        currentPage = line.page;
                        if (cleanTitle) {
                            headerText += ` - ${cleanTitle}`;
                        }
                        currentStoryTitle = cleanTitle;
                    }

                    if (headerText) {
                        paragraphs.push(
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: headerText,
                                        bold: true,
                                        size: (baseFontSize + 2) * 2
                                    })
                                ],
                                spacing: { before: 200, after: 200 }
                            })
                        );
                    }
                }

                if (cleanAttha) {
                    const numberText = this.exportSettings.numberingStyle === 'number' ? `${verseNumber}.` : '•';

                    paragraphs.push(
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: `${numberText} ${cleanAttha}`,
                                    size: baseFontSize * 2,
                                    color: '00008B'  // Dark blue color
                                })
                            ],
                            spacing: { after: 150 }
                        })
                    );
                    verseNumber++;
                }
            });

            return paragraphs;
        },

        // Word Format: Attha Practice (อรรถ-แบบฝึกหัด)
        addWordAtthaPracticeFormat(pageData, baseFontSize) {
            const { Paragraph, TextRun } = window.docx;
            let paragraphs = [];
            let currentPage = null;
            let currentStoryTitle = null;
            let verseNumber = 1;

            pageData.forEach(line => {
                const cleanAttha = this.cleanText(line.thai_attha);
                const cleanTitle = this.cleanText(line.story_title);

                if ((line.page && line.page !== currentPage) || (cleanTitle && cleanTitle !== currentStoryTitle)) {
                    let headerText = '';
                    if (line.page && line.page !== currentPage) {
                        headerText = `หน้า ${line.page}`;
                        currentPage = line.page;
                        if (cleanTitle) {
                            headerText += ` - ${cleanTitle}`;
                        }
                        currentStoryTitle = cleanTitle;
                    }

                    if (headerText) {
                        paragraphs.push(
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: headerText,
                                        bold: true,
                                        size: (baseFontSize + 2) * 2
                                    })
                                ],
                                spacing: { before: 200, after: 200 }
                            })
                        );
                    }
                }

                if (cleanAttha) {
                    const numberText = this.exportSettings.numberingStyle === 'number' ? `${verseNumber}.` : '•';

                    paragraphs.push(
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: `${numberText} ${cleanAttha}`,
                                    size: baseFontSize * 2,
                                    color: '00008B'  // Dark blue color
                                })
                            ],
                            spacing: { after: 100 }
                        }),
                        new Paragraph({
                            text: '_'.repeat(80),
                            spacing: { after: 100 }
                        }),
                        new Paragraph({
                            text: '_'.repeat(80),
                            spacing: { after: 150 }
                        })
                    );
                    verseNumber++;
                }
            });

            return paragraphs;
        },

        // Word Format: Attha Practice Pali (อรรถ-แบบฝึกหัด-บาลี)
        addWordAtthaPracticePaliFormat(pageData, baseFontSize) {
            const { Paragraph, TextRun } = window.docx;
            let paragraphs = [];
            let currentPage = null;
            let currentStoryTitle = null;
            let verseNumber = 1;

            pageData.forEach(line => {
                const cleanAttha = this.cleanText(line.thai_attha);
                const cleanPali = this.cleanText(line.pali, true);
                const cleanTitle = this.cleanText(line.story_title);

                if ((line.page && line.page !== currentPage) || (cleanTitle && cleanTitle !== currentStoryTitle)) {
                    let headerText = '';
                    if (line.page && line.page !== currentPage) {
                        headerText = `หน้า ${line.page}`;
                        currentPage = line.page;
                        if (cleanTitle) {
                            headerText += ` - ${cleanTitle}`;
                        }
                        currentStoryTitle = cleanTitle;
                    }

                    if (headerText) {
                        paragraphs.push(
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: headerText,
                                        bold: true,
                                        size: (baseFontSize + 2) * 2
                                    })
                                ],
                                spacing: { before: 200, after: 200 }
                            })
                        );
                    }
                }

                if (cleanAttha || cleanPali) {
                    const numberText = this.exportSettings.numberingStyle === 'number' ? `${verseNumber}.` : '•';

                    // Add attha text (dark blue)
                    if (cleanAttha) {
                        paragraphs.push(
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: `${numberText} ${cleanAttha}`,
                                        size: baseFontSize * 2,
                                        color: '00008B'  // Dark blue color
                                    })
                                ],
                                spacing: { after: 100 }
                            })
                        );
                    }

                    // Add practice lines
                    paragraphs.push(
                        new Paragraph({
                            text: '_'.repeat(80),
                            spacing: { after: 100 }
                        }),
                        new Paragraph({
                            text: '_'.repeat(80),
                            spacing: { after: 150 }
                        })
                    );

                    // Add Pali text (amber/brown)
                    if (cleanPali) {
                        paragraphs.push(
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: cleanPali,
                                        size: baseFontSize * 2,
                                        color: 'B45309'  // Amber-700 color
                                    })
                                ],
                                spacing: { after: 200 }
                            })
                        );
                    }

                    verseNumber++;
                }
            });

            return paragraphs;
        },

        // Word Format: Attha Continuous (อรรถต่อเนื่อง)
        addWordAtthaContinuousFormat(pageData, baseFontSize) {
            const { Paragraph, TextRun } = window.docx;
            let paragraphs = [];
            let currentPage = null;
            let currentStoryTitle = null;
            let continuousText = '';

            pageData.forEach((line, index) => {
                const cleanAttha = this.cleanText(line.thai_attha);
                const cleanTitle = this.cleanText(line.story_title);

                // Check if we need to output accumulated text before showing new header
                const headerChanged = (line.page && line.page !== currentPage) || (cleanTitle && cleanTitle !== currentStoryTitle);

                if (headerChanged && continuousText) {
                    // Output accumulated continuous text (dark blue color)
                    paragraphs.push(
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: continuousText.trim(),
                                    size: baseFontSize * 2,
                                    color: '00008B'  // Dark blue color
                                })
                            ],
                            spacing: { after: 300 }
                        })
                    );
                    continuousText = '';
                }

                // Show page and story title when it changes
                if (headerChanged) {
                    let headerText = '';
                    if (line.page && line.page !== currentPage) {
                        headerText = `หน้า ${line.page}`;
                        currentPage = line.page;
                    }
                    if (cleanTitle && cleanTitle !== currentStoryTitle) {
                        if (headerText) headerText += ' - ';
                        headerText += cleanTitle;
                        currentStoryTitle = cleanTitle;
                    }

                    if (headerText) {
                        paragraphs.push(
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: headerText,
                                        bold: true,
                                        size: (baseFontSize + 2) * 2
                                    })
                                ],
                                spacing: { before: 200, after: 200 }
                            })
                        );
                    }
                }

                // Accumulate attha text with space separator
                if (cleanAttha) {
                    continuousText += (continuousText ? ' ' : '') + cleanAttha;
                }

                // If this is the last line, output remaining text (dark blue color)
                if (index === pageData.length - 1 && continuousText) {
                    paragraphs.push(
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: continuousText.trim(),
                                    size: baseFontSize * 2,
                                    color: '00008B'  // Dark blue color
                                })
                            ],
                            spacing: { after: 150 }
                        })
                    );
                }
            });

            return paragraphs;
        },

        async getBookData(bookNumber, fromPage, toPage) {
            // Use existing API like the main ebook functionality
            const params = new URLSearchParams({
                book: bookNumber,
                page_start: fromPage,
                page_end: toPage
            });
            
            const response = await fetch(`api/get_lines.php?${params}`);
            if (!response.ok) {
                throw new Error(`Failed to load book ${bookNumber} data`);
            }
            const data = await response.json();
            return data.lines || [];
        },


        // Add footer to all pages in PDF
        addFooterToAllPages(doc) {
            const totalPages = doc.internal.getNumberOfPages();
            const pageHeight = doc.internal.pageSize.height;
            const pageWidth = doc.internal.pageSize.width;
            const footerY = pageHeight - 10; // 10mm from bottom
            const margin = 20; // Left and right margin

            // Save current font settings
            const currentFontSize = doc.internal.getFontSize();

            for (let i = 1; i <= totalPages; i++) {
                doc.setPage(i);
                doc.setFontSize(12); // Slightly larger font for footer
                doc.setTextColor(128, 128, 128); // Gray color

                // Center the copyright text
                const copyrightText = '©2025 purivaro.com';
                const copyrightWidth = doc.getTextWidth(copyrightText);
                const centerX = (pageWidth - copyrightWidth) / 2;
                doc.text(copyrightText, centerX, footerY);

                // Add page number at bottom right
                const pageText = `${i}/${totalPages}`;
                const pageTextWidth = doc.getTextWidth(pageText);
                const rightX = pageWidth - margin - pageTextWidth;
                doc.text(pageText, rightX, footerY);
            }

            // Restore original font settings
            doc.setFontSize(currentFontSize);
            doc.setTextColor(0, 0, 0); // Reset to black
        },

        async loadAvailablePagesForExport(bookNumber) {
            try {
                // Use existing API to get available pages
                const response = await fetch(`api/get_pages.php?book=${bookNumber}`);
                if (!response.ok) {
                    throw new Error('Failed to load pages');
                }
                const data = await response.json();
                this.availablePages = data.pages.map(page => ({
                    value: page.toString(),
                    text: `หน้า ${page}`
                })).sort((a, b) => parseInt(a.value) - parseInt(b.value));
            } catch (error) {
                console.error('Error loading available pages:', error);
                this.availablePages = [];
            }
        },
        
        
        async setupPDFFont(doc) {
            // Try to use fonts that support Thai characters
            try {
                // Use THSarabunNew font (same path as sentences.php)
                doc.addFont("fonts/THSarabunNew.ttf", "THSarabunNew", "normal");
                doc.setFont("THSarabunNew");
            } catch (e) {
                // Fallback to default fonts
                console.log('Thai font not available, using default font');
                doc.setFont('helvetica', 'normal');
            }
        },
        
        addPDFContent(doc, pageData) {
            let y = 20; // Start position
            const pageHeight = doc.internal.pageSize.height;
            const margin = 10; // Reduced margin for more space
            const baseFontSize = parseInt(this.exportSettings.fontSize) || 16;
            const titleFontSize = baseFontSize + 6;
            const subtitleFontSize = baseFontSize + 2;
            
            // Add book title at top
            doc.setFontSize(titleFontSize);
            doc.text(`ธรรมบท ภาค ${this.exportSettings.selectedBook} หน้า ${this.exportSettings.fromPage}-${this.exportSettings.toPage}`, margin, y);
            y += 15;
            
            doc.setFontSize(baseFontSize);
            
            // Add content based on format - pageData is now array of lines
            switch (this.exportSettings.format) {
                case 'pali-thai':
                    y = this.addPaliThaiFormat(doc, pageData, y, margin, pageHeight);
                    break;
                case 'attha-thai-pali':
                    y = this.addAtthaThaiPaliFormat(doc, pageData, y, margin, pageHeight);
                    break;
                case 'attha-thai-practice-pali':
                    y = this.addAtthaThaiPracticePaliFormat(doc, pageData, y, margin, pageHeight);
                    break;
                case 'pali-practice':
                    y = this.addPaliPracticeFormat(doc, pageData, y, margin, pageHeight);
                    break;
                case 'pali-thai-practice':
                    y = this.addPaliThaiPracticeFormat(doc, pageData, y, margin, pageHeight);
                    break;
                case 'pali-practice-thai':
                    y = this.addPaliPracticeThaiFormat(doc, pageData, y, margin, pageHeight);
                    break;
                case 'thai-practice':
                    y = this.addThaiPracticeFormat(doc, pageData, y, margin, pageHeight);
                    break;
                case 'pali-only':
                    y = this.addPaliOnlyFormat(doc, pageData, y, margin, pageHeight);
                    break;
                case 'pali-continuous':
                    y = this.addPaliContinuousFormat(doc, pageData, y, margin, pageHeight);
                    break;
                case 'thai-only':
                    y = this.addThaiOnlyFormat(doc, pageData, y, margin, pageHeight);
                    break;
                case 'thai-continuous':
                    y = this.addThaiContinuousFormat(doc, pageData, y, margin, pageHeight);
                    break;
                case 'attha-only':
                    y = this.addAtthaOnlyFormat(doc, pageData, y, margin, pageHeight);
                    break;
                case 'attha-practice':
                    y = this.addAtthaPracticeFormat(doc, pageData, y, margin, pageHeight);
                    break;
                case 'attha-practice-pali':
                    y = this.addAtthaPracticePaliFormat(doc, pageData, y, margin, pageHeight);
                    break;
                case 'attha-continuous':
                    y = this.addAtthaContinuousFormat(doc, pageData, y, margin, pageHeight);
                    break;
            }
        },
        
        getStoryTitlesFromData(pageData) {
            // Extract unique story titles from the data
            const titles = new Set();
            pageData.forEach(line => {
                if (line.story_title && line.story_title.trim()) {
                    titles.add(line.story_title.trim());
                }
            });
            return Array.from(titles);
        },
        
        // Clean text from unwanted characters
        cleanText(text, isPali = false) {
            if (!text) return '';

            // Start with original text
            let cleanedText = text.trim();

            // Remove punctuation if not included
            if (!this.exportSettings.includePunctuation) {
                // Remove ALL possible quote characters using Unicode ranges
                // This includes: " " " " ' ' ‚ „ ‹ › « » ` ' " etc.
                cleanedText = cleanedText.replace(/[\u0022\u0027\u0060\u00AB\u00BB\u2018\u2019\u201A\u201B\u201C\u201D\u201E\u201F\u2039\u203A\u275B\u275C\u275D\u275E\u276E\u276F]/g, '');
                // Remove all types of commas
                cleanedText = cleanedText.replace(/[,]/g, '');
                // Remove semicolons and colons
                cleanedText = cleanedText.replace(/[;:]/g, '');
                // Keep all whitespace as-is (spaces, newlines, etc.)
            }

            // Replace period with paiyannoi if enabled AND is Pali
            if (this.exportSettings.replacePeriodWithPaiyannoi && isPali) {
                // Replace period at end of sentence (followed by space or end of string) with ฯ
                cleanedText = cleanedText.replace(/\.(\s|$)/g, 'ฯ$1');
            }

            return cleanedText;
        },
        
        // Format 1: Pali-Thai (bullet points, same line page+title)
        addPaliThaiFormat(doc, pageData, y, margin, pageHeight) {
            const baseFontSize = parseInt(this.exportSettings.fontSize) || 16;
            const lineHeight = Math.max(6, Math.floor(baseFontSize * 0.5));
            const pageWidth = doc.internal.pageSize.width;
            let currentPage = null;
            let currentStoryTitle = null;
            let verseNumber = 1;
            
            doc.setFontSize(baseFontSize);
            
            pageData.forEach(line => {
                // Clean data
                const cleanPali = this.cleanText(line.pali, true);
                const cleanThai = this.cleanText(line.thai);
                const cleanTitle = this.cleanText(line.story_title);
                
                // Show page and story title on same line when it changes
                if ((line.page && line.page !== currentPage) || (cleanTitle && cleanTitle !== currentStoryTitle)) {
                    if (y > pageHeight - 60) {
                        doc.addPage();
                        y = 20;
                    }
                    
                    // Page number and story title on same line
                    let headerText = '';
                    if (line.page && line.page !== currentPage) {
                        headerText = `หน้า ${line.page}`;
                        currentPage = line.page;
                        if (headerText) headerText += ' - ';
                        headerText += cleanTitle;
                        currentStoryTitle = cleanTitle;
                    }
                    // if (cleanTitle && cleanTitle !== currentStoryTitle) {
                    // }

                    if (headerText) {
                        try {
                            doc.setFont("THSarabunNew", "normal");
                        } catch (e) {}
                        doc.setFontSize(baseFontSize + 1);
                        doc.text(headerText, margin, y);
                        try {
                            doc.setFont("THSarabunNew", "normal");
                        } catch (e) {}
                        doc.setFontSize(baseFontSize);
                        y += lineHeight + 8;
                    }
                }

                if (y > pageHeight - 40) {
                    doc.addPage();
                    y = 20;
                }

                // Add numbering/bullet point and Pali text (larger font)
                if (cleanPali) {
                    const numberText = this.exportSettings.numberingStyle === 'number'
                        ? `${verseNumber}.`
                        : '•';
                    doc.text(numberText, margin, y);
                    // Increase font size for Pali text
                    doc.setFontSize(baseFontSize + 2);
                    const paliLines = doc.splitTextToSize(cleanPali, pageWidth - (margin * 2) - 10);
                    paliLines.forEach(textLine => {
                        if (y > pageHeight - 40) {
                            doc.addPage();
                            y = 20;
                        }
                        doc.text(textLine, margin + 10, y);
                        y += lineHeight;
                    });
                    // Reset font size
                    doc.setFontSize(baseFontSize);
                    verseNumber++;
                }

                // Add spacing between Pali and Thai
                y += Math.floor(lineHeight * 0.5);

                // Add Thai text (indented, dark blue color)
                if (cleanThai) {
                    doc.setTextColor(0, 0, 139); // Dark blue color
                    const thaiLines = doc.splitTextToSize(cleanThai, pageWidth - (margin * 2) - 10);
                    thaiLines.forEach(textLine => {
                        if (y > pageHeight - 40) {
                            doc.addPage();
                            y = 20;
                        }
                        doc.text(textLine, margin + 10, y);
                        y += lineHeight;
                    });
                    doc.setTextColor(0, 0, 0); // Reset to black
                }
                
                y += Math.floor(lineHeight * 0.8);
            });

            return y;
        },

        addAtthaThaiPaliFormat(doc, pageData, y, margin, pageHeight) {
            const baseFontSize = parseInt(this.exportSettings.fontSize) || 16;
            const lineHeight = Math.max(6, Math.floor(baseFontSize * 0.5));
            const pageWidth = doc.internal.pageSize.width;
            let currentPage = null;
            let currentStoryTitle = null;
            let verseNumber = 1;

            doc.setFontSize(baseFontSize);

            pageData.forEach(line => {
                // Clean data
                const cleanPali = this.cleanText(line.pali, true);
                const cleanThai = this.cleanText(line.thai);
                const cleanAttha = this.cleanText(line.thai_attha);
                const cleanTitle = this.cleanText(line.story_title);

                // Show page and story title on same line when it changes
                if ((line.page && line.page !== currentPage) || (cleanTitle && cleanTitle !== currentStoryTitle)) {
                    if (y > pageHeight - 60) {
                        doc.addPage();
                        y = 20;
                    }

                    // Page number and story title on same line
                    let headerText = '';
                    if (line.page && line.page !== currentPage) {
                        headerText = `หน้า ${line.page}`;
                        currentPage = line.page;
                        if (headerText) headerText += ' - ';
                        headerText += cleanTitle;
                        currentStoryTitle = cleanTitle;
                    }

                    if (headerText) {
                        try {
                            doc.setFont("THSarabunNew", "normal");
                        } catch (e) {}
                        doc.setFontSize(baseFontSize + 1);
                        doc.text(headerText, margin, y);
                        try {
                            doc.setFont("THSarabunNew", "normal");
                        } catch (e) {}
                        doc.setFontSize(baseFontSize);
                        y += lineHeight + 8;
                    }
                }

                if (y > pageHeight - 40) {
                    doc.addPage();
                    y = 20;
                }

                // Add numbering/bullet point
                const numberText = this.exportSettings.numberingStyle === 'number'
                    ? `${verseNumber}.`
                    : '•';

                // Add Attha text (if exists) - dark blue color with numbering
                if (cleanAttha) {
                    doc.setTextColor(0, 0, 139); // Dark blue color
                    doc.text(numberText, margin, y);
                    const atthaLines = doc.splitTextToSize(cleanAttha, pageWidth - (margin * 2) - 10);
                    atthaLines.forEach(textLine => {
                        if (y > pageHeight - 40) {
                            doc.addPage();
                            y = 20;
                        }
                        doc.text(textLine, margin + 10, y);
                        y += lineHeight;
                    });
                    doc.setTextColor(0, 0, 0); // Reset to black
                    y += Math.floor(lineHeight * 0.5);
                }

                // Add Thai text (without numbering since attha already has it)
                if (cleanThai) {
                    const thaiLines = doc.splitTextToSize(cleanThai, pageWidth - (margin * 2) - 10);
                    thaiLines.forEach(textLine => {
                        if (y > pageHeight - 40) {
                            doc.addPage();
                            y = 20;
                        }
                        doc.text(textLine, margin + 10, y);
                        y += lineHeight;
                    });
                }

                // Add spacing between Thai and Pali
                y += Math.floor(lineHeight * 0.5);

                // Add Pali text (larger font)
                if (cleanPali) {
                    doc.setFontSize(baseFontSize + 2);
                    const paliLines = doc.splitTextToSize(cleanPali, pageWidth - (margin * 2) - 10);
                    paliLines.forEach(textLine => {
                        if (y > pageHeight - 40) {
                            doc.addPage();
                            y = 20;
                        }
                        doc.text(textLine, margin + 10, y);
                        y += lineHeight;
                    });
                    doc.setFontSize(baseFontSize);
                    verseNumber++;
                }

                y += Math.floor(lineHeight * 0.8);
            });

            return y;
        },

        addAtthaThaiPracticePaliFormat(doc, pageData, y, margin, pageHeight) {
            const baseFontSize = parseInt(this.exportSettings.fontSize) || 16;
            const lineHeight = Math.max(6, Math.floor(baseFontSize * 0.5));
            const pageWidth = doc.internal.pageSize.width;
            let currentPage = null;
            let currentStoryTitle = null;
            let verseNumber = 1;

            doc.setFontSize(baseFontSize);

            pageData.forEach(line => {
                const cleanPali = this.cleanText(line.pali);
                const cleanThai = this.cleanText(line.thai);
                const cleanAttha = this.cleanText(line.thai_attha);
                const cleanTitle = this.cleanText(line.story_title);

                // Show page and story title header
                if ((line.page && line.page !== currentPage) || (cleanTitle && cleanTitle !== currentStoryTitle)) {
                    if (y > pageHeight - 60) {
                        doc.addPage();
                        y = 20;
                    }

                    let headerText = '';
                    if (line.page && line.page !== currentPage) {
                        headerText = `หน้า ${line.page}`;
                        currentPage = line.page;
                        if (headerText) headerText += ' - ';
                        headerText += cleanTitle;
                        currentStoryTitle = cleanTitle;
                    }

                    if (headerText) {
                        try {
                            doc.setFont("THSarabunNew", "normal");
                        } catch (e) {}
                        doc.setFontSize(baseFontSize + 1);
                        doc.text(headerText, margin, y);
                        try {
                            doc.setFont("THSarabunNew", "normal");
                        } catch (e) {}
                        doc.setFontSize(baseFontSize);
                        y += lineHeight + 8;
                    }
                }

                if (y > pageHeight - 60) {
                    doc.addPage();
                    y = 20;
                }

                // Add numbering/bullet point
                const numberText = this.exportSettings.numberingStyle === 'number'
                    ? `${verseNumber}.`
                    : '•';

                // Add Attha text with numbering (dark blue)
                if (cleanAttha) {
                    doc.setTextColor(0, 0, 139);
                    doc.text(numberText, margin, y);
                    const atthaLines = doc.splitTextToSize(cleanAttha, pageWidth - (margin * 2) - 10);
                    atthaLines.forEach(textLine => {
                        if (y > pageHeight - 40) {
                            doc.addPage();
                            y = 20;
                        }
                        doc.text(textLine, margin + 10, y);
                        y += lineHeight;
                    });
                    doc.setTextColor(0, 0, 0);
                    y += Math.floor(lineHeight * 0.5);
                }

                // Add Thai text (no numbering, dark blue)
                if (cleanThai) {
                    doc.setTextColor(0, 0, 139);
                    const thaiLines = doc.splitTextToSize(cleanThai, pageWidth - (margin * 2) - 10);
                    thaiLines.forEach(textLine => {
                        if (y > pageHeight - 40) {
                            doc.addPage();
                            y = 20;
                        }
                        doc.text(textLine, margin + 10, y);
                        y += lineHeight;
                    });
                    doc.setTextColor(0, 0, 0);
                }

                // Add gap and practice lines
                y += Math.floor(lineHeight * 0.6);
                const halfPageWidth = (pageWidth - margin * 2) / 2;
                const textWidth = cleanPali ? doc.getTextWidth(cleanPali) : 0;
                const linesNeeded = Math.max(1, Math.ceil(textWidth / halfPageWidth));
                for (let i = 0; i < linesNeeded; i++) {
                    if (y > pageHeight - 40) {
                        doc.addPage();
                        y = 20;
                    }
                    doc.line(margin + 10, y, pageWidth - margin, y);
                    y += lineHeight + 2;
                }

                y += Math.floor(lineHeight * 0.5);

                // Add Pali text (larger font)
                if (cleanPali) {
                    doc.setFontSize(baseFontSize + 2);
                    const paliLines = doc.splitTextToSize(cleanPali, pageWidth - (margin * 2) - 10);
                    paliLines.forEach(textLine => {
                        if (y > pageHeight - 40) {
                            doc.addPage();
                            y = 20;
                        }
                        doc.text(textLine, margin + 10, y);
                        y += lineHeight;
                    });
                    doc.setFontSize(baseFontSize);
                    verseNumber++;
                }

                y += Math.floor(lineHeight * 0.8);
            });

            return y;
        },

        // Format 2: Pali-Practice (bullet points, practice lines)
        addPaliPracticeFormat(doc, pageData, y, margin, pageHeight) {
            const baseFontSize = parseInt(this.exportSettings.fontSize) || 18;
            const lineHeight = Math.max(6, Math.floor(baseFontSize * 0.5));
            const pageWidth = doc.internal.pageSize.width;
            let currentPage = null;
            let currentStoryTitle = null;
            let verseNumber = 1;
            
            doc.setFontSize(baseFontSize);
            
            pageData.forEach(line => {
                // Clean data
                const cleanPali = this.cleanText(line.pali);
                const cleanTitle = this.cleanText(line.story_title);
                
                // Show page and story title on same line when it changes
                if ((line.page && line.page !== currentPage) || (cleanTitle && cleanTitle !== currentStoryTitle)) {
                    if (y > pageHeight - 60) {
                        doc.addPage();
                        y = 20;
                    }
                    
                    let headerText = '';
                    if (line.page && line.page !== currentPage) {
                        headerText = `หน้า ${line.page}`;
                        currentPage = line.page;
                        if (headerText) headerText += ' - ';
                        headerText += cleanTitle;
                        currentStoryTitle = cleanTitle;
                    }
                    
                    if (headerText) {
                        try {
                            doc.setFont("THSarabunNew", "normal");
                        } catch (e) {}
                        doc.setFontSize(baseFontSize + 1);
                        doc.text(headerText, margin, y);
                        try {
                            doc.setFont("THSarabunNew", "normal");
                        } catch (e) {}
                        doc.setFontSize(baseFontSize);
                        y += lineHeight + 8;
                    }
                }
                
                if (y > pageHeight - 40) {
                    doc.addPage();
                    y = 20;
                }
                
                // Add numbering/bullet point and Pali text (larger font)
                if (cleanPali) {
                    const numberText = this.exportSettings.numberingStyle === 'number'
                        ? `${verseNumber}.`
                        : '•';
                    doc.text(numberText, margin, y);
                    // Increase font size for Pali text
                    doc.setFontSize(baseFontSize + 2);
                    const paliLines = doc.splitTextToSize(cleanPali, pageWidth - (margin * 2) - 10);
                    paliLines.forEach(textLine => {
                        if (y > pageHeight - 40) {
                            doc.addPage();
                            y = 20;
                        }
                        doc.text(textLine, margin + 10, y);
                        y += lineHeight;
                    });
                    // Reset font size
                    doc.setFontSize(baseFontSize);
                    verseNumber++;
                }

                // Add gap between text and practice lines
                y += Math.floor(lineHeight * 0.6);

                // Calculate practice lines based on actual text width (1 line per half page width)
                const halfPageWidth = (pageWidth - margin * 2) / 2;
                const textWidth = cleanPali ? doc.getTextWidth(cleanPali) : 0;
                const linesNeeded = Math.max(1, Math.ceil(textWidth / halfPageWidth));
                for (let i = 0; i < linesNeeded; i++) {
                    if (y > pageHeight - 40) {
                        doc.addPage();
                        y = 20;
                    }
                    doc.line(margin + 10, y, pageWidth - margin, y);
                    y += lineHeight;
                }
                
                y += Math.floor(lineHeight * 1.25);
            });
            
            return y;
        },
        
        // Format 3: Pali-Thai-Practice (bullet points, both text and practice lines)
        addPaliThaiPracticeFormat(doc, pageData, y, margin, pageHeight) {
            const baseFontSize = parseInt(this.exportSettings.fontSize) || 18;
            const lineHeight = Math.max(6, Math.floor(baseFontSize * 0.5));
            const pageWidth = doc.internal.pageSize.width;
            let currentPage = null;
            let currentStoryTitle = null;
            let verseNumber = 1;
            
            doc.setFontSize(baseFontSize);
            
            pageData.forEach(line => {
                // Clean data
                const cleanPali = this.cleanText(line.pali);
                const cleanThai = this.cleanText(line.thai);
                const cleanTitle = this.cleanText(line.story_title);
                
                // Show page and story title on same line when it changes
                if ((line.page && line.page !== currentPage) || (cleanTitle && cleanTitle !== currentStoryTitle)) {
                    if (y > pageHeight - 60) {
                        doc.addPage();
                        y = 20;
                    }
                    
                    let headerText = '';
                    if (line.page && line.page !== currentPage) {
                        headerText = `หน้า ${line.page}`;
                        currentPage = line.page;
                        if (headerText) headerText += ' - ';
                        headerText += cleanTitle;
                        currentStoryTitle = cleanTitle;
                    }
                    
                    if (headerText) {
                        try {
                            doc.setFont("THSarabunNew", "normal");
                        } catch (e) {}
                        doc.setFontSize(baseFontSize + 1);
                        doc.text(headerText, margin, y);
                        try {
                            doc.setFont("THSarabunNew", "normal");
                        } catch (e) {}
                        doc.setFontSize(baseFontSize);
                        y += lineHeight + 8;
                    }
                }
                
                if (y > pageHeight - 60) {
                    doc.addPage();
                    y = 20;
                }
                
                // Add numbering/bullet point and Pali text
                if (cleanPali) {
                    const numberText = this.exportSettings.numberingStyle === 'number' 
                        ? `${verseNumber}.` 
                        : '•';
                    doc.text(numberText, margin, y);
                    const paliLines = doc.splitTextToSize(cleanPali, pageWidth - (margin * 2) - 10);
                    paliLines.forEach(textLine => {
                        if (y > pageHeight - 40) {
                            doc.addPage();
                            y = 20;
                        }
                        doc.text(textLine, margin + 10, y);
                        y += lineHeight;
                    });
                    verseNumber++;
                }
                
                // Add spacing between Pali and Thai
                y += Math.floor(lineHeight * 0.5);

                // Add Thai text (indented, dark blue color)
                if (cleanThai) {
                    doc.setTextColor(0, 0, 139); // Dark blue color
                    const thaiLines = doc.splitTextToSize(cleanThai, pageWidth - (margin * 2) - 10);
                    thaiLines.forEach(textLine => {
                        if (y > pageHeight - 40) {
                            doc.addPage();
                            y = 20;
                        }
                        doc.text(textLine, margin + 10, y);
                        y += lineHeight;
                    });
                    doc.setTextColor(0, 0, 0); // Reset to black
                }

                // Add gap between text and practice lines
                y += Math.floor(lineHeight * 0.6);

                // Calculate practice lines based on actual text width (1 line per half page width)
                const halfPageWidth = (pageWidth - margin * 2) / 2;
                const textWidth = cleanPali ? doc.getTextWidth(cleanPali) : 0;
                const linesNeeded = Math.max(1, Math.ceil(textWidth / halfPageWidth));
                for (let i = 0; i < linesNeeded; i++) {
                    if (y > pageHeight - 40) {
                        doc.addPage();
                        y = 20;
                    }
                    doc.line(margin + 10, y, pageWidth - margin, y);
                    y += lineHeight;
                }
                
                y += Math.floor(lineHeight * 1.25);
            });
            
            return y;
        },

        // Format: Pali-Practice-Thai (Pali text, practice lines, Thai translation)
        addPaliPracticeThaiFormat(doc, pageData, y, margin, pageHeight) {
            const baseFontSize = parseInt(this.exportSettings.fontSize) || 18;
            const lineHeight = Math.max(6, Math.floor(baseFontSize * 0.5));
            const pageWidth = doc.internal.pageSize.width;
            let currentPage = null;
            let currentStoryTitle = null;
            let verseNumber = 1;

            doc.setFontSize(baseFontSize);

            pageData.forEach(line => {
                // Clean data
                const cleanPali = this.cleanText(line.pali);
                const cleanThai = this.cleanText(line.thai);
                const cleanTitle = this.cleanText(line.story_title);

                // Show page and story title on same line when it changes
                if ((line.page && line.page !== currentPage) || (cleanTitle && cleanTitle !== currentStoryTitle)) {
                    if (y > pageHeight - 60) {
                        doc.addPage();
                        y = 20;
                    }

                    let headerText = '';
                    if (line.page && line.page !== currentPage) {
                        headerText = `หน้า ${line.page}`;
                        currentPage = line.page;
                        if (headerText) headerText += ' - ';
                        headerText += cleanTitle;
                        currentStoryTitle = cleanTitle;
                    }

                    if (headerText) {
                        try {
                            doc.setFont("THSarabunNew", "normal");
                        } catch (e) {}
                        doc.setFontSize(baseFontSize + 1);
                        doc.text(headerText, margin, y);
                        try {
                            doc.setFont("THSarabunNew", "normal");
                        } catch (e) {}
                        doc.setFontSize(baseFontSize);
                        y += lineHeight + 8;
                    }
                }

                if (y > pageHeight - 60) {
                    doc.addPage();
                    y = 20;
                }

                // Add numbering/bullet point and Pali text
                if (cleanPali) {
                    const numberText = this.exportSettings.numberingStyle === 'number'
                        ? `${verseNumber}.`
                        : '•';
                    doc.text(numberText, margin, y);
                    const paliLines = doc.splitTextToSize(cleanPali, pageWidth - (margin * 2) - 10);
                    paliLines.forEach(textLine => {
                        if (y > pageHeight - 40) {
                            doc.addPage();
                            y = 20;
                        }
                        doc.text(textLine, margin + 10, y);
                        y += lineHeight;
                    });
                    verseNumber++;
                }

                // Add gap between text and practice lines
                y += Math.floor(lineHeight * 0.6);

                // Calculate practice lines based on actual text width (1 line per half page width)
                const halfPageWidth = (pageWidth - margin * 2) / 2;
                const textWidth = cleanPali ? doc.getTextWidth(cleanPali) : 0;
                const linesNeeded = Math.max(1, Math.ceil(textWidth / halfPageWidth));
                for (let i = 0; i < linesNeeded; i++) {
                    if (y > pageHeight - 40) {
                        doc.addPage();
                        y = 20;
                    }
                    doc.line(margin + 10, y, pageWidth - margin, y);
                    y += lineHeight;
                }

                // Add spacing between practice lines and Thai
                y += Math.floor(lineHeight * 0.5);

                // Add Thai text (indented, dark blue color)
                if (cleanThai) {
                    doc.setTextColor(0, 0, 139); // Dark blue color
                    const thaiLines = doc.splitTextToSize(cleanThai, pageWidth - (margin * 2) - 10);
                    thaiLines.forEach(textLine => {
                        if (y > pageHeight - 40) {
                            doc.addPage();
                            y = 20;
                        }
                        doc.text(textLine, margin + 10, y);
                        y += lineHeight;
                    });
                    doc.setTextColor(0, 0, 0); // Reset to black
                }

                y += Math.floor(lineHeight * 1.25);
            });

            return y;
        },

        // Format: Thai-Practice (Thai text with practice lines)
        addThaiPracticeFormat(doc, pageData, y, margin, pageHeight) {
            const baseFontSize = parseInt(this.exportSettings.fontSize) || 18;
            const lineHeight = Math.max(6, Math.floor(baseFontSize * 0.5));
            const pageWidth = doc.internal.pageSize.width;
            let currentPage = null;
            let currentStoryTitle = null;
            let verseNumber = 1;

            doc.setFontSize(baseFontSize);

            pageData.forEach(line => {
                // Clean data
                const cleanThai = this.cleanText(line.thai);
                const cleanTitle = this.cleanText(line.story_title);

                // Show page and story title on same line when it changes
                if ((line.page && line.page !== currentPage) || (cleanTitle && cleanTitle !== currentStoryTitle)) {
                    if (y > pageHeight - 60) {
                        doc.addPage();
                        y = 20;
                    }

                    let headerText = '';
                    if (line.page && line.page !== currentPage) {
                        headerText = `หน้า ${line.page}`;
                        currentPage = line.page;
                        if (headerText) headerText += ' - ';
                        headerText += cleanTitle;
                        currentStoryTitle = cleanTitle;
                    }

                    if (headerText) {
                        try {
                            doc.setFont("THSarabunNew", "normal");
                        } catch (e) {}
                        doc.setFontSize(baseFontSize + 1);
                        doc.text(headerText, margin, y);
                        try {
                            doc.setFont("THSarabunNew", "normal");
                        } catch (e) {}
                        doc.setFontSize(baseFontSize);
                        y += lineHeight + 8;
                    }
                }

                if (y > pageHeight - 60) {
                    doc.addPage();
                    y = 20;
                }

                // Add numbering/bullet point and Thai text (black color for Thai-only format)
                if (cleanThai) {
                    const numberText = this.exportSettings.numberingStyle === 'number'
                        ? `${verseNumber}.`
                        : '•';
                    doc.text(numberText, margin, y);

                    // Thai-only format uses black color
                    const thaiLines = doc.splitTextToSize(cleanThai, pageWidth - (margin * 2) - 10);
                    thaiLines.forEach(textLine => {
                        if (y > pageHeight - 40) {
                            doc.addPage();
                            y = 20;
                        }
                        doc.text(textLine, margin + 10, y);
                        y += lineHeight;
                    });
                    verseNumber++;
                }

                // Add gap between text and practice lines
                y += Math.floor(lineHeight * 0.6);

                // Calculate practice lines based on actual text width (1 line per half page width)
                const halfPageWidth = (pageWidth - margin * 2) / 2;
                const textWidth = cleanThai ? doc.getTextWidth(cleanThai) : 0;
                const linesNeeded = Math.max(1, Math.ceil(textWidth / halfPageWidth));
                for (let i = 0; i < linesNeeded; i++) {
                    if (y > pageHeight - 40) {
                        doc.addPage();
                        y = 20;
                    }
                    doc.line(margin + 10, y, pageWidth - margin, y);
                    y += lineHeight;
                }

                y += Math.floor(lineHeight * 1.25);
            });

            return y;
        },

        // Format 4: Pali Only (only Pali text with numbering/bullets)
        addPaliOnlyFormat(doc, pageData, y, margin, pageHeight) {
            const baseFontSize = parseInt(this.exportSettings.fontSize) || 16;
            const lineHeight = Math.max(6, Math.floor(baseFontSize * 0.5));
            const pageWidth = doc.internal.pageSize.width;
            let currentPage = null;
            let currentStoryTitle = null;
            let verseNumber = 1;
            
            doc.setFontSize(baseFontSize);
            
            pageData.forEach(line => {
                // Clean data
                const cleanPali = this.cleanText(line.pali);
                const cleanTitle = this.cleanText(line.story_title);
                
                // Show page and story title on same line when it changes
                if ((line.page && line.page !== currentPage) || (cleanTitle && cleanTitle !== currentStoryTitle)) {
                    if (y > pageHeight - 60) {
                        doc.addPage();
                        y = 30;
                    }
                    
                    let headerText = '';
                    if (line.page && line.page !== currentPage) {
                        headerText = `หน้า ${line.page}`;
                        currentPage = line.page;
                    }
                    if (cleanTitle && cleanTitle !== currentStoryTitle) {
                        if (headerText) headerText += ' - ';
                        headerText += cleanTitle;
                        currentStoryTitle = cleanTitle;
                    }
                    
                    if (headerText) {
                        doc.setFontSize(baseFontSize + 1);
                        doc.text(headerText, margin, y);
                        doc.setFontSize(baseFontSize);
                        y += lineHeight + 8;
                    }
                }
                
                if (y > pageHeight - 40) {
                    doc.addPage();
                    y = 30;
                }
                
                // Add numbering/bullet point and Pali text only
                if (cleanPali) {
                    const numberText = this.exportSettings.numberingStyle === 'number' 
                        ? `${verseNumber}.` 
                        : '•';
                    doc.text(numberText, margin, y);
                    const paliLines = doc.splitTextToSize(cleanPali, pageWidth - (margin * 2) - 10);
                    paliLines.forEach(textLine => {
                        if (y > pageHeight - 40) {
                            doc.addPage();
                            y = 30;
                        }
                        doc.text(textLine, margin + 10, y);
                        y += lineHeight;
                    });
                    verseNumber++;
                }
                
                y += Math.floor(lineHeight * 0.8);
            });
            
            return y;
        },
        
        // Format 5: Thai Only (only Thai text with numbering/bullets)
        addThaiOnlyFormat(doc, pageData, y, margin, pageHeight) {
            const baseFontSize = parseInt(this.exportSettings.fontSize) || 16;
            const lineHeight = Math.max(6, Math.floor(baseFontSize * 0.5));
            const pageWidth = doc.internal.pageSize.width;
            let currentPage = null;
            let currentStoryTitle = null;
            let verseNumber = 1;
            
            doc.setFontSize(baseFontSize);
            
            pageData.forEach(line => {
                // Clean data
                const cleanThai = this.cleanText(line.thai);
                const cleanTitle = this.cleanText(line.story_title);
                
                // Show page and story title on same line when it changes
                if ((line.page && line.page !== currentPage) || (cleanTitle && cleanTitle !== currentStoryTitle)) {
                    if (y > pageHeight - 60) {
                        doc.addPage();
                        y = 30;
                    }
                    
                    let headerText = '';
                    if (line.page && line.page !== currentPage) {
                        headerText = `หน้า ${line.page}`;
                        currentPage = line.page;
                    }
                    if (cleanTitle && cleanTitle !== currentStoryTitle) {
                        if (headerText) headerText += ' - ';
                        headerText += cleanTitle;
                        currentStoryTitle = cleanTitle;
                    }
                    
                    if (headerText) {
                        doc.setFontSize(baseFontSize + 1);
                        doc.text(headerText, margin, y);
                        doc.setFontSize(baseFontSize);
                        y += lineHeight + 8;
                    }
                }
                
                if (y > pageHeight - 40) {
                    doc.addPage();
                    y = 30;
                }
                
                // Add numbering/bullet point and Thai text only
                if (cleanThai) {
                    const numberText = this.exportSettings.numberingStyle === 'number' 
                        ? `${verseNumber}.` 
                        : '•';
                    doc.text(numberText, margin, y);
                    const thaiLines = doc.splitTextToSize(cleanThai, pageWidth - (margin * 2) - 10);
                    thaiLines.forEach(textLine => {
                        if (y > pageHeight - 40) {
                            doc.addPage();
                            y = 30;
                        }
                        doc.text(textLine, margin + 10, y);
                        y += lineHeight;
                    });
                    verseNumber++;
                }
                
                y += Math.floor(lineHeight * 0.8);
            });
            
            return y;
        },

        // Format 6: Pali Continuous (continuous Pali text without numbering or line breaks)
        addPaliContinuousFormat(doc, pageData, y, margin, pageHeight) {
            const baseFontSize = parseInt(this.exportSettings.fontSize) || 16;
            const lineHeight = Math.max(6, Math.floor(baseFontSize * 0.5));
            const pageWidth = doc.internal.pageSize.width;
            let currentPage = null;
            let currentStoryTitle = null;
            let continuousText = '';

            doc.setFontSize(baseFontSize);

            pageData.forEach((line, index) => {
                const cleanPali = this.cleanText(line.pali);
                const cleanTitle = this.cleanText(line.story_title);

                // Check if we need to output accumulated text before showing new header
                const headerChanged = (line.page && line.page !== currentPage) || (cleanTitle && cleanTitle !== currentStoryTitle);

                if (headerChanged && continuousText) {
                    // Output accumulated continuous text
                    const paliLines = doc.splitTextToSize(continuousText.trim(), pageWidth - (margin * 2));
                    paliLines.forEach(textLine => {
                        if (y > pageHeight - 40) {
                            doc.addPage();
                            y = 20;
                        }
                        doc.text(textLine, margin, y);
                        y += lineHeight;
                    });
                    y += Math.floor(lineHeight * 1.5); // Space before new header
                    continuousText = '';
                }

                // Show page and story title when it changes
                if (headerChanged) {
                    if (y > pageHeight - 60) {
                        doc.addPage();
                        y = 20;
                    }

                    let headerText = '';
                    if (line.page && line.page !== currentPage) {
                        headerText = `หน้า ${line.page}`;
                        currentPage = line.page;
                    }
                    if (cleanTitle && cleanTitle !== currentStoryTitle) {
                        if (headerText) headerText += ' - ';
                        headerText += cleanTitle;
                        currentStoryTitle = cleanTitle;
                    }

                    if (headerText) {
                        try {
                            doc.setFont("THSarabunNew", "normal");
                        } catch (e) {}
                        doc.setFontSize(baseFontSize + 1);
                        doc.text(headerText, margin, y);
                        doc.setFontSize(baseFontSize);
                        y += lineHeight + 8;
                    }
                }

                // Accumulate Pali text with space separator
                if (cleanPali) {
                    continuousText += (continuousText ? ' ' : '') + cleanPali;
                }

                // If this is the last line, output remaining text
                if (index === pageData.length - 1 && continuousText) {
                    const paliLines = doc.splitTextToSize(continuousText.trim(), pageWidth - (margin * 2));
                    paliLines.forEach(textLine => {
                        if (y > pageHeight - 40) {
                            doc.addPage();
                            y = 20;
                        }
                        doc.text(textLine, margin, y);
                        y += lineHeight;
                    });
                }
            });

            return y;
        },

        // Format 7: Thai Continuous (continuous Thai text without numbering or line breaks)
        addThaiContinuousFormat(doc, pageData, y, margin, pageHeight) {
            const baseFontSize = parseInt(this.exportSettings.fontSize) || 16;
            const lineHeight = Math.max(6, Math.floor(baseFontSize * 0.5));
            const pageWidth = doc.internal.pageSize.width;
            let currentPage = null;
            let currentStoryTitle = null;
            let continuousText = '';

            doc.setFontSize(baseFontSize);

            pageData.forEach((line, index) => {
                const cleanThai = this.cleanText(line.thai);
                const cleanTitle = this.cleanText(line.story_title);

                // Check if we need to output accumulated text before showing new header
                const headerChanged = (line.page && line.page !== currentPage) || (cleanTitle && cleanTitle !== currentStoryTitle);

                if (headerChanged && continuousText) {
                    // Output accumulated continuous text (black color for Thai-only format)
                    const thaiLines = doc.splitTextToSize(continuousText.trim(), pageWidth - (margin * 2));
                    thaiLines.forEach(textLine => {
                        if (y > pageHeight - 40) {
                            doc.addPage();
                            y = 20;
                        }
                        doc.text(textLine, margin, y);
                        y += lineHeight;
                    });
                    y += Math.floor(lineHeight * 1.5); // Space before new header
                    continuousText = '';
                }

                // Show page and story title when it changes
                if (headerChanged) {
                    if (y > pageHeight - 60) {
                        doc.addPage();
                        y = 20;
                    }

                    let headerText = '';
                    if (line.page && line.page !== currentPage) {
                        headerText = `หน้า ${line.page}`;
                        currentPage = line.page;
                    }
                    if (cleanTitle && cleanTitle !== currentStoryTitle) {
                        if (headerText) headerText += ' - ';
                        headerText += cleanTitle;
                        currentStoryTitle = cleanTitle;
                    }

                    if (headerText) {
                        try {
                            doc.setFont("THSarabunNew", "normal");
                        } catch (e) {}
                        doc.setFontSize(baseFontSize + 1);
                        doc.text(headerText, margin, y);
                        doc.setFontSize(baseFontSize);
                        y += lineHeight + 8;
                    }
                }

                // Accumulate Thai text with space separator
                if (cleanThai) {
                    continuousText += (continuousText ? ' ' : '') + cleanThai;
                }

                // If this is the last line, output remaining text (black color for Thai-only format)
                if (index === pageData.length - 1 && continuousText) {
                    const thaiLines = doc.splitTextToSize(continuousText.trim(), pageWidth - (margin * 2));
                    thaiLines.forEach(textLine => {
                        if (y > pageHeight - 40) {
                            doc.addPage();
                            y = 20;
                        }
                        doc.text(textLine, margin, y);
                        y += lineHeight;
                    });
                }
            });

            return y;
        },

        // Format: Attha Only (อรรถ อย่างเดียว)
        addAtthaOnlyFormat(doc, pageData, y, margin, pageHeight) {
            const baseFontSize = parseInt(this.exportSettings.fontSize) || 16;
            const lineHeight = Math.max(6, Math.floor(baseFontSize * 0.5));
            const pageWidth = doc.internal.pageSize.width;
            let currentPage = null;
            let currentStoryTitle = null;
            let verseNumber = 1;

            doc.setFontSize(baseFontSize);

            pageData.forEach(line => {
                const cleanAttha = this.cleanText(line.thai_attha);
                const cleanTitle = this.cleanText(line.story_title);

                // Show page and story title when it changes
                if ((line.page && line.page !== currentPage) || (cleanTitle && cleanTitle !== currentStoryTitle)) {
                    if (y > pageHeight - 60) {
                        doc.addPage();
                        y = 20;
                    }

                    let headerText = '';
                    if (line.page && line.page !== currentPage) {
                        headerText = `หน้า ${line.page}`;
                        currentPage = line.page;
                        if (cleanTitle) {
                            headerText += ' - ' + cleanTitle;
                        }
                        currentStoryTitle = cleanTitle;
                    }

                    if (headerText) {
                        try {
                            doc.setFont("THSarabunNew", "normal");
                        } catch (e) {}
                        doc.setFontSize(baseFontSize + 1);
                        doc.text(headerText, margin, y);
                        doc.setFontSize(baseFontSize);
                        y += lineHeight + 8;
                    }
                }

                if (y > pageHeight - 60) {
                    doc.addPage();
                    y = 20;
                }

                // Add attha text with numbering (dark blue color)
                if (cleanAttha) {
                    const numberText = this.exportSettings.numberingStyle === 'number'
                        ? `${verseNumber}.`
                        : '•';
                    doc.setTextColor(0, 0, 139); // Dark blue color
                    doc.text(numberText, margin, y);
                    const atthaLines = doc.splitTextToSize(cleanAttha, pageWidth - (margin * 2) - 10);
                    atthaLines.forEach(textLine => {
                        if (y > pageHeight - 40) {
                            doc.addPage();
                            y = 20;
                        }
                        doc.text(textLine, margin + 10, y);
                        y += lineHeight;
                    });
                    doc.setTextColor(0, 0, 0); // Reset to black
                    verseNumber++;
                    y += Math.floor(lineHeight * 1.25);
                }
            });

            return y;
        },

        // Format: Attha Practice (อรรถ-แบบฝึกหัด)
        addAtthaPracticeFormat(doc, pageData, y, margin, pageHeight) {
            const baseFontSize = parseInt(this.exportSettings.fontSize) || 16;
            const lineHeight = Math.max(6, Math.floor(baseFontSize * 0.5));
            const pageWidth = doc.internal.pageSize.width;
            let currentPage = null;
            let currentStoryTitle = null;
            let verseNumber = 1;

            doc.setFontSize(baseFontSize);

            pageData.forEach(line => {
                const cleanAttha = this.cleanText(line.thai_attha);
                const cleanTitle = this.cleanText(line.story_title);

                // Show page and story title when it changes
                if ((line.page && line.page !== currentPage) || (cleanTitle && cleanTitle !== currentStoryTitle)) {
                    if (y > pageHeight - 60) {
                        doc.addPage();
                        y = 20;
                    }

                    let headerText = '';
                    if (line.page && line.page !== currentPage) {
                        headerText = `หน้า ${line.page}`;
                        currentPage = line.page;
                        if (cleanTitle) {
                            headerText += ' - ' + cleanTitle;
                        }
                        currentStoryTitle = cleanTitle;
                    }

                    if (headerText) {
                        try {
                            doc.setFont("THSarabunNew", "normal");
                        } catch (e) {}
                        doc.setFontSize(baseFontSize + 1);
                        doc.text(headerText, margin, y);
                        doc.setFontSize(baseFontSize);
                        y += lineHeight + 8;
                    }
                }

                if (y > pageHeight - 60) {
                    doc.addPage();
                    y = 20;
                }

                // Add attha text with numbering (dark blue color)
                if (cleanAttha) {
                    const numberText = this.exportSettings.numberingStyle === 'number'
                        ? `${verseNumber}.`
                        : '•';
                    doc.setTextColor(0, 0, 139); // Dark blue color
                    doc.text(numberText, margin, y);
                    const atthaLines = doc.splitTextToSize(cleanAttha, pageWidth - (margin * 2) - 10);
                    atthaLines.forEach(textLine => {
                        if (y > pageHeight - 40) {
                            doc.addPage();
                            y = 20;
                        }
                        doc.text(textLine, margin + 10, y);
                        y += lineHeight;
                    });
                    doc.setTextColor(0, 0, 0); // Reset to black
                    verseNumber++;

                    // Add spacing and practice lines
                    y += Math.floor(lineHeight * 0.6);
                    const halfPageWidth = (pageWidth - margin * 2) / 2;
                    const textWidth = doc.getTextWidth(cleanAttha);
                    const linesNeeded = Math.max(1, Math.ceil(textWidth / halfPageWidth));
                    for (let i = 0; i < linesNeeded; i++) {
                        if (y > pageHeight - 40) {
                            doc.addPage();
                            y = 20;
                        }
                        doc.line(margin + 10, y, pageWidth - margin, y);
                        y += lineHeight;
                    }
                    y += Math.floor(lineHeight * 1.25);
                }
            });

            return y;
        },

        // Format: Attha Practice Pali (อรรถ-แบบฝึกหัด-บาลี)
        addAtthaPracticePaliFormat(doc, pageData, y, margin, pageHeight) {
            const baseFontSize = parseInt(this.exportSettings.fontSize) || 16;
            const lineHeight = Math.max(6, Math.floor(baseFontSize * 0.5));
            const pageWidth = doc.internal.pageSize.width;
            let currentPage = null;
            let currentStoryTitle = null;
            let verseNumber = 1;

            doc.setFontSize(baseFontSize);

            pageData.forEach(line => {
                const cleanAttha = this.cleanText(line.thai_attha);
                const cleanPali = this.cleanText(line.pali);
                const cleanTitle = this.cleanText(line.story_title);

                // Show page and story title when it changes
                if ((line.page && line.page !== currentPage) || (cleanTitle && cleanTitle !== currentStoryTitle)) {
                    if (y > pageHeight - 60) {
                        doc.addPage();
                        y = 20;
                    }

                    let headerText = '';
                    if (line.page && line.page !== currentPage) {
                        headerText = `หน้า ${line.page}`;
                        currentPage = line.page;
                        if (cleanTitle) {
                            headerText += ' - ' + cleanTitle;
                        }
                        currentStoryTitle = cleanTitle;
                    }

                    if (headerText) {
                        try {
                            doc.setFont("THSarabunNew", "normal");
                        } catch (e) {}
                        doc.setFontSize(baseFontSize + 1);
                        doc.text(headerText, margin, y);
                        doc.setFontSize(baseFontSize);
                        y += lineHeight + 8;
                    }
                }

                if (y > pageHeight - 60) {
                    doc.addPage();
                    y = 20;
                }

                // Add attha text with numbering (dark blue color)
                if (cleanAttha) {
                    const numberText = this.exportSettings.numberingStyle === 'number'
                        ? `${verseNumber}.`
                        : '•';
                    doc.setTextColor(0, 0, 139); // Dark blue color
                    doc.text(numberText, margin, y);
                    const atthaLines = doc.splitTextToSize(cleanAttha, pageWidth - (margin * 2) - 10);
                    atthaLines.forEach(textLine => {
                        if (y > pageHeight - 40) {
                            doc.addPage();
                            y = 20;
                        }
                        doc.text(textLine, margin + 10, y);
                        y += lineHeight;
                    });
                    doc.setTextColor(0, 0, 0); // Reset to black

                    // Add spacing and practice lines
                    y += Math.floor(lineHeight * 0.6);
                    const halfPageWidth = (pageWidth - margin * 2) / 2;
                    const textWidth = doc.getTextWidth(cleanAttha);
                    const linesNeeded = Math.max(1, Math.ceil(textWidth / halfPageWidth));
                    for (let i = 0; i < linesNeeded; i++) {
                        if (y > pageHeight - 40) {
                            doc.addPage();
                            y = 20;
                        }
                        doc.line(margin + 10, y, pageWidth - margin, y);
                        y += lineHeight;
                    }

                    // Add spacing between practice lines and Pali
                    y += Math.floor(lineHeight * 0.5);
                }

                // Add Pali text (amber color)
                if (cleanPali) {
                    doc.setTextColor(180, 83, 9); // Amber-700 color
                    const paliLines = doc.splitTextToSize(cleanPali, pageWidth - (margin * 2) - 10);
                    paliLines.forEach(textLine => {
                        if (y > pageHeight - 40) {
                            doc.addPage();
                            y = 20;
                        }
                        doc.text(textLine, margin + 10, y);
                        y += lineHeight;
                    });
                    doc.setTextColor(0, 0, 0); // Reset to black
                    verseNumber++;
                    y += Math.floor(lineHeight * 1.25);
                }
            });

            return y;
        },

        // Format: Attha Continuous (อรรถต่อเนื่อง)
        addAtthaContinuousFormat(doc, pageData, y, margin, pageHeight) {
            const baseFontSize = parseInt(this.exportSettings.fontSize) || 16;
            const lineHeight = Math.max(6, Math.floor(baseFontSize * 0.5));
            const pageWidth = doc.internal.pageSize.width;
            let currentPage = null;
            let currentStoryTitle = null;
            let continuousText = '';

            doc.setFontSize(baseFontSize);

            pageData.forEach((line, index) => {
                const cleanAttha = this.cleanText(line.thai_attha);
                const cleanTitle = this.cleanText(line.story_title);

                // Check if we need to output accumulated text before showing new header
                const headerChanged = (line.page && line.page !== currentPage) || (cleanTitle && cleanTitle !== currentStoryTitle);

                if (headerChanged && continuousText) {
                    // Output accumulated continuous text (dark blue color)
                    doc.setTextColor(0, 0, 139); // Dark blue color
                    const atthaLines = doc.splitTextToSize(continuousText.trim(), pageWidth - (margin * 2));
                    atthaLines.forEach(textLine => {
                        if (y > pageHeight - 40) {
                            doc.addPage();
                            y = 20;
                        }
                        doc.text(textLine, margin, y);
                        y += lineHeight;
                    });
                    doc.setTextColor(0, 0, 0); // Reset to black
                    y += Math.floor(lineHeight * 1.5); // Space before new header
                    continuousText = '';
                }

                // Show page and story title when it changes
                if (headerChanged) {
                    if (y > pageHeight - 60) {
                        doc.addPage();
                        y = 20;
                    }

                    let headerText = '';
                    if (line.page && line.page !== currentPage) {
                        headerText = `หน้า ${line.page}`;
                        currentPage = line.page;
                    }
                    if (cleanTitle && cleanTitle !== currentStoryTitle) {
                        if (headerText) headerText += ' - ';
                        headerText += cleanTitle;
                        currentStoryTitle = cleanTitle;
                    }

                    if (headerText) {
                        try {
                            doc.setFont("THSarabunNew", "normal");
                        } catch (e) {}
                        doc.setFontSize(baseFontSize + 1);
                        doc.text(headerText, margin, y);
                        doc.setFontSize(baseFontSize);
                        y += lineHeight + 8;
                    }
                }

                // Accumulate attha text with space separator
                if (cleanAttha) {
                    continuousText += (continuousText ? ' ' : '') + cleanAttha;
                }

                // If this is the last line, output remaining text (dark blue color)
                if (index === pageData.length - 1 && continuousText) {
                    doc.setTextColor(0, 0, 139); // Dark blue color
                    const atthaLines = doc.splitTextToSize(continuousText.trim(), pageWidth - (margin * 2));
                    atthaLines.forEach(textLine => {
                        if (y > pageHeight - 40) {
                            doc.addPage();
                            y = 20;
                        }
                        doc.text(textLine, margin, y);
                        y += lineHeight;
                    });
                    doc.setTextColor(0, 0, 0); // Reset to black
                }
            });

            return y;
        },

        addContinuousFormat(doc, pageData, y, margin, pageHeight) {
            const baseFontSize = parseInt(this.exportSettings.fontSize) || 18;
            const lineHeight = Math.max(6, Math.floor(baseFontSize * 0.5));
            const pageWidth = doc.internal.pageSize.width;
            let currentPage = null;
            let currentStoryTitle = null;
            
            doc.setFontSize(baseFontSize);
            
            pageData.forEach((line, index) => {
                // Show page number when it changes
                if (line.page && line.page !== currentPage) {
                    if (y > pageHeight - 60) {
                        doc.addPage();
                        y = 20;
                    }
                    doc.setFontSize(baseFontSize - 2);
                    doc.text(`[หน้า ${line.page}]`, margin, y);
                    y += lineHeight + 2;
                    doc.setFontSize(baseFontSize);
                    currentPage = line.page;
                }
                
                // Handle story title changes
                if (line.story_title && line.story_title !== currentStoryTitle) {
                    if (y > pageHeight - 80) {
                        doc.addPage();
                        y = 20;
                    }
                    
                    // End previous story
                    if (currentStoryTitle) {
                        doc.setFontSize(baseFontSize - 1);
                        doc.text(`เรื่อง ${currentStoryTitle} จบ`, margin, y);
                        y += lineHeight + 2;
                        doc.line(margin, y, pageWidth - margin, y);
                        y += lineHeight + 5;
                    }
                    
                    // Start new story
                    try {
                        doc.setFont("THSarabunNew", "normal");
                    } catch (e) {
                        // Fallback if bold not available
                    }
                    doc.setFontSize(baseFontSize + 1);
                    doc.text(`เรื่อง ${line.story_title}`, margin, y);
                    try {
                        doc.setFont("THSarabunNew", "normal");
                    } catch (e) {
                        // Fallback if normal not available
                    }
                    doc.setFontSize(baseFontSize);
                    y += lineHeight + 5;
                    currentStoryTitle = line.story_title;
                }
                
                if (y > pageHeight - 40) {
                    doc.addPage();
                    y = 20;
                }
                
                // Add Pali text with proper wrapping
                if (line.pali) {
                    const paliLines = doc.splitTextToSize(line.pali, pageWidth - (margin * 2));
                    paliLines.forEach(textLine => {
                        if (y > pageHeight - 40) {
                            doc.addPage();
                            y = 20;
                        }
                        doc.text(textLine, margin, y);
                        y += lineHeight;
                    });
                }
                
                // Add spacing between Pali and Thai
                y += Math.floor(lineHeight * 0.5);
                
                // Add Thai text with proper wrapping
                if (line.thai) {
                    const thaiLines = doc.splitTextToSize(line.thai, pageWidth - (margin * 2));
                    thaiLines.forEach(textLine => {
                        if (y > pageHeight - 40) {
                            doc.addPage();
                            y = 20;
                        }
                        doc.text(textLine, margin, y);
                        y += lineHeight;
                    });
                }
                
                y += Math.floor(lineHeight * 0.8); // Space between verses
            });
            
            return y;
        },
        
        addSeparatedFormat(doc, pageData, y, margin, pageHeight) {
            const baseFontSize = parseInt(this.exportSettings.fontSize) || 18;
            const headerFontSize = baseFontSize + 2;
            const lineHeight = Math.max(6, Math.floor(baseFontSize * 0.5));
            const pageWidth = doc.internal.pageSize.width;
            
            // Show page and story info at the beginning
            if (pageData.length > 0) {
                const firstLine = pageData[0];
                if (firstLine.page) {
                    doc.setFontSize(baseFontSize - 2);
                    doc.text(`[หน้า ${firstLine.page}]`, margin, y);
                    y += lineHeight + 2;
                }
                if (firstLine.story_title) {
                    try {
                        doc.setFont("THSarabunNew", "normal");
                    } catch (e) {}
                    doc.setFontSize(baseFontSize + 1);
                    doc.text(`เรื่อง ${firstLine.story_title}`, margin, y);
                    try {
                        doc.setFont("THSarabunNew", "normal");
                    } catch (e) {}
                    y += lineHeight + 5;
                }
            }
            
            // Add Pali first
            doc.setFontSize(headerFontSize);
            doc.text('บาลี:', margin, y);
            y += lineHeight + 4;
            doc.setFontSize(baseFontSize);
            
            pageData.forEach(line => {
                if (y > pageHeight - 40) {
                    doc.addPage();
                    y = 20;
                }
                if (line.pali) {
                    const paliLines = doc.splitTextToSize(line.pali, pageWidth - (margin * 2));
                    paliLines.forEach(textLine => {
                        if (y > pageHeight - 40) {
                            doc.addPage();
                            y = 20;
                        }
                        doc.text(textLine, margin, y);
                        y += lineHeight;
                    });
                    y += 2;
                }
            });
            
            y += lineHeight + 4;
            
            // Then Thai
            doc.setFontSize(headerFontSize);
            doc.text('ไทย:', margin, y);
            y += lineHeight + 4;
            doc.setFontSize(baseFontSize);
            
            pageData.forEach(line => {
                if (y > pageHeight - 40) {
                    doc.addPage();
                    y = 20;
                }
                if (line.thai) {
                    const thaiLines = doc.splitTextToSize(line.thai, pageWidth - (margin * 2));
                    thaiLines.forEach(textLine => {
                        if (y > pageHeight - 40) {
                            doc.addPage();
                            y = 20;
                        }
                        doc.text(textLine, margin, y);
                        y += lineHeight;
                    });
                    y += 2;
                }
            });
            
            return y;
        },
        
        addNumberedFormat(doc, pageData, y, margin, pageHeight) {
            const baseFontSize = parseInt(this.exportSettings.fontSize) || 18;
            const lineHeight = Math.max(6, Math.floor(baseFontSize * 0.5));
            const pageWidth = doc.internal.pageSize.width;
            const numberWidth = 8; // Reduced space for verse numbers
            let verseNumber = 1;
            let currentPage = null;
            let currentStoryTitle = null;
            
            doc.setFontSize(baseFontSize);
            
            pageData.forEach(line => {
                // Show page number when it changes
                if (line.page && line.page !== currentPage) {
                    if (y > pageHeight - 60) {
                        doc.addPage();
                        y = 20;
                    }
                    doc.setFontSize(baseFontSize - 2);
                    doc.text(`[หน้า ${line.page}]`, margin, y);
                    y += lineHeight + 2;
                    doc.setFontSize(baseFontSize);
                    currentPage = line.page;
                }
                
                // Handle story title changes
                if (line.story_title && line.story_title !== currentStoryTitle) {
                    if (y > pageHeight - 80) {
                        doc.addPage();
                        y = 20;
                    }
                    
                    // End previous story
                    if (currentStoryTitle) {
                        doc.setFontSize(baseFontSize - 1);
                        doc.text(`เรื่อง ${currentStoryTitle} จบ`, margin, y);
                        y += lineHeight + 2;
                        doc.line(margin, y, pageWidth - margin, y);
                        y += lineHeight + 5;
                    }
                    
                    // Start new story
                    try {
                        doc.setFont("THSarabunNew", "normal");
                    } catch (e) {
                        // Fallback if bold not available
                    }
                    doc.setFontSize(baseFontSize + 1);
                    doc.text(`เรื่อง ${line.story_title}`, margin, y);
                    try {
                        doc.setFont("THSarabunNew", "normal");
                    } catch (e) {
                        // Fallback if normal not available
                    }
                    doc.setFontSize(baseFontSize);
                    y += lineHeight + 5;
                    currentStoryTitle = line.story_title;
                }
                
                if (y > pageHeight - 40) {
                    doc.addPage();
                    y = 20;
                }
                
                // Add verse number (left-aligned, closer to text)
                doc.text(`${verseNumber}.`, margin, y);

                // Add Pali text with proper wrapping (larger font)
                if (line.pali) {
                    // Increase font size for Pali text
                    doc.setFontSize(baseFontSize + 2);
                    const paliLines = doc.splitTextToSize(line.pali, pageWidth - margin - numberWidth - 5);
                    paliLines.forEach(textLine => {
                        if (y > pageHeight - 40) {
                            doc.addPage();
                            y = 20;
                        }
                        doc.text(textLine, margin + numberWidth, y);
                        y += lineHeight;
                    });
                    // Reset font size
                    doc.setFontSize(baseFontSize);
                }

                // Add spacing between Pali and Thai
                y += Math.floor(lineHeight * 0.5);

                // Add Thai text with proper wrapping (dark blue color)
                if (line.thai) {
                    doc.setTextColor(0, 0, 139); // Dark blue color
                    const thaiLines = doc.splitTextToSize(line.thai, pageWidth - margin - numberWidth - 5);
                    thaiLines.forEach(textLine => {
                        if (y > pageHeight - 40) {
                            doc.addPage();
                            y = 20;
                        }
                        doc.text(textLine, margin + numberWidth, y);
                        y += lineHeight;
                    });
                    doc.setTextColor(0, 0, 0); // Reset to black
                }
                
                y += Math.floor(lineHeight * 0.8);
                verseNumber++;
            });
            
            return y;
        },
        
        addPracticeFormat(doc, pageData, y, margin, pageHeight) {
            const baseFontSize = parseInt(this.exportSettings.fontSize) || 18;
            const titleFontSize = baseFontSize + 2;
            const lineHeight = Math.max(6, Math.floor(baseFontSize * 0.5));
            const pageWidth = doc.internal.pageSize.width;
            const numberWidth = 8; // Reduced space for verse numbers
            let currentStoryTitle = null;
            let currentPage = null;
            
            doc.setFontSize(baseFontSize);
            
            pageData.forEach((line, index) => {
                // Show page number when it changes
                if (line.page && line.page !== currentPage) {
                    if (y > pageHeight - 60) {
                        doc.addPage();
                        y = 20;
                    }
                    doc.setFontSize(baseFontSize - 2);
                    doc.text(`[หน้า ${line.page}]`, margin, y);
                    y += lineHeight + 2;
                    doc.setFontSize(baseFontSize);
                    currentPage = line.page;
                }
                
                // Handle story title changes
                if (line.story_title && line.story_title !== currentStoryTitle) {
                    if (y > pageHeight - 80) {
                        doc.addPage();
                        y = 20;
                    }
                    
                    // End previous story
                    if (currentStoryTitle) {
                        doc.setFontSize(baseFontSize - 1);
                        doc.text(`เรื่อง ${currentStoryTitle} จบ`, margin, y);
                        y += lineHeight + 2;
                        doc.line(margin, y, pageWidth - margin, y);
                        y += lineHeight + 5;
                    }
                    
                    // Start new story
                    try {
                        doc.setFont("THSarabunNew", "normal");
                    } catch (e) {
                        // Fallback if bold not available
                    }
                    doc.setFontSize(titleFontSize);
                    doc.text(`เรื่อง ${line.story_title}`, margin, y);
                    try {
                        doc.setFont("THSarabunNew", "normal");
                    } catch (e) {
                        // Fallback if normal not available
                    }
                    doc.setFontSize(baseFontSize);
                    y += lineHeight + 5;
                    currentStoryTitle = line.story_title;
                }
                
                // Calculate space needed for this verse and its underlines
                const textLines = line.pali ? doc.splitTextToSize(line.pali, pageWidth - margin - numberWidth - 5) : [];
                // Calculate practice lines based on actual text width (1 line per half page width)
                const halfPageWidth = (pageWidth - margin * 2) / 2;
                const textWidth = line.pali ? doc.getTextWidth(line.pali) : 0;
                const linesNeeded = Math.max(1, Math.ceil(textWidth / halfPageWidth));
                const totalSpace = (textLines.length * lineHeight) + (linesNeeded * lineHeight) + 20;
                
                // Check if we need a new page
                if (y + totalSpace > pageHeight - margin) {
                    doc.addPage();
                    y = 20;
                }
                
                // Add verse number (left-aligned, closer to text)
                doc.text(`${index + 1}.`, margin, y);
                
                // Add Pali text with proper wrapping
                if (line.pali) {
                    const textLines = doc.splitTextToSize(line.pali, pageWidth - margin - numberWidth - 5);
                    textLines.forEach(textLine => {
                        if (y > pageHeight - 40) {
                            doc.addPage();
                            y = 20;
                        }
                        doc.text(textLine, margin + numberWidth, y);
                        y += lineHeight;
                    });
                }
                
                // Add gap between text and underlines
                y += Math.floor(lineHeight * 0.6);
                
                // Add underlines for practice (using doc.line like sentences.php)
                for (let i = 0; i < linesNeeded; i++) {
                    doc.line(margin + numberWidth, y, pageWidth - margin, y);
                    y += lineHeight;
                }
                
                y += Math.floor(lineHeight * 1.25); // Space between verses
            });
            
            return y;
        }
    }
}).mount('#app');