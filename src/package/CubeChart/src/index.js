// import 'echarts'

import cubeChart from './cubeChart'
import buleTheme from './theme/cube-bule.json'
import greenTheme from './theme/cube-green.json'

cubeChart.registerTheme('cube-blue-theme', buleTheme)
cubeChart.registerTheme('cube-green-theme', greenTheme)

export default cubeChart
