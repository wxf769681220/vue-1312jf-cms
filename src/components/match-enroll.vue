<template>
  <div class="match-enroll">
    <!-- 工具栏组件 -->
    <toolbars
      :isDrawLots="true"
      :isUpload="true"
      :isAdd="true"
      :isDelete="true"
      @upload="upload"
      >
    </toolbars>
    <!-- 本场比赛基本信息 -->
    <match-info :matchInfoBase="matchInfoBase"></match-info>

    <!-- 导入报名表 -->
    <upload-table ref="uploadTable"></upload-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import UploadTable from 'components/body/upload-table'
import Toolbars from 'components/module/toolbars'
import MatchInfo from 'components/module/match-info'

export default {
  name: 'match-enroll',
  props: {},
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['matchInfoBase'])
  },
  watch: {},
  mounted() {},
  created() {
    console.log(this.matchInfoBase)
  },
  methods: {
    upload() {
      this.$refs.uploadTable.show()
    }
  },
  components: {
    MatchInfo,
    Toolbars,
    UploadTable
  },
  beforedestroy() {}
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
.match-enroll
  position: relative
  margin: 20px
  padding: 20px
  background-color: $white
</style>
