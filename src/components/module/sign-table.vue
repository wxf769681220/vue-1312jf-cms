<template>
  <div class="sign-table" v-show="signTable">
    <div class="content-inline justify-content-between py-3">
      <h2>签名列表：</h2>
      <RadioGroup v-model="fontSizeChange" type="button">
        <Radio class="bg-primary text-white">字体</Radio>
        <Radio label="small">小</Radio>
        <Radio label="default">中</Radio>
        <Radio label="large">大</Radio>
        <Button class="ml-2" type="default" @click="hide">返回</Button>
      </RadioGroup>
    </div>
    <!-- 单人赛 -->
    <div class="table-0" v-if="matchType === 0">
      <Table
        class="table"
        border
        v-for="(item, index) in TableData0"
        :key="index"
        :stripe="true"
        :size="fontSizeChange"
        :columns="signTableColumns"
        :data="item"
        :row-class-name="rowClassName"
      ></Table>
    </div>
    <!-- 双人赛 -->
    <div class="table-2" v-if="matchType === 2">
      <Table
        class="table"
        border
        v-for="(item, index) in TableData2"
        :key="index"
        :stripe="true"
        :size="fontSizeChange"
        :columns="signTableColumns"
        :data="item"
        :row-class-name="rowClassName"
        :span-method="handleSpan"
      ></Table>
    </div>
    <!-- 团体赛 -->
  </div>
</template>

<script>
// Iview Components
import {
  Table,
  Button,
  RadioGroup,
  Radio
} from 'view-design'
// Script
import { arraySubGroup } from 'common/js/lib'

export default {
  name: 'sign-table',
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    },
    matchType: {
      type: Number,
      default: 2
    }
  },
  data() {
    return {
      signTable: false,
      fontSizeChange: 'large',
      signTableColumns: [
        {
          title: '选手号',
          key: 'enrollNum'
        },
        {
          title: '姓名',
          key: 'realName'
        }
      ]
    }
  },
  computed: {
    TableData0() {
      let arr = arraySubGroup(this.data, 10)
      return arr
    },
    TableData2() {
      let arr = arraySubGroup(this.data, 2)
      return arr
    }
  },
  watch: {},
  mounted() {},
  created() {},
  methods: {
    handleSpan({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0 && columnIndex === 0) {
        return {
          rowspan: 2,
          colspan: 1
        }
      } else if (rowIndex === 1 && columnIndex === 0) {
        return {
          rowspan: 0,
          colspan: 0
        }
      }
    },
    rowClassName(row) {
      if (row.isSignIn) {
        return 'sign'
      }
    },
    hide() {
      this.signTable = false
    },
    show() {
      this.signTable = true
    }
  },
  beforedestroy() {},
  components: {
    Table,
    Button,
    RadioGroup,
    Radio
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
.sign-table
  position: fixed
  top: 0
  left: 0
  z-index: 10
  padding: 0 20px
  width: 100%
  height: 100%
  background-color: $white
  overflow: scroll
  .table-0
    display: flex
    flex-wrap: wrap
  .table
    display: inline-block
    margin-left: -1px
    width: 210px
    font-weight: 700
  >>>.ivu-table
    td, th
      text-align: center
    .sign td
      color: $white
      background-color: $success-color
  >>>.ivu-table-large td
    height: 38px
  >>> .ivu-table-default td
    height: 32px
  >>> .ivu-table-small td
    height: 26px
  >>> .ivu-table-tbody > .ivu-table-row:first-child > td:first-child > .ivu-table-cell
    font-size: 30px
  .table-0
    >>> .ivu-table-tbody > .ivu-table-row > td:first-child > .ivu-table-cell
      font-size: 30px
</style>
