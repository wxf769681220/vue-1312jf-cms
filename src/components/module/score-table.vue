<template>
  <div class="score-table" v-show="isScoreTable">
    <section class="score-table-header">
      <div class="content">
        <div class="content-inline justify-content-between">
          <h2>成绩公告</h2>
          <div class="content-inline">
            <Button class="mr-2" type="success" size="large" @click="onSortByRegion">按地区/单位</Button>
            <toolbars-table
              :isRefresh="false"
              @on-export="onExport"
              @on-print="onPrint"
              @on-return="hide"
            ></toolbars-table>
          </div>
        </div>
      </div>
    </section>
    <section class="score-table-body">
      <div class="content">
        <div v-if="scoreReportInfo.length">
          <Table border :stripe="true" :columns="tableColumns" :data="scoreReportInfo">
            <template slot-scope="{ row }" slot="realName">
              <span>{{ matchType ? getRealNameBy2(row.enrollNum) : getRealName(row.enrollNum) }}</span>
            </template>
            <template slot-scope="{ row }" slot="region">
              <span>{{ getRegion(row.enrollNum) }}</span>
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
            <template slot-scope="{ row }" slot="remake">
              <span>{{ getStatus(row.status) }}</span>
            </template>
          </Table>
        </div>
      </div>
    </section>
    <section v-if="isRegion">
      <div class="region-rank">
          <Table border :stripe="true" :columns="regionTableColumns" :data="regionData">
            <template slot-scope="{ index }" slot="rank">
              <span>{{ index + 1}}</span>
            </template>
            <template slot-scope="{ row }" slot="status">
              <span>{{ getStatus(row.status) }}</span>
            </template>
          </Table>
      </div>
    </section>
  <!-- 按地区/单位 -->
    <Modal
      v-model="modalSortByRegion"
      class-name="vertical-center-modal"
      @on-ok="onConfirm"
      @on-cancel="onCancel"
    >
      <p slot="header">按地区/单位排名</p>
      <div class="content-inline">
        <span>选取前</span>
        <InputNumber class="mx-2" :max="9999" :min="1" v-model="selectRank"></InputNumber>
        <span>进行排名</span>
      </div>
    </Modal>
  </div>
</template>

<script>
import { Button, Table, Modal, InputNumber } from 'view-design'
import ToolbarsTable from 'components/module/toolbars-table'
import { export_json_to_excel } from 'common/js/uploadExcel/Export2Excel'
import moment from 'moment'
import { mapMutations } from 'vuex'
import {
  getNameByEnrollNum,
  getQSLJScore,
  getSLCScore,
  getJCScore,
  getSJSScore,
  getPlayerStatus
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
    },
    matchType: {
      type: Number,
      default: 0
    },
    regionData: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      isScoreTable: false,
      modalSortByRegion: false,
      selectRank: 1,
      tableColumns: [],
      regionTableColumns: [
        {
          title: '名次',
          slot: 'rank'
        },
        {
          title: '地区/单位',
          key: 'region'
        },
        {
          title: '总积分',
          key: 'totalScore'
        },
        {
          title: '去首累进分',
          key: 'qsljf'
        },
        {
          title: '胜轮次',
          key: 'slc'
        },
        {
          title: '级差分',
          key: 'jcf'
        },
        {
          title: '升级数',
          key: 'sjs'
        },
        {
          title: '备注',
          slot: 'status'
        }
      ]
    }
  },
  computed: {
    isRegion() {
      return Boolean(this.regionData.length)
    }
  },
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
        'region',
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
          width: '80px',
          key: 'rank',
          align: 'center'
        },
        realName: {
          title: '姓名',
          align: 'center',
          width: '160px',
          slot: 'realName'
        },
        region: {
          title: '地区/单位',
          align: 'center',
          width: '160px',
          slot: 'region'
        },
        enrollNum: {
          title: '选手号',
          align: 'center',
          width: '100px',
          key: 'enrollNum'
        },
        totalScore: {
          title: '总积分',
          align: 'center',
          width: '120px',
          key: 'totalScore'
        },
        QSLJScore: {
          title: '去首累进分',
          width: '120px',
          align: 'center',
          slot: 'QSLJScore'
        },
        SLCScore: {
          title: '胜轮次',
          align: 'center',
          width: '120px',
          slot: 'SLCScore'
        },
        JCScore: {
          title: '级差分',
          align: 'center',
          width: '120px',
          slot: 'JCScore'
        },
        SJSScore: {
          title: '升级数',
          align: 'center',
          width: '120px',
          slot: 'SJSScore'
        },
        remake: {
          title: '备注',
          align: 'center',
          width: 'auto',
          slot: 'remake'
        }
      }
      let arr = []
      this.initColumns.forEach(col => arr.push(tableColumnsList[col]))
      return arr
    },
    onSortByRegion() {
      this.modalSortByRegion = true
    },
    onConfirm() {
      this.$emit('on-confirm', this.selectRank)
    },
    onCancel() {},
    getRealNameBy2(enrollNum) {
      let result = this.playerInfo.filter((item) => {
        return item.enrollNum === enrollNum
      })
      return result[0].realName + ' & ' + result[1].realName
    },
    getRealName(val) {
      return getNameByEnrollNum(this.playerInfo, val)
    },
    getRegion(enrollNum) {
      // console.log(enrollNum)
      let result = this.playerInfo.filter((item) => {
        return item.enrollNum === enrollNum
      })
      return result[0].region
    },
    getStatus(val) {
      return getPlayerStatus(val)
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
        const tHeader = ['名次', '姓名', '地区/单位', '选手号', '总积分', '去首累进分', '胜轮次', '级差分', '升级数', '备注']
        const filterVal = ['rank', 'realName', 'region', 'enrollNum', 'totalScore', 'QSLJScore', 'SLCScore', 'JCScore', 'SJSScore', 'remake']
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
        item.region = this.getRegion(item.enrollNum)
        item.QSLJScore = this.QSLJScore(item.data).total
        item.SLCScore = this.SLCScore(item.data)
        item.JCScore = this.JCScore(item.data)
        item.SJSScore = this.SJSScore(item.data)
        item.remake = this.getStatus(item.status)
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
    ToolbarsTable,
    Button,
    Modal,
    InputNumber
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
  .region-rank
    position: fixed
    top: 61px
    right: 0
    bottom: 0
    left: 0
    z-index: 99
    background-color: $white
</style>
