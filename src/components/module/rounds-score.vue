<template>
  <div class="rounds-score" v-show="isRoundsScore">
    <div class="layout-content">
      <Table border :stripe="true" :columns="tableColumns" :data="scoreData">
        <template slot-scope="{ row }" slot="realName">
          <span>{{ _getName(row.enrollNum) }}</span>
        </template>
        <template slot-scope="{ row }" slot="region">
          <span>{{ _getRegion(row.enrollNum) }}</span>
        </template>
        <template slot-scope="{ row }" slot="result">
          <strong>{{ _getPlayerScore2(row.upLevels + 2) }} : {{ _getPlayerScore2(row.opUpLevels + 2) }} </strong>
        </template>
        <template slot-scope="{ row }" slot="remark">
          <span>{{ _getStatus(row.status) }}</span>
        </template>
      </Table>
    </div>
  </div>
</template>
<script>
import { Table } from 'view-design'
import { getPlayerStatus, getPlayerScore, getPlayerScore2 } from 'common/js/utils'

export default {
  name: 'rounds-score',
  props: {
    scoreData: {
      type: Array,
      default() {
        return []
      }
    },
    playersInfo: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      isRoundsScore: false,
      tableColumns: []
    }
  },
  computed: {},
  watch: {},
  mounted() {},
  created() {
    this._initTableColumns()
  },
  methods: {
    _initTableColumns() {
      this.initColumns = [
        'enrollNum',
        'realName',
        'region',
        'result',
        'score',
        'smallScore',
        'remark'
      ]
      this.tableColumns = this._getTableColumns()
    },
    _getTableColumns() {
      const tableColumnsList = {
        enrollNum: {
          title: '选手号',
          width: '80px',
          align: 'center',
          key: 'enrollNum'
        },
        realName: {
          title: '姓名',
          width: '200px',
          align: 'center',
          slot: 'realName'
        },
        region: {
          title: '地区/单位',
          width: '200px',
          align: 'center',
          slot: 'region'
        },
        result: {
          title: '成绩',
          width: '170px',
          align: 'center',
          slot: 'result'
        },
        score: {
          title: '总积分',
          width: '100px',
          align: 'center',
          key: 'score'
        },
        smallScore: {
          title: '级差分',
          width: '140px',
          align: 'center',
          key: 'smallScore'
        },
        remark: {
          title: '备注',
          width: 'auto',
          align: 'center',
          resizable: true,
          slot: 'remark'
        }
      }
      let data = []
      this.initColumns.forEach(col => data.push(tableColumnsList[col]))
      return data
    },
    _getName(enrollNum) {
      let realName = ''
      this.playersInfo.forEach((item) => {
        if (item[0].enrollNum === enrollNum) {
          realName = item[0].realName + ' & ' + item[1].realName
        }
      })
      return realName
    },
    _getRegion(enrollNum) {
      let region = ''
      this.playersInfo.forEach((item) => {
        if (item[0].enrollNum === enrollNum) {
          region = item[0].region
        }
      })
      return region
    },
    _getStatus(val) {
      return getPlayerStatus(val)
    },
    _getPlayerScore(val) {
      return getPlayerScore(val)
    },
    _getPlayerScore2(val) {
      return getPlayerScore2(val)
    },
    show() {
      this.isRoundsScore = true
    },
    hide() {
      this.isRoundsScore = false
    }
  },
  beforedestroy() {},
  components: {
    Table
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
.rounds-score
  .layout-content
    padding: 0 1.2%
</style>
