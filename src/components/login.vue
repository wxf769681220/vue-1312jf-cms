<template>
  <div class="login">
    <div class="header">
      <h1 class>线下赛计分系统管理后台</h1>
    </div>

    <ValidationObserver class="form" ref="observer" tag="form" v-slot="{ valid }">
      <!-- 用户名 -->
      <validation-provider
        class="form-group"
        name="mobile"
        tag="div"
        rules="required"
        v-slot="{ errors }"
      >
        <div class="input-group">
          <div class="input-wrap">
            <input class="input-control" type="text" placeholder="手机号" v-model="account.mobile">
          </div>
        </div>
      </validation-provider>

      <!-- 密码 -->
      <validation-provider
        class="form-group"
        name="password"
        tag="div"
        rules="required"
        v-slot="{ errors }"
      >
        <div class="input-group">
          <div class="input-wrap">
            <input
              class="input-control"
              type="password"
              placeholder="密码"
              v-model="account.password"
            >
          </div>
        </div>
      </validation-provider>

      <!-- 登录按钮 -->
      <Button
        class="btn-login"
        type="success"
        :long="true"
        :disabled="!valid"
        @click="onLogin"
      >
        <span>登录</span>
      </Button>

      <div class="my-2 text-error" v-show="errors">{{errorMsg}}</div>
    </ValidationObserver>
  </div>
</template>

<script>
import { Button } from 'view-design'
// ES6+ Add a rule.
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate'
import { required } from 'vee-validate/dist/rules'
import ZHCN from 'vee-validate/dist/locale/zh_CN'

import { Login } from 'api'
import { mapMutations } from 'vuex'

export default {
  name: 'login',
  data() {
    return {
      errors: false,
      errorMsg: '',
      account: {
        mobile: '',
        password: ''
      }
    }
  },
  watch: {},
  mounted() {},
  created() {
    this.checkInput()
  },
  methods: {
    ...mapMutations({
      setMobile: 'SET_MOBILE',
      setToken: 'SET_TOKEN'
    }),
    onLogin() {
      Login({
        'mobile': this.account.mobile,
        'password': this.account.password
      }).then((res) => {
        // console.log(res)
        if (res.code === 200) {
          this.setToken(res.token)
          this.setMobile(this.account.mobile)
          this.$router.push({
            path: '/home/map'
          })
          this._clearInput()
        } else {
          this.errors = true
          this.errorMsg = res.err
        }
      })
    },
    checkInput() {
      extend('required', {
        ...required,
        message: ZHCN.messages['required']
      })
    },
    _clearInput() {
      this.account.mobile = ''
      this.account.password = ''
    }
  },
  components: {
    Button,
    ValidationObserver,
    ValidationProvider
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
.login
  min-height: 100vh
  background-color: $body-bg-color
  .header
    padding: 50px 0
    text-align: center
  .form
    display: block
    margin: 0 auto
    padding: 20px 15px
    width: 352px
    height: auto
    background-color: $white
    border: 1px solid $border-color
    h2
      letter-spacing: 0.2em
    .form-group
      margin-bottom: 15px
    .input-group
      display: flex
      align-items: center
    .input-wrap
      position: relative
      display: flex
      flex: 0 0 320px
      width: 320px
      &.wid
        margin-right: 10px
        flex: 0 0 auto
        width: auto
      .input-control
        padding: 6px 34px 6px 12px
        flex: 1 1 auto
        width: auto
        min-height: 40px
        line-height: 24px
        &.invalid
          border: 1px solid red
          box-shadow: none
      .icon-validate-wrap
        position: absolute
        top: 11px
        right: 8px
    .error-tip
      flex: 1 1 auto
      margin-left: 10px
      color: $error-color
  .btn-login
    display: block
    width: 320px
    height: 40px
    font-size: $font-size-large
    font-weight: 600
    letter-spacing: 0.2em
</style>
