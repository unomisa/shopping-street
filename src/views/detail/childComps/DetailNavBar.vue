<template>
  <div>
    <nav-bar>
      <template v-slot:left>
        <div class="back"
             @click="back">
          <img src="~/assets/img/common/back.svg">
        </div>
      </template>
      <template v-slot:center>
        <div class="title">
          <span v-for="(item,index) in titles"
                :class="titleStyle(index)"
                :key="index"
                @click="setCurrentIndex(index)">{{item}}</span>
        </div>
      </template>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'

export default {
  props: {
    // 目标元素数组,根据它们的下标跳转
    target: {
      type: Array,
      default () {
        return []
      }
    },
    scroll: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  components: {
    NavBar
  },
  data () {
    return {
      titles: ['宝贝', '展示', '参数', '推荐'],
      currentIndex: 0
    }
  },
  methods: {
    setCurrentIndex (index) {
      this.scroll.scrollToElement(this.target[index], 300)
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
  },
  watch: {
    scroll: function () {
      // 根据滚动判断在哪个模块，以当前元素为参照
      this.scroll.bscroll.on('scroll', () => {
        const target = this.target[this.currentIndex]
        if (target.getBoundingClientRect().top > this.$store.state.navBarHeight + 1) {
          this.currentIndex--
        } else if (this.currentIndex + 1 < this.target.length) {
          const next = this.target[this.currentIndex + 1]
          if (next.getBoundingClientRect().top < this.$store.state.navBarHeight + 1) {
            this.currentIndex++
          }
        }
      })
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