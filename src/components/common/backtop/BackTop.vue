<template>
  <div :class="showStyle">
    <img src="~assets/img/common/top.png" class="back-top-icon">
  </div>
</template>

<script>
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    showStyle () {
      return {
        'back-top': true,
        'is-show': this.isShow
      }
    }
  }
}
</script>

<style lang="less" scoped>
.back-top {
  position: fixed;
  bottom: 55px;
  right: 2px;
  z-index: 998;
  transform: translate(100px, 0);
  transition: transform 0.5s;
  &-icon {
    height: 50px;
  }
}

.is-show {
  transform: translate(0, 0);
}
</style>