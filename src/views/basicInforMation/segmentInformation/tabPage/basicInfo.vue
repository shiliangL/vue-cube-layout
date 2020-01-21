<template>
  <table-contain :height.sync="maxHeight">
    <div
      slot="table"
      class="tableBox"
      :style="{height:boxHeight }"
    >
      <el-row :gutter="10">
        <el-col
          :xs="24"
          :sm="24"
          :md="12"
          :lg="12"
        >
          <div class="form-item-row">
            <div class="form-item-row-label"> 标段名称: </div>
            <div class="form-item-row-text"> 龙吉顺黄贝标段  |  清扫保洁 </div>
          </div>
        </el-col>
        <el-col
          :xs="24"
          :sm="24"
          :md="12"
          :lg="12"
        >
          <div class="form-item-row">
            <div class="form-item-row-label"> 标段编号: </div>
            <div class="form-item-row-text"> ZZHKG201901180013 </div>
          </div>
        </el-col>
        <el-col
          :xs="24"
          :sm="24"
          :md="12"
          :lg="12"
        >
          <div class="form-item-row">
            <div class="form-item-row-label"> 承包路段: </div>
            <div class="form-item-row-text"> 劳动路  |  劳动路西至七一路南 </div>
          </div>
        </el-col>
        <el-col
          :xs="24"
          :sm="24"
          :md="12"
          :lg="12"
        >
          <div class="form-item-row">
            <div class="form-item-row-label"> 养护面积: </div>
            <div class="form-item-row-text"> 2.5 万平方米 </div>
          </div>
        </el-col>
        <el-col
          :xs="24"
          :sm="24"
          :md="12"
          :lg="12"
        >
          <div class="form-item-row">
            <div class="form-item-row-label"> 承包公司: </div>
            <div class="form-item-row-text"> 郑州天蓝地绿实业发展有限公司 </div>
          </div>
        </el-col>
        <el-col
          :xs="24"
          :sm="24"
          :md="12"
          :lg="12"
        >
          <div class="form-item-row">
            <div class="form-item-row-label"> 养护项目组: </div>
            <div class="form-item-row-text"> 郑州天蓝地绿实业发展有限公司地绿项目组 </div>
          </div>
        </el-col>
        <el-col
          :xs="24"
          :sm="24"
          :md="12"
          :lg="12"
        >
          <div class="form-item-row">
            <div class="form-item-row-label"> 监管单位: </div>
            <div class="form-item-row-text"> 龙王办事处 </div>
          </div>
        </el-col>
      </el-row>

      <div class="block">
        <el-image src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg">
          <div slot="placeholder" class="image-slot">
            加载中<span class="dot">...</span>
          </div>
        </el-image>
      </div>
    </div>
    <div slot="footer" />
  </table-contain>
</template>

<script>

import { TableContain } from '@/components'
export default {
  name: 'BasicInfo',
  components: {
    TableContain
  },
  data() {
    return {
      maxHeight: 0
    }
  },
  computed: {
    boxHeight() {
      const { maxHeight } = this
      return maxHeight ? maxHeight - 22 + 'px' : null
    }
  },
  mounted() {
    console.log('xx')
  }
}
</script>

<style lang="scss" scoped>
.tableBox {
  overflow-x: hidden;
  overflow-y: auto;
}

.form-item-row-label{
  width: 120px;
}
</style>
