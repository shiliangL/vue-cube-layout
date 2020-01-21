
<template>
  <div class="RightContainer">
    <el-tabs
      v-model="activeName"
    >
      <el-tab-pane
        label="基础信息"
        name="basicInfo"
      />
      <el-tab-pane
        label="人员"
        name="people"
      />
      <el-tab-pane
        label="车辆"
        name="car"
      />
      <el-tab-pane
        label="中转站"
        name="transfer"
      />
      <el-tab-pane
        label="压缩箱"
        name="caseBox"
      />
      <el-tab-pane
        label="垃圾桶"
        name="trashBox"
      />
      <el-tab-pane
        label="垃圾收集点"
        name="garbagePoint"
      />
      <el-tab-pane
        label="垃圾源头"
        name="garbageSource"
      />
    </el-tabs>
    <!-- 动态切换 -->
    <div class="component-box">
      <component
        :is="componentFile"
        :props-data="propsData"
      />
    </div>
  </div>

</template>

<script>

export default {
  name: 'RightContainer',
  data() {
    return {
      propsData: {},
      activeName: 'basicInfo'
    }
  },
  watch: {
    activeName: {
      immediate: true,
      deep: true,
      handler() {
        // 为了方便require 到 src 下 //需要注意这里的绝对路径
        this.componentFile = resolve => { require([`../../../views/basicInforMation/segmentInformation/tabPage/${this.activeName}`], resolve) }
      }
    }
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
.RightContainer {
  padding: 0 10px;
  border: 1px solid #dfe6ec;
}
/deep/.el-tabs {
  .el-tabs__item {
    height: 50px;
    line-height: 50px;
  }
}
</style>
