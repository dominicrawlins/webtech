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
      let mountedTeam = this.$route.params.team
      await this.fetchData(mountedTeam)
    }
    catch(err){
      console.log(err)
    }

  },
  watch: {
    '$route.params':{
      handler(newValue) {
            let newTeam = newValue.team
            this.fetchData(newTeam)
        },
        immediate: true,
    }
  },
  methods: {
    async fetchData(team){
      this.urlLoaded = false
      this.players = (await TeamService.getPlayers(team)).data
      this.teamAttributes = (await TeamService.getTeamStats(team)).data
      console.log("team atts: " + this.teamAttributes)
      console.log("player atts: "+ this.players)
      this.urlLoaded = true
    }
  }
}
