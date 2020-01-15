import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import componentsRouter from './modules/components'
import chartsRouter from './modules/charts'
import nestedRouter from './modules/nested'

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
        path: 'vehiclesManagement',
        component: () => import('../views/basicInforMation/vehiclesManagement'),
        name: 'vehiclesManagement',
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
        path: 'vehicleMaintenance',
        component: () => import('../views/basicInforMation/vehicleMaintenance'),
        name: 'vehicleMaintenance',
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
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/page',
    alwaysShow: true, // will always show the root menu
    name: 'Permission',
    meta: {
      title: 'Permission',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/permission/page'),
        name: 'PagePermission',
        meta: {
          title: 'Page Permission',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'directive',
        component: () => import('@/views/permission/directive'),
        name: 'DirectivePermission',
        meta: {
          title: 'Directive Permission'
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: 'role',
        component: () => import('@/views/permission/role'),
        name: 'RolePermission',
        meta: {
          title: 'Role Permission',
          roles: ['admin']
        }
      }
    ]
  },

  {
    path: '/icon',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/icons/index'),
        name: 'Icons',
        meta: { title: 'Icons', icon: 'icon', noCache: true }
      }
    ]
  },

  /** when your routing map is too long, you can split it into small modules **/
  componentsRouter,
  chartsRouter,
  nestedRouter,
  {
    path: '/tab',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/tab/index'),
        name: 'Tab',
        meta: { title: 'Tab', icon: 'tab' }
      }
    ]
  },

  {
    path: '/error',
    component: Layout,
    redirect: 'noRedirect',
    name: 'ErrorPages',
    meta: {
      title: 'Error Pages',
      icon: '404'
    },
    children: [
      {
        path: '401',
        component: () => import('@/views/error-page/401'),
        name: 'Page401',
        meta: { title: '401', noCache: true }
      },
      {
        path: '404',
        component: () => import('@/views/error-page/404'),
        name: 'Page404',
        meta: { title: '404', noCache: true }
      }
    ]
  },
  {
    path: '/pdf',
    component: Layout,
    redirect: '/pdf/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/pdf/index'),
        name: 'PDF',
        meta: { title: 'PDF', icon: 'pdf' }
      }
    ]
  },
  {
    path: '/pdf/download',
    component: () => import('@/views/pdf/download'),
    hidden: true
  },

  {
    path: '/theme',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/theme/index'),
        name: 'Theme',
        meta: { title: 'Theme', icon: 'theme' }
      }
    ]
  },

  {
    path: '/clipboard',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/clipboard/index'),
        name: 'ClipboardDemo',
        meta: { title: 'Clipboard', icon: 'clipboard' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://github.com/PanJiaChen/vue-element-admin',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
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
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/cubeLayout',
    component: Layout,
    redirect: '/cubeLayout',
    children: [
      {
        path: 'cubeLayout',
        component: () => import('@/views/cubeLayout/index'),
        name: 'cubeLayout',
        meta: { title: 'cubeLayout', icon: 'component', affix: true }
      }
    ]
  },
  {
    path: '/oneMap',
    component: Layout,
    redirect: '/oneMap',
    children: [
      {
        path: 'oneMap',
        component: () => import('@/views/oneMap/index'),
        name: 'oneMap',
        meta: { title: 'oneMap', icon: 'component', affix: true }
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
    path: '/documentation',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/documentation/index'),
        name: 'Documentation',
        meta: { title: 'Documentation', icon: 'documentation', affix: true }
      }
    ]
  },
  {
    path: '/guide',
    component: Layout,
    redirect: '/guide/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/guide/index'),
        name: 'Guide',
        meta: { title: 'Guide', icon: 'guide', noCache: true }
      }
    ]
  },
  ...asyncRoutes
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
