import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import './components/global.js' // 使用自定义全局组件

import './icons' // icon
// import './permission' // permission control

import * as filters from './filters' // global filters

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
import { mockXHR } from '../mock'
if (process.env.NODE_ENV === 'production') {
  mockXHR()
}

Vue.use(Element, {
  size: Cookies.get('size') || 'small' // set element-ui default size
})

import VueHighlightJS from 'vue-highlight.js'
Vue.use(VueHighlightJS)

// 百度地图
import BaiduMap from 'vue-baidu-map'
Vue.use(BaiduMap, {
  ak: 'ggeG9Ii3jcwnXUvVXNQ6vjRYUXV5Ckhz'
})

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
