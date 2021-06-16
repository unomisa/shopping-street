<template>
  <div id="app">
    <keep-alive exclude="detail,login">
      <router-view class="page" />
    </keep-alive>
    <main-tab-bar v-show="isShowMainTabBar" />

  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import normalize from 'normalize.css'
import MainTabBar from 'components/content/mainTabbar/MainTabBar.vue'

export default {
  components: {
    MainTabBar
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

#app {
  overflow: hidden;
}

.page {
  padding-bottom: 49px; // 作用不明
}
</style>
