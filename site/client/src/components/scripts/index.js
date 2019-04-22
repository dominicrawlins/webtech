import TeamService from '@/services/TeamService'
export default {
  data () {
    return{
      teams: ''
    }

  },
  async mounted() {
    this.teams = (await TeamService.getTeams()).data
  },
  methods: {
  }
}
