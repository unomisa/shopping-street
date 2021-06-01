import Toast from './Toast.vue'
const toast = {}

toast.install = function (Vue) {
  const ToastContrustor = Vue.extend(Toast) // 创建一个构造器
  const toast = new ToastContrustor() // 使用构造器创建一个Vue实例
  toast.$mount(document.createElement('div')) // 将该实例挂载到一个div上
  document.body.appendChild(toast.$el) // 将这个div添加至文档流
  Vue.prototype.$toast = toast // 在全局Vue实例上添加一个toast对象
}

export default toast