<template>
  <div>
    <CubeTableRender
      ref="CubeTableRender"
      :config="config"
      :url="url"
      :method="method"
    />
  </div>
</template>

<script>

import renderTable from '@/mixProps/renderTable'
export default {
  name: 'People',
  mixins: [renderTable],
  data() {
    return {
      method: 'GET',
      url: '/car/listCarCurrentStatus',
      config: {
        search: {
          data: [
            [
              { type: 'input', value: null, key: 'codeOrName', placeholder: '压缩箱编号', class: 'w160' },
              { type: 'option', value: null, key: 'userNature', placeholder: '收集点类型', options: [
                { label: '企业A', value: 0 },
                { label: '企业B', value: 1 }]
              },
              { type: 'search', name: '查询', icon: 'el-icon-search' }
              // { type: 'reset', name: '重置' }
            ],
            [
              { type: 'button', name: '调入', keyType: 'primary', icon: 'el-icon-upload2' },
              { type: 'button', name: '调出', keyType: 'danger', icon: 'el-icon-close' },
              { type: 'button', name: '导出', keyType: 'primary', icon: 'el-icon-upload2' }
            ]
          ]
        },
        table: {
          tableHeight: 250,
          calcTableHeight: true, // 是否开启表格自动高度计算
          columns: [
            {
              label: '序号', // 表格表头名字
              type: 'selection' // type 一般不需要 仅仅  selection 、 index
            },
            {
              label: '序号', // 表格表头名字
              type: 'index' // type 一般不需要 仅仅  selection 、 index
            },
            {
              label: '垃圾源头名称',
              key: 'no'
            },
            {
              label: '源头类型',
              key: 'clientKey'
            },
            {
              label: '所属办事处',
              key: 'onguardType',
              render: (h, parmas) => {
                const typeMap = {
                  0: '不在岗',
                  1: '在岗'
                }
                const { row } = parmas
                return <span> {typeMap[row.onguardType]} </span>
              }
            },
            {
              label: '地址',
              key: 'clientKey'
            }
          ]
        }
      }
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

