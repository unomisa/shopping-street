import Overlay from './Overlay.vue'
const overlay = {}

overlay.install = function (Vue) {
  const OverlayContrustor = Vue.extend(Overlay) // 创建一个构造器
  const overlay = new OverlayContrustor() // 使用构造器创建一个Vue实例
  overlay.$mount(document.createElement('div')) // 将该实例挂载到一个div上
  document.body.appendChild(overlay.$el) // 将这个div添加至文档流
  Vue.prototype.$overlay = overlay // 在全局Vue实例上添加一个toast对象
}

export default overlay