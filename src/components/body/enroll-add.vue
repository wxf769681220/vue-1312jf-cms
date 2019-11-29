<template>
  <Modal
    class="enroll-add"
    class-name="vertical-center-modal"
    v-model="modalEnrollAdd"
    :footer-hide="true"
    @on-cancel="onEnrollAddCancel"
  >
    <h3 slot="header">新增数据</h3>
    <ValidationObserver class="form" ref="observer" tag="form" v-slot="{ valid }">
      <!-- 队伍号 -->
      <validation-provider class="form-group" tag="div" rules="required" v-slot="{ errors }" v-if="matchRule === 1">
        <div class="input-group">
          <label>队伍号：</label>
          <input class="input-control" type="text" v-model="myTeam.teamNo">
        </div>
      </validation-provider>

      <!-- 队伍名称 -->
      <validation-provider class="form-group" tag="div" rules="required" v-slot="{ errors }" v-if="matchRule === 1">
        <div class="input-group">
          <label>队伍名称：</label>
          <input class="input-control" type="text" v-model="myTeam.teamName">
        </div>
      </validation-provider>

      <!-- 选手号 -->
      <validation-provider class="form-group" tag="div" rules="required" v-slot="{ errors }">
        <div class="input-group">
          <label>选手号：</label>
          <input class="input-control" type="text" v-model="player.enrollNum">
        </div>
      </validation-provider>

      <!-- 真实姓名 -->
      <validation-provider class="form-group" tag="div" rules="required" v-slot="{ errors }">
        <div class="input-group">
          <label>真实姓名：</label>
          <input class="input-control" type="text" v-model="player.realName">
        </div>
      </validation-provider>

      <!-- 身份证号 -->
      <validation-provider class="form-group" tag="div" rules="required" v-slot="{ errors }">
        <div class="input-group">
          <label>身份证号：</label>
          <input class="input-control" type="text" v-model="player.idNumber">
        </div>
      </validation-provider>

      <!-- 手机号 -->
      <validation-provider class="form-group" tag="div" rules="required" v-slot="{ errors }">
        <div class="input-group">
          <label>手机号：</label>
          <input class="input-control" type="text" v-model="player.phone">
        </div>
      </validation-provider>

      <!-- 地区/单位 -->
      <validation-provider class="form-group" tag="div" rules="required" v-slot="{ errors }">
        <div class="input-group">
          <label>地区/单位：</label>
          <input class="input-control" type="text" v-model="player.region">
        </div>
      </validation-provider>

      <!-- 填表人 -->
      <validation-provider class="form-group" tag="div" rules="required" v-slot="{ errors }">
        <div class="input-group">
          <label>填表人：</label>
          <input class="input-control" type="text" v-model="player.preparer">
        </div>
      </validation-provider>

      <!-- 填表人电话 -->
      <validation-provider class="form-group" tag="div" rules="required" v-slot="{ errors }">
        <div class="input-group">
          <label>填表人电话：</label>
          <input class="input-control" type="text" v-model="player.preparerPhone">
        </div>
      </validation-provider>

      <!-- 备注 -->
      <div class="form-group">
        <div class="input-group">
          <label>备注：</label>
          <textarea v-model="player.remark" rows="3" cols="43"></textarea>
        </div>
      </div>

      <Button
        class="btn-confirm"
        type="primary"
        :long="true"
        :disabled="!valid"
        @click="onEnrollAddConfirm"
      >
        <span>添加</span>
      </Button>
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
    matchRule: {
      type: Number,
      default: 0 // 0:单人赛 1：团体赛 2：双人赛
    }
  },
  data() {
    return {
      modalEnrollAdd: false,
      player: {
        enrollNum: '',
        realName: '',
        idNumber: '',
        phone: '',
        region: '',
        preparer: '',
        preparerPhone: '',
        remark: ''
      },
      myTeam: {
        teamNo: '',
        teamName: ''
      }
    }
  },
  created() {
    this._checkInput()
  },
  methods: {
    onEnrollAddConfirm() {
      if (this.matchRule === 0 || this.matchRule === 2) {
        this.$emit('enrollAddConfirm', this.player)
      } else {
        // ...
      }
      this._initInputValue()
    },
    onEnrollAddCancel() {
      this.$emit('enrollAddCancel')
      this._initInputValue()
    },
    _initInputValue() {
      this.player.enrollNum = ''
      this.player.realName = ''
      this.player.idNumber = ''
      this.player.phone = ''
      this.player.region = ''
      this.player.preparer = ''
      this.player.preparerPhone = ''
      this.player.remark = ''
      this.myTeam.teamNo = ''
      this.myTeam.teamName = ''
    },
    show() {
      this.modalEnrollAdd = true
    },
    hide() {
      this.modalEnrollAdd = false
    },
    _checkInput() {
      extend('required', {
        ...required
      })
    }
  },
  components: {
    Modal,
    Button,
    ValidationObserver,
    ValidationProvider
  }
}
</script>
