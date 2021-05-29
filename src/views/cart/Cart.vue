<template>
  <div>
    <nav-bar class="nav-bar">
      <template v-slot:center>
        <span>购物车({{cartLength}})</span>
      </template>
    </nav-bar>

    <cart-content />

    <cart-bottom-bar />

  </div>
</template>
<script>
import NavBar from 'components/common/navbar/NavBar.vue'
import CartContent from './childComps/CartContent.vue'
import CartBottomBar from './childComps/CartBottomBar.vue'

import { mapState, mapGetters } from 'vuex'

export default {
  components: {
    NavBar,
    CartContent,
    CartBottomBar

  },
  computed: {
    ...mapState([
      'cart'
    ]),
    ...mapGetters([
      'cartLength'
    ])
  }
}
</script>
<style lang="less" scoped>
.nav-bar {
  color: white;
  background-color: var(--color-tint);
}
</style>