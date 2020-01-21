<template>
  <table-contain :height.sync="maxHeight">
    <div slot="table" class="tableBox" :style="{height:boxHeight }">
      基本信息
    </div>
    <div slot="footer" />
  </table-contain>
</template>

<script>

import { TableContain } from '@/components'
export default {
  name: 'BasicInfo',
  components: {
    TableContain
  },
  data() {
    return {
      maxHeight: 0
    }
  },
  computed: {
    boxHeight() {
      const { maxHeight } = this
      return maxHeight ? maxHeight - 22 + 'px' : null
    }
  },
  mounted() {
    console.log('xx')
  }
}
</script>

<style lang="scss" scoped>
.tableBox{
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
