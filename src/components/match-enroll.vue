<template>
  <div class="match-enroll">
    <!-- 工具栏组件 -->
    <toolbars
      :isDrawLots="true"
      :isUpload="true"
      :isAdd="true"
      :isDelete="true"
      @upload="upload"
      @refresh="refresh"
      @addNew="addNew"
      @deleteX="deleteX"
    ></toolbars>

    <!-- 本场比赛基本信息 -->
    <match-info :matchInfoBase="matchInfoBase"></match-info>

    <!-- 生成报名表 -->
    <div class="mt-3" v-if="tableData.length">
      <Button @click="handleSelectAll(true)">全选</Button>
      <Button class="ml-2" @click="handleSelectAll(false)">取消全选</Button>
      <Table
        class="mt-3"
        border
        ref="selection"
        :stripe="true"
        :columns="tableColumns"
        :data="tableData"
        @on-select="selectedItem"
        @on-select-cancel="cancelItem"
        @on-select-all="selectedAll"
        @on-select-all-cancel="cancelAll"
      >
        <template slot-scope="{ row, column, index }" slot="action">
          <Button type="primary" size="small" @click="modify(row, column, index)">修改</Button>
          <Button class="ml-1" type="error" size="small" @click="remove(row, column, index)">删除</Button>
        </template>
      </Table>
    </div>

    <!-- 1.导入报名表 -->
    <upload-table
      ref="uploadTable"
      :matchId="matchInfoBase.id"
      :matchType="matchInfoBase.rule"
      @upload-ok="uploaded"
    ></upload-table>

    <!-- 2.新增一条数据 / 修改数据 -->
    <enroll-update
      ref="enrollUpdate"
      :operateType="operateType"
      :data="modifyData"
      @outPutData="outPutData"
      @cancel="modifyCancel"
    ></enroll-update>

    <!-- 3.删除一条或多条数据 -->
    <modal-simple ref="modalSimple" title="删除数据" @on-ok="deleteConfirm">
      <div v-if="selected.length && selected.length <= 10">
        <Table :columns="tableColumns2" :data="deleteList[0]"></Table>
      </div>
      <div v-else>
        <p><Icon class="mr-2" type="md-information-circle" color="orange"/>您确定要删除所有打钩的数据吗？</p>
      </div>
    </modal-simple>
  </div>
</template>

<script>
// Iview Components
import { Table, Button, Icon } from 'view-design'
// Module Components
import Toolbars from 'components/module/toolbars'
import MatchInfo from 'components/module/match-info'
// Body Components
import UploadTable from 'components/body/upload-table'
import EnrollUpdate from 'components/body/enroll-update'
import modalSimple from 'components/body/modal-simple'
// Script
// import qs from 'qs'
// Vuex
import { mapGetters } from 'vuex'
// API
import {
  readInEnrollInfo,
  getEnrollInfo,
  deleteEnrollInfo,
  modifyEnrollInfo
} from 'api'

export default {
  name: 'match-enroll',
  inject: ['reload'],
  props: {},
  data() {
    return {
      tableColumns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '参赛号',
          key: 'enrollNum',
          width: '80px'
        },
        {
          title: '姓名',
          key: 'realName',
          width: '100px'
        },
        {
          title: '身份证号',
          key: 'idNumber',
          width: '200px'
        },
        {
          title: '手机号',
          key: 'phone',
          width: '170px'
        },
        {
          title: '地区/单位',
          key: 'region',
          width: 'auto'
        },
        {
          title: '填表人',
          key: 'preparer',
          width: '100px'
        },
        {
          title: '填表人电话',
          key: 'preparerPhone',
          width: '170px'
        },
        {
          title: '备注',
          key: 'remark'
        },
        {
          title: '操作',
          slot: 'action',
          width: 150,
          align: 'center'
        }
      ],
      tableData: [],
      tableColumns2: [
        {
          title: 'UID',
          key: 'id'
        },
        {
          title: '参赛号',
          key: 'enrollNum'
        },
        {
          title: '姓名',
          key: 'realName'
        }
      ],
      selected: [],
      operateType: 'add',
      modifyData: {}
    }
  },
  computed: {
    ...mapGetters(['matchInfoBase', 'token']),
    deleteList() {
      let arr1 = []
      let arr2 = []
      let arr = [arr1, arr2]
      this.selected.forEach(item => {
        let obj = {
          id: item.id,
          enrollNum: item.enrollNum,
          realName: item.realName
        }
        arr1.push(obj)
        arr2.push(item.id)
      })
      return arr
    }
  },
  watch: {},
  mounted() {},
  created() {
    // console.log(this.matchInfoBase)
    this.getReadInData()
  },
  methods: {
    modify(row, column, index) {
      this.modifyData = row
      this.operateType = 'modify'
      this.addNew()
    },
    remove(row, column, index) {
      this.$refs.modalSimple.show()
      this.selected = [
        {
          id: row.id,
          enrollNum: row.enrollNum,
          realName: row.realName
        }
      ]
    },
    uploaded(data) {
      // console.log(data)
      // 报名表写入数据库之前判断是否表中有数据
      if (!data.length) {
        this.$Message.warning('报名表中无数据!')
      } else {
        this.$Message.success('导入报名表成功!')
        // 显示报名表信息
        this.tableData = data
        // 报名表信息写入数据库
        this.readInData(data)
      }
    },
    readInData(data) {
      readInEnrollInfo(
        `/${this.matchInfoBase.id}`,
        JSON.stringify({
          users: data
        })
      ).then(res => {
        // console.log(res)
        if (res.code === 200) {
          this.$Message.success('报名表写入数据库成功!')
          this.reload()
        } else {
          this.$Message.error('报名表写入数据库时失败!')
        }
      })
    },
    getReadInData() {
      // 获取已经写入数据库的报名表信息
      getEnrollInfo(`/${this.matchInfoBase.id}`).then(res => {
        // console.log(res)
        if (res.code === 200) {
          if (res.users.length) {
            this.$Message.success('获取报名表数据成功!')
            this.tableData = res.users
          } else {
            this.$Message.warning('报名表尚未导入!')
          }
        } else {
          this.$Message.error('获取报名表数据时失败!')
        }
      })
    },
    outPutData(data, type) {
      // 新增数据
      if (type === 'add') {
        let obj = {
          matchId: this.matchInfoBase.id,
          status: 0
        }
        // 数据重组
        let newData = Object.assign(data, obj)
        this.readInData(newData)
      } else if (type === 'modify') {
        // 修改数据
        this.modifyItem(data)
      }
    },
    deleteConfirm() {
      // console.log(this.deleteList[1] instanceof Array)
      // console.log(this.deleteList[1].length)
      deleteEnrollInfo(
        '',
        JSON.stringify({
          users: this.deleteList[1]
        })).then(res => {
        console.log(res)
        if (res.code === 200) {
          this.$Message.success('数据删除成功!')
          this.refresh()
        }
      })
    },
    selectedItem(value) {
      this.selected = value
    },
    cancelItem(value) {
      this.selected = value
    },
    selectedAll(value) {
      this.selected = value
    },
    cancelAll(value) {
      this.selected = value
    },
    modifyCancel() {
      this.refresh()
    },
    modifyItem(data) {
      console.log(data)
      let obj = {
        realName: data.realName,
        idNumber: data.idNumber,
        phone: data.phone,
        region: data.region,
        preparer: data.preparer,
        preparerPhone: data.preparerPhone,
        remark: data.remark
      }
      modifyEnrollInfo(
        `/${data.id}`,
        JSON.stringify(obj)).then(res => {
        console.log(res)
        if (res.code === 200) {
          this.$Message.success('数据修改成功!')
          this.refresh()
        }
      })
    },
    upload() {
      this.$refs.uploadTable.show()
    },
    addNew() {
      this.$refs.enrollUpdate.show()
    },
    deleteX() {
      if (!this.selected.length) {
        this.$Message.warning('请勾选需要删除的数据!')
        return
      }
      this.$refs.modalSimple.show()
    },
    handleSelectAll(status) {
      this.$refs.selection.selectAll(status)
    },
    refresh() {
      this.reload()
      this.$Message.success('页面已刷新!')
    }
  },
  beforedestroy() {},
  components: {
    MatchInfo,
    Toolbars,
    UploadTable,
    EnrollUpdate,
    modalSimple,
    Table,
    Button,
    Icon
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
.match-enroll
  position: relative
  margin: 20px
  padding: 20px
  background-color: $white
</style>
