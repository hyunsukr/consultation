import sqlite3
import sys
conn = sqlite3.connect('user.db')
c = conn.cursor()
username = sys.argv[1]
password = sys.argv[2]
email = sys.argv[3]
phonenumber = sys.argv[4]
if '-' in phonenumber:
    arr = phonenumber.split('-')
    phonenumber = ""
    for item in arr:
        phonenumber = phonenumber+item
affiliated = sys.argv[5]
log = "True"
c.execute('''CREATE TABLE IF NOT EXISTS user(username text PRIMARY KEY NOT NULL, password text NOT NULL, email text NOT NULL, phone INT NOT NULL, affiliated text NOT NULL)''')

c.execute('''INSERT OR IGNORE INTO user(username, password, email, phone, affiliated) VALUES (?,?,?,?,?)''',("hyunsukr", "hyunsuk1218", "hyunsukr@gmail.com", 6129631218, "no"))
c.execute('''INSERT OR IGNORE INTO user(username, password, email, phone, affiliated) VALUES (?,?,?,?,?)''',("mryoo", "blueswings18", "hyunsukr@gmail.com", 6129631218, "no"))
c.execute('''SELECT * FROM user ''')
for row in c:
    if row[0] == username:
        log = "False"

if log == "True":
    c.execute('''INSERT OR IGNORE INTO user(username, password, email, phone, affiliated) VALUES (?,?,?,?,?)''',(str(username), str(password), str(email), int(phonenumber), str(affiliated)))
    
conn.commit()
conn.close()

print(log) 
