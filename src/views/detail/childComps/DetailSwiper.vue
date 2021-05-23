<template>
  <div>
    <my-swiper class="swiper">
      <my-swiper-item v-for="(item,index) in banners" :key="index">
        <img :src="item" alt="展示图片" @load="imageLoad">
      </my-swiper-item>
    </my-swiper>
  </div>
</template>

<script>
import MySwiper from 'components/common/myswiper/MySwiper.vue'
import MySwiperItem from '../../../components/common/myswiper/MySwiperItem.vue'
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
      this.$bus.$emit('detailImageLoad')
    }
  }

}
</script>

<style lang="less" scoped>
.swiper {
  height: 280px;
  img {
    object-fit: cover;
  }
}
</style>