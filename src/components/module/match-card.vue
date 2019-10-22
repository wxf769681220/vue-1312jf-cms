<template>
  <div class="match-card">
    <div class="card-header">
      <h4>{{data.name}}</h4>
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
            <span>{{data.contacts}}</span>
            <Icon class="ml-3 mr-1" type="ios-call" size="18"/>
            <span>{{data.contactsPhone}}</span>
          </div>
        </div>
        <div class="list-group-item">
          <span class="lab">裁判长：</span>
          <div>
            <span>{{data.judge}}</span>
            <Icon class="ml-3 mr-1" type="ios-call" size="18"/>
            <span>{{data.judgePhone}}</span>
          </div>
        </div>
        <div class="list-group-item">
          <span class="lab">记录员：</span>
          <div>
            <span>{{data.recorder}}</span>
            <Icon class="ml-3 mr-1" type="ios-call" size="18"/>
            <span>{{data.recorderPhone}}</span>
          </div>
        </div>
        <div class="list-group-item">
          <span class="lab">比赛状态：</span>
          <span>{{ matchStatus }}</span>
        </div>
      </div>
    </div>
    <div class="card-footer">
      <Button class="btn-entry" type="primary" v-text="data.status > 0 ? '进入比赛' : '进入报名'" @click="onBtnEntry"></Button>
    </div>
  </div>
</template>

<script>
import { Icon, Button } from 'view-design'
import moment from 'moment'

export default {
  name: 'match-card',
  props: {
    data: {
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
      let type = ''
      switch (this.data.rule) {
        case 0:
          type = '单人赛'
          break
        case 1:
          type = '团体赛'
          break
        case 2:
          type = '双人赛'
          break
        default:
          console.log('error：' + this.data.rule)
      }
      return type
    },
    startTime() {
      return moment(this.data.startTime).format('YYYY-MM-DD')
    },
    endTime() {
      return moment(this.data.endTime).format('YYYY-MM-DD')
    },
    matchStatus() {
      let status = ''
      switch (this.data.status) {
        case 0:
          status = '正在报名中...'
          break
        case 1:
          status = '报名名单导入完成...'
          break
        case 2:
          status = '比赛进行中...'
          break
        case 3:
          status = '成绩录入中..'
          break
        case 4:
          status = '比赛已结束...'
          break
        default:
          console.log('error：' + this.data.status)
      }
      return status
    }
  },
  watch: {},
  mounted() {},
  created() {},
  methods: {
    onBtnEntry() {}
  },
  beforedestroy() {},
  components: {
    Icon,
    Button
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
.match-card
  display: inline-block
  margin-left: 1.5%
  margin-bottom: 1.5%
  width: 18.2%
  border: 1px solid $border-color
  border-radius: 4px
  .card-header
    padding: 0 15px
    height: 50px
    line-height: 50px
    background-color: $body-bg-color
    border-bottom: 1px solid $border-color
    h4
      white-space: nowrap
      text-overflow: ellipsis
      overflow: hidden
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
