<template>
  <div id="app">
    <!-- 顶级路由渲染出口1 -->
    <router-view v-if="isView"></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      isView: true
    }
  },
  provide() {
    // provide + inject 组合实现页面的刷新效果
    return {
      reload: this.reload
    }
  },
  mounted() {
    // 若页面重载则将state存入sessionStorage
    window.addEventListener('unload', this.saveState)
  },
  methods: {
    saveState() {
      sessionStorage.setItem('state', JSON.stringify(this.$store.state))
    },
    reload() {
      // 通过 reload 方法控制 router-view 的显示与隐藏，实现页面的刷新效果
      this.isView = false
      this.$nextTick(function() {
        this.isView = true
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
