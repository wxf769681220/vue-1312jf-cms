<template>
  <div class="match-enroll" ref="matchEnrollHook">
    <div class="layout-content">
      <!-- 工具栏 -->
      <div class="content-inline justify-content-between">
        <h2>
          {{matchInfoBase.name}}
          <Icon class="ml-3" type="ios-keypad" size="24" color="#2d8cf0" v-show="isMatchInfo" @click="showMatchInfo" />
        </h2>
        <toolbars :isUpload="true" :isAdd="true" :isDelete="true" @upload="upload" @refresh="refresh" @return="goBack" @addNew="addNew" @deleteX="deleteX"></toolbars>
      </div>

      <!--比赛基本信息 -->
      <match-info class="mt-3" ref="matchInfo" :matchInfoBase="matchInfoBase" @hideIcon="hideIcon"></match-info>

      <!-- 导入报名表 -->
      <upload-table ref="uploadTable" :matchId="matchInfoBase.id" :matchType="matchInfoBase.rule" @upload-ok="uploaded"></upload-table>

      <!-- 渲染报名表 -->
      <div class="mt-5">
        <div class="content-inline justify-content-between mb-3">
          <div>
            <Button @click="handleSelectAll(true)">全选</Button>
            <Button class="ml-2" @click="handleSelectAll(false)">取消全选</Button>
            <Button class="ml-2" type="success" :disabled="tableData.length < 4 || enoughSign || isDisabledRandomEnrollNum" @click="startMatch">开始比赛</Button>
            <Button
              class="ml-2"
              type="success"
              v-if="matchInfoBase.needSignIn"
              v-text="matchInfoBase.status === 5 ? '签到已开始' : '签到未开始'"
              :disabled="matchInfoBase.status === 5"
              @click="onSignStart"
            ></Button>
            <Button
              class="ml-2"
              type="primary"
              v-if="matchInfoBase.needSignIn"
              :disabled="isDisabledRandomEnrollNum"
              @click="onRandomEnrollNum"
            >随机分配</Button>
          </div>
          <div v-if="matchInfoBase.needSignIn">
            <Button type="warning" @click="onSignTable">签名表</Button>
            <Button class="ml-2" type="warning" @click="onEnrollVerifyTable">报名审核表</Button>
          </div>
        </div>
        <!-- 报名表 -->
        <Table
          border
          ref="selection"
          :stripe="true"
          :columns="tableColumns"
          :data="tableData"
          :row-class-name="_rowClassName"
          @on-select="selectedItem"
          @on-select-cancel="cancelItem"
          @on-select-all="selectedAll"
          @on-select-all-cancel="cancelAll"
        >
          <template slot-scope="{ row }" slot="sign">
            <span>{{ row.userName }}</span>
          </template>
          <template slot-scope="{ row, column, index }" slot="action">
            <Button
              class="mr-1"
              type="success"
              size="small"
              v-if="matchInfoBase.needSignIn"
              :disabled="row.isSignIn"
              @click="sign(row, column, index)"
            >
              {{row.isSignIn ? '已签到' : '未签到'}}
            </Button>
            <Button class="mr-1" type="primary" size="small" @click="modify(row, column, index)">修改</Button>
            <Button class="mr-1" type="error" size="small" @click="remove(row, column, index)">删除</Button>
          </template>
        </Table>
      </div>

      <!-- 签名表 -->
      <sign-table
        ref="signTable"
        :matchType="matchInfoBase.rule"
        :data="tableData"
        @screen-lock="screenLock(true)"
        @screen-free="screenLock(false)"
      ></sign-table>
      <!-- 报名审核列表 -->
      <verify-table
        ref="verifyTable"
        :matchType="matchInfoBase.rule"
        @refresh="getNewData"
        @screen-lock="screenLock(true)"
        @screen-free="screenLock(false)"
      ></verify-table>

      <!-- 新增数据 -->
      <enroll-add ref="enrollAdd" @enrollAddConfirm="enrollAddConfirm"></enroll-add>

      <!-- 修改数据 -->
      <enroll-modify ref="enrollModify" :data="modifyData" @enrollModifyConfirm="enrollModifyConfirm"></enroll-modify>

      <!-- 删除数据 -->
      <modal class-name="vertical-center-modal" title="删除数据" v-model="modalDelete" @on-ok="deleteConfirm" @on-cancel="onDeleteCancel">
        <div v-if="selected.length && selected.length <= 10">
          <Table :columns="tableColumns2" :data="deleteList[0]"></Table>
        </div>
        <div v-if="selected.length > 10">
          <p>
            <Icon class="mr-2" type="md-information-circle" color="orange" />您确定要删除所有打钩的数据吗？
          </p>
        </div>
      </modal>

      <!-- 签到 -->
      <modal class="signer" class-name="vertical-center-modal" title="签到信息" v-model="modalSign" @on-ok="signConfirm" @on-cancel="signCancel">
        <div class="content-inline py-1">
          <span class="lab">选手：</span>
          <span>{{signInfo.realName}}</span>
        </div>
        <div class="content-inline py-1">
          <label class="lab" for="inputControlSign">签到人：</label>
          <input class="input-control px-1" id="inputControlSign" type="text" v-model="signInfo.signName" style="width: 120px">
        </div>
      </modal>

      <!-- 随机分配 -->
      <modal class-name="vertical-center-modal" title="随机分配" v-model="modalRandomEnrollNum" @on-ok="randomEnrollNumConfirm">
        <p>随机分配会重新分配选手号, 是否确认?</p>
      </modal>

      <!-- 开始比赛 -->
      <modal class-name="vertical-center-modal" title="设置比赛规则" v-model="modalStartMatch" footer-hide @on-cancel="startMatchCancel">
        <div class="content-inline">
          <span>积分编排：</span>
          <InputNumber :max="10" :min="1" v-model="matchRules.totalRounds"></InputNumber>
          <span class="ml-2">轮</span>
        </div>
        <div class="content-inline mt-3">
          <span>首轮编排：</span>
          <RadioGroup class="radio-group" v-model="newFirstRound">
            <Radio label="0">随机</Radio>
            <Radio label="1">首尾</Radio>
            <Radio label="2">顺序</Radio>
          </RadioGroup>
        </div>
        <div class="content-inline mt-3">
          <span>同地区不相遇：</span>
          <i-switch size="large" true-color="#13ce66" false-color="#ff4949" v-model="matchRules.sameArea">
            <span slot="open">开启</span>
            <span slot="close">关闭</span>
          </i-switch>
        </div>
        <div class="content-inline mt-3" v-if="matchRules.sameArea">
          <span>轮次区间：</span>
          <InputNumber :max="10" :min="1" v-model="matchRules.startRound"></InputNumber>
          <span class="mx-3">-</span>
          <InputNumber :max="10" :min="1" v-model="matchRules.endRound"></InputNumber>
        </div>
        <p class="text-error my-3" v-if="errorsMsg" v-text="errorsMsg"></p>
        <div class="pt-3 mt-3" style="border-top:1px solid #e8eaec">
          <Button class="btn-match-start" type="success" size="large" :disabled="matchRules.sameArea ? !matchRules.totalRounds || !matchRules.startRound || !matchRules.endRound : matchRules.sameArea" @click="startMatchConfirm">开始比赛</Button>
        </div>
      </modal>
    </div>
  </div>
</template>

<script>
import { Table, Button, Icon, modal, InputNumber, RadioGroup, Radio } from 'view-design'
import Toolbars from 'components/module/toolbars'
import MatchInfo from 'components/module/match-info'
import SignTable from 'components/module/sign-table'
import VerifyTable from 'components/module/verify-table'
import UploadTable from 'components/body/upload-table'
import EnrollAdd from 'components/body/enroll-add'
import EnrollModify from 'components/body/enroll-modify'
import { getVerifyStatus } from 'common/js/utils'
import { arraySubGroup, screenLock } from 'common/js/lib'
import { mapGetters, mapMutations } from 'vuex'
import {
  readInEnrollInfo,
  getEnrollInfo,
  deleteEnrollInfo,
  modifyEnrollInfo,
  setMatchRules,
  matchStart,
  signIn,
  randomEnrollNum,
  getMatch,
  signStart
} from 'api'

export default {
  name: 'match-enroll',
  inject: ['reload'],
  data() {
    return {
      tableColumns: [],
      tableData: [],
      tableColumns2: [
        {
          title: 'UID',
          key: 'id'
        },
        {
          title: '选手号',
          key: 'enrollNum'
        },
        {
          title: '姓名',
          key: 'realName'
        }
      ],
      selected: [],
      modifyData: {},
      signInfo: {
        usersId: 0,
        signName: '',
        realName: '',
        enrollNum: 0
      },
      modalStartMatch: false,
      matchRules: {
        totalRounds: 1,
        firstRound: 0, // 0:随机 / 1：首尾 / 2：顺序
        sameArea: false,
        startRound: 1,
        endRound: 1
      },
      errorsMsg: '',
      modalRandomEnrollNum: false,
      modalDelete: false,
      modalSign: false,
      modalEnrollVerify: false,
      isMatchInfo: false
    }
  },
  computed: {
    ...mapGetters(['matchInfoBase']),
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
    },
    newFirstRound: {
      get() {
        return String(this.matchRules.firstRound)
      },
      set(value) {
        this.matchRules.firstRound = Number(value)
      }
    },
    enoughSign() {
      let disabled = false
      // 若开启签到功能, 低于4个签到不能开赛
      if (this.matchInfoBase.needSignIn) {
        let arr = this.tableData.filter(item => {
          return item.isSignIn === true
        })
        if (arr.length < 4) {
          disabled = true
        }
      } else {
        disabled = false
      }
      return disabled
    },
    isDisabledRandomEnrollNum() {
      let sign = false
      let arr = this.tableData.filter(item => {
        return item.isSignIn === true
      })
      // 根据比赛类型设置随机分配规则
      switch (this.matchInfoBase.rule) {
        case 0:
          // 单人赛
          if (!arr.length) {
            sign = true
          }
          break
        case 2:
          // 双人赛至少有两条签到信息，才可进行随机分配操作
          if (arr.length < 4) {
            sign = true
          } else {
            // 若签到条数为奇数
            if (arr.length % 2 !== 0) {
              sign = true
            } else {
              // 由于数据的特殊性，可将数组分为2组, 若同一组数据选手号不相同则可操作随机分配
              let newArr = arraySubGroup(arr, 2)
              let result = newArr.every(item => {
                return item[0].enrollNum === item[1].enrollNum
              })
              if (!result) {
                sign = true
              }
            }
          }
          break
        case 1:
          // 团体赛至少有4条签到信息，才可进行随机分配操作
          if (arr.length < 8) {
            sign = true
          } else {
            // 若签到条数为奇数
            if (arr.length % 4 !== 0) {
              sign = true
            } else {
              // 由于数据的特殊性，可将数组分为4组, 若同一组数据选手号不相同则可操作随机分配
              let newArr = arraySubGroup(arr, 4)
              let result = newArr.every(item => {
                return (
                  item[0].teamNo === item[1].teamNo &&
                  item[1].teamNo === item[2].teamNo &&
                  item[2].teamNo === item[3].teamNo
                )
              })
              if (!result) {
                sign = true
              }
            }
          }
          break
        default:
        // ...
      }
      return sign
    }
  },
  watch: {
    'matchRules.sameArea'(value) {
      if (!value) {
        this.errorsMsg = ''
      }
    }
  },
  mounted() {
    console.log('创建比赛信息：', this.matchInfoBase)
  },
  created() {
    this._initTableColumns()
    // 从报名表中获取信息
    this.getReadInData()
  },
  methods: {
    // 1.获取本场比赛基本信息
    ...mapMutations({
      setMatchInfoBase: 'SET_MATCH_INFO_BASE'
    }),
    // 1.初始化表头
    _initTableColumns() {
      this.initColumns = [
        'selection',
        'teamNo',
        'teamName',
        'enrollNum',
        'realName',
        'idNumber',
        'phone',
        'region',
        'preparer',
        'preparerPhone',
        'remark',
        'sign',
        'action'
      ]
      // 单人或双人赛不显示队伍信息
      if (this.matchInfoBase.rule === 0 || this.matchInfoBase.rule === 2) {
        this.initColumns.forEach((item, index) => {
          if (item === 'teamNo') {
            this.initColumns.splice(index, 1)
          }
        })
        this.initColumns.forEach((item, index) => {
          if (item === 'teamName') {
            this.initColumns.splice(index, 1)
          }
        })
      }
      // 签到关闭
      if (!this.matchInfoBase.needSignIn) {
        this.initColumns.forEach((item, index) => {
          if (item === 'sign') {
            this.initColumns.splice(index, 1)
          }
        })
      }
      console.log('初始化表头：', this.initColumns)
      this.tableColumns = this._getTableColumns()
    },
    // 2.初始化表头数据
    _getTableColumns() {
      const tableColumnsList = {
        selection: {
          type: 'selection',
          width: 60
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
        remark: {
          title: '备注',
          key: 'remark',
          width: '100px',
          resizable: true,
          tooltip: true
        },
        sign: {
          title: '签到人',
          slot: 'sign',
          width: '140px'
        },
        action: {
          title: '操作',
          slot: 'action',
          width: 'auto'
        }
      }
      let data = []
      this.initColumns.forEach(col => data.push(tableColumnsList[col]))
      return data
    },
    // 2.获取本场比赛基本信息
    _getMatchById() {
      getMatch(`/${this.matchInfoBase.id}`).then(res => {
        if (res.code === 200) {
          let data = res.match
          this.setMatchInfoBase(data)
        }
      })
    },
    // 导入excel报名表
    upload() {
      this.$refs.uploadTable.show()
    },
    // 获取excel报名表数据
    uploaded(excelData, fileName) {
      if (fileName === '单人赛报名表.xlsx') {
        this.fileType = 0
      } else if (fileName === '双人赛报名表.xlsx') {
        this.fileType = 2
      } else if (fileName === '团体赛报名表.xlsx') {
        this.fileType = 1
      } else {
        this.$Message.error({
          duration: 5,
          content: '请上传指定赛事类型报名表!'
        })
        return
      }
      if (this.matchInfoBase.rule !== this.fileType) {
        this.$Message.error({
          duration: 5,
          content: '您所上传的报名表模板与当前比赛类型不匹配，请重新上传!'
        })
      } else {
        this.$Message.success('导入报名表成功!')
        // 显示报名表信息
        this.tableData = excelData
        // 报名表信息写入数据库
        this.readInData(excelData)
        this.reload()
      }
    },
    // excel报名表数据写入数据库
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
          this.getReadInData()
        }
      })
    },
    // 获取已经写入数据库的excel报名表信息
    getReadInData() {
      getEnrollInfo(`/${this.matchInfoBase.id}`).then(res => {
        console.log('获取数据库中的excel报名表信息：', res)
        if (res.code === 200) {
          this.tableData = res.users
        }
      })
    },
    // 确认签到
    onSignStart() {
      signStart('', {
        matchId: this.matchInfoBase.id
      }).then(res => {
        console.log('签到开始：', res)
        if (res.code === 200) {
          this.$Message.success('签到已开始!')
          // 重置2 vuex SET_MATCH_INFO_BASE
          this._getMatchById()
        }
      })
    },
    onSignTable() {
      this.$refs.signTable.show()
    },
    signCancel() {
      this.signInfo.signName = ''
    },
    sign(row, column, index) {
      console.log(row)
      if (this.matchInfoBase.status !== 5) {
        this.$Message.error('签到尚未开始，无法进行此项操作!')
        return
      }
      this.signInfo.usersId = row.id
      this.signInfo.enrollNum = row.enrollNum
      this.signInfo.realName = row.realName
      this.modalSign = true
    },
    signConfirm() {
      signIn('', {
        id: this.signInfo.usersId,
        userName: this.signInfo.signName,
        matchId: this.matchInfoBase.id
      }).then(res => {
        console.log('签到：', res)
        if (res.code === 200) {
          this.$Message.success('签到成功!')
          this.signInfo.signName = ''
          this.getReadInData()
        }
      })
    },
    // 选手号随机分配
    onRandomEnrollNum() {
      this.modalRandomEnrollNum = true
    },
    randomEnrollNumConfirm() {
      randomEnrollNum(`/${this.matchInfoBase.id}`).then(res => {
        console.log(res)
        if (res.code === 200) {
          this.$Message.success('选手号随机分配成功!')
          // 数据重载
          this.getReadInData()
        }
      })
    },
    // 报名审核列表
    onEnrollVerifyTable() {
      this.$refs.verifyTable.show()
    },
    _verifyStatus(val) {
      return getVerifyStatus(val)
    },
    getNewData() {
      this.getReadInData()
    },
    // 新增数据
    addNew() {
      this.$refs.enrollAdd.show()
    },
    enrollAddConfirm(data) {
      data.matchId = this.matchInfoBase.id
      data.status = 0
      let arr = [data]
      this.readInData(arr)
      this.$refs.enrollAdd.hide()
    },
    // 删除数据
    deleteX() {
      if (!this.tableData.length) {
        this.$Message.warning('请先导入数据,再进行操作!')
        return
      }
      if (!this.selected.length) {
        this.$Message.warning('请勾选需要删除的数据!')
        return
      }
      this.modalDelete = true
    },
    remove(row, column, index) {
      this.handleSelectAll(false)
      this.modalDelete = true
      this.selected = [
        {
          id: row.id,
          enrollNum: row.enrollNum,
          realName: row.realName
        }
      ]
    },
    deleteConfirm() {
      deleteEnrollInfo('', {
        users: this.deleteList[1]
      }).then(res => {
        console.log(res)
        if (res.code === 200) {
          this.$Message.success('数据删除成功!')
          this.getReadInData()
          // 删除数据成功后审核表数据需要重新载入
          this.$refs.verifyTable.getEnrollInfoFromMobile()
        }
      })
    },
    onDeleteCancel() {
      this.handleSelectAll(false)
    },
    // 修改数据
    modify(row, column, index) {
      this.modifyData = row
      console.log('修改数据：', this.modifyData)
      this.$refs.enrollModify.show()
    },
    enrollModifyConfirm(data, userId) {
      delete data.enrollNum
      console.log('确定修改数据：', data)
      modifyEnrollInfo(`/${userId}`, JSON.stringify(data)).then(res => {
        if (res.code === 200) {
          this.$Message.success('数据修改成功!')
          this.getReadInData()
          // 修改数据成功后审核表数据需要重新载入
          this.$refs.verifyTable.getEnrollInfoFromMobile()
        }
      })
      this.$refs.enrollModify.hide()
    },
    // 确认比赛
    startMatch() {
      this.modalStartMatch = true
    },
    _initMatchRules() {
      this.matchRules.totalRounds = 1
      this.matchRules.firstRound = 0
      this.matchRules.sameArea = false
      this.matchRules.startRound = 1
      this.matchRules.endRound = 1
    },
    startMatchConfirm() {
      // 若不开启同地区不相遇规则，则默认为0 0
      if (this.matchRules.sameArea) {
        if (this.matchRules.startRound > this.matchRules.endRound) {
          this.errorsMsg = '错误提示：结束轮必须大于等于开始轮!'
          return
        }
        if (this.matchRules.endRound > this.matchRules.totalRounds) {
          this.errorsMsg = '错误提示：结束轮必须小于等于总轮数!'
          return
        }
      } else {
        this.matchRules.startRound = 0
        this.matchRules.endRound = 0
      }
      setMatchRules(`/${this.matchInfoBase.id}`, {
        rounds: this.matchRules.totalRounds,
        firstRoundRule: this.matchRules.firstRound,
        aviodSameRegion: [this.matchRules.startRound, this.matchRules.endRound]
      }).then(res => {
        // console.log(res)
        if (res.code === 200) {
          this.$Message.success('比赛规则设置成功!比赛即将开始...')
          this._matchStart()
        }
      })
    },
    _matchStart() {
      matchStart(`/${this.matchInfoBase.id}`).then(res => {
        // console.log(res)
        if (res.code === 200) {
          this.$Message.success('比赛已经开始了!')
          this.modalStartMatch = false
          // 重置1 vuex SET_MATCH_INFO_BASE
          this._getMatchById()
          // 延迟跳转,确保vuex中matchInfoBase状态已更新
          this.timer = setTimeout(() => {
            this.$router.push({
              path: `/home/match-entry/${this.matchInfoBase.id}`
            })
          }, 1000)
        }
      })
    },
    startMatchCancel() {
      this._initMatchRules()
    },
    // 锁屏 & 释放屏幕
    screenLock(lock) {
      this.$nextTick(() => {
        return screenLock(lock, this.$refs.matchEnrollHook)
      })
    },
    // html元素状态管理
    showMatchInfo() {
      this.isMatchInfo = false
      this.$refs.matchInfo.show()
    },
    hideIcon() {
      this.isMatchInfo = true
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
      if (row.isSignIn) {
        return 'sign'
      }
    },
    // 返回上一步
    goBack() {
      this.$router.go(-1)
    },
    // 页面刷新
    refresh() {
      this.reload()
    }
  },
  beforeDestroy() {
    this.timer = null
  },
  components: {
    MatchInfo,
    Toolbars,
    UploadTable,
    EnrollAdd,
    EnrollModify,
    SignTable,
    VerifyTable,
    Table,
    Button,
    Icon,
    modal,
    InputNumber,
    RadioGroup,
    Radio
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
.match-enroll
  position: relative
  margin: 0 20px
  padding-top: 64px
  background-color: $white
  .layout-content
    padding: 20px
    border-top: 20px solid $body-bg-color
  .match-info
    margin-top: 20px
  .input-group
    display: flex
    align-items: center
    .lab
      flex: 0 0 80px
    .input-control
      flex: 1 1 auto
  >>>.ivu-table
    td, th
      text-align: center
    .sign td
      color: $white
      background-color: $success-color
</style>
