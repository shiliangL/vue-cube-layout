/**
* Created by wangjianpeng on 2019/08/12
* 3.0分页查询组件
*/

<template>
  <el-table-column
    v-if="$scopedSlots.default"
    :width="colWidth"
    :label="label"
    :prop="prop"
    :sortable="sortable"
    :label-class-name="sortKey"
    :type="type"
    :align="align"
    :selectable="selectable"
    show-overflow-tooltip
  >
    <template slot-scope="scope">
      <slot :scope="scope" />
    </template>
  </el-table-column>

  <el-table-column
    v-else
    :formatter="initFormatter"
    :width="colWidth"
    :label="label"
    :prop="prop"
    :sortable="sortable"
    :label-class-name="sortKey"
    :type="type"
    :align="align"
    :selectable="selectable"
    show-overflow-tooltip
  />
</template>

<script>
export default {
  name: 'PccTableColumn',
  props: {
    type: {
      type: String,
      default: ''
    },
    align: {
      type: String,
      default: 'left'
    },
    label: {
      type: String,
      default: ''
    },
    prop: {
      type: String,
      default: ''
    },
    sortKey: {
      type: String,
      default: ''
    },
    width: {
      type: [Number, String],
      default: ''
    },
    formatter: {
      type: Function,
      default: function() {
        return false
      }
    },
    selectable: {
      type: Function,
      default: function() {

      }
    },
    dateFormat: {
      type: Boolean,
      default: false
    },
    timeFormat: {
      type: Boolean,
      default: false
    },
    provinceFormat: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      sortable: false,
      colWidth: ''
    }
  },
  computed: {},
  watch: {},
  created() {
    this.initSort()
    this.initWidth()
  },
  mounted() {
  },
  methods: {
    initSort() {
      if (this.sortKey) {
        this.sortable = 'custom'
      }
    },
    initWidth() {
      let width = ''
      if (this.width === '') {
        const label = this.label.length
        const sort = this.sortKey !== '' ? 1 : 0
        width = this.$pccUtil.fontSize(label, sort)
      } else {
        width = this.width
      }
      if (this.dateFormat) {
        const dateWidth = this.$pccUtil.fontSize(5)
        width = dateWidth > width ? dateWidth : width
      }
      if (this.timeFormat) {
        const dateWidth = this.$pccUtil.fontSize(10)
        width = dateWidth > width ? dateWidth : width
      }
      this.colWidth = width
    },
    initFormatter(row, column, cellValue, index) {
      // if (this.dateFormat) {
      //   return this.$dateUtil.formatTimeDd(row, column, cellValue, index)
      // }
      // if (this.timeFormat) {
      //   return this.$dateUtil.formatTimeSs(row, column, cellValue, index)
      // }
      // if (this.provinceFormat) {
      //   return this.$pccUtil.formatProvince(row, column, cellValue, index)
      // }

      const result = this.formatter(row, column, cellValue, index)
      return result === false ? cellValue : result
    }
  }
}
</script>
