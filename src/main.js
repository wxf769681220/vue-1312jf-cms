import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import bus from 'common/js/bus'
import 'common/js/uploadExcel/Blob'
import 'common/js/uploadExcel/Export2Excel'

// 全局 style
import 'common/stylus/index.styl'

// iview 相关配置
import 'common/less/custom.less'

import { Message, Switch } from 'view-design'

Vue.prototype.$Message = Message

Vue.component('i-switch', Switch)

// 中央事件总线
Vue.use(bus)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
