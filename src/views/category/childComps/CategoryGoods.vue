<template >
  <waterfall-flow ref="waterfallFlow" @recalculated="recalculated">
    <commodity-box v-for="(item,index) of goods" :info="item" :key="index" />
  </waterfall-flow>
</template>

<script>
import CommodityBox from 'components/content/commodityBox/CommodityBox.vue'
import WaterfallFlow from 'components/common/waterfallFlow/waterfallFlow.vue'
import { waterfallFlowRefresh, highStorage } from 'common/mixin'

export default {
  components: {
    CommodityBox,
    WaterfallFlow
  },
  mixins: [waterfallFlowRefresh, highStorage],
  props: {
    goods: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>