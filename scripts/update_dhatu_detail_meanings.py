import os

file_path = r'd:\pali-dhatu-app\src\components\DhatuDetail.js'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add import
if "import vocabDerivedMeanings" not in content:
    content = content.replace(
        "import vocabRootsDPDDerived from '../data/vocab-roots-dpd-derived';",
        "import vocabRootsDPDDerived from '../data/vocab-roots-dpd-derived';\nimport vocabDerivedMeanings from '../data/vocab-derived-meanings';"
    )

# 2. Update render logic
# Look for the exact block I saw in Read output
old_block = '''                <div className="derived-words-list">
                  {derivedWords.map((word, index) => (
                    <span key={index} className="derived-word-tag">{PaliScript.romanToThai(word)}</span>
                  ))}
                </div>'''

new_block = '''                <div className="derived-words-list">
                  {derivedWords.map((word, index) => {
                    const thaiWord = PaliScript.romanToThai(word);
                    const meaning = vocabDerivedMeanings[thaiWord];
                    return (
                        <div key={index} className="derived-word-item">
                            <span className="derived-word-tag">{thaiWord}</span>
                            {meaning ? (
                                <span className="derived-word-meaning">{meaning}</span>
                            ) : (
                                <span className="derived-word-meaning text-muted">-</span>
                            )}
                        </div>
                    );
                  })}
                </div>'''

if old_block in content:
    content = content.replace(old_block, new_block)
else:
    print("Could not find old_block exact match.")

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated DhatuDetail.js with meanings.")
