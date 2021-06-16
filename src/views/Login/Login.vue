<template>
  <transition name="van-slide-right">
    <div class="login">
      <van-nav-bar title="登录 / 注册"
                   fixed
                   left-text="返回"
                   @click-left="back"
                   left-arrow />

      <login-form class="login-form" />

    </div>
  </transition>
</template>

<script>
import LoginForm from './childComps/LoginForm.vue'

export default {
  name: 'login',
  components: { LoginForm },
  methods: {
    back () {
      this.$router.back()
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  height: calc(100vh - var(--tab-bar) - var(--nav-bar));
  height: calc(
    100vh - var(--vh-offset, 0px) - var(--tab-bar) - var(--nav-bar)
  ); // 使用vh-check对vh进行正确计算
  position: relative;
}

.login-form {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
}

.van-slide-right-leave-active {
  animation: none;
}

.van-slide-right-enter-active {
  transition: opacity 0.5s;
}

.van-slide-right-enter {
  opacity: 0;
}
</style>