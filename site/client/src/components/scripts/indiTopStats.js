import TeamService from '@/services/TeamService'
import BarChart from '@/components/BarChart'
export default {
  name: 'indiTopStats',
  components: {
    BarChart
  },
  props: {
    stat: String,
    columns: Array,
    order: String,
    table: String
  },
  data(){
    return{
      allStats: '',
      namedColumns: [],
      dict: {
        goalsFor: "Goals Scored",
        name: "Name",
        goalsAgainst: "Goals Conceded",
        wins: "Wins",
        goals: "Goals",
        assists: "Assists",
        team: "Team"
      },
      idDictionary:{
           'Liverpool': 'liverpool',
           'Manchester City': 'manchestercity',
           'Chelsea': 'chelsea',
           'Spurs': 'tottenham',
           'Arsenal': 'arsenal',
           'Manchester United':'manchesterutd',
           'Leicester City':'leicestercity',
           'Wolves':'wolverhampton',
           'Everton':'everton',
           'Watford':'watford',
           'West Ham United':'westhamutd',
           'Crystal Palace': 'crystalpalace',
           'Bournemouth': 'bournemouth',
           'Burnley': 'burnley',
           'Newcastle United': 'newcastleutd',
           'Brighton and Hove Albion': 'brighton',
           'Southampton': 'southampton',
           'Cardiff City': 'cardiffcity',
           'Fulham': 'fulham',
           'Huddersfield Town': 'huddersfield'
      },
      nameDictionary:{
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
      },
      namedColumnsShort: [],
      teamStatsShort: [],
      showTable: true,
      heights: [],
      maxLength: 200,
      labels: [],
      teams: []
    }
  },
  async mounted() {
    try{
      this.columnsDictionary()
      await this.fetchData()
    }
    catch(err){
      console.log(err)
    }

  },
  methods: {
    async fetchData(){
      if(this.table === 'players'){
        this.allStats = (await TeamService.getAllPlayers(this.stat, this.columns, this.order, 100)).data
      }
      else if(this.table === 'teams'){
        this.allStats = (await TeamService.getSortedTeams(this.stat, this.columns, this.order)).data
      }
      for(let i = 0; i < 5; i++){
        this.heights.push(this.allStats[i][this.stat])
        this.labels.push(this.allStats[i]['name'])
        this.teamStatsShort.push(this.allStats[i])
        if(this.table === 'players'){
          this.teamStatsShort[i]['team'] = this.nameDictionary[this.teamStatsShort[i]['team']]
        }

        if(this.namedColumns[i]){
          this.namedColumnsShort.push(this.namedColumns[i])
        }
        if(this.table === 'players'){
          this.teams.push(this.idDictionary[this.allStats[i]['team']])
        }
        else if(this.table === 'teams'){
          this.teams.push(this.idDictionary[this.allStats[i]['name']])
        }
      }
      console.log(this.namedColumnsShort)
    },
    columnsDictionary(){
      for(let i = 0; i < this.columns.length; i++){
        this.namedColumns.push(this.dict[this.columns[i]])
      }
    },
    switchTable(){
      this.showTable = !this.showTable
    },
    changeShownStats(size) {
      var prevLen = this.teamStatsShort.length
      this.teamStatsShort = []
      //this.namedColumnsShort = []
      this.heights = []
      this.labels = []
      this.teams = []
      for(var i = 0; i < size+prevLen && i<this.allStats.length; i++ ) {
        this.teamStatsShort.push(this.allStats[i])
        if(this.nameDictionary[this.teamStatsShort[i]['team']] && this.table==='players'){
          this.teamStatsShort[i]['team'] = this.nameDictionary[this.teamStatsShort[i]['team']]
        }
        //
        console.log(this.teamStatsShort)
        //this.namedColumnsShort.push(this.namedColumns[i])
        this.heights.push(this.allStats[i][this.stat])
        this.labels.push(this.allStats[i]['name'])
        if(this.table === 'players'){
          this.teams.push(this.idDictionary[this.allStats[i]['team']])
        }
        else if(this.table === 'teams'){
          this.teams.push(this.idDictionary[this.allStats[i]['name']])
        }
      }

    }
  }
}
