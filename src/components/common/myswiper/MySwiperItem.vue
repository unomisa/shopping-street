<template>
  <div class="banner-list-item">
    <slot></slot>
  </div>
</template>

<script>
export default {
  // mounted () {
  //   this.$emit('over')
  // }
}
</script>

<style lang="less" scoped>
.banner-list-item {
  height: 100%;
  img {
    // vertical-align: middle;
    height: 100%;
    width: 100vw;
  }
}
</style>