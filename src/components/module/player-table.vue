<template>
  <div class="player-table" v-show="isPlayerTable">
    <section class="player-table-header">
      <div class="content">
        <div class="content-inline justify-content-between">
          <h2>选手表</h2>
          <toolbars-table
            :isRefresh="false"
            @on-export="onExport"
            @on-print="onPrint"
            @on-return="hide"
          ></toolbars-table>
        </div>
      </div>
    </section>
    <section class="player-table-body">
      <div class="content">
        <Table border :stripe="true" :columns="tableColumns" :data="playerInfo"></Table>
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

export default {
  name: 'player-table',
  props: {
    playerInfo: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      isPlayerTable: false,
      tableColumns: []
    }
  },
  computed: {},
  watch: {
    isPlayerTable(val) {
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
      this.initTableColumns = [
        'enrollNum',
        'realName',
        'idNumber',
        'phone',
        'region',
        'preparer',
        'preparerPhone',
        'remark'
      ]
      this.tableColumns = this._getTableColumns()
    },
    _getTableColumns() {
      const tableColumnsList = {
        teamNo: {
          title: '队伍号',
          align: 'center',
          key: 'teamNo'
        },
        teamName: {
          title: '队伍名称',
          align: 'center',
          key: 'teamName'
        },
        enrollNum: {
          title: '选手号',
          align: 'center',
          key: 'enrollNum'
        },
        realName: {
          title: '姓名',
          align: 'center',
          key: 'realName'
        },
        idNumber: {
          title: '身份证号',
          align: 'center',
          key: 'idNumber'
        },
        phone: {
          title: '手机号',
          align: 'center',
          key: 'phone'
        },
        region: {
          title: '地区/单位',
          align: 'center',
          key: 'region'
        },
        preparer: {
          title: '填表人',
          align: 'center',
          key: 'preparer'
        },
        preparerPhone: {
          title: '填表人电话',
          align: 'center',
          key: 'preparerPhone'
        },
        remark: {
          title: '备注',
          align: 'center',
          key: 'remark'
        }
      }
      let arr = []
      this.initTableColumns.forEach(col => arr.push(tableColumnsList[col]))
      return arr
    },
    onExport() {
      if (!this.playerInfo.length) {
        this.$Message.error('暂无数据导出!')
        return
      }
      let newData = this.playerInfo
      require.ensure([], () => {
        const tHeader = ['选手号', '姓名', '身份证号', '手机号', '地区/单位', '填表人', '填表人电话', '备注']
        const filterVal = ['enrollNum', 'realName', 'idNumber', 'phone', 'region', 'preparer', 'preparerPhone', 'remark']
        const exportData = newData.map(v => filterVal.map(j => v[j]))
        export_json_to_excel(tHeader, exportData, `选手表${moment(new Date()).format('YYYY-MM-DD')}`)
      })
    },
    onPrint() {
      if (this.playerInfo.length) {
        this.setPrintData({
          type: 'table04',
          columns: this.tableColumns,
          data: this.playerInfo
        })
        this.$router.push({
          path: '/printView'
        })
      } else {
        this.$Message.error('无数据可打印!')
      }
    },
    ...mapMutations({
      setPrintData: 'SET_PRINT_DATA'
    }),
    show() {
      this.isPlayerTable = true
    },
    hide() {
      this.isPlayerTable = false
    }
  },
  beforedestroy() {},
  components: {
    Table,
    ToolbarsTable
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
.player-table
  position: fixed
  top: 0
  right: 0
  bottom: 0
  left: 0
  z-index: 10
  background-color: $white
  overflow-y: scroll
  .player-table-header
    .content
      padding: 10px 20px
      border-bottom: 1px solid $border-color
  .player-table-body
    .content
      padding: 10px
</style>
