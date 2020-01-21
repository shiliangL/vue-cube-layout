<template>
  <div>
    <SearchBar
      ref="SearchBar"
      :data="searchBarData"
    />
    <table-contain :height.sync="table.maxHeight">
      <el-table
        slot="table"
        border
        :data="table.data"
        :size="table.size"
        :height="table.maxHeight-22"
        style="width: 100%;"
      >
        <el-table-column
          label="序号"
          width="50"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="code"
          label="标段编号"
          align="center"
        />
        <el-table-column
          prop="name"
          label="标段名称"
          align="center"
        />
        <el-table-column
          prop="userNature"
          label="标段路段"
          align="center"
        >
          <template slot-scope="scope">
            <span> {{ scope.row.userNature == 0 ? '后台用户' : '终端用户' }} </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="status"
          label="标段负责人"
          align="center"
        >
          <template slot-scope="scope">
            <el-tag
              v-if="scope.row.status == 0"
              size="mini"
              type="danger"
            >无效</el-tag>
            <el-tag
              v-else
              size="mini"
            >有效</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="承包公司"
          align="center"
        />
        <el-table-column
          label="操作"
          align="center"
          width="150"
        >
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="handlerClick(1,scope.$index, scope.row)"
            >编辑</el-button>
            <el-button
              type="primary"
              size="mini"
              @click="handlerClick(2,scope.$index, scope.row)"
            >授权</el-button>
            <el-button
              type="danger"
              size="mini"
              @click="handlerClick(3,scope.$index, scope.row)"
            >删除</el-button>
            <el-button
              v-if="scope.row.status == 0"
              type="success"
              size="mini"
              @click="handlerClick(4, scope.$index, scope.row)"
            >启用</el-button>
            <el-button
              v-if="scope.row.status == 1"
              type="danger"
              size="mini"
              @click="handlerClick(5, scope.$index, scope.row)"
            >禁用</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- :page-sizes="pagination.pageSizes" -->
      <el-pagination
        slot="footer"
        background
        :current-page="pagination.page"
        :page-size="pagination.size"
        layout="total, prev, pager, next"
        :total="pagination.total"
        @current-change="handleCurrentChange"
      />
    </table-contain>
  </div>
</template>

<script>

import listMix from '@/mixProps/listMix'
export default {
  name: 'People',
  mixins: [listMix],
  data() {
    return {
      searchBarData: [
        [
          { type: 'input', value: null, key: 'codeOrName', placeholder: '标段编号、标段名称', class: 'w160' },
          { type: 'option', value: null, key: 'userNature', placeholder: '请选择企业', options: [
            { label: '企业A', value: 0 },
            { label: '企业B', value: 1 }]
          },
          { type: 'search', name: '查询', icon: 'el-icon-search' }
          // { type: 'reset', name: '重置' }
        ],
        [
          { type: 'button', name: '添加', keyType: 'success' },
          { type: 'button', name: '删除', keyType: 'danger', icon: 'el-icon-close' },
          { type: 'button', name: '导出', keyType: 'primary', icon: 'el-icon-upload2' },
          { type: 'button', name: '导入', keyType: 'primary', icon: 'el-icon-download' }
        ]
      ]
    }
  },
  mounted() {
    console.log('People')
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event, 'sb')
    },
    fetchTableData() {
      if (this.$refs['SearchBar']) {
        // 触发组件搜索回调参数请求接口
        this.$refs['SearchBar'].sendSearchParams()
      }
    },
    searchAction(params) {
      console.log(params, '触发搜索。回调参数')
      // 如下为请求方式。请求成功设置 table 数据 以及分页
      // const { index, size } = this.pagination
      // const data = {
      //   index,
      //   size,
      //   ...params
      // }
      // fetchList(data).then(({ data }) => {
      //   if (Array.isArray(data.rows)) {
      //     this.table.data = data.rows
      //   }
      //   this.pagination.total = data.total
      // }).catch(e => {
      //   this.$message({ type: 'error', message: e.msg })
      // })
    },
    reset(params) {
      console.log(params, '重置。回调参数')
    },
    showAdd() {
      console.log('添加')
      this.dialogVisible = true
    },
    clickTreeRow(item) {
      console.log(item, '点击树回调参数')
    },
    handleCurrentChange(value) {
      // 点击分页请求对应的分页数据
      this.pagination.index = value
      this.fetchTableData()
    },
    handlerClick(type, index, item) {
      console.log(type, index, item)
    },
    close() {
      // 关闭弹层刷新列表数据
      this.dialogVisible = false
      this.fetchTableData()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

