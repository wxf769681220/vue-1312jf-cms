<template>
  <div class="match-create">
    <h2 class="mb-3">新建比赛</h2>
    <ValidationObserver
      class="form"
      ref="observer"
      tag="form"
      v-slot="{ valid }"
    >
      <!-- 比赛名称 -->
      <validation-provider class="form-group" tag="div" rules="required" v-slot="{ errors }">
        <div class="input-group">
          <div class="input-wrap">
            <input class="input-control" type="text" placeholder="比赛名称" v-model="createForm.name">
          </div>
        </div>
      </validation-provider>

      <!-- 比赛地点 -->
      <validation-provider class="form-group" tag="div" rules="required" v-slot="{ errors }">
        <div class="input-group">
          <div class="input-wrap">
            <input class="input-control" type="text" placeholder="比赛地点" v-model="createForm.location">
          </div>
        </div>
      </validation-provider>

      <!-- 比赛时间 -->
      <div class="form-group">
        <validation-provider class="mb-3" name="startTime" tag="div" rules="required|startTime" v-slot="{ errors }">
          <div class="content-inline">
            <DatePicker
              type="datetime"
              placeholder="比赛开始时间"
              v-model="createForm.startTime"
              :options="disabledTime"
            ></DatePicker>
            <div class="error-tip" v-show="errors.length">{{ errors[0] }}</div>
          </div>
        </validation-provider>
        <validation-provider tag="div" rules="required|endTime:startTime" v-slot="{ errors }">
          <div class="content-inline">
            <DatePicker
              type="datetime"
              placeholder="比赛结束时间"
              v-model="createForm.endTime"
              :options="disabledTime"
            ></DatePicker>
            <div class="error-tip" v-show="errors.length">{{ errors[0] }}</div>
          </div>
        </validation-provider>
      </div>

      <!-- 联系人 -->
      <div class="form-group">
        <div class="content-inline">
          <validation-provider rules="required" v-slot="{ errors }">
            <div class="input-group">
              <div class="input-wrap diff">
                <input
                  class="input-control"
                  type="text"
                  placeholder="联系人"
                  v-model="createForm.contacts"
                >
              </div>
            </div>
          </validation-provider>
          <span class="px-3">-</span>
          <validation-provider rules="required" v-slot="{ errors }">
            <div class="input-group">
              <div class="input-wrap diff">
                <input
                  class="input-control"
                  type="text"
                  placeholder="手机号"
                  v-model="createForm.contactsMobile"
                >
              </div>
            </div>
          </validation-provider>
        </div>
      </div>

      <!-- 裁判长 -->
      <div class="form-group">
        <div class="content-inline">
          <validation-provider rules="required" v-slot="{ errors }">
            <div class="input-group">
              <div class="input-wrap diff">
                <input
                  class="input-control"
                  type="text"
                  placeholder="裁判长"
                  v-model="createForm.referee"
                >
              </div>
            </div>
          </validation-provider>
          <span class="px-3">-</span>
          <validation-provider rules="required" v-slot="{ errors }">
            <div class="input-group">
              <div class="input-wrap diff">
                <input
                  class="input-control"
                  type="text"
                  placeholder="手机号"
                  v-model="createForm.refereeMobile"
                >
              </div>
            </div>
          </validation-provider>
        </div>
      </div>

      <!-- 记录员 -->
      <div class="form-group">
        <div class="content-inline">
          <validation-provider rules="required" v-slot="{ errors }">
            <div class="input-group">
              <div class="input-wrap diff">
                <input
                  class="input-control"
                  type="text"
                  placeholder="记录员"
                  v-model="createForm.record"
                >
              </div>
            </div>
          </validation-provider>
          <span class="px-3">-</span>
          <validation-provider rules="required" v-slot="{ errors }">
            <div class="input-group">
              <div class="input-wrap diff">
                <input
                  class="input-control"
                  type="text"
                  placeholder="手机号"
                  v-model="createForm.recordMobile"
                >
              </div>
            </div>
          </validation-provider>
        </div>
      </div>

      <!-- 比赛类型 -->
      <validation-provider class="form-group" tag="div" rules="required" v-slot="{ errors }">
        <div class="input-group">
          <div class="input-wrap">
            <span class="lab">比赛类型：</span>
            <RadioGroup class="radio-group" v-model="newType">
              <Radio label="0">单人赛</Radio>
              <Radio label="2">双人赛</Radio>
              <Radio label="1">团体赛</Radio>
            </RadioGroup>
          </div>
        </div>
      </validation-provider>

      <!-- 计分规则 -->
      <validation-provider class="form-group" tag="div" rules="required" v-slot="{ errors }">
        <div class="input-group">
          <div class="input-wrap">
            <span class="lab">计分规则：</span>
            <RadioGroup class="radio-group" v-model="newRule">
              <Radio label="0">社体规则（普通）</Radio>
              <Radio label="1">团体规则（淮安）</Radio>
            </RadioGroup>
          </div>
        </div>
      </validation-provider>

      <!-- 是否签到 -->
      <validation-provider class="form-group" tag="div" rules="required" v-slot="{ errors }">
        <div class="input-group">
          <div class="input-wrap">
            <span class="lab">签到：</span>
            <RadioGroup class="radio-group" v-model="newSignIn">
              <Radio label="1">是</Radio>
              <Radio label="0">否</Radio>
            </RadioGroup>
          </div>
        </div>
      </validation-provider>

      <!-- 登录按钮 -->
      <Button
        class="btn-create"
        type="primary"
        :long="true"
        :disabled="!valid"
        @click="onBtnCreate"
      >
        <span>创建</span>
      </Button>
    </ValidationObserver>
  </div>
</template>

<script>
import { Button, DatePicker, RadioGroup, Radio } from 'view-design'
// ES6+ Add a rule.
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate'
import { required } from 'vee-validate/dist/rules'
import { createMatch } from 'api'
import { mapGetters } from 'vuex'

export default {
  name: 'match-create',
  data() {
    return {
      createForm: {
        name: '无锡掼蛋世界单人赛2019',
        location: '无锡新吴区金城东路333号工业博览园总园区28栋301室',
        startTime: '',
        endTime: '',
        contacts: '阿森松',
        contactsMobile: '12345678901',
        referee: '蔷薇',
        refereeMobile: '12345678902',
        record: '杨小峰',
        recordMobile: '12345678903',
        type: 0,
        rule: 0,
        signIn: true
      },
      disabledTime: {
        disabledDate(date) {
          return date && date.valueOf() < Date.now() - 86400000
        }
      }
    }
  },
  computed: {
    ...mapGetters(['token']),
    newType: {
      get() {
        return String(this.createForm.type)
      },
      set(value) {
        this.createForm.type = Number(value)
      }
    },
    newRule: {
      get() {
        return String(this.createForm.rule)
      },
      set(value) {
        this.createForm.rule = Number(value)
      }
    },
    newSignIn: {
      get() {
        return String(Number(this.createForm.signIn))
      },
      set(value) {
        this.createForm.signIn = Boolean(Number(value))
      }
    }
  },
  created() {
    this.checkInput()
  },
  methods: {
    onBtnCreate() {
      // console.log(this.createForm)
      let sendData = {
        name: this.createForm.name,
        location: this.createForm.location,
        startTime: this.createForm.startTime,
        endTime: this.createForm.endTime,
        contacts: this.createForm.contacts,
        contactsPhone: this.createForm.contactsMobile,
        judge: this.createForm.referee,
        judgePhone: this.createForm.refereeMobile,
        recorder: this.createForm.record,
        recorderPhone: this.createForm.recordMobile,
        rule: this.createForm.type,
        regionRule: this.createForm.rule,
        needSignIn: this.createForm.signIn
      }
      createMatch(sendData, this.token).then((res) => {
        console.log(res)
        if (res.code === 200) {
          this.$router.push({
            path: '/home/match-list'
          })
        } else {
          console.log('创建比赛失败!')
        }
      })
    },
    checkInput() {
      extend('required', {
        ...required,
        message: '/* 必填项不能为空*/'
      })
      extend('startTime', {
        validate: (value) => new Date(value) > new Date(),
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
    Button,
    DatePicker,
    RadioGroup,
    Radio
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
.match-create
  position: relative
  margin: 20px
  padding: 20px
  background-color: $white
  .form
    display: block
    padding: 20px 15px
    border: 1px solid $border-color
    .form-group
      margin-bottom: 16px
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
</style>
