<template>
  <div>
    <detail-box class="detail-box">
      <div class="promotions">
        <span class="promotions-item"
          v-for="(item,index) in goodsBaseInfo.promotionsList" :key="index">
          {{item}}
        </span>
      </div>

      <div class=" title">{{goodsBaseInfo.title}}</div>

      <div class="price">
        <span class="newPrice">{{goodsBaseInfo.newPrice}}</span>
        <span class="oldPrice">{{goodsBaseInfo.oldPrice}}</span>
        <span class="discount-desc">{{goodsBaseInfo.discountDesc}}</span>
      </div>

      <div class="about-columns">
        <span class="about-columns-item"
          v-for="(item,index) in goodsBaseInfo.aboutColumns" :key="index">
          {{item}}
        </span>
      </div>
    </detail-box>
  </div>
</template>

<script>
import DetailBox from './DetailBox.vue'
export default {
  components: { DetailBox },
  props: {
    goodsBaseInfo: {
      type: Object,
      default () {
        return {}
      }
    }
  }
}
</script>

<style lang="less" scoped>
// 优惠信息
.promotions {
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
  font-size: 12px;
  padding: 3px;

  &-item {
    flex: 1 auto; // 根据元素内容填充
    margin: 3px;
    color: white;
    border-radius: 3px;
    text-align: center;
    background-color: rgba(216, 57, 147, 0.4);
  }
}

// 标题
.title {
  color: black;
  // font-family: 黑体;
}

// 价格
.price {
  padding: 8px 0;
}

.newPrice {
  margin-top: 8px;
  font-size: 24px;
  color: var(--color-high-text);
}

.oldPrice {
  padding: 0 5px;
  font-size: 14px;
  color: #a9a9a9;
  text-decoration: line-through;
}

.discount-desc {
  padding: 4px;
  font-size: 12px;
  vertical-align: top;
  color: white;
  border-radius: 10px;
  background-color: var(--color-high-text);
}

// 关于栏
.about-columns {
  display: flex;
  margin-top: 5px;
  flex-wrap: wrap;
  text-align: center;

  &-item {
    flex: 1 auto;
    font-size: 12px;
    color: #808080;

    &:first-child {
      text-align: left;
    }

    &:last-child {
      text-align: right;
    }
  }
}
</style>