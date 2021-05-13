<template >
  <div class="tab-bar">
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
  </div>
</template>
<script>
import TabBarItem from 'components/content/tab-bar/TabBarItem'
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
  components: { TabBarItem }
}
</script>
<style lang="less">
.tab-bar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  text-align: center;
  background-color: #f6f6f6;
  height: 49px;
  box-shadow: 0 -1px 1px rgba(100, 100, 100, 0.2);
}
</style>