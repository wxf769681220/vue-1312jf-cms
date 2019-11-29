<template>
  <Modal
    class="enroll-modify"
    class-name="vertical-center-modal"
    footer-hide
    v-model="modalEnrollModify"
    @on-cancel="onEnrollModifyCancel"
  >
    <h3 slot="header">修改数据</h3>
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
          <input class="input-control" type="text" v-model="player.enrollNum" :disabled="true" :style="{'background-color': 'rgb(248,248,248)'}">
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
        @click="onEnrollModifyConfirm"
      >
        <span>修改</span>
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
  name: 'enroll-modify',
  props: {
    data: {
      type: Object,
      defalut() {
        return {}
      }
    },
    matchRule: {
      type: Number,
      default: 0 // 0:单人赛 1：团体赛 2：双人赛
    }
  },
  data() {
    return {
      modalEnrollModify: false,
      userId: 1, // 额外维护一个userId, 修改数据时需要传递出去
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
  watch: {
    data() {
      this._dataChange()
    }
  },
  mounted() {
  },
  created() {
    this._checkInput()
  },
  methods: {
    onEnrollModifyConfirm() {
      if (this.matchRule === 0 || this.matchRule === 2) {
        this.$emit('enrollModifyConfirm', this.player, this.userId)
      } else {
        // ...
      }
    },
    onEnrollModifyCancel() {
      this.$emit('enrollModifyCancel')
      this._dataChange()
    },
    show() {
      this.modalEnrollModify = true
    },
    hide() {
      this.modalEnrollModify = false
    },
    _dataChange() {
      this.userId = this.data.id
      this.player.enrollNum = this.data.enrollNum
      this.player.realName = this.data.realName
      this.player.idNumber = this.data.idNumber
      this.player.phone = this.data.phone
      this.player.region = this.data.region
      this.player.preparer = this.data.preparer
      this.player.preparerPhone = this.data.preparerPhone
      this.player.remark = this.data.remark
      this.myTeam.teamNo = this.data.teamNo
      this.myTeam.teamName = this.data.teamName
    },
    _checkInput() {
      extend('required', {
        ...required
      })
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
