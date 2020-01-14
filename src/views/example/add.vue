<template>
  <div class="form">
    <el-form
      ref="form"
      :model="form"
      class="form"
      :rules="rules"
      style="padding-left: 60px;"
    >
      <el-form-item
        label="机构类型编码:"
        label-width="120px"
        prop="code"
        :rules="rules.input"
      >
        <el-input
          v-model.trim="form.code"
          size="small"
          style="width:180px"
          :disabled="propsData.type === 'isUpdate'"
          placeholder="请输入"
          maxlength="11"
        />
      </el-form-item>
      <el-form-item
        label="机构类型名称:"
        label-width="120px"
        prop="title"
        :rules="rules.input"
      >
        <el-input
          v-model.trim="form.title"
          size="small"
          style="width:180px"
          placeholder="请输入"
          maxlength="11"
        />
      </el-form-item>
      <el-form-item label="机构类型简称:" label-width="120px">
        <el-input
          v-model.trim="form.shortTitle"
          size="small"
          style="width:180px"
          placeholder="请输入"
          maxlength="11"
        />
      </el-form-item>
      <el-form-item label="备注信息:" label-width="120px">
        <el-input
          v-model.trim="form.remark"
          size="small"
          :autosize="{ minRows: 2, maxRows: 4 }"
          style="width:180px"
          type="textarea"
          placeholder="不能超30位数"
          maxlength="30"
        />
      </el-form-item>
    </el-form>
    <div class="footer" style="text-align: center;">
      <el-button size="small" @click.stop="close">取 消</el-button>
      <el-button
        :loading="saveLoading"
        size="small"
        type="primary"
        @click.stop="clickSaveOrUpdate('form')"
      >
        确定
      </el-button>
    </div>
  </div>
</template>

<script>
// 引用公共规则校验
import rules from '@/mixProps/rules.js'

export default {
  mixins: [rules],
  props: {
    // 接收父组件传递属性
    propsData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      saveLoading: false,
      form: {
        title: null,
        code: null,
        shortTitle: null,
        orgLogoFileId: null,
        remark: null
      }
    }
  },
  mounted() {
    // 判断是更新还是新增
    if (this.propsData.isUpdate) {
      this.fetchDetail()
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    fetchDetail() {
      if (!this.propsData.data.id) return
      // 获取详情
      // fetchDetail({ id: this.propsData.data.id }).then(({ data }) => {
      //   this.form = Object.assign(this.form, data)
      // }).catch(e => {
      //   this.$message({ type: 'error', message: e.msg })
      // })
    },
    clickSaveOrUpdate(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$refs[formName].validate(valid => {
            if (valid) {
              this.saveLoading = true
              if (this.propsData.isUpdate) {
                const data = JSON.parse(JSON.stringify(this.form))
                delete data.code
                // 编辑更新
                // updateRow(data).then(res => {
                //   this.saveLoading = false
                //   this.$emit('add')
                //   this.close()
                //   this.$message({ type: 'success', message: `${res.msg}!` })
                // }).catch(e => {
                //   this.saveLoading = false
                //   this.$message({ type: 'error', message: e.msg })
                // })
              } else {
                // const data = JSON.parse(JSON.stringify(this.form))
                // 新增
                // createRow(data).then(res => {
                //   this.saveLoading = false
                //   this.$emit('add')
                //   this.close()
                //   this.$message({ type: 'success', message: `${res.msg}!` })
                // }).catch(e => {
                //   this.saveLoading = false
                //   this.$message({ type: 'error', message: e.msg })
                // })
              }
            } else {
              this.$message({ type: 'warning', message: '请核实表单' })
              return
            }
          })
        } else {
          this.$message({ type: 'warning', message: '请核实表单' })
          return
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
