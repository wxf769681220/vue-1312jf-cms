<template>
  <div class="tables-card">
    <div class="row no-gutters">
      <div class="col-4 offset-4 vertical">{{getEnrollNumByChair(3)}}</div>
    </div>
    <div class="row no-gutters">
      <div class="col horizontal">{{getEnrollNumByChair(2)}}</div>
      <div class="col bg-white">
        <div class="circle" v-text="data.tableIndex === index ? data.tableIndex + 1 : '空'" :class="{'bg-error': data.tableIndex !== index}"></div>
      </div>
      <div class="col horizontal">{{getEnrollNumByChair(0)}}</div>
    </div>
    <div class="row no-gutters">
      <div class="col-4 offset-4 vertical">{{getEnrollNumByChair(1)}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tables-card',
  props: {
    data: {
      type: Object,
      default() {
        return {}
      }
    },
    index: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  mounted() {},
  created() {},
  methods: {
    getEnrollNumByChair(value) {
      let enrollNum = ''
      this.data.roundRecord.forEach((item) => {
        if (item.chairIndex === value) {
          enrollNum = item.enrollNum
        }
      })
      return enrollNum
    }
  },
  beforedestroy() {},
  components: {}
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
@import '~common/stylus/media'
.tables-card
  display: inline-block
  margin-left: 1.2%
  margin-bottom: 1.2%
  width: 15.2666%
  background-color: $card-header-bg-color
  border: 1px solid $card-border-color
  border-radius: 4px
  .row
    height: 54px
    line-height: 54px
    .col, .col-4
      display: flex
      align-items: center
      justify-content: center
      font-size: $font-size-large-xl
      font-weight: 600
      color: $black
      background-color: linear-gradient(45deg, transparent 49.5%, deeppink 49.5%, deeppink 50.5%, transparent 50.5%)
    .circle
      width: 40px
      height: 40px
      line-height: 40px
      text-align: center
      font-size: $font-size-large-l
      color: $white
      background-color: $success-color
      border-radius: 50%
      box-shadow: 1px 2px 1px shade($success-color, 30%)
    .vertical
      background-color: tint($warning-color, 5%)
    .horizontal
      background-color: tint($primary-color, 5%)
</style>
