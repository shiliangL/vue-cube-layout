/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const layoutComponents = {
  path: '/layoutComponents',
  component: Layout,
  redirect: 'noRedirect',
  name: 'layoutComponents',
  meta: {
    title: '布局&界面',
    icon: 'table'
  },
  children: [
    {
      path: 'cuebCard',
      component: () => import('@/views/layoutComponents/cuebCard'),
      name: 'cuebCard',
      meta: { title: '布局卡片', noCache: true }
    },
    {
      path: 'cubeSplit',
      component: () => import('@/views/layoutComponents/cubeSplit'),
      name: 'cubeSplit',
      meta: { title: '分割面板', noCache: true }
    },
    {
      path: 'scrollContainer',
      component: () => import('@/views/layoutComponents/scrollContainer'),
      name: 'scrollContainer',
      meta: { title: '滚动容器', noCache: true }
    }
  ]
}

export default layoutComponents
