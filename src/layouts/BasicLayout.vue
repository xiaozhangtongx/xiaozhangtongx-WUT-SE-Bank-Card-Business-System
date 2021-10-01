<template>
  <div :class="[`nav-theme-${navTheme}`,`nav-layout-${navLayout}`]">
    <a-layout id="components-layout-demo-side" style="min-height: 100vh">
      <a-layout-sider v-if="navLayout=='left'" v-model="collapsed" collapsible :trigger="null"
        :theme="navTheme" width="256px">
        <div class="logo">
          银行卡管理系统
        </div>
        <SiderMenu :themes="navTheme" />
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0">
          <a-icon class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="() => (collapsed = !collapsed)" />
          <Header />
        </a-layout-header>

        <a-layout-content style="margin: 0 16px">
          <router-view />
        </a-layout-content>
        <a-layout-footer style="text-align: center">
          <Footer></Footer>
        </a-layout-footer>
      </a-layout>
    </a-layout>
    <SettingDrawer></SettingDrawer>
  </div>
</template>

<script>
import Header from '@/layouts/Header'
import Footer from '@/layouts/Footer'
import SiderMenu from '@/layouts/SiderMenu'
import SettingDrawer from '../components/SettingDrawer'
export default {
  name: '',
  data() {
    return { collapsed: false }
  },
  computed: {
    navTheme() {
      console.log(this.$route.query.navTheme || 'dark')
      return this.$route.query.navTheme || 'dark'
    },
    navLayout() {
      console.log(this.$route.query.navLayout || 'left')
      return this.$route.query.navLayout || 'left'
    },
  },
  methods: {},
  components: {
    Header,
    Footer,
    SiderMenu,
    SettingDrawer,
  },
}
</script>

<style scoped lang='less'>
#components-layout-demo-side {
  .logo {
    height: 64px;
    line-height: 64px;
    text-align: center;
    overflow: hidden;
    font-size: 23px;
    font-weight: 700;
  }
  .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
    &:hover {
      color: #1890ff;
      background-color: rgba(158, 158, 158, 0.1);
    }
  }
}
.nav-theme-dark {
  .logo {
    color: #fff;
  }
}

.nav-theme-light {
  color: black;
}
</style>