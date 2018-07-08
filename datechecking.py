import sqlite3
import sys
conn = sqlite3.connect('user.db')
c = conn.cursor()
made = "False"
username = sys.argv[1]
password = sys.argv[2]
date = sys.argv[3]
time = sys.argv[4]
teamname = sys.argv[5]
datetime = date + ' ' + time
c.execute('''CREATE TABLE IF NOT EXISTS appt(date text PRIMARY KEY NOT NULL, teamname text NOT NULL, username NOT NULL)''')

c.execute('SELECT * FROM user ')
for row in c:
    if row[0] == username:
        if row[1] == password:
            made = "Loggedin"
if made == "Loggedin":
    c.execute('SELECT * FROM appt')
    for row in c:
        if row[0] == datetime:
            made = "taken"
if made == "Loggedin":
    c.execute('''INSERT OR IGNORE INTO appt(date, teamname, username) VALUES (?,?,?)''',(str(datetime), str(teamname), str(username)))
    made = "Madeappt"
print(made)
conn.commit()
conn.close()