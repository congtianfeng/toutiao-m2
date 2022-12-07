import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'vant/lib/index.css'
import '@/styles/iconfont.css'
// 动态设置基准值
import 'amfe-flexible'
import Vant from 'vant'
import '@/utils/dayjs'
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
