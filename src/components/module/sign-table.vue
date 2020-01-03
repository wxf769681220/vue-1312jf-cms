<template>
  <div class="sign-table" v-show="signTable">
    <section class="sign-table-header">
      <div class="content">
        <div class="content-inline justify-content-between">
          <h2>签名表：</h2>
          <Button class="ml-2" type="default" @click="hide">返回</Button>
        </div>
      </div>
    </section>
    <section class="sign-table-body">
      <div class="content">
        <!-- 单人赛 -->
        <div class="table-wrap table-0" v-if="matchType === 0">
          <table class="table" v-for="(table, index) in TableData0" :key="index">
            <thead class="bg-color">
              <tr>
                <th>选手号</th>
                <th>姓名</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in table" :key="item.enrollNum">
                <td class="fontStyle">{{item.enrollNum}}</td>
                <td :class="{'signLight': item.isSignIn}">{{item.realName}}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- 双人赛 -->
        <div class="table-wrap table-2" v-if="matchType === 2">
          <table class="table" v-for="(item, index) in TableData2" :key="index">
            <thead class="bg-color">
              <tr>
                <th>选手号</th>
                <th>姓名</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="fontStyle" rowspan="2" :class="{'signLight': item[0].isSignIn && item[1].isSignIn}">{{item[0].enrollNum}}</td>
                <td :class="{'signLight': item[0].isSignIn}">{{item[0].realName}}</td>
              </tr>
              <tr>
                <td :class="{'signLight': item[1].isSignIn}">{{item[1].realName}}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- 团体赛 -->
      </div>
    </section>
  </div>
</template>

<script>
import { Button } from 'view-design'
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
      default: 0
    }
  },
  data() {
    return {
      signTable: false,
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
      console.log(arr)
      return arr
    },
    TableData2() {
      let arr = arraySubGroup(this.data, 2)
      console.log(arr)
      return arr
    }
  },
  watch: {
    signTable(val) {
      if (val) {
        this.$emit('screen-lock')
      } else {
        this.$emit('screen-free')
      }
    }
  },
  mounted() {},
  methods: {
    hide() {
      this.signTable = false
    },
    show() {
      this.signTable = true
    }
  },
  components: {
    Button
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
@import '~common/stylus/media'
.sign-table
  position: fixed
  top: 0
  right: 0
  bottom: 0
  left: 0
  z-index: 10
  background-color: $white
  overflow-y: scroll
  .sign-table-header
    .content
      padding: 10px 20px
      border-bottom: 1px solid $border-color
  .sign-table-body
    .content
      padding: 20px 0
      .table-wrap
        display: flex
        flex-wrap: wrap
        .table
          font-size: $font-size-large
          text-align: center
          border: 1px solid $table-border-color
          th, td
            padding: 6px 10px
            border: 1px solid $table-border-color
        .fontStyle
          font-size: $font-size-large-xl
          font-weight: 600
  .bg-color
    background-color: $table-thead-bg
  .signLight
    color: $white
    background-color: $success-color
</style>
