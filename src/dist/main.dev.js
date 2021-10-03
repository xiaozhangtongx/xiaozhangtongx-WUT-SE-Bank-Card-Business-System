"use strict";

var _vue = _interopRequireDefault(require("vue"));

var _antDesignVue = _interopRequireDefault(require("ant-design-vue"));

require("ant-design-vue/dist/antd.less");

var _App = _interopRequireDefault(require("./App.vue"));

var _router = _interopRequireDefault(require("./router"));

var _store = _interopRequireDefault(require("./store"));

var _Authorized = _interopRequireDefault(require("@/components/Authorized"));

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].config.productionTip = false;

_vue["default"].component('Authorized', _Authorized["default"]);

_vue["default"].use(_antDesignVue["default"]);

new _vue["default"]({
  router: _router["default"],
  store: _store["default"],
  render: function render(h) {
    return h(_App["default"]);
  }
}).$mount('#app');