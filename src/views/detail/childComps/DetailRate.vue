<template>
  <div>
    <detail-box>
      <div class="top">
        <span class="title">买家评价</span>
        <span class="more">更多</span>
      </div>
      <div class="separator"></div>
      <div class="user">
        <img class="user-avatar" :src="rate.user.avatar">
        <span class="user-name">{{rate.user.uname}}</span>
      </div>

      <div class="content">
        <div>{{rate.content}}</div>
        <div class="images" v-if="'images' in rate">
          <span class="images-item" v-for="(item,index) in rate.images"
            :key="index">
            <img class="img" :src="item" @load="imageLoad">
          </span>
        </div>
      </div>

      <div class="content info">
        <span class="date">{{date}}</span>
        <span>{{rate.style}}</span>
      </div>
      <detail-box :class="explainStyle" v-if="'explain' in rate">
        <span>
          <span :class="openBtnSttle" @click="open"></span>
          <span class="text-head">商家回复：</span>
          {{rate.explain.slice(7)}}
        </span>
      </detail-box>

    </detail-box>
  </div>
</template>

<script>
import DetailBox from './DetailBox.vue'
import { formatDate } from 'common/utils'
import { imageLoad } from 'common/mixin'

/**
 * todo  图片加载监听刷新
 */

export default {
  mixins: [imageLoad],
  props: {
    rate: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      isOpen: false
    }
  },
  components: {
    DetailBox
  },
  computed: {
    date () {
      const newDate = new Date(this.rate.created * 1000)
      return Object.keys(this.rate).length !== 0 ? formatDate(newDate, 'yyyy-MM-dd') : 0
    },
    explainStyle () {
      return {
        explain: true,
        open: this.isOpen
      }
    },
    openBtnSttle () {
      return {
        'open-btn': true,
        shrink: this.isOpen
      }
    }
  },
  methods: {
    open () {
      this.isOpen = !this.isOpen
    }
  }
}
</script>

<style lang="less" scoped>
.top {
  position: relative;
  padding: 1rem 0 0;
}

.title {
  padding: 8px;
  font-size: 20px;
  padding-left: 26px;
  color: #ee7abb;
  background: url("~assets/img/detail/rate.svg") no-repeat;
  background-position: 0 center;
  background-size: 24px;
}

.more {
  position: absolute;
  right: 0;
  bottom: 0;
  padding-right: 24px;
  font-size: 18px;
  background: url("~assets/img/detail/more.svg") no-repeat;
  background-position: right center;
  background-size: 28px;
}

.separator {
  height: 1px;
  width: 100%;
  background-image: linear-gradient(to top, #fff1eb 0%, #ace0f9 100%);
  margin: 10px 0;
}

.user {
  display: flex;
  align-items: center;
  color: #4a4a4a;
  margin-bottom: 1rem;

  &-avatar {
    height: 3rem;
    border-radius: 100%;
  }

  &-name {
    margin-left: 0.5rem;
  }
}

.content {
  padding: 0 0.5rem 1rem;
  font-size: 14px;
}

.images {
  display: flex;
  padding: 5px;
  padding-bottom: 0;

  &-item {
    flex: 30%;
    max-width: 50%;
    max-height: 150px;
    margin-right: 8px;

    &:last-child {
      margin-right: 0;
    }
  }
}

.img {
  width: 100%;
  height: 100%;
  border-radius: 5px;
  object-fit: cover;
}

.info {
  font-size: 12px;
}

.date {
  margin-right: 1rem;
}

.explain {
  position: relative;
  margin: 4px;
  padding: 10px;
  font-size: 13px;
  text-align: justify;
  border-radius: 5px;
  padding-right: 20px;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  line-height: 1.3;
  background-color: whitesmoke;
}

.open {
  white-space: normal;
}

.open-btn {
  content: "";
  position: absolute;
  top: 19px;
  transform: translateY(-50%);
  right: 3px;
  height: 16px;
  width: 16px;
  background: url("~assets/img/detail/open.svg") no-repeat;
  background-size: 16px;
  background-position: bottom;
}

.shrink {
  background: url("~assets/img/detail/shrink.svg") no-repeat;
  background-size: 16px;
  background-position: bottom;
}

.text-head {
  color: mediumvioletred;
}
</style>