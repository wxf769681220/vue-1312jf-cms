<template>
  <div class="map">
    <div class="layout-content">
      <button :disabled="visBtn" @click="countDown">{{msg}}</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      countDownList: '',
      text: 0
    }
  },
  computed: {
    msg() {
      return this.text ? `${this.text}s后获取获取验证码` : '获取验证码'
    },
    visBtn() {
      return Boolean(this.text)
    }
  },
  created() {
    // this.countDown()
  },
  methods: {
    countDown() {
      this.times = 10 // 初始化10s倒计时
      this.timer = setInterval(() => {
        if (this.times !== 0) {
          this.times--
        } else {
          clearInterval(this.timer)
        }
        this.text = this.times
        console.log(this.text)
      }, 1000)
    }
  },
  components: {}
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
.map
  position: relative
  margin: 0 20px
  padding: 64px 0
  min-height: 100vh
  background-color: $white
  .layout-content
    padding: 20px
    border-top: 20px solid $body-bg-color
</style>
