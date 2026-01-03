const posRegex = /^([^.,()\[\]]+?)\s*(ก\.|น\.|ว\.|นิ\.|อ\.)/;

const lines = [
    'อาคจฺฉถ ๑ ก. (ตุมฺเห อ. ท่าน ท.) ย่อมมา',
    'อาคจฺฉถ ๒ ก. (ตุมฺเห อ. ท่าน ท.) จงมา'
];

lines.forEach(line => {
    const match = line.match(posRegex);
    if (match) {
        console.log(`Line: "${line}"`);
        console.log(`Key: "${match[1]}"`);
        console.log(`POS: "${match[2]}"`);
    } else {
        console.log(`No match for: "${line}"`);
    }
});
