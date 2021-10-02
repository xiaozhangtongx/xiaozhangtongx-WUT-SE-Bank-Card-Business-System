"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

var _BasicLayout = _interopRequireDefault(require("@/layouts/BasicLayout"));

var _ = _interopRequireDefault(require("../views/Error/404.vue"));

var _nprogress = _interopRequireDefault(require("nprogress"));

require("nprogress/nprogress.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

_vue["default"].use(_vueRouter["default"]);

var routes = [// 登录注册页面
{
  path: '/user',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('../layouts/UserLayout.vue'));
    });
  },
  hideInMenu: true,
  children: [{
    path: '/user/login',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('../views/User/Login.vue'));
      });
    }
  }, {
    path: '/user/register',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('../views/User/Register.vue'));
      });
    }
  }, {
    path: '/user',
    redirect: '/user/login'
  }]
}, {
  path: '/',
  redirect: '/user'
}, // 功能页面
{
  path: '/main',
  component: _BasicLayout["default"],
  children: [// 系统首页
  {
    path: '/main/home',
    meta: {
      icon: 'home',
      title: '系统首页'
    },
    name: 'Home',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('../views/Home/Home.vue'));
      });
    }
  }, // 用户管理
  {
    path: '/main/users',
    meta: {
      icon: 'team',
      title: '用户管理'
    },
    name: 'Users',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('../views/Home/Home.vue'));
      });
    },
    children: [{
      path: '/main/home/demo1',
      meta: {
        icon: 'home',
        title: '系统首页'
      },
      name: 'Home1',
      hideChildrenInMenu: true,
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require('../views/Home/Home.vue'));
        });
      }
    }, {
      path: '/main/home/demo2',
      meta: {
        icon: 'home2',
        title: '系统首页'
      },
      name: 'Home2',
      hideChildrenInMenu: true,
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require('../views/Home/Home.vue'));
        });
      }
    }]
  }, // 银行卡存取管理
  {
    path: '/main/cards',
    meta: {
      icon: 'pay-circle',
      title: '存取管理'
    },
    name: 'Cards',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('../views/Home/Home.vue'));
      });
    }
  }, // 个人中心
  {
    path: '/main/account',
    meta: {
      icon: 'user',
      title: '个人中心'
    },
    name: 'Account',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('../views/Home/Home.vue'));
      });
    }
  }]
}, // 404页面
{
  path: '*',
  hideInMenu: true,
  component: _["default"]
}];
var router = new _vueRouter["default"]({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes
});
router.beforeEach(function (to, from, next) {
  if (to.path != from.path) {
    _nprogress["default"].start();
  }

  next();
});
router.afterEach(function () {
  _nprogress["default"].done();
});
var _default = router;
exports["default"] = _default;