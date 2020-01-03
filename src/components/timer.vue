<template>
  <div class="timer">
    <div class="layout-content">
      {{countDownList}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'timer',
  props: {},
  data() {
    return {
      countDownList: '00天00时00分00秒',
      actEndTime: '2019-12-13 11:00:00'
    }
  },
  computed: {},
  watch: {},
  mounted() {},
  created() {
    this.countDown()
  },
  methods: {
    timeFormat(param) {
      return param < 10 ? '0' + param : param
    },
    countDown() {
      this.timer = setInterval(() => {
        let newTime = new Date().getTime()
        let endTime = new Date(this.actEndTime).getTime()
        let obj = null
        if (endTime - newTime > 0) {
          let time = (endTime - newTime) / 1000
          let day = parseInt(time / (60 * 60 * 24))
          let hou = parseInt((time % (60 * 60 * 24)) / 3600)
          let min = parseInt(((time % (60 * 60 * 24)) % 3600) / 60)
          let sec = parseInt(((time % (60 * 60 * 24)) % 3600) % 60)
          obj = {
            day: this.timeFormat(day),
            hou: this.timeFormat(hou),
            min: this.timeFormat(min),
            sec: this.timeFormat(sec)
          }
        } else {
          obj = {
            day: '00',
            hou: '00',
            min: '00',
            sec: '00'
          }
          clearInterval(this.timer)
        }
        this.countDownList = obj.day + '天' + obj.hou + '时' + obj.min + '分' + obj.sec + '秒'
      }, 1000)
    }
  },
  beforedestroy() {
    this.timer = null
  },
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
