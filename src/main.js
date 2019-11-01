import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import bus from 'common/js/bus'
// 全局注册iview组件
import { Message, Switch } from 'view-design'
import 'common/js/uploadExcel/Blob'
import 'common/js/uploadExcel/Export2Excel'
import 'common/less/custom.less'
import 'common/stylus/index.styl'

// 数据通信（中央事件总线）
Vue.use(bus)

// 全局信息提示
Vue.prototype.$Message = Message
Vue.component('i-switch', Switch)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
