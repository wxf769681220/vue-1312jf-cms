<template>
  <div class="print-view">
    <div class="print-view-header">
      <div class="content">
        <div class="content-inline justify-content-between">
          <h2>打印</h2>
          <Button type="default" @click="hide">返回</Button>
        </div>
      </div>
    </div>
    <div class="print-view-body">
      <div class="content">
        <!-- 奖励签收表 -->
        <table class="table" v-if="printData.type === 'table01'">
          <thead>
            <tr>
              <th v-for="column in printData.columns" :key="column.title">{{column.title}}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(rows, index) in printData.data" :key="index">
              <td class="w-80">{{index + 1}}</td>
              <td class="w-120">{{rows.realName}}</td>
              <td class="w-120">{{rows.enrollNum}}</td>
              <td class="w-240"></td>
              <td class="w-200"></td>
              <td class="w-120"></td>
              <td class="w-140"></td>
              <td class="w-140"></td>
            </tr>
          </tbody>
        </table>
        <!-- 成绩公告 -->
        <table class="table" v-if="printData.type === 'table02'">
          <thead>
            <tr>
              <th v-for="column in printData.columns" :key="column.title">{{column.title}}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(rows, index) in printData.data" :key="index">
              <td>{{rows.rank}}</td>
              <td>{{rows.realName}}</td>
              <td>{{rows.region}}</td>
              <td>{{rows.enrollNum}}</td>
              <td>{{rows.totalScore}}</td>
              <td>{{rows.QSLJScore}}</td>
              <td>{{rows.SLCScore}}</td>
              <td>{{rows.JCScore}}</td>
              <td>{{rows.SJSScore}}</td>
              <td>{{rows.remake}}</td>
            </tr>
          </tbody>
        </table>
        <!-- 积分编排卡 -->
        <div v-if="printData.type === 'table03'">
          <table class="table mb-3" v-for="(player,index) in printData.data" :key="index">
            <thead>
              <tr>
                <th colspan="2">{{player.enrollNum}}</th>
                <th colspan="2">姓名</th>
                <th colspan="3">{{player.realName}}</th>
                <th colspan="3"></th>
              </tr>
              <tr>
                <th>轮次</th>
                <th>对手</th>
                <th>积分</th>
                <th>成绩</th>
                <th>去首累进分</th>
                <th>级差分</th>
                <th>备注</th>
                <th>对手团队</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in player.data" :key="index">
                <td>{{item.round}}</td>
                <td>{{item.opEnrollNum ? item.opEnrollNum : ''}}</td>
                <td>{{item.score}}</td>
                <td>{{item.newCJ}}</td>
                <td>{{item.newQSLJScore}}</td>
                <td>{{item.smallScore}}</td>
                <td>{{item.newStatus}}</td>
                <td></td>
              </tr>
              <tr>
                <td colspan="2">总计</td>
                <td>{{player.totalScore}}</td>
                <td></td>
                <td>{{player.QSLJScore}}</td>
                <td>{{player.JCScore}}</td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- 选手表 -->
        <table class="table" v-if="printData.type === 'table04'">
          <thead>
            <tr>
              <th v-for="column in printData.columns" :key="column.title">{{column.title}}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(rows, index) in printData.data" :key="index">
              <td class="">{{rows.enrollNum}}</td>
              <td class="">{{rows.realName}}</td>
              <td class="">{{rows.idNumber}}</td>
              <td class="">{{rows.phone}}</td>
              <td class="">{{rows.region}}</td>
              <td class="">{{rows.preparer}}</td>
              <td class="">{{rows.preparerPhone}}</td>
              <td class="">{{rows.remark}}</td>
            </tr>
          </tbody>
        </table>
        <!-- 报名表 -->
        <table class="table" v-if="printData.type === 'table05'">
          <thead>
            <tr>
              <th v-for="column in printData.columns" :key="column.title">{{column.title}}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(rows, index) in printData.data" :key="index">
              <td class="">{{rows.enrollNum}}</td>
              <td class="">{{rows.realName}}</td>
              <td class="">{{rows.idNumber}}</td>
              <td class="">{{rows.phone}}</td>
              <td class="">{{rows.region}}</td>
              <td class="">{{rows.preparer}}</td>
              <td class="">{{rows.preparerPhone}}</td>
              <td class="">{{rows.userName}}</td>
              <td class="">{{rows.isSignIn}}</td>
              <td class="">{{rows.verifyStatus}}</td>
              <td class="">{{rows.status}}</td>
              <td class="">{{rows.remark}}</td>
            </tr>
          </tbody>
        </table>
        <!-- 本轮桌次 -->
        <div class="table-wrap" v-if="printData.type === 'table06'">
          <table class="table" v-for="(table,index) in printData" :key="index">
            <tr>
              <td></td>
              <td>1</td>
              <td></td>
            </tr>
            <tr>
              <td class="">2</td>
              <td class="">
                11111
              </td>
              <td>3</td>
            </tr>
            <tr>
              <td></td>
              <td>4</td>
              <td></td>
            </tr>
          </table>
        </div>

        <!-- 比赛记录表 -->
        <div class="table-wrap" v-if="printData.type === 'table08'">
          <section class="section" v-for="(table,index) in printData.data" :key="index">
            <h2 class="mb-2 text-center">{{printData.matchInfoBase.name}}</h2>
            <div class="content-inline justify-content-between mb-2">
              <div>
                <span>轮次：{{printData.matchInfoBase.currentRound}}</span>
                <span class="ml-2">桌次：{{table.tableIndex + 1}}</span>
              </div>
              <div class="date">
                <span>比赛日期：{{printData.matchInfoBase.date}}</span>
              </div>
            </div>
            <table class="table">
              <tr>
                <td rowspan="2">选手号</td>
                <td rowspan="2">姓名</td>
                <td rowspan="2">方位</td>
                <td colspan="9">副次</td>
                <td rowspan="2">成绩</td>
                <td colspan="3">裁判员填写</td>
              </tr>
              <tr>
                <td>1</td>
                <td>2</td>
                <td>3</td>
                <td>4</td>
                <td>5</td>
                <td>6</td>
                <td>7</td>
                <td>8</td>
                <td>9</td>
                <td>总积分</td>
                <td>级差分</td>
                <td>备注</td>
              </tr>
              <tr v-for="item in table.group" :key="item.chairIndex">
                <td class="fontStyle" v-if="item.length">{{item[0].enrollNum}}</td>
                <td v-else></td>
                <td v-if="item.length">{{_getName(item[0].enrollNum)}}</td>
                <td v-else></td>
                <td v-if="item.length">{{_chairChange(item[0].chairIndex)}}{{_chairChange(item[1].chairIndex)}}</td>
                <td v-else></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </table>
            <div class="content-inline justify-content-between mt-3">
              <div>签名（东西）：</div>
              <div>签名（南北）：</div>
              <div class="mr-120">裁判员签名：</div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Button } from 'view-design'
import { chairChange } from 'common/js/utils'

export default {
  name: 'print-view',
  props: {},
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['printData'])
  },
  watch: {},
  mounted() {
    console.log(this.printData)
  },
  created() {
    this.timer = setTimeout(() => {
      window.print()
    }, 1000)
  },
  methods: {
    _getName(enrollNum) {
      let realName = ''
      this.playersInfo.forEach((item) => {
        if (item[0].enrollNum === enrollNum) {
          realName = item[0].realName + ' & ' + item[1].realName
        }
      })
      return realName
    },
    _chairChange(val) {
      return chairChange(val)
    },
    hide() {
      this.$router.go(-1)
    }
  },
  beforedestroy() {
    clearTimeout(this.timer)
  },
  components: {
    Button
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
@import '~common/stylus/media'
.print-view
  .print-view-header
    .content
      padding: 10px 20px
      border-bottom: 1px solid $border-color
  .print-view-body
    .content
      padding: 10px
      .table
        width: 100%
        min-width: 500px
        text-align: center
        border: 1px solid $table-border-color
        th, td
          padding: 10px 12px
          font-size: $font-size-large
          border: 1px solid $table-border-color
        th
          font-size: $font-size-large
          border: 1px solid #000
  // h: 1123px
  .w-80
    width: 80px
  .w-120
    width: 120px
  .w-140
    width: 140px
  .w-160
    width: 160px
  .w-180
    width: 180px
  .w-200
    width: 200px
  .w-240
    width: 240px
  .w-auto
    width: auto
</style>
