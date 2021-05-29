<template>
  <div>
    <div class="buy-count-box">
      <span class="buy-count-box__sub" @click="sub"></span>
      <span class="buy-count-box__num">{{count}}</span>
      <span class="buy-count-box__add" @click="add"></span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    count: {
      type: Number,
      default: 1
    }
  },
  methods: {
    add () {
      this.$emit('addCount')
    },
    sub () {
      this.count !== 1 && this.$emit('subCount')
    }
  }

}
</script>

<style lang="less" scoped>
// 购买数量盒子base样式
.buy-count-btn {
  display: inline-block;
  flex: 0 29%;
  background-color: #f5f5f5;
  background-repeat: no-repeat;
  background-size: 1rem;
  background-position: center;
}

// 调整购买数量box
.buy-count-box {
  display: flex;
  justify-content: space-between;
  width: 90px;
  height: 100%;
  &__sub {
    &:extend(.buy-count-btn);
    background-image: url("~assets/img/detail/sub.svg");
  }
  &__num {
    &:extend(.buy-count-btn);
    flex-basis: 34%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__add {
    &:extend(.buy-count-btn);
    background-image: url("~assets/img/detail/add.svg");
  }
}
</style>