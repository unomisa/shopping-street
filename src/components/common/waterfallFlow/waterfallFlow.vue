<template>
  <div ref="waterfallFlowEle">
    <slot></slot>
  </div>
</template>

<script>
import Macy from 'macy'

export default {
  props: {
    xGap: {
      type: Number,
      default: 10
    },
    yGap: {
      type: Number,
      default: 0
    },
    columns: {
      type: Number,
      default: 2
    }
  },
  data () {
    return {
      macy: {}
    }
  },
  methods: {
    // 设置瀑布流信息
    createMacy () {
      this.macy = Macy({
        container: this.$refs.waterfallFlowEle,
        trueOrder: false,
        margin: {
          x: this.xGap,
          y: this.yGap
        },
        waitForImages: true, // 设置为false会在更新图片时回顶部
        columns: this.columns
      })
    },

    // 刷新瀑布流布局
    recalculate (bool = true) {
      this.macy.recalculate(bool)
    }
  },
  mounted () {
    this.createMacy()
  }
}
</script>

<style lang="less" scoped>
</style>