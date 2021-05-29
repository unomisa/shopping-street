import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

const state = {
  navBarHeight: 44, // 顶部栏高度
  cart: [],
  readyToSettle: []
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {
  }
})
