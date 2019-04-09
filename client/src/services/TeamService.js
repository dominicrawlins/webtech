import Api from '@/services/Api'

export default {
  getTeams() {
    return Api().get('');
  }
}
