<template>
  <div>
    <detail-box v-if="'tables' in params && params.tables.length!==0">
      <table class="params-table">
        <tr v-for="(item,index) in params.tables" :key="index">
          <td class="column" v-for="(td,tdIndex) in item" :key="tdIndex">
            {{td}}
          </td>
        </tr>
      </table>
      <div class="params-desc">{{params.desc}}</div>
    </detail-box>

    <detail-box v-if="'info' in params && params.info.length!==0">
      <table class="params-info">
        <tr class="info-row" v-for="(item,index) in params.info" :key="index">
          <td class="key">{{item.key}}</td>
          <td class="value">{{item.value}}</td>
        </tr>
      </table>
    </detail-box>
  </div>
</template>

<script>
import DetailBox from './DetailBox.vue'
export default {
  components: { DetailBox },
  props: {
    params: {
      type: Object,
      default () {
        return {}
      }
    }
  }

}
</script>

<style lang="less" scoped>
.params {
  &-table {
    width: 100%;
    border-collapse: collapse;
  }

  &-info {
    width: 100%;
  }

  &-desc {
    margin-top: 12px;
    font-size: 14px;
    line-height: 1.5;
  }
}

.column {
  height: 3rem;
  border-bottom: 1px solid #ddd;
  // text-align: center;
}

.info {
  &-row {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ddd;
    &:last-child {
      border-bottom: none;
    }
  }
}

.key {
  flex: 3;
  line-height: 3rem;
}

.value {
  flex: 7;
  color: #d83993;
  line-height: 3rem;
}
</style>