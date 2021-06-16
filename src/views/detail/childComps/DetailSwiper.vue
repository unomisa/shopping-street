<template>
  <div class="swiper-box">
    <my-swiper class="swiper" v-if="banners.length>0">
      <my-swiper-item v-for="(item,index) in banners" :key="index">
        <img :src="item" alt="展示图片" @load="imageLoad">
      </my-swiper-item>
    </my-swiper>
  </div>
</template>

<script>
import MySwiper from 'components/common/myswiper/MySwiper.vue'
import MySwiperItem from 'components/common/myswiper/MySwiperItem.vue'
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
  height: inherit;

  img {
    object-fit: cover;
  }

  &-box {
    height: 350px;
  }
}
</style>