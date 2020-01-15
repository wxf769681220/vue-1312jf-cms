<template>
  <div class="jfcard-table" v-show="isJfcardTable">
    <section class="jfcard-table-header">
      <div class="content">
        <div class="content-inline justify-content-between">
          <h2>积分编排卡</h2>
          <toolbars-table
            :isExport="false"
            :isRefresh="false"
            @on-print="onPrint"
            @on-return="hide"
          ></toolbars-table>
        </div>
      </div>
    </section>
    <section class="jfcard-table-body">
      <div class="content">
        <table class="table" v-for="(player,index) in jsCardInfo" :key="index">
          <thead class="bg-color">
            <tr>
              <th colspan="2">{{player.enrollNum}}</th>
              <th colspan="2">姓名</th>
              <th colspan="3">{{ matchType ? getRealNameBy2(player.enrollNum) : getRealName(player.enrollNum) }}</th>
              <th colspan="3"></th>
            </tr>
            <tr>
              <th>轮次</th>
              <th>对手</th>
              <th>积分</th>
              <th>成绩</th>
              <th>去首累进分</th>
              <th>级差分</th>
              <th>备注</th>
              <th>对手团队</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in player.data" :key="index">
              <td>{{item.round}}</td>
              <td>{{item.opEnrollNum ? item.opEnrollNum : ''}}</td>
              <td>{{item.score}}</td>
              <td class="fontStyle">{{playerScore(item.upLevels)}}:{{playerScore(item.opUpLevels)}}</td>
              <td>{{QSLJScore(player.data).map[index]}}</td>
              <td>{{item.smallScore}}</td>
              <td>{{playerStatus(item.status)}}</td>
              <td></td>
            </tr>
          </tbody>
          <tfoot class="bg-color fontStyle">
            <tr>
              <td colspan="2">总计</td>
              <td>{{player.totalScore}}</td>
              <td></td>
              <td>{{QSLJScore(player.data).total}}</td>
              <td>{{JCScore(player.data)}}</td>
              <td></td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </section>
  </div>
</template>

<script>
import ToolbarsTable from 'components/module/toolbars-table'
import { mapMutations } from 'vuex'

import {
  getNameByEnrollNum,
  getPlayerStatus,
  getPlayerScore,
  getQSLJScore,
  getJCScore
} from 'common/js/utils'

export default {
  name: 'jfcard-table',
  props: {
    jsCardInfo: {
      type: Array,
      default() {
        return []
      }
    },
    playerInfo: {
      type: Array,
      default() {
        return []
      }
    },
    matchType: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      isJfcardTable: false
    }
  },
  computed: {
  },
  watch: {
    isJfcardTable(val) {
      if (val) {
        this.$emit('screen-lock')
      } else {
        this.$emit('screen-free')
      }
    }
  },
  mounted() {
    console.log('res：', this.jsCardInfo)
  },
  created() {},
  methods: {
    getRealNameBy2(enrollNum) {
      let result = this.playerInfo.filter((item) => {
        return item.enrollNum === enrollNum
      })
      return result[0].realName + ' & ' + result[1].realName
    },
    getRealName(enrollNum) {
      return getNameByEnrollNum(this.playerInfo, enrollNum)
    },
    QSLJScore(arr) {
      return getQSLJScore(arr)
    },
    JCScore(arr) {
      return getJCScore(arr)
    },
    playerScore(val) {
      return getPlayerScore(val)
    },
    playerStatus(val) {
      return getPlayerStatus(val)
    },
    _dataRefactor() {
      if (!this.jsCardInfo.length) {
        this.$Message.error('暂无数据!')
        return
      }
      let newData = this.jsCardInfo
      // 数据重构
      newData.forEach((item) => {
        if (this.matchType === 2) {
          item.realName = this.getRealNameBy2(item.enrollNum)
        } else if (this.matchType === 0) {
          item.realName = this.getRealName(item.enrollNum)
        } else {
          console.log('其他比赛类型')
        }
        item.QSLJScore = this.QSLJScore(item.data).total
        item.JCScore = this.JCScore(item.data)
        item.data.forEach((el, index) => {
          el.newCJ = this.playerScore(el.upLevels) + ':' + this.playerScore(el.opUpLevels)
          el.newStatus = this.playerStatus(el.status)
          el.newQSLJScore = this.QSLJScore(item.data).map[index]
        })
      })
      return newData
    },
    onPrint() {
      let data = this._dataRefactor()
      console.log('数组重构：', data)
      this.setPrintData({
        type: 'table03',
        data: data
      })
      this.$router.push({
        path: '/printView'
      })
    },
    ...mapMutations({
      setPrintData: 'SET_PRINT_DATA'
    }),
    show() {
      this.isJfcardTable = true
    },
    hide() {
      this.isJfcardTable = false
    }
  },
  beforedestroy() {},
  components: {
    ToolbarsTable
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
@import "~common/stylus/media.styl"
.jfcard-table
  position: fixed
  top: 0
  right: 0
  bottom: 0
  left: 0
  z-index: 10
  background-color: $white
  overflow-y: scroll
  .jfcard-table-header
    .content
      padding: 10px 20px
      border-bottom: 1px solid $border-color
  .jfcard-table-body
    .content
      display: flex
      flex-wrap: wrap
      padding-top: 10px
  .table
    text-align: center
    border: 1px solid $table-border-color
    th, td
      padding: 10px 12px
      border: 1px solid $table-border-color
    .fontStyle
      font-weight: bolder
  .bg-color
    background-color: $table-thead-bg
</style>
