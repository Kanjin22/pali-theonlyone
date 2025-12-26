const https = require('https');
const { TextDecoder } = require('util');

function fetch(url, isBinary = false) {
    return new Promise((resolve, reject) => {
        https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
            const chunks = [];
            res.on('data', chunk => chunks.push(chunk));
            res.on('end', () => {
                const buffer = Buffer.concat(chunks);
                if (isBinary) {
                    resolve(buffer);
                } else {
                    resolve(buffer.toString('utf8'));
                }
            });
        }).on('error', reject);
    });
}

const fs = require('fs');

async function run() {
    const db = {
        suttas: []
    };

    console.log("=== SuttaCentral Fetch (SN 56.11) ===");
    try {
        const textUrl = `https://suttacentral.net/api/suttas/sn56.11/siam_rath?lang=th`;
        const jsonStr = await fetch(textUrl);
        const textData = JSON.parse(jsonStr);
        
        const suttaEntry = {
            id: "sn56.11",
            source: "SuttaCentral",
            title_pali: textData.root_text ? textData.root_text.title : "",
            title_thai: textData.translation ? textData.translation.title : "",
            text_pali: textData.root_text ? textData.root_text.text : "",
            text_thai: textData.translation ? textData.translation.text : ""
        };
        
        db.suttas.push(suttaEntry);
        console.log("Saved SuttaCentral data.");

    } catch (e) {
        console.error("SC Error:", e.message);
    }

    console.log("\n=== 84000.org Fetch (SN 56.11 equivalent) ===");
    const url84000 = 'https://84000.org/tipitaka/read/?19/1664'; 
    try {
        const buffer = await fetch(url84000, true);
        const decoder = new TextDecoder('tis-620');
        const html = decoder.decode(buffer);
        
        const titleMatch = html.match(/<title>(.*?)<\/title>/i);
        const title = titleMatch ? titleMatch[1].trim() : "Unknown Title";
        
        // Simple content extraction (naive)
        // 84000 content usually inside font tags or body, let's just keep a cleaned snippet
        // Removing script and style tags
        let cleanHtml = html.replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gmi, "")
                            .replace(/<style\b[^>]*>([\s\S]*?)<\/style>/gmi, "");
        
        // Extracting text inside <body> (very rough)
        const bodyMatch = cleanHtml.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
        const bodyContent = bodyMatch ? bodyMatch[1] : cleanHtml;

        const suttaEntry84k = {
            id: "sn56.11-84k",
            source: "84000.org",
            title: title,
            url: url84000,
            html_content: bodyContent.substring(0, 2000) + "..." // Truncate for demo
        };

        db.suttas.push(suttaEntry84k);
        console.log("Saved 84000.org data.");
        
    } catch (e) {
        console.error("84000 Error:", e.message);
    }

    // Save to file
    const outputPath = './data/db-suttas.js';
    const fileContent = `const SuttaDB = ${JSON.stringify(db, null, 2)};\nif (typeof module !== 'undefined') module.exports = SuttaDB;`;
    fs.writeFileSync(outputPath, fileContent);
    console.log(`\nDatabase saved to ${outputPath}`);
}

run();
