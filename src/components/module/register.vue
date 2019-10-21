<template>
  <ValidationObserver class="register" ref="observer" tag="form" v-slot="{ valid }">
    <!-- 设置用户名 -->
    <validation-provider
      class="form-group"
      name="userName"
      tag="div"
      rules="required|min:6|max:16"
      v-slot="{ errors, classes }"
    >
      <div class="input-group">
        <div class="input-wrap">
          <input
            class="input-control"
            type="text"
            placeholder="设置用户名"
            v-model="account.userName"
            :class="classes"
          >
          <div class="icon-validate-wrap" v-show="account.userName">
            <icon-validate :errors="errors" :size="18"></icon-validate>
          </div>
        </div>
        <div class="error-tip" v-show="errors.length">{{ errors[0] }}</div>
      </div>
    </validation-provider>

    <!-- 设置密码 -->
    <validation-provider
      class="form-group"
      name="password"
      tag="div"
      rules="required|min:6|max:16"
      v-slot="{ errors }"
    >
      <div class="input-group">
        <div class="input-wrap">
          <input
            class="input-control"
            type="password"
            placeholder="设置密码"
            v-model="account.password"
            @input="syncVuex($event.target.value)"
          >
          <div class="icon-validate-wrap" v-show="account.password">
            <icon-validate :errors="errors" :size="18"></icon-validate>
          </div>
        </div>
        <div class="error-tip" v-show="errors.length">{{ errors[0] }}</div>
      </div>
    </validation-provider>

    <!-- 确认密码 -->
    <validation-provider
      class="form-group"
      name="confirmPassword"
      tag="div"
      rules="required|match:password"
      v-slot="{ errors }"
    >
      <div class="input-group">
        <div class="input-wrap">
          <input
            class="input-control"
            type="password"
            placeholder="确认密码"
            v-model="account.confirmPassword"
          >
          <div class="icon-validate-wrap" v-show="account.confirmPassword">
            <icon-validate :errors="errors" :size="18"></icon-validate>
          </div>
        </div>
        <div class="error-tip" v-show="errors.length">{{ errors[0] }}</div>
      </div>
    </validation-provider>

    <!-- 设置手机号 -->
    <validation-provider
      class="form-group"
      name="mobile"
      tag="div"
      rules="numeric|length:11"
      v-slot="{ errors }"
    >
      <div class="input-group">
        <div class="input-wrap">
          <input
            class="input-control"
            type="text"
            placeholder="手机号"
            v-model="account.mobile"
          >
          <div class="icon-validate-wrap" v-show="account.mobile">
            <icon-validate :errors="errors" :size="18"></icon-validate>
          </div>
        </div>
        <div class="error-tip" v-show="errors.length">{{ errors[0] }}</div>
      </div>
    </validation-provider>

    <!-- 设置邮箱 -->
    <validation-provider
      class="form-group"
      name="mobile"
      tag="div"
      rules="email"
      v-slot="{ errors }"
    >
      <div class="input-group">
        <div class="input-wrap">
          <input
            class="input-control"
            type="text"
            placeholder="邮箱"
            v-model="account.email"
          >
          <div class="icon-validate-wrap" v-show="account.email">
            <icon-validate :errors="errors" :size="18"></icon-validate>
          </div>
        </div>
        <div class="error-tip" v-show="errors.length">{{ errors[0] }}</div>
      </div>
    </validation-provider>

    <!-- 验证码校验 -->
    <validation-provider
      class="form-group"
      name="validCode"
      tag="div"
      rules="required|same"
      v-slot="{ errors }"
    >
      <div class="input-group">
        <div class="input-wrap wid">
          <input
            class="input-control"
            type="text"
            placeholder="验证码"
            v-model="account.validCode"
          >
          <div class="icon-validate-wrap" v-show="account.validCode">
            <icon-validate :errors="errors" :size="18"></icon-validate>
          </div>
        </div>
        <captcha :value.sync="captcha.code" :width="captcha.width"></captcha>
        <div class="error-tip" v-show="errors.length">{{ errors[0] }}</div>
      </div>
    </validation-provider>

    <!-- 同意服务条款 -->
    <validation-provider
      class="service-terms"
      tag="div"
      rules="required"
      v-slot="{ errors }"
    >
      <label class="content-inline" for="checkbox">
        <input id="checkbox" type="checkbox" v-model="account.agree">
        <span class="ml-1">我已经阅读并同意</span>
      </label>
      <span class="terms">《用户服务条款》</span>
    </validation-provider>

    <!-- 图片类型 -->
    <!-- <validation-provider
      class="img-type"
      tag="div"
      rules="required|image"
      v-slot="{ errors }"
    >
      <label class="content-inline" for="pic">
        <input id="pic" type="file" @change="handleFileChange($event) || validate($event)">
        <div class="error-tip" v-show="errors.length">{{ errors[0] }}</div>
      </label>
    </validation-provider> -->

    <!-- 提交按钮 -->
    <Button
      class="btn-register"
      type="success"
      :long="true"
      :disabled="!valid || !account.agree"
      @click.stop.prevent="onRegister"
    >
      <span>立即注册</span>
    </Button>

    <!-- 重置按钮 -->
    <Button
      class="btn-reset mt-2"
      type="error"
      @click.stop.prevent="onReset"
    >
      <span>重置</span>
    </Button>
  </ValidationObserver>
</template>

<script>
import { Button } from 'iview'
import iconValidate from 'components/base/icon-validate'
import Captcha from 'components/base/captcha'

// ES6+ Add a rule.
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate'
import { required, max, min, length, numeric, email } from 'vee-validate/dist/rules'
import ZHCN from 'vee-validate/dist/locale/zh_CN'

export default {
  name: 'register',
  props: {},
  data() {
    return {
      account: {
        userName: '',
        password: '',
        confirmPassword: '',
        mobile: '',
        email: '',
        validCode: '', // 输入的验证码
        agree: false
      },
      captcha: {
        code: '', // 返回的验证码
        width: '112px'
      }
    }
  },
  watch: {},
  mounted() {
  },
  created() {
    this._checkItem()
  },
  methods: {
    onRegister() {},
    onReset() {
      // 需要手动重置输入的值
      this.account.userName = ''
      this.account.password = ''
      this.account.confirmPassword = ''
      this.account.mobile = ''
      this.account.email = ''
      this.account.validCode = ''
      this.account.agree = false
      // 可以用于将值提交给服务器后重置表单,注意它只重置验证状态，即错误消息和标志
      requestAnimationFrame(() => {
        this.$refs.observer.reset()
      })
    },
    syncVuex(value) {
      console.log(value)
    },
    validate() {},
    handleFileChange(value) {
      console.log(value)
    },
    _checkItem() {
      extend('required', {
        ...required,
        message: ZHCN.messages['required']
      })
      extend('max', {
        ...max,
        message: ZHCN.messages['max']
      })
      extend('min', {
        ...min,
        message: ZHCN.messages['min']
      })
      extend('length', {
        ...length,
        message: ZHCN.messages['length']
      })
      extend('numeric', {
        ...numeric,
        message: ZHCN.messages['numeric']
      })
      extend('email', {
        ...email,
        message: ZHCN.messages['email']
      })
      // extend('image', {
      //   ...image,
      //   message: ZHCN.messages['image']
      // })
      extend('match', {
        params: [{ name: 'confirmValue', isTarget: true }],
        validate: (value, { confirmValue }) => value === confirmValue,
        message: '两次输入的密码不一致!'
      })
      extend('same', {
        validate: value => value.toLowerCase() === this.captcha.code.toLowerCase(),
        message: '无效的验证码!'
      })
      extend('maxVal', {
        params: ['max'],
        validate(value, { max }) {
          return Number(value) <= max
        }
      })
      extend('asyncRule', {
        validate(value) {
          return new Promise(resolve => {
            // simulate a network request.
            setTimeout(() => {
              resolve(!!value)
            }, 300)
          })
        },
        message: 'This field is required'
      })
    }
  },
  components: {
    Button,
    ValidationObserver,
    ValidationProvider,
    iconValidate,
    Captcha
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'

.register
  display: block
  padding: 15px
  border: 1px solid $border-color
  .form-group
    margin-bottom: 15px
  .input-group
    display: flex
    align-items: center
  .input-wrap
    position: relative
    display: flex
    flex: 0 0 340px
    width: 340px
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
  .service-terms
    position: relative
    display: flex
    align-items: center
    justify-content: space-between
    width: 340px
    line-height: 42px
  .terms
    color: $primary-color
    cursor: pointer
  .btn-register
    display: block
    width: 340px
    font-size: $font-size-large
    font-weight: 600
    letter-spacing: 0.2em
</style>
