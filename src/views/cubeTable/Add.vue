<template>
  <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
    <el-form-item label="活动名称" prop="name">
      {{ ruleForm.name }}
      <CubeSelect
        ref="CubeSelect"
        v-model="ruleForm.name"
        :config="selectConfig || {} "
      />

    </el-form-item>
    <el-form-item label="活动区域" prop="region">
      {{ ruleForm.region }}
      <CubeSelectTree
        ref="selectTree"
        v-model="ruleForm.region"
        :config="selectTreeConfig || {} "
      />
    </el-form-item>

    <el-form-item label="级联选择" prop="desc">
      <CubeCascader v-model="ruleForm.desc" />
    </el-form-item>

    <el-form-item label="活动形式" prop="desc">
      <el-input v-model="ruleForm.desc" type="textarea" />
    </el-form-item>
    <el-form-item label="活动形式" prop="desc">
      <el-input v-model="ruleForm.desc" type="textarea" />
    </el-form-item>
    <el-form-item label="活动形式" prop="desc">
      <el-input v-model="ruleForm.desc" type="textarea" />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      selectConfig: {
        keyName: 'name',
        keyCode: 'sectionId',
        url: '/section/search',
        searchName: 'sectionName',
        focusOnload: true, // 仅仅加载一次
        inputWidth: '100%',
        placeholder: '请选择标段2',
        column: [
          { key: 'name', label: '名称' },
          { key: 'code', label: '编码' }
        ]
      },
      selectTreeConfig: {
        keyName: 'label',
        keyCode: 'value',
        url: '/map/getSectionTree',
        focusOnload: false, // 仅仅加载一次
        inputWidth: '100%',
        placeholder: '请选择标段1',
        treeDefaultProps: {
          children: 'children',
          label: 'label'
        }
      },
      ruleForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'change', type: 'object' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change', type: 'object' }
        ]
      }
    }
  },
  mounted() {

  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
