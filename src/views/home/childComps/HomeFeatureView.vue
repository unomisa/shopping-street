
<template>
  <div class="feature">
    <a href="#">
      <img src="@/assets/img/home/recommend_bg.jpg" @load="imageLoad">
    </a>
  </div>
</template>

<script>
import { imageLoad } from 'common/mixin'

export default {
  mixins: [imageLoad]
}
</script>

<style lang="less" scoped>
.feature {
  img {
    width: 100%;
  }
}
</style>