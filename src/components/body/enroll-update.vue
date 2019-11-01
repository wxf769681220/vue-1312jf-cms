<template>
  <Modal
    class="enroll-update"
    class-name="vertical-center-modal"
    width="385px"
    v-model="modalEnrollUpdate"
    footer-hide
    @on-cancel="onCancel"
  >
    <h3 slot="header">{{newtTitle}}</h3>
    <ValidationObserver class="form" ref="observer" tag="form" v-slot="{ valid }">
      <!-- 参赛号 -->
      <validation-provider class="form-group" tag="div" rules="required" v-slot="{ errors }">
        <div class="input-group">
          <div class="input-wrap">
            <input
              class="input-control"
              type="text"
              placeholder="参赛号"
              v-model="createForm.enrollNum"
              :class="{errors: errors.length}"
              :disabled="isDisabled"
              :style="isDisabled ? {'background-color': 'rgb(235,247,255)'} : {}"
            >
          </div>
        </div>
      </validation-provider>
      <!-- 真实姓名 -->
      <validation-provider class="form-group" tag="div" rules="required" v-slot="{ errors }">
        <div class="input-group">
          <div class="input-wrap">
            <input
              class="input-control"
              type="text"
              placeholder="真实姓名"
              :class="{errors: errors.length}"
              v-model="createForm.realName"
            >
          </div>
        </div>
      </validation-provider>
      <!-- 身份证号 -->
      <validation-provider class="form-group" tag="div" rules="required" v-slot="{ errors }">
        <div class="input-group">
          <div class="input-wrap">
            <input
              class="input-control"
              type="text"
              placeholder="身份证号"
              :class="{errors: errors.length}"
              v-model="createForm.idNumber"
            >
          </div>
        </div>
      </validation-provider>
      <!-- 手机号 -->
      <validation-provider class="form-group" tag="div" rules="required" v-slot="{ errors }">
        <div class="input-group">
          <div class="input-wrap">
            <input
              class="input-control"
              type="text"
              placeholder="手机号"
              :class="{errors: errors.length}"
              v-model="createForm.phone"
            >
          </div>
        </div>
      </validation-provider>
      <!-- 地区/单位 -->
      <validation-provider class="form-group" tag="div" rules="required" v-slot="{ errors }">
        <div class="input-group">
          <div class="input-wrap">
            <input
              class="input-control"
              type="text"
              placeholder="地区/单位"
              :class="{errors: errors.length}"
              v-model="createForm.region"
            >
          </div>
        </div>
      </validation-provider>
      <!-- 填表人 -->
      <validation-provider class="form-group" tag="div" rules="required" v-slot="{ errors }">
        <div class="input-group">
          <div class="input-wrap">
            <input
              class="input-control"
              type="text"
              placeholder="填表人"
              :class="{errors: errors.length}"
              v-model="createForm.preparer"
            >
          </div>
        </div>
      </validation-provider>
      <!-- 填表人电话 -->
      <validation-provider class="form-group" tag="div" rules="required" v-slot="{ errors }">
        <div class="input-group">
          <div class="input-wrap">
            <input
              class="input-control"
              type="text"
              placeholder="填表人电话"
              :class="{errors: errors.length}"
              v-model="createForm.preparerPhone"
            >
          </div>
        </div>
      </validation-provider>
      <!-- 备注 -->
      <div class="form-group">
        <div class="input-group">
          <div class="input-wrap">
            <input
              class="input-control"
              type="text"
              placeholder="备注（非必填选项）"
              v-model="createForm.remark"
            >
          </div>
        </div>
      </div>
      <Button
        class="btn-confirm"
        type="primary"
        :long="true"
        :disabled="!valid"
        @click="onBtnConfirm"
      >
        <span>{{newBtnText}}</span>
      </Button>
      <p class="text-error mt-3">/* 红框为必填选项不能为空 */</p>
    </ValidationObserver>
  </Modal>
</template>

<script>
// Iview Components
import { Modal, Button } from 'view-design'
// ES6+ Add a rule.
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate'
import { required } from 'vee-validate/dist/rules'

export default {
  name: 'enroll-add',
  props: {
    data: {
      type: Object,
      defalut: null
    },
    operateType: {
      type: String,
      defalut: '' // add：表示新增，modify：表示修改
    }
  },
  data() {
    return {
      modalEnrollUpdate: false,
      isDisabled: false,
      createForm: {
        enrollNum: '',
        realName: '',
        idNumber: '',
        phone: '',
        region: '',
        preparer: '',
        preparerPhone: '',
        remark: ''
      }
    }
  },
  computed: {
    newtTitle() {
      let title = ''
      if (this.operateType === 'add') {
        title = '新增数据'
      } else if (this.operateType === 'modify') {
        title = '修改数据'
      } else {
        // ...
      }
      return title
    },
    newBtnText() {
      let text = ''
      if (this.operateType === 'add') {
        text = '添加'
      } else if (this.operateType === 'modify') {
        text = '修改'
      } else {
        // ...
      }
      return text
    }
  },
  watch: {
    data(value) {
      this.createForm = value
      this.isDisabled = true
    }
  },
  mounted() {},
  created() {
    this.checkInput()
  },
  methods: {
    onBtnConfirm() {
      console.log(this.createForm)
      // 派发事件（输出数据）
      this.$emit('outPutData', this.createForm, this.operateType)
      this.hide()
    },
    checkInput() {
      extend('required', {
        ...required,
        message: '/* 必填项不能为空!*/'
      })
    },
    onCancel() {
      this.$emit('cancel')
    },
    show() {
      this.modalEnrollUpdate = true
    },
    hide() {
      this.modalEnrollUpdate = false
    }
  },
  beforedestroy() {},
  components: {
    Modal,
    Button,
    ValidationObserver,
    ValidationProvider
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
.enroll-update
  .form
    display: block
    padding: 15px
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
    .input-control
      padding: 6px 12px
      flex: 1 1 auto
      width: auto
      min-height: 40px
      line-height: 24px
      &.errors
        border-color: $error-color
        box-shadow: none
    .btn-confirm
      display: block
      width: 320px
      height: 40px
      font-size: $font-size-large
      font-weight: 600
      letter-spacing: 0.2em
</style>
