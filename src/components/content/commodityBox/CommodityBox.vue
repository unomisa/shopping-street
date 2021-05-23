<template>
  <div class="commondity-box" @click="clicktest">
    <img :src="info.showLarge.img" alt="商品图片" @load="imageLoad">
    <div class="commondity-box-info">
      <div class="commondity-box-text">{{info.title}}</div>
      <div>
        <span class="commondity-box-price">{{info.price}}</span>
        <span class="commondity-box-collect">{{info.cfav}} </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  methods: {
    imageLoad () {
      this.$bus.$emit('itemImageLoad')
    },
    clicktest () {
      this.$router.push(`/detail/${this.info.iid}`)
    }
  }
}
</script>

<style lang="less" scoped>
.commondity-box {
  font-size: 12px;
  text-align: center;
  overflow: hidden;
  img {
    width: 100%;
    border-radius: 10px;
  }

  &-info {
    padding: 8px 0;
  }

  &-text {
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  &-price {
    color: var(--color-tint);
  }

  &-collect {
    &::before {
      content: "";
      background: url("~@/assets/img/common/collect.svg") no-repeat;
      background-position: 0 0;
      background-size: 13px;
      padding-left: 14px;
      margin-left: 6px;
    }
  }
}
</style>