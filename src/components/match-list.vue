<template>
  <div class="match-list">
    <!-- 比赛列表 -->
    <div class="card-wrap">
      <match-card v-for="match in matchList" :key="match.id" :data="match"></match-card>
    </div>
    <!-- 分页 -->
    <Page
      class="page"
      :total="page.total"
      show-elevator
      v-if="matchList.length"
      @on-change="pageChange"
    />
  </div>
</template>

<script>
// Iview Components
import { Page } from 'view-design'
// Module Components
import MatchCard from 'components/module/match-card'
// API
import { getMatch } from 'api'
// Vuex
import { mapGetters } from 'vuex'

export default {
  inject: ['reload'],
  name: 'match-list',
  props: {},
  data() {
    return {
      matchList: [],
      page: {
        total: 1,
        currentPage: 1,
        pageSize: 9
      }
    }
  },
  computed: {
    ...mapGetters(['token'])
  },
  watch: {},
  mounted() {},
  created() {
    this.getMatchList()
  },
  methods: {
    getMatchList() {
      getMatch('', {
        page: this.page.currentPage,
        pagecount: this.page.pageSize
      }).then(res => {
        console.log(res)
        if (res.code === 200) {
          this.matchList = res.matches
          this.page.total = res.count
        } else {
          this.$Message.error('获取比赛列表时出错!')
          console.log('获取比赛列表时出错!')
        }
      })
    },
    pageChange(value) {
      this.page.currentPage = value
      this.getMatchList()
    }
  },
  beforedestroy() {},
  components: {
    MatchCard,
    Page
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
.match-list
  position: relative
  margin: 20px
  padding: 20px 0
  background-color: $white
  >>>.ivu-page
    display: block
    margin: 0 auto
    padding: 50px 0
    width: 800px
    .ivu-page-item, .ivu-page-prev
      margin-right: 8px
</style>
