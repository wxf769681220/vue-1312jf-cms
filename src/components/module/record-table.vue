<template>
  <div class="record-table">
    <section class="section" v-for="table in tablesData" :key="table.tableIndex">
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
        <tr v-for="item in table.roundRecord" :key="item.chairIndex">
          <td class="fs">{{item.enrollNum}}</td>
          <td>{{getNameByEnrollNum(item.enrollNum)}}</td>
          <td>{{chairChange(item.chairIndex)}}</td>
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
        <div>选手签名：</div>
        <div style="margin-right:120px">裁判员签名：</div>
      </div>
    </section>
  </div>
</template>

<script>
// Script
import moment from 'moment'
// Vuex
import { mapGetters } from 'vuex'

export default {
  name: 'record-table',
  props: {
    tablesData: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['matchInfoBase', 'playersInfo']),
    newDate() {
      return moment(this.matchInfoBase.startTime).format('YYYY-MM-DD')
    }
  },
  watch: {},
  mounted() {},
  created() {},
  methods: {
    chairChange(value) {
      if (typeof value !== 'number') {
        return
      }
      let str = ''
      switch (value) {
        case 0:
          str = '东'
          break
        case 1:
          str = '南'
          break
        case 2:
          str = '西'
          break
        case 3:
          str = '北'
          break
        default:
          console.log('error：', str)
      }
      return str
    },
    getNameByEnrollNum(value) {
      let name = ''
      this.playersInfo.forEach((item) => {
        if (item.enrollNum === value) {
          name = item.realName
        }
      })
      return name
    }
  },
  components: {}
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
.record-table
  .section
    display: block
    padding: 15px 0
    font-weight: 600
    border-bottom: 1px solid $border-color
    .table
      margin-bottom: 10px
      width: 100%
      font-weight: 600
      text-align: center
      border: 1px solid $table-border-color
      td
        padding: 10px 12px
        border: 1px solid $table-border-color
    .fs
      font-size: $font-size-large
</style>
