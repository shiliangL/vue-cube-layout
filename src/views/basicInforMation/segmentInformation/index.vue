<!-- 标段信息管理 -->
<template>
  <split-pane
    split="vertical"
    :min-percent="20"
    :default-percent="50"
  >
    <template slot="paneL">
      <LeftContainer />
    </template>
    <template slot="paneR">
      <RightContainer />
    </template>
  </split-pane>
</template>

<script>

import splitPane from 'vue-splitpane'
import LeftContainer from './leftContainer'
import RightContainer from './rightContainer'

export default {
  components: {
    splitPane,
    LeftContainer,
    RightContainer
  },
  props: {
    propsData: {
      type: Object,
      default: () => { }
    },
    clearMap: {
      type: Boolean,
      default: true
    },
    mapType: {
      type: Array,
      default() {
        return [3]
      }
    }
  },
  data() {
    return {

    }
  },
  methods: {

  }
}
</script>

 <style scoped lang="scss">

</style>

