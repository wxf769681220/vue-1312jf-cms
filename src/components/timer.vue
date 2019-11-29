<template>
  <div class="timer">
    <div class="layout-content">timer</div>
  </div>
</template>

<script>
export default {
  name: 'timer',
  props: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  mounted() {},
  created() {},
  methods: {},
  beforedestroy() {},
  components: {}
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
.timer
  position: relative
  margin: 0 20px
  padding: 64px 0
  min-height: 100vh
  background-color: $white
  .layout-content
    padding: 20px
    border-top: 20px solid $body-bg-color
</style>
