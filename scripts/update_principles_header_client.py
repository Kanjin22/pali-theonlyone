
import os

principles_page_path = 'D:/pali-dhatu-app/src/pages/PrinciplesPage.js'

with open(principles_page_path, 'r', encoding='utf-8') as f:
    content = f.read()

old_snippet = """                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        setContent(docSnap.data());
                    }"""

new_snippet = """                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        // Format H1 to be 2 lines: Title <br> (Subtitle)
                        if (data.content_html) {
                            data.content_html = data.content_html.replace(
                                /<h1>(.*?) \\((.*?)\\)<\\/h1>/,
                                '<h1>$1<br><span style="font-size:0.8em">($2)</span></h1>'
                            );
                        }
                        setContent(data);
                    }"""

if old_snippet in content:
    content = content.replace(old_snippet, new_snippet)
    with open(principles_page_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Updated {principles_page_path}")
else:
    print("Could not find snippet to replace in PrinciplesPage.js")
