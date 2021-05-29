<template>
  <detail-box class="shop-info">
    <div class="shop-base">
      <img class="shop-logo" :src="shopInfo.logo" alt="logo" @load="imageLoad">
      <div>
        <span class="shop-name">{{shopInfo.name}}</span>
        <div class="shop-fans">{{shopInfo.fans}}</div>
      </div>
      <span class="collect">
        <img class="collect-icon" src="~assets/img/detail/collect.svg">
        收藏
      </span>
    </div>
    <div class="shop-detail">
      <div class="shop-about">
        <div class="about-item">
          <div class="about-number">{{sellsBigUnit}}万</div>
          <div class="about-text">总销量</div>
        </div>
        <div class="about-item">
          <div class="about-number">{{shopInfo.goodsCount}}</div>
          <div class="about-text">全部宝贝</div>
        </div>
      </div>
      <div class="shop-score">
        <div class="shop-score-item" v-for="(item,index) in shopInfo.score"
          :key="index">
          <span class="shop-score-text">{{item.name}}</span>
          <span class="shop-score-text">{{item.score}}</span>
          <span class="shop-score-text"
            :style="scoreTextStyle(item)">{{item.isBetter? '高':'低'}}</span>
        </div>
      </div>
      <div class="separate">

      </div>
    </div>
    <div class="more">
      <a href="#" class='enter'>进店看看</a>
    </div>
  </detail-box>
</template>

<script>
import DetailBox from './DetailBox.vue'
export default {
  props: {
    shopInfo: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  components: {
    DetailBox
  },
  computed: {
    fansBigUnit () {
      return (this.shopInfo.fans / 10000).toFixed(1)
    },
    sellsBigUnit () {
      return (this.shopInfo.sells / 10000).toFixed(1)
    },
    scoreTextStyle () {
      return function (item) {
        return { color: item.isBetter ? 'deeppink' : 'darkseagreen' }
      }
    }
  },
  methods: {
    imageLoad () {
      this.$bus.$emit('scrollRefresh')
    }
  }

}
</script>

<style lang="less" scoped>
// * 第一行样式
.shop {
  &-info {
    padding: 12px;
  }

  &-logo {
    margin-right: 10px;
    height: 50px;
    border: 1px solid #d3d3d3;
    border-radius: 10px;
    vertical-align: top;
  }

  &-base {
    position: relative;
    display: flex;
    align-items: center;
  }

  &-name {
    display: inline-block;
    line-height: 50px;
    text-align: center;
  }

  &-fans {
    position: absolute;
    bottom: 0;
    font-size: 12px;
    padding-left: 14px;
    background: url("~assets/img/detail/fans.svg") no-repeat;
    background-size: 12px;
    background-position: 0 0.5px;
  }
}

.collect {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translate(0, -50%);
  padding: 8px;
  border-radius: 8px;
  color: white;
  font-size: 14px;
  font-family: 黑体;
  background-color: var(--color-tint);

  &-icon {
    height: 16px;
    vertical-align: bottom;
  }
}

// * 第二行开始

.shop {
  &-detail {
    position: relative;
    display: grid;
    grid-template-columns: 1fr 1fr;
    color: #4a4a4a;
    gap: 32px;
    margin: 16px 0;
  }

  &-about {
    display: flex;
    text-align: center;
  }

  &-score {
    display: flex;
    flex-direction: column;
    font-size: 12px;

    &-item {
      flex: 1;
      // 在这
      display: flex;
      margin-top: 8px;

      &:first-child {
        margin-top: 0;
      }
    }

    &-text {
      flex: auto;
      margin-right: 5px;

      &:last-child {
        // margin-right: 0px;
        text-align: right;
      }
    }
  }
}

.about {
  &-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  &-text {
    font-size: 12px;
  }

  &-number {
    font-size: 16px;
  }
}

.more {
  text-align: center;
}

.enter {
  display: inline-block;
  width: 60%;
  padding: 8px;
  text-align: center;
  border-radius: 10px;
  background-color: #f0f9ff;
}

.separate {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 40px;
  width: 1px;
  background-color: #d3d3d3;
}
</style>