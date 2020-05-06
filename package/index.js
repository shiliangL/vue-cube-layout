
import MaxHeight from './MaxHeight/src'
import CubeDialog from './CubeDialog/src'
import CubeTable from './CubeTable/src'
import CubeTableList from './CubeTableList/src'

import CubeChart from './CubeChart/src'

import CubeSelect from './CubeSelect/src'
import CubeCascader from './CubeCascader/src'
import CubeSelectTree from './CubeSelectTree/src'

import CubeButton from './CubeButton/src'

const components = [
  CubeChart,
  MaxHeight,
  CubeTable,
  CubeDialog,
  CubeSelect,
  CubeCascader,
  CubeTableList,
  CubeSelectTree,

  CubeButton
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
  CubeChart,
  MaxHeight,
  CubeTable,
  CubeDialog,
  CubeSelect,
  CubeCascader,
  CubeTableList,
  CubeSelectTree,

  CubeButton
}
