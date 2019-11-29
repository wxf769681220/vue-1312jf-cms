<template>
  <div class="match-entry">
    <div class="layout-content">
      <div class="content-inline justify-content-between">
        <h2>
          <span>{{matchInfoBase.name}}</span>
          <Icon
            class="ml-3"
            type="ios-keypad"
            size="24"
            color="#2d8cf0"
            v-show="isMatchInfo"
            @click="showMatchInfo"
          />
        </h2>
        <div class="content-inline">
          <!-- 工具栏组件 -->
          <match-toolbars @return="goBack"></match-toolbars>
          <toolbars class="ml-2" @return="goBack" @refresh="refresh"></toolbars>
        </div>
      </div>

      <!--比赛基本信息 -->
      <match-info class="mt-3" ref="matchInfo" :matchInfoBase="matchInfoBase" @hideIcon="hideIcon"></match-info>

      <!-- 比赛轮次 -->
      <div class="rounds-wrap">
        <div class="card" v-for="round in matchInfoBase.rounds" :key="round">
          <div class="card-header">
            <h3>第{{round}}轮</h3>
            <div>
              <Button
                type="default"
                :to="{path: `${matchInfoBase.id}/${round}`, query: {content: 'tables'}}"
              >本轮桌次</Button>
              <Button
                class="ml-2"
                type="primary"
                :to="{path: `${matchInfoBase.id}/${round}`, query: {content: 'score'}}"
              >本轮成绩</Button>
              <Button
                class="ml-2"
                type="warning"
                :to="{path: `${matchInfoBase.id}/${round}`, query: {content: 'recordTable'}}"
              >比赛记录表</Button>
            </div>
          </div>
          <div class="card-body">
            <Button
              type="warning"
              size="large"
              :to="{path: `${matchInfoBase.id}/${round}`, query: {content: 'scoreEntering'}}"
            >成绩录入</Button>
            <Button
              type="success"
              size="large"
              :disabled="scorePublish"
              @click="onScorePublish"
              v-text="isPost ? '成绩已发布': '发布成绩'"
            ></Button>
            <Button type="success" size="large" :disabled="!isPost">开始下一轮</Button>
          </div>
        </div>
      </div>
    </div>

    <!-- 三级页渲染出口 -->
    <router-view></router-view>

    <!-- 发布本轮成绩 -->
    <Modal
      class="score-publish"
      v-model="modalScorePublish"
      class-name="vertical-center-modal"
      @on-ok="scorePublishConfirm"
    >
      <p slot="header">成绩发布</p>
      <p class="px-3 py-2">您确定要发布本轮成绩吗?</p>
    </Modal>
  </div>
</template>

<script>
// Module Components
import MatchInfo from 'components/module/match-info'
import MatchToolbars from 'components/module/match-toolbars'
import Toolbars from 'components/module/toolbars'
// Iview Components
import { Button, Icon, Modal } from 'view-design'
// API
import { getEnrollInfo, getScore, postScore } from 'api'
// Vuex
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'match-entry',
  inject: ['reload'],
  data() {
    return {
      isMatchInfo: false,
      scorePublish: false,
      isPost: false,
      modalScorePublish: false
    }
  },
  computed: {
    ...mapGetters(['matchInfoBase'])
  },
  watch: {},
  mounted() {},
  created() {
    console.log('本场比赛基本信息：', this.matchInfoBase)
    this.getPlayerInfo()
    this.getScoreData()
  },
  methods: {
    ...mapMutations({
      setPlayersInfo: 'SET_PLAYERS_INFO'
    }),

    // 获取本场选手信息
    getPlayerInfo() {
      getEnrollInfo(`/${this.matchInfoBase.id}`).then(res => {
        console.log('获取本场选手信息：', res)
        if (res.code === 200) {
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
          let matchRound = res.matchRound
          this.isPost = res.isPost
          if (res.isPost) {
            this.scorePublish = true
          } else {
            // 成绩未发布, 如果当前轮所有桌成绩都已录入, 则可操作本轮成绩按钮
            let everyResult = matchRound.every(item => {
              return item.isFilled === true
            })
            if (everyResult) {
              this.scorePublish = false
            } else {
              this.scorePublish = true
            }
          }
        }
      })
    },

    // 发布本轮成绩
    onScorePublish() {
      this.modalScorePublish = true
    },
    scorePublishConfirm() {
      postScore(
        `/${this.matchInfoBase.id}/${this.matchInfoBase.currentRound}`
      ).then(res => {
        console.log('发布本轮成绩：', res)
        if (res.code === 200) {
          this.$$Message.success('本轮成绩发布成功!')
          this.scorePublish = false
        }
      })
    },

    // 状态管理
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
  components: {
    MatchInfo,
    MatchToolbars,
    Toolbars,
    Modal,
    Button,
    Icon
  },
  beforedestroy() {}
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
  .rounds-wrap
    display: flex
    flex-wrap: wrap
    margin-top: 20px
    .card
      margin-right: 15px
      max-width: 400px
      flex: 1
      border: 1px solid #6c757d
      border-radius: 4px
      // max-width: 400px
      .card-header
        display: flex
        align-items: center
        justify-content: space-between
        padding: 15px
        background-color: $card-header-bg-color
        border-bottom: 1px solid $card-header-border-color
      .card-body
        padding: 30px 20px
        display: flex
        align-items: center
        justify-content: space-between
</style>
