<template>
  <div class="enroll-table" v-show="isEnrollTable">
    <section class="enroll-table-header">
      <div class="content">
        <div class="content-inline justify-content-between">
          <h2>报名表</h2>
          <toolbars-table
            :isRefresh="false"
            @on-export="onExport"
            @on-print="onPrint"
            @on-return="hide"
          ></toolbars-table>
        </div>
      </div>
    </section>
    <section class="enroll-table-body">
      <div class="content">
        <Table border :stripe="true" :columns="tableColumns" :data="playerInfo">
          <template slot-scope="{ row }" slot="isSignIn">
            <span>{{ row.isSignIn ? '已签到' : '未签到'}}</span>
          </template>
          <template slot-scope="{ row }" slot="verifyStatus">
            <span>{{ _getVerifyStatus(row.verifyStatus) }}</span>
          </template>
          <template slot-scope="{ row }" slot="status">
            <span>{{ _getPlayerStatus(row.status) }}</span>
          </template>
          <template slot-scope="{ row, column, index }" slot="action">
            <Button type="primary" size="small" @click="onModify(row, column, index)">修改</Button>
          </template>
        </Table>
      </div>
    </section>

    <!-- 修改数据 modal -->
    <enroll-modify ref="enrollModify" :data="modifyData" @enrollModifyConfirm="modifyConfirm"></enroll-modify>
  </div>
</template>

<script>
import { Table, Button } from 'view-design'
import ToolbarsTable from 'components/module/toolbars-table'
import EnrollModify from 'components/body/enroll-modify'
import { getVerifyStatus, getPlayerStatus } from 'common/js/utils'
import { export_json_to_excel } from 'common/js/uploadExcel/Export2Excel'
import moment from 'moment'
import { modifyEnrollInfo } from 'api'
import { mapMutations } from 'vuex'

export default {
  name: 'enroll-table',
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
      isEnrollTable: false,
      tableColumns: [],
      modifyData: {}
    }
  },
  computed: {},
  watch: {
    isEnrollTable(val) {
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
        'enrollNum',
        'realName',
        'idNumber',
        'phone',
        'region',
        'preparer',
        'preparerPhone',
        'userName',
        'isSignIn',
        'verifyStatus',
        'status',
        'remark',
        'action'
      ]
      this.tableColumns = this._getTableColumns()
    },
    _getTableColumns() {
      const tableColumnsList = {
        teamNo: {
          title: '队伍号',
          width: '80px',
          align: 'center',
          key: 'teamNo'
        },
        teamName: {
          title: '队伍名称',
          width: '120px',
          align: 'center',
          key: 'teamName'
        },
        enrollNum: {
          title: '选手号',
          width: '80px',
          align: 'center',
          key: 'enrollNum'
        },
        realName: {
          title: '姓名',
          width: '100px',
          align: 'center',
          key: 'realName'
        },
        idNumber: {
          title: '身份证号',
          width: '200px',
          align: 'center',
          key: 'idNumber'
        },
        phone: {
          title: '手机号',
          width: '170px',
          align: 'center',
          key: 'phone'
        },
        region: {
          title: '地区/单位',
          width: '120px',
          align: 'center',
          tooltip: true,
          resizable: true,
          key: 'region'
        },
        preparer: {
          title: '填表人',
          width: '100px',
          align: 'center',
          key: 'preparer'
        },
        preparerPhone: {
          title: '填表人电话',
          width: '170px',
          align: 'center',
          key: 'preparerPhone'
        },
        userName: {
          title: '签到人',
          width: '120px',
          align: 'center',
          key: 'userName'
        },
        isSignIn: {
          title: '签到状态',
          width: '120px',
          align: 'center',
          slot: 'isSignIn'
        },
        verifyStatus: {
          title: '审核状态',
          width: '120px',
          align: 'center',
          slot: 'verifyStatus'
        },
        status: {
          title: '状态',
          width: '120px',
          align: 'center',
          slot: 'status'
        },
        remark: {
          title: '备注',
          width: 'auto',
          align: 'center',
          tooltip: true,
          resizable: true,
          key: 'remark'
        },
        action: {
          title: '操作',
          width: '120px',
          align: 'center',
          slot: 'action'
        }
      }
      let arr = []
      this.initColumns.forEach(col => arr.push(tableColumnsList[col]))
      return arr
    },
    onExport() {
      if (!this.playerInfo.length) {
        this.$Message.error('暂无数据导出!')
        return
      }
      let newData = this.playerInfo
      require.ensure([], () => {
        const tHeader = ['选手号', '姓名', '身份证号', '手机号', '地区/单位', '填表人', '填表人电话', '签到人', '签到状态', '审核状态', '状态', '备注']
        const filterVal = ['enrollNum', 'realName', 'idNumber', 'phone', 'region', 'preparer', 'preparerPhone', 'userName', 'isSignIn', 'verifyStatus', 'status', 'remark']
        const exportData = newData.map(v => filterVal.map(j => v[j]))
        export_json_to_excel(tHeader, exportData, `报名表${moment(new Date()).format('YYYY-MM-DD')}`)
      })
    },
    onPrint() {
      this.tableColumns.pop()
      if (this.playerInfo.length) {
        this.setPrintData({
          type: 'table05',
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
    _getVerifyStatus(val) {
      return getVerifyStatus(val)
    },
    _getPlayerStatus(val) {
      return getPlayerStatus(val)
    },
    onModify(row) {
      this.modifyData = row
    },
    modifyConfirm(data, userId) {
      console.log(data)
      delete data.enrollNum
      modifyEnrollInfo(`/${userId}`, JSON.stringify(data)).then(res => {
        if (res.code === 200) {
          this.$Message.success('数据修改成功!')
          // 修改数据成功后数据重载
          this.$emit('loadData')
        }
      })
    },
    ...mapMutations({
      setPrintData: 'SET_PRINT_DATA'
    }),
    show() {
      this.isEnrollTable = true
    },
    hide() {
      this.isEnrollTable = false
    }
  },
  beforedestroy() {},
  components: {
    Table,
    Button,
    EnrollModify,
    ToolbarsTable
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
.enroll-table
  position: fixed
  top: 0
  right: 0
  bottom: 0
  left: 0
  z-index: 10
  background-color: $white
  overflow-y: scroll
  .enroll-table-header
    .content
      padding: 10px 20px
      border-bottom: 1px solid $border-color
  .enroll-table-body
    .content
      padding: 10px
</style>
