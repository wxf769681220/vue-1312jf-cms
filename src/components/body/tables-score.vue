<template>
  <Modal
    class="tables-score"
    class-name="vertical-center-modal"
    width="auto"
    v-model="modalTablesScore"
    @on-ok="onTablesScoreConfirm"
    @on-cancel="onTablesScoreCancel"
  >
    <h3 slot="header">当前桌次：{{isBye ? '轮空' : TableIndex + 1}}</h3>

    <!-- 非轮空 -->
    <table class="table" v-if="!isBye">
      <thead>
        <tr>
          <th>选手号</th>
          <th>成绩录入</th>
          <th>备注</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>{{getEnrollNumByChair(0)}}</th>
          <td rowspan="2">
            <score-setting
              ref="scoreSetting1"
              :data="playerScore"
              :size="'large'"
              :finalScore="currentTablesScore.length ? currentTablesScore[0].upLevels : 404"
              @score="playerAScore"
            ></score-setting>
          </td>
          <td>
            <score-setting
              ref="scoreSetting2"
              :data="playerStatus"
              :size="'default'"
              :finalScore="currentTablesScore.length ? currentTablesScore[0].status : 404"
              @score="playerAStatus0"
            ></score-setting>
          </td>
        </tr>
        <tr>
          <th>{{getEnrollNumByChair(2)}}</th>
          <td>
            <score-setting
              ref="scoreSetting3"
              :data="playerStatus"
              :size="'default'"
              :finalScore="currentTablesScore.length ? currentTablesScore[2].status : 404"
              @score="playerAStatus2"
            ></score-setting>
          </td>
        </tr>
        <tr>
          <th>{{getEnrollNumByChair(1)}}</th>
          <td rowspan="2">
            <score-setting
              ref="scoreSetting4"
              :data="playerScore"
              :size="'large'"
              :finalScore="currentTablesScore.length ? currentTablesScore[1].upLevels :404"
              @score="playerBScore"
            ></score-setting>
          </td>
          <td>
            <score-setting
              ref="scoreSetting5"
              :data="playerStatus"
              :size="'default'"
              :finalScore="currentTablesScore.length ? currentTablesScore[1].status : 404"
              @score="playerBStatus1"
            ></score-setting>
          </td>
        </tr>
        <tr>
          <th>{{getEnrollNumByChair(3)}}</th>
          <td>
            <score-setting
              ref="scoreSetting6"
              :data="playerStatus"
              :size="'default'"
              :finalScore="currentTablesScore.length ? currentTablesScore[3].status : 404"
              @score="playerBStatus3"
            ></score-setting>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- 轮空 -->
    <table class="table" v-else>
      <thead>
        <tr>
          <th>选手号</th>
          <th>成绩</th>
          <th>状态</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in IData" :key="item.chairIndex">
          <th>{{item.enrollNum}}</th>
          <th>6 : 2</th>
          <th>轮空</th>
        </tr>
      </tbody>
    </table>
  </Modal>
</template>

<script>
// Iview Components
import { Modal } from 'view-design'
// module Components
import ScoreSetting from 'components/module/score-setting'

const BYE_CODE = 4 // 轮空状态码

export default {
  name: 'tables-score',
  props: {
    IData: {
      type: Array,
      default() {
        return []
      }
    },
    TableIndex: {
      type: Number,
      default: 0
    },
    currentTablesScore: {
      type: Array,
      default() {
        return []
      }
    },
    isBye: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      modalTablesScore: false,
      playerScore: [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A', 'A+'],
      playerStatus: [
        '正常',
        '判负',
        '弃赛',
        '犯规',
        '轮空',
        '违例',
        '取消资格',
        '警告'
      ],
      score: {
        playerAScore: 0,
        playerBScore: 0,
        playerAStatus0: 0,
        playerAStatus2: 0,
        playerBStatus1: 0,
        playerBStatus3: 0
      }
    }
  },
  watch: {
    isBye(val) {
      if (!val) {
        this.$nextTick(() => {
          this._initScoreSetting()
        })
      }
    }
  },
  methods: {
    // 根据座位匹配选手号
    getEnrollNumByChair(value) {
      let enrollNum = ''
      this.IData.forEach(item => {
        if (item.chairIndex === value) {
          enrollNum = item.enrollNum
        }
      })
      return enrollNum
    },
    playerAScore(value) {
      this.score.playerAScore = value
    },
    playerBScore(value) {
      this.score.playerBScore = value
    },
    playerAStatus0(value) {
      this.score.playerAStatus0 = value
    },
    playerAStatus2(value) {
      this.score.playerAStatus2 = value
    },
    playerBStatus1(value) {
      this.score.playerBStatus1 = value
    },
    playerBStatus3(value) {
      this.score.playerBStatus3 = value
    },
    // 确定操作
    onTablesScoreConfirm() {
      // 若是轮空桌,写入默认值
      if (this.isBye) {
        this.IData.forEach(item => {
          switch (item.chairIndex) {
            case 0:
              this.score.playerAStatus0 = BYE_CODE
              break
            case 1:
              this.score.playerBStatus1 = BYE_CODE
              break
            case 2:
              this.score.playerAStatus2 = BYE_CODE
              break
            case 3:
              this.score.playerBStatus3 = BYE_CODE
              break
            default:
              console.log('')
          }
        })
      }
      console.log(this.score)
      this.$emit('tablesScoreConfirm', this.score)
    },
    // 取消操作
    onTablesScoreCancel() {
      this.score.playerAScore = 0
      this.score.playerBScore = 0
      this.score.playerAStatus0 = 0
      this.score.playerAStatus2 = 0
      this.score.playerBStatus1 = 0
      this.score.playerBStatus3 = 0
      if (!this.isBye) {
        this._initScoreSetting()
      }
      this.$emit('tablesScoreCancel', this.isBye)
    },
    _initScoreSetting() {
      if (this.currentTablesScore.length) {
        this.$refs.scoreSetting1.setScore()
        this.$refs.scoreSetting2.setScore()
        this.$refs.scoreSetting3.setScore()
        this.$refs.scoreSetting4.setScore()
        this.$refs.scoreSetting5.setScore()
        this.$refs.scoreSetting6.setScore()
      } else {
        this.$refs.scoreSetting1._initData()
        this.$refs.scoreSetting2._initData()
        this.$refs.scoreSetting3._initData()
        this.$refs.scoreSetting4._initData()
        this.$refs.scoreSetting5._initData()
        this.$refs.scoreSetting6._initData()
      }
    },
    show() {
      this.modalTablesScore = true
    },
    hide() {
      this.modalTablesScore = false
    }
  },
  components: {
    Modal,
    ScoreSetting
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
>>>.ivu-radio-group-button .ivu-radio-wrapper-checked:first-child
  border-color: $success-color
>>>.ivu-radio-group-button .ivu-radio-wrapper-checked
  color: $white
  background-color: $success-color
  border-color: $success-color
  box-shadow: -1px 0 0 0 $success-color
>>>.ivu-radio-group-button .ivu-radio-wrapper:hover
  color: $success-color
</style>
