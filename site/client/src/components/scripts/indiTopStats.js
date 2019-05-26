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
      },
      namedColumnsShort: [],
      teamStatsShort: [],
      showTable: true,
      heights: [],
      maxLength: 200,
      labels: [],
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
        this.allStats = (await TeamService.getAllPlayers(this.stat, this.columns, this.order, 10)).data
      }
      else if(this.table === 'teams'){
        this.allStats = (await TeamService.getSortedTeams(this.stat, this.columns, this.order)).data
      }
      for(let i = 0; i < 5; i++){
        this.heights.push(this.teamStats[i][this.stat])
        this.labels.push(this.teamStats[i]['name'])
        this.teamStatsShort.push(this.teamStats[i])
        this.namedColumnsShort.push(this.namedColumns[i])
      }
      console.log(this.heights)
    },
    columnsDictionary(){
      for(let i = 0; i < this.columns.length; i++){
        this.namedColumns.push(this.dict[this.columns[i]])
      }
      console.log
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
      for(var i = 0; i < size+prevLen && size<20; i++ ) {
        this.teamStatsShort.push(this.teamStats[i])
        //this.namedColumnsShort.push(this.namedColumns[i])
        this.heights.push(this.teamStats[i][this.stat])
        this.labels.push(this.teamStats[i]['name'])
      }

    }
  }
}
