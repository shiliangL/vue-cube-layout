<template>
  <div class="sidebar-logo-container" :class="{'collapse':collapse}">
    <transition name="sidebarLogoFade">
      <!-- //收缩 -->
      <div v-if="collapse" class="sidebar-logo-item">
        <a v-if="logo" key="collapse" class="sidebar-logo-link" to="/">
          <!-- <svg-icon class="sidebar-logo" icon-class="cube-logo" /> -->
          <span class="sidebar-title">智</span>
        </a>
      </div>
      <!-- //展开 -->
      <div v-else class="sidebar-logo-item">
        <!-- <a v-if="logo" key="expand" class="sidebar-logo-link" to="/">
          <svg-icon class="sidebar-logo" icon-class="cube-logo" @mousemove="mousemove" @click.native="clickLogo" />
        </a> -->
        <span class="sidebar-title">{{ title }}</span>
      </div>
    </transition>
  </div>
</template>

<script>
import settings from '@/settings'

export default {
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      title: settings.title,
      logo:
        'https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png'
    }
  },
  methods: {
    clickLogo() {
      this.$emit('clickLogo')
    },
    mousemove(e) {
      console.log(e)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: $logoBgColor;
  text-align: center;
  overflow: hidden;

  .sidebar-logo-item {
    padding: 0 20px;
    text-align: center;
    .sidebar-logo-link {
      display: flex;
      justify-content: space-around;
      align-items: center;
      .sidebar-logo {
        width: 32px;
        height: 32px;
        vertical-align: middle;
        margin-right: 12px;
      }
    }

    .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #ffffff;
      font-weight: 600;
      font-size: 16px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  .sidebar-logo {
    margin: 0 !important;
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
