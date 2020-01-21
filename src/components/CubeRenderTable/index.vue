
<template>
  <div class="CubeRenderTable">
    <el-table
      slot="table"
      :ref="name"
      class="table-list"
      style="width: 100%;"
      :data="tableData"
      :height="initConfig.table.calcTableHeight ? maxHeight - 16 : initConfig.table.tableHeight "
      highlight-current-row
      element-loading-text="数据加载中..."
      @row-click="clickTableRow"
      @select="selectRow"
      @select-all="selectRow"
    >
      <template v-for="(column, index) in initConfig.table.columns">
        <!-- 处理特殊Type selection 、 index  、 expand 特殊项 -->
        <template v-if="column.type">
          <template v-if="column.type==='expand'">
            <el-table-column
              v-if="column.type"
              :key="index"
              :align="column.align ? column.align : 'center' "
              :label="column.type === 'index' ? column.label : '' "
              :type="column.type"
              :fixed="column.fixed"
              :width="column.width ? column.width : null "
            >
              <template v-if="column.type==='expand'" slot-scope="scope">
                <template v-if="column.type==='expand'">
                  <slot :item="scope.row" name="expand" />
                </template>
              </template>
            </el-table-column>
          </template>
          <template v-else>
            <el-table-column
              v-if="column.type"
              :key="index"
              :align="column.align ? column.align : 'center' "
              :label="column.type === 'index' ? column.label : '' "
              :type="column.type"
              :fixed="column.fixed"
              :width="column.width ? column.width : null "
            />
          </template>
        </template>
        <template v-else>
          <el-table-column
            :key="index"
            :align="column.align ? column.align : 'center' "
            :label="column.label"
            :prop="column.key"
            :width="column.width"
            :fixed="column.fixed"
            tooltip-effec="light"
            :show-overflow-tooltip="!column.tooltip"
            v-bind="column.attributes"
          >
            <template slot-scope="scope">
              <template v-if="!column.render">
                <template>
                  <span>{{ scope.row[column.key] }}</span>
                </template>
              </template>
              <template v-else>
                <render :column="column" :index="index" :render="column.render" :row="scope.row" />
              </template>
            </template>
          </el-table-column>
        </template>
      </template>
    </el-table>
  </div>
</template>

<script>

import request from '../../utils/request'
import { deepMerge, deepClone } from '../../utils'

export default {
  name: 'CubeRenderTable',
  components: {
    render: {
      functional: true,
      props: {
        row: Object,
        render: Function,
        index: Number,
        column: {
          type: Object,
          default: null
        }
      },
      render: (h, opt) => {
        const params = {
          row: opt.props.row,
          index: opt.props.index
        }
        if (opt.props.column) params.column = opt.props.column
        return opt.props.render(h, params)
      }
    }
  },
  props: {
    extraParam: {
      type: Object,
      default: () => {}
    },
    url: {
      type: String,
      required: true,
      default: () => ''
    },
    method: {
      type: String,
      default: () => 'POST'
    },
    config: {
      type: Object,
      default: () => {
      }
    }
  },
  data() {
    return {
      name: 'CubeTable',
      initConfig: {
        search: {
          data: []
        },
        table: {
          tableHeight: 250,
          calcTableHeight: true, // 是否开启表格自动高度计算
          attributes: {}, // 传递到表格的属性
          data: [],
          columns: []
        }
      },
      maxHeight: 0, // calcTableHeight 开启会自动计算
      loading: false,
      pagination: {
        pageSizes: [10, 20, 50, 100], // 默认分页可选择的每页显示的页数
        size: 10, // 分页每页默认显示10条
        currentPage: 1, // 当前默认第一页
        total: 0 // 总条数
      },
      tableData: [],
      multipleSelection: []
    }
  },
  watch: {
    config: {
      // 属性传入改变的时候合并
      immediate: true,
      deep: true,
      handler(val) {
        const { config, initConfig } = this
        this.initConfig = deepMerge(initConfig, config || {})
        // 配置合并后做请求
        this.$nextTick(() => {
          setTimeout(() => {
            this.fetchList()
          }, 20)
        })
      }
    }
  },
  methods: {
    clickTableRow(item) {
      this.$emit('clickTableRow', item)
    },
    add() {
      this.$emit('add')
    },
    del() {
      this.$emit('del')
    },
    reset() {
      this.$emit('reset')
    },
    command(command) {
      this.$emit('command', command)
    },
    fetchList() {
      if (this.$refs['SearchBar']) {
        this.$refs['SearchBar'].search()
      } else {
        this.fetchTableData()
      }
    },
    fetchTableData(searchParams = {}) {
      const { url } = this
      const { currentPage, size } = this.pagination
      const params = { pageIndex: currentPage, pageSize: size, ...searchParams, ...this.extraParam }
      this.tableData = []
      this.loading = true
      const paramsKey = this.method.toUpperCase() !== 'POST' ? 'params' : 'data'
      request({ url, method: this.method, [paramsKey]: params }).then(({ data }) => {
        this.loading = false
        if (data.success) {
          const result = data.data
          if (Array.isArray(result.records)) {
            console.log(result.total)
            this.tableData = result.records || []
            this.pagination.total = result.total || 0
          }
        }
      }).catch(e => {
        this.loading = false
        console.log(e)
      })
    },
    // 分页操作区域
    handleSizeChange(value) {
      this.pagination.size = value
      this.fetchList()
    },
    handleCurrentChange(value) {
      this.pagination.currentPage = value
      this.fetchList()
    },
    getCubeTable() {
      return this.$refs[this.name]
    },
    getTableSelection() {
      // 获取表格勾选项目
      const TableSelection = this.$refs[this.name] && this.$refs[this.name].selection || []
      return deepClone(TableSelection)
    },
    // 选中行
    selectRow(selection) {
      this.$emit('selectRow', selection)
      console.log(selection, '选中行')
    }
  }
}
</script>

<style scoped>

</style>
