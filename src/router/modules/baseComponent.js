/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const baseComponent = {
  path: '/baseComponents',
  component: Layout,
  redirect: 'noRedirect',
  name: 'baseComponents',
  meta: {
    title: '基础&组件',
    icon: 'component'
  },
  children: [
    {
      path: 'cubeButton',
      component: () => import('@/views/baseComponents/cubeButton'),
      name: 'cubeButton',
      meta: { title: '按钮', noCache: true }
    },
    {
      path: 'cubeInput',
      component: () => import('@/views/baseComponents/cubeInput'),
      name: 'cubeInput',
      meta: { title: '输入框', noCache: true }
    }
  ]
}

export default baseComponent
