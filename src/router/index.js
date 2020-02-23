import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
// import componentsRouter from './modules/components'
// import chartsRouter from './modules/charts'
// import nestedRouter from './modules/nested'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/dashboard',
    component: Layout,
    redirect: '/dashboard/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/oneMap',
    component: Layout,
    redirect: '/oneMap/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/oneMap/index'),
        name: 'oneMap',
        meta: { title: '环卫一张图', icon: 'component', affix: true }
      }
    ]
  },
  {
    path: '/qwerComponentDemo',
    component: Layout,
    redirect: 'cubeTableRender',
    name: 'qwerComponentDemo',
    meta: {
      title: '业务组件',
      icon: 'component'
    },
    children: [
      {
        path: 'cubeTableRender',
        component: () => import('@/views/cubeTableRender/index'),
        name: 'cubeTableRender',
        meta: { title: '业务列表表格', icon: 'component', affix: true }
      },
      {
        path: 'cubeButton',
        component: () => import('@/views/cubeButton/index'),
        name: 'cubeButton',
        meta: { title: '特效按钮', icon: 'component', affix: true }
      }
    ]
  },
  {
    path: '/basicManagement',
    component: Layout,
    redirect: '/basicManagement/segmentInformation',
    name: 'basicManagement',
    meta: {
      title: '基础信息管理',
      icon: 'example'
    },
    children: [
      {
        path: 'segmentInformation',
        component: () => import('../views/basicInforMation/segmentInformation'),
        name: 'segmentInformation',
        meta: { title: '标段信息管理', icon: 'example' }
      },
      {
        path: 'contractInformation',
        component: () => import('../views/basicInforMation/contractInformation'),
        name: 'contractInformation',
        meta: { title: '合同信息管理', icon: 'example' }
      },
      {
        path: 'peopleManagement',
        component: () => import('../views/basicInforMation/peopleManagement'),
        name: 'peopleManagement',
        meta: { title: '人员基本管理', icon: 'example' }
      },
      {
        path: 'carManagement',
        component: () => import('../views/basicInforMation/carManagement'),
        name: 'carManagement',
        meta: { title: '车辆基本管理', icon: 'example' }
      },
      {
        path: 'trashManagement',
        component: () => import('../views/basicInforMation/trashManagement'),
        name: 'trashManagement',
        meta: { title: '垃圾桶管理', icon: 'example' }
      },
      {
        path: 'garbageCollection',
        component: () => import('../views/basicInforMation/garbageCollection'),
        name: 'garbageCollection',
        meta: { title: '垃圾收集点管理', icon: 'example' }
      },
      {
        path: 'wasteSource',
        component: () => import('../views/basicInforMation/wasteSource'),
        name: 'wasteSource',
        meta: { title: '垃圾源头管理', icon: 'example' }
      },
      {
        path: 'intelligeHardware',
        component: () => import('../views/basicInforMation/intelligeHardware'),
        name: 'intelligeHardware',
        meta: { title: '智能硬件管理', icon: 'example' }
      },
      {
        path: 'vehiclesManagement',
        component: () => import('../views/basicInforMation/vehiclesManagement'),
        name: 'vehiclesManagement',
        meta: { title: '车辆维护单位管理', icon: 'example' }
      },
      {
        path: 'gasStandard',
        component: () => import('../views/basicInforMation/gasStandard'),
        name: 'gasStandard',
        meta: { title: '气体标准管理', icon: 'example' }
      }
    ]
  },
  {
    path: '/mechanicalWork',
    component: Layout,
    redirect: '/mechanicalWork/carsMaintenance',
    name: 'mechanicalWork',
    meta: {
      title: '机械作业管理',
      icon: 'example'
    },
    children: [
      {
        path: 'JobRoad',
        component: () => import('../views/mechanicalWork/JobRoad'),
        name: 'JobRoad',
        meta: { title: '作业道路管理', icon: 'example' }
      },
      {
        path: 'JobMachine',
        component: () => import('../views/mechanicalWork/JobMachine'),
        name: 'JobMachine',
        meta: { title: '机械作业情况', icon: 'example' }
      }
    ]
  },
  {
    path: '/carsManagement',
    component: Layout,
    redirect: '/carsManagement/carsMaintenance',
    name: 'carsManagement',
    meta: {
      title: '车辆维护',
      icon: 'example'
    },
    children: [
      {
        path: 'carsMaintenance',
        component: () => import('../views/carsManagement/carsMaintenance'),
        name: 'carsMaintenance',
        meta: { title: '车辆维护管理', icon: 'example' }
      },
      {
        path: 'carsRefueling',
        component: () => import('../views/carsManagement/carsRefueling'),
        name: 'carsRefueling',
        meta: { title: '车辆加油管理', icon: 'example' }
      },
      {
        path: 'carsRepair',
        component: () => import('../views/carsManagement/carsRepair'),
        name: 'carsRepair',
        meta: { title: '车辆维修管理', icon: 'example' }
      }
    ]
  },
  {
    path: '/transferManagement',
    component: Layout,
    redirect: '/transferManagement/transferAccount',
    name: 'transferManagement',
    meta: {
      title: '中转站运行管理',
      icon: 'example'
    },
    children: [
      {
        path: 'transferAccount',
        component: () => import('../views/transferManagement/transferAccount'),
        name: 'transferAccount',
        meta: { title: '中转站台账', icon: 'example' }
      },
      {
        path: 'transferstaManagement',
        component: () => import('../views/transferManagement/transferstaManagement'),
        name: 'transferstaManagement',
        meta: { title: '中转站管理', icon: 'example' }
      },
      {
        path: 'compressionBox',
        component: () => import('../views/transferManagement/compressionBox'),
        name: 'compressionBox',
        meta: { title: '压缩箱管理', icon: 'example' }
      },
      {
        path: 'weighbridgeRecord',
        component: () => import('../views/transferManagement/weighbridgeRecord'),
        name: 'weighbridgeRecord',
        meta: { title: '地磅称重记录', icon: 'example' }
      },
      {
        path: 'transferCollection',
        component: () => import('../views/transferManagement/transferCollection'),
        name: 'transferCollection',
        meta: { title: '转运站收运记录', icon: 'example' }
      },
      {
        path: 'transferYard',
        component: () => import('../views/transferManagement/transferYard'),
        name: 'transferYard',
        meta: { title: '转运站送场记录', icon: 'example' }
      }
    ]
  },
  {
    path: '/toiletsManagement',
    component: Layout,
    redirect: '/toiletsManagement/toiletsAccount',
    name: 'toiletsManagement',
    meta: {
      title: '公厕运行管理',
      icon: 'example'
    },
    children: [
      {
        path: 'toiletsAccount',
        component: () => import('../views/toiletsManagement/toiletsAccount'),
        name: 'toiletsAccount',
        meta: { title: '公厕台账', icon: 'example' }
      },
      {
        path: 'toiletsInformation',
        component: () => import('../views/toiletsManagement/toiletsInformation'),
        name: 'toiletsInformation',
        meta: { title: '公厕基本信息', icon: 'example' }
      },
      {
        path: 'toiletsGasAccount',
        component: () => import('../views/toiletsManagement/toiletsGasAccount'),
        name: 'toiletsGasAccount',
        meta: { title: '公厕气体台账', icon: 'example' }
      },
      {
        path: 'toiletsGasInformation',
        component: () => import('../views/toiletsManagement/toiletsGasInformation'),
        name: 'toiletsGasInformation',
        meta: { title: '公厕气体异常信息', icon: 'example' }
      }
    ]
  },
  {
    path: '/systeManagement',
    component: Layout,
    redirect: '/systeManagement/systeManagement',
    name: 'systeManagement',
    meta: {
      title: '系统管理',
      icon: 'example'
    },
    children: [
      {
        path: 'systeManagement',
        component: () => import('../views/systeManagement/systeManagement'),
        name: 'systeManagement',
        meta: { title: '系统日志', icon: 'example' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

export const asyncRoutesB = [
  {
    path: '/oneMap',
    component: Layout,
    // redirect: '/oneMap/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/oneMap/index'),
        name: 'oneMap',
        meta: { title: '环卫一张图', icon: 'component', affix: true }
      }
    ]
  }
]
/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/',
    component: Layout,
    // redirect: '/dashboard',
    children: [
      // {
      //   path: 'dashboard',
      //   component: () => import('@/views/dashboard/index'),
      //   name: 'Dashboard',
      //   meta: { title: '首页', icon: 'dashboard', affix: true }
      // }
    ]
  },
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  }
  // { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
