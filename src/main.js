import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VueLazyload from 'vue-lazyload' // 图片懒加载
import vhCheck from 'vh-check' // 解决vh在移动端的异常计算
import toast from 'components/common/plugins/toast' // 插件方式的提示信息组件
import MyOverlay from 'components/common/plugins/overlay' // 遮罩

// element UI
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
// Vue.use(ElementUI)

// vant 按需引入
import { Grid, GridItem, Icon, Image, Cell, CellGroup, Button, Skeleton, Field, Form, NavBar, Overlay } from 'vant'

[Grid, GridItem, Icon, Image, Cell, CellGroup, Button, Skeleton, Field, Form, NavBar, Overlay].forEach(component => {
  Vue.use(component)
})

// 使用插件
const plugins = [toast, VueLazyload, MyOverlay]
plugins.forEach(plugin => {
  Vue.use(plugin)
})

Vue.prototype.$bus = new Vue() // 添加一个事件总线
vhCheck()

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
