/**
 *  全局组件 服务 对象等
 */
import Vue from 'vue'

import CubeDialog from './CubeDialog'

const install = (Vue, opts) => {
  Vue.component('CubeDialog', CubeDialog)
}
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
Vue.use(install)
