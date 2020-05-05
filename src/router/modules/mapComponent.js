/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const baseComponent = {
  path: '/mapComponents',
  component: Layout,
  redirect: 'noRedirect',
  name: 'mapComponents',
  meta: {
    title: '地图&应用',
    icon: 'map'
  },
  children: [
    {
      path: 'cubeButton',
      component: () => import('@/views/mapComponents/cubeButton'),
      name: 'cubeButton',
      meta: { title: '按钮', noCache: true }
    },
    {
      path: 'cubeInput',
      component: () => import('@/views/mapComponents/cubeInput'),
      name: 'cubeInput',
      meta: { title: '输入框', noCache: true }
    }
  ]
}

export default baseComponent
