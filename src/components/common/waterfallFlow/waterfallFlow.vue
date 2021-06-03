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
    },

    // 事件添加方法
    addEvent () {
      // 监听重新计算高度时
      this.macy.on(this.macy.constants.EVENT_RECALCULATED, () => {
        this.$emit('recalculated')
      })
    }
  },
  mounted () {
    this.createMacy()
    this.addEvent()
    this.recalculate() // 经测试,这里刷新一次更能保证布局的准确性
  }
}
</script>

<style lang="less" scoped>
</style>