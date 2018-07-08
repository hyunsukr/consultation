import sqlite3
import sys
conn = sqlite3.connect('user.db')
c = conn.cursor()
made = "False"
username = sys.argv[1]
password = sys.argv[2]
c.execute('SELECT * FROM user ')
for row in c:
    if row[0] == username:
        if row[1] == password:
            made = "Loggedin"
l =[]
if made == "Loggedin":
    c.execute('SELECT * FROM appt')
    for row in c:
        if row[2] == username:
            outputstring = str(row[0]) + 'TEAMNAMEISTHIS!@#$%: ' + str(row[1])
            l.append(outputstring)
if len(l) ==0:
    print(made)
else:
    print(l)