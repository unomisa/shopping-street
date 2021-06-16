<template>
  <div class="user"
       @click="login">
    <div class="user-avatar">
      <img width="80%"
           height="80%"
           src="~assets/img/profile/avatar.svg" />
    </div>
    <div class="user-info">
      <div>登录 / 注册</div>
      <div class="font-small">
        <van-icon :name="require('assets/img/profile/phone.svg')"
                  size="18px"
                  class="phone-icon" />
        暂无绑定手机号
      </div>
    </div>
    <van-icon class="arrow-right"
              name="arrow"
              size="20px"
              color="white" />
  </div>
</template>

<script>
export default {
  methods: {
    login () {
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>
.flex {
  display: flex;
  align-items: center;
  justify-content: center;
}

.user {
  position: relative;
  display: flex;
  background-color: var(--color-tint);
  height: 100px;

  &-avatar {
    &:extend(.flex);
    flex: 1;
  }

  &-info {
    &:extend(.flex);
    flex: 3;
    flex-direction: column;
    align-items: flex-start;
    color: white;
    line-height: 2;
  }
}

.phone-icon {
  vertical-align: middle;
}

.arrow-right {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
}
</style>