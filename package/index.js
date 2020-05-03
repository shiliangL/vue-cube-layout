
import MaxHeight from './MaxHeight/src'
import CubeTable from './CubeTable/src'
import CubeTableList from './CubeTableList/src'
import CubeSelectTree from './CubeSelectTree/src'

const components = [
  MaxHeight,
  CubeTable,
  CubeTableList,
  CubeSelectTree
]

const install = function(Vue, opts = {}) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  version: '0.0.51',
  install,
  MaxHeight,
  CubeTable,
  CubeTableList,
  CubeSelectTree
}
