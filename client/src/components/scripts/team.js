import TeamService from '@/services/TeamService'
import {mapState} from 'vuex'
import { Timeline} from 'vue-tweet-embed'
export default {
  components: {
    Timeline
  },
  data () {
    return{
      players: '',
      teamAttributes: '',
      urlLoaded : ''
    }

  },
  computed: {
    ...mapState([
      'route'
    ])
  },
  async mounted() {
    try{
      this.urlLoaded = false
      const team = this.$route.params.team
      this.players = (await TeamService.getPlayers(team)).data
      this.teamAttributes = (await TeamService.getTeamStats(team)).data
      this.urlLoaded = true
    }
    catch(err){
      console.log(err)
    }

  },
  methods: {
  }
}
