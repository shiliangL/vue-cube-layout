<template>
  <grid-layout
    :layout.sync="layout"
    :col-num="12"
    :row-height="30"
    :is-draggable="true"
    :is-resizable="true"
    :vertical-compact="true"
    :use-css-transforms="true"
  >
    <grid-item
      v-for="item in layout"
      :key="item.i"
      :x="item.x"
      :y="item.y"
      :w="item.w"
      :h="item.h"
      :i="item.i"
      :static="item.static"
      :auto-size="item.autoSize"
    >
      <el-card
        class="visualize-card"
        body-style="padding: 10px;"
      >
        <div
          slot="header"
          class="operation-bar"
        >
          <div>
            <span> 测试 </span>
          </div>
          <div>
            <i class="el-icon-edit" />
            <i class="el-icon-delete" />
          </div>
        </div>
        <div>
          现代 JavaScript 开发在过去几年中经历了迅猛的变迁，并且这种变化的势头毫无停滞的预兆。
          对于很多前端开发者而言可能还不是很熟悉那些 JS 博客或者文档中提及的时兴的概念。
        </div>
      </el-card>
    </grid-item>
  </grid-layout>
</template>

<script>

import { GridLayout, GridItem } from 'vue-grid-layout'

export default {
  name: 'CubeLayout',
  components: {
    GridLayout,
    GridItem
  },
  data() {
    return {
      layout: [
        { 'x': 0, 'y': 0, 'w': 2, 'h': 5, 'i': '0', static: false },
        { 'x': 2, 'y': 0, 'w': 2, 'h': 5, 'i': '1', static: false },
        { 'x': 4, 'y': 0, 'w': 2, 'h': 5, 'i': '2', static: false },
        { 'x': 6, 'y': 0, 'w': 2, 'h': 5, 'i': '3', static: false },
        { 'x': 8, 'y': 0, 'w': 2, 'h': 5, 'i': '4', static: false }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.visualize-card {
  height: 100%;
  display: flex;
  flex-direction: column;
  /deep/ .el-card__header {
    padding: 0;
    .operation-bar {
      font-size: 14px;
      display: flex;
      justify-content: space-between;
      height: 35px;
      padding: 0 10px;
      line-height: 35px;
      z-index: 9;
      i {
        margin-right: 10px;
        color: #409eff;
        cursor: pointer;
      }
    }
  }
  /deep/.el-card__body {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
  }
}
</style>
