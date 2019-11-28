import Vue from 'vue'
import Vuex from 'vuex'
import storage from '../storage/index'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    token: ''
  },
  mutations: {
    getToken (state, payload) {
      state.token = payload
      storage.set('token', payload)
    }
  }
})

export default store
