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

  getAllPlayers(sort, columns, order, number, team){
    let url = '/stats/players'
    if(sort){
      url += '?sort=' + sort + "+" + order
    }
    if(columns){
      for(let i = 0; i < columns.length; i++){
        url += '&columns=' + columns[i]
      }
    }
    if(number){
      url += '&top=' + number
    }
    if(team){
      url += '&team=' + team
    }
    console.log(url)
    return Api().get(url)
  },

  getTeamStats(team) {
    const url = '/' + team + '/stats'
    return Api().get(url)
  },
  getSortedTeams(sort, columns, order){
    let url = '/stats/teams'
    if(sort){
      url += '?sort=' + sort + "+" + order
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
