<template>
  <div class='recommend'>
    <div v-for="(item,index) in recommends"
         :key="index"
         class='recommend-item'>
      <a :href="item.link">
        <img :src="item.image"
             alt="">
        {{item.title}}
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    recommends: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>

<style lang="less" scoped>
.recommend {
  display: flex;
  padding: 5px;
  &-item {
    margin-left: 10px;
    text-align: center;
    font-size: 13px;

    &:first-child {
      margin-left: 0;
    }

    img {
      width: 100%;
    }
  }
}
</style>