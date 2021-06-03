<template>
  <div class="commondity-box" @click="routeSwitch">
    <div :style="{'padding-top': aspectRatio}" class="aspect-ratio-box">
      <img class="aspect-ratio-box-img" v-lazy="image" @load="imageLoad">
    </div>

    <div class="commondity-box-info">
      <div class="commondity-box-text">{{info.title}}</div>
      <div>
        <span class="commondity-box-price">{{info.price}}</span>
        <span class="commondity-box-collect">{{info.cfav}} </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  methods: {
    imageLoad () {
      this.$bus.$emit('scrollRefresh')
      this.$bus.$emit('waterfallFlowLayoutRefresh')
    },
    routeSwitch () {
      this.$router.push(`/detail/${this.info.iid}`)
    }
  },
  computed: {
    image () {
      if ('showLarge' in this.info) {
        return this.info.showLarge.img
      } else if ('image' in this.info) {
        return this.info.image
      } else {
        return this.info.img
      }
    },
    aspectRatio () {
      if ('showLarge' in this.info) {
        const showLarge = this.info.showLarge
        return (showLarge.h / showLarge.w) * 100 + '%'
      }
      return '150%'
    }
  }
}
</script>

<style lang="less" scoped>
.commondity-box {
  font-size: 12px;
  text-align: center;
  overflow: hidden;
  img {
    width: 100%;
    border-radius: 10px;
  }

  &-info {
    padding: 8px 0;
  }

  &-text {
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  &-price {
    color: var(--color-tint);
  }

  &-collect {
    &::before {
      content: "";
      background: url("~@/assets/img/common/collect.svg") no-repeat;
      background-position: 0 0;
      background-size: 13px;
      padding-left: 14px;
      margin-left: 6px;
    }
  }
}

.aspect-ratio-box {
  position: relative;

  &-img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>