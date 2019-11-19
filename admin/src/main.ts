import Vue from 'vue'
import axios from 'axios'
import EleForm from 'vue-ele-form'
import App from './App.vue'
import './plugins/element'
import './plugins/avue'
import router from './router'

Vue.config.productionTip = false

Vue.use(EleForm)

Vue.prototype.$axios = axios.create({
  baseURL: 'http://localhost:3000'
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
