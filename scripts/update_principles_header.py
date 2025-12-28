
import firebase_admin
from firebase_admin import credentials, firestore
import re
import os

# Initialize Firebase Admin
if not firebase_admin._apps:
    cred = credentials.Certificate('d:/pali-dhatu-app/serviceAccountKey.json')
    firebase_admin.initialize_app(cred)

db = firestore.client()

def update_headers():
    collection_ref = db.collection('grammar_principles')
    docs = collection_ref.stream()

    updated_count = 0
    
    for doc in docs:
        data = doc.to_dict()
        if 'content_html' in data:
            html = data['content_html']
            
            # Regex to find H1 with parenthesis and split it
            # Pattern: <h1>Text (Subtitle)</h1>
            # Replacement: <h1>Text<br>(Subtitle)</h1>
            
            new_html = re.sub(
                r'<h1>(.*?) \((.*?)\)</h1>', 
                r'<h1>\1<br>(\2)</h1>', 
                html
            )
            
            if new_html != html:
                print(f"Updating {doc.id}...")
                doc.reference.update({'content_html': new_html})
                updated_count += 1
            else:
                print(f"No change for {doc.id}")

    print(f"Total updated documents: {updated_count}")

if __name__ == '__main__':
    update_headers()
