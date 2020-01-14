<template>
  <div id="app">
    <div id="mapView" />
    <div class="tools">
      <el-button
        type="primary"
        @click="doMap"
      >画地图</el-button>
    </div>
    <!-- <cubeSideBar msg="Welcome to Your Vue.js App" /> -->
  </div>
</template>

<script>

// import cubeSideBar from './components/cubeSideBar.vue'
const point = require('@/assets/point.png')

import { getGarPubToilet } from '@/api/BigData'

export default {
  name: 'App',
  components: {
    // cubeSideBar
  },
  data() {
    return {
      mapDataList: [],
      map: [],
      worker: null
      // map: null
    }
  },
  created() {
    console.log(this.$worker)
  },
  mounted() {
    this.mapReady()
    this.getGarPubToiletData()
  },
  methods: {
    mapReady(res) {
      // eslint-disable-next-line no-undef
      const map = this.map = new BMap.Map('mapView', { enableMapClick: false, minZoom: 8 })
      // eslint-disable-next-line no-undef
      map.centerAndZoom(new BMap.Point(114.12744, 22.64469), 13)

      return map
    },
    doMap() {
      const list = [1, 3, 2]
      this.buildWorker(list)
    },
    buildWorker(list) {
      this.worker = this.$worker.run(list => {
        console.log(list)
        setInterval(() => {
          console.log(' 执行子线程 ')
        }, 1000)
        // 这里就定时的处理数据 相当于 几分钟发挥切割好的数据
        return list
      }, [list]).then(list => {
        for (const item of list) {
        // eslint-disable-next-line no-undef
          const pt = new BMap.Point(item.lng, item.lat)
          // eslint-disable-next-line no-undef
          const myIcon = new BMap.Icon(point, new BMap.Size(20, 20))
          // eslint-disable-next-line no-undef
          const marker2 = new BMap.Marker(pt, { icon: myIcon })
          this.map.addOverlay(marker2) // 将标注添加到地图中
        }
      }).catch(e => console.log(e), 'e')
    },
    tabChage() {
      this.worker = null
    },
    getGarPubToiletData() {
      getGarPubToilet()
        .then(res => {
          const result = res.data
          if (result.success) {
            const mapToiletList = result.data || []
            this.mapDataList = mapToiletList
            // this.buildWorker(mapToiletList)
          } else {
            this.$message(result.message)
          }
        })
        .catch(_ => {
          console.log(_)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
#app {
  height: 90vh;
  width: 100%;

  #mapView {
    height: 100%;
    width: 100%;
  }

  .tools {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 9999;
  }
}
</style>
