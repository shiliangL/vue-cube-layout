<template>
  <div class="chart-container">

    {{ selectRemoteValue }}
    <SelectRemote v-model="selectRemoteValue" :config="config" />
  </div>
</template>

<script>
//  与组件控制相关的不写进对象配置中
import SelectRemote from './SelectRemote'

export default {
  name: 'KeyboardChart',
  components: {
    SelectRemote
  },
  data() {
    return {
      config: {
        valueKey: 'sectionId'
      },
      selectRemoteValue: ''
    }
  },
  mounted() {
    this.selectRemoteValue = { sectionId: '0BB6096E-7D27-4813-9107-575ACC272940', name: '新桥清扫保洁E标宝政通' }
    setTimeout(_ => {
      // this.selectRemoteValue = { sectionId: '600BE2F9-DE6A-43A3-9C39-A3A112E3D812', name: '新安清扫保洁A标万城美' }
      this.selectRemoteValue = { sectionId: '0BB6096E-7D27-4813-9107-575ACC272940', name: '新桥清扫保洁E标宝政通' }
    }, 3000)
  },
  methods: {

  }
}
</script>

<style scoped>
.chart-container {
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
  padding:  20px 50px;
}
.h50{
  height: 50px;
}
</style>

