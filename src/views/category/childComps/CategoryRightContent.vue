<template>
  <div class="content-box">
    <tab-control class="tab-control-clone" :category="['综合','新品','销量']"
      v-show="isTabControlCloneShow" :currentIndex.sync="currentIndex"
      ref="tabControlClone" />

    <scroll class="right-content" ref="scroll" @scroll="scroll" :probeType="3">

      <category-sub-category :subCategoryList="allInfo.subCategoryList"
        @refresh="refresh" />

      <tab-control class="tab-control" :currentIndex.sync="currentIndex"
        :category="['综合','新品','销量']" ref="tabControl" />

      <keep-alive>
        <category-goods @refresh="refresh" :key="name (currentIndex)"
          :goods="allInfo.allGoods[currentIndex]"
          @saveScrollHeight="saveScrollHeight" @scrollTo="scrollTo"
          v-if="'allGoods' in allInfo && allInfo.allGoods.length!==0" />

      </keep-alive>
    </scroll>
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll.vue'
import TabControl from 'components/content/tabcontrol/TabControl.vue'

import CategorySubCategory from './CategorySubCategory.vue'
import CategoryGoods from './CategoryGoods.vue'
import { heightDispose } from 'common/mixin'

export default {
  mixins: [heightDispose],
  components: {
    Scroll,
    CategorySubCategory,
    TabControl,
    CategoryGoods
  },
  props: {
    allInfo: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      currentIndex: 0
    }
  },
  methods: {
    // * 事件监听相关方法
    scroll () {
      this.setIsTabControlCloneShow()
    },

    name (currentIndex) {
      let name
      switch (currentIndex) {
        case 0: name = 'pop'; break
        case 1: name = 'new'; break
        case 2: name = 'sell'; break
      }
      return name
    }
  }
}

</script>

<style lang="less" scoped>
.content-box {
  position: relative;
  flex: 1;
  height: inherit;
}

.right-content {
  height: inherit;
  padding: 0.5rem;
  background-color: white;
}

.tab-control {
  margin: 1rem 0;
  height: 45px;

  &-clone {
    position: absolute;
    z-index: 998;
    margin: 0;
    height: 45px;
  }
}
</style>