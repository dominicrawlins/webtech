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
      this.updateLastVisited(mountedTeam)
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
            this.updateLastVisited(newTeam)
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
    },
    updateLastVisited(team){
      var lastVisited = JSON.parse(this.$cookie.get('lastVisited'))
      if(lastVisited){
        if(lastVisited.includes(team)){
          for(var i = 0; i < lastVisited.length; i++){
            if(lastVisited[i] == team){
              lastVisited.splice(i, 1)
            }
          }
          lastVisited.push(team)
        }
        else{
          if(lastVisited.length >= 10){
            lastVisited.shift()
          }
          lastVisited.push(team)
        }

      }
      else{
        lastVisited = [team]
        connsole.log("hello2")
      }
      this.$cookie.set('lastVisited', JSON.stringify(lastVisited), 1);
    }
  }
}
