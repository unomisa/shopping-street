<template>
  <div>
    <cart-nav-bar :isEdit.sync="isEdit" />

    <cart-content @modifyParameter="modifyParameter" />

    <cart-bottom-bar :isEdit="isEdit" />

    <sku-info :class="skuInfoClass"
              :skuInfo="skuInfo "
              @closeInventory="closeInventory"
              @addToCart="cartChange" />

  </div>
</template>
<script>

import SkuInfo from 'components/content/skuInfo/SkuInfo'

import { mapState, mapGetters, mapActions } from 'vuex'
import { getDetail, SkuInfo as SkuInfoClass } from 'network/pageRequest/detail'

import CartContent from './childComps/CartContent.vue'
import CartBottomBar from './childComps/CartBottomBar.vue'
import CartNavBar from './childComps/CartNavBar.vue'

export default {
  components: {
    CartContent,
    CartBottomBar,
    SkuInfo,
    CartNavBar
  },
  data () {
    return {
      skuInfo: {},
      modifyParameterGoods: {},
      isShowSkuInfo: false,
      isEdit: false
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
          this.$overlay.showOverlay()
        })
    },

    // 关闭库存信息
    closeInventory () {
      this.isShowSkuInfo = false
      this.$overlay.hideOverlay()
    },

    //

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
  },
  mounted () {
    this.$overlay.$on('hideOverlay', this.closeInventory)
  },
  activated () {
    this.isEdit = false
  }
}
</script>
<style lang="less" scoped>
.sku-info-unfold {
  transform: translateY(0);
}
</style>