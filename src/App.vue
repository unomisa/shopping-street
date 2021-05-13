<template>
  <div id="app">
    <router-view></router-view>
    <tab-bar></tab-bar>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import normalize from 'normalize.css'
import TabBar from './components/content/tab-bar/TabBar.vue'

export default {
  components: {
    TabBar
  }
}
</script>
<style lang="less">
@import "assets/css/base.css";
</style>
