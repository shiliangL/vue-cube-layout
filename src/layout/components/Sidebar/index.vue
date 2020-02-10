<template>
  <div :class="{'has-logo':showLogo}">

    <CubeCloudBar v-if="false" :visible.sync="cubeCloudBarVisible" />

    <logo v-if="showLogo" :collapse="isCollapse" @clickLogo="clickLogo" />

    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="true"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="true"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in constantRoutes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

import CubeCloudBar from '@/components/CubeCloudBar'

import { constantRoutes } from '@/router'

export default {
  components: { SidebarItem, Logo, CubeCloudBar },
  data() {
    return {
      cubeCloudBarVisible: false,
      constantRoutes
    }
  },
  computed: {
    ...mapGetters(['permission_routes', 'sidebar']),
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  methods: {
    clickLogo() {
      console.log('x')
      this.cubeCloudBarVisible = !this.cubeCloudBarVisible
    }
  }
}
</script>

<style lang="scss" scoped>
.el-icon-menu-bar {
  z-index: 9999;
  position: absolute;
  left: 2px;
  top: 10px;
  height: 26px;
  width: 30px;
  cursor: pointer;
  background:#409EFF;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
  .line{
    height: 2px;
    width: 70%;
    background: #ffffff;
  }
}
</style>
