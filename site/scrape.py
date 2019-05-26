import html
import requests
from bs4 import BeautifulSoup
from urllib.request import urlopen
import sqlite3
import re

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


sqlCreateTeamsTable = '''CREATE TABLE IF NOT EXISTS teams (id text PRIMARY KEY, name text, position integer, gamesPlayed integer, wins integer, draws integer, losses integer, goalsFor integer, goalsAgainst integer, points integer, twitterURL string, primaryColours string);'''


database = "server/src/db/footballStats.db"
connection = createConnection(database)
if connection is not None:
    createTable(connection, sqlCreateTeamsTable)
else:
    print("Cannot create the databse connection")


def createTeam(connection, team):
    sqlInsertTeam = '''REPLACE INTO teams(id, name, position, gamesPlayed, wins, draws, losses, goalsFor, goalsAgainst, points, twitterURL, primaryColours) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);'''
    c = connection.cursor()
    c.execute(sqlInsertTeam, team)
    return c.lastrowid

twitterDictionary = {
   'liverpool': 'LFC',
   'manchestercity': 'ManCity',
   'chelsea': 'ChelseaFC',
   'tottenham': 'SpursOfficial',
   'arsenal': 'Arsenal',
   'manchesterutd': 'ManUtd',
   'leicestercity': 'LCFC',
   'wolverhampton': 'Wolves',
   'everton': 'Everton',
   'watford': 'WatfordFC',
   'westhamutd': 'WestHamUtd',
   'crystalpalace': 'CPFC',
   'bournemouth': 'afcbournemouth',
   'burnley': 'BurnleyOfficial',
   'newcastleutd': 'NUFC',
   'brighton': 'OfficialBHAFC',
   'southampton': 'SouthamptonFC',
   'cardiffcity': 'CardiffCityFC',
   'fulham': 'FulhamFC',
   'huddersfield': 'htafcdotcom'
}

nameDictionary = {
   'liverpool': 'Liverpool',
   'manchestercity': 'Manchester City',
   'chelsea': 'Chelsea',
   'tottenham': 'Spurs',
   'arsenal': 'Arsenal',
   'manchesterutd': 'Manchester United',
   'leicestercity': 'Leicester City',
   'wolverhampton': 'Wolves',
   'everton': 'Everton',
   'watford': 'Watford',
   'westhamutd': 'West Ham United',
   'crystalpalace': 'Crystal Palace',
   'bournemouth': 'Bournemouth',
   'burnley': 'Burnley',
   'newcastleutd': 'Newcastle United',
   'brighton': 'Brighton and Hove Albion',
   'southampton': 'Southampton',
   'cardiffcity': 'Cardiff City',
   'fulham': 'Fulham',
   'huddersfield': 'Huddersfield Town'
}

primaryColours = {
   'liverpool': 'rgba(200,16,46,0.3)',
   'manchestercity': 'rgba(108,171,221,0.3)',
   'chelsea': 'rgba(3, 70, 148,0.3)',
   'tottenham': 'rgba(19,34,87,0.3)',
   'arsenal': 'rgba(239,1,7,0.3)',
   'manchesterutd': 'rgba(218,41,28,0.3)',
   'leicestercity': 'rgba(0,83,160,0.3)',
   'wolverhampton': 'rgba(253,185,19,0.3)',
   'everton': 'rgba(39,68,136,0.3)',
   'watford': 'rgba(251,238,35,0.3)',
   'westhamutd': 'rgba(122,38,58,0.3)',
   'crystalpalace': 'rgba(27, 69, 143,0.3)',
   'bournemouth': 'rgba(181,14,18,0.3)',
   'burnley': 'rgba(108,29,69,0.3)',
   'newcastleutd': 'rgba(45,41,38,0.3)',
   'brighton': 'rgba(0,87,184,0.3)',
   'southampton': 'rgba(215,25,32,0.3)',
   'cardiffcity': 'rgba(0,112,181,0.3)',
   'fulham': 'rgba(0,0,0,0.3)',
   'huddersfield': 'rgba(14, 99, 173,0.3)'
}

teamNames = []

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
        teamDB = (thisteam, nameDictionary[thisteam], teamStats[0], teamStats[1], teamStats[2], teamStats[3], teamStats[4], teamStats[5], teamStats[6], teamStats[7], twitterDictionary[thisteam], primaryColours[thisteam])
        createTeam(connection, teamDB)
        teamNames.append(thisteam)


foxTeamsURL = "https://www.foxsports.com/soccer/liverpool-team"
page = requests.get(foxTeamsURL)
soup = BeautifulSoup(page.content, "html.parser")
table = soup.find(class_="wisbb_standardTable")
teamrefs = table.find_all(class_="wisbb_fullTeam", href=True)
teamURLs = []
for teamref in teamrefs:
    teamURLs.append(teamref['href'])

sqlCreatePlayersTable = '''CREATE TABLE IF NOT EXISTS players(id integer PRIMARY KEY, team string NOT NULL, name text NOT NULL, goals integer, assists integer, position string);'''

if connection is not None:
    createTable(connection, sqlCreatePlayersTable)
    print("created players table")
else:
    print("Cannot create the database connection")

foxBaseURL = "https://www.foxsports.com"

def createPlayer(connection, player):
    sqlInsertPlayer = '''REPLACE INTO players(id, team, name, goals, assists, position) VALUES(?, ?, ?, ?, ?, ?);'''
    c = connection.cursor()
    c.execute(sqlInsertPlayer, player)
    return c.lastrowid


nextid = 0


for idx, teamURL in enumerate(teamURLs):
    foxURL = foxBaseURL + teamURL + "-stats"
    page = requests.get(foxURL)
    soup = BeautifulSoup(page.content, "html.parser")


    players = soup.find_all(class_="wisbb_fvStand")
    players.pop(0)
    for player in players:
        playerStats = player.find_all("td")
        listOfPlayerStats = []
        for playerStat in playerStats:
            listOfPlayerStats.append(playerStat.get_text().replace("\n", ""))
        positionAndName = listOfPlayerStats[0]
        position = positionAndName[-1:]
        startName = re.search("[A-z]", positionAndName).start()
        endName = 0
        endComma = re.search(",", positionAndName)
        if(endComma):
            endName = endComma.start()
        else:
            endName = re.search("[A-Z]", positionAndName[3:]).start() + 3
        name = positionAndName[startName: endName]
        sqlInsertStats = [nextid, teamNames[idx], name, listOfPlayerStats[4], listOfPlayerStats[5], position]
        createPlayer(connection, sqlInsertStats)
        nextid += 1
        print("added: " + name)




connection.commit()
connection.close()
