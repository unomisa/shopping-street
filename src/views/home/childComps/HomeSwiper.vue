<template>
  <div>
    <!-- 有数据时才开始渲染 -->
    <my-swiper v-if="banners.length>0" class="swiper">
      <my-swiper-item v-for="(item,index) in banners" :key="index">
        <a :href="item.link">
          <img :src="item.image" alt="广告" height="100%" width="100%"
            @load="imageLoad">
        </a>
      </my-swiper-item>
    </my-swiper>
  </div>
</template>

<script>
import { MySwiperItem, MySwiper } from 'components/common/myswiper/index'
import { imageLoad } from 'common/mixin'
export default {
  mixins: [imageLoad],
  props: {
    banners: {
      type: Array,
      default () {
        return []
      }
    }
  },
  components: {
    MySwiper,
    MySwiperItem
  }

}
</script>

<style lang="less" scoped>
.swiper {
  width: 100vw;
  height: 200px;
}
</style>