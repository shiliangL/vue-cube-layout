/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const cubeTableRouter = {
  path: '/cubeTable',
  component: Layout,
  redirect: 'noRedirect',
  name: 'cubeTable',
  meta: {
    title: '业务&表格',
    icon: 'business'
  },
  children: [
    {
      path: 'CubeTableList',
      component: () => import('@/views/cubeTable/CubeTableList'),
      name: 'CubeTableList',
      meta: { title: '常规业务列表', noCache: true }
    },
    {
      path: 'ExpandTable',
      component: () => import('@/views/cubeTable/ExpandTable'),
      name: 'ExpandTable',
      meta: { title: '展开拓展表格', noCache: true }
    },
    {
      path: 'TableLoadMore',
      component: () => import('@/views/cubeTable/TableLoadMore'),
      name: 'TableLoadMore',
      meta: { title: '滚动加载更多', noCache: true }
    }
  ]
}

export default cubeTableRouter
