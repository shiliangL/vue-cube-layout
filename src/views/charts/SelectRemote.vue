<template>
  <div>
    <el-select
      v-model="selectValue"
      filterable
      remote
      clearable
      :placeholder="initConfig.placeholder"
      :default-first-option="initConfig.defaultFirstOption"
      :no-data-text="initConfig.noDataText"
      :no-match-text="initConfig.noMatchText"
      :remote-method="query => seachName = query"
      :loading="loading"
      :value-key="initConfig.valueKey?initConfig.valueKey:''"
      @focus="focus"
      @blur="()=> seachName =''"
      @change="change"
      @clear="clear"
    >
      <el-option
        v-for="(item,index) in optionList"
        :key="initConfig.valueKey ? item[initConfig.valueKey] : index"
        :label="item[initConfig.optionName]"
        :value="initConfig.valueKey ? item : item[initConfig.optionKey]"
      />
    </el-select>
  </div>
</template>

<script>
//  与组件控制相关的不写进对象配置中
import request from '@/utils/request'
import { debounce } from '@/utils'

export default {
  name: 'SelectRemote',
  props: {
    value: {
      type: [Object, String, Number],
      default: () => {}
    },
    // 额外关联需要参数
    extraParam: {
      type: Object,
      default: () => {}
    },
    config: {
      type: Object,
      default: () => {
        return {
          noDataText: '无数据',
          noMatchText: '无匹配数据',
          // 在输入框按下回车，选择第一个匹配项。需配合 filterable 或 remote 使用
          defaultFirstOption: true,
          placeholder: '请选择'
        }
      }
    }
  },
  data() {
    return {
      show: true,
      selectValue: '',
      seachName: '',
      loading: false,
      optionList: [],
      initConfig: {
        noDataText: '无数据',
        noMatchText: '无匹配数据',
        // 在输入框按下回车，选择第一个匹配项。需配合 filterable 或 remote 使用
        defaultFirstOption: false,
        placeholder: '输入检索选择',
        url: '/section/search',
        method: 'POST',
        seachKey: 'sectionName',
        pageIndex: 1,
        pageSize: 50,
        valueKey: '', // 必须唯一值。如果传入选择返回对象
        optionName: 'name',
        optionKey: 'sectionId'
      }
    }
  },
  watch: {
    config: {
      immediate: true,
      handler(config) {
        this.initConfig = Object.assign(this.initConfig, config || {})
      }
    },
    seachName: {
      handler(config) {
        this.debounceFech()
      }
    },
    value: {
      immediate: true,
      handler(data) {
        this.selectValue = data
        if (data) {
          this.optionList = [data]
        }
      }
    }
  },
  mounted() {
    this.debounceFech = debounce(() => {
      this.fetchData()
    }, 500)
  },
  methods: {
    focus() {
      this.debounceFech()
    },
    clear() {
      this.selectValue = ''
      this.$emit('clear')
    },
    change(item) {
      this.$emit('input', item)
      this.$emit('change', item)
    },
    fetchData() {
      console.log(' x ')
      const { seachName } = this
      const { url, method, seachKey } = this.initConfig
      if (!url) return
      this.loading = true
      const params = { [seachKey]: seachName, ...this.extraParam }
      const paramsKey = method.toUpperCase() !== 'POST' ? 'params' : 'data'
      request({ url, method: method.toUpperCase(), [paramsKey]: params }).then(({ data }) => {
        const result = data.data
        this.loading = false
        this.optionList = result.records
      })
    }
  }
}
</script>

<style scoped>

</style>

