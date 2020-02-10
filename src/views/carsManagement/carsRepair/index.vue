<!-- 合同信息管理 -->
<template>
  <split-pane
    split="vertical"
    :min-percent="20"
    :default-percent="20"
  >
    <template slot="paneL">
      <BasicTab class="split-containerBox" @clickRow="clickTabRow" />
    </template>
    <template slot="paneR">
      <RightContainer class="split-containerBox" />
    </template>
  </split-pane>
</template>

<script>

import splitPane from 'vue-splitpane'

import BasicTab from '@/publicView/basicTab'
// import LeftContainer from './leftContainer'
import RightContainer from './rightContainer'

export default {
  name: 'CarsRepair',
  components: {
    splitPane,
    BasicTab,
    // LeftContainer,
    RightContainer
  },
  props: {
    propsData: {
      type: Object,
      default: () => { }
    }
  },
  data() {
    return {

    }
  },
  methods: {
    clickTabRow(item) {
      console.log(item)
    }
  }
}
</script>

 <style scoped lang="scss">

</style>

