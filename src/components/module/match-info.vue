<template>
  <Card class="match-info">
    <h4 slot="title">比赛信息</h4>
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
          <span class>{{matchRule}}</span>
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
          <span class="lab">是否签到：</span>
          <span class>{{matchSignIn}}</span>
        </div>
      </div>
    </div>
  </Card>
</template>

<script>
// Iview Components
import { Card, Icon } from 'view-design'
// Script
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
    return {}
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
    matchRule() {
      return this.matchInfoBase.regionRule === 0 ? '社体规则（普通）' : '团体规则（淮安）'
    },
    matchSignIn() {
      return this.matchInfoBase.needSignIn === 0 ? '否' : '是'
    }
  },
  watch: {},
  mounted() {},
  created() {},
  methods: {},
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
  .list-group-item
    height: 40px
  .list-group-item:not(:last-child)
    border-bottom: 1px dotted $border-color
</style>
