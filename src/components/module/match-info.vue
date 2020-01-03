<template>
  <Card class="match-info" v-show="isMatchInfo">
    <div class="card-header" slot="title">
      <h4>比赛信息</h4>
      <Icon class="icon-hide" type="md-close-circle" size="24" color="#2d8cf0" @click="hide"/>
    </div>
    <div class="card-body">
      <div class="list-group">
        <div class="list-group-item content-inline">
          <div class="col">
            <span class="lab">比赛名称：</span>
            <span class>{{matchInfoBase.name}}</span>
          </div>
          <div class="col">
            <span class="lab">联系人：</span>
            <span class>{{matchInfoBase.contacts}}</span>
            <span class>
              <Icon class="ml-3 mr-1" type="ios-call" size="18"/>
              {{matchInfoBase.contactsPhone}}
            </span>
          </div>
          <div class="col">
            <span class="lab">比赛类型：</span>
            <span class>{{matchType}}</span>
          </div>
        </div>
        <div class="list-group-item content-inline">
          <div class="col">
            <span class="lab">比赛时间：</span>
            <span class>{{startTime}}</span>
            <span class="mx-3">-</span>
            <span class>{{endTime}}</span>
          </div>
          <div class="col">
            <span class="lab">裁判长：</span>
            <span class>{{matchInfoBase.judge}}</span>
            <span class>
              <Icon class="ml-3 mr-1" type="ios-call" size="18"/>
              {{matchInfoBase.judgePhone}}
            </span>
          </div>
          <div class="col">
            <span class="lab">比赛规则：</span>
            <span class>{{matchInfoBase.regionRule === 0 ? '社体规则（普通）' : '团体规则（淮安）'}}</span>
          </div>
        </div>
        <div class="list-group-item content-inline">
          <div class="col">
            <span class="lab">比赛地点：</span>
            <span class>{{matchInfoBase.location}}</span>
          </div>
          <div class="col">
            <span class="lab">记录员：</span>
            <span class>{{matchInfoBase.recorder}}</span>
            <span class>
              <Icon class="ml-3 mr-1" type="ios-call" size="18"/>
              {{matchInfoBase.recorderPhone}}
            </span>
          </div>
          <div class="col">
            <span class="lab">电子签到：</span>
            <span class>{{matchInfoBase.needSignIn ? '开启' : '关闭'}}</span>
            <span class="lab" v-if="matchInfoBase.needSignIn">&nbsp;&nbsp;|&nbsp;&nbsp;手机端报名：{{matchInfoBase.needEnroll ? '开启' : '关闭'}}</span>
          </div>
        </div>
        <div class="list-group-item content-inline" v-if="matchInfoBase.status === 2 || matchInfoBase.status === 3 || matchInfoBase.status === 4">
          <div class="col">
            <span class="lab">比赛总轮数：</span>
            <span class>{{matchInfoBase.rounds}}</span>
          </div>
          <div class="col">
            <span class="lab">首轮编排：</span>
            <span class>{{firstRoundRule}}</span>
          </div>
          <div class="col">
            <span class="lab">同地区不相遇规则：</span>
            <span class>{{matchInfoBase.aviodSameRegion}}</span>
          </div>
        </div>
      </div>
    </div>
  </Card>
</template>

<script>
import { Card, Icon } from 'view-design'
import moment from 'moment'
import { getMatchTypeString } from 'common/js/utils'

export default {
  name: 'match-info',
  props: {
    matchInfoBase: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      isMatchInfo: true
    }
  },
  computed: {
    matchType() {
      return getMatchTypeString(this.matchInfoBase.rule)
    },
    startTime() {
      return moment(this.matchInfoBase.startTime).format('YYYY-MM-DD')
    },
    endTime() {
      return moment(this.matchInfoBase.endTime).format('YYYY-MM-DD')
    },
    firstRoundRule() {
      let rule = ''
      if (this.matchInfoBase.firstRoundRule === 0) {
        rule = '随机'
      } else if (this.matchInfoBase.firstRoundRule === 1) {
        rule = '首尾'
      } else if (this.matchInfoBase.firstRoundRule === 2) {
        rule = '顺序'
      } else {
        // ...
      }
      return rule
    }
  },
  watch: {},
  mounted() {},
  created() {},
  methods: {
    show() {
      this.isMatchInfo = true
    },
    hide() {
      this.isMatchInfo = false
      this.$emit('hideIcon')
    }
  },
  beforedestroy() {},
  components: {
    Card,
    Icon
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
.match-info
  .card-header
    display: flex
    align-items: center
    justify-content: space-between
    .icon-hide
      &:hover
        box-shadow: 1px 1px 1px #000
  .card-body
    .list-group-item
      height: 40px
    .list-group-item:not(:last-child)
      border-bottom: 1px dotted $border-color
</style>
