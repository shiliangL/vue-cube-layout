
import MaxHeight from './MaxHeight/src'
import CubeDialog from './CubeDialog/src'
import CubeTable from './CubeTable/src'
import CubeTableList from './CubeTableList/src'

import CubeSelect from './CubeSelect/src'
import CubeCascader from './CubeCascader/src'
import CubeSelectTree from './CubeSelectTree/src'

const components = [
  MaxHeight,
  CubeTable,
  CubeDialog,
  CubeSelect,
  CubeCascader,
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
  CubeDialog,
  CubeSelect,
  CubeCascader,
  CubeTableList,
  CubeSelectTree
}
