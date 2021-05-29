<template>
  <detail-box class="detail-box">
    <div>
      <div class="title">
        <img src="~assets/img/detail/safeguard .svg" class="title-icon">
        服务保障
      </div>
      <div class="services-list">
        <div class="services-list-item" v-for="(item,index) in services"
          :key="index">
          <img
            src="http://s11.mogucdn.com/p1/160607/upload_ie4tkmbtgqztomjqhezdambqgqyde_44x44.png"
            class="icon">
          {{item.name}}
        </div>
      </div>
    </div>
  </detail-box>
</template>

<script>
import DetailBox from './DetailBox.vue'

export default {
  props: {
    services: {
      type: Array,
      default () {
        return []
      }
    }
  },
  components: {
    DetailBox
  }

}
</script>

<style lang="less" scoped>
.title {
  font-size: 20px;
  text-align: center;
  color: #4a4a4a;
  padding-bottom: 10px;
  border-bottom: 1px solid #adadad;

  &-icon {
    height: 21px;
    vertical-align: bottom;
  }
}

.services-list {
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  margin-top: 10px;

  &-item {
    flex: 1 45%;
    margin: 5px;
  }
}

.icon {
  vertical-align: top;
  height: 16px;
}
</style>