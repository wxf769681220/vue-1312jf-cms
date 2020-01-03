<template>
  <div class="verify-table" v-show="verifyTable">
    <section class="verify-table-header">
      <div class="content">
        <div class="content-inline justify-content-between">
          <h2>报名审核表</h2>
          <toolbars-table
            :isExport="false"
            :isPrint="false"
            @on-refresh="getEnrollInfoFromMobile"
            @on-return="hide"
          ></toolbars-table>
        </div>
      </div>
    </section>

    <section class="verify-table-body">
      <div class="content">
        <div class="py-3">
          <Button @click="handleSelectAll(true)">全选</Button>
          <Button class="ml-2" @click="handleSelectAll(false)">取消全选</Button>
          <Button class="ml-2" type="primary" @click="onEnrollVerify">开始审核</Button>
        </div>
        <Table
          border
          ref="selection"
          :columns="tableColumns"
          :data="tableData"
          :row-class-name="_rowClassName"
          @on-select="selectedItem"
          @on-select-cancel="cancelItem"
          @on-select-all="selectedAll"
          @on-select-all-cancel="cancelAll"
        >
          <template slot-scope="{ row }" slot="sign" style="width: 0 !important">
            <span>{{ row.userName }}</span>
          </template>
          <template slot-scope="{ row }" slot="verifyStatus">
            <span>{{ _verifyStatus(row.verifyStatus) }}</span>
          </template>
        </Table>
      </div>
    </section>

    <modal
      class-name="vertical-center-modal"
      title="报名审核"
      v-model="modalEnrollVerify"
      @on-ok="enrollVerifyConfirm"
      @on-cancel="enrollVerifyCancel"
    >
      <div>
        <h4 class="mb-3">对所有打钩的选手进行以下操作：</h4>
        <RadioGroup v-model="selectedVerifyItem" size="large">
          <Radio label="0" border>通过</Radio>
          <Radio label="2" border>拒绝</Radio>
        </RadioGroup>
      </div>
    </modal>
  </div>
</template>

<script>
import { Table, Button, Modal, RadioGroup, Radio } from 'view-design'
import ToolbarsTable from 'components/module/toolbars-table'
import { getVerifyStatus } from 'common/js/utils'
import { getEnrollInfoFromMobile, verifyPlayerStatus } from 'api'
import { mapGetters } from 'vuex'

export default {
  name: 'verify-table',
  props: {},
  data() {
    return {
      verifyTable: false,
      tableColumns: [],
      tableData: [],
      selected: [],
      modalEnrollVerify: false,
      selectedVerifyItem: 1 // 0: 通过 1: 未审核 2：不通过
    }
  },
  computed: {
    ...mapGetters(['matchInfoBase'])
  },
  watch: {
    verifyTable(val) {
      if (val) {
        this.$emit('screen-lock')
      } else {
        this.$emit('screen-free')
      }
    }
  },
  created() {
    this._initTableColumns()
    this.getEnrollInfoFromMobile()
  },
  methods: {
    _initTableColumns() {
      this.initColumns = [
        'selection',
        'enrollNum',
        'realName',
        'idNumber',
        'phone',
        'region',
        'preparer',
        'preparerPhone',
        'sign',
        'verifyStatus',
        'remark'
      ]
      this.tableColumns = this._getTableColumns()
    },
    _getTableColumns() {
      const tableColumnsList = {
        selection: {
          type: 'selection',
          width: '60px'
        },
        teamNo: {
          title: '队伍号',
          key: 'teamNo',
          width: '80px'
        },
        teamName: {
          title: '队伍名称',
          key: 'teamName',
          width: '120px',
          tooltip: true,
          resizable: true
        },
        enrollNum: {
          title: '选手号',
          key: 'enrollNum',
          width: '80px'
        },
        realName: {
          title: '姓名',
          key: 'realName',
          width: '100px'
        },
        idNumber: {
          title: '身份证号',
          key: 'idNumber',
          width: '200px'
        },
        phone: {
          title: '手机号',
          key: 'phone',
          width: '170px'
        },
        region: {
          title: '地区/单位',
          key: 'region',
          width: '120px',
          tooltip: true,
          resizable: true
        },
        preparer: {
          title: '填表人',
          key: 'preparer',
          width: '100px'
        },
        preparerPhone: {
          title: '填表人电话',
          key: 'preparerPhone',
          width: '170px'
        },
        sign: {
          title: '签到人',
          slot: 'sign',
          width: '140px'
        },
        verifyStatus: {
          title: '审核状态',
          slot: 'verifyStatus',
          width: '120px'
        },
        remark: {
          title: '备注',
          key: 'remark',
          width: 'auto',
          resizable: true,
          tooltip: true
        }
      }
      let data = []
      this.initColumns.forEach(col => data.push(tableColumnsList[col]))
      return data
    },
    // 获取手机端报名表数据
    getEnrollInfoFromMobile() {
      getEnrollInfoFromMobile('', {
        matchId: this.matchInfoBase.id
      }).then(res => {
        console.log('手机端报名表数据：', res)
        if (res.code === 200) {
          if (!res.verifyList.length) {
            return
          }
          this.tableData = res.verifyList
        }
      })
    },
    // 开启验证弹窗
    onEnrollVerify() {
      console.log('被选中项：', this.selected)
      if (!this.selected.length) {
        this.$Message.warning('请勾选需要操作的数据!')
        return
      }
      this.modalEnrollVerify = true
    },
    // 审核确认
    enrollVerifyConfirm() {
      let arr = []
      this.selected.forEach(item => {
        arr.push(item.id)
      })
      if (this.selectedVerifyItem !== 1) {
        verifyPlayerStatus('', {
          users: arr,
          pass: Number(this.selectedVerifyItem) // 0：审核通过 2：拒绝
        }).then(res => {
          console.log(res)
          if (res.code === 200) {
            this.$Message.success('审核成功!')
            this.getEnrollInfoFromMobile()
            this.$emit('refresh')
          }
        })
        this._initData()
      }
    },
    // 取消操作
    enrollVerifyCancel() {
      this.handleSelectAll(false)
      this._initData()
    },
    // 状态
    _initData() {
      this.selectedVerifyItem = 1
      this.selected = []
    },
    _verifyStatus(val) {
      return getVerifyStatus(val)
    },
    selectedAll(value) {
      this.selected = value
    },
    selectedItem(value) {
      this.selected = value
    },
    cancelAll(value) {
      this.selected = value
    },
    cancelItem(value) {
      this.selected = value
    },
    handleSelectAll(status) {
      this.$refs.selection.selectAll(status)
    },
    _rowClassName(row) {
      if (row.verifyStatus === 0) {
        return 'success'
      } else if (row.verifyStatus === 2) {
        return 'error'
      } else {
        // console.log('未审核状态!')
      }
    },
    hide() {
      this.verifyTable = false
    },
    show() {
      this.verifyTable = true
    }
  },
  components: {
    Table,
    Button,
    Modal,
    RadioGroup,
    Radio,
    ToolbarsTable
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
@import '~common/stylus/media'
.verify-table
  position: fixed
  top: 0
  right: 0
  bottom: 0
  left: 0
  z-index: 10
  background-color: $white
  overflow-y: scroll
  .verify-table-header
    .content
      padding: 10px 20px
      border-bottom: 1px solid $border-color
  .verify-table-body
    padding: 10px
    .content
      >>>.ivu-table
        .success td
          color: $white
          background-color: $success-color
        .error td
          color: $white
          background-color: $error-color
</style>
