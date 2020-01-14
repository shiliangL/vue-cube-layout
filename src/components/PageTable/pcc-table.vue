/**
* Created by wangjianpeng on 2019/08/12
* 3.0分页查询组件
*/

<template>
  <div class="list-area-css">
    <div class="list-top-btn">
      <slot name="header" />
    </div>
    <div class="list-table-css">
      <el-table
        ref="table"
        v-loading="tableLoading"
        :data="data"
        :border="true"
        stripe
        @sort-change="sortTable"
        @select="(selection, row)=>$emit('select',selection, row)"
        @select-all="(selection)=>$emit('select-all',selection)"
      >
        <el-table-column :width="this.$pccUtil.numSize()" :index="indexMethod" label=" " type="index" align="center" />
        <slot />
      </el-table>
    </div>
    <el-pagination
      v-if="paginationStatus"
      :current-page.sync="page"
      :page-sizes="selectPageSizes"
      :page-size="pageSize"
      :total="total"
      :layout="$globalConf.paginationLayout"
      background
      @size-change="handleSizeChange"
    />
  </div>
</template>

<script>

export default {
  name: 'PccTable',
  components: {},
  props: {
    url: {// 发送的请求
      type: String,
      default: ''
    },
    param: {// 请求携带的参数
      type: Object,
      default() {
        return {}
      }
    },
    type: {// 如果是3.2规范的需要填'new' 其他可不填
      type: String,
      default: 'old'
    }
  },
  data() {
    return {
      data: [], // 列表数据
      tableLoading: false, // 表格加载中状态
      pageSize: 10, // 每页展示行数
      page: 1, // 当前页码
      total: 0, // 总条数
      sortName: '', // 排序字段
      order: 'desc', // 降序升序
      paginationStatus: false, // 分页状态
      selectPageSizes: [10, 20, 30, 40, 50],
      searchParam: {}
    }
  },
  computed: {},
  watch: {
    page() {
      this.searchPage()
    }
  },
  created() {},
  mounted() {
    this.storeParam()
    this.searchPage()
  },
  methods: {
    storeParam() {
      for (const key in this.param) {
        this.searchParam[key] = this.param[key]
      }
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.search()
    },
    searchPage() {
      const param = {
        page: this.page,
        rows: this.pageSize,
        sortName: this.sortName,
        order: this.order
      }

      const newParam = Object.assign({}, this.param)
      for (const key in newParam) {
        if (newParam[key]) {
          newParam[key] = newParam[key].toString().trim()
        }
      }

      if (this.type === 'old') {
        param.params = newParam
      } else {
        Object.assign(param, newParam)
      }

      this.tableLoading = true
      this.$post(this.$globalConf.pccPathPrefix + this.url, param).then((response) => {
        if (this.$reponseStatus(response)) {
          this.total = parseInt(response.records)
          this.data = (response.hasOwnProperty('rows') ? response.rows : response.data) || []
          this.paginationStatus = this.data.length > 0
        }
        this.tableLoading = false
      })
    },
    sortTable(column) {
      if (column.column && column.column.labelClassName && column.column.order) {
        this.order = column.column.order ? column.column.order.replace('ending', '') : ''
        this.sortName = column.column.labelClassName
      } else {
        this.order = ''
        this.sortName = ''
      }
      this.search()
    },
    indexMethod(index) {
      return (index + this.pageSize * (this.page - 1) + 1)
    },
    // 对外提供查询列表操作
    search() {
      if (this.page === 1) {
        this.searchPage()
      } else {
        this.page = 1
      }
    },
    // 对外提供清空操作
    reset() {
      for (const key in this.searchParam) {
        this.param[key] = this.searchParam[key]
      }
      this.search()
    }
  }
}
</script>
