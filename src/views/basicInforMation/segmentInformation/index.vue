<!-- 标段信息管理 -->
<template>
  <split-pane
    split="vertical"
    :min-percent="20"
    :default-percent="50"
  >
    <template slot="paneL">
      <LeftContainer />
    </template>
    <template slot="paneR">
      <RightContainer />
    </template>
  </split-pane>
</template>

<script>

import splitPane from 'vue-splitpane'
import LeftContainer from './leftContainer'
import RightContainer from './rightContainer'

export default {
  components: {
    splitPane,
    LeftContainer,
    RightContainer
  },
  props: {
    propsData: {
      type: Object,
      default: () => { }
    },
    clearMap: {
      type: Boolean,
      default: true
    },
    mapType: {
      type: Array,
      default() {
        return [3]
      }
    }
  },
  data() {
    return {
      fetchLoading: false,
      saveLoading: false,
      form: {
        'id': '',
        'sectionId': '',
        'name': '',
        'code': '',
        'sectionType': 1,
        'serviceContent': null,
        'manageDeptId': '',
        'companyId': '',
        'mainManageDeptId': '',
        'teamId': '',
        'districtId': '',
        'streetId': '',
        'workState': null,
        'measure': null,
        'calculatedArea': null,
        'requirePerson': null,
        'requireCar': null,
        'conPerNum': null,
        'conCarNum': null,
        'requireManagerPerson': null,
        'requireSquadLeader': null,
        'requireOperationsPerson': null,
        'equipmentNum': null,
        'requireSweepingMachineMileage': null,
        'requireSprinklerMileage': null,
        'mechanizedWorkingLength': null,
        'requireMechanicalSweeper': null,
        'requireWateringCar': null,
        'requireWashingCar': null,
        'imgFileId': '',
        'anotherName': '',
        'address': '',
        'remark': null,
        'createId': '',
        'createTime': '',
        'updateId': '',
        'updateTime': '',
        'dbStatus': null,
        'companyName': '',
        'manageDeptName': '',
        'teamName': '',
        'mainManageDeptName': '',
        'deptContracts': null,
        'deptContractsNum': null,
        'auditResult': null,
        'statusStr': null,
        'linePoints': [],
        'polygonPoints': []
      },
      options: {
        teamTree: [],
        customDeptTree: []
      },
      rules: {},
      params: {}
    }
  },
  methods: {

  }
}
</script>

 <style scoped lang="scss">

</style>

