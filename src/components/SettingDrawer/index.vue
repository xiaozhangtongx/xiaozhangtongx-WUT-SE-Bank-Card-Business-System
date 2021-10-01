<template>
  <div>
    <a-drawer title="整体风格定制" placement="right" :closable="false" :visible="visible" @close="onClose"
      width="300px">
      <template v-slot:handle>
        <div class="handle" @click="visible=!visible">
          <a-icon :type="visible?'close':'setting'"></a-icon>
        </div>
      </template>
      <template>
        <div>
          <h3>导航栏颜色</h3>
          <a-radio-group :value="navTheme"
            @change="e=>handleSettingChange('navTheme',e.target.value)">
            <a-radio value="dark">黑色</a-radio>
            <a-radio value="light">白色</a-radio>
          </a-radio-group>
          <h3>导航模式</h3>
          <a-radio-group :value="navLayout"
            @change="e=>handleSettingChange('navLayout',e.target.value)">
            <a-radio value="left">左侧</a-radio>
            <a-radio value="top">顶部</a-radio>
          </a-radio-group>
        </div>
      </template>
    </a-drawer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
    }
  },
  computed: {
    navTheme() {
      return this.$route.query.navTheme || 'dark'
    },
    navLayout() {
      return this.$route.query.navLayout || 'left'
    },
  },
  methods: {
    showDrawer() {
      this.visible = true
    },
    onClose() {
      this.visible = false
    },
    handleSettingChange(type, value) {
      this.$router.push({ query: { ...this.$route.query, [type]: value } })
    },
  },
}
</script>


<style scoped lang='less'>
.handle {
  position: absolute;
  top: 240px;
  right: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  font-size: 16px;
  text-align: center;
  background: #1890ff;
  border-radius: 4px 0 0 4px;
  cursor: pointer;
}
</style>