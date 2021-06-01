<template>
  <div>
    <nav-bar class="nav-bar">
      <template v-slot:center>
        <span>购物车({{cartLength}})</span>
      </template>
    </nav-bar>

    <cart-content @modifyParameter="modifyParameter" />

    <cart-bottom-bar />

    <sku-info :class="skuInfoClass" :skuInfo="skuInfo "
      @closeInventory="closeInventory" @addToCart="cartChange" />

  </div>
</template>
<script>
import NavBar from 'components/common/navbar/NavBar.vue'
import CartContent from './childComps/CartContent.vue'
import CartBottomBar from './childComps/CartBottomBar.vue'

import SkuInfo from 'components/content/skuInfo/SkuInfo'

import { mapState, mapGetters, mapActions } from 'vuex'
import { getDetail, SkuInfo as SkuInfoClass } from 'network/pageRequest/detail'

export default {
  components: {
    NavBar,
    CartContent,
    CartBottomBar,
    SkuInfo
  },
  data () {
    return {
      skuInfo: {},
      modifyParameterGoods: {},
      isShowSkuInfo: false
    }
  },
  computed: {
    ...mapState([
      'cart'
    ]),
    ...mapGetters([
      'cartLength'
    ]),
    skuInfoClass () {
      return {
        'sku-info-unfold': this.isShowSkuInfo
      }
    }
  },
  methods: {
    ...mapActions([
      'asyncGoodsInfoChange'
    ]),
    // * 事件处理方法

    // 请求库存信息
    modifyParameter (item) {
      this.modifyParameterGoods = item
      getDetail(item.iid)
        .then(res => {
          const data = res.result
          this.skuInfo = new SkuInfoClass(data.skuInfo, item.iid)
          this.isShowSkuInfo = true
          this.$bus.$emit('pageDormant')
        })
    },

    // 关闭库存信息
    closeInventory () {
      this.isShowSkuInfo = false
      this.$bus.$emit('cancelPageDormant') // 关闭页面休眠
    },

    // 确认修改购物车数据
    cartChange (currentSku) {
      this.asyncGoodsInfoChange({
        oldGoods: this.modifyParameterGoods,
        newGoods: currentSku
      })
        .then((message) => {
          this.$toast.show(message)
        })
    }
  }
}
</script>
<style lang="less" scoped>
.nav-bar {
  color: white;
  background-color: var(--color-tint);
  font-size: 18px;
}

.sku-info-unfold {
  transform: translateY(0);
}
</style>