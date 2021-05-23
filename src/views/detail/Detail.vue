
<template>
  <div>
    <detail-nav-bar class="detail-nav-bar" />
    <scroll class="content" ref="scroll">
      <detail-swiper :banners="topImages" v-if="topImages.length!==0" />

      <detail-base-info :goodsBaseInfo="GoodsBaseInfo" />

      <detail-rate :rate="rate" v-if="rate.haveRate" />

      <detail-shop-info :shopInfo="shopInfo" />

      <detail-services :services="services" />

      <detail-show :show="show" />

      <detail-params :params="params" />
    </scroll>
  </div>
</template>

<script>

import DetailNavBar from './childComps/DetailNavBar.vue'
import DetailSwiper from './childComps/DetailSwiper.vue'
import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
import DetailServices from './childComps/DetailServices.vue'
import DetailShopInfo from './childComps/DetailShopInfo.vue'
import DetailShow from './childComps/DetailShow.vue'
import DetailRate from './childComps/DetailRate.vue'

import Scroll from 'components/common/scroll/Scroll.vue'

import { getDetail, GoodsBaseInfo, ShopInfo, Show, Params, Rate }
  from 'network/pageRequest/detail'
import { debounce } from '../../common/utils'
import DetailParams from './childComps/DetailParams.vue'

export default {
  name: 'detail',
  data () {
    return {
      topImages: [],
      GoodsBaseInfo: {},
      services: [],
      shopInfo: {},
      show: {},
      params: {},
      rate: {},

      isSwiperImageLoad: false
    }
  },
  components: {
    DetailNavBar,
    Scroll,
    DetailSwiper,
    DetailBaseInfo,
    DetailServices,
    DetailShopInfo,
    DetailShow,
    DetailParams,
    DetailRate

  },
  methods: {
    /**
     * * 事件监听回调方法
     */

    detailImageLoad () {
      this.$refs.scroll.refresh()
    }

    /**
     *
     */
  },
  created () {
    getDetail(this.$route.params.iid)
      .then((res) => {
        console.log(res)
        const data = res.result

        // 顶部轮播图
        this.topImages = data.itemInfo.topImages

        // 商品基本信息
        this.GoodsBaseInfo = new GoodsBaseInfo(data.itemInfo, data.columns, data.promotions)

        // 服务保障信息
        this.services = data.shopInfo.services

        // 店家信息
        this.shopInfo = new ShopInfo(data.shopInfo)

        // 商品展示信息
        this.show = new Show(data.detailInfo.detailImage[0].list, data.detailInfo.desc)

        // 商品参数信息
        this.params = new Params(data.itemParams.rule.tables[0], data.itemParams.info.set, data.itemParams.rule.desc)

        // 评价信息
        this.rate = new Rate(data.rate.cRate, data.rate.list[0])
      })
  },
  mounted () {
    // detail不在keep-alive中，因此若不销毁会多次添加该事件监听
    this.$bus.$on('detailImageLoad', debounce(this.detailImageLoad, 100))
  },
  destroyed () {
    // ! 使用事件总线添加事件监听后，需要移除它，否则下次创建Detail实例时会重复监听
    this.$bus.$off('detailImageLoad')
  }

}
</script>

<style lang="less" scoped>
.detail-nav-bar {
  background-color: #f8f8f8;
}
.content {
  height: calc(100vh - 49px - 44px);
  height: calc(
    100vh - var(--vh-offset, 0px) - 49px - 44px
  ); // 使用vh-check对vh进行正确计算
  background-color: #f8f8f8;
}
</style>