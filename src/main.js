import Vue from 'vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.less'
import App from './App.vue'
import router from './router'
import store from './store'
import Authorized from '@/components/Authorized'
import axios from 'axios'

Vue.config.productionTip = false
Vue.component('Authorized', Authorized)
Vue.use(Antd)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
