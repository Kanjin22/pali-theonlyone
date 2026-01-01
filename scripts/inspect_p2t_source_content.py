import sqlite3
import os

db_path = r"C:\Program Files (x86)\E-Tipitaka\resources\p2t_dict_v5.sqlite"
conn = sqlite3.connect(db_path)
cursor = conn.cursor()

cursor.execute("SELECT content FROM p2t WHERE source = 'ปทานุกรม บาลี-ไทย-อังกฤษ-สันสกฤต' LIMIT 5")
rows = cursor.fetchall()
print("Sample content for ปทานุกรม...:")
for r in rows:
    print(r[0][:100])

conn.close()
