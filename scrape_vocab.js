const https = require('https');
const fs = require('fs');
const path = require('path');

const consonants = ['ก', 'ข', 'ฃ', 'ค', 'ฅ', 'ฆ', 'ง', 'จ', 'ฉ', 'ช', 'ซ', 'ฌ', 'ญ', 'ฎ', 'ฏ', 'ฐ', 'ฑ', 'ฒ', 'ณ', 'ด', 'ต', 'ถ', 'ท', 'ธ', 'น', 'บ', 'ป', 'ผ', 'ฝ', 'พ', 'ฟ', 'ภ', 'ม', 'ย', 'ร', 'ล', 'ว', 'ศ', 'ษ', 'ส', 'ห', 'ฬ', 'อ', 'ฮ'];

const baseUrl = "https://www.tananunto.com/mobile/getdatatoquery.php?data=";

const vocabData = {};

function fetchLetter(letter) {
    return new Promise((resolve, reject) => {
        const url = baseUrl + encodeURIComponent(letter);
        https.get(url, (res) => {
            let data = '';
            res.on('data', (chunk) => { data += chunk; });
            res.on('end', () => {
                resolve(data);
            });
        }).on('error', (err) => {
            console.error(`Error fetching ${letter}: ${err.message}`);
            resolve(""); // Resolve empty to continue
        });
    });
}

function decodeHtml(html) {
    return html.replace(/&#(\d+);/g, function(match, dec) {
        return String.fromCharCode(dec);
    });
}

function parseData(html) {
    const regex = /<p id="rcorners2">(.*?)-->> (.*?)<\/p>/g;
    let match;
    while ((match = regex.exec(html)) !== null) {
        let word = match[1].trim();
        let def = match[2].trim();
        
        // Decode HTML entities
        def = decodeHtml(def);
        
        // Remove "คำแปล ->" prefix if exists
        def = def.replace(/^คำแปล ->/, '').trim();
        
        // Clean up formatting
        def = def.replace(/<br\s*\/?>/gi, '\n').replace(/&nbsp;/g, ' ');
        
        if (word) {
            vocabData[word] = def;
        }
    }
}

async function main() {
    console.log("Starting scrape...");
    
    // Batch requests to avoid overwhelming but still fast
    const batchSize = 5;
    for (let i = 0; i < consonants.length; i += batchSize) {
        const batch = consonants.slice(i, i + batchSize);
        console.log(`Fetching batch: ${batch.join(', ')}`);
        
        const promises = batch.map(letter => fetchLetter(letter));
        const results = await Promise.all(promises);
        
        results.forEach(html => parseData(html));
        
        // Small delay
        await new Promise(r => setTimeout(r, 500));
    }

    console.log(`Total words fetched: ${Object.keys(vocabData).length}`);
    
    // Save to file
    const content = `const vocabInsarn = ${JSON.stringify(vocabData, null, 2)};`;
    const outputPath = path.join(__dirname, 'data/raw', 'vocab-insarn-pr9.js');
    
    fs.writeFileSync(outputPath, content, 'utf8');
    console.log(`Saved to ${outputPath}`);
}

main();
