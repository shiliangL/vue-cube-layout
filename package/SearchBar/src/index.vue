<template>
  <div
    id="SearchBar"
    class="search-bar"
  >
    <template v-if="data && data.length">
      <!-- 左边组件类型 -->
      <template v-if="data && data[0] && data[0].length">
        <div
          v-for="(item, index) in data[0]"
          :key="index"
          class="left"
        >
          <template v-if="item.type === 'date'">
            <el-date-picker
              v-model="item.value"
              :style="{width:'134px'}"
              :size="size"
              value-format="yyyy-MM-dd"
              :picker-options="dateTimePicker(item.minDate,item.maxDate)"
              type="date"
              :placeholder="item.placeholder"
            />
          </template>
          <!-- 特别的组件 -->
          <template v-if="item.type === 'cubeSelectTree'">
            <CubeSelectTree
              ref="selectTree"
              v-model="item.value"
              :config="item.config || {} "
            />
          </template>
          <template v-if="item.type === 'cubeSelect'">
            <CubeSelect
              ref="CubeSelect"
              v-model="item.value"
              :config="item.config || {} "
            />
          </template>
          <template v-if="item.type === 'date-year'">
            <el-date-picker
              v-model="item.value"
              :style="{width:'134px'}"
              :size="size"
              value-format="yyyy"
              type="year"
              :placeholder="item.placeholder"
            />
          </template>
          <template v-if="item.type === 'date-month'">
            <el-date-picker
              v-model="item.value"
              :style="{width:'134px'}"
              :size="size"
              value-format="yyyy-MM"
              type="month"
              :placeholder="item.placeholder"
            />
          </template>
          <template v-else-if="item.type === 'option'">
            <el-select
              v-model="item.value"
              :class="item.class?item.class:'w90'"
              :size="size"
              clearable
              filterable
              :placeholder="item.placeholder"
              :multiple="item.multiple"
              collapse-tags
              @change="item.change ?item.change($event): null"
            >
              <el-option
                v-for="sub in item.options"
                :key="sub.value"
                :label="sub.label"
                :value="sub.value"
                :class="item.class"
              />
            </el-select>
          </template>
          <!-- cascader 级联 -->
          <template v-else-if="item.type === 'cascader'">
            <el-cascader
              v-model="item.value"
              :size="size"
              :placeholder="item.placeholder"
              :class="item.class?item.class:'w180'"
              :options="item.options"
              :props="{checkStrictly: true,emitPath:false,expandTrigger:'hover'}"
              clearable
              filterable
            />
          </template>
          <template v-else-if="item.type === 'input'">
            <el-input
              v-model="item.value"
              :class="item.class ? item.class :'w180' "
              :size="size"
              clearable
              :placeholder="item.placeholder"
              @keyup.enter.native="search"
            />
          </template>
          <template v-if="item.type === 'multiple-date'">
            <el-date-picker
              v-model="item.value"
              :class="item.class?item.class:'w300'"
              value-format="yyyy-MM-dd"
              type="daterange"
              :size="size"
              range-separator="至"
              :start-placeholder="item.placeholder1"
              :end-placeholder="item.placeholder2"
            />
          </template>
          <template v-if="item.type === 'multiple-date-time'">
            <el-date-picker
              v-model="item.value"
              :class="item.class?item.class:'w320'"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="datetimerange"
              :size="size"
              range-separator="至"
              :start-placeholder="item.placeholder1"
              :end-placeholder="item.placeholder2"
            />
          </template>
          <template v-else-if="item.type === 'search'">
            <el-button
              type="primary"
              icon="el-icon-search"
              :size="size"
              @click="search"
            >{{ item.name }}</el-button>
          </template>
          <template v-else-if="item.type === 'reset'">
            <el-button
              type="primary"
              plain
              icon="el-icon-refresh"
              :size="size"
              @click="clickReset"
            >{{ item.name }}</el-button>
          </template>
        </div>
      </template>
      <!-- 右边操作区域 -->
      <template v-if="data && data[1] && data[1].length">
        <div class="right">
          <div
            v-for="(item, index) in data[1]"
            :key="index"
            class="left"
          >
            <template v-if="item.type === 'add'">
              <el-button
                :size="size"
                type="success"
                icon="el-icon-plus"
                @click.stop="item.action ? item.action() :clickAdd(item)"
              >{{ item.name ? item.name : '新增' }}</el-button>
            </template>

            <template v-if="item.type === 'del'">
              <el-button
                :size="size"
                type="danger"
                icon="el-icon-delete"
                @click.stop="item.action ? item.action() :clickDel(item)"
              >删除</el-button>
            </template>

            <template v-if="item.type === 'button'">
              <el-button
                :plain="true"
                :size="size"
                :icon="item.icon"
                :type="item.btType"
                @click="item.click ? item.click($event) : null"
                @click.stop="item.action ? item.action() :clickBtn(item)"
              >{{ item.name }}</el-button>
            </template>

            <template v-else-if="item.type === 'more'">
              <el-dropdown
                trigger="click"
                @command="command"
              >
                <el-button
                  type="primary"
                  :size="size"
                  plain
                >{{ item.name || '更多操作' }}<i class="el-icon-arrow-down el-icon--right" /></el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    v-for="(itemK,i) in item.labels"
                    :key="i"
                    :icon="itemK.icon"
                    :command="itemK.label"
                    @click.native="itemK.action ? itemK.action() : null"
                  >{{ itemK.label }}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </div>
        </div>
      </template>
    </template>
  </div>
</template>

<script>

//  常量类型
const commonlyTypes = ['input', 'select', 'option', 'cascader', 'date', 'datetime', 'date-month', 'tree']
//  特殊类型
const cubeType = ['cubeSelect', 'cubeSelectTree']

import { deepClone } from '../../utils'
import CubeSelect from '../../CubeSelect'
import CubeSelectTree from '../../CubeSelectTree'

export default {
  name: 'SearchBar',
  componentName: 'SearchBar',
  components: {
    CubeSelect,
    CubeSelectTree
  },
  props: {
    size: {
      type: String,
      default: () => 'small'
    },
    data: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
    }
  },
  created() {
    this.initParam()
  },
  methods: {
    initParam() {
      if (this.data.length > 0 && this.data[0] && this.data[0].length > 0) {
        const items = this.data[0]
        for (let i = 0; i < items.length; i++) {
          const item = items[i]
          if (item['initValue']) {
            item['value'] = item['initValue']
          }
        }
      }
    },
    clickReset() {
      if (this.data.length > 0 && this.data[0] && this.data[0].length > 0) {
        const items = this.data[0]
        for (let i = 0; i < items.length; i++) {
          const item = items[i]
          if (item['type'] === 'search') {
            break
          } else if (item['initValue']) {
            item['value'] = item['initValue']
          } else {
            item['value'] = null
          }
        }
      }
      if (this.$refs['selectTree']) {
        this.$refs['selectTree'][0].clear()
      }
      this.$emit('reset', this.getSearchParams())
    },
    search() {
      const params = this.getSearchParams()
      this.$emit('search', params)
    },
    getSearchParams() {
      // 获取选择参数
      const params = {}
      if (this.data.length > 0 && this.data[0] && this.data[0].length > 0) {
        const items = this.data[0]
        for (let i = 0; i < items.length; i++) {
          const item = items[i]
          if (commonlyTypes.indexOf(item['type']) !== -1) {
            params[item['key']] = item.multiple ? item.value.toString() : item.value
          } else if (item['type'] === 'multiple-date') {
            if (item.value != null) {
              params[item['key1']] = item.value[0] ? item.value[0] : ''
              params[item['key2']] = item.value[1] ? item.value[1] : ''
            } else {
              params[item['key1']] = null
              params[item['key2']] = null
            }
          } else if (cubeType.includes(item['type'])) {
            params[item['key']] = item.value ? item.value[item.config.keyCode] ? item.value[item.config.keyCode] : '' : ''
          } else if (item['type'] === 'search') {
            break
          }
        }
      }
      return deepClone(params)
    },
    clickAdd() {
      this.$emit('add')
    },
    clickDel() {
      this.$emit('del')
    },
    clickBtn(item) {
      this.$emit('button', item)
      this.$emit('clickBtn', item)
    },
    command(command) {
      this.$emit('command', command)
    },
    dateTimePicker(minDate, maxDate) {
      if (minDate && maxDate) {
        return {
          disabledDate: time => (time.getTime() > new Date(maxDate).getTime() || time.getTime() < new Date(minDate).getTime())
        }
      }
      if (maxDate) {
        return {
          disabledDate: time => (maxDate ? time.getTime() > new Date(maxDate).getTime() : false)
        }
      }
      if (minDate) {
        return {
          disabledDate: time => (minDate ? time.getTime() < new Date(minDate).getTime() : false)
        }
      }
      return {
        disabledDate: false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.search-bar {
  width: 100%;
  background-color: white;
  clear: both;
  margin-top: -6px;
  margin-bottom: 6px;
  padding-bottom: 6px;
  border-bottom: 1px solid #dfecf9;
  &:after {
    visibility: hidden;
    display: block;
    font-size: 0;
    content: " ";
    clear: both;
    height: 0;
  }

  .left {
    float: left;
    height: 40px;
    > div {
      margin-right: 4px;
      margin-top: 10px;
    }

    .el-button {
      margin-top: 10px;
      margin-left: 4px;
    }

    .el-range-editor--small.el-input__inner {
      padding-left: 5px;
      padding-right: 0;
      width: 226px;
    }
    .el-date-editor .el-range-separator {
      padding: 0;
      line-height: 24px;
      margin-left: 3px;
      margin-right: 5px;
    }
    .el-range-editor--small .el-range-input {
      min-width: 80px;
    }
    .el-date-editor--datetimerange {
      .el-range-input {
        min-width: 130px;
      }
    }
  }

  .right {
    float: right;
    > div {
      margin-left: 10px;
      margin-top: 5px;
    }
  }
}
</style>

