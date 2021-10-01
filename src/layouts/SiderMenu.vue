<template>
  <div style="width: 256px">
    <a-menu :default-selected-keys="['1']" :default-open-keys="['2']" mode="inline" :theme="themes"
      :inline-collapsed="collapsed">
      <template v-for="item in list">
        <a-menu-item :key="item.key" v-if="!item.children">
          <a-icon type="pie-chart" />
          <span>{{ item.title }}</span>
        </a-menu-item>
        <a-sub-menu :key="item.key" v-if="item.children">
          <span slot="title">
            <a-icon type="appstore" /><span>{{item.title}}</span>
          </span>
          <a-menu-item v-for="items in item.children" :key="items.key">
            {{items.title}}
          </a-menu-item>
        </a-sub-menu>
      </template>
    </a-menu>
  </div>
</template>


<script>
export default {
  props: {
    themes: {
      type: String,
      default: 'dark',
    },
  },
  data() {
    return {
      collapsed: false,
      list: [
        {
          key: '1',
          title: 'Option 1',
        },
      ],
    }
  },
  methods: {},
}
</script>
