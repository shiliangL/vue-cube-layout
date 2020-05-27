<template>
  <div>
    <CubeTableList :config="config" @expandChange="expandChange">
      <template slot="expand">
        <CubeTableList :config="config2" :extra-param="extraParam" @expandChange="expandChange2">
          <template slot="expand">
            <CubeTableList :config="config3" :extra-param="extraParam3" />
          </template>
        </CubeTableList>
      </template>
    </CubeTableList>
  </div>
</template>

<script>

import dayjs from 'dayjs'

const year = dayjs().get('year')
const month = dayjs().get('month')
const day = dayjs().get('date')
const beginDate = dayjs(new Date(year, month, 1)).format('YYYY-MM-DD')
const endDate = dayjs(new Date(year, month, day)).format('YYYY-MM-DD')
const defaultTimeValue = [beginDate, endDate]

export default {
  name: 'ExpandTablePage',
  data() {
    return {
      type: 1,
      extraParam: {
        sectionId: '', beginDate: '', endDate: ''
      },
      extraParam3: {
        sectionId: '', beginDate: '', endDate: ''
      },
      config: {
        url: 'http://221.10.126.230:5002/alarmPersonAttendanceList/getAlarmSimilarTracePersonGpsList',
        search: {
          data: [
            [
              {
                type: 'option', value: null, key: 'sectionId', placeholder: '请选择标段', class: 'w180', options: []
              },
              { type: 'multiple-date', value: [], initValue: defaultTimeValue, key1: 'beginDate', key2: 'endDate', placeholder1: '开始日期', placeholder2: '结束日期' },
              { type: 'search', name: '查询' },
              { type: 'reset', name: '重置' }
            ],
            [
              { type: 'button', icon: 'el-icon-folder-opened', name: '导出' }
            ]
          ]
        },
        table: {
          tableExpand: true,
          tableHeight: 400,
          calcTableHeight: true,
          columns: [
            {
              label: '展开',
              type: 'expand'
            },
            {
              label: '序号',
              type: 'index'
            },
            {
              label: '所属标段',
              key: 'sectionName'
            },
            {
              label: '所属公司',
              key: 'companyName'
            },
            {
              label: '主管单位',
              key: 'manageDeptName'
            },
            {
              label: '报警次数',
              key: 'alarmCount'
            },
            {
              label: '报警总人次',
              key: 'alarmPerson'
            }
          ]
        }
      },
      config2: {
        url: 'http://221.10.126.230:5002/alarmPersonAttendanceList/getAlarmSimilarTracePersonGpsDayList',
        search: {
          data: []
        },
        table: {
          calcTableHeight: true,
          columns: [
            {
              label: '展开',
              type: 'expand'
            },

            {
              label: '日期',
              key: 'workDate'
            },
            {
              label: '报警次数',
              key: 'alarmCount'
            },
            {
              label: '报警人员数',
              key: 'alarmPersonCount',
              render: (h, parmas) => {
                const { row } = parmas
                return (
                  <a class='linkText' onClick={(e) => {
                    e.stopPropagation()
                  }}> {row.alarmPersonCount} </a>)
              }
            },
            {
              label: '报警总人次', // 表格表头名字
              key: 'alarmPerson' // 数据映射key
            }
          ]
        }
      },
      config3: {
        url: 'http://221.10.126.230:5002/alarmPersonAttendanceList/getAlarmSimilarTracePersonGpsDayLsList',
        search: {
          data: []
        },
        table: {
          tableHeight: 150,
          tableExpand: false,
          calcTableHeight: false,
          columns: [
            {
              label: '通轨迹设备数量',
              key: 'similarCount'
            },
            {
              label: '通轨迹人员',
              key: 'similarPerson'
            },
            {
              label: '累计时长',
              key: 'totalTime'
            },
            {
              label: '操作',
              render: (h, parmas) => {
                return (
                  <a class='linkText' onClick={(e) => {
                    e.stopPropagation()
                  }}> 查看详情 </a>)
              }
            }
          ]
        }
      }
    }
  },
  methods: {
    expandChange(row, expandedRows) {
      if (expandedRows.length) {
        this.extraParam.sectionId = row.sectionId
        this.extraParam.beginDate = row.beginDate
        this.extraParam.endDate = row.endDate
      } else {
        this.extraParam.sectionId = ''
        this.extraParam.beginDate = ''
        this.extraParam.endDate = ''
      }
    },
    expandChange2(row, expandedRows) {
      if (expandedRows.length) {
        this.extraParam3.sectionId = row.sectionId
        this.extraParam3.beginDate = row.workDate
        this.extraParam3.endDate = row.workDate
      } else {
        this.extraParam3.sectionId = ''
        this.extraParam3.beginDate = ''
        this.extraParam3.endDate = ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
