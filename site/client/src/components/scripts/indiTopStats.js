import TeamService from '@/services/TeamService'
export default {
  name: 'indiTopStats',
  props: ['stat'],
  data(){
    return{
      teamStats: '',
    }
  },
  async mounted() {
    try{
      await this.fetchData()
    }
    catch(err){
      console.log(err)
    }

  },
  methods: {
    async fetchData(){
      this.teamStats = (await TeamService.getSortedTeams("goalsFor", ["name", "goalsFor"])).data
    }
  }
}
