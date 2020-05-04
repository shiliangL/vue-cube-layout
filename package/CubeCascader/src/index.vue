<!-- 选择组件 提供分页检索选择应数据量大列表卡顿以及分页接口数据选择 -->
<template>
  <el-cascader
    v-model="selectValue"
    v-loading="loading"
    :disabled="disabled"
    :filterable="defaultConfig.filterable"
    :clearable="defaultConfig.clearable"
    :placeholder="placeholder2"
    :size="defaultConfig.size"
    :options="defaultConfig.options"
    :props="{checkStrictly: true,emitPath:false,expandTrigger:'hover'}"
    @change="change"
  />
</template>

<script>

import request from '../../utils/request'
import { deepMerge, noEmptyChildren } from '../../utils'
import { isObject } from '../../utils/types'
import emitter from '../../mixProps/emitter'

export default {
  name: 'CubeCascader',
  directives: {
    clickOutside: {
      bind(el, binding, vnode) {
        function clickHandler(e) {
          // 这里判断点击的元素是否是本身，是本身，则返回
          if (el.contains(e.target)) {
            return false
          }
          // 判断指令中是否绑定了函数
          if (binding.expression) {
            // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
            binding.value(e)
          }
        }
        // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
        el.__vueClickOutside__ = clickHandler
        document.addEventListener('click', clickHandler)
      },
      update() { },
      unbind(el, binding) {
        // 解除事件监听
        document.removeEventListener('click', el.__vueClickOutside__)
        delete el.__vueClickOutside__
      }
    }
  },
  mixins: [emitter],
  props: {
    validateEvent: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: () => false
    },
    extraParam: {
      type: Object,
      default: () => {
        return {
          treeId: 'aed26b5a-00e8-4c87-99a5-3345582239f9'
        }
      }
    },
    config: {
      type: Object,
      default: () => { }
    },
    value: { // 编辑显示传入对象
      type: [Object, String],
      default: () => { }
    }
  },
  data() {
    return {
      placeholder2: '请选择',
      loading: false,
      selectValue: '',
      // 默认参数
      defaultConfig: {
        placeholder: '请选择',
        clearable: true,
        size: 'small',
        options: [],
        value: 'value', // 指定选项的值为选项对象的某个属性值
        label: 'label', // 指定选项标签为选项对象的某个属性值
        children: 'children', // 指定选项的子选项为选项对象的某个属性
        // 请求额外设置参数 -  网络数据加载区域
        method: 'GET',
        url: '/customDept/tree',
        focusOnload: false
      }
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(value) {
        if (value) {
          this.selectValue = value
        } else {
          this.selectValue = ''
          this.placeholder2 = this.defaultConfig.placeholder
        }
      }
    },
    config: {
      immediate: true,
      handler(configData) {
        this.defaultConfig = deepMerge(this.defaultConfig, configData || {})
        this.placeholder2 = this.defaultConfig.placeholder
      }
    },
    'config.options': {
      handler(options) {
        if (Array.isArray(options)) this.defaultConfig.options = options || []
      }
    }
  },
  mounted() {
    const { focusOnload } = this.defaultConfig
    if (!focusOnload) {
      this.fetchTableData()
    }
  },
  beforeDestroy() {
    this.selectValue = null
  },
  methods: {
    focus() {
      this.$emit('focus')
    },
    blur() {
      this.$emit('blur')
    },
    clear() {
      this.selectValue = ''
      this.placeholder2 = this.defaultConfig.placeholder
      this.$emit('input', '')
      this.$emit('change', '')
    },
    change(item) {
      this.$emit('input', item)
      this.$emit('change', item)
    },
    fetchTableData() {
      const { extraParam } = this
      const { url, method } = this.defaultConfig
      if (!url) false
      this.loading = true
      this.defaultConfig.options = []
      const params = isObject(extraParam) ? { ...extraParam } : {}
      const paramsKey = method.toUpperCase() !== 'POST' ? 'params' : 'data'
      request({ url, method: method, [paramsKey]: params }).then((data) => {
        this.loading = false
        if (data.success) {
          const result = data.data
          if (Array.isArray(result)) this.defaultConfig.options = noEmptyChildren(result) || []
        }
      }).catch(e => {
        this.loading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
