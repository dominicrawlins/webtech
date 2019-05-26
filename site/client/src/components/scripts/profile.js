import TeamService from '@/services/TeamService'
import AuthenticationService from '@/services/AuthenticationService'

export default {

  data () {
    return{
      teams: '',
      selectedTeam: '',
    }
  },
  async mounted() {
    this.teams = (await TeamService.getTeams()).data
  },

  methods: {
    logout() {
      this.$store.dispatch('setToken',null)
      this.$router.push('root')
    },
    getImageUrl(pic) {
      return require('../../assets/' + pic + '.png')
    }
  }
}
