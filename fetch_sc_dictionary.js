const https = require('https');
const fs = require('fs');
const path = require('path');

const url = 'https://raw.githubusercontent.com/suttacentral/sc-data/main/dictionaries/simple/en/pli2en_ncped.json';
const outputPath = path.join(__dirname, 'data', 'vocab-sc.js');
const rawOutputPath = path.join(__dirname, 'data', 'vocab-sc-ncped.json');

console.log(`Fetching dictionary from ${url}...`);

https.get(url, (res) => {
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        try {
            console.log(`Download complete. Data size: ${(data.length / 1024 / 1024).toFixed(2)} MB`);
            
            // Validate JSON
            const json = JSON.parse(data);
            console.log(`Successfully parsed JSON. Entry count: ${Object.keys(json).length}`);

            // Save raw JSON
            fs.writeFileSync(rawOutputPath, data);
            console.log(`Saved raw JSON to ${rawOutputPath}`);

            // Transform Array to Object for O(1) lookup
            const vocabObj = {};
            if (Array.isArray(json)) {
                json.forEach(item => {
                    if (item.entry) {
                        vocabObj[item.entry] = {
                            grammar: item.grammar,
                            definition: item.definition
                        };
                    }
                });
                console.log(`Transformed to Object. Key count: ${Object.keys(vocabObj).length}`);
            } else {
                console.warn('Expected array but got something else. Saving as is.');
                Object.assign(vocabObj, json);
            }

            // Create JS file with global variable
            const jsContent = `const vocabSC = ${JSON.stringify(vocabObj, null, 2)};`;
            fs.writeFileSync(outputPath, jsContent);
            console.log(`Saved JS file to ${outputPath}`);

        } catch (e) {
            console.error('Error parsing JSON:', e);
        }
    });

}).on('error', (err) => {
    console.error('Error downloading file:', err);
});
