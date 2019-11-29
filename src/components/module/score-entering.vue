<template>
  <div class="score-entering">
    <div class="tables-wrap">
      <div
        class="tables"
        v-for="(tables,index) in tablesData"
        :key="tables.tableIndex"
        :class="{'high-light': _highLight(tables)}"
        @click="onTables(tables, index)"
      >
        <div
          class="circular"
          :class="{'bye': index !== tables.tableIndex}"
        >{{index === tables.tableIndex ? tables.tableIndex + 1 : '空'}}</div>
      </div>
    </div>

    <ul class="nav">
      <li>判罚说明：{{highlightTbales}}</li>
      <li>➢ 一方的“警告”、“违例”、“犯规”、“判负”、“弃权”、“轮空”只能点选其一。</li>
      <li>➢ 点选弃权、轮空，不需录入成绩，积分按2:0 记级:6:0 级差:17:0。</li>
      <li>➢ 2次判负、弃权，应先点判负或弃权，再点取消资格。</li>
    </ul>

    <!-- 每桌成绩录入modal -->
    <tables-score
      ref="tablesScore"
      :IData="roundRecord"
      :TableIndex="tableIndex"
      :currentTablesScore="currentTablesScore"
      :isBye="isBye"
      @tablesScoreConfirm="tablesScoreConfirm"
      @tablesScoreCancel="tablesScoreCancel"
    ></tables-score>
  </div>
</template>

<script>
// body Components
import TablesScore from 'components/body/tables-score'
// Script
import { arrayCompare } from 'common/js/lib'
// API
import { setScore } from 'api'
// Vuex
import { mapGetters } from 'vuex'

export default {
  name: 'score-entering',
  props: {
    tablesData: {
      type: Array,
      default() {
        return []
      }
    },
    scoreData: {
      type: Array,
      default() {
        return []
      }
    },
    highlightTbales: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      roundRecord: [],
      tableIndex: 0,
      roundId: 0,
      currentTablesScore: [],
      isBye: false // 是否轮空
    }
  },
  computed: {
    ...mapGetters(['matchInfoBase'])
  },
  created() {},
  methods: {
    onTables(tables) {
      console.log('当前桌数据：', tables)
      this.$refs.tablesScore.show()
      this.roundRecord = tables.roundRecord
      if (tables.roundRecord.length < 4) {
        this.isBye = true
      } else {
        this.isBye = false
      }
      this.tableIndex = tables.tableIndex
      this.roundId = tables.id
      this._getCurrentTablesScore()
    },
    tablesScoreConfirm(data) {
      // 成绩录入
      setScore(`/${this.matchInfoBase.id}/${this.roundId}`, {
        upLevels: data.playerAScore,
        opUpLevels: data.playerBScore,
        status0: data.playerAStatus0,
        status1: data.playerBStatus1,
        status2: data.playerAStatus2,
        status3: data.playerBStatus3,
        regionRule: this.matchInfoBase.regionRule
      }).then(res => {
        console.log('成绩录入：', res)
        if (res.code === 200) {
          this.$Message.success('成绩录入成功!')
          this.$emit('on-ok')
          this.tablesScoreCancel()
        }
      })
    },
    tablesScoreCancel() {
      this.currentTablesScore = []
    },
    _getCurrentTablesScore() {
      // 获取当前桌4名选手成绩
      let resultFilter = this.scoreData.filter(item => {
        if (item.roundId === this.roundId) {
          return item
        }
      })
      // 判断该4名选手成绩是否已录入
      let everyResult = resultFilter.every(item => {
        return (item.isFilled === false)
      })
      if (everyResult) {
        console.log('当前桌成绩未导入!')
      } else {
        console.log('当前桌成绩已导入!')
        // 按照东（0）南（1）西（2）北（3）固定座位将数组排序
        resultFilter.sort(arrayCompare('chairIndex'))
        this.currentTablesScore = resultFilter
        console.log('获取当前桌成绩：', this.currentTablesScore)
      }
    },
    _highLight(tables) {
      this.isHighLight = false
      if (this.highlightTbales.indexOf(tables.id) !== -1) {
        this.isHighLight = true
      } else {
        this.isHighLight = false
      }
      return this.isHighLight
    }
  },
  components: {
    TablesScore
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
.score-entering
  .tables-wrap
    display: flex
    flex-wrap: wrap
    .tables
      display: block
      margin-right: 10px
      margin-bottom: 10px
      padding: 10px
      width: 70px
      height: 70px
      background-color: #e5e5e5
      border: 1px solid $black
      // border-radius: 4px
      &:hover
        border: 2px solid $black
      &.high-light
        background-color: $white
        .circular
          color: $white
          background-color: $success-color
          &.bye
            background-color: $success-color
      .circular
        display: block
        margin: 0 auto
        width: 50px
        height: 50px
        line-height: 50px
        text-align: center
        font-size: $font-size-large-xxl
        font-weight: 600
        color: $black
        background-color: $white
        border-radius: 50%
        &.bye
          color: $white
          background-color: $error-color
  & > .nav
    flex-direction: column
</style>
