<template>
  <div class="tables-list" v-show="isTablesList">
    <div class="layout-content">
      <!-- 按桌号排序-->
      <section class="box-wrap" v-if="sortBy === 0">
        <div class="box" v-for="(item,index) in tablesData" :key="index">
          <div class="row no-gutters">
            <div class="col-4 offset-4 bg-vertical">{{getEnrollNumByChair(item, 3)}}</div>
          </div>
          <div class="row no-gutters">
            <div class="col-4 bg-horizontal" >{{getEnrollNumByChair(item, 2)}}</div>
            <div class="col-4">
              <div class="circle" :class="{'bg-error': item.tableIndex !== index}">{{item.tableIndex === index ? item.tableIndex + 1 : '空'}}</div>
            </div>
            <div class="col-4 bg-horizontal">{{getEnrollNumByChair(item, 0)}}</div>
          </div>
          <div class="row no-gutters">
            <div class="col-4 offset-4 bg-vertical">{{getEnrollNumByChair(item, 1)}}</div>
          </div>
        </div>
      </section>

      <!-- 按选手号排序-->
      <section class="table-wrap" v-if="sortBy === 1">
        <table class="table" v-for="(table,index) in tablesData" :key="index">
          <thead class="bg-color">
            <tr>
              <th class="w-80">选手号</th>
              <th>姓名</th>
              <th>桌号</th>
              <th class="w-80">座位</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in table" :key="index">
              <td class="fontStyle">{{_getData(item).enrollNum}}</td>
              <td>{{_getName(_getData(item).enrollNum)}}</td>
              <td>
                <div class="circle">{{_getData(item).tableIndex}}</div>
              </td>
              <td>{{_getData(item).chairIndex}}</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  </div>
</template>

<script>
import { chairChange } from 'common/js/utils'

export default {
  name: 'tables-list',
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
    },
    sortBy: {
      type: Number,
      default: 0
    },
    matchType: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      isTablesList: false
    }
  },
  computed: {},
  watch: {
    tablesData(val) {
      console.log(val)
      console.log(this.playersInfo)
    }
  },
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
    _getData(val) {
      if (this.matchType === 0) {
        return {
          enrollNum: val.enrollNum,
          tableIndex: val.tableIndex + 1,
          chairIndex: this._chairChange(val.chairIndex)
        }
      }
      if (this.matchType === 2) {
        return {
          enrollNum: val[0].enrollNum,
          tableIndex: val[0].tableIndex + 1,
          chairIndex: this._chairChange(val[0].chairIndex) + this._chairChange(val[1].chairIndex)
        }
      }
    },
    getEnrollNumByChair(item, chairIndex) {
      let enrollNum = ''
      item.roundRecord.forEach((item) => {
        if (item.chairIndex === chairIndex) {
          enrollNum = item.enrollNum
        }
      })
      return enrollNum
    },
    _chairChange(val) {
      return chairChange(val)
    },
    show() {
      this.isTablesList = true
    },
    hide() {
      this.isTablesList = false
    }
  },
  beforedestroy() {},
  components: {}
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
@import '~common/stylus/media'
.tables-list
  .layout-content
    .box-wrap, .table-wrap
      display: flex
      flex-wrap: wrap
    .box
      flex: 0 0 15.2666%
      font-size: $font-size-large-xxl
      font-weight: bolder
      text-align: center
      border: 1px solid $table-border-color
      .row
        height: 54px
        line-height: 54px
    .table
      flex: 0 0 31.7333%
      th, td
        height: 54px
        font-size: $font-size-large-m
        font-weight: bolder
        text-align: center
        border: 1px solid $table-border-color
  .circle
    margin: 6px auto
    width: 42px
    height: 42px
    line-height: 42px
    text-align: center
    font-size: $font-size-large-xl
    color: $white
    background-color: $success-color
    border-radius: 50%
    box-shadow: 1px 2px 1px shade($success-color, 30%)
  .fontStyle
    font-size: $font-size-large-xxxl
  .w-80
    width: 80px !important
  .bg-vertical
    background-color: tint($warning-color, 5%)
  .bg-horizontal
    background-color: tint($primary-color, 5%)
  .bg-color
    background-color: $table-thead-bg
</style>
