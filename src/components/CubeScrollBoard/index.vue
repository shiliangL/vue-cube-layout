<template>
  <div :ref="ref" class="dv-scroll-board">
    <div v-if="header.length && mergedConfig" class="header" :style="`background-color: ${mergedConfig.headerBGC};`">
      <div
        v-for="(headerItem, i) in header"
        :key="headerItem + i"
        class="header-item"
        :style="`
          height: ${mergedConfig.headerHeight}px;
          line-height: ${mergedConfig.headerHeight}px;
          width: ${widths[i]}px;
        `"
        :align="aligns[i]"
        v-html="headerItem"
      />
    </div>

    <div
      v-if="mergedConfig"
      class="rows"
      :style="`height: ${height - (header.length ? mergedConfig.headerHeight : 0)}px;`"
    >
      <div
        v-for="(row, ri) in rows"
        :key="row.toString() + row.scroll"
        class="row-item"
        :style="`
          height: ${heights[ri]}px;
          line-height: ${heights[ri]}px;
          background-color: ${mergedConfig[row.rowIndex % 2 === 0 ? 'evenRowBGC' : 'oddRowBGC']};
        `"
      >
        <!-- 自定义行 -->
        <template v-if="customLineRow">
          <div class="ceil">
            <slot name="row" :itemRow="row.ceils"> 自定义行 </slot>
          </div>
        </template>
        <!-- 非定义行 -->
        <template v-else>
          <div
            v-for="(ceil, ci) in row.ceils"
            :key="ceil + ri + ci"
            class="ceil"
            :style="`width: ${widths[ci]}px;`"
            :align="aligns[ci]"
            @click="emitEvent(ri, ci, row, ceil)"
            v-html="ceil"
          />
        </template>

      </div>
    </div>
  </div>
</template>

<script>

import autoResize from '@/mixProps/autoResize'
import { deepMerge, deepClone } from '@/utils'

export default {
  name: 'CubeScrollBoard',
  mixins: [autoResize],
  props: {
    config: {
      type: Object,
      default: () => ({})
    },
    customLineRow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      ref: 'CubeScrollBoard',
      defaultConfig: {
        /**
         * @description Board header
         * @type {Array<String>}
         * @default header = []
         * @example header = ['column1', 'column2', 'column3']
         */
        header: [],
        /**
         * @description Board data
         * @type {Array<Array>}
         * @default data = []
         */
        data: [],
        /**
         * @description Row num
         * @type {Number}
         * @default rowNum = 5
         */
        rowNum: 5,
        /**
         * @description Header background color
         * @type {String}
         * @default headerBGC = '#00BAFF'
         */
        headerBGC: '#00BAFF',
        /**
         * @description Odd row background color
         * @type {String}
         * @default oddRowBGC = '#003B51'
         */
        oddRowBGC: '#003B51',
        /**
         * @description Even row background color
         * @type {String}
         * @default evenRowBGC = '#003B51'
         */
        evenRowBGC: '#0A2732',
        /**
         * @description Scroll wait time
         * @type {Number}
         * @default waitTime = 2000
         */
        waitTime: 2000,
        /**
         * @description Header height
         * @type {Number}
         * @default headerHeight = 35
         */
        headerHeight: 35,
        /**
         * @description Column width
         * @type {Array<Number>}
         * @default columnWidth = []
         */
        columnWidth: [],
        /**
         * @description Column align
         * @type {Array<String>}
         * @default align = []
         * @example align = ['left', 'center', 'right']
         */
        align: [],
        /**
         * @description Show index
         * @type {Boolean}
         * @default index = false
         */
        index: false,
        /**
         * @description Carousel type
         * @type {String}
         * @default carousel = 'single'
         * @example carousel = 'single' | 'page'
         */
        carousel: 'single'
      },

      mergedConfig: null,

      header: [],

      rowsData: [],

      rows: [],

      widths: [],

      heights: [],

      avgHeight: 0,

      aligns: [],

      animationIndex: 0,

      animationHandler: '',

      updater: 0
    }
  },
  watch: {
    config: {
      handler() {
        const { stopAnimation, calcData } = this
        stopAnimation()
        calcData()
      },
      deep: true
    }
  },
  destroyed() {
    const { stopAnimation } = this

    stopAnimation()
  },
  methods: {
    afterAutoResizeMixinInit() {
      const { calcData } = this

      calcData()
    },
    onResize() {
      const { mergedConfig, calcWidths, calcHeights } = this

      if (!mergedConfig) return

      calcWidths()

      calcHeights()
    },
    // 计算处理数据
    calcData() {
      const { mergeConfig, calcHeaderData, calcRowsData } = this

      mergeConfig()

      calcHeaderData()

      calcRowsData()

      // eslint-disable-next-line no-unused-vars
      const { calcWidths, calcHeights, calcAligns } = this

      calcWidths()

      calcHeights()

      calcAligns()

      const { animation } = this

      animation(true)
    },
    mergeConfig() {
      const { config, defaultConfig } = this

      this.mergedConfig = deepMerge(deepClone(defaultConfig, true), config || {})
      console.log(this.mergedConfig)
    },
    calcHeaderData() {
      // eslint-disable-next-line prefer-const
      let { header, index } = this.mergedConfig
      if (!header.length) {
        this.header = []
        return
      }
      header = [...header]
      if (index) header.unshift('序号')
      this.header = header
    },
    // 处理row数据
    calcRowsData() {
      // eslint-disable-next-line prefer-const
      let { data, rowNum } = this.mergedConfig

      data = data.map((ceils, i) => ({ ceils, rowIndex: i }))

      const rowLength = data.length

      if (rowLength > rowNum && rowLength < 2 * rowNum) {
        data = [...data, ...data]
      }

      data = data.map((d, i) => ({ ...d, scroll: i }))

      this.rowsData = data
      this.rows = data
    },
    calcWidths() {
      const { width, mergedConfig, rowsData } = this

      const { columnWidth, header } = mergedConfig

      const usedWidth = columnWidth.reduce((all, w) => all + w, 0)

      let columnNum = 0
      if (rowsData[0]) {
        columnNum = rowsData[0].ceils.length
      } else if (header.length) {
        columnNum = header.length
      }

      const avgWidth = (width - usedWidth) / (columnNum - columnWidth.length)

      const widths = new Array(columnNum).fill(avgWidth)

      this.widths = deepMerge(widths, columnWidth)
    },
    calcHeights(onresize = false) {
      const { height, mergedConfig, header } = this

      const { headerHeight, rowNum, data } = mergedConfig

      let allHeight = height

      if (header.length) allHeight -= headerHeight

      const avgHeight = allHeight / rowNum

      this.avgHeight = avgHeight

      if (!onresize) this.heights = new Array(data.length).fill(avgHeight)
    },
    calcAligns() {
      const { header, mergedConfig } = this

      const columnNum = header.length

      const aligns = new Array(columnNum).fill('left')

      const { align } = mergedConfig

      this.aligns = deepMerge(aligns, align)
    },
    async animation(start = false) {
      // eslint-disable-next-line prefer-const
      let { avgHeight, animationIndex, mergedConfig, rowsData, animation, updater } = this

      const { waitTime, carousel, rowNum } = mergedConfig

      const rowLength = rowsData.length

      if (rowNum >= rowLength) return

      if (start) {
        await new Promise(resolve => setTimeout(resolve, waitTime))
        if (updater !== this.updater) return
      }

      const animationNum = carousel === 'single' ? 1 : rowNum

      const rows = rowsData.slice(animationIndex)
      rows.push(...rowsData.slice(0, animationIndex))

      this.rows = rows
      this.heights = new Array(rowLength).fill(avgHeight)

      await new Promise(resolve => setTimeout(resolve, 300))
      if (updater !== this.updater) return

      this.heights.splice(0, animationNum, ...new Array(animationNum).fill(0))

      animationIndex += animationNum

      const back = animationIndex - rowLength
      if (back >= 0) animationIndex = back

      this.animationIndex = animationIndex
      this.animationHandler = setTimeout(animation, waitTime - 300)
    },
    stopAnimation() {
      const { animationHandler, updater } = this

      this.updater = (updater + 1) % 999999

      if (!animationHandler) return

      clearTimeout(animationHandler)
    },
    emitEvent(ri, ci, row, ceil) {
      const { ceils, rowIndex } = row
      this.$emit('click', {
        row: ceils,
        ceil,
        rowIndex,
        columnIndex: ci
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dv-scroll-board {
  position: relative;
  width: 100%;
  height: 100%;
  color: #fff;
}
.dv-scroll-board .text {
  padding: 0 10px;
  box-sizing: border-box;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.dv-scroll-board .header {
  display: flex;
  flex-direction: row;
  font-size: 15px;
}
.dv-scroll-board .header .header-item {
  padding: 0 10px;
  box-sizing: border-box;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: all 0.3s;
}
.dv-scroll-board .rows {
  overflow: hidden;
}
.dv-scroll-board .rows .row-item {
  display: flex;
  font-size: 14px;
  transition: all 0.3s;
}
.dv-scroll-board .rows .ceil {
  padding: 0 10px;
  box-sizing: border-box;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
}
.dv-scroll-board .rows .index {
  border-radius: 3px;
  padding: 0px 3px;
}

</style>
