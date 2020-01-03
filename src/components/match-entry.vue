<template>
  <div class="match-entry" ref="matchEntryHook">
    <div class="layout-content">
      <div class="content-inline justify-content-between">
        <div class="content-inline">
          <h2>{{matchInfoBase.name}}</h2>
          <Icon class="ml-3" type="ios-keypad" size="24" color="#2d8cf0" v-show="isMatchInfo" @click="showMatchInfo" />
        </div>
        <div class="content-inline">
          <match-toolbars
            @onEnrollTable="onEnrollTable"
            @onPlayerTable="onPlayerTable"
            @onJFCard="onJFCard"
            @onScoreBulletin="onScoreBulletin"
            @onSignatureTable="onSignatureTable"
          >
          </match-toolbars>
          <toolbars class="ml-2" @return="goBack" @refresh="refresh"></toolbars>
        </div>
      </div>

      <!--比赛基本信息 -->
      <match-info class="mt-3" ref="matchInfo" :matchInfoBase="matchInfoBase" @hideIcon="hideIcon"></match-info>

      <!-- 比赛轮次 -->
      <div class="card-wrap">
        <div class="card" v-for="round in matchInfoBase.currentRound" :key="round">
          <div class="card-header">
            <h3>第{{round}}轮</h3>
            <div>
              <Button
                type="success"
                v-text="round !== matchInfoBase.currentRound || isPost ? '成绩已发布': '发布成绩'"
                :disabled="round !== matchInfoBase.currentRound || isPost"
                @click="onScorePublish"
              ></Button>
              <Button
                class="ml-2"
                type="success"
                v-text="round !== matchInfoBase.currentRound || lastRound ? '本轮结束': '下一轮'"
                :disabled="round !== matchInfoBase.currentRound || (hideBtn && !isPost) || lastRound"
                @click="onNextRoundStart"
              >下一轮</Button>
            </div>
          </div>
          <div class="card-body">
            <div class="btn-group">
              <Button type="primary" @click="_pathTo('tables', round)">本轮桌次</Button>
              <Button type="warning" @click="_pathTo('score', round)">本轮成绩</Button>
              <Button type="info" @click="_pathTo('recordTable', round)">记录表</Button>
              <Button type="error" @click="_pathTo('scoreEntering', round)">成绩录入</Button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 三级页渲染出口 -->
    <router-view></router-view>

    <!-- 报名表 -->
    <enroll-table
      ref="enrollTable"
      :playerInfo="playerInfo"
      @loadData="_initData"
      @screen-lock="screenLock(true)"
      @screen-free="screenLock(false)"
    ></enroll-table>

    <!-- 选手表 -->
    <player-table
      ref="playerTable"
      :playerInfo="playerInfo"
      @screen-lock="screenLock(true)"
      @screen-free="screenLock(false)"
    ></player-table>

    <!-- 积分编排卡 -->
    <jfcard-table
      ref="jfcardTable"
      :playerInfo="playerInfo"
      :jsCardInfo="jsCardInfo"
      @screen-lock="screenLock(true)"
      @screen-free="screenLock(false)"
    ></jfcard-table>

    <!-- 成绩公告 -->
    <score-table
      ref="scoreTable"
      :playerInfo="playerInfo"
      :scoreReportInfo="scoreReportInfo"
      @screen-lock="screenLock(true)"
      @screen-free="screenLock(false)"
    ></score-table>

    <!-- 奖励签收表 -->
    <signature-table
      ref="signatureTable"
      :signatureInfo="signatureInfo"
      @on-confirm="_signatureInfo"
      @on-refresh="_signatureInfo(count)"
      @screen-lock="screenLock(true)"
      @screen-free="screenLock(false)"
    ></signature-table>

    <!-- 发布本轮成绩 -->
    <Modal class="score-publish" class-name="vertical-center-modal" v-model="modalScorePublish" @on-ok="scorePublishConfirm">
      <p slot="header">成绩发布</p>
      <p class="p-2">您确定要发布本轮成绩吗?</p>
    </Modal>

    <!-- 开始下一轮 -->
    <Modal class="next-round-start" class-name="vertical-center-modal" v-model="modalNextRoundStart" @on-ok="nextRoundStartConfirm">
      <p slot="header">开始下一轮</p>
      <p class="p-2">您确定要开始下一轮比赛吗?</p>
    </Modal>

  </div>
</template>

<script>
import { Button, Icon, Modal } from 'view-design'
import Toolbars from 'components/module/toolbars'
import MatchInfo from 'components/module/match-info'
import MatchToolbars from 'components/module/match-toolbars'
import EnrollTable from 'components/module/enroll-table'
import PlayerTable from 'components/module/player-table'
import JfcardTable from 'components/module/jfcard-table'
import ScoreTable from 'components/module/score-table'
import SignatureTable from 'components/module/signature-table'
import { screenLock } from 'common/js/lib'
import { mapGetters, mapMutations } from 'vuex'
import {
  getEnrollInfo,
  getScore,
  postScore,
  nextRoundStart,
  getMatch,
  jfCard,
  scoreReport,
  getSignatureInfo
} from 'api'

export default {
  name: 'match-entry',
  inject: ['reload'],
  data() {
    return {
      isMatchInfo: false,
      currentRound: 1,
      isPost: false,
      hideBtn: true,
      modalScorePublish: false,
      modalNextRoundStart: false,
      playerInfo: [],
      jsCardInfo: [],
      scoreReportInfo: [],
      signatureInfo: []
    }
  },
  computed: {
    ...mapGetters(['matchInfoBase']),
    lastRound() {
      return this.matchInfoBase.currentRound === this.matchInfoBase.rounds && this.isPost
    }
  },
  watch: {
    '$route.path'(path) {
      if (path === `/home/match-entry/${this.matchInfoBase.id}`) {
        this.screenLock(false)
      }
    },
    matchInfoBase(value) {
      this.getScoreData()
    }
  },
  mounted() {
    console.log(this.matchInfoBase)
  },
  created() {
    this._initData()
  },
  methods: {
    ...mapMutations({
      setPlayersInfo: 'SET_PLAYERS_INFO',
      setMatchInfoBase: 'SET_MATCH_INFO_BASE'
    }),
    _initData() {
      this.getPlayerInfo()
      this.getScoreData()
    },
    // 获取本场选手信息
    getPlayerInfo() {
      getEnrollInfo(`/${this.matchInfoBase.id}`).then(res => {
        console.log('获取本场选手信息：', res)
        if (res.code === 200) {
          this.playerInfo = res.users
          this.setPlayersInfo(res.users)
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
          this.isPost = res.isPost
        }
      })
    },
    // 发布本轮成绩
    onScorePublish() {
      this.modalScorePublish = true
      console.log(this.matchInfoBase)
    },
    scorePublishConfirm() {
      postScore(
        `/${this.matchInfoBase.id}/${this.matchInfoBase.currentRound}`
      ).then(res => {
        console.log('发布本轮成绩：', res)
        if (res.code === 200) {
          this.$Message.success('本轮成绩发布成功!')
          this.getScoreData()
        } else if (res.code === 20003) {
          this.$Message.error('成绩还未录完,无法发布成绩!')
        } else if (res.code === 20004) {
          this.$Message.error('成绩发布成功,比赛结束！')
        } else {
          // ...
        }
      })
    },
    // 开始下一轮
    onNextRoundStart() {
      this.modalNextRoundStart = true
    },
    nextRoundStartConfirm() {
      nextRoundStart(`/${this.matchInfoBase.id}`).then(res => {
        console.log(res)
        if (res.code === 200) {
          this.$Message.success('下一轮比赛已开始!')
          this._getMatch()
        }
      })
    },
    _getMatch() {
      getMatch(`/${this.matchInfoBase.id}`).then(res => {
        if (res.code === 200) {
          let data = res.match
          this.setMatchInfoBase(data)
        }
      })
    },
    // 报名表
    onEnrollTable() {
      this.$refs.enrollTable.show()
    },
    // 选手表
    onPlayerTable() {
      this.$refs.playerTable.show()
    },
    // 积分编排卡
    onJFCard() {
      this.$refs.jfcardTable.show()
      this._jfCard()
    },
    _jfCard() {
      jfCard(`/${this.matchInfoBase.id}`).then(res => {
        console.log('获取编排卡数据：', res)
        if (res.code === 200) {
          this.jsCardInfo = res.rs
        } else {
          this.$Message.error('获取编排卡数据时失败!')
        }
      })
    },
    // 成绩公告
    onScoreBulletin() {
      this.$refs.scoreTable.show()
      this._scoreReport()
    },
    _scoreReport() {
      scoreReport(`/${this.matchInfoBase.id}`).then(res => {
        console.log('获取成绩公告数据：', res)
        if (res.code === 200) {
          this.scoreReportInfo = res.rs
        } else {
          this.$Message.error('获取成绩公告数据时失败!')
        }
      })
    },
    // 奖励签收表
    onSignatureTable() {
      this.$refs.signatureTable.show()
    },
    _signatureInfo(count) {
      console.log(count)
      getSignatureInfo('', {
        'matchId': this.matchInfoBase.id,
        'page': 0,
        'pagecount': count
      }).then(res => {
        console.log('奖励签收表信息：', res)
        if (res.code === 200) {
          this.signatureInfo = res.rs
        } else {
          this.$Message.error('获取成绩公告数据时失败!')
        }
      })
    },
    // 锁屏 & 释放屏幕
    screenLock(lock) {
      this.$nextTick(() => {
        return screenLock(lock, this.$refs.matchEntryHook)
      })
    },
    // 状态
    _pathTo(content, round) {
      // 锁屏
      this.screenLock(true)
      this.$router.push({
        path: `${this.matchInfoBase.id}/${round}`,
        query: {
          content: content,
          currentRound: round
        }
      })
    },
    hideIcon() {
      this.isMatchInfo = true
    },
    showMatchInfo() {
      this.isMatchInfo = false
      this.$refs.matchInfo.show()
    },
    goBack() {
      this.$router.push({
        path: '/home/match-list'
      })
    },
    refresh() {
      this.reload()
    }
  },
  beforeDestroy() {},
  components: {
    MatchInfo,
    MatchToolbars,
    Toolbars,
    Modal,
    Button,
    Icon,
    EnrollTable,
    PlayerTable,
    JfcardTable,
    ScoreTable,
    SignatureTable
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
.match-entry
  position: relative
  margin: 0 20px
  padding: 64px 0
  min-height: 100vh
  background-color: $white
  .layout-content
    position: relative
    padding: 20px
    border-top: 20px solid $body-bg-color
  .card-wrap
    display: flex
    flex-wrap: wrap
    margin-top: 20px
    .card
      margin-left: 20px
      margin-bottom: 20px
      flex:  0 0 400px
      width 400px
      border: 1px solid #6c757d
      border-radius: 4px
      &:hover
        box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.35)
      .card-header
        display: flex
        align-items: center
        justify-content: space-between
        padding: 15px
        background-color: $card-header-bg-color
        border-bottom: 1px solid $card-header-border-color
      .card-body
        padding: 15px 20px
        .btn-group
          display: flex
          flex-wrap: wrap
          align-items: center
          justify-content: space-between
          & > a
            margin: 10px 0
</style>
