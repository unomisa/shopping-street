<template>
  <div :class="messageClass" v-show="isShow">
    {{message}}
  </div>
</template>

<script>
import { throttle } from 'common/utils'

export default {
  data () {
    return {
      fadeOut: false,
      message: '操作成功',
      isShow: false,
      show: null,
      duration: 2000
    }
  },
  computed: {
    messageClass () {
      return {
        message: true,
        'fade-out': this.fadeOut
      }
    }
  },
  methods: {
    showOrigin () {
      let timer = null
      return (message, duration = 2000) => {
        this.duration = duration
        clearTimeout(timer) // 有新一次的执行就停止计时，放置提示信息消失
        this.message = message
        this.isShow = true // 显示信息
        timer = setTimeout(() => {
          this.fadeOut = true // 开始淡出动画
          setTimeout(() => {
            this.isShow = false // 淡出完毕，隐藏消息
            this.message = '操作成功'
            this.fadeOut = false
          }, 500)
        }, duration)
      }
    }
  },
  mounted () {
    this.show = throttle(this.showOrigin(), this.duration - 100)
  }
}
</script>

<style lang="less" scoped>
.message {
  position: fixed;
  z-index: 9999;
  bottom: calc(var(--tab-bar) + 10px);
  left: 50%;
  transform: translateX(-50%);
  padding: 4px 8px;
  font-size: 12px;
  border-radius: 5px;
  color: white;
  background-color: rgba(242, 17, 112, 0.8);
  transition: opacity 0.5s;
}

.fade-out {
  opacity: 0;
}
</style>