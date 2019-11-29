<template>
  <div class="match-create">
    <div class="layout-content">
      <h2 class="mb-3">创建比赛</h2>
      <ValidationObserver class="form" tag="form" ref="observer" v-slot="{ valid }">
        <!-- 比赛名称 -->
        <validation-provider class="form-group" tag="div" rules="required" v-slot="{ errors }">
          <div class="input-group">
            <label class="label">比赛名称：</label>
            <div class="input-wrap">
              <input class="input-control" type="text" v-model="match.name">
            </div>
          </div>
        </validation-provider>

        <!-- 比赛地点 -->
        <validation-provider class="form-group" tag="div" rules="required" v-slot="{ errors }">
          <div class="input-group">
            <label class="label">比赛地点：</label>
            <div class="input-wrap">
              <input class="input-control" type="text" v-model="match.location">
            </div>
          </div>
        </validation-provider>

        <!-- 比赛时间 -->
        <div class="form-group">
          <div class="content-inline">
            <label class="label">比赛时间：</label>
            <validation-provider
              name="startTime"
              tag="div"
              rules="required|startTime"
              v-slot="{ errors }"
            >
              <div class="content-inline">
                <DatePicker type="datetime" v-model="match.startTime" :options="disabledTime" placeholder="开始时间"></DatePicker>
                <div class="error-tip" v-show="errors.length">{{ errors[0] }}</div>
              </div>
            </validation-provider>
            <Icon class="mx-3" type="md-infinite" size="16"/>
            <validation-provider tag="div" rules="required|endTime:startTime" v-slot="{ errors }">
              <div class="content-inline">
                <DatePicker type="datetime" v-model="match.endTime" :options="disabledTime" placeholder="结束时间"></DatePicker>
                <div class="error-tip" v-show="errors.length">{{ errors[0] }}</div>
              </div>
            </validation-provider>
          </div>
        </div>

        <!-- 联系人 -->
        <div class="form-group">
          <div class="content-inline">
            <label class="label">联系人：</label>
            <validation-provider rules="required" v-slot="{ errors }">
              <div class="input-group">
                <div class="input-wrap diff">
                  <input class="input-control" type="text" v-model="match.contacts">
                </div>
              </div>
            </validation-provider>
            <Icon class="mx-3" type="md-infinite" size="16"/>
            <validation-provider rules="required" v-slot="{ errors }">
              <div class="input-group">
                <div class="input-wrap diff">
                  <input class="input-control" type="text" v-model="match.contactsPhone">
                </div>
              </div>
            </validation-provider>
          </div>
        </div>

        <!-- 裁判长 -->
        <div class="form-group">
          <div class="content-inline">
            <label class="label">裁判长：</label>
            <validation-provider rules="required" v-slot="{ errors }">
              <div class="input-group">
                <div class="input-wrap diff">
                  <input class="input-control" type="text" v-model="match.judge">
                </div>
              </div>
            </validation-provider>
            <Icon class="mx-3" type="md-infinite" size="16"/>
            <validation-provider rules="required" v-slot="{ errors }">
              <div class="input-group">
                <div class="input-wrap diff">
                  <input class="input-control" type="text" v-model="match.judgePhone">
                </div>
              </div>
            </validation-provider>
          </div>
        </div>

        <!-- 记录员 -->
        <div class="form-group">
          <div class="content-inline">
            <label class="label">记录员：</label>
            <validation-provider rules="required" v-slot="{ errors }">
              <div class="input-group">
                <div class="input-wrap diff">
                  <input class="input-control" type="text" v-model="match.recorder">
                </div>
              </div>
            </validation-provider>
            <Icon class="mx-3" type="md-infinite" size="16"/>
            <validation-provider rules="required" v-slot="{ errors }">
              <div class="input-group">
                <div class="input-wrap diff">
                  <input class="input-control" type="text" v-model="match.recorderPhone">
                </div>
              </div>
            </validation-provider>
          </div>
        </div>

        <Divider dashed/>

        <!-- 比赛类型 -->
        <div class="form-group">
          <div class="input-group">
            <label class="label">比赛类型：</label>
            <RadioGroup v-model="newRule">
              <Radio label="0">单人赛</Radio>
              <Radio label="2">双人赛</Radio>
              <Radio label="1">团体赛</Radio>
            </RadioGroup>
          </div>
        </div>

        <!-- 计分规则 -->
        <div class="form-group">
          <div class="input-group">
            <label class="label">计分规则：</label>
            <RadioGroup v-model="newRegionRule">
              <Radio label="0">社体规则</Radio>
              <Radio label="1">国家规则</Radio>
              <Radio label="2">自定义规则</Radio>
            </RadioGroup>
          </div>
        </div>

        <!-- 自定义规则 -->
        <div class="form-group diff" v-if="newRegionRule === '2'">
          <CheckboxGroup v-model="match.orderRule">
            <Checkbox label="总积分" border></Checkbox>
            <Checkbox label="胜轮数" border></Checkbox>
            <Checkbox label="级差分" border></Checkbox>
            <Checkbox label="升级数" border></Checkbox>
            <Checkbox label="去首累进分" border></Checkbox>
            <Checkbox label="累进分" border></Checkbox>
            <Checkbox label="对手分" border></Checkbox>
          </CheckboxGroup>
          <Alert
            class="inline-block my-3 text-error"
            type="error"
            show-icon
            v-if="errors"
          >错误提示：{{errors}}</Alert>
        </div>

        <!-- 是否含签到功能 -->
        <div class="form-group">
          <div class="input-group">
            <label class="label">签到功能：</label>
            <i-switch
              size="large"
              true-color="#13ce66"
              false-color="#ff4949"
              v-model="match.needSignIn"
            >
              <span slot="open">开启</span>
              <span slot="close">关闭</span>
            </i-switch>
            <p class="text-success">（需要下载1312耍大牌客户端）</p>
          </div>
        </div>

        <!-- 登录按钮 -->
        <Button
          class="btn-create"
          type="primary"
          :long="true"
          :disabled="newRegionRule === '2' ? !valid || !match.orderRule.length || (errors !== '') : !valid"
          @click="onCreateMatch"
        >
          <span>立即创建</span>
        </Button>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
// Iview Components
import {
  Icon,
  Button,
  Divider,
  Alert,
  DatePicker,
  RadioGroup,
  Radio,
  CheckboxGroup,
  Checkbox
} from 'view-design'
// ES6+ Add a rule.
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate'
import { required } from 'vee-validate/dist/rules'
// Script
import { orderRuleChange } from 'common/js/utils'
// API
import { createMatch } from 'api'

export default {
  name: 'match-create',
  data() {
    return {
      match: {
        name: '2019"柔和双沟杯"世界掼蛋大赛无锡站',
        location: '喜来乐国际大酒店',
        startTime: '',
        endTime: '',
        contacts: '阿森松',
        contactsPhone: '12345678901',
        judge: '蔷薇',
        judgePhone: '12345678902',
        recorder: '杨小峰',
        recorderPhone: '12345678903',
        rule: 0, // 0：单人赛 1：团体赛 2：双人赛
        regionRule: 0, // 0：社体规则 1：国家规则 2：自定义规则
        needSignIn: false,
        orderRule: []
      },
      disabledTime: {
        disabledDate(date) {
          return date && date.valueOf() < Date.now() - 86400000
        }
      }
    }
  },
  computed: {
    newRule: {
      get() {
        return String(this.match.rule)
      },
      set(value) {
        this.match.rule = Number(value)
      }
    },
    newRegionRule: {
      get() {
        return String(this.match.regionRule)
      },
      set(value) {
        this.match.regionRule = Number(value)
      }
    },
    errors() {
      let msg = ''
      if (!this.match.orderRule.length) {
        msg = '至少需要设置一条规则!'
      } else if (
        this.match.orderRule.indexOf('去首累进分') !== -1 &&
        this.match.orderRule.indexOf('累进分') !== -1
      ) {
        msg = '去首累进分和累进分只能选一个!'
      } else if (
        this.newRule === '0' &&
        this.match.orderRule.indexOf('对手分') !== -1
      ) {
        msg = '单人赛对手分不可选!'
      } else {
        // ...
      }
      return msg
    }
  },
  watch: {
    'match.regionRule'(value) {
      this.match.orderRule = []
    }
  },
  created() {
    this.checkInput()
  },
  methods: {
    onCreateMatch() {
      this.match.orderRule = orderRuleChange(this.match.orderRule)
      createMatch('', this.match).then(res => {
        // console.log(res)
        if (res.code === 200) {
          this.$router.push({
            path: '/home/match-list'
          })
        }
      })
    },
    checkInput() {
      extend('required', {
        ...required,
        message: '/* 必填项不能为空 */'
      })
      extend('startTime', {
        validate: value => new Date(value) > new Date(),
        message: '开始时间不能比当前时间更早!'
      })
      extend('endTime', {
        params: [{ name: 'start', isTarget: true }],
        validate: (value, { start }) => new Date(value) > new Date(start),
        message: '结束时间不能比开始时间更早!'
      })
    }
  },
  components: {
    ValidationObserver,
    ValidationProvider,
    Icon,
    Button,
    DatePicker,
    RadioGroup,
    Divider,
    Alert,
    Radio,
    CheckboxGroup,
    Checkbox
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
.match-create
  position: relative
  margin: 0 20px
  padding-top: 64px
  background-color: $white
  .layout-content
    padding: 20px
    border-top: 20px solid $body-bg-color
  .form
    display: block
    padding: 20px 10px
    border: 1px solid $border-color
    .form-group
      margin-bottom: 16px
      &.diff
        margin-left: 100px
    .input-group
      display: flex
      align-items: center
    .input-wrap
      position: relative
      display: flex
      flex: 0 0 320px
      width: 320px
      &.diff
        flex: 0 0 211px
        width: 211px
    .input-control
      padding: 6px 12px
      flex: 1 1 auto
      width: auto
      min-height: 40px
      line-height: 24px
    .label
      display: inline-block
      padding: 0 10px
      width: 100px
      text-align: right
  .error-tip
    margin-left: 8px
    color: $error-color
  .btn-create
    display: block
    width: 320px
    height: 40px
    font-size: $font-size-large
    font-weight: 600
    letter-spacing: 0.2em
  >>>.ivu-date-picker
    .ivu-input
      height: 40px
      border-radius: 0
  >>>.ivu-radio-wrapper
    margin-right: 16px
  >>>.ivu-checkbox
    margin-right: 4px
</style>
