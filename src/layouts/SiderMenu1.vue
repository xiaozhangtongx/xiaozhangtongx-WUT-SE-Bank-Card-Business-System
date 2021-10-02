<template>
  <div style="width: 256px">
    <a-menu :selectedKeys="selectedKeys" :openKeys="openKeys" mode="inline" :theme="theme"
      :inline-collapsed="collapsed">
      <template v-for="item in menuData">
        <a-menu-item v-if="!item.children" :key="item.path">
          <a-icon v-if="item.meta.icon" :type="item.meta.icon" />
          <span>{{ item.meta.title }}</span>
        </a-menu-item>
        <sub-menu v-else :key="item.path" :menu-info="item" />
      </template>
    </a-menu>
  </div>
</template>

<script>
import { Menu } from 'ant-design-vue'
const SubMenu = {
  template: `
      <a-sub-menu :key="menuInfo.path" v-bind="$props" v-on="$listeners">
        <span slot="title">
          <a-icon v-if="menuInfo.meta.icon" :type="menuInfo.meta.icon"/><span>{{ menuInfo.meta.title }}</span>
        </span>
        <template v-for="item in menuInfo.children">
          <a-menu-item v-if="!item.children" :key="item.key">
            <a-icon v-if="item.meta.icon" :type="item.meta.icon" />
            <span>{{ item.meta.title }}</span>
          </a-menu-item>
          <sub-menu v-else :key="item.key" :menu-info="item" />
        </template>
      </a-sub-menu>
    `,
  name: 'SubMenu',
  // must add isSubMenu: true
  isSubMenu: true,
  props: {
    ...Menu.SubMenu.props,
    // Cannot overlap with properties within Menu.SubMenu.props
    menuInfo: {
      type: Object,
      default: () => ({}),
    },
  },
}
export default {
  props: {
    theme: {
      type: String,
      default: 'dark',
    },
  },
  components: {
    'sub-menu': SubMenu,
  },
  data() {
    // console.log(this.$router.options.routes)
    const menuData = this.getMenuList(this.$router.options.routes)
    // console.log(menuData)
    this.selectedKeysMap = {}
    this.openKeysMap = {}
    return {
      collapsed: false,
      // selectedKeys: ['1'],
      // openKeys: ['1'],
      selectedKeys: this.selectedKeysMap[this.$route.path],
      openKeys: this.collapsed ? [] : this.openKeysMap[this.$route.path],
      menuData,
    }
  },
  watch: {
    '$route.path': function (val) {
      this.selectedKeys = this.selectedKeysMap[val]
      this.openKeys = this.collapsed ? [] : this.openKeysMap[val]
    },
  },
  methods: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed
    },
    getMenuList(routes = [], parentKeys = [], selectedKeys) {
      const menuData = []
      // console.log(routes[0].children)
      routes.forEach((item) => {
        if (item.name && !item.hideInMenu) {
          this.openKeysMap[item.path] = parentKeys
          this.selectedKeysMap[item.path] = [item.path || selectedKeys]
          const newItem = { ...item }
          // console.log(newItem)
          delete newItem.children
          // console.log(!item.collapsed && !item.hideChildrenInMenu)
          if (!item.hideChildrenInMenu && item.children) {
            console.log(item.children)
            newItem.children = this.getMenuList(item.children, [...parentKeys, item.path])
          } else {
            this.getMenuList(
              item.children,
              selectedKeys ? parentKeys : [...parentKeys, item.path],
              selectedKeys || item.path
            )
          }
          menuData.push(newItem)
        } else if (!item.hideInMenu && !item.hideChildrenInMenu && item.children) {
          menuData.push(...this.getMenuList(item.children, [...parentKeys, item.path]))
          // console.log(item.children)
        }
      })
      return menuData
    },
  },
}
</script>
