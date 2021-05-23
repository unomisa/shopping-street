<template>
  <div id="app">
    <keep-alive exclude="detail">
      <router-view class="page"></router-view>
    </keep-alive>
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import normalize from 'normalize.css'
import MainTabBar from 'components/content/mainTabbar/MainTabBar.vue'

export default {
  components: {
    MainTabBar
  }
}
</script>
<style lang="less" scoped>
@import "assets/css/base.css";

.page {
  padding-bottom: 49px;
}
</style>
