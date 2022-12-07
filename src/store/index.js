import Vue from 'vue'
import Vuex from 'vuex'
import { setItemm, getItemm } from '@/utils/localStorage'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    users: getItemm('usersToken')
  },
  getters: {
  },
  mutations: {
    updateUsers(state, data) {
      state.users = data
      setItemm('usersToken', data)
    }
  },
  actions: {
  },
  modules: {
  }
})
