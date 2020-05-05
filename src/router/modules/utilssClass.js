/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const utilssClass = {
  path: '/utilssClass',
  component: Layout,
  redirect: 'noRedirect',
  name: 'utilssClass',
  meta: {
    title: '开发工具类',
    icon: 'table'
  },
  children: [
    {
      path: 'cubeInput',
      component: () => import('@/views/mapComponents/cubeInput'),
      name: 'cubeInput',
      meta: { title: '输入框', noCache: true }
    }
  ]
}

export default utilssClass
