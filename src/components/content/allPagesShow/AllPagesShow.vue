<template>
  <div>
    <page-dormancy v-show='isPageDormant' />
  </div>
</template>

<script>
import PageDormancy from 'components/common/pageDormancy/PageDormancy.vue'

export default {
  data () {
    return {
      isShowToast: false,
      isPageDormant: false
    }
  },
  components: {
    PageDormancy
  },
  methods: {
    pageDormant () {
      this.isPageDormant = true
    },
    cancelPageDormant () {
      this.isPageDormant = false
    }
  },
  created () {
    this.$bus.$on('pageDormant', this.pageDormant)
    this.$bus.$on('cancelPageDormant', this.cancelPageDormant)
  }

}
</script>

<style lang="less" scoped>
</style>