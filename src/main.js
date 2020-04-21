import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log

import * as filters from './filters' // global filters

import importDirective from '@/directive'

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
})

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// register global utility directives
importDirective(Vue)

Vue.config.productionTip = false

// 原型方法添加
import ScrollIntoView from '@/plugins/scroll-into-view'
import autosize from '@/plugins/autosize'
Vue.prototype.$ScrollIntoView = ScrollIntoView
Vue.prototype.$autosize = autosize

// 其他包使用
// import VueScrollTo from 'vue-scrollto'
// Vue.use(VueScrollTo)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
