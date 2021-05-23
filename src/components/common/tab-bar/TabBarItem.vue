<template >
  <div class="tab-bar-item"
       @click="changeIsActive">
    <div v-show="!isActive">
      <slot name="icon"></slot>
    </div>
    <div v-show="isActive">
      <slot name="icon-active"></slot>
    </div>
    <div :style="activeStyle">
      <slot name="text"></slot>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  props: {
    path: String,
    activeColor: {
      type: String,
      default: '#d4237a'
    }
  },
  methods: {
    changeIsActive () {
      if (!(this.$route.path.includes(this.path))) {
        this.$router.replace(this.path)
      }
    }
  },
  computed: {
    isActive () {
      return this.$route.path.includes(this.path)
    },
    activeStyle () {
      return this.isActive ? { color: this.activeColor } : {}
    }
  }
}
</script>
<style lang="less">
.tab-bar-item {
  flex: 1;
  font-size: 14px;
  img {
    margin-top: 3px;
    margin-bottom: 2px;
    height: 24px;
    width: 24px;
    vertical-align: middle;
    color: red;
  }
}
</style>