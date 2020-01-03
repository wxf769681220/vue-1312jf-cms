<template>
  <div class="score-table" v-show="isScoreTable">
    <section class="score-table-header">
      <div class="content">
        <div class="content-inline justify-content-between">
          <h2>成绩公告</h2>
          <toolbars-table
            :isRefresh="false"
            @on-export="onExport"
            @on-print="onPrint"
            @on-return="hide"
          ></toolbars-table>
        </div>
      </div>
    </section>
    <section class="score-table-body">
      <div class="content">
        <div v-if="scoreReportInfo.length">
          <Table border :stripe="true" :columns="tableColumns" :data="scoreReportInfo">
            <template slot-scope="{ row }" slot="realName">
              <span>{{ getRealName(row.enrollNum) }}</span>
            </template>
            <template slot-scope="{ row }" slot="QSLJScore">
              <span>{{ QSLJScore(row.data).total }}</span>
            </template>
            <template slot-scope="{ row }" slot="SLCScore">
              <span>{{ SLCScore(row.data) }}</span>
            </template>
            <template slot-scope="{ row }" slot="JCScore">
              <span>{{ JCScore(row.data) }}</span>
            </template>
            <template slot-scope="{ row }" slot="SJSScore">
              <span>{{ SJSScore(row.data) }}</span>
            </template>
          </Table>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { Table } from 'view-design'
import ToolbarsTable from 'components/module/toolbars-table'
import { export_json_to_excel } from 'common/js/uploadExcel/Export2Excel'
import moment from 'moment'
import { mapMutations } from 'vuex'

import {
  getNameByEnrollNum,
  getQSLJScore,
  getSLCScore,
  getJCScore,
  getSJSScore
} from 'common/js/utils'

export default {
  name: 'score-table',
  props: {
    scoreReportInfo: {
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
    }
  },
  data() {
    return {
      isScoreTable: false,
      tableColumns: []
    }
  },
  computed: {},
  watch: {
    isScoreTable(val) {
      if (val) {
        this.$emit('screen-lock')
      } else {
        this.$emit('screen-free')
      }
    }
  },
  mounted() {},
  created() {
    this._initTableColumns()
  },
  methods: {
    _initTableColumns() {
      this.initColumns = [
        'rank',
        'realName',
        'enrollNum',
        'totalScore',
        'QSLJScore',
        'SLCScore',
        'JCScore',
        'SJSScore',
        'remake'
      ]
      this.tableColumns = this._getTableColumns()
    },
    _getTableColumns() {
      const tableColumnsList = {
        rank: {
          title: '名次',
          key: 'rank',
          align: 'center'
        },
        realName: {
          title: '姓名',
          align: 'center',
          slot: 'realName'
        },
        enrollNum: {
          title: '选手号',
          align: 'center',
          key: 'enrollNum'
        },
        totalScore: {
          title: '总积分',
          align: 'center',
          key: 'totalScore'
        },
        QSLJScore: {
          title: '去首累进分',
          align: 'center',
          slot: 'QSLJScore'
        },
        SLCScore: {
          title: '胜轮次',
          align: 'center',
          slot: 'SLCScore'
        },
        JCScore: {
          title: '级差分',
          align: 'center',
          slot: 'JCScore'
        },
        SJSScore: {
          title: '升级数',
          align: 'center',
          slot: 'SJSScore'
        },
        remake: {
          title: '备注',
          align: 'center',
          width: 'auto'
        }
      }
      let arr = []
      this.initColumns.forEach(col => arr.push(tableColumnsList[col]))
      return arr
    },
    getRealName(val) {
      return getNameByEnrollNum(this.playerInfo, val)
    },
    QSLJScore(data) {
      return getQSLJScore(data)
    },
    SLCScore(data) {
      return getSLCScore(data)
    },
    JCScore(data) {
      return getJCScore(data)
    },
    SJSScore(data) {
      return getSJSScore(data)
    },
    onExport() {
      let data = this._dataRefactor()
      require.ensure([], () => {
        const tHeader = ['名次', '姓名', '选手号', '总积分', '去首累进分', '胜轮次', '级差分', '升级数', '备注']
        const filterVal = ['rank', 'realName', 'enrollNum', 'totalScore', 'QSLJScore', 'SLCScore', 'JCScore', 'SJSScore', 'remake']
        const exportData = data.map(v => filterVal.map(j => v[j]))
        export_json_to_excel(tHeader, exportData, `成绩公告表${moment(new Date()).format('YYYY-MM-DD')}`)
      })
    },
    _dataRefactor() {
      if (!this.scoreReportInfo.length) {
        this.$Message.error('暂无数据!')
        return
      }
      let newData = this.scoreReportInfo
      // 数据重构
      newData.forEach((item) => {
        item.realName = this.getRealName(item.enrollNum)
        item.QSLJScore = this.QSLJScore(item.data).total
        item.SLCScore = this.SLCScore(item.data)
        item.JCScore = this.JCScore(item.data)
        item.SJSScore = this.SJSScore(item.data)
        item.remake = ''
      })
      console.log('数组重构：', newData)
      return newData
    },
    onPrint() {
      let data = this._dataRefactor()
      this.setPrintData({
        type: 'table02',
        columns: this.tableColumns,
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
      this.isScoreTable = true
    },
    hide() {
      this.isScoreTable = false
    }
  },
  components: {
    Table,
    ToolbarsTable
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
.score-table
  position: fixed
  top: 0
  right: 0
  bottom: 0
  left: 0
  z-index: 10
  background-color: $white
  overflow-y: scroll
  .score-table-header
    .content
      padding: 10px 20px
      border-bottom: 1px solid $border-color
  .score-table-body
    .content
      padding: 10px
</style>
