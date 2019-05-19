import TeamService from '@/services/TeamService'
export default {
  data () {
    return{
      teams: ''
    }

  },
  async mounted() {
    this.teams = (await TeamService.getTeams()).data
    console.log(this.teams)
  },
  methods: {
    logout() {
      this.$store.dispatch('setToken',null)
      this.$router.push('root')
    }
  }
}
