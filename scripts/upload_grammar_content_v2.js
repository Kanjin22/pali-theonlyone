
const fs = require('fs');
const path = require('path');
const admin = require('D:/pali-dhatu-app/node_modules/firebase-admin');
const serviceAccount = require('D:/pali-dhatu-app/service-account-key.json');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

const FILES = {
    'bhu': 'grammar_bhu.html',
    'rudha': 'grammar_rudha.html',
    'divu': 'grammar_divu.html',
    'su': 'grammar_su.html',
    'ki': 'grammar_ki.html',
    'gaha': 'grammar_gaha.html',
    'tana': 'grammar_tana.html',
    'cura': 'grammar_cura.html'
};

const TITLES = {
    'bhu': 'ภูวาทิคณิกธาตุ (หมวด ภู ธาตุ)',
    'rudha': 'รุธาทิคณิกธาตุ (หมวด รุธ ธาตุ)',
    'divu': 'ทิวาทิคณิกธาตุ (หมวด ทิว ธาตุ)',
    'su': 'สวาทิคณิกธาตุ (หมวด สุ ธาตุ)',
    'ki': 'กิยาทิคณิกธาตุ (หมวด กี ธาตุ)',
    'gaha': 'คหาทิคณิกธาตุ (หมวด คห ธาตุ)',
    'tana': 'ตนาทิคณิกธาตุ (หมวด ตน ธาตุ)',
    'cura': 'จุราทิคณิกธาตุ (หมวด จุร ธาตุ)'
};

const ORDER = {
    'bhu': 1, 'rudha': 2, 'divu': 3, 'su': 4, 'ki': 5, 'gaha': 6, 'tana': 7, 'cura': 8
};

async function upload() {
    const batch = db.batch();
    let count = 0;

    for (const [code, filename] of Object.entries(FILES)) {
        const filePath = path.join(__dirname, '..', filename);
        if (!fs.existsSync(filePath)) {
            console.log(`File not found: ${filename}`);
            continue;
        }

        let content = fs.readFileSync(filePath, 'utf-8');
        
        // Extract content inside <div class="container">...</div>
        // Pattern: <div class="container"> ... </div></body>
        const containerMatch = content.match(/<div class="container">([\s\S]*?)<\/div>\s*<\/body>/);
        
        if (containerMatch) {
            let innerHtml = containerMatch[1];
            // Remove back button
            innerHtml = innerHtml.replace(/<a href="javascript:window.close\(\)" class="back-btn">[\s\S]*?<\/a>/, '');
            
            // Trim whitespace
            innerHtml = innerHtml.trim();

            const ref = db.collection('grammar_principles').doc(code);
            batch.set(ref, {
                title: TITLES[code],
                content_html: innerHtml,
                order: ORDER[code],
                updatedAt: admin.firestore.FieldValue.serverTimestamp()
            });
            console.log(`Prepared ${code}`);
            count++;
        } else {
            console.log(`Could not parse container in ${filename}`);
        }
    }

    if (count > 0) {
        await batch.commit();
        console.log('Batch commit complete.');
    } else {
        console.log('No documents to commit.');
    }
}

upload();
