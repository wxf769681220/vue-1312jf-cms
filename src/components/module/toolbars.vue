<template>
  <div class="toolbars">
    <ButtonGroup class="btn-group" :size="buttonSize">
      <Button type="primary" v-show="isUpload" :size="buttonSize" @click="onUpload">导入报名表</Button>
      <Button type="warning" v-show="isAdd" :size="buttonSize" @click="onAddNew">新增</Button>
      <Button type="error" v-show="isDelete" :size="buttonSize" @click="onDelete">删除</Button>
      <Button type="warning" v-show="isPrint" :size="buttonSize" @click="onPrint">打印</Button>
      <Button type="error" v-show="isDownload" :size="buttonSize" @click="onDownload">下载</Button>
      <Button type="info" v-show="isRefresh" :size="buttonSize" @click="onRefresh">刷新</Button>
      <Button type="default" v-show="isReturn" :size="buttonSize" @click="onReturn">返回</Button>
    </ButtonGroup>
  </div>
</template>

<script>
// Iview Components
import { Button, ButtonGroup } from 'view-design'

export default {
  name: 'toolbars',
  props: {
    isRefresh: {
      type: Boolean,
      default: true
    },
    isReturn: {
      type: Boolean,
      default: true
    },
    isDownload: {
      type: Boolean,
      default: false
    },
    isPrint: {
      type: Boolean,
      default: false
    },
    isUpload: {
      type: Boolean,
      default: false
    },
    isAdd: {
      type: Boolean,
      default: false
    },
    isDelete: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      buttonSize: 'large'
    }
  },
  computed: {},
  watch: {},
  mounted() {},
  created() {},
  methods: {
    onReturn() {
      this.$emit('return')
    },
    onRefresh() {
      this.$emit('refresh')
    },
    onDownload() {
      this.$emit('download')
    },
    onPrint() {
      this.$emit('print')
    },
    onUpload() {
      this.$emit('upload')
    },
    onAddNew() {
      this.$emit('addNew')
    },
    onDelete() {
      this.$emit('deleteX')
    }
  },
  beforedestroy() {},
  components: {
    Button,
    ButtonGroup
  }
}
</script>

<style lang="stylus" scoped>
</style>
