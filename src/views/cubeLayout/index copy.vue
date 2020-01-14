<template>
  <div class="container">

    <grid-layout
      v-if="false"
      :layout.sync="layout"
      :is-draggable="true"
      :is-resizable="true"
      :is-mirrored="false"
      :vertical-compact="true"
      :use-css-transforms="true"
      :margin="[10, 10]"
      :col-num="24"
      :row-height="30"
      :pane-container="false"
    >
      <grid-item
        v-for="item in layout"
        :key="item.i"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="item.i"
      >
        <el-card class="visualize-card" body-style="padding: 10px;">
          <div slot="header" class="operation-bar">
            <div>
              <span> 测试 </span>
            </div>
            <div>
              <!-- <i v-show="mode === 'edit'" class="el-icon-edit" @click="handleEdit(getChartItem(item.i))" />
              <i v-show="mode === 'edit'" class="el-icon-delete" @click="handleDelete(getChartItem(item.i))" />
              <el-tooltip :content="getChartItem(item.i).desc" class="item" effect="dark" placement="top-end">
                <i class="el-icon-info" style="color:#409eff;cursor:pointer;" />
              </el-tooltip> -->
            </div>
          </div>
          <lineChart data="{}" />
          <!-- <visualize-panel :key="item.index" :ref="`chartInstance${item.i}`" :data="results[item.i]" :schema="getChartItem(item.i).content.allSelected" :chart-type.sync="getChartItem(item.i).content.chartType" :is-edit-mode="false" :chart-style="{height: `${item.h*30 + 10 * (item.h-1) - 60}px`}" /> -->
          <!-- <component is="lineChart" :data="chartData"  class="visualize-window" /> -->
        </el-card>
      </grid-item>
    </grid-layout>
  </div>
</template>

<script>

import db from './db'
import { GridLayout, GridItem } from 'vue-grid-layout'
import lineChart from '@/widgets/lineChart'

export default {
  name: 'CubeLayout',
  components: {
    lineChart,
    GridLayout,
    GridItem
  },
  data() {
    return {
      layout: [
        // { 'x': 0, 'y': 0, 'w': 2, 'h': 2, 'i': '0' },
        // { 'x': 2, 'y': 0, 'w': 2, 'h': 4, 'i': '1' },
        // { 'x': 4, 'y': 0, 'w': 2, 'h': 5, 'i': '2' },
        // { 'x': 6, 'y': 0, 'w': 2, 'h': 3, 'i': '3' },
        // { 'x': 8, 'y': 0, 'w': 2, 'h': 3, 'i': '4' }
      ]
    }
  },
  mounted() {
    this.layout = db.content.layout
  }
}
</script>

<style lang="scss" scoped>
.container {
  .dashboard-list {
    width: 250px;
    min-height: 100%;
    padding: 20px 10px;
    /deep/ .el-card__header {
      div {
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        color: #606266;
        i {
          cursor: pointer;
        }
      }
      padding: 5px 0px;
    }
    .dashboard-list-item {
      display: flex;
      justify-content: space-between;
      line-height: 35px;
      font-size: 14px;
      cursor: pointer;
      color: #606266;
      i {
        margin-right: 10px;
        line-height: 35px;
      }
    }
    .high-light-dashboard {
      color: #205cd8;
    }
  }
  .dashboard-wrapper {
    width: 100%;
  }
}
</style>
