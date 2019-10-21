<template>
  <div class="match-list">matchList</div>
</template>

<script>
import { getMatch } from 'api'
import { mapGetters } from 'vuex'

export default {
  name: 'match-list',
  props: {},
  data() {
    return {}
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
      getMatch(
        {
          page: 1,
          pagecount: 9
        },
        this.token
      ).then(res => {
        console.log(res)
        // if (res.code === 200) {
        //   this.setToken(res.token)
        //   this.setMobile(this.account.mobile)
        //   this.$router.push({
        //     path: '/home/map'
        //   })
        //   this._clearInput()
        // } else {
        //   this.errors = true
        //   this.errorMsg = res.err
        // }
      })
    }
  },
  components: {},
  beforedestroy() {}
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
.match-list
  margin: 20px
  background-color: $white
</style>
