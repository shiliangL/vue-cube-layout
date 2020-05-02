<template>
  <div class="chart-container">
    <div
      id="main"
      style="width: 100%;height:100%;"
    >
      地图
    </div>
  </div>
</template>

<script>

import echarts from 'echarts'
import resize from '@/utils/resize'
import chinaData from './map/china.json'
import { provinces, special, cityMap } from './map/constant'

export default {
  name: 'MixChart',
  mixins: [resize],
  data() {
    return {
      chart: null,
      map: {
        china: null,
        province: null,
        city: null
      },
      option: {
        backgroundColor: '#000',
        title: {
          text: '地图展示',
          subtext: '逐级显示',
          link: 'https://lhhw.topevery.com/TopEvery.UI/#/Dashboard',
          left: 'center',
          textStyle: {
            color: '#fff',
            fontSize: 16,
            fontWeight: 'normal',
            fontFamily: 'Microsoft YaHei'
          },
          subtextStyle: {
            color: '#ccc',
            fontSize: 13,
            fontWeight: 'normal',
            fontFamily: 'Microsoft YaHei'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b}'
        },
        toolbox: {
          show: true,
          orient: 'vertical',
          left: 'right',
          top: 'center',
          feature: {
            dataView: { readOnly: false },
            restore: {},
            saveAsImage: {}
          },
          iconStyle: {
            normal: {
              color: '#fff'
            }
          }
        },
        animationDuration: 1200,
        animationEasing: 'cubicOut',
        animationDurationUpdate: 1200
      }
    }
  },
  mounted() {
    this.initChart()
    // this.fetchMapDataOnline()
  },
  methods: {
    initChart() {
      this.map.china = chinaData.features.map(item => { item.properties.name }) || []
      this.chart = echarts.init(document.getElementById('main'))
      echarts.registerMap('china', chinaData)
      this.renderMap('china', this.map.china)
    },
    // 渲染地图
    renderMap(map, data) {
      this.option.title.subtext = map
      this.option.series = [
        {
          name: map,
          type: 'map',
          mapType: map,
          roam: false,
          nameMap: {
            'china': '中国'
          },
          label: {
            normal: {
              show: true,
              textStyle: {
                color: '#999',
                fontSize: 13
              }
            },
            emphasis: {
              show: true,
              textStyle: {
                color: '#fff',
                fontSize: 13
              }
            }
          },
          itemStyle: {
            normal: {
              areaColor: '#323c48',
              borderColor: 'dodgerblue'
            },
            emphasis: {
              areaColor: 'darkorange',
              color: 'rgba(37, 43, 61, .5)' // 悬浮背景
            }
          },
          // 地图标注
          markPoint: {// 数据全是markPoint
            symbolSize: 20, // 标注大小，半宽（半径）参数，当图形为方向或菱形则总宽度为symbolSize * 2
            itemStyle: {
              normal: {
                borderColor: '#87cefa',
                borderWidth: 1, // 标注边线线宽，单位px，默认为1
                label: {
                  show: true
                }
              },
              emphasis: {
                borderColor: '#1e90ff',
                borderWidth: 1,
                label: {
                  show: true
                }
              }
            },
            effect: {
              show: true,
              shadowBlur: 0
            },
            data: [
              {
                name: '上海',
                coord: [121.4648, 31.2891]
              }
            ]
          }, // end markPoint
          data: data
        }
      ]
      this.chart.setOption(this.option)
      this.chart.on('click', (params) => this.clickMap(params))
    },
    resetChart() {
      this.chart && this.chart.off('click')
      // this.chart && this.chart.clear()
    },
    clickMap(params) {
      console.log(params)
      // 如果点击的是34个省、市、自治区，绘制选中地区的二级地图
      if (provinces[params.name]) {
        const province = require('./map/province/' + provinces[params.name] + '.json') || null
        province && echarts.registerMap(params.name, province)
        this.map.province = province.features.map(item => { item.properties.name }) || []
        this.resetChart()
        this.renderMap(params.name, this.map.province)
      } else if (provinces[params.seriesName]) {
        // 如果是【直辖市/特别行政区】点击返回 全国
        if (special.includes(params.seriesName)) {
          this.resetChart()
          this.renderMap('china', this.map.china)
        } else {
          const city = require('./map/city/' + cityMap[params.name] + '.json') || null
          city && echarts.registerMap(params.name, city)
          this.map.city = city.features.map(item => { item.properties.name }) || []
          this.resetChart()
          this.renderMap(params.name, this.map.city)
        }
      } else {
        this.resetChart()
        this.renderMap('china', this.map.china)
      }
    },
    fetchMapDataOnline() {
      fetch('https://geo.datav.aliyun.com/areas_v2/bound/440300_full.json', {
        method: 'GET',
        cache: 'default',
        mode: 'cors'
      }).then((value) => {
        return value.json()
      }).then((shenzhen) => {
        this.map.china = shenzhen.features.map(item => { item.properties.name }) || []
        this.chart = echarts.init(document.getElementById('main'))
        echarts.registerMap('shenzhen', shenzhen)
        console.log(shenzhen)
        this.renderMap('shenzhen', this.map.china)
      })
    }
  }
}
</script>

<style scoped>
.chart-container {
  position: relative;
  width: 100%;
  height: calc(100vh - 80px);
}
</style>

