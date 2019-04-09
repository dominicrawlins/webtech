import html
import requests
from bs4 import BeautifulSoup
from urllib.request import urlopen
import sqlite3

baseurl = "https://www.soccerstats.com/"
leagueaddurl = "latest.asp?league="
league = "england"
page = requests.get(baseurl+leagueaddurl+league)
soup = BeautifulSoup(page.content, "html.parser")
table = soup.find(class_="seven columns")
teams = table.find_all(class_="odd")

teamStatDescription = ["Position", "Games Played", "Games Won", "Games Drawn", "Games Lost", "Goals For", "Goals Against", "Points"]
getStats = [0,1,2,3,4,5,6,8]


def createConnection(dbFile):
    try:
        connection = sqlite3.connect(dbFile)
        return connection
    except Exception as e:
        print(e)
    return None

def createTable(connection, createTableSql):
    try:
        c = connection.cursor()
        c.execute(createTableSql)
    except Exception as e:
        print(e)


sqlCreateTeamsTable = '''CREATE TABLE IF NOT EXISTS teams (id integer PRIMARY KEY, name text NOT NULL, points integer NOT NULL);'''


database = "server/footballStats.db"
connection = createConnection(database)
if connection is not None:
    createTable(connection, sqlCreateTeamsTable)
else:
    print("Cannot create the databse connection")


def createTeam(connection, team):
    sqlInsertTeam = '''REPLACE INTO teams(id, name, points) VALUES(?, ?, ?);'''
    c = connection.cursor()
    c.execute(sqlInsertTeam, team)
    return c.lastrowid



for team in range(0, 20):
    teamStats = []
    stats = teams[team].find_all("td", {"align":"center"})
    thisteam = teams[team].find("td", {"align": "left"}).get_text().replace(" ", "").strip().lower().replace("&", "and")
    print("generating data: " + thisteam)
    url = teams[team].find("a", href=True)['href']

    #teamfilename = "teamData/" + thisteam + ".txt"
    #file = open(teamfilename, "w")



    for idx, iter in enumerate(getStats):
        teamStats.append(stats[iter].get_text().strip())
        #file.write(teamStatDescription[idx] + ":" + teamStats[idx] + "\n")
    if connection is not None:
        teamDB = (team, thisteam, teamStats[7])
        createTeam(connection, teamDB)
        print("created " + thisteam + " in database")

connection.commit()
connection.close()
