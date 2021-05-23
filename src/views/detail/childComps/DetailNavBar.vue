<template>
  <div>
    <nav-bar>
      <template v-slot:left>
        <div class="back" @click="back">
          <img src="~/assets/img/common/back.svg" alt="回退">
        </div>
      </template>
      <template v-slot:center>
        <div class="title">
          <span v-for="(item,index) in titles" :class="titleStyle(index)"
            :key="index" @click="setCurrentIndex(index)">{{item}}</span>
        </div>
      </template>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'

export default {
  components: {
    NavBar
  },
  data () {
    return {
      titles: ['商品', '参数', '评论', '推荐'],
      currentIndex: 0
    }
  },
  methods: {
    setCurrentIndex (index) {
      this.currentIndex = index
    },
    back () {
      this.$router.back()
    }
  },
  computed: {
    titleStyle () {
      return function (index) {
        return {
          'title-item': true,
          'title-item-active': this.currentIndex === index
        }
      }
    }
  }

}
</script>

<style lang="less" scoped>
.title {
  display: flex;
  &-item {
    flex: 1;
    &-active {
      color: var(--color-tint);
    }
  }
}

.back {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>