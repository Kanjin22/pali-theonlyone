
class UserVocabManager {
    constructor() {
        this.STORAGE_KEY = 'pali_user_vocab';
        this.listeners = [];
    }

    // Get all words
    getAllWords() {
        const data = localStorage.getItem(this.STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    }

    // Check if a word is saved (exact match)
    isWordSaved(word) {
        const words = this.getAllWords();
        return words.some(w => w.word === word);
    }

    // Save a new word
    saveWord(word, meaning, source = 'manual', context = '') {
        const words = this.getAllWords();
        
        // Avoid duplicates (simple check)
        const existingIndex = words.findIndex(w => w.word === word);
        
        const newEntry = {
            id: Date.now().toString(),
            word: word,
            meaning: meaning,
            source: source,
            context: context,
            date: new Date().toISOString()
        };

        if (existingIndex >= 0) {
            // Update existing? Or just skip? Let's update for now to refresh date/meaning
            words[existingIndex] = { ...words[existingIndex], ...newEntry, id: words[existingIndex].id }; // keep original ID
        } else {
            words.unshift(newEntry); // Add to top
        }

        this._save(words);
        return newEntry;
    }

    // Remove a word
    removeWord(word) {
        let words = this.getAllWords();
        words = words.filter(w => w.word !== word);
        this._save(words);
    }
    
    // Remove by ID
    removeWordById(id) {
        let words = this.getAllWords();
        words = words.filter(w => w.id !== id);
        this._save(words);
    }

    // Internal save helper
    _save(words) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(words));
        this._notifyListeners();
    }

    // Subscribe to changes
    subscribe(callback) {
        this.listeners.push(callback);
    }

    _notifyListeners() {
        this.listeners.forEach(cb => cb(this.getAllWords()));
    }
}

// Global instance
window.userVocabManager = new UserVocabManager();
