import './styles/index.scss'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'

import Vue from 'vue'
import App from './App.vue'

Vue.use(ElementUI)

import VueWorker from 'vue-worker'
Vue.use(VueWorker)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
