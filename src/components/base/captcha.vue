<template>
  <div
    class="captcha" :style="codeStyle" @click="refreshCode">
    <span class="item" v-for="(item, index) in codeList" :key="index" :style="getStyle(item)">
      <strong>{{item.code}}</strong>
    </span>
  </div>
</template>

<script>
export default {
  name: 'captcha',
  props: {
    width: {
      type: String,
      default: '140px'
    },
    height: {
      type: String,
      default: '40px'
    },
    length: {
      type: Number,
      default: 4
    }
  },
  data() {
    return {
      codeList: []
    }
  },
  computed: {
    codeStyle() {
      return { 'width': this.width, 'height': this.height }
    }
  },
  mounted() {
    this.createdCode()
  },
  methods: {
    // 创建随机字符
    createdCode() {
      let chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjklmnpqrstuvwxyz0123456789'
      let arr = []
      for (let i = 0; i < this.length; i++) {
        let rgb = [
          Math.round(Math.random() * 220),
          Math.round(Math.random() * 240),
          Math.round(Math.random() * 200)
        ]
        arr.push({
          code: chars.charAt(Math.floor(Math.random() * chars.length)), // 随机码
          color: `rgb(${rgb})`, // 随机颜色
          fontSize: `1${[Math.floor(Math.random() * 10)]}px`, // 随机字号
          padding: `${[Math.floor(Math.random() * 10)]}px`, // 随机内边距
          transform: `rotate(${Math.floor(Math.random() * 45) - Math.floor(Math.random() * 45)}deg)` // 随机旋转角度
        })
      }
      this.codeList = arr
      this.$emit('update:value', arr.map(item => item.code).join(''))
    },
    // 动态绑定样式
    getStyle(data) {
      return `color: ${data.color}; font-size: ${data.fontSize}; padding: ${data.padding}; transform: ${data.transform}`
    },
    // 刷新字符
    refreshCode() {
      this.createdCode()
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
.captcha
  display: flex
  border: 1px solid $border-color
  .item
    display: flex
    align-items: center
    flex: 1 1 auto
</style>
