import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'vant/lib/index.css'
import 'src/styles/iconfont.css'
// 动态设置基准值
import 'amfe-flexible'
import Vant from 'vant'
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
