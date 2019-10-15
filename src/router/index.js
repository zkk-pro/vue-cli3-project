import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

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
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/welcome',
    children: [{
      path: 'welcome',
      name: 'Welcome',
      hidden: true,
      component: () => import('@/views/welcome/index'),
      meta: { title: '欢迎页', icon: 'dashboard' }
    }]
  },

  {
    path: '/user-manager',
    component: Layout,
    redirect: '/user-manager/car-owner-audit',
    name: 'Example',
    alwaysShow: true,
    meta: { title: '用户管理', icon: 'user-manager' },
    children: [
      {
        path: 'car-owner-audit',
        name: 'Table',
        component: () => import('@/views/car-owner-audit/index'),
        meta: { title: '车主审核', icon: 'audit' }
      }
    ]
  },

  {
    path: '/screen-manager',
    component: Layout,
    alwaysShow: true,
    redirect: '/screen-manager/screen-earning',
    meta: { title: '屏幕管理', icon: 'screen-manager' },
    children: [
      {
        path: 'screen-earning',
        name: 'Form',
        component: () => import('@/views/screen-earning/index'),
        meta: { title: '屏幕收益', icon: 'screen-earning' }
      }
    ]
  },
  {
    path: '/finance-manager',
    component: Layout,
    alwaysShow: true,
    meta: { title: '财务管理', icon: 'finance-manager' },
    children: [
      {
        path: 'finance-settlement',
        name: 'finance-settlement',
        component: () => import('@/views/finance-settlement/index'),
        meta: { title: '收益结算', icon: 'finance-settlement' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
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
