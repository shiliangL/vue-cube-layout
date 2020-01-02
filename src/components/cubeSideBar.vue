<template>
  <div
    class="page-wrapper chiller-theme"
    :class="toggled?'toggled':''  "
  >
    <!-- 头部 -->
    <AppHeader />

    <!-- 隐藏sidebar时候按钮 -->
    <a
      id="show-sidebar"
      class="btn btn-sm btn-dark"
      href="#"
      @click="closeSidebar"
    >
      <i class="fas fa-bars"></i>
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
            <i class="fas fa-bars"></i>
          </div>
        </div>
        <div class="sidebar-menu">
          <ul>
            <li
              class="sidebar-dropdown"
              v-for="(item, index) in 10"
              :key="index"
            >
              <a href="#">
                <i class="fa fa-tachometer-alt"></i>
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
          <i class="fa fa-bell"></i>
          <span class="badge badge-pill badge-warning notification">3</span>
        </a>
        <a href="#">
          <i class="fa fa-envelope"></i>
          <span class="badge badge-pill badge-success notification">7</span>
        </a>
        <a href="#">
          <i class="fa fa-cog"></i>
          <span class="badge-sonar"></span>
        </a>
        <a href="#">
          <i class="fa fa-power-off"></i>
        </a>
      </div>
    </nav>

    <!-- 设置 -->
    <right-panel v-if="showSettings">
      <Setting show />
    </right-panel>

    <!-- sidebar-wrapper 主要视图页面 -->
    <main class="page-content">
      <div class="page-conten-inner">
        <cubeLayout />

        <treeselect
          v-model="value"
          :multiple="true"
          :options="options"
          style="width:250px"
        />
        <div
          v-for="k in  10"
          :key="k"
        >
          有时候，我们需要给多个元素添加同一个动画，播放后，不难发现它们会一起运动，一起结束，这样就会显得很平淡无奇。
        </div>
      </div>
    </main>

  </div>
</template>

<script>
import Setting from "./setting";
import RightPanel from "./RightPanel";
import AppHeader from "./AppHeader";
import cubeLayout from "./cubeLayout";


// import the component
import Treeselect from '@riophae/vue-treeselect'
// import the styles
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

export default {
  name: "cubeSideBar",
  components: {
    Treeselect,
    Setting,
    AppHeader,
    RightPanel,
    cubeLayout
  },
  data() {
    return {
      value: null,
      // define options
      options: [{
        id: 'a',
        label: 'a',
        children: [{
          id: 'aa',
          label: 'aa',
        }, {
          id: 'ab',
          label: 'ab',
        }],
      }, {
        id: 'b',
        label: 'b',
      }, {
        id: 'c',
        label: 'c',
      }],
      drawerDialog: false,
      toggled: true,
      showSettings: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      formLabelWidth: "80px"
    };
  },
  mounted() { },
  methods: {
    closeSidebar() {
      this.toggled = !this.toggled;
    }
  }
};
</script>
 