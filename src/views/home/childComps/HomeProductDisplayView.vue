<template >
  <!-- 使用瀑布流样式展示商品 -->
  <waterfall-flow class="home-product-display" ref="waterfallFlow">
    <commodity-box :info='item' v-for="(item,index) in goods.list" class="item"
      :key="index" />
  </waterfall-flow>
</template>

<script>
import CommodityBox from 'components/content/commodityBox/CommodityBox.vue'
import WaterfallFlow from 'components/common/waterfallFlow/waterfallFlow.vue'

export default {
  name: 'productDisplay',
  data () {
    return {
      create: true
    }
  },
  props: {
    goods: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  components: {
    CommodityBox,
    WaterfallFlow
  },
  methods: {
    recalculate () {
      this.$refs.waterfallFlow.recalculate()
    }
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