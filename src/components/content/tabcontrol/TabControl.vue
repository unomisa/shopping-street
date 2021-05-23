<template>
  <div class="tab-control">
    <div v-for="(item,index) in category" :key="index" class="tab-control-item"
      @click="setCurrentIndex(index)">
      <span :class="isActive(index)">{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    category: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      currentIndex: 0
    }
  },
  methods: {
    setCurrentIndex (index) {
      this.currentIndex = index
      this.$emit('currentCategoryChange', this.currentIndex)
    }
  },
  computed: {
    isActive () {
      return function (index) {
        return {
          'tab-control-item-active': this.currentIndex === index
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
@height: 40px;
.tab-control {
  display: flex;
  height: @height;
  line-height: @height;
  width: 100%;
  text-align: center;
  background-color: white;
  &-item {
    flex: 1;
    &-active {
      padding: 3px;
      color: #ff8198;
      border-bottom: 3px solid #ff8198;
    }
  }
}
</style>