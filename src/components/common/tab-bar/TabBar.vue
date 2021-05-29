<template >
  <div class="tab-bar">
    <slot></slot>
  </div>
</template>
<script>
export default {

}
</script>
<style lang="less">
.tab-bar {
  position: fixed;
  z-index: 999;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  text-align: center;
  background-color: #fcfcfc;
  height: 49px;
  box-shadow: 0 -1px 3px rgba(100, 100, 100, 0.5);
}
</style>