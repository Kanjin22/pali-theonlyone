import os

file_path = r"d:\pali-dhatu-app\src\components\DhatuDetail.js"

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Logic to add
new_logic = """
  const getDerivedWords = (roman) => {
      if (!roman) return null;
      if (vocabRootsDPDDerived[roman]) return vocabRootsDPDDerived[roman];
      
      // Strip final 'a' (common for Thai implicit 'a')
      if (roman.endsWith('a') && vocabRootsDPDDerived[roman.slice(0, -1)]) {
          return vocabRootsDPDDerived[roman.slice(0, -1)];
      }

      // Strip final 'i' (common for Thai 'i' ending roots like kakhi -> kakh)
      if (roman.endsWith('i') && vocabRootsDPDDerived[roman.slice(0, -1)]) {
          return vocabRootsDPDDerived[roman.slice(0, -1)];
      }
      
      // Long vowel check (u -> ū, i -> ī)
      if (roman.endsWith('u') && vocabRootsDPDDerived[roman.replace(/u$/, 'ū')]) {
           return vocabRootsDPDDerived[roman.replace(/u$/, 'ū')];
      }
      if (roman.endsWith('i') && vocabRootsDPDDerived[roman.replace(/i$/, 'ī')]) {
           return vocabRootsDPDDerived[roman.replace(/i$/, 'ī')];
      }
      
      // Short vowel check (ū -> u, ī -> i)
      if (roman.endsWith('ū') && vocabRootsDPDDerived[roman.replace(/ū$/, 'u')]) {
           return vocabRootsDPDDerived[roman.replace(/ū$/, 'u')];
      }
      if (roman.endsWith('ī') && vocabRootsDPDDerived[roman.replace(/ī$/, 'i')]) {
           return vocabRootsDPDDerived[roman.replace(/ī$/, 'i')];
      }

      return null;
  };

  const groupCode = dhatu ? getGroupCode(dhatu.mawat_dhatu) : null;
  const derivedWords = dhatu ? getDerivedWords(PaliScript.thaiToRoman(dhatu.dhatu_word)) : null;
"""

# Find the section to replace
# Look for "const groupCode = ..." and the line after it
pattern_start = "const groupCode = dhatu ? getGroupCode(dhatu.mawat_dhatu) : null;"
pattern_end = "const derivedWords = dhatu ? vocabRootsDPDDerived[PaliScript.thaiToRoman(dhatu.dhatu_word)] : null;"

# Construct the block to replace
old_block = pattern_start + "\n  " + pattern_end

if old_block in content:
    content = content.replace(old_block, new_logic.strip())
    print("Updated with smart lookup logic")
else:
    # Fallback search if exact formatting matches
    # Just replace the two lines we added previously
    pass

# Let's try to locate "const groupCode" and replace up to "const derivedWords"
import re
regex = r"const groupCode = dhatu \? getGroupCode\(dhatu\.mawat_dhatu\) : null;\s+const derivedWords = dhatu \? vocabRootsDPDDerived\[PaliScript\.thaiToRoman\(dhatu\.dhatu_word\)\] : null;"

if re.search(regex, content):
    content = re.sub(regex, new_logic.strip(), content)
    print("Updated with regex")
else:
    print("Could not find the code block to replace")

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
