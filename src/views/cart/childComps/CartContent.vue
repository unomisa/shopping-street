<template>
  <scroll class="content" ref="scroll" :probeType="2" @scroll="scroll">
    <fillet-box id='fillet-box' class="box" v-for="(cartItem,index) in cart"
      :key="index">
      <div class="box-shop">
        <div :class="selectClass(cartItem)"
          @click="checkShopAll(cartItem,$event)" ref="select"></div>

        {{cartItem[0].shopName}}
        <div class="shop-more"></div>
      </div>

      <div class="box-content" v-for="(item,index) in cartItem" :key="index">
        <div :class="selectGoodsClass(item)" @click="check(item)" ref="select">
        </div>

        <div class="box-img">
          <img class="img" :src="item.img">
        </div>
        <div class="box-info">
          <div class="goods-title">{{item.title}}</div>

          <div class="goods-parameter">
            <span class="cut-out">{{item.size}} , {{item.style}}</span>
          </div>

          <div class="goods-price">
            <span class="small">{{priceStart(item)}}</span>
            {{priceContent(item)}}<span class="small">{{priceEnd(item)}}</span>
          </div>

          <div class="buy-count-box" @click="showCalcBtn(item)">
            ×{{item.buyCount}}
          </div>

          <add-sub-btn class="buy-count-calc" :count="item.buyCount"
            v-if='isShowCalcBtn(item)' @addCount="addCount(item)"
            @subCount="subCount(item)" />
        </div>
      </div>

    </fillet-box>
  </scroll>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll.vue'
import FilletBox from 'components/common/filletBox/FilletBox.vue'
import AddSubBtn from 'components/common/miniComps/addSubBtn.vue'

import { mapState, mapGetters, mapMutations } from 'vuex'
import { isFloat } from 'common/utils'

export default {
  components: {
    Scroll,
    FilletBox,
    AddSubBtn
  },
  data () {
    return {
      openCalcBtn: []
    }
  },
  methods: {
    // * 事件处理方法

    // 点击，若商品不存在该待结算数组，贼添加，否则删除
    check (item) {
      if (!this.readyToSettle.includes(item)) {
        this.addReadyToSettle(item)
      } else {
        this.removeReadyToSettle(item)
      }
    },

    // 将该店所有商品添加至待结算数组
    checkShopAll (cartItem, event) {
      const target = event.currentTarget
      if (!target.classList.contains('checked')) {
        cartItem.forEach((item) => {
          if (!this.readyToSettle.includes(item)) { this.addReadyToSettle(item) }
        })
      } else {
        cartItem.forEach(item => {
          this.removeReadyToSettle(item)
        })
      }
    },

    // 判断该店商品是否都在待结算数组
    allGoodsINReadyToSettle (goodsList) {
      for (const goods of goodsList) {
        if (!this.readyToSettle.includes(goods)) {
          return false
        }
      }
      return true
    },

    // 全选商品
    checkAll (event) {
      const target = event.currentTarget
      if (!target.classList.contains('checked')) {
        this.cart.forEach(cartItem => {
          cartItem.forEach(item => {
            if (!this.readyToSettle.includes(item)) {
              this.addReadyToSettle(item)
            }
          })
        })
      } else {
        this.clearReadyToSettle()
      }
    },

    // 数量增加
    addCount (item) {
      this.addBuyCount(item)
    },

    // 数量减少
    subCount (item) {
      this.subBuyCount(item)
    },

    // 滚动事件
    scroll () {
      if (this.openCalcBtn.length !== 0) {
        this.openCalcBtn.forEach(item => {
          this.$set(item, 'isShowCalcBtn', false)
        })
        this.openCalcBtn = []
      }
    },

    ...mapMutations([
      'addReadyToSettle',
      'removeReadyToSettle',
      'clearReadyToSettle',
      'addBuyCount',
      'subBuyCount'
    ]),

    // * 其它方法
    showCalcBtn (item) {
      this.$set(item, 'isShowCalcBtn', 'true')
      this.openCalcBtn.push(item)
    }
  },
  computed: {
    ...mapState([
      'cart',
      'readyToSettle'
    ]),
    ...mapGetters([
      'cartLength'
    ]),
    priceStart () {
      return function (item) {
        return item.price.slice(0, 1)
      }
    },
    priceContent () {
      return function (item) {
        const priceStr = item.price.slice(1)
        const price = parseFloat(priceStr) * item.buyCount
        if (isFloat(price)) {
          return parseInt(price) + '.'
        } else {
          return price
        }
      }
    },
    priceEnd () {
      return function (item) {
        const priceStr = item.price.slice(1)
        const price = parseFloat(priceStr) * item.buyCount
        if (isFloat(price)) {
          return price.toFixed(2).toString().slice(-2)
        }
      }
    },
    selectClass () {
      return function (goodsList) {
        return {
          select: true,
          checked: this.allGoodsINReadyToSettle(goodsList)
        }
      }
    },
    selectGoodsClass () {
      return function (item) {
        return {
          'select-goods': true,
          checked: this.readyToSettle.includes(item)
        }
      }
    },
    isShowCalcBtn () {
      return function (item) {
        return item.isShowCalcBtn
      }
    }
  },
  activated () {
    this.$refs.scroll.refresh()
    this.$bus.$on('checkAll', this.checkAll)
  },
  deactivated () {
    this.$bus.$off('checkAll')
  }

}
</script>

<style lang="less" scoped>
.content {
  height: calc(100vh - var(--tab-bar) - var(--nav-bar) - 50px);
  height: calc(
    100vh - var(--vh-offset, 0px) - var(--tab-bar) - var(--nav-bar) - 50px
  ); // 使用vh-check对vh进行正确计算
  background-color: #f8f8f8;
}

.img {
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-radius: 3px;
}

.cut-out {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}

@diameter: 1rem;
.select {
  position: absolute;
  left: (@boxpl - @diameter)/2;
  height: @diameter;
  width: @diameter;
  border: 2px solid lightgray;
  border-radius: 100%;

  &-goods {
    &:extend(.select);
    top: 50%;
    left: -(@diameter + (@boxpl - @diameter)/2);
  }
}

.checked {
  border: none;
  background: url("~assets/img/cart/Checked.svg") no-repeat
    var(--color-high-text);
  background-size: 1rem;
  background-position: 0;
}

@boxpl: 1.8rem;
.box {
  position: relative;
  display: flex;
  flex-direction: column;
  padding-left: @boxpl;

  &-shop {
    flex: 0 auto;
    color: #4a4a4a;
    font-family: 微软雅黑;
    letter-spacing: 1px;
    background-color: pink;
    margin-bottom: 0.5rem;
    padding-left: 1.5rem;
    background: url("~assets/img/cart/shop.svg") no-repeat;
    background-size: 18px;
    background-position: 0;
  }

  &-content {
    position: relative;
    display: flex;
    width: 100%;
    height: 110px;
    margin-bottom: 1rem;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &-img {
    flex: 1;
    content: "";
    margin-right: 1rem;
    height: 100%;
    contain: size;
  }

  &-info {
    position: relative;
    flex: 2.4;
  }
}

.shop-more {
  float: right;
  height: 1rem;
  width: 1rem;
  background: url("~assets/img/common/more.svg") no-repeat;
  background-size: 16px;
  background-position: right;
}

.goods {
  &-title {
    font-size: 14px;
    display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
    -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
    -webkit-line-clamp: 1; /** 显示的行数 **/
    overflow: hidden;
    margin-bottom: 1rem;
  }

  &-price {
    position: absolute;
    bottom: 0;
    color: var(--color-tint);
    font-size: 20px;
  }

  &-parameter {
    display: inline-block;
    padding: 5px 22px 5px 8px;
    font-size: 13px;
    border-radius: 3px;
    background: url("~assets/img/cart/change.svg") no-repeat #f5f5f5;
    background-size: 16px;
    background-position: calc(100% - 3px);
  }
}

.small {
  font-size: 12px;
}

.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.buy-count-box {
  &:extend(.flex-center);
  position: absolute;
  bottom: 1px;
  right: 0;
  height: 1.3rem;
  width: 1.3rem;
  border-radius: 3px;
  border: 1px solid lightgray;
  font-size: 14px;
}

.buy-count-calc {
  position: absolute;
  bottom: 0;
  right: 0;
  height: 1.4rem;
}
</style>