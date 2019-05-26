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
        wins: "Wins"
      },
      showTable: true,
      heights: [],
      maxLength: 200,
      labels: []
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

      for(let i = 0; i < this.allStats.length; i++){
        this.heights.push(this.allStats[i][this.stat])
        this.labels.push(this.allStats[i]['name'])
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
    }
  }
}
