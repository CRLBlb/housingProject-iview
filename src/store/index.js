import Vue from 'vue'
import Vuex from 'vuex'

import user from './module/user'
import app from './module/app'
import agent from './module/agent'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //管理员登录
    adminlogin (state, admin) {
      state.admin = admin
      window.localStorage.setItem('admin', JSON.stringify(admin))
    }
  },
  mutations: {
    //
  },
  actions: {
    //
  },
  modules: {
    user,
    app,
    agent
  }
})
