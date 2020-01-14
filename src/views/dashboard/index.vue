
<template>
  <div
    v-loading="fetchMapLoading"
    class="Dashboard"
    element-loading-text="数据加载中..."
    element-loading-background="rgba(0, 0, 0, 0.45)"
  >
    <div class="select-wrap">
      <el-select
        v-model="areaItem"
        filterable
        placeholder="请选择"
        value-key="sysId"
        @change="changeAreaSelect"
      >
        <el-option v-for="item in areaList" :key="item.sysId" :label="item.name" :value="item" />
      </el-select>
    </div>

    <div id="map" class="map" />

    <template v-if="false">
      <MapLeftBar>
        sideBarDate
        <!-- <LeftBar :side-bar-date="sideBarDate" /> -->
      </MapLeftBar>

      <MapRightBar>
        sideBarDate
        <!-- <RightBar :side-bar-date="sideBarDate" /> -->
      </MapRightBar>
    </template>
  </div>
</template>

<script>
import areaMapData from '@/utils/areaMapData'
import MapLeftBar from '@/components/MapLeftBar'
import MapRightBar from '@/components/MapRightBar'

// import { getHomeData } from '@/api/bigData'

export default {
  name: 'Dashboard',
  components: {
    MapLeftBar,
    MapRightBar
  },
  data() {
    return {
      map: null,
      fetchMapLoading: false,
      areaItem: null,
      areaList: []
    }
  },
  computed: {
    selectAreaId() {
      return this.areaItem ? this.areaItem.sysId : ''
    }
  },
  mounted() {
    this.$nextTick().then(() => {
      // this.mapInit()
    })
  },
  methods: {
    // 地图初始化
    mapInit(res) {
      // eslint-disable-next-line no-undef
      this.map = new BMap.Map('map', {
        enableMapClick: false,
        minZoom: 12
      })
      // eslint-disable-next-line no-undef
      this.map.centerAndZoom(new BMap.Point(114.12744, 22.64469), 12)

      // 开启鼠标滚轮缩放
      this.map.enableScrollWheelZoom()

      // 在线自定义地图
      // map.setMapStyleV2({ styleId: '5978f65c534db77c45eca12771f65e3a' })

      // 本地自定义地图

      // 地图省份绘制
      this.getMapData()
    },
    // 获取行政区域范围
    getMapData() {
      const areaList = [{ name: '深圳市', sysId: '', pointsLine: [] }]
      areaMapData.map((v1, i1) => {
        v1.pointsLine = []
        v1.points.map((v2, i2) => {
          v2.map((v3, i3) => {
            // eslint-disable-next-line no-undef
            // eslint-disable-next-line no-undef
            v1.pointsLine.push(new BMap.Point(v3.lng, v3.lat))
          })
          // num++
        })
        if (areaList.includes(v1.sysId)) {
          const areaListItem = areaList.find(item => item.sysId === v1.sysId)
          areaListItem.pointsLine = [
            ...areaListItem.pointsLine,
            ...v1.pointsLine
          ]
        } else {
          areaList.push({
            name: v1.name,
            sysId: v1.sysId,
            lng: v1.lng,
            lat: v1.lat,
            pointsLine: v1.pointsLine
          })
        }
      })
      // this.areaList = areaList
      this.drawArea(areaList)
    },
    // 绘制行政区
    drawArea(nameBlock) {
      // 绘制所有的行政区 + 线条
      nameBlock.map((v, i) => {
        let areaText = null
        // eslint-disable-next-line no-undef
        areaText = new BMap.Label(v.name, {
          // eslint-disable-next-line no-undef
          position: new BMap.Point(v.lng, v.lat),
          // eslint-disable-next-line no-undef
          offset: new BMap.Size(50, -50)
        })
        areaText.setStyle({
          color: '#bb0879',
          fontSize: '15px',
          height: '20px',
          border: 'none',
          backgroundColor: 'transparent',
          fontWeight: 800,
          pointerEvents: 'none'
        })
        if (areaText) areaText.disableMassClear()
        this.map.addOverlay(areaText)
        // 线条
        // eslint-disable-next-line no-undef
        v['Polygon'] = new BMap.Polygon(v.pointsLine, {
          strokeColor: '#bb0879',
          fillColor: '#4b93ff',
          fillOpacity: 0.1,
          strokeWeight: 1,
          strokeOpacity: 1
        })
        v['Polygon'].disableMassClear()
        this.map.addOverlay(v['Polygon'])
      })
      this.areaList = Object.freeze(nameBlock)
      // 默认选中光明区
      const itemTag = this.areaList.find(
        item => item.sysId === '9347d946-0a95-4234-a9df-165ade246a76'
      )

      if (!itemTag) return
      this.areaItem = itemTag
      this.changeAreaSelect(itemTag)

      this.fetchHomeData()
    },
    fetchHomeData() {
      console.log('加载首页数据')
      // if (!this.areaItem) return
      // console.log('加载首页数据')
      // getHomeData({ sysId: this.areaItem.sysId || '9347d946-0a95-4234-a9df-165ade246a76' }).then(({ data }) => {
      //   this.sideBarDate = Object.assign(this.sideBarDate, data || {})
      //   const bottomNavigations = JSON.parse(JSON.stringify(this.bottomNavigations))
      //   for (const item of bottomNavigations) {
      //     if (item.homeDataMap) item.value = this.sideBarDate[item.homeDataMap]
      //   }
      //   this.bottomNavigations = bottomNavigations
      // }).catch((e) => {
      //   console.log(e)
      // })
    },
    // 展示选中区域
    changeAreaSelect(itemTag) {
      // store.dispatch('intelligentControl/changeMapLoading', true)
      // 如果选中深圳市则全部展示
      const PolygonList = this.areaList.map(item => item.Polygon)
      if (!itemTag.sysId) {
        let pointArray = []
        for (const item of PolygonList) {
          item.show()
          pointArray = pointArray.concat(item.getPath())
        }
        this.map.setViewport(pointArray)
      } else {
        for (const item of PolygonList) {
          item.hide()
        }
        itemTag.Polygon.show()
        this.map.setViewport(itemTag.Polygon.getPath())
      }
    },
    navigationTo(item, index) {
      if (this.curIndex === index) return
      this.curIndex = index
      this.currentLayerName = item.type
      if (this.areaItem) {
        this.map.setViewport(this.areaItem.Polygon.getPath())
      }
    }
  }
}
</script>

<style lang="scss" scoped>
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

  .areaListselect {
    color: #fff;
    border: none;
    background: #113648;
    .el-select-dropdown__item {
      color: #fff;
      &:hover {
        color: #606266;
      }
    }
  }
}
</style>

