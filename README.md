# Pali The Only One - Examination & Learning Platform

A comprehensive web-based platform for learning and examining Pali language, Buddhist scriptures, and grammar.

## Features

- 📚 Dictionary and vocabulary tools
- 📝 Grammar learning resources
- 🧮 Declension and morphology analysis
- 📖 Sutta readers and text browsers
- 🎓 Exam builder and scheduling
- 🔍 Search and lookup functions
- 📱 Responsive web interface
- ☁️ Firebase backend integration

## Project Structure

```
.
├── data/                    # Data files and vocabularies
├── docs/                    # Project documentation and reports
├── js/                      # JavaScript modules
├── scripts/                 # Utility and automation scripts
├── schedules/               # Course schedules
├── fonts/                   # Font files
├── icons/                   # Icon assets
├── *.html                   # Web interface pages
├── server.js                # Express.js server
├── sw.js                    # Service Worker
└── package.json             # Node.js dependencies
```

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set environment variables:
   ```bash
   export SERVICE_ACCOUNT_PATH=/path/to/service-account-key.json
   ```

3. Run the server:
   ```bash
   npm start
   ```

## Available Scripts

- `npm start` - Start the server
- `npm run dpd:update` - Update DPD dictionary data
- `npm run dpd:sync` - Sync DPD to Firestore
- `npm run admin:grant` - Grant admin claims to user

## Technology Stack

- Frontend: HTML5, CSS3, JavaScript
- Backend: Node.js, Express.js
- Database: Firebase/Firestore
- Deployment: Firebase Hosting

## License

Internal project
