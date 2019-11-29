<template>
  <div class="tables-list">
    <!-- 按桌号排序-->
    <div class="content-wrap" v-if="sortBy === 0">
      <tables-card
        v-for="(item,index) in tablesData"
        :key="item.tableIndex"
        :data="item"
        :index="index"
      ></tables-card>
    </div>
    <!-- 按选手号排序-->
    <div class="content-wrap" v-if="sortBy === 1">
      <table class="table" v-for="(table,index) in tablesData" :key="index">
        <thead>
          <tr>
            <th>选手号</th>
            <th>桌号</th>
            <th>座位</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{table.enrollNum}}</td>
            <td>{{table.tableIndex}}</td>
            <td>{{table.chairIndex}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
// Module Components
import TablesCard from 'components/module/tables-card'

export default {
  name: 'tables-list',
  props: {
    tablesData: {
      type: Array,
      default() {
        return []
      }
    },
    sortBy: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      columns: [
        {
          title: '选手号',
          key: 'enrollNum'
        },
        {
          title: '桌号',
          key: 'tableIndex'
        },
        {
          title: '座位',
          key: 'chairIndex'
        }
      ]
    }
  },
  computed: {},
  watch: {},
  mounted() {
    console.log(this.tablesData)
  },
  created() {},
  methods: {},
  beforedestroy() {},
  components: {
    TablesCard
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
.tables-list
  padding: 15px 0
  .content-wrap
    display: flex
    flex-wrap: wrap
    width: 100%
    .table
      display: inline
      margin-bottom: 10px
      font-size: $font-size-large-m
      text-align: center
      border: 1px solid $table-border-color
      th, td
        padding: 10px 12px
        border: 1px solid $table-border-color

</style>
