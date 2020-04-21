// permissionAdmin 全局指令仅仅管理员可见

// 全局指令
import autosize from './autosize'

const importDirective = Vue => {
  Vue.directive('autosize', autosize)
}

export default importDirective
