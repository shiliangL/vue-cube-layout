<template>
  <div
    id="OneMap"
    ref="OneMap"
    class="OneMap"
  >
    <svg-icon
      class="fullscreen-icon"
      :icon-class="isFullscreen?'exit-fullscreen':'fullscreen'"
      @click="toScreenfull"
    />

    <baidu-map
      :map-click="false"
      :center="mapData.center"
      :zoom="mapData.zoom"
      class="bm-view"
      @ready="mapReady"
    >
      <bm-boundary
        :fill-opacity="0"
        :mass-clear="false"
        :stroke-weight="2"
        name="中国"
        stroke-color="red"
        fill-color=""
      />

      <!-- 测试 -->
    </baidu-map>

    一张图
  </div>
</template>

<script>

import mapStyle from '@/utils/mapStyle'
import areaData from './data/areaData'
import screenfull from 'screenfull'
const markerImg = require('@/assets/allcar.png')

export default {
  name: 'OneMap',
  components: {

  },
  data() {
    return {
      isFullscreen: false,
      mapData: {
        center: { lng: 105.02744, lat: 38.64469 },
        zoom: 5
      }
    }
  },

  mounted() {
    this.init()
  },
  beforeDestroy() {
    this.destroy()
  },
  methods: {
    mapReady(e) {
      this.map = e.map
      this.map.setMapStyle(mapStyle)
      // this.map.disableDragging()
      this.initAreaData(areaData, e.map)
    },

    initAreaData(data) {
      data.map((v, i) => {
        // eslint-disable-next-line no-undef
        const point = new BMap.Point(v.point[0], v.point[1])
        // eslint-disable-next-line no-undef
        const myIcon = new BMap.Icon(markerImg, new BMap.Size(20, 20), {
          // eslint-disable-next-line no-undef
          imageSize: new BMap.Size(20, 20)
        })
        // eslint-disable-next-line no-undef
        const marker = new BMap.Marker(point, { icon: myIcon })
        // eslint-disable-next-line no-undef
        const label = new BMap.Label(`${v.name}<br/> 设备总数: ${v.total}<br/> 在线数量: ${v.online}`, { offset: new BMap.Size(-0, -0) })
        label.setStyle({
          color: '#fff',
          border: 'none',
          padding: '1rem 1rem',
          fontWeight: 600,
          backgroundColor: 'rgba(0,0,0,.3)',
          borderRadius: '1rem;'
        })
        marker.setLabel(label)
        this.map.addOverlay(marker)
      })
    },

    toScreenfull() {
      if (!screenfull.enabled) {
        this.$message({
          message: 'you browser can not work',
          type: 'warning'
        })
        return false
      }
      const element = document.getElementById('OneMap')
      screenfull.toggle(element)
    },
    change() {
      this.isFullscreen = screenfull.isFullscreen
    },
    init() {
      if (screenfull.enabled) {
        screenfull.on('change', this.change)
      }
    },
    destroy() {
      if (screenfull.enabled) {
        screenfull.off('change', this.change)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.OneMap {
  height: 100%;
  width: 100%;
  background-size: cover;
  background-position: center;
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  background-repeat: no-repeat;
  background-image: url("../../assets/bg_img/bg_04.png");
  box-shadow: 0 0 3px #100925;
  display: flex;
  flex-direction: column;
  position: relative;

  .bm-view {
    height: 100%;
    width: 100%;
  }
}
.fullscreen-icon {
  cursor: pointer;
  position: absolute;
  top: 6px;
  right: 6px;
  color: #b9b9b9;
  z-index: 10;
}
</style>
