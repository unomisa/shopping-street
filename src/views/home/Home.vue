<template>
  <div class="home">
    <nav-bar class="home-nav"><template v-slot:center>购物街</template></nav-bar>

    <tab-control class="home-tab-control" :category="['流行','新款','精选']"
      :currentIndex.sync="currentCategoryIndex"
      v-show="isTabControlCloneShow" />

    <scroll class="content" ref="scroll" :probeType="3" :pullUpLoad="true"
      @scroll="scroll" @pullingUp='loadMore'>

      <home-swiper :banners="banners" />

      <home-recommend-view :recommends="recommends" />

      <home-feature-view />

      <tab-control :category="['流行','新款','精选']"
        :currentIndex.sync="currentCategoryIndex" ref="tabControl" />

      <keep-alive>
        <home-product-display-view :goods="goods[currentCategoryIndex].list"
          @refresh='refresh' @saveScrollHeight="saveScrollHeight"
          @scrollTo="scrollTo" :key="currentCategoryIndex" ref="productDisplay"
          v-if='goods[currentCategoryIndex].list.length!==0' />
      </keep-alive>
    </scroll>

    <back-top @click.native="backTop" :isShow="showBackTopBth" />
  </div>
</template>
<script>
import HomeSwiper from 'views/home/childComps/HomeSwiper.vue'
import HomeRecommendView from './childComps/HomeRecommendView.vue'
import HomeFeatureView from './childComps/HomeFeatureView.vue'

import TabControl from 'components/content/tabcontrol/TabControl.vue'
import HomeProductDisplayView from './childComps/HomeProductDisplayView.vue'

import NavBar from 'components/common/navbar/NavBar.vue'
import Scroll from 'components/common/scroll/Scroll.vue'
import BackTop from 'components/common/backtop/BackTop.vue'

import { getHomeMultidata, getHomeGoods } from 'network/pageRequest/home'
import { heightDispose } from 'common/mixin'

export default {
  mixins: [heightDispose],
  data () {
    return {
      banners: [],
      recommends: [],
      goods: [
        // * 注意数据的顺序需要和目录的顺序相同
        { type: 'pop', page: 0, list: [] },
        { type: 'new', page: 0, list: [] },
        { type: 'sell', page: 0, list: [] }
      ],
      currentCategoryIndex: 0,
      showBackTopBth: false
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

    // 回到顶部
    backTop () {
      this.$refs.scroll.scrollTo(0, 0)
    },

    // 滚动监听
    scroll () {
      this.setIsTabControlCloneShow()
      this.showBackTopBth = this.isTabControlCloneShow
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
  }

}
</script>
<style lang="less" scoped>
// * 使用better-scroll滚动区域需要设置固定的高度
.content {
  height: calc(100vh - 49px - var(--nav-bar));
  height: calc(
    100vh - var(--vh-offset, 0px) - 49px - var(--nav-bar)
  ); // 使用vh-check对vh进行正确计算
  background-color: white;
}

.home-nav {
  background-color: var(--color-tint);
  color: white;
  font-size: 18px;
}

.home-tab-control {
  position: absolute;
  z-index: 999;
  border-radius: 2px;
  box-shadow: 0 2px 5px rgba(100, 100, 100, 0.5);
}
</style>