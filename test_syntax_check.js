const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log("Starting syntax check...");

function checkFile(filename, varName) {
    console.log(`\n--- Checking ${filename} ---`);
    const filePath = path.join(__dirname, 'data', filename);
    try {
        if (!fs.existsSync(filePath)) {
            console.error(`File not found: ${filePath}`);
            return;
        }
        const content = fs.readFileSync(filePath, 'utf8');
        
        const sandbox = {};
        vm.createContext(sandbox);
        
        try {
            vm.runInContext(content, sandbox);
            
            // Check if variable exists
            try {
                const data = vm.runInContext(varName, sandbox);
                console.log(`${varName} is defined. Length: ${data.length}`);
                if (data.length > 0) {
                    // Check first real item (skip comments if they were objects?)
                    // The array usually contains objects.
                    let firstItem = data.find(item => item.date);
                    if (firstItem) {
                        console.log('First item date:', firstItem.date);
                    } else {
                        console.log('No item with date found (maybe only comments/placeholders?)');
                    }
                } else {
                    console.log('Array is empty!');
                }
            } catch (e) {
                console.log(`${varName} is NOT defined: ${e.message}`);
            }
        } catch (e) {
            console.error(`Script execution failed: ${e.message}`);
        }
        
    } catch (e) {
        console.error(`Error: ${e.message}`);
    }
}

checkFile('data-pt12-november.js', 'dataNovember');
checkFile('data-pt12-december.js', 'dataDecember');
checkFile('data-pt12-january.js', 'dataJanuary');
checkFile('data-pt12-february.js', 'dataFebruary');
checkFile('data-pt12_novice-november.js', 'data_pt12_novice_november_2025');
