import Vue from 'vue'
import VueRouter from 'vue-router'
import findLast from 'lodash/findLast'
import { notification } from 'ant-design-vue'
import BasicLayout from '@/layouts/BasicLayout'
import NotFound from '../views/Error/404.vue'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { check, isLogin } from '../utils/auth'

Vue.use(VueRouter)

const routes = [
  // 路由重定向
  {
    path: '/',
    redirect: '/user',
  },
  // 登录注册页面
  {
    path: '/user',
    component: () => import('../layouts/UserLayout.vue'),
    hideInMenu: true,
    children: [
      {
        path: '/user/login',
        component: () => import('../views/User/Login.vue'),
      },
      {
        path: '/user/register',
        component: () => import('../views/User/Register.vue'),
      },
      {
        path: '/user',
        redirect: '/user/login',
      },
    ],
  },

  // 功能页面
  {
    path: '/main',
    meta: { authority: ['user', 'admin'] },
    component: BasicLayout,
    children: [
      // 系统首页
      {
        path: '/main/home',
        meta: { icon: 'home', title: '系统首页' },
        name: 'Home',
        component: () => import('../views/Home/Home.vue'),
      },
      // 用户管理
      {
        path: '/main/users',
        meta: { icon: 'team', title: '用户管理', authority: ['admin'] },
        name: 'Users',
        component: () => import('../views/Home/Home.vue'),
        children: [
          {
            path: '/main/home/demo1',
            meta: { icon: 'home', title: '系统首页' },
            name: 'Home1',
            hideChildrenInMenu: true,
            component: () => import('../views/Home/Home.vue'),
          },
          {
            path: '/main/home/demo2',
            meta: { icon: 'home2', title: '系统首页' },
            name: 'Home2',
            hideChildrenInMenu: true,
            component: () => import('../views/Home/Home.vue'),
          },
        ],
      },
      // 银行卡存取管理
      {
        path: '/main/cards',
        meta: { icon: 'pay-circle', title: '存取管理' },
        name: 'Cards',
        component: () => import('../views/Home/Home.vue'),
      },
      // 个人中心
      {
        path: '/main/account',
        meta: { icon: 'user', title: '个人中心' },
        name: 'Account',
        component: () => import('../views/Home/Home.vue'),
      },
    ],
  },
  // 401页面
  {
    path: '/401',
    name: '401',
    hideInMenu: true,
    component: () =>
      import(/* webpackChunkName: "exception" */ '../views/Error/401.vue'),
  },
  // 404页面
  {
    path: '*',
    hideInMenu: true,
    component: NotFound,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.path != from.path) {
    NProgress.start()
  }
  const record = findLast(to.matched, (record) => record.meta.authority)
  // 判断权限
  if (record && !check(record.meta.authority)) {
    if (!isLogin() && to.path !== '/user/login') {
      next({
        path: '/user/login',
      })
    } else if (to.path !== '/401') {
      notification.error({
        message: '401',
        description: '你没有权限访问，请联系管理员咨询。',
      })
      next({
        path: '/401',
      })
    }
    NProgress.done()
  }
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
