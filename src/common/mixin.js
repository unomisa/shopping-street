import { debounce } from './utils'

// 图片加载完成处理事件
export const imageLoad = {
  computed: {
    aspectRatio () {
      return function (item) {
        const sizeArr = item.match(/\d+x\d+/)[0].split('x')
        return (sizeArr[1] / sizeArr[0]) * 100 + '%'
      }
    }
  },
  methods: {
    imageLoad () {
      this.$bus.$emit('scrollRefresh')
    }
  }
}

// * 滚动高度监听刷新

// 创建/销毁时 添加/删除scroll高度监听
export const inCreatedOnScrollRefresh = {
  data () {
    return {
      ScrollRefresh: null, // 存储防抖后的refresh
      path: this.$route.path // 存储当前路由
    }
  },
  methods: {
    refresh () {
      // 为当前路由时才进行刷新
      this.path === this.$route.path && this.$refs.scroll.refresh()
    }
  },
  created () {
    this.ScrollRefresh = debounce(this.refresh, 100)
    this.$bus.$on('scrollRefresh', this.ScrollRefresh)
  },
  destroyed () {
    this.$bus.$off('scrollRefresh', this.ScrollRefresh)
  }
}

// 活跃/不活跃时 添加/删除scroll高度监听
export const inActivatedOnScrollRefresh = {
  data () {
    return {
      ScrollRefresh: null, // 存储防抖后的refresh
      path: this.$route.path // 存储当前路由
    }
  },
  methods: {
    refresh () {
      // 为当前路由时才进行刷新
      console.log('mixin里的刷新')
      this.path === this.$route.path && this.$refs.scroll.refresh()
    }
  },
  created () {
    this.ScrollRefresh = debounce(this.refresh, 100)
  },
  activated () {
    this.refresh()
    this.$bus.$on('scrollRefresh', this.ScrollRefresh)
  },
  deactivated () {
    this.$bus.$off('scrollRefresh', this.ScrollRefresh)
  }
}

// * 瀑布流布局刷新

// 创建vue对象时创建瀑布流
export const inCreatedOnWaterfallFlowRefresh = {
  data () {
    return {
      WaterfallFlowLayoutRefresh: null, // 防抖后的瀑布流布局刷新
      path: this.$route.path // 存储当前路由
    }
  },
  methods: {
    recalculate () {
      this.path === this.$route.path && this.$refs.waterfallFlow.recalculate()
    }
  },
  created () {
    this.WaterfallFlowLayoutRefresh = debounce(this.recalculate, 100)
    this.$bus.$on('waterfallFlowLayoutRefresh', this.WaterfallFlowLayoutRefresh)
  },
  destroyed () {
    this.$bus.$off('waterfallFlowLayoutRefresh', this.WaterfallFlowLayoutRefresh)
  }
}

// 获取焦点时创建瀑布流
export const inActivatedOnWaterfallFlowRefresh = {
  data () {
    return {
      WaterfallFlowLayoutRefresh: null, // 防抖后的瀑布流布局刷新
      path: this.$route.path // 存储当前路由
    }
  },
  methods: {
    recalculate () {
      this.path === this.$route.path && this.$refs.waterfallFlow.recalculate()
    }
  },
  created () {
    this.WaterfallFlowLayoutRefresh = debounce(this.recalculate, 100)
  },
  activated () {
    this.recalculate()
    this.$bus.$on('waterfallFlowLayoutRefresh', this.WaterfallFlowLayoutRefresh)
  },
  deactivated () {
    this.$bus.$off('waterfallFlowLayoutRefresh', this.WaterfallFlowLayoutRefresh)
  }
}

// 瀑布流布局刷新
export const waterfallFlowRefresh = {
  methods: {
    // 在更新布局后刷新高度
    recalculated () {
      this.$emit('refresh')
    }
  },
  mounted () {
    this.$refs.waterfallFlow.recalculate() // 先刷新瀑布流布局
  }
}

// 需要记录高度
export const highStorage = {
  data () {
    return {
      scroll: {
        scrollHeight: 0,
        isTabControlCloneShow: null
      }
    }
  },
  activated () {
    this.$emit('scrollTo', this.scroll)
  },
  deactivated () {
    this.$emit('saveScrollHeight', this.scroll)
  }
}

// 处理高度
export const heightDispose = {
  data () {
    return {
      isTabControlCloneShow: false,
      isFirstJump: true
    }
  },
  methods: {
    setIsTabControlCloneShow () {
      const tabControl = this.$refs.tabControl.$el
      this.isTabControlCloneShow = tabControl.getBoundingClientRect().top <= this.$store.state.navBarHeight + 1
    },

    // 滚动条刷新
    refresh () {
      this.$refs.scroll.refresh()
    },

    // 失去活跃时，保存每个tabcontorl中的高度
    saveScrollHeight (scrollInfo) {
      scrollInfo.scrollHeight = this.$refs.scroll.getScrollY()
      scrollInfo.isTabControlCloneShow = this.isTabControlCloneShow
    },

    // 跳转至保存的滚动位置
    scrollTo (scrollInfo) {
      if (!this.isTabControlCloneShow && scrollInfo.isTabControlCloneShow) { // 从上至下
        this.$refs.scroll.scrollTo(0, scrollInfo.scrollHeight, 500)
      } else if (!this.isTabControlCloneShow) { // 上至中
        if (!this.isFirstJump) { // 判断是否是获取焦点首次跳转
          console.log('上至中')
          this.$refs.scroll.scrollToElement(this.$refs.tabControl.$el, 500)
        } else {
          this.isFirstJump = false
        }
      } else if (this.isTabControlCloneShow && scrollInfo.isTabControlCloneShow) { // 下至下
        this.$refs.scroll.scrollTo(0, scrollInfo.scrollHeight, 0)
      } else {
        this.$refs.scroll.scrollToElement(this.$refs.tabControl.$el, 0)
      }
    }
  },
  deactivated () {
    this.isFirstJump = true // 保证第一次活跃不进行跳转
  }
}
