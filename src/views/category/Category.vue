<template>
  <div>
    <nav-bar class="nav-bar">
      <template v-slot:center>
        商品分类
      </template>
    </nav-bar>
    <div class="content">
      <category-left-nav :categoryList="categoryList" />

      <category-right-content />
    </div>
  </div>
</template>
<script>
import NavBar from 'components/common/navbar/NavBar.vue'
import CategoryLeftNav from './childComps/CategoryLeftNav.vue'
import CategoryRightContent from './childComps/CategoryRightContent.vue'

import { getCategory } from 'network/pageRequest/category'

export default {
  components: {
    NavBar,
    CategoryLeftNav,
    CategoryRightContent
  },
  data () {
    return {
      categoryList: []
    }
  },
  created () {
    getCategory()
      .then(res => {
        this.categoryList = res.data.category.list
        console.log(this.categoryList)
      })
  }
}
</script>
<style lang="less" scoped>
.content {
  display: flex;
  height: calc(100vh - 49px - var(--nav-bar));
  height: calc(
    100vh - var(--vh-offset, 0px) - 49px - var(--nav-bar)
  ); // 使用vh-check对vh进行正确计算
  background-color: plum;
}

.nav-bar {
  background-color: var(--color-tint);
  color: white;
  font-size: 18px;
}
</style>
