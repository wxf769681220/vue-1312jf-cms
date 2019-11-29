<template>
  <table class="rounds-score table">
    <thead>
      <tr>
        <th>队伍号</th>
        <th>选手号</th>
        <th>地区</th>
        <th>成绩</th>
        <th>总积分</th>
        <th>级差分</th>
        <th>备注</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in scoreData" :key="item.id">
        <td>{{item.teamNo}}</td>
        <td>{{item.enrollNum}}</td>
        <td></td>
        <td>{{item.upLevels}}</td>
        <td>{{item.score}}</td>
        <td>{{item.smallScore}}</td>
        <td>{{item.status}}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
// Iview Components
// import { Table } from 'view-design'

export default {
  name: 'rounds-score',
  props: {
    scoreData: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      columns: [
        {
          title: '队伍号',
          key: 'teamNo'
        },
        {
          title: '选手号',
          key: 'enrollNum'
        },
        {
          title: '地区',
          key: ''
        },
        {
          title: '成绩',
          key: 'upLevels'
        },
        {
          title: '总积分',
          key: 'score'
        },
        {
          title: '级差分',
          key: 'smallScore'
        },
        {
          title: '备注',
          key: 'status'
        }
      ]
    }
  },
  computed: {

  },
  watch: {},
  mounted() {},
  created() {},
  methods: {},
  beforedestroy() {},
  components: {
    // Table
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
.rounds-score
  &.table
    margin-bottom: 10px
    width: 100%
    font-size: $font-size-large-m
    text-align: center
    // border: 1px solid $table-border-color
    th, td
      padding: 10px 12px
      border: 1px solid $table-border-color
</style>
