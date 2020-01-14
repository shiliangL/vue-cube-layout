
<template>
  <div class="permissions">
    <!-- permissions页面 -->
    <el-button type="primary" @click="handleChange">测试弹窗</el-button>

    <CubeSelectTree />

    <el-dialog
      v-loading="true"
      destroy-on-close
      title="弹窗名字"
      append-to-body
      :visible.sync="dialogVisible"
      width="30%"
    >
      <CubeAsyncComs
        v-if="dialogVisible"
        ref="CubeAsyncComs"
        :visible.sync="dialogVisible"
        :file-path="path"
        shiliangl="shiliangl"
      />
      <div slot="footer" class="dialog-footer" style="text-align: center;">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleClick">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import CubeAsyncComs from '@/components/CubeAsyncComs'
import CubeSelectTree from '@/components/CubeSelectTree'

export default {
  name: 'Permissions',
  components: {
    CubeAsyncComs,
    CubeSelectTree
  },
  data() {
    return {
      pathType: false,
      dialogVisible: false,
      path: `views/example/testBcom`
    }
  },
  methods: {
    handleChange() {
      this.dialogVisible = true
      this.pathType = !this.pathType
      // this.path = !this.pathType
      //   ? `views/example/testBcom`
      //   : `views/example/testAcom`
    },
    handleClick() {
      const dialogFrom = this.$refs['CubeAsyncComs'].getCurrentComponent()
      dialogFrom && dialogFrom.clickSaveOrUpdate()
    }
  }
}
</script>
