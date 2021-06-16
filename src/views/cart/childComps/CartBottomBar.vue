<template>
  <div class="bottom-bar">
    <div class="box-left"><span :class="selectAllClass"
            @click="checkAll($event)"></span><span class="text">全选</span>
    </div>

    <div class="settle-accounts-box"
         v-show="!isEdit">
      <div><span class="small">合计：<span class="price-color">¥ </span></span>
        <span class="price">{{parseInt(total)}}<span
                v-show="decimalPart">.</span>
          <span class="small">{{decimalPart}}</span></span>
      </div>
      <div class="box-right">
        <van-button type="danger"
                    class="settle-accounts-btn"
                    round
                    @click="settleAccounts">结算({{selectedGoodsLength}})
        </van-button>
      </div>
    </div>

    <div v-show="isEdit">
      <van-button plain
                  hairline
                  round
                  size="small"
                  type="danger"
                  icon="delete-o"
                  @click="removeGoods">删除({{selectedGoodsLength}})</van-button>
    </div>

  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

import { isFloat } from 'common/utils'

export default {
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    ...mapMutations([
      'deleteGoods'
    ]),

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
    },

    // 删除选中商品
    removeGoods () {
      this.deleteGoods()

      // 在文档发生变化后发出更新高度请求
      this.$nextTick(() => {
        this.$bus.$emit('CartScrollRefresh')
      })
    },

    // 进入结算页面
    settleAccounts () {
      this.$router.push('/indent')
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
  &-box {
    display: flex;
    align-items: center;
  }

  &-btn {
    width: 80px;
    height: 38px;
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