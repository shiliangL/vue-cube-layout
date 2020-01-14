<template>
  <div class="CubeScrollBoard">
    <CubeScrollBoard :config="config">
      <template slot="row" slot-scope="{ itemRow }">
        {{ itemRow.name }}
        {{ itemRow.label }}
      </template>
    </CubeScrollBoard>
  </div>
</template>

<script>
import CubeScrollBoard from '@/components/CubeScrollBoard'

export default {
  name: 'CubeScrollBoardDemo',
  components: {
    CubeScrollBoard
  },
  data() {
    return {
      config: {
        header: ['时间', '病害信息', '数量', '标段'],
        data: [
          // ['2019-07-01 19:25:00', '路面危害-松散', '5', 'xxxxxxx'],
          {
            'id': '45494125-0669-4880-a78e-df6a5cc0345d',
            'appId': 'db611baf-02cc-45b3-8af9-78652662c6ef',
            'name': '垃圾收集点',
            'value': '45494125-0669-4880-a78e-df6a5cc0345d',
            'label': '垃圾收集点',
            'url': 'refuseManager/facCollectPoint/list',
            'cssClass': '',
            'privilegId': null,
            'parentId': '5717a8ca-3406-4271-83ed-0bab3f632550',
            'children': []
          },
          {
            'id': '0f2ffecb-7ca6-4b64-9972-0070d8f87bc7',
            'appId': 'db611baf-02cc-45b3-8af9-78652662c6ef',
            'name': '垃圾桶管理',
            'value': '0f2ffecb-7ca6-4b64-9972-0070d8f87bc7',
            'label': '垃圾桶管理',
            'url': 'refuseManager/trash/list',
            'cssClass': null,
            'privilegId': null,
            'parentId': '5717a8ca-3406-4271-83ed-0bab3f632550',
            'children': []
          },
          {
            'id': '1a4a46c6-0e54-4d14-8a8b-ea645d00dc9d',
            'appId': 'db611baf-02cc-45b3-8af9-78652662c6ef',
            'name': '垃圾压缩箱',
            'value': '1a4a46c6-0e54-4d14-8a8b-ea645d00dc9d',
            'label': '垃圾压缩箱',
            'url': 'refuseManager/refuseBox/list',
            'cssClass': null,
            'privilegId': null,
            'parentId': '5717a8ca-3406-4271-83ed-0bab3f632550',
            'children': []
          },
          {
            'id': '1a4a46c6-0e54-4d14-8a8b-ea645d00dc9d',
            'appId': 'db611baf-02cc-45b3-8af9-78652662c6ef',
            'name': '垃圾压缩箱A',
            'value': '1a4a46c6-0e54-4d14-8a8b-ea645d00dc9d',
            'label': '垃圾压缩箱',
            'url': 'refuseManager/refuseBox/list',
            'cssClass': null,
            'privilegId': null,
            'parentId': '5717a8ca-3406-4271-83ed-0bab3f632550',
            'children': []
          }
        ],
        index: true,
        customLineRow: true,
        columnWidth: [50, 170, 90],
        align: ['center'],
        rowNum: 3,
        waitTime: 4000,
        headerBGC: '#1981f6',
        headerHeight: 45,
        oddRowBGC: 'rgba(0, 44, 81, 0.8)',
        evenRowBGC: 'rgba(10, 29, 50, 0.8)'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.CubeScrollBoard {
  height: 100%;
}
</style>
