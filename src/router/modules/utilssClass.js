/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const utilssClass = {
  path: '/utilssClass',
  component: Layout,
  redirect: 'noRedirect',
  name: 'utilssClass',
  meta: {
    title: '开发工具类',
    icon: 'bug'
  },
  children: [
    {
      path: 'methods',
      component: () => import('@/views/utilssClass/methods'),
      name: 'methods',
      meta: { title: '全局方法', noCache: true }
    },
    {
      path: 'mixProps',
      component: () => import('@/views/utilssClass/mixProps'),
      name: 'mixProps',
      meta: { title: '混入方法', noCache: true }
    },
    {
      path: 'directive',
      component: () => import('@/views/utilssClass/directive'),
      name: 'directive',
      meta: { title: '指令方法', noCache: true }
    }
  ]
}

export default utilssClass
