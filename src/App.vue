<template>
  <div id="app">
    <keep-alive exclude="detail">
      <router-view class="page" />
    </keep-alive>
    <main-tab-bar v-show="isShowMainTabBar" />

    <prompt-message :message='"添加购物车成功 ~"' v-if="isShowAddToCartMessage" />
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import normalize from 'normalize.css'
import MainTabBar from 'components/content/mainTabbar/MainTabBar.vue'
import PromptMessage from 'components/common/miniComps/PromptMessage.vue'

export default {
  data () {
    return {
      isShowAddToCartMessage: false
    }
  },
  components: {
    MainTabBar,
    PromptMessage
  },
  computed: {
    isShowMainTabBar () {
      return !this.$route.path.includes('/detail')
    }
  },
  methods: {
    addToCartPromptMessage () {
      this.isShowAddToCartMessage = true
      setTimeout(() => {
        this.isShowAddToCartMessage = false
      }, 3000)
    }
  },
  created () {
    this.$bus.$on('addToCartPromptMessage', this.addToCartPromptMessage)
  }
}
</script>
<style lang="less" scoped>
@import "assets/css/base.css";

.page {
  padding-bottom: 49px;
}
</style>
