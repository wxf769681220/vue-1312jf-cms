<template>
  <div class="toolbars-table">
    <ButtonGroup class="btn-group" :size="buttonSize">
      <Button type="error" v-show="isExport" :size="buttonSize" @click="onExport">导出</Button>
      <Button type="warning" v-show="isPrint" :size="buttonSize" @click="onPrint">打印</Button>
      <Button type="info" v-show="isRefresh" :size="buttonSize" @click="onRefresh">刷新</Button>
      <Button type="default" v-show="isReturn" :size="buttonSize" @click="onReturn">返回</Button>
    </ButtonGroup>
  </div>
</template>

<script>
import { Button, ButtonGroup } from 'view-design'

export default {
  name: 'toolbars-table',
  props: {
    isExport: {
      type: Boolean,
      default: true
    },
    isPrint: {
      type: Boolean,
      default: true
    },
    isRefresh: {
      type: Boolean,
      default: true
    },
    isReturn: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      buttonSize: 'large'
    }
  },
  methods: {
    onExport() {
      this.$emit('on-export')
    },
    onPrint() {
      this.$emit('on-print')
    },
    onRefresh() {
      this.$emit('on-refresh')
    },
    onReturn() {
      this.$emit('on-return')
    }
  },
  components: {
    Button,
    ButtonGroup
  }
}
</script>
