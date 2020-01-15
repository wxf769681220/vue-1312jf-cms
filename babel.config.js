module.exports = {
  presets: [
    '@vue/app'
  ],
  // iview 相关配置
  plugins: [["import", {
    "libraryName": "view-design",
    "libraryDirectory": "src/components"
  }]]
}
