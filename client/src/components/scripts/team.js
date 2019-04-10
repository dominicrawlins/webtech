import TeamService from '@/services/TeamService'
import {mapState} from 'vuex'
export default {
  data () {
    return{
      players: ''
    }

  },
  computed: {
    ...mapState([
      'route'
    ])
  },
  async mounted() {
    try{
      const team = this.$route.params.team
      this.players = (await TeamService.getPlayers(team)).data
    }
    catch(err){
      console.log(err)
    }

  },
  methods: {
  }
}
