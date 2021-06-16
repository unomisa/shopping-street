<template>
  <div>
    <van-overlay :show="show"
                 z-index="1000"
                 @click="clickOverlay" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      show: false
    }
  },
  methods: {
    hideOverlay () {
      this.show = false
    },
    showOverlay () {
      this.show = true
    },
    clickOverlay () {
      this.$emit('hideOverlay')
    }
  }
}
</script>

<style lang="less" scoped>
</style>