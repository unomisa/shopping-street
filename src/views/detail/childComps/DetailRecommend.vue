<template>
  <detail-box class="detail-box">
    <div class="title">热门推荐</div>
    <div class="separator"></div>
    <waterfall-flow ref="waterfallFlow"
                    class="waterfall-flow"
                    v-if="recommendList.length>0">
      <commodity-box :info="item"
                     v-for="(item,index) in recommendList"
                     :key="index" />
    </waterfall-flow>
  </detail-box>
</template>

<script>
import WaterfallFlow from 'components/common/waterfallFlow/waterfallFlow.vue'
import CommodityBox from 'components/content/commodityBox/CommodityBox.vue'
import DetailBox from './DetailBox.vue'

export default {
  props: {
    recommendList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  components: {
    WaterfallFlow,
    CommodityBox,
    DetailBox
  }
}
</script>

<style lang="less" scoped>
.detail-box {
  padding-top: 0;
  padding-bottom: 0;
}

.title {
  padding: 8px;
  font-size: 20px;
  padding-right: 26px;
  color: #ee7abb;
  text-align: right;
  background: url("~assets/img/detail/recommend.svg") no-repeat;
  background-position: right center;
  background-size: 24px;
}

.separator {
  height: 1px;
  width: 70%;
  margin-left: auto;
  background-image: linear-gradient(to top, #fff1eb 0%, #ace0f9 100%);
  margin-bottom: 10px;
}
</style>