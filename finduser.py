import sqlite3
import sys
username = sys.argv[1]
password = sys.argv[2]
log = "False"
conn = sqlite3.connect('user.db')
c = conn.cursor()
c.execute('''CREATE TABLE IF NOT EXISTS user(username text PRIMARY KEY NOT NULL, password text NOT NULL, email text NOT NULL, phone INT NOT NULL, affiliated text NOT NULL)''')

c.execute('''INSERT OR IGNORE INTO user(username, password, email, phone, affiliated) VALUES (?,?,?,?,?)''',("hyunsukr", "hyunsuk1218", "hyunsukr@gmail.com", 6129631218, "no"))
c.execute('''INSERT OR IGNORE INTO user(username, password, email, phone, affiliated) VALUES (?,?,?,?,?)''',("mryoo", "blueswings18", "hyunsukr@gmail.com", 6129631218, "no"))

c.execute('SELECT * FROM user ')
for row in c:
    if row[0] == username:
        if row[1] == password:
            log = "True"
print(log)
