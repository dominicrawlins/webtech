import TeamService from '@/services/TeamService'
export default {
  name: 'indiTopStats',
  props: {
    stat: String,
    columns: Array
  },
  data(){
    return{
      teamStats: '',
      namedColumns: [],
      dict: {
        goalsFor: "Goals Scored",
        name: "Name",
        goalsAgainst: "Goals Conceded"
      }
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
      this.teamStats = (await TeamService.getSortedTeams(this.stat, this.columns)).data
      console.log(typeof this.teamStats)
    },
    columnsDictionary(){
      for(let i = 0; i < this.columns.length; i++){
        this.namedColumns.push(this.dict[this.columns[i]])
      }
      console.log
    }
  }
}
