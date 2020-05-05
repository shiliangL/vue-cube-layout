<template>
  <div>
    <el-row>
      <cube-button>默认按钮</cube-button>
      <cube-button type="primary">主要按钮</cube-button>
      <cube-button type="success">成功按钮</cube-button>
      <cube-button type="info">信息按钮</cube-button>
      <cube-button type="warning">警告按钮</cube-button>
      <cube-button type="danger">危险按钮</cube-button>
    </el-row>

    <el-row>
      <cube-button plain>朴素按钮</cube-button>
      <cube-button type="primary" plain>主要按钮</cube-button>
      <cube-button type="success" plain>成功按钮</cube-button>
      <cube-button type="info" plain>信息按钮</cube-button>
      <cube-button type="warning" plain>警告按钮</cube-button>
      <cube-button type="danger" plain>危险按钮</cube-button>
    </el-row>

    <el-row>
      <cube-button round>圆角按钮</cube-button>
      <cube-button type="primary" round>主要按钮</cube-button>
      <cube-button type="success" round>成功按钮</cube-button>
      <cube-button type="info" round>信息按钮</cube-button>
      <cube-button type="warning" round>警告按钮</cube-button>
      <cube-button type="danger" round>危险按钮</cube-button>
    </el-row>

    <el-row>
      <cube-button icon="el-icon-search" circle />
      <cube-button type="primary" icon="el-icon-edit" circle />
      <cube-button type="success" icon="el-icon-check" circle />
      <cube-button type="info" icon="el-icon-message" circle />
      <cube-button type="warning" icon="el-icon-star-off" circle />
      <cube-button type="danger" icon="el-icon-delete" circle />
    </el-row>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>

</style>
