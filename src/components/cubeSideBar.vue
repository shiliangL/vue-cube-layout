<template>
  <div
    class="page-wrapper chiller-theme"
    :class="toggled?'toggled':'' "
  >
    <!-- 头部 -->
    <AppHeader :toggled.sync="toggled" />

    <!-- 侧边菜单 -->
    <AppSiderMenu />

    <!-- 设置 -->
    <right-panel v-if="showSettings">
      <Setting show />
    </right-panel>

    <!-- sidebar-wrapper 主要视图页面 -->
    <main class="page-content">
      <div class="page-conten-inner">
        {{ toggled }}
        <cubeLayout />
        <treeselect
          v-model="value"
          :multiple="true"
          :options="options"
          style="width:250px"
        />
        <div
          v-for="k in 10"
          :key="k"
        >
          有时候，我们需要给多个元素添加同一个动画，播放后，不难发现它们会一起运动，一起结束，这样就会显得很平淡无奇。
        </div>
      </div>
    </main>

  </div>
</template>

<script>
import Setting from './setting'
import RightPanel from './RightPanel'
import AppHeader from './AppHeader'
import AppSiderMenu from './AppSiderMenu'
import cubeLayout from './cubeLayout'

// import the component
import Treeselect from '@riophae/vue-treeselect'
// import the styles
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

export default {
  name: 'CubeSideBar',
  components: {
    Treeselect,
    Setting,
    AppHeader,
    AppSiderMenu,
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
          label: 'aa'
        }, {
          id: 'ab',
          label: 'ab'
        }]
      }, {
        id: 'b',
        label: 'b'
      }, {
        id: 'c',
        label: 'c'
      }],
      drawerDialog: false,
      toggled: true,
      showSettings: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '80px'
    }
  },
  mounted() { },
  methods: {

  }
}
</script>
