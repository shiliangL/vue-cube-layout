<template>
  <div class="SearchTree">
    <div class="search">
      <el-input v-model.trim="codeOrname" size="small" style="width:160px;margin-bottom:10px" />
      <el-button type="primary" size="small" @click="clickSearch"> 搜索 </el-button>
      <el-button style="margin:0px" size="small" @click="reset"> 重置 </el-button>
    </div>
    <div class="tree">
      <div>
        <el-tree
          ref="tree"
          accordion
          :default-expand-all="defaultExpandAll"
          :highlight-current="true"
          :data="treeData"
          :filter-node-method="filterNode"
          :props="defaultProps"
          node-key="id"
          :default-expanded-keys="unfoldedArr"
          @node-click="clickLoadDetails"
          @check-change="currentChange"
        >
          <!-- <span class="custom-tree-node" slot-scope="{ node, data }">
              <span>{{ node.label }}</span>
              <span>
                <el-button type="text" size="mini" @click="() => append(data)"> 添加 </el-button>
                <el-button type="text" size="mini" @click="() => editor(data)"> 编辑 </el-button>
                <el-button type="text" size="mini" @click="() => remove(node, data)"> 删除 </el-button>
              </span>
            </span> -->
        </el-tree>
      </div>
    </div>
  </div>
</template>

<script>
// import { ScrollBar } from '@/components'
export default {
  name: 'SearchTree',
  components: {
    // ScrollBar
  },
  props: {
    treeData: {
      type: Array,
      default: () => [{
        'value': 2,
        'label': '智慧清扫管理系统',
        'parentId': 0,
        'level': 0,
        'sortCode': 0,
        'children': [{
          'value': 2012,
          'label': '项目管理',
          'parentId': 2,
          'level': 1,
          'sortCode': 1,
          'children': [{
            'value': 2015,
            'label': '项目信息',
            'parentId': 2012,
            'level': 2,
            'sortCode': 0,
            'children': [{
              'value': 2016,
              'label': '在营项目',
              'parentId': 2015,
              'level': 3,
              'sortCode': 0,
              'children': []
            }, {
              'value': 2017,
              'label': '机会项目',
              'parentId': 2015,
              'level': 3,
              'sortCode': 0,
              'children': []
            }, { 'value': 2018, 'label': '历史项目', 'parentId': 2015, 'level': 3, 'sortCode': 0, 'children': [] }]
          }, {
            'value': 2019,
            'label': '人员管理',
            'parentId': 2012,
            'level': 2,
            'sortCode': 0,
            'children': [{
              'value': 2020,
              'label': '人员列表',
              'parentId': 2019,
              'level': 3,
              'sortCode': 0,
              'children': []
            }, {
              'value': 2021,
              'label': '入职审批',
              'parentId': 2019,
              'level': 3,
              'sortCode': 0,
              'children': []
            }, {
              'value': 2022,
              'label': '五险一金',
              'parentId': 2019,
              'level': 3,
              'sortCode': 0,
              'children': []
            }, { 'value': 2023, 'label': '离职审批', 'parentId': 2019, 'level': 3, 'sortCode': 0, 'children': [] }]
          }]
        }]
      }]
    },
    defaultExpandAll: {
      type: Boolean,
      default: () => true
    }
  },
  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      unfoldedArr: [],
      codeOrname: null
    }
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    clickLoadDetails(data) {
      console.log(data)
      this.$emit('clickTreeRow', data)
    },
    currentChange(a, b, c) {
      console.log(a, b, c)
    },
    clickSearch() {
      const { codeOrname } = this
      this.$refs['tree'].filter(codeOrname)
    },
    reset() {
      this.codeOrname = null
      this.$refs['tree'].filter(null)
    }
  }
}
</script>

<style scoped lang="scss">
.SearchTree {
  min-width: 310px;
  width: 310px;
  padding: 10px;
  border-radius: 2px;
  // box-shadow: 0 2px 5px 0 rgba(0,0,0,.3);
  border: 1px solid #d1dbe5;
  .scroll-container {
    background-color: #fff;
  }
  .tree {
    background: #fff;
    height: 400px;
    overflow: auto;
  }
  .custom-tree-node {
    font-size: 14px;
    flex: 1;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    -ms-flex-pack: justify;
    justify-content: space-between;
    padding-right: 10px;
  }
}
</style>
