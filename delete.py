import sqlite3
import sys
conn = sqlite3.connect('user.db')
c = conn.cursor()
deleted = "False"
username = sys.argv[1]
password = sys.argv[2]
date = sys.argv[3]
time = sys.argv[4]
teamname = sys.argv[5]
datetime = date + ' ' + time
c.execute('SELECT * FROM user ')
for row in c:
    if row[0] == username:
        if row[1] == password:
            deleted = "Loggedin"
if deleted == "Loggedin":
    c.execute('SELECT * FROM appt')
    for row in c:
        if row[0] == datetime and row[2] == teamname and row[3] == username:
            #cmd = 'DELETE FROM appt WHERE date = ' + str(datetime) + ' AND email = ' + str(email) + ' AND teamname = ' + str(teamname)
            c.execute('''DELETE FROM appt WHERE date = ? AND username = ? AND teamname = ?''',(str(datetime), str(username), str(teamname)))
            deleted = "deleted"
print(deleted)
conn.commit()
conn.close()