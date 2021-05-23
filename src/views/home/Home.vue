<template>
  <div class="home">
    <nav-bar class="home-nav"><template v-slot:center>购物街</template></nav-bar>
    <tab-control class="home-tab-control" :category="['流行','新款','精选']"
      @currentCategoryChange="setCurrentCategoryIndex"
      v-show="isTabControlCloneShow" ref="tabControl1" />

    <scroll class="content" ref="scroll" :probeType="3" :pullUpLoad="true"
      @scroll="scroll" @pullingUp='loadMore'>

      <home-swiper :banners="banners" @homeSwiperImageLoad="SwiperImageLoad" />

      <home-recommend-view :recommends="recommends" />

      <home-feature-view />

      <tab-control :category="['流行','新款','精选']"
        @currentCategoryChange="setCurrentCategoryIndex" ref="tabControl2" />

      <home-product-display-view :goods="goods[currentCategoryIndex]"
        ref="productDisplay" />

    </scroll>

    <back-top @click.native="backTop()" :isShow="showBackTopBth" />
  </div>
</template>
<script>
import HomeSwiper from 'views/home/childComps/HomeSwiper.vue'
import HomeRecommendView from './childComps/HomeRecommendView.vue'
import HomeFeatureView from './childComps/HomeFeatureView.vue'

import TabControl from 'components/content/tabcontrol/TabControl.vue'
import HomeProductDisplayView from './childComps/HomeProductDisplayView.vue'

import NavBar from 'components/common/navbar/NavBar.vue'
import Scroll from '../../components/common/scroll/Scroll.vue'
import BackTop from '../../components/common/backtop/BackTop.vue'

import { getHomeMultidata, getHomeGoods } from 'network/pageRequest/home'

import { debounce } from '../../common/utils'

export default {
  data () {
    return {
      banners: [],
      isSwiperImageLoad: false,
      recommends: [],
      goods: [
        // * 注意数据的顺序需要和目录的顺序相同
        { type: 'pop', page: 0, list: [] },
        { type: 'new', page: 0, list: [] },
        { type: 'sell', page: 0, list: [] }
      ],
      currentCategoryIndex: 0,
      isTabControlCloneShow: false,
      showBackTopBth: false,
      scrollY: 0,
      scrollYClone: 0,
      isActivePage: true
    }
  },
  components: {
    HomeSwiper,
    HomeRecommendView,
    HomeFeatureView,
    TabControl,
    NavBar,
    HomeProductDisplayView,
    Scroll,
    BackTop
  },
  methods: {
    /**
     * * 事件监听相关方法
     */

    // 轮播图图片完成监听
    SwiperImageLoad () {
      if (!this.isSwiperImageLoad) {
        this.$refs.scroll.refresh()
        this.isSwiperImageLoad = true
      }
    },

    setCurrentCategoryIndex (currentIndex) {
      this.currentCategoryIndex = currentIndex
      this.$refs.tabControl1.currentIndex = currentIndex
      this.$refs.tabControl2.currentIndex = currentIndex
    },

    // 根据位置设置tabControl是否吸附于顶部
    setIsTabControlCloneShow () {
      const tabControl2 = this.$refs.tabControl2.$el
      this.isTabControlCloneShow = tabControl2.getBoundingClientRect().top < 44
    },

    // 回到顶部
    backTop () {
      this.$refs.scroll.scrollTo(0, 0)
    },

    // 滚动监听
    scroll (position) {
      this.setIsTabControlCloneShow()
      this.showBackTopBth = this.isTabControlCloneShow
      // 实时记录位置
      this.scrollY = this.$refs.scroll.getScrollY()
    },

    itemImageLoadEvent () {
      // 当前页面不是home页面时，不触发页面的刷新
      if (this.isActivePage) {
        this.$refs.scroll.refresh()
        this.$refs.productDisplay.recalculate()
      }
    },

    /**
     * * 网络请求相关方法
     */
    getHomeMultidata () {
      getHomeMultidata()
        .then(res => {
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        })
    },
    getHomeGoods (item) {
      getHomeGoods(item, ++item.page)
        .then(res => {
          res.data.list.forEach(item => {
            item.src = item.show.img
          })
          item.list.push(...res.data.list)
          this.$refs.scroll.finishPullUp()
        })
    },

    // 请求更多数据
    loadMore () {
      this.getHomeGoods(this.goods[this.currentCategoryIndex])
    }
  },
  created () {
    this.getHomeMultidata()
    this.goods.forEach((item) => {
      this.getHomeGoods(item)
    })
  },
  mounted () {
    // 图片加载完整通过事件总线使macy刷新布局
    this.$bus.$on('itemImageLoad', debounce(this.itemImageLoadEvent, 100))
  },
  activated () {
    this.$refs.scroll.refresh()
    this.isActivePage = true
  },
  deactivated () {
    this.isActivePage = false
  }
}
</script>
<style lang="less" scoped>
// * 使用better-scroll滚动区域需要设置固定的高度
.content {
  height: calc(100vh - 49px - 44px);
  height: calc(
    100vh - var(--vh-offset, 0px) - 49px - 44px
  ); // 使用vh-check对vh进行正确计算
}

.home-nav {
  background-color: var(--color-tint);
  color: white;
}

.home-tab-control {
  position: absolute;
  z-index: 999;
}
</style>