<template>
  <div class="signature-table" v-show="isSignatureTable">
    <section class="signature-table-header">
      <div class="content">
        <div class="content-inline justify-content-between">
          <h2>奖励签收表</h2>
          <toolbars-table
            :isRefresh="false"
            @on-export="onExport"
            @on-print="onPrint"
            @on-return="hide"
          ></toolbars-table>
        </div>
      </div>
    </section>
    <section class="signature-table-body">
      <div class="content">
        <div class="content-inline py-3">
          <h4>设置奖励名次：</h4>
          <Input v-model="count" style="width: 120px" />
          <Button class="ml-2" type="primary" @click="onConfirm">确定</Button>
        </div>
        <div v-if="signatureInfo.length">
          <Table border :stripe="true" :columns="tableColumns" :data="signatureInfo">
            <template slot-scope="{ row, index }" slot="rank">
              <span>{{ index + 1 }}</span>
            </template>
          </Table>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { Button, Input, Table } from 'view-design'
import ToolbarsTable from 'components/module/toolbars-table'
import { export_json_to_excel } from 'common/js/uploadExcel/Export2Excel'
import moment from 'moment'
import { mapMutations } from 'vuex'

export default {
  name: 'signature-table',
  props: {
    signatureInfo: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      isSignatureTable: false,
      tableColumns: [],
      count: 0
    }
  },
  computed: {},
  watch: {
    isSignatureTable(val) {
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
        'whichBank',
        'bankCard',
        'signName',
        'contact',
        'award'
      ]
      this.tableColumns = this._getTableColumns()
    },
    _getTableColumns() {
      const tableColumnsList = {
        rank: {
          title: '名次',
          width: '80px',
          align: 'center',
          slot: 'rank'
        },
        realName: {
          title: '姓名',
          key: 'realName',
          width: '100px',
          align: 'center'
        },
        enrollNum: {
          title: '选手号',
          key: 'enrollNum',
          width: '80px',
          align: 'center'
        },
        whichBank: {
          title: '银行',
          key: 'whichBank',
          width: '300px',
          align: 'center'
        },
        bankCard: {
          title: '银行卡',
          key: 'bankCard',
          width: '200px',
          align: 'center'
        },
        signName: {
          title: '签名',
          key: 'signName',
          width: '120px',
          align: 'center'
        },
        contact: {
          title: '联系',
          key: 'contact',
          width: '160px',
          align: 'center'
        },
        award: {
          title: '奖励',
          key: 'award',
          width: 'auto',
          align: 'center'
        }
      }
      let arr = []
      this.initColumns.forEach(col => arr.push(tableColumnsList[col]))
      return arr
    },
    onConfirm() {
      this.$emit('on-confirm', this.count)
    },
    onExport() {
      if (!this.signatureInfo.length) {
        this.$Message.error('暂无数据导出!')
        return
      }
      let newData = this.signatureInfo
      // 添加一个rank属性
      newData.forEach((item, index) => {
        item.rank = index + 1
      })
      require.ensure([], () => {
        const tHeader = ['名次', '姓名', '选手号', '银行', '银行卡', '签名', '联系', '奖励']
        const filterVal = ['rank', 'realName', 'enrollNum', '', '', '', '', '']
        const exportData = newData.map(v => filterVal.map(j => v[j]))
        export_json_to_excel(tHeader, exportData, `奖励签收表${moment(new Date()).format('YYYY-MM-DD')}`)
      })
    },
    onPrint() {
      if (this.signatureInfo.length) {
        this.setPrintData({
          type: 'table01',
          columns: this.tableColumns,
          data: this.signatureInfo
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
      this.isSignatureTable = true
    },
    hide() {
      this.isSignatureTable = false
    }
  },
  beforedestroy() {},
  components: {
    Button,
    Input,
    Table,
    ToolbarsTable
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
@import '~common/stylus/media'
.signature-table
  position: fixed
  top: 0
  right: 0
  bottom: 0
  left: 0
  z-index: 10
  background-color: $white
  overflow-y: scroll
  .signature-table-header
    .content
      padding: 10px 20px
      border-bottom: 1px solid $border-color
  .signature-table-body
    .content
      padding: 10px
</style>
