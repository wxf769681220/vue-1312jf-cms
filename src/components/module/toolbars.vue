<template>
  <div class="toolbars clearfix">
    <ButtonGroup class="btn-group" :size="buttonSize">
      <Button type="primary" v-show="isUpload" :size="buttonSize" @click="onUpload">导入</Button>
      <Button type="warning" v-show="isAdd" :size="buttonSize" @click="onAdd">新增</Button>
      <Button type="error" v-show="isDelete" :size="buttonSize" @click="onDelete">删除</Button>
      <Button type="success" v-show="isDrawLots" :size="buttonSize" @click="onDrawLots">抽签</Button>

      <Button type="info" v-show="isRefresh" :size="buttonSize" @click="onRefresh">刷新</Button>
      <Button type="default" v-show="isReturn" :size="buttonSize" @click="onReturn">返回</Button>
      <Button type="error" v-show="isDownload" :size="buttonSize" @click="onDownload">下载</Button>
      <Button type="warning" v-show="isPrint" :size="buttonSize" @click="onPrint">打印</Button>
    </ButtonGroup>
  </div>
</template>

<script>
import { Button, ButtonGroup } from 'view-design'

export default {
  name: 'toolbars',
  inject: ['reload'],
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
    isDrawLots: {
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
      this.$router.go(-1)
    },
    onRefresh() {
      this.reload()
      this.$Message.success('页面已刷新!')
    },
    onDownload() {},
    onPrint() {},
    onUpload() {
      this.$emit('upload')
    },
    onAdd() {},
    onDelete() {},
    onDrawLots() {}
  },
  components: {
    Button,
    ButtonGroup
  },
  beforedestroy() {}
}
</script>

<style lang="stylus" scoped>
.toolbars
  margin-bottom: 20px
  .btn-group
    float: right
</style>
