/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const chartsRouter = {
  path: '/graphsAndCharts',
  component: Layout,
  redirect: 'noRedirect',
  name: 'graphsAndCharts',
  meta: {
    title: '图形&图表',
    icon: 'chart'
  },
  children: [
    {
      path: 'icons',
      component: () => import('@/views/graphsAndCharts/icons'),
      name: 'icons',
      meta: { title: '字体图标库', noCache: true }
    },
    {
      path: 'barChart',
      component: () => import('@/views/graphsAndCharts/barChart'),
      name: 'barChart',
      meta: { title: '柱状图表', noCache: true }
    },
    {
      path: 'lineChart',
      component: () => import('@/views/graphsAndCharts/lineChart'),
      name: 'lineChart',
      meta: { title: '折线图表', noCache: true }
    },
    {
      path: 'pieChart',
      component: () => import('@/views/graphsAndCharts/pieChart'),
      name: 'pieChart',
      meta: { title: '饼图图表', noCache: true }
    },
    {
      path: 'cubeChart plus',
      component: () => import('@/views/graphsAndCharts/cubeChartPlus'),
      name: 'cubeChartPlus',
      meta: { title: '图表Plus', noCache: true }
    }
  ]
}

export default chartsRouter
