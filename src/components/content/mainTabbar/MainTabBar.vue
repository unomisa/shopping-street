<template>
  <div>
    <tab-bar>
      <tab-bar-item v-for="(item,index) in items"
                    :key="index"
                    :path='item.path'>
        <template v-slot:icon>
          <img :src='iconPath(item.fileName)'
               alt="">
        </template>
        <template v-slot:icon-active>
          <img :src="iconPath(`${item.fileName}_active`)"
               alt="">
        </template>
        <template v-slot:text>
          <div>{{item.text}}</div>
        </template>
      </tab-bar-item>
    </tab-bar>
  </div>
</template>
<script>
import TabBar from 'components/common/tab-bar/TabBar.vue'
import TabBarItem from 'components/common/tab-bar/TabBarItem.vue'

export default {
  data () {
    return {
      /**
       * ? 为什么这里不能在iconPath函数中的字符串模板中使用它
       */
      // iconPathBase: '@/assets/img/tabbar/',
      items: [
        {
          text: '首页',
          path: '/home',
          fileName: 'home'
        },
        {
          text: '分类',
          path: '/category',
          fileName: 'category'
        },
        {
          text: '购物车',
          path: '/shopcart',
          fileName: 'shopcart'
        },
        {
          text: '我的',
          path: '/profile',
          fileName: 'profile'
        }
      ]
    }
  },
  methods: {
    iconPath (name) {
      return require(`@/assets/img/tabbar/${name}.svg`)
    }
  },
  components: {
    TabBarItem,
    TabBar
  }

}
</script>

<style lang="less" scoped>
</style>