<template>
  <div class="nav-bar">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="left">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.nav-bar {
  // * 若使用better-scroll实现滚动则不需要设置以下属性，因为滚动不会涉及到所处位置
  // position: fixed;
  // top: 0;
  // right: 0;
  // left: 0;
  // z-index: 999;
  position: relative;
  z-index: 999;
  display: flex;
  height: var(--nav-bar);
  line-height: var(--nav-bar);
  width: 100%;
  text-align: center;
  box-shadow: 0 2px 5px rgba(100, 100, 100, 0.5);
}

.left {
  width: 70px;
}

.center {
  flex: 1;
}

.right {
  &:extend(.left);
}
</style>