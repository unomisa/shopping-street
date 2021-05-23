<template>
  <div class="swiper">
    <!-- 有数据时才开始渲染 -->
    <my-swiper v-if="banners.length>0">
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
export default {
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
  },
  methods: {
    imageLoad () {
      this.$emit('homeSwiperImageLoad')
    }
  }

}
</script>

<style lang="less" scoped>
.swiper {
  height: 170px;
  width: 100vw;
}
</style>