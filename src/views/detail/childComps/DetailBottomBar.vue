<template>
  <div>
    <tab-bar class="bottom-bar">
      <div class="left">
        <div class="item" v-for="(item,index) in items" :key="index"
          @click="item.clickEvent">
          <div :class="item.iconClass"></div>
          <div>{{item.text}}</div>
        </div>
      </div>

      <div class="right">
        <div class="right-join" @click="openInventory">
          <span>加入购物车</span>
        </div>
        <div class="right-buy">
          <span>立即购买</span>
        </div>
      </div>
    </tab-bar>
  </div>
</template>

<script>
import TabBar from 'components/common/tab-bar/TabBar.vue'
export default {
  components: {
    TabBar
  },
  data () {
    return {
      items: [],
      service: {
        text: '客服',
        iconClass: {
          'icon-service': true
        },
        clickEvent: () => {
        }
      },
      shop: {
        text: '店铺',
        iconClass: {
          'icon-shop': true
        },
        clickEvent: () => {
        }
      },
      star: {
        text: '收藏',
        iconClass: {
          'icon-star': true,
          'icon-collected': false
        },
        clickEvent: this.starClick
      }
    }
  },
  methods: {
    // * 事件处理方法
    openInventory () {
      this.$emit('openInventory')
    },
    starClick () {
      this.star.iconClass['icon-collected'] = !this.star.iconClass['icon-collected']
    }
  },
  created () {
    this.items.push(this.service)
    this.items.push(this.shop)
    this.items.push(this.star)
  }

}
</script>

<style lang="less" scoped>
// 左边块
.bottom-bar {
  background-color: white;
}

.left {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.item {
  flex: 1;
}

.icon {
  display: inline-block;
  background: url("~assets/img/detail/detail_bottom.png") no-repeat;
  width: 22px;
  height: 22px;
  background-size: 22px;

  &-service {
    &:extend(.icon);
    background-position: 0 -53px;
  }

  &-shop {
    &:extend(.icon);
    background-position: 0 -98px;
  }

  &-star {
    &:extend(.icon);
    background-position: 0 1px;
  }

  &-collected {
    &:extend(.icon);
    background-position: 0 -26px;
  }
}

.text {
  font-family: 宋体;
}

// 右边块
.right-base {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  height: 70%;
  color: white;
  border-radius: 30px;
}

.right {
  flex: 1;
  display: flex;
  align-items: center;

  &-join {
    &:extend(.right-base);
    background-color: #ffe227;
    color: white;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  &-buy {
    &:extend(.right-base);
    background-color: var(--color-tint);
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
}
</style>