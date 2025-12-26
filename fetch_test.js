const https = require('https');

const url = "https://www.tananunto.com/mobile/getdatatoquery.php?data=" + encodeURIComponent("ก");

https.get(url, (res) => {
    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });
    res.on('end', () => {
        // console.log(data.substring(0, 1000));
        const lines = data.split('\n');
        const matches = lines.filter(line => line.includes('-->>'));
        console.log("Found matches: " + matches.length);
        if (matches.length > 0) {
            console.log(matches.slice(0, 5).join('\n'));
        } else {
             // Maybe it's not line-separated nicely?
             // Let's print a chunk from the middle
             console.log(data.substring(1000, 2000));
        }
    });
}).on('error', (err) => {
    console.error("Error: " + err.message);
});
