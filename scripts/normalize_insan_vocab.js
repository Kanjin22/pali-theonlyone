const fs = require("fs");

const files = [
  "data/raw/vocab-insan-pr9.js",
  "data/raw/vocab-insan-pr9-5-8.js",
];

const replacements = [
  { from: /จตุตฺถีวิภัตติ/g, to: "จตุตถีวิภัตติ" },
  { from: /ปญฺจมีวิภัตติ/g, to: "ปัญจมีวิภัตติ" },
  { from: /ฉฏฺฐีวิภัตติ/g, to: "ฉัฏฐีวิภัตติ" },
  { from: /สตฺตมีวิภัตติ/g, to: "สัตตมีวิภัตติ" },
  { from: /จตุตฺถี/g, to: "จตุตถี" },
  { from: /ปญฺจมี/g, to: "ปัญจมี" },
  { from: /ฉฏฺฐี/g, to: "ฉัฏฐี" },
  { from: /สตฺตมี/g, to: "สัตตมี" },
  { from: /อาลปนะวิภัตติ/g, to: "อาลปนวิภัตติ" },
  { from: /ฝ่ายเอก วจนะ/g, to: "ฝ่ายเอกวจนะ" },
  { from: /ฝ่ายพหุ วจนะ/g, to: "ฝ่ายพหุวจนะ" },
  { from: /วิภัตติ ฝ่ายเอก /g, to: "วิภัตติ ฝ่ายเอกวจนะ " },
  { from: /ฝ่ายเอก\./g, to: "ฝ่ายเอกวจนะ" },
  { from: /ฝ่ายพหุ\./g, to: "ฝ่ายพหุวจนะ" },
  { from: /ป\. เอก\./g, to: "ป.เอก." },
  { from: /ป\. พหุ\./g, to: "ป.พหุ." },
  { from: /ทุ\. เอก\./g, to: "ทุ.เอก." },
  { from: /ทุ\. พหุ\./g, to: "ทุ.พหุ." },
  { from: /ต\. เอก\./g, to: "ต.เอก." },
  { from: /ต\. พหุ\./g, to: "ต.พหุ." },
  { from: /จ\. เอก\./g, to: "จ.เอก." },
  { from: /จ\. พหุ\./g, to: "จ.พหุ." },
  { from: /ปญฺ\. เอก\./g, to: "ปญฺ.เอก." },
  { from: /ปญฺ\. พหุ\./g, to: "ปญฺ.พหุ." },
  { from: /ฉ\. เอก\./g, to: "ฉ.เอก." },
  { from: /ฉ\. พหุ\./g, to: "ฉ.พหุ." },
  { from: /ส\. เอก\./g, to: "ส.เอก." },
  { from: /ส\. พหุ\./g, to: "ส.พหุ." },
  { from: /อา\. เอก\./g, to: "อา.เอก." },
  { from: /อา\. พหุ\./g, to: "อา.พหุ." },
  { from: /ในอาขยาต/g, to: "ในกริยาอาขยาต" },
  { from: /ไม่ใช่อาขยาต/g, to: "ไม่ใช่กริยาอาขยาต" },
  { from: /กิริยาอาขยาต/g, to: "กริยาอาขยาต" },
  { from: /น\.,ปุ\./g, to: "น., ปุ." },
  { from: /น\. ปุ\./g, to: "น., ปุ." },
  { from: /น\. อิต\./g, to: "น., อิต." },
  { from: /น\. นปุ\./g, to: "น., นปุ." },
  { from: /ว\.,ปุ\./g, to: "ว., ปุ." },
  { from: /ว\. ปุ\./g, to: "ว., ปุ." },
  { from: /ว\.,นปุ\./g, to: "ว., นปุ." },
  { from: /ว\. นปุ\./g, to: "ว., นปุ." },
  { from: /ว\. อิต\./g, to: "ว., อิต." },
  { from: /อุป\.อัพ\.วิ\./g, to: "อุป. อัพ. วิ." },
  { from: /นิ\.อัพ\.วิ\./g, to: "นิ. อัพ. วิ." },
  { from: /เหตุ กัตตุวาจก/g, to: "เหตุกัตตุวาจก" },
  { from: /เหตุ กัมมวาจก/g, to: "เหตุกัมมวาจก" },
  { from: /วัตตมานา วิภัตติ/g, to: "วัตตมานาวิภัตติ" },
  { from: /ปัญจมี วิภัตติ/g, to: "ปัญจมีวิภัตติ" },
  { from: /สัตตมี วิภัตติ/g, to: "สัตตมีวิภัตติ" },
  { from: /ปโรกขา วิภัตติ/g, to: "ปโรกขาวิภัตติ" },
  { from: /หิยัตตนี วิภัตติ/g, to: "หิยัตตนีวิภัตติ" },
  { from: /อัชชัตตนี วิภัตติ/g, to: "อัชชัตตนีวิภัตติ" },
  { from: /ภวิสสันติ วิภัตติ/g, to: "ภวิสสันติวิภัตติ" },
  { from: /ภวิสสันติภัตติ/g, to: "ภวิสสันติวิภัตติ" },
  { from: /กาลาติปัตติ วิภัตติ/g, to: "กาลาติปัตติวิภัตติ" },
  {
    from: /,\s*ความ\s*"([^"]+)"\s*:/g,
    to: ', "$1":',
  },
  {
    from: /",\s*ความ\s*$/gm,
    to: '",',
  },
  {
    from: /ใน (กัตตุวาจก|กัมมวาจก|ภาววาจก|เหตุกัตตุวาจก|เหตุกัมมวาจก)/g,
    to: "ใน$1",
  },
  {
    from: /ปัจจัย\s*ประจำหมวด\s*ธาตุ/g,
    to: "ปัจจัยประจำหมวดธาตุ",
  },
];

function normalizeDhatu(text) {
  const marker = "ธาตุ ในความ";
  let index = 0;
  let result = "";

  while (true) {
    const start = text.indexOf(marker, index);
    if (start === -1) {
      result += text.slice(index);
      break;
    }

    result += text.slice(index, start);

    const plusIndex = text.indexOf(" + ", start);
    if (plusIndex === -1) {
      result += text.slice(start);
      break;
    }

    const segment = text.slice(start, plusIndex);
    const markerLength = marker.length;
    const head = segment.slice(0, markerLength);
    let tail = segment.slice(markerLength);

    if (tail.indexOf("แปลว่า") !== -1) {
      result += segment;
      result += " + ";
      index = plusIndex + 3;
      continue;
    }

    let fixedTail = "";
    let i = 0;

    while (i < tail.length) {
      if (tail[i] === ",") {
        fixedTail += ",";
        let j = i + 1;
        while (j < tail.length && (tail[j] === " " || tail[j] === "\t")) {
          fixedTail += tail[j];
          j++;
        }

        if (tail.slice(j, j + 4) !== "ความ") {
          fixedTail += "ความ ";
        }

        i = j;
        continue;
      }

      fixedTail += tail[i];
      i++;
    }

    result += head + fixedTail;
    result += " + ";
    index = plusIndex + 3;
  }

  return result;
}

files.forEach((file) => {
  let text = fs.readFileSync(file, "utf8");
  let changed = false;

  const rawMatchCount = (text.match(/,\s*ความ\s*"([^"]+)"\s*:/g) || []).length;
  process.stdout.write(
    `Before replacements ${file}: , ความ \"key\": count = ${rawMatchCount}\n`,
  );
  const sampleMatch = text.match(/,\s*ความ\s*"([^"]+)"\s*:/);
  if (sampleMatch) {
    process.stdout.write(`Sample match: ${sampleMatch[0]}\n`);
  }

  replacements.forEach((rule) => {
    const next = text.replace(rule.from, rule.to);
    if (next !== text) {
      changed = true;
      text = next;
    }
  });

  const afterReplacementsCount =
    (text.match(/,\s*ความ\s*"([^"]+)"\s*:/g) || []).length;
  process.stdout.write(
    `After replacements ${file}: , ความ \"key\": count = ${afterReplacementsCount}\n`,
  );

  const afterMatchCount =
    (text.match(/,\s*ความ\s*"([^"]+)"\s*:/g) || []).length;
  process.stdout.write(
    `After replacements ${file}: , ความ \"key\": count = ${afterMatchCount}\n`,
  );

  if (changed) {
    fs.writeFileSync(file, text, "utf8");
    process.stdout.write("Normalized " + file + "\n");
  }
});
