<template>
  <div class="record-table" v-show="isRecordTable">
    <section class="section" v-for="(table,index) in tablesData" :key="index">
      <h2 class="mb-2 text-center">{{matchInfoBase.name}}</h2>
      <div class="content-inline justify-content-between mb-2">
        <div>
          <span>轮次：{{matchInfoBase.currentRound}}</span>
          <span class="ml-2">桌次：{{table.tableIndex + 1}}</span>
        </div>
        <div class="date">
          <span>比赛日期：{{newDate}}</span>
        </div>
      </div>
      <table class="table">
        <tr>
          <td rowspan="2">选手号</td>
          <td rowspan="2">姓名</td>
          <td rowspan="2">方位</td>
          <td colspan="9">副次</td>
          <td rowspan="2">成绩</td>
          <td colspan="3">裁判员填写</td>
        </tr>
        <tr>
          <td>1</td>
          <td>2</td>
          <td>3</td>
          <td>4</td>
          <td>5</td>
          <td>6</td>
          <td>7</td>
          <td>8</td>
          <td>9</td>
          <td>总积分</td>
          <td>级差分</td>
          <td>备注</td>
        </tr>
        <tr v-for="item in table.group" :key="item.chairIndex">
          <td class="fontStyle" v-if="item.length">{{item[0].enrollNum}}</td>
          <td v-else></td>
          <td v-if="item.length">{{_getName(item[0].enrollNum)}}</td>
          <td v-else></td>
          <td v-if="item.length">{{_chairChange(item[0].chairIndex)}}{{_chairChange(item[1].chairIndex)}}</td>
          <td v-else></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </table>
      <div class="content-inline justify-content-between mt-3">
        <div>签名（东西）：</div>
        <div>签名（南北）：</div>
        <div class="mr-120">裁判员签名：</div>
      </div>
    </section>
  </div>
</template>

<script>
import moment from 'moment'
import { chairChange } from 'common/js/utils'
import { mapGetters } from 'vuex'

export default {
  name: 'record-table',
  props: {
    tablesData: {
      type: Array,
      default() {
        return []
      }
    },
    playersInfo: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      isRecordTable: false
    }
  },
  computed: {
    ...mapGetters(['matchInfoBase']),
    newDate() {
      return moment(this.matchInfoBase.startTime).format('YYYY-MM-DD')
    }
  },
  watch: {},
  mounted() {},
  created() {},
  methods: {
    _getName(enrollNum) {
      let realName = ''
      this.playersInfo.forEach((item) => {
        if (item[0].enrollNum === enrollNum) {
          realName = item[0].realName + ' & ' + item[1].realName
        }
      })
      return realName
    },
    _getRegion(enrollNum) {
      let region = ''
      this.playersInfo.forEach((item) => {
        if (item[0].enrollNum === enrollNum) {
          region = item[0].region
        }
      })
      return region
    },
    _chairChange(val) {
      return chairChange(val)
    },
    show() {
      this.isRecordTable = true
    },
    hide() {
      this.isRecordTable = false
    }
  },
  components: {}
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
.record-table
  margin: 0 auto
  width: 1200px
  .section
    display: block
    padding: 15px 0
    font-weight: 600
    border-bottom: 1px solid $border-color
    .table
      margin-bottom: 10px
      width: 100%
      // font-size: $font-size-large
      font-weight: 600
      text-align: center
      border: 1px solid $table-border-color
      td
        padding: 10px 12px
        height: 50px
        border: 1px solid $table-border-color
  .section:last-child
    border: 0
  .mr-120
    margin-right: 120px
  .fontStyle
    font-size: $font-size-large-m
</style>
