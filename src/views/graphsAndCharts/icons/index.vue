<template>
  <div class="icons-container">
    <el-tabs type="border-card">
      <el-tab-pane label="Icons-svg">
        <div class="grid">
          <div
            v-for="item of svgIcons"
            :key="item"
            @click="handleClipboard(generateIconCode(item),$event)"
          >
            <el-tooltip placement="top">
              <div slot="content">
                {{ generateIconCode(item) }}
              </div>
              <div class="icon-item">
                <svg-icon
                  :icon-class="item"
                  class-name="disabled"
                />
                <div class="name">{{ item }}</div>
              </div>
            </el-tooltip>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Element-UI Icons">
        <div class="grid">
          <div
            v-for="item of elementIcons"
            :key="item"
            @click="handleClipboard(generateElementIconCode(item),$event)"
          >
            <el-tooltip placement="top">
              <div slot="content">
                {{ generateElementIconCode(item) }}
              </div>
              <div class="icon-item">
                <i :class="'el-icon-' + item" />
                <div class="name">{{ item }}</div>
              </div>
            </el-tooltip>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Topevery Icons">
        <div class="grid">
          <div
            v-for="(item,index) of topIcons.glyphs"
            :key="index"
            @click="handleClipboard(topEverygenerateIconCode(item.font_class),$event)"
          >
            <el-tooltip placement="top">
              <div slot="content">
                {{ topEverygenerateIconCode(item.font_class) }}
              </div>
              <div class="icon-item">
                <i :class="'iconfont icon' + item.font_class" />
                <div class="name">{{ item.name }}</div>
              </div>
            </el-tooltip>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Topevery symbol">
        <div class="grid">
          <div
            v-for="(item,index) of topIcons.glyphs"
            :key="index"
            @click="handleClipboard(topEverygenerateIconCode(item.font_class),$event)"
          >
            <el-tooltip placement="top">
              <div slot="content">
                {{ topEverygenerateIconCode(item.font_class) }}
              </div>
              <div class="icon-item">

                <svg
                  class="svg-icon"
                  aria-hidden="true"
                >
                  <use :xlink:href=" `#icon${item.font_class}` " />
                </svg>
                <div class="name">{{ item.name }}</div>
              </div>
            </el-tooltip>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>

import topIcons from '@/styles/icons/iconfont.json'
import clipboard from '@/utils/clipboard'
import svgIcons from './svg-icons'
import elementIcons from './element-icons'

export default {
  name: 'Icons',
  data() {
    return {
      topIcons,
      svgIcons,
      elementIcons
    }
  },
  methods: {
    topEverygenerateIconCode(symbol) {
      return `<i class="iconfont icon${symbol}" />`
    },
    generateIconCode(symbol) {
      return `<svg-icon icon-class="${symbol}" />`
    },
    generateElementIconCode(symbol) {
      return `<i class="el-icon-${symbol}" />`
    },
    handleClipboard(text, event) {
      clipboard(text, event)
    }
  }
}
</script>

<style lang="scss" scoped>
.icons-container {
  margin: 10px 20px 0;
  overflow: hidden;

  .grid {
    position: relative;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  }

  .icon-item {
    margin: 20px;
    height: 85px;
    text-align: center;
    width: 100px;
    float: left;
    font-size: 30px;
    color: #24292e;
    cursor: pointer;
    .iconfont {
      font-size: 30px;
    }
    .name{
      padding-top: 10px;
      font-size: 12px;
    }
  }

  span {
    display: block;
    font-size: 16px;
    margin-top: 10px;
    word-break: break-all;
  }

  .disabled {
    pointer-events: none;
  }
}
</style>
