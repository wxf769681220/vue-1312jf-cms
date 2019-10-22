<template>
  <div class="match-list">
    <div class="card-wrap">
      <match-card v-for="match in matchList" :key="match.id" :data="match"></match-card>
    </div>
  </div>
</template>

<script>
import MatchCard from 'components/module/match-card'
import { getMatch } from 'api'
import { mapGetters } from 'vuex'

export default {
  name: 'match-list',
  props: {},
  data() {
    return {
      matchList: []
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
      getMatch({ page: 1, pagecount: 12 }, this.token).then(res => {
        console.log(res)
        if (res.code === 200) {
          this.matchList = res.matches
        }
      })
    }
  },
  beforedestroy() {},
  components: {
    MatchCard
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
.match-list
  margin: 20px
  background-color: $white
</style>
