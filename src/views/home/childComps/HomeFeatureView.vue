
<template>
  <div>
    <a href="#">
      <img class='img' src="@/assets/img/home/recommend_bg.jpg"
        @load="imageLoad">
    </a>
  </div>
</template>

<script>
import { imageLoad } from 'common/mixin'
import DetailBox from '../../detail/childComps/DetailBox.vue'

export default {
  components: { DetailBox },
  mixins: [imageLoad]
}
</script>

<style lang="less" scoped>
.img {
  width: 100.2%;
}
</style>