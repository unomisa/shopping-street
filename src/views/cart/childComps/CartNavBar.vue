<template>
  <div>
    <nav-bar class="nav-bar">
      <template v-slot:center>
        <span class="font-medium">购物车({{cartLength}})</span>
      </template>

      <template v-slot:right>
        <span class="edit-botton"
              @click="edit"
              :class="{'edit-botton--active': isEdit}">
          <van-icon name="edit"
                    size="13px"
                    class="manage"
                    v-if="!isEdit" />
          <van-icon name="close"
                    size="13px"
                    class="manage"
                    v-if="isEdit" />
          <span>管理</span>
        </span>
      </template>
    </nav-bar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import NavBar from 'components/common/navbar/NavBar.vue'

export default {
  components: {
    NavBar
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters([
      'cartLength'
    ])
  },
  methods: {
    // 更改编辑按钮状态
    edit () {
      this.$emit('update:isEdit', !this.isEdit)
    }
  }
}
</script>

<style lang="less" scoped>
.nav-bar {
  color: white;
  background-color: var(--color-tint);
}

.edit-botton {
  padding: 3px;
  font-size: 13px;

  &--active {
    @color: #f7fd04;
    border: 1px solid @color;
    color: @color;
    border-radius: 10px;
  }
}

.manage {
  padding-right: 3px;
}
</style>