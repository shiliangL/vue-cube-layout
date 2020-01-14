<template>
  <component
    :is="componentFile"
    v-if="componentFile"
    ref="CubeAsyncComs"
    v-bind="$attrs"
    v-on="$listeners"
  />
</template>

<script>

export default {
  name: 'CubeAsyncComs',
  inheritAttrs: true,
  props: {
    visible: {
      type: Boolean,
      default: () => false
    },
    filePath: {
      type: String,
      required: true,
      default: () => ''
    }
  },
  computed: {
    CubeAsyncComs() {
      return this.$refs['CubeAsyncComs']
    }
  },
  watch: {
    filePath: {
      immediate: true,
      deep: true,
      handler() {
        this.componentFile = resolve => { require([`../../${this.filePath}`], resolve) }// 懒加载
      }
    }
  },
  methods: {
    // 获取到当前渲染组件内容
    // 很多场景需要直接获取组件内部属性方法
    getCurrentComponent() {
      return this.CubeAsyncComs
    }
  }
}
</script>
