import TeamService from '@/services/TeamService'
export default {
  data () {
    return{
      teams: '',
      lastVisited: ''
    }

  },
  async mounted() {
    this.teams = (await TeamService.getTeams()).data
    this.lastVisited = JSON.parse(this.$cookie.get('lastVisited'))
    console.log(this.lastVisited)
  },
  methods: {
    getImageUrl(pic) {
      return require('../../assets/' + pic + '.png')
    }
  }
}
