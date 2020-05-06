// import 'echarts'

import CubeChart from './cubeChart'
import buleTheme from './theme/cube-bule.json'
import greenTheme from './theme/cube-green.json'

CubeChart.registerTheme('cube-blue-theme', buleTheme)
CubeChart.registerTheme('cube-green-theme', greenTheme)

export default CubeChart
