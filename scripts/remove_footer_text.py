
import os

footer_path = r"D:\pali-dhatu-app\src\components\Footer.js"

with open(footer_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Remove the paragraph with copyright
old_p = """<p>&copy; 2025 คลังธาตุบาลี. สงวนลิขสิทธิ์.</p>"""
new_p = """{/* <p>&copy; 2025 คลังธาตุบาลี. สงวนลิขสิทธิ์.</p> */}""" 
# Or just empty string if we want to remove it completely from view.
# The user said "remove it", so let's just make the footer content empty or minimal.

new_content = """// src/components/Footer.js

import React from 'react';

function Footer() {
  return (
    <footer className="App-footer">
      {/* Footer content removed as per request */}
    </footer>
  );
}

export default Footer;"""

with open(footer_path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Updated Footer.js")
