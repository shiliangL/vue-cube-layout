<template>
  <div class="chart-container">

    <el-button
      type="primary"
      @click="printMe"
    >打印</el-button>

    <div
      ref="print-box"
      class="printHtml"
    >
      <div
        v-for="(k,i) in 2"
        :key="k"
        style="display: inline-block;"
      >
        <div>
          <vQrcode
            :options="{ width: 300 }"
            :value="i ? qrcodeTextRoad: qrcodeTextPian"
          />
        </div>
        <div style="font-size: 12;text-align: center;">
          宜宾区-放羊远海街道-方大大厦科技中路 - {{ i ? '道路' :'片区' }}
        </div>
      </div>
    </div>

    <chart
      v-if="false"
      height="100%"
      width="100%"
    />
  </div>
</template>

<script>

import vQrcode from '@/components/Qrcode'
import Chart from '@/components/Charts/LineMarker'

export default {
  name: 'LineChart',
  components: { Chart, vQrcode },
  data() {
    return {
      qrcodeTextPian: 'http://192.168.100.17:9018/#/pianQuInfo?id="shiliangl"',
      qrcodeTextRoad: 'http://192.168.100.17:9018/#/roadInfo?id="shiliangl"',
      list: [
        {
          'auditResult': 1,
          'carriageway': 2,
          'cleanlevel': 500159,
          'companyName': '深圳市万城美清洁有限公司',
          'count': 4,
          'createId': '00000000-0000-0000-0000-000000000000',
          'createTime': '2020-01-07T20:10:24',
          'dbStatus': 0,
          'end': '',
          'frequency': 2,
          'guardrailCarIntervalDay': 7,
          'helpStem': 0,
          'id': 220,
          'isBelt': 0,
          'length': 846.92,
          'mainStem': 2,
          'orderNum': 0,
          'qxcName': '粤BV4256',
          'sectionAreaId': 'B31DB66A-AAA4-4302-A9F1-4FE6C0A93B88',
          'sectionName': '福永清扫保洁A标万城美',
          'sidewalkCarIntervalDay': 7,
          'slcName': '粤BEB403',
          'sprayCarIntervalDay': 7,
          'start': '',
          'updateId': '00000000-0000-0000-0000-000000000000',
          'updateTime': '2020-01-07T20:10:24',
          'waterCarCount': 1,
          'waterCarFrequency': 1,
          'waterCarIntervalDay': 7,
          'workLineId': '60C89C1C-DFC4-4C89-86F7-3984BF49A42B',
          'workLineName': '兴华路（宝安大道至G107）'
        }
      ]
    }
  },
  methods: {
    printMe() {
      const printHtml = document.querySelector('.printHtml').innerHTML

      const newWindow = window.open('', 'oPop')
      const html = `
        <!DOCTYPE html>
        <html lang="zh">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta name="renderer" content="webkit">
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
            <title>二维码打印</title>
        </head>
        <body>
          ${printHtml}
        </body>
        </html> `
      newWindow.document.write(html)
      newWindow.print()
      newWindow.close()
    }
  }
}
</script>

<style scoped>
.chart-container {
  overflow: auto;
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
  font-size: 12;
  text-align: center;
}
</style>

