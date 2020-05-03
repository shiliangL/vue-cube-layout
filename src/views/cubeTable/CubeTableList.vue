<template>
  <div>
    <CubeTableList :config="config" :extra-param="extraParam" />
  </div>
</template>

<script>
export default {
  name: 'CubeTableListPage',
  data() {
    return {
      type: 1,
      extraParam: {
        objType: 2, fenceType: 1, searchType: 2
      },
      config: {
        url: '/fenceAlarmSetting/getFenceAlarmRecordSearch',
        search: {
          data: [
            [
              {
                type: 'option', value: null, key: 'sectionId', placeholder: '请选择标段', class: 'w180', options: []
              },
              {
                type: 'cubeSelectTree',
                value: null,
                key: 'sectionId',
                config: {
                  keyName: 'label',
                  keyCode: 'value',
                  url: '/map/getSectionTree',
                  focusOnload: false, // 仅仅加载一次
                  placeholder: '请选择标段',
                  treeDefaultProps: {
                    children: 'children',
                    label: 'label'
                  }
                }
              },
              {
                type: 'multiple-date',
                value: [],
                key1: 'alarmBeginTime',
                key2: 'alarmEndTime',
                placeholder1: '开始日期',
                placeholder2: '结束日期',
                initValue: []
              },
              {
                type: 'option', value: null, key: 'alarmType', placeholder: '报警类型', class: 'w130', options: []
              },
              {
                type: 'option', value: null, key: 'alarmResult', placeholder: '报警结果', class: 'w130', options: [
                  { label: '已取消', value: 1 },
                  { label: '已确认', value: 2 }]
              },
              {
                type: 'input',
                value: null,
                key: 'objName',
                placeholder: '车牌号码',
                class: 'w130'
              },
              { type: 'search', name: '查询' },
              { type: 'reset', name: '重置' }
            ],
            [
              { type: 'button', btType: 'danger', icon: 'el-icon-delete', name: '作废' }
            ]
          ]
        },
        table: {
          tableHeight: 250,
          calcTableHeight: true, // 是否开启表格自动高度计算
          columns: [
            {
              label: '选择',
              type: 'selection'
            },
            {
              label: '序号',
              type: 'index'
            },
            {
              label: '围栏',
              key: 'fenceName'
            },
            {
              label: '标段',
              key: 'sectionName'
            },
            {
              label: '公司',
              key: 'companyName'
            },
            {
              label: '车牌号码',
              key: 'objName'
            },
            {
              label: '报警类型',
              key: 'fenceAlarmTypeName'
            },
            {
              label: '报警开始时间',
              key: 'alarmBeginTime'
            },
            {
              label: '报警结束时间',
              key: 'alarmEndTime'
            },
            {
              label: '持续时间',
              key: 'alarmTimeStr'
            },
            {
              label: '状态',
              key: 'alarmResult'
            },
            {
              label: '操作',
              key: 'drawNum',
              render: (h, parmas) => {
                const { row } = parmas
                return (
                  <div class='flex-table-cell'>
                    <div class='btn-text' onClick={() => this.handlerType(0, row)}>轨迹</div>
                    <div class='btn-text' onClick={() => this.handlerType(1, row)}>通讯</div>
                    {!row.isAppeal ? <div class='btn-text' onClick={() => this.checkProcess(row)}>流程</div> : null}
                  </div>
                )
              }
            }
          ]
        }
      }
    }
  },
  mounted() {
    setTimeout(_ => {
      this.extraParam.fenceType = 2
    }, 4000)
  }
}
</script>

<style lang="scss" scoped>

</style>
