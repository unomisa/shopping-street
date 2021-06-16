<template>
  <div class="login-form">
    <van-form @submit="onSubmit"
              :show-error='false'
              validate-trigger="onSubmit"
              ref="loginForm">
      <van-field v-model="username"
                 clearable
                 type="number"
                 name="phone"
                 label="手机号"
                 placeholder="手机号"
                 left-icon="phone-o"
                 :rules="[{ required: true, message: '请填写手机号' }]" />
      <van-field v-model="password"
                 clearable
                 type="number"
                 name="message"
                 label="短信验证码"
                 placeholder="短信验证码"
                 left-icon="envelop-o">
        <template #button>
          <van-button native-type="button"
                      color="#00EAD3"
                      size="small"
                      @click="validatePhone">发送验证码</van-button>
        </template>
      </van-field>
      <div style="margin: 16px;">
        <van-button round
                    block
                    type="info"
                    color="#ff8198"
                    native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    onSubmit (values) {
      console.log('submit', values)
    },
    validatePhone () {
      this.$refs.loginForm.validate('phone').catch(() => { })
    }
  }
}
</script>

<style lang="less" scoped>
</style>