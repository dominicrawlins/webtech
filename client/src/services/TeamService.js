import Api from '@/services/Api'

export default {
  getTeams() {
    return Api().get('');
  },

  getPlayers(team) {
    const url = '/' + team
    console.log(url)
    return Api().get(url)
  }
}
