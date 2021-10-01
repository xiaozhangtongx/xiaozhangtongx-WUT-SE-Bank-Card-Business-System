import Vue from 'vue'
import VueRouter from 'vue-router'
import BasicLayout from '@/layouts/BasicLayout'
import NotFound from '@/views/404'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(VueRouter)

const routes = [
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
  {
    path: '/',
    redirect: '/user',
  },
  // 功能页面
  {
    path: '/main',
    component: BasicLayout,
    children: [
      {
        path: '/main/home',
        meta: { icon: 'home', title: '系统首页' },
        name: 'Home',
        component: () => import('../views/Home/Home.vue'),
      },
    ],
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
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
