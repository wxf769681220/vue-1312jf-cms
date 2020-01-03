<template>
  <div class="current-round">
    <div class="current-round-header">
      <div class="content">
        <div class="content-inline justify-content-between">
          <h2>{{pageTitle}}</h2>
          <div class="content-inline">
            <ButtonGroup v-if="content === 'tables'">
              <Button type="error" size="large" @click="onSeatChange">换座</Button>
              <Button type="success" size="large" @click="onTablesSort">排序</Button>
            </ButtonGroup>
            <toolbars-table class="ml-2" :isExport="false" @on-return="onReturn" @on-print="onPrint"></toolbars-table>
          </div>
        </div>
      </div>
    </div>
    <div class="current-round-body">
      <div class="content">
        <!-- 本轮桌次 -->
        <tables-list ref="tablesHook" :tablesData="tablesData" :sortBy="sortBy" :matchType="matchInfoBase.rule" :playersInfo="users"></tables-list>

        <!-- 本轮成绩 -->
        <rounds-score ref="scoreHook" :scoreData="scoreData" :playersInfo="users"></rounds-score>

        <!-- 比赛记录表 -->
        <record-table ref="recordTableHook" :tablesData="recordData" :playersInfo="users"></record-table>

        <!-- 成绩录入 -->
        <score-entering ref="scoreEnteringHook" :tablesData="tablesData" :scoreData="scoreData" :highlightTbales="highlightTbales" @on-ok="getScoreData"></score-entering>

      </div>
    </div>

    <!-- 换座 -->
    <modal class-name="vertical-center-modal" title="换座" v-model="modalSeatChange" @on-ok="seatChangeConfirm" @on-cancel="seatChangeCancel">
      <div class="content-inline" style="width: 290px;margin: 0 auto">
        <div>
          <InputNumber class="block" size="large" :max="9999" :min="1" v-model="playerA" placeholder="选手号A" style="width:100px"></InputNumber>
          <InputNumber class="block mt-2" size="large" placeholder="队伍号A" style="width:100px" v-model="teamNoA" v-if="matchInfoBase.rule === 1" :max="9999" :min="1"></InputNumber>
        </div>
        <Icon class="mx-4" type="md-swap" size="42" />
        <div>
          <InputNumber class="block" size="large" :max="9999" :min="1" v-model="playerB" placeholder="选手号B" style="width:100px"></InputNumber>
          <InputNumber class="block mt-2" size="large" placeholder="队伍号A" style="width:100px" v-model="teamNoB" v-if="matchInfoBase.rule === 1" :max="9999" :min="1"></InputNumber>
        </div>
      </div>
    </modal>

    <!-- 排序 -->
    <modal class-name="vertical-center-modal" title="排序" v-model="modalTablesSort" @on-ok="tablesSortConfirm">
      <div class="content-inline">
        <RadioGroup v-model="selected">
          <Radio label="桌号"></Radio>
          <Radio label="选手号"></Radio>
        </RadioGroup>
      </div>
    </modal>

  </div>
</template>

<script>
import {
  Modal,
  Icon,
  InputNumber,
  RadioGroup,
  Radio,
  ButtonGroup,
  Button
} from 'view-design'
import ToolbarsTable from 'components/module/toolbars-table'
import TablesList from 'components/module/tables-list'
import RecordTable from 'components/module/record-table'
import ScoreEntering from 'components/module/score-entering'
import roundsScore from 'components/module/rounds-score'
import {
  arrayFilterDuplicate,
  arrayCompare,
  arraySubGroup
} from 'common/js/lib'
import { getCurrentRoundTables, setSeat, getScore } from 'api'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'current-round',
  data() {
    return {
      tablesData: [],
      scoreData: [], // 本轮成绩
      newArr: [],
      modalSeatChange: false,
      modalTablesSort: false,
      playerA: null,
      playerB: null,
      teamNoA: null,
      teamNoB: null,
      roundIdA: null,
      roundIdB: null,
      selected: '桌号',
      sortBy: 0
    }
  },
  computed: {
    ...mapGetters(['matchInfoBase', 'playersInfo']),
    pageTitle() {
      let title
      switch (this.content) {
        case 'tables':
          title = '本轮桌次'
          break
        case 'recordTable':
          title = '比赛记录表'
          break
        case 'scoreEntering':
          title = '成绩录入'
          break
        case 'score':
          title = '本轮成绩'
          break
        default:
          console.log('error：', this.content)
      }
      return title
    },
    highlightTbales() {
      let newArr = []
      // 获取已录入成绩的选手
      let filterResult = this.scoreData.filter(item => {
        return item.isFilled === true
      })
      // 获取已录入成绩的选手所在的的桌次
      if (filterResult.length) {
        let arr = []
        filterResult.forEach(item => {
          arr.push(item.roundId)
        })
        newArr = arrayFilterDuplicate(arr)
      }
      return newArr
    },
    users() {
      let arr = []
      arr = arraySubGroup(this.playersInfo, 2)
      return arr
    },
    recordData() {
      this.newArr.forEach(item => {
        let arr1 = []
        let arr2 = []
        item.group = [arr1, arr2]
        item.roundRecord.forEach(el => {
          switch (el.chairIndex) {
            case 0:
              arr1[0] = el
              break
            case 2:
              arr1[1] = el
              break
            case 1:
              arr2[0] = el
              break
            case 3:
              arr2[1] = el
              break
            default:
              console.log(el.chairIndex)
          }
        })
      })
      return this.newArr
    }
  },
  watch: {},
  mounted() {},
  created() {
    // 从url中获取必要的参数
    this.content = this.$router.currentRoute.query.content
    this.currentRound = this.$router.currentRoute.query.currentRound
    this.$nextTick(() => {
      switch (this.content) {
        case 'tables':
          this.$refs.tablesHook.show()
          break
        case 'recordTable':
          this.$refs.recordTableHook.show()
          break
        case 'scoreEntering':
          this.$refs.scoreEnteringHook.show()
          break
        case 'score':
          this.$refs.scoreHook.show()
          break
        default:
          console.log('error：', this.content)
      }
    })
    this.getTables()
    this.getScoreData()
  },
  methods: {
    ...mapMutations({
      setPrintData: 'SET_PRINT_DATA'
    }),
    // 获取当前轮所有桌次
    getTables() {
      getCurrentRoundTables(
        `/${this.matchInfoBase.id}/${this.currentRound}`
      ).then(res => {
        console.log('当前轮桌次：', res)
        if (res.code === 200) {
          this.tablesData = res.matchRound
          this.newArr = res.matchRound
        }
      })
    },
    // 获取当前轮所有选手成绩
    getScoreData() {
      getScore(`/${this.matchInfoBase.id}/${this.currentRound}`).then(res => {
        console.log('获取当前轮成绩AAAA：', res)
        if (res.code === 200) {
          this.scoreData = res.matchRound
        }
      })
    },
    // 换座
    onSeatChange() {
      this.modalSeatChange = true
    },
    seatChangeConfirm() {
      if (this.matchInfoBase.rule === 1) {
        console.log('团体赛')
      } else {
        this.teamNoA = 0
        this.teamNoB = 0
        for (let i = 0, len1 = this.tablesData.length; i < len1; i++) {
          for (
            let ii = 0, len2 = this.tablesData[i].roundRecord.length;
            ii < len2;
            ii++
          ) {
            if (this.tablesData[i].roundRecord[ii].enrollNum === this.playerA) {
              this.roundIdA = this.tablesData[i].roundRecord[ii].roundId
            }
            if (this.tablesData[i].roundRecord[ii].enrollNum === this.playerB) {
              this.roundIdB = this.tablesData[i].roundRecord[ii].roundId
            }
          }
        }
      }
      setSeat('', {
        roundId1: this.roundIdA,
        roundId2: this.roundIdB,
        enrollNum1: this.playerA,
        enrollNum2: this.playerB,
        teamNo1: this.teamNoA,
        teamNo2: this.teamNoB
      }).then(res => {
        // console.log(res)
        if (res.code === 200) {
          this.$Message.success('换座成功!')
          this.seatChangeCancel()
          this.getTables()
        }
      })
    },
    seatChangeCancel() {
      this.playerA = null
      this.playerB = null
      this.teamNoA = null
      this.teamNoB = null
      this.roundIdA = null
      this.roundIdB = null
    },
    // 桌次排序
    onTablesSort() {
      this.modalTablesSort = true
      if (this.sortBy === 0) {
        this.selected = '桌号'
      } else if (this.sortBy === 1) {
        this.selected = '选手号'
      } else {
        console.log('无法识别排序类别!')
      }
    },
    tablesSortConfirm() {
      if (this.selected === '桌号') {
        this.sortBy = 0
        this.tablesData = []
        this.getTables()
      } else if (this.selected === '选手号') {
        this.sortBy = 1
        let arr = []
        let obj = null
        // 数据重构
        for (let i = 0, len1 = this.tablesData.length; i < len1; i++) {
          for (
            let ii = 0, len2 = this.tablesData[i].roundRecord.length;
            ii < len2;
            ii++
          ) {
            obj = {
              tableIndex: this.tablesData[i].tableIndex,
              enrollNum: this.tablesData[i].roundRecord[ii].enrollNum,
              teamNo: this.tablesData[i].roundRecord[ii].teamNo,
              chairIndex: this.tablesData[i].roundRecord[ii].chairIndex
            }
            arr.push(obj)
          }
        }
        this.tablesData = arr.sort(arrayCompare('enrollNum'))
        // 双人赛
        if (this.matchInfoBase.rule === 2) {
          this.tablesData = arraySubGroup(this.tablesData, 2)
        }
        this.tablesData = arraySubGroup(this.tablesData, 10)
      } else {
        console.log('其他排序方式')
      }
    },
    // 打印
    onPrint() {
      let obj = null
      switch (this.content) {
        case 'tables':
          obj = {
            type: 'table06',
            sortBy: this.sortBy,
            data: this.tablesData
          }
          break
        case 'recordTable':
          obj = {
            type: 'table07',
            data: this.tablesData
          }
          break
        case 'score':
          obj = {
            type: 'table08',
            data: this.scoreData
          }
          break
        default:
          console.log('error：', this.content)
      }
      this.setPrintData(obj)
      this.$router.push({
        path: '/printView'
      })
    },
    // 刷新
    refresh() {
      // this.getTables()
      // this.$Message.success('数据已刷新!')
    },
    // 返回上一步
    onReturn() {
      this.$router.go(-1)
      this.$bus.$emit('screen-free')
    }
  },
  components: {
    Modal,
    Icon,
    InputNumber,
    ToolbarsTable,
    TablesList,
    ScoreEntering,
    RecordTable,
    RadioGroup,
    Radio,
    ButtonGroup,
    Button,
    roundsScore
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
.current-round
  position: fixed
  top: 0
  right: 0
  bottom: 0
  left: 0
  z-index: 9
  background-color: $white
  overflow-y: scroll
  .current-round-header
    .content
      padding: 10px 20px
      border-bottom: 1px solid $border-color
  .current-round-body
    .content
      padding: 1.2% 0
@media print
  .current-round
    overflow-y: hidden
    .header
      display: none
</style>
