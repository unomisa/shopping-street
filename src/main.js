import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vhCheck from 'vh-check' // 解决vh在移动端的异常计算

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue() // 添加一个事件总线
vhCheck()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
