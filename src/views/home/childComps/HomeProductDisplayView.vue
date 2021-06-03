<template >
  <!-- 使用瀑布流样式展示商品 -->
  <waterfall-flow class="home-product-display" ref="waterfallFlow"
    @recalculated="recalculated">
    <commodity-box :info='item' v-for="(item,index) in goods" class="item"
      :key="index" />
  </waterfall-flow>
</template>

<script>
import CommodityBox from 'components/content/commodityBox/CommodityBox.vue'
import WaterfallFlow from 'components/common/waterfallFlow/waterfallFlow.vue'
import {
  waterfallFlowRefresh, highStorage
} from 'common/mixin'

export default {
  name: 'productDisplay',
  mixins: [
    waterfallFlowRefresh, highStorage
  ],
  props: {
    goods: {
      type: Array,
      default () {
        return []
      }
    }
  },
  components: {
    CommodityBox,
    WaterfallFlow
  },
  updated () { // 数据刷新后更新结构
    console.log('结构改变')
    this.$refs.waterfallFlow.recalculate()
  }
}
</script>

<style lang="less" scoped>
.home-product-display {
  margin: 10px;
}

.item {
  width: 0; // 在使用macy框架时,需要置0这样在渲染出来之前不会显示
}
</style>