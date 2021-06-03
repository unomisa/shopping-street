<template>
  <div class="sub-category">
    <div class="sub-category-item" v-for="(item,index) of subCategoryList"
      :key="index">
      <div class="aspect-ratio-box"
        :style="{'padding-top':aspectRatio(item.image) }">
        <img class="sub-category-img" :src="item.image">
      </div>
      <div class="sub-category-text">{{item.title}}</div>
    </div>
  </div>
</template>

<script>
import { imageLoad } from 'common/mixin'

export default {
  mixins: [imageLoad],
  props: {
    subCategoryList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  watch: {
    subCategoryList () {
      this.$nextTick(() => {
        this.$emit('refresh')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.sub-category {
  display: flex;
  flex-wrap: wrap;
  text-align: center;

  &-item {
    flex: 0 28%;
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
    height: 100px;
    margin-right: 8%;

    &:nth-child(3n) {
      margin-right: 0;
    }
  }

  &-img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    object-fit: cover;
  }

  &-text {
    margin-top: 10px;
    font-size: 12px;
  }
}

.aspect-ratio-box {
  position: relative;
}
</style>