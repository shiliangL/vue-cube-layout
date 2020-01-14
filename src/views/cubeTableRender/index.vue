<template>
  <div>
    <CubeTableRender
      ref="CubeTableRender"
      :config="config"
      @add="add"
      @command="command"
    />

    <el-dialog
      fullscreen
      destroy-on-close
      title="弹窗名字"
      append-to-body
      :visible.sync="dialogVisible"
    >
      <AddText />
    </el-dialog>

  </div>
</template>

<script>

import CubeTableRender from '../../components/CubeTableRender'

import AddText from './AddText.md'

export default {
  components: {
    AddText,
    CubeTableRender
  },
  data() {
    return {
      dialogVisible: false,
      config: {
        search: {
          data: [
            [
              {
                type: 'input',
                value: null,
                key: 'personName',
                placeholder: '姓名',
                class: 'w130'
              },
              {
                type: 'input',
                value: null,
                key: 'idcard',
                placeholder: '登录名',
                class: 'w130'
              },
              {
                type: 'option',
                value: null,
                key: 'personType',
                placeholder: '类型',
                options: [
                  { label: '后台用户', value: 0 },
                  { label: '终端用户', value: 1 }
                ]
              },
              {
                type: 'option',
                value: null,
                key: 'workType',
                placeholder: '类型',
                options: [
                  { label: '后台用户', value: 0 },
                  { label: '终端用户', value: 1 }
                ]
              },
              { type: 'search', name: '查询' },
              { type: 'reset', name: '重置' }
            ],
            [
              { type: 'add', name: '新增' },
              { type: 'more', labels: [
                { icon: 'el-icon-paperclip', label: '离职' },
                { icon: 'el-icon-document-remove', label: '删除' },
                { icon: 'el-icon-folder-opened', label: '导出' }
              ]
              }
            ]
          ]
        },
        table: {
          calcTableHeight: false, // 设置false 则不自动计算高度 可以固定设置 tableHeight 具体高度
          tableHeight: 120,
          columns: [
            {
              fixed: 'left',
              label: '选择', // 表格表头名字
              type: 'selection'
            },
            {
              fixed: 'left',
              label: '序号', // 表格表头名字
              type: 'index' // type 一般不需要 仅仅  selection 、 index
            },
            {
              label: '姓名', // 表格表头名字
              key: 'personName' // 数据映射key
            },
            {
              label: '设备编号', // 表格表头名字
              key: 'deviceCode' // 数据映射key
            },
            {
              label: '性别', // 表格表头名字
              key: 'personSex', // 数据映射key
              render: (h, parmas) => {
                const { row } = parmas
                return <div> {row.personSex ? '女' : '男'} </div>
              }
            },
            {
              label: '身份证号码', // 表格表头名字
              key: 'personIdcard' // 数据映射key tooltip-effect
            },
            {
              label: '人员类型', // 表格表头名字
              key: 'personTypeDesc' // 数据映射key
            },
            {
              label: '所属企业', // 表格表头名字
              key: 'companyName' // 数据映射key
            },
            {
              label: '所属标段', // 表格表头名字
              key: 'sectionName' // 数据映射key
            },
            {
              label: '电话',
              key: 'drawNum',
              render: (h, parmas) => {
                const { row } = parmas
                return <div> {row.drawNum} </div>
              }
            },
            {
              label: '工作状态',
              key: 'drawNum',
              render: (h, parmas) => {
                const { row } = parmas
                return <div> {row.workState ? '离职' : '在职'} </div>
              }
            },
            {
              label: '照片', // 表格表头名字
              key: 'sectionName', // 数据映射key
              render: (h, parmas) => {
                const { row } = parmas
                return <div> {row.photoId ? '有' : '无'} </div>
              }
            },
            {
              label: '附件', // 表格表头名字
              key: 'sectionName', // 数据映射key
              render: (h, parmas) => {
                const { row } = parmas
                return <div> {row.hasFile ? '有' : '无'} </div>
              }
            },
            {
              width: 220,
              fixed: 'right',
              label: '操作',
              render: (h, parmas) => {
                const { row } = parmas
                const rowBtn = (
                  <div class='flex-box'>
                    <el-button
                      type='success'
                      icon='el-icon-plus'
                      size='mini'
                      title='添加'
                      onClick={() => this.handlerClick(row)}
                    />
                    <el-button
                      type='danger'
                      icon='el-icon-minus'
                      size='mini'
                      title='删除'
                      onClick={() => this.handlerClick(row)}
                    />
                    <el-button
                      icon='el-icon-edit'
                      title='修改'
                      size='mini'
                      type='primary'
                      onClick={() => this.handlerClick(row)}
                    />
                  </div>
                )

                return rowBtn
              }
            }
          ]
        }
      }
    }
  },
  methods: {
    handlerClick(row) {
      console.log(row)
    },
    command(row) {
      this.getTableSelection()
      console.log(row, 'command-list')
    },
    add(row) {
      console.log('add')
      this.dialogVisible = true
    },
    getTableSelection() {
      // 获取表格勾选项目
      const TableSelection = this.$refs['CubeTableRender'].getTableSelection()
      console.log(TableSelection)
    }
  }
}
</script>

<style lang="scss">
.flex-box {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
</style>
