const fs = require('fs');
const path = require('path');

// Try to load firebase-admin
let admin;
try {
    admin = require('D:/pali-dhatu-app/node_modules/firebase-admin');
} catch (e) {
    console.error("Could not load firebase-admin from D:/pali-dhatu-app/node_modules");
    process.exit(1);
}

// Load Service Account
const serviceAccountPath = 'D:/pali-dhatu-app/service-account-key.json';
if (!fs.existsSync(serviceAccountPath)) {
    console.error(`Service account key not found at ${serviceAccountPath}`);
    process.exit(1);
}
const serviceAccount = require(serviceAccountPath);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Mapping of files to Groups
const grammarFiles = [
    { file: 'grammar_bhu.html', code: 'bhu', title: 'หมวด ภู (Bhu Group)', order: 1 },
    { file: 'grammar_rudha.html', code: 'rudha', title: 'หมวด รุธ (Rudha Group)', order: 2 },
    { file: 'grammar_divu.html', code: 'divu', title: 'หมวด ทิว (Divu Group)', order: 3 },
    { file: 'grammar_su.html', code: 'su', title: 'หมวด สุ (Su Group)', order: 4 },
    { file: 'grammar_ki.html', code: 'ki', title: 'หมวด กี (Ki Group)', order: 5 },
    { file: 'grammar_gaha.html', code: 'gaha', title: 'หมวด คห (Gaha Group)', order: 6 },
    { file: 'grammar_tana.html', code: 'tana', title: 'หมวด ตน (Tana Group)', order: 7 },
    { file: 'grammar_cura.html', code: 'cura', title: 'หมวด จุร (Cura Group)', order: 8 },
    { file: 'grammar_aneka.html', code: 'aneka', title: 'อเนกคณิกธาตุ (Multi-group Roots)', order: 9 }
];

async function uploadGrammar() {
    console.log('Starting Grammar Principles upload...');
    const batch = db.batch();
    const collectionRef = db.collection('grammar_principles');
    let count = 0;

    for (const item of grammarFiles) {
        const filePath = path.resolve(`D:/pali-theonlyone/${item.file}`);
        if (!fs.existsSync(filePath)) {
            console.warn(`File not found: ${filePath}, skipping.`);
            continue;
        }

        let html = fs.readFileSync(filePath, 'utf8');
        
        // Extract content between <body>...</body> to simplify, then refine
        // We want to remove the back button and keep the rest.
        // The back button is <a href... class="back-btn">...</a>
        // Or we can just extract everything inside <div class="container"> excluding the first <a>
        
        // Simple heuristic: Find first <h1> and take everything from there until the end of .container
        // The .container closes with the last </div> before </body>
        
        const h1Index = html.indexOf('<h1>');
        if (h1Index === -1) {
             console.warn(`No <h1> found in ${item.file}, skipping.`);
             continue;
        }
        
        // Find the end of the content. 
        // We know the structure ends with </div> (container close) then </body>
        const bodyEndIndex = html.lastIndexOf('</body>');
        const containerEndIndex = html.lastIndexOf('</div>', bodyEndIndex);
        
        if (containerEndIndex === -1) {
            console.warn(`Container end not found in ${item.file}`);
            continue;
        }

        let contentHtml = html.substring(h1Index, containerEndIndex);
        
        // Clean up any remaining scripts or unwanted tags if necessary
        // (Currently the files are clean static HTML)
        
        // Add styles? 
        // The app will need to style this. We can include a basic <style> block or assume App handles it.
        // Let's include the styles from the head if possible, or just the body content.
        // User asked to "put the pages in the app". 
        // Safest is to provide the HTML content that can be rendered inside a webview or rich text view.
        // We'll strip the specific "back button" if it was caught (it shouldn't be if we start at <h1>).
        
        const docRef = collectionRef.doc(item.code);
        batch.set(docRef, {
            title: item.title,
            group_code: item.code,
            content_html: contentHtml,
            order: item.order,
            updated_at: admin.firestore.FieldValue.serverTimestamp()
        });
        
        console.log(`Prepared ${item.code} (${item.title})`);
        count++;
    }

    if (count > 0) {
        await batch.commit();
        console.log(`Successfully uploaded ${count} grammar articles.`);
    } else {
        console.log('No articles to upload.');
    }
    
    process.exit(0);
}

uploadGrammar().catch(err => {
    console.error(err);
    process.exit(1);
});
