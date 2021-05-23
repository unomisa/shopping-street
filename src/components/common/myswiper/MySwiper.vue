<template>
  <div class="banner">
    <div class="banner-list" ref="list">
      <slot></slot>
    </div>
    <div>
      <slot name="indicator">
        <ul class="banner-indicator">
          <li class="banner-indicator-item" v-for="(n,index) in realLength"
            :class="isActive(index)" :key="index"></li>
        </ul>
      </slot>
    </div>

  </div>
</template>

<script>
export default {
  props: {
    intervalTime: {
      type: Number,
      default: 3000
    },
    transitionTime: {
      type: Number,
      default: 300
    }
  },
  data () {
    return {
      currentIndex: 1,
      isScroll: false,
      timer: null,
      realLength: 0
    }
  },
  methods: {
    initList () {
      const list = this.$refs.list
      this.realLength = list.children.length
      list.append(list.children[0].cloneNode(true))
      list.prepend(list.children[list.children.length - 2].cloneNode(true))
    },
    // 移动至下一张或上一张
    scrollNextContent (next = true) {
      if (next) {
        this.currentIndex++ // 下一张
      } else {
        this.currentIndex--
      }
      this.setTransform()
      this.moveToCurrent()
      this.carouselJump() // 每次移动后进行判断是否需要无缝跳转
    },
    setTransform () {
      this.$refs.list.style.transition = `transform ${this.transitionTime}ms`
    },
    noneTransform () {
      this.$refs.list.style.transition = 'none'
    },
    // 无缝跳转
    carouselJump () {
      function jump (to, time) {
        setTimeout(() => {
          this.currentIndex = to // 重新定位至第一张
          this.noneTransform() // 取消过度动画
          this.moveToCurrent()
        }, time)
      }

      if (this.currentIndex === this.listLength - 1) {
        jump.call(this, 1, this.transitionTime)
      } else if (this.currentIndex === 0) {
        jump.call(this, this.listLength - 2, this.transitionTime)
      }
    },
    // 自动轮播功能
    autoMove () {
      this.timer = setInterval(() => {
        this.scrollNextContent()
      }, this.intervalTime)
    },
    // 移动至当前页，并根据需要设置是否正在过渡状态
    moveToCurrent () {
      this.$refs.list.style.transform = `translateX(${this.currentDistance}vw)`
      if (!this.$refs.list.style.transition.includes('none')) {
        this.isScroll = true
        setTimeout(() => {
          this.isScroll = false
        }, this.transitionTime)
      }
    },
    // 拖动向前向后跳转
    dragImage () {
      let startX = 0
      let moveX = 0
      this.$refs.list.addEventListener('touchstart', (event) => {
        clearInterval(this.timer) // 暂停自动滚动
        moveX = 0
        startX = event.targetTouches[0].pageX
      })

      this.$refs.list.addEventListener('touchmove', (event) => {
        if (this.isScroll) return // 正在滚动的话不能拖动
        moveX = event.targetTouches[0].pageX - startX // 记录移动距离
        this.noneTransform() // 取消过度动画
        this.$refs.list.style.transform = `translate3D(calc(${this.currentDistance}vw + ${moveX}px),0,0)` // 跟随移动
      })

      this.$refs.list.addEventListener('touchend', event => {
        this.autoMove() // 恢复自动滚动
        this.setTransform()
        if (moveX < -50) {
          this.scrollNextContent()
        } else if (moveX > 50) {
          this.scrollNextContent(false)
        } else {
          this.$refs.list.style.transform = `translateX(${this.currentDistance}vw)` // 滚动回弹
        }
      })
    }

  },
  computed: {
    listLength () {
      return this.realLength + 2
    },
    // 当前图片在图廊中的位置
    currentDistance () {
      return this.currentIndex * -100
    },
    isActive () {
      return function (index) {
        return {
          'banner-indicator-item-active': index + 1 === this.currentIndex ||
            (index + 1 === 1 && this.currentIndex === this.listLength - 1) ||
            (index + 1 === 4 && this.currentIndex === 0)
        }
      }
    }
  },
  mounted () {
    this.$refs.list.style.transform = 'translateX(-100vw)'// 重新定位图片至第一张
    this.initList()
    this.autoMove()
    this.dragImage()
  },
  destroyed () {
    clearInterval(this.timer) // 被销毁之后清除定时器
  }
}
</script>

<style lang="less" scoped>
.banner {
  position: relative;
  overflow: hidden;

  &-list {
    display: flex; // 使需要轮播的元素横向排列
    height: inherit;
  }

  &-indicator {
    position: absolute;
    left: 50%;
    bottom: 6px;
    transform: translate(-50%);
    display: flex;

    &-item {
      height: 8px;
      width: 8px;
      border-radius: 100%;
      margin-left: 12px;
      background: white;

      // transition: width 0.5s;
      &-active {
        background: red;
      }
    }
  }
}
</style>