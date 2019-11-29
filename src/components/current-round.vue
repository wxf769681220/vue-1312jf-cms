<template>
  <div class="current-round">
    <div class="header">
      <h2>{{pageTitle}}</h2>
      <toolbars
        :isSeatChange="content === 'tables' &&  sortBy === 0 ? true : false"
        :isTablesSort="content === 'tables' ? true : false"
        :isPrint="content === 'scoreEntering' ? false : true"
        :isRefresh="content === 'tables' &&  sortBy === 0 ? true : false"
        @seatChange="onSeatChange"
        @tablesSort="onTablesSort"
        @print="onPrint"
        @refresh="refresh"
        @return="goBack"
      ></toolbars>
    </div>

    <!-- 本轮桌次 -->
    <div v-if="content === 'tables'">
      <tables-list :tablesData="tablesData" :sortBy="sortBy"></tables-list>
    </div>

    <!-- 比赛记录表 -->
    <div v-if="content === 'recordTable'">
      <record-table :tablesData="tablesData"></record-table>
    </div>

    <!-- 成绩录入 -->
    <div v-if="content === 'scoreEntering'">
      <score-entering
        :tablesData="tablesData"
        :scoreData ="scoreData"
        :highlightTbales="highlightTbales"
        @on-ok="getScoreData"
      ></score-entering>
    </div>

    <!-- 本轮成绩 -->
    <div v-if="content === 'score'">
      <rounds-score :scoreData ="scoreData"></rounds-score>
    </div>

    <!-- 换座 -->
    <modal
      class-name="vertical-center-modal"
      title="换座"
      v-model="modalSeatChange"
      @on-ok="seatChangeConfirm"
      @on-cancel="seatChangeCancel"
    >
      <div class="content-inline" style="width: 290px;margin: 0 auto">
        <div>
          <InputNumber
            class="block"
            size="large"
            :max="9999"
            :min="1"
            v-model="playerA"
            placeholder="选手号A"
            style="width:100px"
          ></InputNumber>
          <InputNumber
            class="block mt-2"
            size="large"
            placeholder="队伍号A"
            style="width:100px"
            v-model="teamNoA"
            v-if="matchInfoBase.rule === 1"
            :max="9999"
            :min="1"
          ></InputNumber>
        </div>
        <Icon class="mx-4" type="md-swap" size="42"/>
        <div>
          <InputNumber
            class="block"
            size="large"
            :max="9999"
            :min="1"
            v-model="playerB"
            placeholder="选手号B"
            style="width:100px"
          ></InputNumber>
          <InputNumber
            class="block mt-2"
            size="large"
            placeholder="队伍号A"
            style="width:100px"
            v-model="teamNoB"
            v-if="matchInfoBase.rule === 1"
            :max="9999"
            :min="1"
          ></InputNumber>
        </div>
      </div>
    </modal>

    <!-- 排序 -->
    <modal
      class-name="vertical-center-modal"
      title="排序"
      v-model="modalTablesSort"
      @on-ok="tablesSortConfirm"
    >
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
// Iview Components
import { Modal, Icon, InputNumber, RadioGroup, Radio } from 'view-design'
// Module Components
import Toolbars from 'components/module/toolbars'
import TablesList from 'components/module/tables-list'
import RecordTable from 'components/module/record-table'
import ScoreEntering from 'components/module/score-entering'
import roundsScore from 'components/module/rounds-score'
// Script
import { arrayFilterDuplicate } from 'common/js/lib'
import { getCurrentRoundTitle } from 'common/js/utils'
// API
import { getCurrentRoundTables, setSeat, getScore } from 'api'
// Vuex
import { mapGetters } from 'vuex'

export default {
  name: 'current-round',
  data() {
    return {
      tablesData: [],
      scoreData: [],
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
    ...mapGetters(['matchInfoBase']),
    pageTitle() {
      return getCurrentRoundTitle(this.content)
    },
    highlightTbales() {
      let newArr = []
      // 获取已录入成绩的选手
      let filterResult = this.scoreData.filter((item) => {
        return (item.isFilled === true)
      })
      // 获取已录入成绩的选手所在的的桌次
      if (filterResult.length) {
        let arr = []
        filterResult.forEach((item) => {
          arr.push(item.roundId)
        })
        newArr = arrayFilterDuplicate(arr)
      }
      return newArr
    }
  },
  watch: {},
  mounted() {},
  created() {
    this.content = this.$router.currentRoute.query.content
    this.getTables()
    this.getScoreData()
  },
  methods: {
    // 获取当前轮所有桌次
    getTables() {
      getCurrentRoundTables(
        `/${this.matchInfoBase.id}/${this.matchInfoBase.currentRound}`
      ).then(res => {
        console.log('当前轮桌次：', res)
        if (res.code === 200) {
          this.tablesData = res.matchRound
        }
      })
    },

    // 获取当前轮所有选手成绩
    getScoreData() {
      getScore(
        `/${this.matchInfoBase.id}/${this.matchInfoBase.currentRound}`
      ).then(res => {
        console.log('获取当前轮成绩：', res)
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
          this.refresh()
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
          for (let ii = 0, len2 = this.tablesData[i].roundRecord.length; ii < len2; ii++) {
            obj = {
              tableIndex: this.tablesData[i].tableIndex,
              enrollNum: this.tablesData[i].roundRecord[ii].enrollNum,
              teamNo: this.tablesData[i].roundRecord[ii].teamNo,
              chairIndex: this.tablesData[i].roundRecord[ii].chairIndex
            }
            arr.push(obj)
          }
        }
        this.tablesData = arr
      } else {
        console.log('其他排序方式')
      }
    },

    // 打印
    onPrint() {
      window.print()
    },

    // 刷新
    refresh() {
      this.getTables()
      this.$Message.success('数据已刷新!')
    },

    // 返回上一步
    goBack() {
      this.$router.go(-1)
    }
  },
  components: {
    Modal,
    Icon,
    InputNumber,
    Toolbars,
    TablesList,
    ScoreEntering,
    RecordTable,
    RadioGroup,
    Radio,
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
  .header
    display: flex
    align-items: center
    justify-content: space-between
    padding: 4px 10px
    border-bottom: 1px solid $border-color
@media print
  .current-round
    overflow-y: hidden
    .header
      display: none
</style>
