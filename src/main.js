import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vhCheck from 'vh-check' // 解决vh在移动端的异常计算
import toast from 'components/common/toast' // 插件方式的提示信息组件
import VueLazyload from 'vue-lazyload' // 图片懒加载

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue() // 添加一个事件总线
vhCheck()

Vue.use(toast) // 插件方式的提示信息
Vue.use(VueLazyload, {}) // 图片懒加载

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
