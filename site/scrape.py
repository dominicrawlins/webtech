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
   'liverpool': '#FF0000',
   'manchestercity': '#00FFFF',
   'chelsea': '#0000FF',
   'tottenham': '#FFFFFF',
   'arsenal': '#FF0000',
   'manchesterutd': '#FF0000',
   'leicestercity': '#0000FF',
   'wolverhampton': '#FFA500',
   'everton': '#0000FF',
   'watford': '#FFFF00',
   'westhamutd': '#7F1734',
   'crystalpalace': '#C4122E',
   'bournemouth': '#B50E12',
   'burnley': '#7F1734',
   'newcastleutd': '#000000',
   'brighton': '#0057B8',
   'southampton': '#FF0000',
   'cardiffcity': '#0057B8',
   'fulham': '#FFFFFF',
   'huddersfield': '#0E63AD'
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
