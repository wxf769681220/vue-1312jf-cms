<template>
  <div class="match-card">
    <div class="card-header">
      <h4>{{match.name}}</h4>
    </div>
    <div class="card-body">
      <div class="list-group">
        <div class="list-group-item">
          <span class="lab">比赛类型：</span>
          <span>{{matchType}}</span>
        </div>
        <div class="list-group-item">
          <span class="lab">比赛时间：</span>
          <div>{{startTime}} - {{endTime}}</div>
        </div>
        <div class="list-group-item">
          <span class="lab">联系人：</span>
          <div>
            <span>{{match.contacts}}</span>
            <Icon class="ml-3 mr-1" type="md-infinite" size="18"/>
            <span>{{match.contactsPhone}}</span>
          </div>
        </div>
        <div class="list-group-item">
          <span class="lab">裁判长：</span>
          <div>
            <span>{{match.judge}}</span>
            <Icon class="ml-3 mr-1" type="md-infinite" size="18"/>
            <span>{{match.judgePhone}}</span>
          </div>
        </div>
        <div class="list-group-item">
          <span class="lab">记录员：</span>
          <div>
            <span>{{match.recorder}}</span>
            <Icon class="ml-3 mr-1" type="md-infinite" size="18"/>
            <span>{{match.recorderPhone}}</span>
          </div>
        </div>
        <div class="list-group-item">
          <span class="lab">比赛状态：</span>
          <span>{{ matchStatus }}</span>
        </div>
      </div>
    </div>
    <div class="card-footer">
      <Button class="btn-entry" :type="btnType.type" @click="onBtnEntry(match)">{{btnType.btnText}}</Button>
    </div>
  </div>
</template>

<script>
import { Icon, Button } from 'view-design'
import { getMatchTypeString, matchStatusChange, btnTypeChange } from 'common/js/utils'
import moment from 'moment'
import { mapMutations } from 'vuex'

export default {
  name: 'match-card',
  props: {
    match: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    matchType() {
      return getMatchTypeString(this.match.rule)
    },
    startTime() {
      return moment(this.match.startTime).format('YYYY-MM-DD')
    },
    endTime() {
      return moment(this.match.endTime).format('YYYY-MM-DD')
    },
    matchStatus() {
      return matchStatusChange(this.match.status)
    },
    btnType() {
      return btnTypeChange(this.match.status)
    }
  },
  methods: {
    ...mapMutations({
      setMatchInfoBase: 'SET_MATCH_INFO_BASE'
    }),
    onBtnEntry(data) {
      if (data.status === 2 || data.status === 3 || data.status === 4) {
        // 进入比赛
        this.setMatchInfoBase(data)
        this.$router.push({
          path: `match-entry/${data.id}`
        })
      } else if (data.status === 0 || data.status === 1 || data.status === 5) {
        // 进入报名
        this.setMatchInfoBase(data)
        this.$router.push({
          path: `match-enroll/${data.id}`
        })
      } else {
        console.log('未知比赛状态：', data.status)
      }
    }
  },
  components: {
    Icon,
    Button
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'

.match-card
  display: inline-block
  border: 1px solid $border-color
  border-radius: 4px
  &:hover
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1)
  .card-header
    padding: 0 15px
    height: 50px
    line-height: 50px
    background-color: $body-bg-color
    border-bottom: 1px solid $border-color
    h4
      text-ellipsis()
  .card-body
    padding: 15px
    .list-group-item
      display: flex
      align-items: center
      height: 40px
    .list-group-item:not(:last-child)
      border-bottom: 1px dotted $border-color
      .lab
        flex: 0 0 80px
        width: 80px
  .card-footer
    padding: 10px
    background-color: $body-bg-color
    .btn-entry
      display: block
      margin: 0 auto
      width: 60%
      height: 40px
      font-size: $font-size-large
      font-weight: 600
      letter-spacing: 0.2em
      overflow: hidden
</style>
