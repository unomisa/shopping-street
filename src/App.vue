<template>
  <div id="app">
    <keep-alive exclude="detail">
      <router-view class="page" />
    </keep-alive>
    <main-tab-bar v-show="isShowMainTabBar" />

    <all-pages-show />
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import normalize from 'normalize.css'
import MainTabBar from 'components/content/mainTabbar/MainTabBar.vue'
import AllPagesShow from './components/content/allPagesShow/AllPagesShow.vue'

export default {
  components: {
    MainTabBar,
    AllPagesShow

  },
  computed: {

    isShowMainTabBar () {
      return !this.$route.path.includes('/detail')
    }
  }
}
</script>
<style lang="less" scoped>
@import "assets/css/base.css";

.page {
  padding-bottom: 49px;
}
</style>
