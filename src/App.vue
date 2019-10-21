<template>
  <div id="app">
    <!-- 顶级路由渲染出口1 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  mounted() {
    // 若页面重载则将state存入sessionStorage
    window.addEventListener('unload', this.saveState)
  },
  methods: {
    saveState() {
      sessionStorage.setItem('state', JSON.stringify(this.$store.state))
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
