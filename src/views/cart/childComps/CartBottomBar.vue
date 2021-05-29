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
      <div class="settle-accounts-right">算</div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { isFloat } from '../../../common/utils'

export default {
  methods: {
    checkAll (event) {
      this.$bus.$emit('checkAll', event)
    },
    isCheckAll () {
      if (this.cart.length === 0) { return false }
      for (const cartItem of this.cart) {
        for (const item of cartItem) {
          if (!this.readyToSettle.includes(item)) {
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
        checked: this.isCheckAll()
      }
    },
    total () {
      return this.readyToSettle.reduce((sum, currentItem) => {
        sum += parseFloat(currentItem.price.slice(1)) * currentItem.buyCount
        return sum
      }, 0)
    },
    decimalPart () {
      if (isFloat(this.total)) {
        return this.total.toString().split('.')[1].slice(0, 2)
      } else {
        return ''
      }
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

  &-left {
    &:extend(.settle-accounts);
    padding-left: 1.5rem;
    border-top-left-radius: 45%;
    border-bottom-left-radius: 45%;
  }

  &-right {
    &:extend(.settle-accounts);
    padding-right: 1.5rem;
    border-top-right-radius: 45%;
    border-bottom-right-radius: 45%;
  }
}

.small {
  font-size: 14px;
}

.price {
  font-size: 20px;
  color: var(--color-tint);

  &-color {
    color: var(--color-tint);
  }
}
</style>