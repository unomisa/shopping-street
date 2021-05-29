<template>
  <div :class="messageClass" ref="message">
    {{message}}
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      default: '操作成功'
    }
  },
  data () {
    return {
      fadeOut: false
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
  mounted () {
    setTimeout(() => {
      this.fadeOut = true
    }, 2000)
  }
}
</script>

<style lang="less" scoped>
.message {
  position: fixed;
  z-index: 1000;
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