<template>
  <scroll class="left-nav-content" ref="scroll">
    <div class='nav-item' :class="{actived:index===currentIndex}"
      v-for="(item,index) in categoryList" :key="index"
      @click="setCurrentIndex(index)">
      {{item.title}}
    </div>
  </scroll>

</template>

<script>
import Scroll from 'components/common/scroll/Scroll.vue'

export default {
  components: {
    Scroll
  },
  props: {
    categoryList: {
      type: Array,
      default () {
        return []
      }
    },
    currentIndex: {
      type: Number,
      default: 0
    }
  },
  methods: {
    setCurrentIndex (index) {
      this.$emit('update:currentIndex', index)
    }
  },
  watch: {
    categoryList () {
      this.$nextTick(() => {
        this.$refs.scroll.refresh()
      })
    }
  }
}
</script>

<style lang="less" scoped>
.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.left-nav-content {
  flex: 0 auto;
  display: flex;
  flex-direction: column;
  background-color: ghostwhite;
}

.nav {
  &-item {
    &:extend(.flex-center);
    height: 45px;
    padding: 0 10px;
    border-left: solid 3px transparent;
  }
}

.actived {
  color: var(--color-high-text);
  font-weight: bold;
  background-color: white;
  border-left: solid 3px var(--color-high-text);
}
</style>