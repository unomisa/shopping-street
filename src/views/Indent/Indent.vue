<template>
  <div class="adress">
    <van-nav-bar title="确认订单"
                 left-text="返回"
                 left-arrow
                 @click-left="back" />
    <scroll class="content">
      <indent-adress />
    </scroll>

  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll.vue'

import IndentAdress from './childComps/IndentAdress.vue'

export default {
  components: { IndentAdress, Scroll },
  methods: {
    back () {
      this.$router.back()
    }
  }
}
</script>

<style lang="less" scoped>
.content {
  height: calc(100vh - var(--tab-bar) - var(--nav-bar));
  height: calc(
    100vh - var(--vh-offset, 0px) - var(--tab-bar) - var(--nav-bar)
  ); // 使用vh-check对vh进行正确计算
}

.adress {
  background-color: var(--page-background-color);
}
</style>