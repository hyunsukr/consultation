import sqlite3
import sys
conn = sqlite3.connect('user.db')
c = conn.cursor()
c.execute('SELECT * FROM appt ')
l = []
for row in c:
    l.append(row)

if len(l) ==0:
    print(none)
else:
    print(l)