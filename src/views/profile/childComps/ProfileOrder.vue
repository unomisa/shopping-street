<template>
  <fillet-box>
    <div class="title">
      我的订单
      <div class="more font-small">
        查看全部
        <van-icon name="arrow" />
      </div>
    </div>

    <van-grid :border="false">
      <van-grid-item :icon="require('assets/img/profile/payment.svg')"
        text="待付款" />
      <van-grid-item :icon="require('assets/img/profile/refund.svg')" text="待发货"
        badge="1" />
      <van-grid-item :icon="require('assets/img/profile/inTransit.svg')"
        text="待收货" badge="3" />
      <van-grid-item :icon="require('assets/img/profile/refund.svg')"
        text="退款 / 售后" badge="" />
    </van-grid>
  </fillet-box>
</template>

<script>
import FilletBox from 'components/common/filletBox/FilletBox.vue'

export default {
  components: {
    FilletBox
  }
}
</script>

<style lang="less" scoped>
.title {
  position: relative;
}

.more {
  position: absolute;
  right: 0;
  top: 0;
  color: gray;
}
</style>