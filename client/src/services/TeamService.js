import Api from '@/services/Api'

export default {
  getTeams() {
    return Api().get('');
  },

  getPlayers(team) {
    const url = '/' + team + '/players'
    console.log(url)
    return Api().get(url)
  },

  getTeamStats(team) {
    const url = '/' + team + '/stats'
    return Api().get(url)
  }
}
