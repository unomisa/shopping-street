<template>
  <fillet-box>
    <div class="info">
      <div class="star">
        <van-icon class="icon" :name="require('assets/img/profile/star.svg')"
          size="18px" />
        收藏
      </div>
      <div class="shop">
        <van-icon class="icon"
          :name="require('assets/img/profile/loveIcon.svg')" size="18px" />
        关注店铺
      </div>
      <div class="history">
        <van-icon class="icon" :name="require('assets/img/profile/history.svg')"
          size="18px" />
        足迹
      </div>
    </div>
  </fillet-box>
</template>

<script>
import FilletBox from 'components/common/filletBox/FilletBox.vue'
export default {
  components: { FilletBox }

}
</script>

<style lang="less" scoped>
.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon {
  vertical-align: bottom;
  padding-right: 5px;
  margin-top: -1px;
}

.info {
  display: flex;
  height: 30px;
  background-color: white;
}

.shop {
  &:extend(.flex-center);
  flex: 1;
}

.star {
  &:extend(.flex-center);
  flex: 1;
}

.history {
  &:extend(.flex-center);
  flex: 1;
}
</style>