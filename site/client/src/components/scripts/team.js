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
      urlLoaded : '',
      // topPlayers: [],
      // no_of_goals: [],
      hi :'',
      width: '200px',
    }

  },
  computed: {
    ...mapState([
      'route'
    ]),
    computedWidth() {
      return this.width
    }
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
    getImageUrl(pic){
      return require('../../assets/' + pic + '.png')
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
      }
      this.$cookie.set('lastVisited', JSON.stringify(lastVisited), 1);
    },
    greet() {
      this.hello = 'good morning'
    },
    getTopPlayers(players){
      var arr_name = []
      var arr_goals = []
      var count = 0
      for(var i = 0; i < 5; i++){
          arr_name.push(players[i].name)
          arr_goals.push(players[i].goals)
      }
      // topPlayers = arr_name
      // no_of_goals = arr_goals
      return [arr_name, arr_goals]
    }
  }
}
