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
    order: String
  },
  data(){
    return{
      teamStats: '',
      namedColumns: [],
      dict: {
        goalsFor: "Goals Scored",
        name: "Name",
        goalsAgainst: "Goals Conceded",
        wins: "Wins"
      },
      table: true,
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
      this.teamStats = (await TeamService.getSortedTeams(this.stat, this.columns, this.order)).data
      for(let i = 0; i < this.teamStats.length; i++){
        this.heights.push(this.teamStats[i][this.stat])
        this.labels.push(this.teamStats[i]['name'])
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
      this.table = !this.table
    }
  }
}
