<template>
  <div>
    <h1> Add </h1>
    <el-button type="primary" @click="setCallBackFn">主要按钮</el-button>
  </div>
</template>

<script>
export default {
  name: 'Add',
  model: {
    prop: 'addName',
    event: 'setCallBack'
  },
  props: {
    spack: {
      type: String,
      default: () => ''
    },
    addName: {
      type: String,
      default: () => ''
    }
  },
  mounted() {
    console.log(this.spack, 'spack')
    console.log(this.addName, 'addName')
  },
  methods: {
    setCallBackFn() {
      this.$emit('setCallBack', 'shiliangL - nice')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
