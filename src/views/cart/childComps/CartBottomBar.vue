<template>
  <div class="bottom-bar">
    <div class="box-left"><span :class="selectAllClass"
        @click="checkAll($event)"></span><span class="text">全选</span></div>
    <div><span class="small">合计：<span class="price-color">¥ </span></span>
      <span class="price">{{parseInt(total)}}<span v-show="decimalPart">.</span>
        <span class="small">{{decimalPart}}</span></span>
    </div>
    <div class="box-right">
      <div class="settle-accounts-left">结</div>
      <div class="settle-accounts-right">算({{selectedGoodsLength}})</div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { isFloat } from 'common/utils'

export default {
  methods: {
    checkAll (event) {
      this.$bus.$emit('checkAll', event)
    },
    isCheckedAll () {
      if (this.cart.length === 0) { return false }
      for (const cartItem of this.cart) {
        for (const item of cartItem) {
          if (!item.isChecked) {
            return false
          }
        }
      }
      return true
    }
  },
  computed: {
    ...mapState([
      'cart',
      'readyToSettle'
    ]),
    selectAllClass () {
      return {
        'select-all': true,
        checked: this.isCheckedAll()
      }
    },

    // 总价
    total () {
      // return this.cart.reduce((sum, cartItem) => {
      //   return cartItem.reduce((sum, currentItem) => {
      //     if (currentItem.isChecked) {
      //       sum += parseFloat(currentItem.price.slice(1)) * currentItem.buyCount
      //     }
      //     return sum
      //   }, sum)
      // }, 0)
      let total = 0
      for (const cartItem of this.cart) {
        total += cartItem.filter(item => item.isChecked)
          .reduce((sum, currentItem) => {
            sum += parseFloat(currentItem.price.slice(1)) * currentItem.buyCount
            return sum
          }, 0)
      }
      return total
    },

    // 小数部分
    decimalPart () {
      if (isFloat(this.total)) {
        return this.total.toString().split('.')[1].slice(0, 2)
      } else {
        return ''
      }
    },

    // 已选中的商品个数
    selectedGoodsLength () {
      let length = 0
      for (const cartItem of this.cart) {
        length += cartItem.filter(item => item.isChecked).length
      }
      return length
    }
  }

}
</script>

<style lang="less" scoped>
.bottom-bar {
  position: fixed;
  z-index: 1000;
  bottom: var(--tab-bar);
  right: 0;
  left: 0;
  display: flex;
  align-items: center;
  height: 50px;
  width: 100%;
  padding: 0.5rem;
  background-color: #fcfcfc;
  border-bottom: 1px solid gainsboro;
  border-top: 1px solid gainsboro;
}

.select-all {
  content: "";
  display: inline-block;
  margin-right: 3px;
  vertical-align: middle;
  height: 1rem;
  width: 1rem;
  border: 2px solid lightgray;
  border-radius: 100%;
}

.text {
  display: inline-block;
  vertical-align: middle;
}

.checked {
  border: none;
  background: url("~assets/img/cart/Checked.svg") no-repeat
    var(--color-high-text);
  background-size: 1rem;
  background-position: 0;
}

.box {
  &-right {
    display: flex;
    margin-left: 1rem;
  }

  &-left {
    flex: 1;
  }
}

.settle-accounts {
  color: white;
  background-color: var(--color-tint);
  display: flex;
  align-items: center;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;

  @borderRadius: 16px;
  @sidePadding: 1rem;
  &-left {
    &:extend(.settle-accounts);
    padding-left: @sidePadding;
    border-top-left-radius: @borderRadius;
    border-bottom-left-radius: @borderRadius;
  }

  &-right {
    &:extend(.settle-accounts);
    padding-right: @sidePadding;
    border-top-right-radius: @borderRadius;
    border-bottom-right-radius: @borderRadius;
  }
}

.small {
  font-size: 13px;
}

.price {
  font-size: 20px;
  color: var(--color-tint);

  &-color {
    color: var(--color-tint);
  }
}
</style>