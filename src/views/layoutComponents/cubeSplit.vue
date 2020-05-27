<template>
  <div class="grid-content-right">
    <el-card class="box-card  box-card-top">
      <div class="parking-list">
        <el-row :gutter="10">
          <el-col
            v-for="(item,index) in parkingList"
            :key="index"
            :xs="12"
            :sm="12"
            :md="12"
            :lg="8"
            :xl="8"
          >
            <el-card
              shadow="never"
              class="parking-item"
            >
              <div
                slot="header"
                class="clearfix-flex-box"
              >
                <div>
                  {{ item.name }}号泊位
                </div>
                <div>

                  <el-button
                    class="fadeBtn"
                    size="mini"
                    type="danger"
                  >请更换容器</el-button>
                </div>
              </div>

              <div class="flex-box-car">
                <div class="flex-box">
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

                <div class="flex-box car-state">
                  <div class="car-status">
                    <div class="car-status-img">
                      <img
                        v-if="item.status"
                        class="car-status-img-tag"
                        width="40"
                        height="60"
                        :src="hasCar"
                        alt=""
                      >
                      <img
                        v-else
                        class="car-status-img-tag"
                        width="40"
                        height="60"
                        :src="noCar"
                        alt=""
                      >
                    </div>
                    <div class="car-status-desc">
                      <template v-if="item.status">
                        <div>
                          <p> 车牌号</p>
                          <p> 川A 385A9</p>
                          <p> 垃圾量</p>
                          <p> 11.62 KG</p>
                        </div>
                      </template>
                      <template v-else>
                        <div>
                          暂无泊车
                        </div>
                      </template>
                    </div>
                  </div>
                  <div class="parking-desc">
                    <el-button
                      size="mini"
                      plain
                      :type="item.status ? 'primary':'info'"
                    >正在运行</el-button>
                    <el-button
                      size="mini"
                      plain
                      :type="item.status ? 'success':'info'"
                    >暂停泊位</el-button>
                    <el-button
                      size="mini"
                      plain
                      :type="item.status ? 'success':'info'"
                    >更换容器</el-button>
                    <el-button
                      size="mini"
                      plain
                      :type="item.status ? 'danger':'info'"
                    >强制离场</el-button>
                    <el-button
                      size="mini"
                      plain
                      :type="item.status ? 'danger':'info'"
                    >强制更换</el-button>
                  </div>
                </div>
              </div>

            </el-card>
          </el-col>
        </el-row>
      </div>
    </el-card>

    <div class="foot-bar-flex">
      <div class="btn-box">
        <div
          v-for="(item,index) in currentActiveList"
          :key="index"
          :class="currentActive===index?'active':''"
          class="btn-div"
          @click.stop="currentActive=index"
        > {{ item }} </div>
      </div>
      <div class="scroll-box">
        <el-row :gutter="6">
          <el-col :span="12">
            <el-card class="box-card">
              <div
                slot="header"
                class="clearfix-flex-box"
              >
                <span>车辆报警信息</span>
              </div>
              <div class="main-box-table">
                <ul
                  v-infinite-scroll="load"
                  class="infinite-list"
                >
                  <li
                    v-for="(i,index) in count"
                    :key="i"
                    class="infinite-list-item"
                  >
                    <div class="infinite-index"> {{ index+1 }} </div>
                    <el-row>
                      <el-col :span="8">
                        <div class="grid-content"> 川A 385A9 </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="grid-content"> 10.32 KG </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="grid-content"> 称重记录时间：10:25 </div>
                      </el-col>
                    </el-row>
                  </li>
                </ul>
              </div>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card class="box-card">
              <div
                slot="header"
                class="clearfix-flex-box"
              >
                <span>待停泊车辆</span>
              </div>
              <div class="main-box-table">
                <ul
                  v-infinite-scroll="load"
                  class="infinite-list"
                >
                  <li
                    v-for="(i,index) in count"
                    :key="i"
                    class="infinite-list-item"
                  >
                    <div class="infinite-index"> {{ index+1 }} </div>
                    <el-row>
                      <el-col :span="5">
                        <div class="grid-content"> 川A 365A9 </div>
                      </el-col>
                      <el-col :span="5">
                        <div class="grid-content"> 10.32 KG </div>
                      </el-col>
                      <el-col :span="14">
                        <div class="grid-content"> 到站时间：10:25，已到站1小时50分钟 </div>
                      </el-col>
                    </el-row>
                    <div class="infinite-btn">
                      <el-button
                        size="mini"
                        type="primary"
                      >指定泊位</el-button>
                    </div>
                  </li>
                </ul>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>

  </div>
</template>

<script>

import BatteryTage from './batteryTage'
import hasCar from './hasCar.png'
import noCar from './noCar.png'

export default {
  components: {
    BatteryTage
  },
  data() {
    return {
      hasCar,
      noCar,
      currentActive: 0,
      count: 0,
      tableData: [],
      currentActiveList: ['自动放行', '停止放行'],
      parkingList: [
        { name: '一', percentage: 23, e: 30, d: 15, g: 5, t: 64, status: 1 },
        { name: '二', percentage: 52, e: 30, d: 15, g: 5, t: 64, status: 0 },
        { name: '三', percentage: 42, e: 30, d: 15, g: 5, t: 64, status: 1 },
        { name: '四', percentage: 72, e: 30, d: 15, g: 5, t: 64, status: 0 },
        { name: '五', percentage: 82, e: 30, d: 15, g: 5, t: 64, status: 1 },
        { name: '六', percentage: 62, e: 30, d: 15, g: 5, t: 64, status: 0 }
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
  },
  methods: {
    load() {
      this.count += 2
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
  .title {
    color: #909399;
    font-size: 13px;
  }
  .number {
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

.flex-box-car {
  display: flex;
  align-items: center;
  > div {
    flex: 1;
  }
  .parking-desc {
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .el-button {
    margin-left: 0px;
  }
}
.car-state {
  margin-left: 20px;
}
.clearfix-flex-box {
  display: flex;
  justify-content: space-between;
}

.car-status {
  width: 90px;
  height: 150px;
  border: 1px dashed #bdbcbc;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  font-size: 12px;
  .car-status-img {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    .car-status-img-tag {
      width: 40px;
    }
  }
  .car-status-desc {
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    p {
      padding: 0;
      margin: 0;
    }
  }
}

.foot-bar-flex {
  display: flex;
  .btn-box {
    margin-right: 10px;
    display: flex;
    flex-direction: column;
  }
  .btn-div {
    cursor: pointer;
    flex: 1;
    width: 60px;
    background: #dfdfdf;
    border-radius: 6px;
    writing-mode: vertical-lr;
    writing-mode: tb-lr;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.32s;
    margin: 10px 0;
    box-shadow: 0 0 4px rgba(37, 47, 55, 0.12);
    &.active {
      background: #2f96f9;
      color: #ffffff;
    }
  }
  .scroll-box {
    width: 100%;
  }
}

.fadeBtn {
  animation: fade 2s infinite;
  padding: 4px 15px;
}

@keyframes fade {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.infinite-list {
  height: 350px;
  overflow: auto;
  padding: 0;
  margin: 0;
  list-style: none;
  .infinite-list-item {
    display: flex;
    align-items: center;
    height: 40px;
    background: #f7f7f7;
    margin-bottom: 10px;
    margin-left: 10px;
    margin-right: 10px;
    .infinite-index {
      margin: 0 10px;
      width: 26px;
      height: 26px;
      line-height: 26px;
      border-radius: 50%;
      text-align: center;
      background: #ffffff;
    }
    .el-row {
      width: 100%;
    }
  }
}
</style>
