import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'


Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  plugins : [
    createPersistedState()
  ],
  state: {
    token: null,
    isUserLoggedIn: false
  },
  mutations: {
    setToken(state,token){
      state.token = token
      state.isUserLoggedIn = !! (token)
      // if (token) {
      //   state.isUserLoggedIn = true
      // } else {
      //   state.isUserLoggedIn = false
      // }
    }
  },
  actions: {
    setToken({commit},token) {
      commit('setToken', token)
    }
  }
})
