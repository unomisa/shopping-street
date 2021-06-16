<template>
  <fillet-box>
    <van-cell-group :border="false">
      <van-cell v-for="(item,index) in moreList"
                :key="index"
                :title="item.title">
        <template #icon>
          <van-icon class="icon"
                    size="16px"
                    :name="require(`assets/img/profile/${item.iconName}.svg`)" />
        </template>
      </van-cell>
    </van-cell-group>
  </fillet-box>
</template>

<script>
import FilletBox from 'components/common/filletBox/FilletBox.vue'
import { MoreItem } from 'network/pageRequest/profile'

export default {
  components: {
    FilletBox
  },
  data () {
    return {
      moreList: []
    }
  },
  created () {
    this.moreList.push(new MoreItem('积分商城', 'shopping'))
    this.moreList.push(new MoreItem('会员卡', 'vip'))
    this.moreList.push(new MoreItem('下载APP', 'download'))
  }

}
</script>

<style lang="less" scoped>
.icon {
  padding-top: 2px;
  padding-right: 8px;
}
</style>