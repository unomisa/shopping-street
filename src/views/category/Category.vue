<template>
  <div>
    <nav-bar class="nav-bar">
      <template v-slot:center>
        商品分类
      </template>
    </nav-bar>
    <div class="content">
      <category-left-nav :categoryList="categoryList"
        :currentIndex.sync="currentCategoryIndex" />

      <keep-alive :max='10'>
        <category-right-content :allInfo="loaded[currentCategoryIndex]"
          :key="currentCategoryIndex" />
      </keep-alive>

    </div>
  </div>
</template>
<script>
import NavBar from 'components/common/navbar/NavBar.vue'
import CategoryLeftNav from './childComps/CategoryLeftNav.vue'

import { getCategory } from 'network/pageRequest/category'
import { getSubcategory, getCategoryDetail } from '../../network/pageRequest/category'

import { POP, NEW, SELL } from 'common/const'
import CategoryRightContent from './childComps/CategoryRightContent.vue'

export default {
  components: {
    NavBar,
    CategoryLeftNav,
    CategoryRightContent
  },
  data () {
    return {
      categoryList: [],
      subCategoryList: [],
      allGoods: [],
      currentCategoryIndex: 0,
      loaded: []
    }
  },
  computed: {
    isShowCategoryRightContent () {
      return Object.keys(this.loaded[this.currentCategoryIndex]).length !== 0
    }
  },
  methods: {
    // * 网络请求相关方法

    // 请求左边分类栏数据
    async _getCategory () {
      await getCategory().then(res => {
        this.categoryList = res.data.category.list
      })
    },

    // 请求亚分类数据
    async _getSubcategory (maitKey) {
      await getSubcategory(maitKey)
        .then(res => {
          const index = this.currentCategoryIndex
          this.loaded[index].subCategoryList = res.data.list
        })
    },

    // 请求分类商品详细数据
    async _getCategoryDetail (miniWallkey) {
      const types = [POP, NEW, SELL]
      const index = this.currentCategoryIndex
      this.$set(this.loaded[index], 'allGoods', [])
      for (let i = 0; i < types.length; i++) {
        getCategoryDetail(miniWallkey, types[i])
          .then(res => {
            this.loaded[index].allGoods.splice(i, 0, res)
          })
      }
    },

    // * 事件处理相关方法
    categoryChange (item) {
      this._getSubcategory(item.maitKey)
      this._getCategoryDetail(item.miniWallkey)
    }

  },
  watch: {

    // 初始化loaded数组
    categoryList () {
      for (let i = 0; i < this.categoryList.length; i++) {
        this.loaded.push({})
      }
    },

    currentCategoryIndex () {
      const currentCategory = this.categoryList[this.currentCategoryIndex]
      const currentLoaded = this.loaded[this.currentCategoryIndex]
      if (Object.keys(currentLoaded).length === 0) {
        this._getSubcategory(currentCategory.maitKey)
        this._getCategoryDetail(currentCategory.miniWallkey)
      }
    }
  },
  created () {
    this._getCategory().then(() => {
      const firstCategory = this.categoryList[0]
      this._getSubcategory(firstCategory.maitKey)
      this._getCategoryDetail(firstCategory.miniWallkey)
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
}

.nav-bar {
  background-color: var(--color-tint);
  color: white;
  font-size: 18px;
}
</style>
