<template>
  <transition name="van-slide-right">
    <div class="detail">
      <detail-nav-bar class="detail-nav-bar"
                      :target="this.scrollEle"
                      :scroll="this.$refs.scroll" />
      <scroll class="content"
              ref="scroll"
              @scroll="scroll"
              :probeType="3">
        <detail-swiper :banners="topImages" />

        <van-skeleton title
                      :row="6"
                      :loading="loading">
          <detail-base-info :goodsBaseInfo="GoodsBaseInfo" />

          <detail-rate :rate="rate"
                       v-if="this.haveRate" />

          <detail-shop-info :shopInfo="shopInfo" />

          <detail-services :services="services" />

          <detail-show :show="show"
                       ref="show" />

          <detail-params :params="params"
                         ref="params" />

          <detail-recommend :recommendList="recommendList"
                            ref="recommend" />
        </van-skeleton>
      </scroll>

      <back-top class="back-top"
                @click.native="backTop()"
                :isShow="this.isShowBackTopBtn" />

      <detail-sku-info :class="skuInfoClass"
                       :skuInfo="skuInfo"
                       @closeInventory="closeInventory"
                       @addToCart="addToCart" />

      <detail-bottom-bar @openInventory="openInventory" />
    </div>
  </transition>
</template>

<script>

import DetailNavBar from './childComps/DetailNavBar.vue'
import DetailSwiper from './childComps/DetailSwiper.vue'
import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
import DetailRecommend from './childComps/DetailRecommend.vue'
import DetailServices from './childComps/DetailServices.vue'
import DetailShopInfo from './childComps/DetailShopInfo.vue'
import DetailShow from './childComps/DetailShow.vue'
import DetailRate from './childComps/DetailRate.vue'
import DetailParams from './childComps/DetailParams.vue'
import DetailBottomBar from './childComps/DetailBottomBar.vue'

import Scroll from 'components/common/scroll/Scroll.vue'
import BackTop from 'components/common/backtop/BackTop.vue'
import DetailSkuInfo from 'components/content/skuInfo/SkuInfo.vue'

import { getDetail, GoodsBaseInfo, ShopInfo, Show, Params, Rate, getRecommend, SkuInfo, Cart }
  from 'network/pageRequest/detail'

export default {
  name: 'detail',
  data () {
    return {
      loading: true, // 是否正在加载
      iid: '',
      topImages: [], // 轮播图
      scrollEle: [], // 需要定位的元素
      GoodsBaseInfo: {}, // 商品基本
      services: [], // 保障服务
      shopInfo: {}, // 商家
      show: {}, // 展示
      params: {}, // 参数
      rate: {}, // 评论
      haveRate: false, // 是否有评论
      recommendList: [], // 推荐
      isShowBackTopBtn: false, // 是否显示返回顶部按钮,
      skuInfo: {}, // 库存信息
      isShowSkuInfo: false
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
    DetailRate,
    DetailRecommend,
    BackTop,
    DetailBottomBar,
    DetailSkuInfo

  },
  methods: {
    // * 事件处理方法
    backTop () {
      this.$refs.scroll.scrollTo(0, 0)
    },

    refresh () {
      // 为当前路由时才进行刷新
      this.$refs.scroll.refresh()
    },

    scroll () {
      if (this.$refs.show.$el.getBoundingClientRect().top < this.$store.state.navBarHeight) {
        (this.isShowBackTopBtn !== true) && (this.isShowBackTopBtn = true)
      } else {
        (this.isShowBackTopBtn !== false) && (this.isShowBackTopBtn = false)
      }
    },

    // 打开库存信息
    openInventory () {
      this.isShowSkuInfo = true
      this.$overlay.showOverlay()
    },

    // 关闭库存信息
    closeInventory () {
      this.isShowSkuInfo = false
      this.$overlay.hideOverlay()
    },

    // 添加商品至购物车
    addToCart (currentInfo) {
      const info = {
        iid: this.iid,
        currentInfo: currentInfo,
        shopName: this.shopInfo.name,
        title: this.GoodsBaseInfo.title
      }
      this.$store.dispatch('addToCart', new Cart(info))
        .then((message) => {
          this.$toast.show(message) // 加入购物车完成,显示提示信息
        })
    }

  },
  created () {
    getDetail(this.$route.params.iid)
      .then((res) => {
        console.log(res)
        const data = res.result

        // 商品唯一iid
        this.iid = res.iid

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
        if ('rule' in data.itemParams) {
          this.params = new Params({ tables: data.itemParams.rule.tables[0], info: data.itemParams.info.set, desc: data.itemParams.rule.desc })
        } else if ('info' in data.itemParams) {
          this.params = new Params({ info: data.itemParams.info.set })
        }

        // 评价信息
        this.haveRate = data.rate.cRate > 0
        this.haveRate && (this.rate = (new Rate(data.rate.list[0])))

        // 库存信息
        this.skuInfo = new SkuInfo(data.skuInfo)

        this.loading = false // 加载完成
      })

    getRecommend()
      .then(res => {
        this.recommendList = res.data.list
      })
  },
  computed: {
    skuInfoClass () {
      return {
        'sku-info-unfold': this.isShowSkuInfo
      }
    }
  },
  watch: {
    loading () {
      this.$nextTick(() => {
        const refs = this.$refs
        // 传递需要定位的元素
        this.scrollEle = [refs.scroll.$el, refs.show.$el, refs.params.$el, refs.recommend.$el]
      })
    }
  },
  mounted () {
    this.$overlay.$on('hideOverlay', this.closeInventory)
  },
  updated () {
    // 结构改变刷新高度
    this.refresh()
  }
}
</script>

<style lang="less" scoped>
.detail {
  text-align: justify;
}

.detail-nav-bar {
  background-color: #fcfcfc;
}
.content {
  height: calc(100vh - var(--tab-bar) - var(--nav-bar));
  height: calc(
    100vh - var(--vh-offset, 0px) - var(--tab-bar) - var(--nav-bar)
  ); // 使用vh-check对vh进行正确计算
  background-color: #f8f8f8;
}

.sku-info-unfold {
  transform: translateY(0);
}

.van-slide-right-enter-active {
  transition: opacity 0.5s;
}

.van-slide-right-enter {
  opacity: 0;
}

.van-slide-right-leave-active {
  animation: none;
}
</style>