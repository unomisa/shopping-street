import { debounce } from './utils'

import BackTop from 'components/common/backtop/BackTop.vue'

// 图片加载完成处理事件
export const imageLoad = {
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
