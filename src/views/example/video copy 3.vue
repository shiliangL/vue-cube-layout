<template>
  <div
    :v-loading="fetchMapLoading"
    class="Dashboard"
    element-loading-background="rgba(0, 0, 0, 0.45)"
    element-loading-text="数据加载中...."
  >
    <div class="tools">
      <el-row>
        <el-button type="primary" @click="addOverlays">添加Marks</el-button>
        <!-- <el-button type="success">成功按钮</el-button>
        <el-button type="info">信息按钮</el-button>
        <el-button type="warning">警告按钮</el-button>-->
        <el-button type="danger" @click="clearOverlays">清空Marks</el-button>
      </el-row>
    </div>
    <baidu-map
      :center="center"
      :max-zoom="maxZoom"
      :min-zoom="minZoom"
      :zoom="zoom"
      class="map"
      @ready="mapReady"
    >
      <bm-map-type
        :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']"
        anchor="BMAP_ANCHOR_TOP_RIGHT"
      />
      <bm-boundary
        :fill-opacity="0"
        :mass-clear="false"
        :stroke-weight="3"
        fill-color
        name="深圳市"
        stroke-color="red"
      />

      <bm-info-window :position="windowPosition" title="Info Window Title" :show="infoWindow.show" @close="infoWindowClose" @open="infoWindowOpen">
        <p v-text="infoWindow.contents" />
        <button @click="clear">Clear</button>
      </bm-info-window>

    </baidu-map>
  </div>
</template>

<script>
import { data } from './mapData.json'

export default {
  name: 'Index',
  components: {},
  data() {
    return {
      infoWindow: {
        show: false,
        contents: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
      },
      windowPosition: { lng: 114.12744, lat: 22.64469 },
      map: null,
      fetchMapLoading: false,
      // center: { lng: 102.851615, lat: 24.85568 },
      center: { lng: 114.12744, lat: 22.64469 }, // 深圳
      zoom: 12,
      maxZoom: 18,
      minZoom: 8,
      mapLeftShow: { tree: true, all: false, section: false, explain: false },
      mapRightShow: false,
      sectionTree: [],
      treeNode: {},
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      sectionInfo: {
        personTypeInfo: [],
        carTypeInfo: [],
        mapPartTypeInfo: {},
        sectionTotal: {}
      },
      filterText: '',
      tabName: 'tab1'
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  created() {
    // console.log(data)
  },
  methods: {
    clearOverlays() {
      this.map && this.map.clearOverlays()
    },
    addOverlays() {
      this.map && this.drawMarkList(data)
    },
    mapReady: function({ BMap, map }) {
      map.enableScrollWheelZoom()
      this.map = map
      this.drawMarkList(data)
    },
    drawMarkList(list, type) {
      list.map((item, index) => {
        // eslint-disable-next-line no-undef
        // const car_card = require('@/assets/img/allcar.png')
        const car_card = require('@/assets/img/pp.png')
        const IconImg = car_card
        // eslint-disable-next-line no-undef
        const icon = new BMap.Icon(IconImg, new BMap.Size(30, 30), {
          // eslint-disable-next-line no-undef
          imageSize: new BMap.Size(30, 30)
        })
        // eslint-disable-next-line no-undef
        const marker = new BMap.Marker(new BMap.Point(item.lng, item.lat), {
          icon: icon
        })

        const markerLabelName = `${item.zoneName}${item.mapCount}辆`
        // eslint-disable-next-line no-undef
        const markerLabel = new BMap.Label(markerLabelName, {
          // eslint-disable-next-line no-undef
          offset: new BMap.Size(20, 5)
        })

        markerLabel.setStyle({
          color: '#fff',
          border: 'none',
          padding: '.1rem .2rem',
          fontWeight: 600,
          backgroundColor: 'rgba(0,0,0,.3)',
          borderRadius: '1rem;'
        })

        // type === 'circle' 添加标注
        if (type === 'circle') marker.setLabel(markerLabel)

        const addEventListenerType = e => {
          // e.domEvent.stopPropagation()
          this.fetchMarkerDetail(e, item)
        }
        marker.addEventListener('click', addEventListenerType)

        this.map.addOverlay(marker)
      })
    },
    infoWindowClose(e) {
      this.infoWindow.show = false
    },
    infoWindowOpen(e) {
      this.infoWindow.show = true
    },
    clear() {
      this.infoWindow.contents = ''
    },
    fetchMarkerDetail(e, item) {
      // this.infoWindowOpen()
      this.infoWindow.show = true
      this.windowPosition = { lng: item.lng, lat: item.lat }
      // this.windowPosition = { lng: 114.12744, lat: 22.64469 }
      console.log('点击了', item)

      // const opts = {
      //   width: 250, // 信息窗口宽度
      //   height: 80, // 信息窗口高度
      //   title: '', // 信息窗口标题
      //   enableMessage: true// 设置允许信息窗发送短息
      // }

      // // eslint-disable-next-line no-undef
      // const p = e.target
      // // eslint-disable-next-line no-undef
      // const point = new BMap.Point(p.getPosition().lng, p.getPosition().lat)

      // const html = `${item.c_no} - ${item.c_car_type}`
      // // eslint-disable-next-line no-undef
      // const infoWindow = new BMap.InfoWindow(html, opts)

      // this.map && this.map.openInfoWindow(infoWindow, point) // 开启信息窗口
    },
    handleNodeClick(data) {
      if (data.dataType === undefined) {
        data.dataType = 3
      }
      if (data.dataType === 3) {
        if (!data.baiduPoint || data.baiduPoint.length === 0) {
          this.$alert('没有画出标段范围')
        } else {
          this.zoom = 15
          // map.myMap.setZoom(15);
          // map.show.polygon({ isHide: isHideSectionMarker, isRemove: true, panTo: true, isExist: true, type: "section", data: node.c_baidu_str, name: "", id: node.c_section_id });
        }
      }
      this.treeNode = data
      this.getSectionSummary(data)
    },
    handleLeftClick(obj) {
      for (const key in this.mapLeftShow) {
        this.mapLeftShow[key] = false
      }
      this.mapLeftShow[obj] = true
    },
    handleRightClick() {
      this.mapRightShow = false
    },
    closeContent() {
      for (const key in this.mapLeftShow) {
        this.mapLeftShow[key] = false
      }
    },
    getSectionSummary(node) {},
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    }
  }
}
</script>

<style lang="scss" scoped>
.map-left {
  width: 320px;
}

.map-left-tools {
  position: absolute;
  left: 14px;
  top: 10px;
  z-index: 99;
  background-color: rgba(255, 255, 255, 1);
  width: inherit;
  line-height: 44px;
  height: 44px;
  box-shadow: 0 0 10px rgba(10, 41, 59, 0.1);
  opacity: 1;

  .el-divider--vertical {
    height: 17px;
  }
}

.map-left-tools li {
  border: 1px dashed #71b6d9;
  cursor: pointer;
  display: inline-block;
  line-height: 1;

  i {
    font-size: 16px;
  }

  &:first-child {
    margin-left: 18px;
  }

  &:last-child {
    margin-right: 18px;
  }

  &:hover {
    background: #ffffff;
  }

  &.selected {
    background: #dde7f7;
  }
}

.map-left-content {
  position: absolute;
  left: 14px;
  top: 60px;
  z-index: 99;
  width: inherit;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0 0 10px rgba(10, 41, 59, 0.1);
  opacity: 1;
  height: calc(100% - 84px);

  /deep/ .el-card__header {
    padding: 10px 14px;

    .el-button {
      height: auto;
      padding: 0;
      float: right;
      color: rgba(76, 79, 90, 1);
    }
  }

  /deep/ .el-input--small .el-input__inner {
    height: 36px;
    line-height: 36px;
  }
  .el-button {
    height: 36px;
  }

  /deep/ .el-tree-node__label {
    font-size: 12px;
  }
  /deep/ .el-card__body {
    padding: 0;
  }
}

.map-right {
  position: absolute;
  right: 50px;
  top: 10px;
  z-index: 99;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0 0 10px rgba(10, 41, 59, 0.1);
  opacity: 1;
  width: 485px;
  padding-left: 10px;
  padding-right: 10px;

  /deep/ .el-tabs__nav {
    height: 71px;
  }

  /deep/ .el-tabs__item {
    padding: 0;
  }

  /deep/ .el-tabs__item > div {
    background-color: rgba(227, 232, 239, 1);
    font-size: 12px;
    text-align: center;
    line-height: normal;
    margin: 5px;
    width: 79px;
    height: 56px;
    border-radius: 4px;

    i {
      display: block;
      font-size: 16px;
      padding-top: 10px;
    }
  }
}

.map-right-head {
  height: 30px;
  line-height: 30px;
  font-size: 14px;

  .el-button {
    float: right;
    color: rgba(76, 79, 90, 1);
  }
}

.Dashboard {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  font-size: 0.22rem;

  .map {
    width: 100%;
    height: 100%;
  }

  .select-wrap {
    position: absolute;
    top: 1rem;
    left: 1rem;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 0.1rem;
    cursor: pointer;
    z-index: 2;
  }
}

.tools {
  padding: 10px;
  position: fixed;
  width: 100%;
  top: 90px;
  left: 0;
  background: #dde7f7;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
