import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import './icons'
// 全局引入UI库 vant
import Vant from 'vant'
import 'vant/lib/index.css'

//  全局引入 过滤器
import '@/util/filter'
Vue.use(Vant);

// 注册时可以配置额外的选项
import { Lazyload } from 'vant'
Vue.use(Lazyload, {
  lazyComponent: true,
});

// 瀑布流
import waterfall from 'vue-waterfall2'
Vue.use(waterfall)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
