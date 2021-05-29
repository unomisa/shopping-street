<template>
  <div>
    <detail-box class="desc">
      <span class="desc-title">商品描述</span>
      <div class="separator-top"></div>
      {{show.desc}}
      <div class="separator-bottom"></div>
    </detail-box>

    <detail-box>
      <div class="show-title">商品展示</div>
      <div class="separator-show"></div>
      <div>
        <img :src="item" class="image" v-for="(item,index) in show.imageList"
          :key="index" @load="imageLoad">
      </div>
    </detail-box>
  </div>
</template>

<script>
import DetailBox from './DetailBox.vue'
import { imageLoad } from 'common/mixin'
export default {
  mixins: [imageLoad],
  components: {
    DetailBox
  },
  props: {
    show: {
      type: Object,
      default () {
        return {}
      }
    }
  }
}
</script>

<style lang="less" scoped>
.title {
  padding: 8px;
  font-size: 20px;
  padding-left: 26px;
  color: #ee7abb;
}

.desc-title {
  &:extend(.title);
  background: url("~assets/img/detail/desc.svg") no-repeat;
  background-position: 0 center;
  background-size: 24px;
}

.show-title {
  &:extend(.title);
  background: url("~assets/img/detail/picture.svg") no-repeat;
  background-position: 0 center;
  background-size: 24px;
  padding-left: 26px;
}

.separator {
  height: 1px;
  width: 70%;
  background-image: linear-gradient(to top, #fff1eb 0%, #ace0f9 100%);
  &-top {
    &:extend(.separator);
    margin: 5px 0 8px;
  }

  &-bottom {
    &:extend(.separator);
    margin: 5px 0 8px auto;
  }

  &-show {
    &:extend(.separator);
    margin-bottom: 16px;
  }
}

.desc {
  font-size: 14px;
  line-height: 1.5;
}

.image {
  width: 100%;
}
</style>