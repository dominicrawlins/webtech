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
  },
  getSortedTeams(sort, columns){
    let url = '/stats/teams'
    if(sort){
      url += '?sort=' + sort
    }
    if(columns){
      for(let i = 0; i < columns.length; i++){
        url += '&columns=' + columns[i]
      }
    }
    console.log(url)
    return Api().get(url)
  }
}
