<template>
  <div>
    <el-row :gutter="6">
      <el-col :span="8">
        <div class="grid-content-left">
          <el-card class="box-card box-card-top">
            <div
              slot="header"
              class="clearfix"
            >
              <span>垃圾量收运情况</span>
              <el-button
                style="float: right; padding: 3px 0"
                type="text"
              >年月日</el-button>
            </div>
            <div class="cubeChartBox">
              <CubeChart
                autoresize
                theme="cube-blue"
                :options="chartConfig"
              />
            </div>
          </el-card>
          <el-card class="box-card">
            <div
              slot="header"
              class="clearfix"
            >
              <span>垃圾收运情况</span>
            </div>
            <div class="main-box">
              <div class="main-box-tab">
                <el-row :gutter="6">
                  <el-col :span="12">
                    <el-card shadow="never">
                      <div class="tab-title">
                        <div class="title"> 垃圾收运车次 </div>
                        <div class="number"> 50 次 </div>
                      </div>
                    </el-card>
                  </el-col>
                  <el-col :span="12">
                    <el-card shadow="never">
                      <div class="tab-title">
                        <div class="title"> 垃圾收总量 </div>
                        <div class="number"> 50 吨 </div>
                      </div>
                    </el-card>
                  </el-col>
                </el-row>
              </div>
            </div>
            <div class="main-box-table">
              <el-table
                :data="tableData"
                height="444"
                size="mini"
                style="width: 100%"
              >
                <el-table-column
                  prop="date"
                  align="center"
                  label="车牌"
                />
                <el-table-column
                  prop="name"
                  align="center"
                  label="到站"
                />
                <el-table-column
                  prop="name"
                  align="center"
                  label="停泊"
                />
                <el-table-column
                  prop="name"
                  align="center"
                  label="到站"
                />
              </el-table>
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="16">
        <div class="grid-content-right">
          <el-card class="box-card  box-card-top">
            <div
              slot="header"
              class="clearfix"
            >
              <span>泊位使用情况</span>
            </div>
            <div class="parking-list">
              <el-row :gutter="10">
                <el-col
                  v-for="(item,index) in parkingList"
                  :key="index"
                  :xs="12"
                  :sm="8"
                  :md="8"
                  :lg="8"
                  :xl="8"
                >
                  <el-card
                    shadow="never"
                    class="parking-item"
                  >
                    <div class="flex-box">
                      <div class="title-box">
                        {{ item.name }}号泊位
                      </div>
                      <BatteryTage :percentage="item.percentage" />
                      <div class="parking-desc">
                        <div>
                          <div class="title">额定量</div>
                          <div class="number"> 30KG </div>
                        </div>
                        <div>
                          <div class="title">额定量</div>
                          <div class="number"> 30KG </div>
                        </div>
                        <div>
                          <div class="title">额定量</div>
                          <div class="number"> 30KG </div>
                        </div>
                        <div>
                          <div class="title">额定量</div>
                          <div class="number"> 30KG </div>
                        </div>
                      </div>
                    </div>
                  </el-card>
                </el-col>
              </el-row>
            </div>
          </el-card>
          <el-card class="box-card">
            <div
              slot="header"
              class="clearfix"
            >
              <span>车辆报警信息</span>
            </div>
            <div class="main-box-table">
              <el-table
                :data="tableData"
                height="350"
                size="mini"
                style="width: 100%"
              >
                <el-table-column
                  prop="date"
                  align="center"
                  label="车牌"
                />
                <el-table-column
                  prop="name"
                  align="center"
                  label="到站"
                />
                <el-table-column
                  prop="name"
                  align="center"
                  label="停泊"
                />
                <el-table-column
                  prop="name"
                  align="center"
                  label="到站"
                />
              </el-table>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>

import BatteryTage from './batteryTage'
export default {
  components: {
    BatteryTage
  },
  data() {
    return {
      percentage: 0,
      tableData: [],
      parkingList: [
        { name: '一', percentage: 23, e: 30, d: 15, g: 5, t: 64 },
        { name: '二', percentage: 52, e: 30, d: 15, g: 5, t: 64 },
        { name: '三', percentage: 42, e: 30, d: 15, g: 5, t: 64 },
        { name: '四', percentage: 72, e: 30, d: 15, g: 5, t: 64 },
        { name: '五', percentage: 82, e: 30, d: 15, g: 5, t: 64 },
        { name: '六', percentage: 62, e: 30, d: 15, g: 5, t: 64 }
      ],
      chartConfig: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'line'
          }
        },
        grid: {
          top: '4%',
          left: '2%',
          right: '4%',
          bottom: '0%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['0时', '4时', '8时', '12时', '16时', '20时', '24时'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '访问量',
            type: 'bar',
            barWidth: '60%',
            data: [10, 52, 20, 33, 39, 33, 22]
          }
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.box-card-top {
  margin-bottom: 6px;
}
.cubeChartBox {
  color: #000;
  height: 220px;
  .cueb-charts {
    height: 100%;
    width: 100%;
  }
}
.tab-title {
  .title{
    color: #909399;
    font-size: 13px;
  }
  .number{
    text-align: center;
  }
}
.main-box-table {
  margin-top: 10px;
}
.parking-list {
  min-height: 224px;
  .parking-desc {
    height: 100%;
    font-size: 12px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding-left: 12px;
    .number {
      font-weight: bold;
      font-size: 14px;
    }
  }
  .flex-box {
    height: 150px;
    margin-bottom: 4px;
  }
  .parking-item {
    margin-bottom: 10px;
  }

  .title-box {
    margin-right: 10px;
    font-size: 20px;
    font-weight: 500;
    writing-mode: vertical-lr; /*从左向右 从右向左是 writing-mode: vertical-rl;*/
    writing-mode: tb-lr; /*IE浏览器的从左向右 从右向左是 writing-mode: tb-rl；*/
  }
}
.flex-box {
  display: flex;
  align-items: center;
}
</style>
