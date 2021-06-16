<template>
  <div class="sku-info">

    <div class="head">
      <div class="close-btn"
           @click="closeInventory"></div>
      <div class="img-box">
        <img :src="currentSku.img"
             class="head-img"
             :key="skuInfo.iid"
             @click="imagePreview(currentSku.img)">
      </div>

      <span class="head-price">{{currentSku.nowPrice}}</span>
    </div>

    <scroll class="content"
            ref="scroll">
      <div class="size">
        <div>尺码 / 大小 ({{sizeLength}}) </div>
        <div class="size-box">
          <div :class="sizeBtnClass(index)"
               v-for="(item,index) in skuInfo.sizeList"
               :key="index"
               @click="setSizeIndex(index)">
            {{item.name}}</div>
        </div>
      </div>

      <div class="separator" />

      <div class="color">
        <div>颜色 / 类型 ({{colorListLength}})</div>
        <div class="color-box">
          <div :class="colorBtnClass(index)"
               v-for="(item,index) in skuInfo.colorList"
               :key="index"
               @click="setColorIndex(index)">
            <div>{{item.name}}</div>
          </div>
        </div>
      </div>

      <div class="separator" />

      <div class="count"
           v-if="!$route.path.includes('cart')">
        <span>购买数量</span>
        <span class="inventory">库存{{currentSku.stock}}件</span>
        <add-sub-btn class="buy-count-calc"
                     :count='buyCount'
                     @addCount="addCount"
                     @subCount="subCount" />
      </div>

      <div class="separator"
           v-if="!$route.path.includes('cart')" />

    </scroll>

    <div class="bottom-bar">
      <van-button type="danger"
                  class="confirm"
                  round
                  @click="addToCart">确认</van-button>
    </div>

  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll.vue'
import AddSubBtn from 'components/common/miniComps/addSubBtn.vue'
import { imageLoad } from 'common/mixin'
import { ImagePreview } from 'vant'

export default {
  mixins: [imageLoad],
  props: {
    skuInfo: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      currentSizeIndex: -999,
      currentColorIndex: -999,
      buyCount: 1
    }
  },
  components: {
    Scroll,
    AddSubBtn
  },
  methods: {
    // * 事件相关方法

    // 发送关闭按钮事件
    closeInventory () {
      this.$emit('closeInventory')
    },

    // 设置选择尺码
    setSizeIndex (index) {
      if (index === this.currentSizeIndex) {
        this.currentSizeIndex = -999
      } else {
        this.currentSizeIndex = index
      }
    },

    // 设置选择颜色
    setColorIndex (index) {
      if (index === this.currentColorIndex) {
        this.currentColorIndex = -999
      } else {
        this.currentColorIndex = index
      }
    },

    // 确认选择信息，加入购物车
    addToCart () {
      // 选中商品时传递添加至购物车事件
      if (this.skusIndex > -1) {
        this.$emit('addToCart', this.currentSku)
      }
    },

    // 数量增加
    addCount () {
      this.buyCount++
    },

    // 购买数量减少
    subCount () {
      this.buyCount--
    },

    // 图片预览
    imagePreview (url) {
      ImagePreview([url])
    }
  },
  computed: {
    colorListLength () {
      return 'colorList' in this.skuInfo ? this.skuInfo.colorList.length : 0
    },
    sizeLength () {
      return 'sizeList' in this.skuInfo ? this.skuInfo.sizeList.length : 0
    },
    sizeBtnClass () {
      return function (index) {
        return {
          'size-btn': true,
          'btn-focus': this.currentSizeIndex === index
        }
      }
    },
    colorBtnClass () {
      return function (index) {
        return {
          'color-btn': true,
          'btn-focus': this.currentColorIndex === index
        }
      }
    },

    // 计算当前选中商品的库存的下标位置
    skusIndex () {
      if ('sizeList' in this.skuInfo) {
        const sizeListLen = this.skuInfo.sizeList.length
        return this.currentColorIndex * sizeListLen + this.currentSizeIndex
      } else {
        return -1
      }
    },

    // 当前选中商品信息
    currentSku () {
      // 有正常值的情况
      if (this.skusIndex >= 0) {
        const target = this.skuInfo.skus[this.skusIndex]
        return {
          img: target.img,
          nowPrice: `¥${(target.nowprice / 100).toFixed(2)}`,
          stock: target.stock,
          style: target.style,
          size: target.size,
          buyCount: this.buyCount
        }
      } else {
        return {
          img: this.skuInfo.defaultImg,
          nowPrice: this.skuInfo.defaultPrice,
          stock: this.skuInfo.totalStock
        }
      }
    }
  },
  watch: {
    // 在有数据之后结构刷新时，刷新滚动高度
    skuInfo: function () {
      this.$nextTick(() => {
        this.$refs.scroll.refresh()
      })
    }
  },
  destroyed () {
    this.closeInventory()
  }
}
</script>

<style lang="less" scoped>
// * 通用区域

// 分隔线样式
.separator {
  content: "";
  margin: 10px 0;
  height: 0.5px;
  width: 100%;
  background-color: #d3d3d3;
}

// 组件样式
.sku-info {
  content: "";
  position: fixed;
  z-index: 1001;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 80vh;
  background: white;
  transform: translateY(100%);
  transition: transform 0.3s;
}

// 关闭按钮样式
.close-btn {
  @size: 20px;
  content: "";
  position: absolute;
  right: @headPadding + 1px;
  top: @headPadding + 1px;
  width: @size;
  height: @size;
  background: url("~assets/img/detail/close.svg") no-repeat;
  background-size: @size;
  background-position: 0;
}

.placeholder-box {
  position: relative;
}

// 组件顶部区域样式
@headHeight: 120px;
@headPadding: 8px;
.head {
  position: relative;
  z-index: 998;
  padding: @headPadding;
  width: 100%;
  height: @headHeight;
  background: white;
  box-shadow: 0 1px 2px 0 rgba(100, 100, 100, 0.5);

  &-img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    vertical-align: top;
    border-radius: 3px;
  }

  &-price {
    margin-left: 1rem;
    font-size: 1.5rem;
    color: var(--color-tint);
  }
}

.img-box {
  float: left;
  height: 100%;
  width: 75px;
}

// 可滚动内容区域样式
.content {
  padding: 8px;
  height: calc(100% - @headHeight - var(--tab-bar));
  width: 100%;
}

// 按钮样式
.btn {
  &-focus {
    border: 1px solid var(--color-tint) !important;
    background-color: white !important;
  }
}

// 尺码区样式
.size {
  @btnMargin: 5px;
  &-box {
    display: flex;
    flex-wrap: wrap;
    font-size: 14px;
    margin: 0 -@btnMargin;
  }

  &-btn {
    flex: 0 auto;
    text-align: center;
    margin: @btnMargin;
    padding: 3px 8px;
    background-color: #f5f5f5;
    border-radius: 3px;
    border: 1px solid transparent;

    &:nth-child(5n) {
      margin-right: 0;
    }
  }
}

// 颜色区样式
.color {
  @btnMargin: 5px;
  &-box {
    display: flex;
    flex-wrap: wrap;
    text-align: center;
    font-size: 14px;
    margin: 0 -@btnMargin; // 父元素两边往外移子元素的margin值
  }

  &-btn {
    flex: 0 auto;
    padding: 3px 8px;
    margin: 10px @btnMargin 0;
    border-radius: 3px;
    border: solid 1px transparent;
    background-color: #f5f5f5;
  }
}

// 底部栏样式
.bottom-bar {
  position: absolute;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: var(--tab-bar);
  width: 100vw;
  box-shadow: 0 -1px 1px 0 rgba(100, 100, 100, 0.2);
  background-color: white;
}

// 确认按钮样式
.confirm {
  width: 90%;
  height: 80%;
  font-size: 1.5rem;
  background-color: var(--color-high-text);
}

// 库存
.inventory {
  margin-left: 0.5rem;
  font-size: 12px;
}

// 数量计算
.count {
  position: relative;
}

.buy-count-calc {
  position: absolute;
  right: 0;
  transform: translateY(-50%);
  top: 50%;
  height: 1.5rem;
}
</style>