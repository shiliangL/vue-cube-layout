<!-- 用户管理 -->

<template>
  <div class="users">

    <div class="page-inner">

      <!-- <SearchTree :tree-data="treeData" @clickTreeRow="clickTreeRow" /> -->

      <div>
        <SearchBar ref="SearchBar" :data="searchBarData" @search="searchAction" @reset="reset" @add="showAdd()" />
        <table-contain :height.sync="table.maxHeight">
          <el-table slot="table" :data="table.data" :size="table.size" :max-height="table.maxHeight" style="width: 100%;">
            <el-table-column label="序号" width="50" align="center">
              <template slot-scope="scope">
                <span>{{ scope.$index + 1 }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="code" label="用户姓名" align="center" />
            <el-table-column prop="name" label="登陆名称" align="center" />
            <el-table-column prop="userNature" label="默认部门" align="center">
              <template slot-scope="scope">
                <span> {{ scope.row.userNature == 0 ? '后台用户' : '终端用户' }} </span>
              </template>
            </el-table-column>
            <el-table-column prop="status" label="数据状态" align="center">
              <template slot-scope="scope">
                <el-tag v-if="scope.row.status == 0" size="mini" type="danger">无效</el-tag>
                <el-tag v-else size="mini">有效</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="250">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="handlerClick(1,scope.$index, scope.row)">编辑</el-button>
                <el-button type="primary" size="mini" @click="handlerClick(2,scope.$index, scope.row)">授权</el-button>
                <el-button type="danger" size="mini" @click="handlerClick(3,scope.$index, scope.row)">删除</el-button>
                <el-button v-if="scope.row.status == 0" type="success" size="mini" @click="handlerClick(4, scope.$index, scope.row)">启用</el-button>
                <el-button v-if="scope.row.status == 1" type="danger" size="mini" @click="handlerClick(5, scope.$index, scope.row)">禁用</el-button>
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

    </div>

    <el-dialog
      destroy-on-close
      title="弹窗名字"
      append-to-body
      :visible.sync="dialogVisible"
      width="30%"
    >

      <Add v-if="false" :props-data="propsData" @close="close" />

      <CubeVideo v-if="dialogVisible" />
    </el-dialog>

  </div>
</template>

<script>

// import mixProps from './mixProps'
// import { fetchDate, save, update } from './api'
import listMix from '@/mixProps/listMix'
// import { SearchTree } from '@/components'
import Add from './add.vue'
import CubeVideo from '@/components/CubeVideo'

export default {
  name: 'Users',
  components: {
    Add,
    CubeVideo
    // SearchTree
  },
  mixins: [listMix],
  data() {
    return {
      begintime: '',
      // 传递给子组件的参数
      propsData: {
        isUpdate: false, // 是否是更新
        data: '' // 传递值可以自行添加其他需要的东西
      },
      // 传递给树组件的数据
      treeData: [
        { 'value': 2,
          'label': '智慧清扫管理系统',
          'parentId': 0,
          'level': 0,
          'sortCode': 0,
          'children': []
        }
      ],
      searchBarData: [
        [
          { type: 'input', value: null, key: 'codeOrName', placeholder: '姓名', class: 'w130' },
          { type: 'input', value: null, key: 'codeOrName', placeholder: '登录名', class: 'w130' },
          { type: 'option', value: null, key: 'userNature', placeholder: '类型', options: [
            { label: '后台用户', value: 0 },
            { label: '终端用户', value: 1 }]
          },
          { type: 'search', name: '查询' },
          { type: 'reset', name: '重置' }
        ],
        [
          { type: 'add', name: '新增' }
        ]
      ]
    }
  },
  computed: {

  },
  watch: {

  },
  mounted() {
    this.fetchTableData()
    this.table.data = [
      { code: 'ASD', name: 'SHIK' },
      { code: 'ASD', name: 'SHIK' },
      { code: 'ASD', name: 'SHIK' },
      { code: 'ASD', name: 'SHIK' },
      { code: 'ASD', name: 'SHIK' },
      { code: 'ASD', name: 'SHIK' },
      { code: 'ASD', name: 'SHIK' },
      { code: 'ASD', name: 'SHIK' },
      { code: 'ASD', name: 'SHIK' },
      { code: 'ASD', name: 'SHIK' },
      { code: 'ASD', name: 'SHIK' },
      { code: 'ASD', name: 'SHIK' },
      { code: 'ASD', name: 'SHIK' },
      { code: 'ASD', name: 'SHIK' },
      { code: 'ASD', name: 'SHIK' },
      { code: 'ASD', name: 'SHIK' },
      { code: 'ASD', name: 'SHIK' },
      { code: 'ASD', name: 'SHIK' }
    ]
  },
  beforeDestroy() {

  },
  methods: {
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
