<template>
  <div class="match-list">
    <div class="layout-content">
      <!-- 比赛列表 -->
      <match-card v-for="match in matchList" :key="match.id" :match="match"></match-card>
      <!-- 分页 -->
      <Page
        class="page"
        show-elevator
        v-if="matchList.length"
        :total="page.total"
        @on-change="pageChange"
      />
    </div>
  </div>
</template>

<script>
// Iview Components
import { Page } from 'view-design'
// Module Components
import MatchCard from 'components/module/match-card'
// API
import { getMatch } from 'api'

export default {
  name: 'match-list',
  data() {
    return {
      matchList: [],
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 9
      }
    }
  },
  created() {
    this.getMatchList()
  },
  methods: {
    getMatchList() {
      getMatch('', {
        page: this.page.currentPage,
        pagecount: this.page.pageSize
      }).then(res => {
        // console.log(res)
        if (res.code === 200) {
          this.matchList = res.matches
          this.page.total = res.count
        }
      })
    },
    pageChange(value) {
      this.page.currentPage = value
      this.getMatchList()
    }
  },
  components: {
    MatchCard,
    Page
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
@import "~common/stylus/media.styl"
.match-list
  position: relative
  margin: 0 20px
  padding-top: 64px
  background-color: $white
  .layout-content
    padding: 20px
    border-top: 20px solid $body-bg-color
  >>>.ivu-page
    display: block
    margin: 0 auto
    padding: 50px 0
    width: 800px
    .ivu-page-item, .ivu-page-prev
      margin-right: 8px
</style>
