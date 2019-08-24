import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import { Notification } from 'element-ui'

Vue.prototype.$axios = axios
Vue.prototype.$notify = Notification;

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

