import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'
import './backend/axios'
import './main.css'

Vue.config.productionTip = false
Vue.prototype.$http = Axios

Axios.defaults.baseURL = 'http://localhost:3000'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
