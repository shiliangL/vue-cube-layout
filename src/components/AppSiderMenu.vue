<template>
  <div>
    <!-- 隐藏sidebar时候按钮 -->
    <a
      id="show-sidebar"
      class="btn btn-sm btn-dark"
      href="#"
      @click="closeSidebar"
    >
      <i class="fas fa-bars" />
    </a>
    <nav
      id="sidebar"
      class="sidebar-wrapper"
    >
      <div class="sidebar-content">
        <div class="sidebar-brand">
          <a
            href="#"
            @click="drawerDialog = true"
          >vue-cuber-side-bar</a>
          <!-- 展开sidebar时候按钮 -->
          <div
            id="close-sidebar"
            @click="closeSidebar"
          >
            <i class="fas fa-bars" />
          </div>
        </div>
        <div class="sidebar-menu">
          <ul>
            <li
              v-for="(item, index) in 10"
              :key="index"
              class="sidebar-dropdown"
            >
              <a href="#">
                <i class="fa fa-tachometer-alt" />
                <span>Dashboard</span>
                <span class="badge badge-pill badge-warning">New</span>
              </a>
            </li>
          </ul>
        </div>
        <!-- sidebar-menu  -->
      </div>
      <!-- sidebar-content  -->
      <div class="sidebar-footer">
        <a href="#">
          <i class="fa fa-bell" />
          <span class="badge badge-pill badge-warning notification">3</span>
        </a>
        <a href="#">
          <i class="fa fa-envelope" />
          <span class="badge badge-pill badge-success notification">7</span>
        </a>
        <a href="#">
          <i class="fa fa-cog" />
          <span class="badge-sonar" />
        </a>
        <a href="#">
          <i class="fa fa-power-off" />
        </a>
      </div>
    </nav>
  </div>
</template>

<script>

export default {
  name: 'AppSiderMenu',
  props: {
    toggled: {
      type: Boolean,
      default: () => false
    }
  },
  data() {
    return {

    }
  },
  mounted() { },
  methods: {
    closeSidebar() {
      console.log(this.toggled, 'xx')
      const toggled = !this.toggled
      this.$emit('update:toggled', toggled)
      console.log(this.toggled, 'xx')
    }
  }
}
</script>
