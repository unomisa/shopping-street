<template>
  <div>
    <div v-show="showProfileInfo">
      <van-nav-bar title="我的信息"
                   fixed
                   :border="false"
                   placeholder>
        <template #right>
          <van-icon name="setting-o"
                    size="20"
                    @click="setting" />
        </template>
      </van-nav-bar>

      <scroll class="content">
        <profile-user />

        <profile-info />

        <profile-order />

        <profile-more />
      </scroll>
    </div>

    <router-view v-show="!showProfileInfo"></router-view>
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll.vue'

import ProfileUser from './childComps/ProfileUser.vue'
import ProfileInfo from './childComps/ProfileInfo.vue'
import ProfileOrder from './childComps/ProfileOrder.vue'
import ProfileMore from './childComps/ProfileMore.vue'

export default {
  components: {
    ProfileUser,
    Scroll,
    ProfileInfo,
    ProfileOrder,
    ProfileMore
  },
  data () {
    return {
      showProfileInfo: true
    }
  },
  methods: {
    setting () {
      // this.$router.push('/profile/setting')
    }
  },
  watch: {
    $route (to, from) {
      if (to.path === '/profile') {
        this.showProfileInfo = true
      } else {
        this.showProfileInfo = false
      }
    }
  }
}
</script>
<style lang="less" scoped>
.nav-bar {
  background-color: var(--color-tint);
  box-shadow: none;

  &-title {
    color: white;
    font-size: 4.8vw;
  }
}

.content {
  height: calc(100vh - var(--tab-bar) - var(--nav-bar));
  height: calc(
    100vh - var(--vh-offset, 0px) - var(--tab-bar) - var(--nav-bar)
  ); // 使用vh-check对vh进行正确计算
  background-color: #f8f8f8;
}
</style>