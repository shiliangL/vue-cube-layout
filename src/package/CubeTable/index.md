## CubeTable 表格

用于展示多条结构类似的数据。

### 基础表格

基础的表格展示用法。

:::demo 当`cube-table`元素中注入`data`作为表格数据源，注入`columns`为表格指定渲染`label`属性来对表头，用`key`属性来定义渲染字段。
```html
  <template>
    <cube-Table :config="config" />
  </template>
  <script>
    export default {
      data() {
        return {
          config:{
            data:[
              { date: '2016-05-02', name: '王富贵', address: '上海市普陀区金沙江路 1517 弄' },
              {date: '2016-05-02',name: '翠花',address: '上海市普陀区金沙江路 1518 弄'}
            ],
            columns:[
              { label: '姓名', key: 'name' },
              { label: '地址',key: 'address' },
            ]
          }
        }
      }
    }
  </script>
```
:::

### render渲染表格

render表格展示用法。

:::tip 
  jsx语法需要vue项目支持
:::

:::demo `render`函数存在作为最高级别渲染。对应的`key`渲染将忽略
```html
  <template>
    <cube-Table :config="config" />
  </template>
  <script>
    export default {
      data() {
        return {
          config:{
            data:[
              {date: '2016-05-02', name: '王富贵', gender: 1},
              {date: '2016-05-02',name: '翠花',gender: 0}
            ],
            columns:[
              { label: '姓名', key: 'name' },
              { 
                label: '性别', 
                key: 'gender', // render函数存在作为最高级别渲染。对应的key渲染将忽略
                render: (h, parmas) => {
                  const { row } = parmas
                  return <span> { row.gender ? '男': '女'} </span>
                }
              },
            ]
          }
        }
      }
    }
  </script>
```
:::

 ### 数据多选表格

表格数据多选

:::demo 通过设置 `columns`数据对象中的`type`指定特殊类型。`index/selection/expand`分别对应`索引` `多选` `拓展内容`
```html
  <template>
    <cube-Table :config="config" />
  </template>
  <script>
    export default {
      data() {
        return {
          config:{
            data:[
              {date: '2016-05-02', name: '王富贵', gender: 1},
              {date: '2016-05-02',name: '翠花',gender: 0}
            ],
            columns:[
              { label: '选项',  type: 'selection'},
              { label: '序号', type: 'index' },
              { label: '姓名', key: 'name' },
              { 
                label: '性别', 
                // render函数存在作为最高级别渲染。对应的key渲染将忽略
                key: 'gender', 
                render: (h, parmas) => {
                  const { row } = parmas
                  return <span> { row.gender ? '男': '女'} </span>
                }
              },
            ]
          }
        }
      }
    }
  </script>
```
:::


 ### 固定表头

固定表头,内容滚动。查阅数据更直观,有些业务中需要根据窗口的大小获取最佳的可视高度。这个时候我们可以动态的是设置绑定`height`属性。

如果需要做滚动到底部做加载更多的操作。可以传入`loadMore`方法。滚动到底部会触发该函数

:::demo 只要在`cube-table`元素中定义了`height`属性，即可实现固定表头的表格，而不需要额外的代码。
```html
  <template>
    <cube-Table :height='300' :config="config" :loadMore="loadMore" />
  </template>
  <script>
    export default {
      data() {
        return {
          config:{
            data:[
              {date: '2016-05-02', name: '王富贵', gender: 1},
              {date: '2016-05-02',name: '翠花',gender: 0},
              {date: '2016-05-02',name: '翠花',gender: 0},
              {date: '2016-05-02',name: '翠花',gender: 0},
              {date: '2016-05-02',name: '翠花',gender: 0},
              {date: '2016-05-02',name: '翠花',gender: 0},
              {date: '2016-05-02',name: '翠花',gender: 0},
              {date: '2016-05-02',name: '翠花',gender: 0},
              {date: '2016-05-02',name: '翠花',gender: 0},
              {date: '2016-05-02',name: '翠花',gender: 0},
            ],
            columns:[
              { label: '选项',  type: 'selection'},
              { label: '序号', type: 'index' },
              { label: '姓名', key: 'name' },
              { 
                label: '性别', 
                key: 'gender', // render函数存在作为最高级别渲染。对应的key渲染将忽略
                render: (h, parmas) => {
                  const { row } = parmas
                  return <span> { row.gender ? '男': '女'} </span>
                }
              },
            ]
          }
        }
      },
      methods: {
        loadMore() {
          this.$message({ message: '滚动到底部~', type: 'success' });
        }
      }
    }
  </script>
```
:::

### 业务综合应用

实际开发过程中经常需要获取勾选数据,常规做法是通过选择的change事件去收集处理所得到的参数。cube-Table内部封装了获取勾选数据的方法。直接通过`this.$refs`外部获取。

业务增删改查的操作无非是获取到操作的数据对象,这里直接 从`render`回调出来的参数获取当前行的数据对象进行操作。

:::demo 通过设置 `columns`数据对象中的`type`指定特殊类型。`index/selection/expand`分别对应`索引` `多选` `拓展内容`
```html
  <template>
  <div>
    <el-row>
      <cube-Table :config="config" ref="cubeTable" />
    </el-row>
    <el-row>
      <el-button type="primary" @click="getSelectRowData">获取勾选数据</el-button>
    </el-row>
  </div>
  </template>

  <script>
    export default {
      data() {
        return {
          config:{
            data:[
                {
                    "name": "Dr. Ayden Bashirian",
                    "email": "Kaylin_Zieme@gmail.com",
                    "text": "rerum est nihil",
                    'results': 90
                },
                {
                    "name": "Elinore Keeling",
                    "email": "Riley_Borer94@gmail.com",
                    "text": "magnam voluptatem illo",
                    'results': 70
                },
                {
                    "name": "Esteban Luettgen",
                    "email": "Emmie_Lang@yahoo.com",
                    "text": "inventore quod dolores",
                    'results': 88
                },
                {
                    "name": "Maximo Marvin",
                    "email": "Rebekah_Kohler87@yahoo.com",
                    "text": "et velit sed",
                    'results': 30
                },
                {
                    "name": "Mrs. Roosevelt Brekke",
                    "email": "Kian19@gmail.com",
                    "text": "aliquid nobis error",
                    'results': 75
                },
                {
                    "name": "Don Schoen Jr.",
                    "email": "Buck_Aufderhar13@gmail.com",
                    "text": "exercitationem autem omnis",
                    'results': 45
                }
            ],
            columns:[
              { label: '选项',  type: 'selection'},
              { label: '序号', type: 'index' },
              { label: '姓名', key: 'name' },
              { label: '邮箱', key: 'email' },
              { 
                label: '描述', 
                key: 'text', 
                render: (h, parmas) => {
                  const { row } = parmas
                  return <span> { row.text } </span>
                }
              },
              { 
                label: '业绩', 
                key: 'text', 
                render: (h, parmas) => {
                  const { row } = parmas
                  return <span> { row.results } 万 </span>
                }
              },
              { label: '操作',
                render: (h, parmas) => {
                  const { row } = parmas
                  return (<div class="flex-box-table-row">  
                    <el-button size="mini" type="text" onClick={ ()=>this.handler('编辑') }> 编辑 </el-button>
                    <el-button size="mini" type="text" onClick={ ()=>this.handler('查看') }> 查看 </el-button>
                    <el-button size="mini" type="text" onClick={ ()=>this.handler('删除') }> 删除 </el-button>
                 </div>)
                }
              },
            ]
          }
        }
      },
       methods: {
        getSelectRowData() {
          const data = this.$refs['cubeTable'].getTableSelection()||[]
          const msg = data.length ?  JSON.stringify(data) : '无勾选数据'
          this.$alert(msg, '提示', {
            confirmButtonText: '确定',
            callback: action => {}
          });
        },
        handler(meg){
          this.$message({ duration: 3500, message: `${meg}数据`, })
        }
      }
    }
  </script>
 

```
:::



### 业务表格列表规范

实际开发过程中经常需要获取勾选数据,常规做法是通过选择的change事件去收集处理所得到的参数。cube-Table内部封装了获取勾选数据的方法。直接通过`this.$refs`外部获取。

业务增删改查的操作无非是获取到操作的数据对象,这里直接 从`render`回调出来的参数获取当前行的数据对象进行操作。

:::demo 通过设置 `columns`数据对象中的`type`指定特殊类型。`index/selection/expand`分别对应`索引` `多选` `拓展内容`
```html
  <template>
  <div>
    <el-row>
      <p class="table-tip"> 操作栏:有图标 操作项1定义宽度  <span class="code"> 80px</span> </p>
      <cube-Table :data="tableData" :columns="columns" ref="cubeTable" />
    </el-row>
     <el-row>
      <p class="table-tip"> 操作栏:有图标 操作项2定义宽度  <span class="code"> 140px</span> </p>
      <cube-Table :data="tableData" :columns="columns2" ref="cubeTable" />
    </el-row>
     <el-row>
      <p class="table-tip"> 操作栏:有图标 操作项3定义宽度  <span class="code"> 180px</span> </p>
      <cube-Table :data="tableData" :columns="columns3" ref="cubeTable" />
    </el-row>
     <el-row>
      <p class="table-tip"> 操作栏:有图标 操作项大于3 定义更多操作宽度  <span class="code"> 180px</span> </p>
      <cube-Table :data="tableData" :columns="columns4" ref="cubeTable" />
    </el-row>
  </div>
  </template>

  <script>
    export default {
      data() {
        return {
          tableData:[
            {
              "name": "Don Schoen Jr.",
              "email": "Buck_Aufderhar13@gmail.com",
              "text": "exercitationem autem omnis",
              'results': 45
            }
          ],
          columns:[
            { label: '选项',  type: 'selection'},
            { label: '序号', type: 'index' },
            { label: '姓名', key: 'name' },
            { label: '邮箱', key: 'email' },
            { 
              label: '描述', 
              key: 'text', 
              render: (h, parmas) => {
                const { row } = parmas
                return <span> { row.text } </span>
              }
            },
            { 
              label: '业绩', 
              key: 'text', 
              render: (h, parmas) => {
                const { row } = parmas
                return <span> { row.results } 万 </span>
              }
            },
            { 
              label: '操作',
              width: 80,
              render: (h, parmas) => {
                const { row } = parmas
                return (<div class="flex-box-table-row"> 
                  <div class="btn-text" onClick={ ()=>this.handler('查看') }> 
                    <i class="el-icon-view" /> 查看 
                  </div>
               </div>)
              }
            },
          ],
          columns2:[
            { label: '选项',  type: 'selection'},
            { label: '序号', type: 'index' },
            { label: '姓名', key: 'name' },
            { label: '邮箱', key: 'email' },
            { 
              label: '描述', 
              key: 'text', 
              render: (h, parmas) => {
                const { row } = parmas
                return <span> { row.text } </span>
              }
            },
            { 
              label: '业绩', 
              key: 'text', 
              render: (h, parmas) => {
                const { row } = parmas
                return <span> { row.results } 万 </span>
              }
            },
            { label: '操作',
              width:140,
              render: (h, parmas) => {
                const { row } = parmas
                return (<div class="flex-box-table-row"> 
                  <div class="btn-text" onClick={ ()=>this.handler('编辑') }> 
                    <i class="el-icon-edit-outline" /> 编辑 
                  </div>
                  <div class="btn-text" onClick={ ()=>this.handler('查看') }> 
                    <i class="el-icon-view" /> 查看 
                  </div>
               </div>)
              }
            },
          ],
          columns3:[
            { label: '选项',  type: 'selection'},
            { label: '序号', type: 'index' },
            { label: '姓名', key: 'name' },
            { label: '邮箱', key: 'email' },
            { 
              label: '描述', 
              key: 'text', 
              render: (h, parmas) => {
                const { row } = parmas
                return <span> { row.text } </span>
              }
            },
            { 
              label: '业绩', 
              key: 'text', 
              render: (h, parmas) => {
                const { row } = parmas
                return <span> { row.results } 万 </span>
              }
            },
            { 
              label: '操作',
              width:180,
              render: (h, parmas) => {
                const { row } = parmas
                return (<div class="flex-box-table-row"> 
                  <div class="btn-text" onClick={ ()=>this.handler('编辑') }> 
                    <i class="el-icon-edit-outline" /> 编辑 
                  </div>
                  <div class="btn-text" onClick={ ()=>this.handler('查看') }> 
                    <i class="el-icon-view" /> 查看 
                  </div>
                  <div class="delete-text"  onClick={ ()=>this.handler('删除') }> 
                    <i class="el-icon-delete" /> 删除 
                  </div>
               </div>)
              }
            },
          ],
          columns4:[
            { label: '选项',  type: 'selection'},
            { label: '序号', type: 'index' },
            { label: '姓名', key: 'name' },
            { label: '邮箱', key: 'email' },
            { 
              label: '描述', 
              key: 'text', 
              render: (h, parmas) => {
                const { row } = parmas
                return <span> { row.text } </span>
              }
            },
            { 
              label: '业绩', 
              key: 'text', 
              render: (h, parmas) => {
                const { row } = parmas
                return <span> { row.results } 万 </span>
              }
            },
            { 
              label: '操作',
              width:180,
              render: (h, parmas) => {
                const { row } = parmas
                return (<div class="flex-box-table-row"> 
                  <div class="btn-text" onClick={ ()=>this.handler('编辑') }> 
                    <i class="el-icon-edit-outline" /> 编辑 
                  </div>
                  <div class="btn-text" onClick={ ()=>this.handler('查看') }> 
                    <i class="el-icon-view" /> 查看 
                  </div>
                  <el-dropdown>
                  <div class="btn-text"> 
                    <i class="el-icon-more" />更多 
                  </div>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>停用</el-dropdown-item>
                      <el-dropdown-item>启用</el-dropdown-item>
                      <el-dropdown-item>提交审核</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
               </div>)
              }
            },
          ]
        }
      },
       methods: {
        getSelectRowData() {
          const data = this.$refs['cubeTable'].getTableSelection()||[]
          const msg = data.length ?  JSON.stringify(data) : '无勾选数据'
          this.$alert(msg, '提示', {
            confirmButtonText: '确定',
            callback: action => {}
          });
        },
        handler(meg){
          this.$message({ duration: 3500, message: `${meg}数据`, })
        }
      }
    }
  </script>
 
<style>
 
</style>


```
:::

### Table Attributes (部分参数待整理)
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| data | 显示的数据 | array | — | — |
| height | Table 的高度，默认为自动高度。如果 height 为 number 类型，单位 px；如果 height 为 string 类型，则这个高度会设置为 Table 的 style.height 的值，Table 的高度会受控于外部样式。  | string/number | — | — |
| max-height | Table 的最大高度。合法的值为数字或者单位为 px 的高度。 | string/number | — | — |
| stripe | 是否为斑马纹 table | boolean | — | false |
| border | 是否带有纵向边框 | boolean | — | false |
| size | Table 的尺寸 | string | medium / small / mini | — |
| highlight-current-row | 是否要高亮当前行 | boolean | — | false |
| current-row-key | 当前行的 key，只写属性 | String,Number | — | — |
| row-class-name | 行的 className 的回调方法，也可以使用字符串为所有行设置一个固定的 className。 | Function({row, rowIndex})/String | — | — |
| row-style | 行的 style 的回调方法，也可以使用一个固定的 Object 为所有行设置一样的 Style。 | Function({row, rowIndex})/Object | — | — |
| cell-class-name | 单元格的 className 的回调方法，也可以使用字符串为所有单元格设置一个固定的 className。 | Function({row, column, rowIndex, columnIndex})/String | — | — |
| cell-style | 单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有单元格设置一样的 Style。 | Function({row, column, rowIndex, columnIndex})/Object | — | — |
| header-row-class-name | 表头行的 className 的回调方法，也可以使用字符串为所有表头行设置一个固定的 className。 | Function({row, rowIndex})/String | — | — |
| header-row-style | 表头行的 style 的回调方法，也可以使用一个固定的 Object 为所有表头行设置一样的 Style。 | Function({row, rowIndex})/Object | — | — |
| header-cell-class-name | 表头单元格的 className 的回调方法，也可以使用字符串为所有表头单元格设置一个固定的 className。 | Function({row, column, rowIndex, columnIndex})/String | — | — |
| header-cell-style | 表头单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有表头单元格设置一样的 Style。 | Function({row, column, rowIndex, columnIndex})/Object | — | — |
| row-key | 行数据的 Key，用来优化 Table 的渲染；在使用 reserve-selection 功能与显示树形数据时，该属性是必填的。类型为 String 时，支持多层访问：`user.info.id`，但不支持 `user.info[0].id`，此种情况请使用 `Function`。 | Function(row)/String | — | — |
| expand-row-keys | 可以通过该属性设置 Table 目前的展开行，需要设置 row-key 属性才能使用，该属性为展开行的 keys 数组。| Array | — | |
| tooltip-effect | tooltip `effect` 属性 | String | dark/light | | dark |

### Table Events
| 事件名 | 说明 | 参数 |
| ---- | ---- | ---- |
| cell-click | 当某个单元格被点击时会触发该事件 | row, column, cell, event |
| cell-dblclick | 当某个单元格被双击击时会触发该事件 | row, column, cell, event |
| row-click | 当某一行被点击时会触发该事件 | row, column, event |
| row-contextmenu | 当某一行被鼠标右键点击时会触发该事件 | row, column, event |
| row-dblclick | 当某一行被双击时会触发该事件 | row, column, event |
| header-click | 当某一列的表头被点击时会触发该事件 | column, event |
| current-change | 当表格的当前行发生变化的时候会触发该事件，如果要高亮当前行，请打开表格的 highlight-current-row 属性 | currentRow, oldCurrentRow |

### Table Methods
| 方法名 | 说明 | 参数 |
| ---- | ---- | ---- |
| setCurrentRow | 用于单选表格，设定某一行为选中行，如果调用时不加参数，则会取消目前高亮行的选中状态。 | row |

### Table Slot
| name | 说明 |
|------|--------|
| append | 插入至表格最后一行之后的内容，如果需要对表格的内容进行无限滚动操作，可能需要用到这个 slot。若表格有合计行，该 slot 会位于合计行之上。 |

### Table-column Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| type | 对应列的类型。如果设置了 `selection` 则显示多选框；如果设置了 `index` 则显示该行的索引（从 1 开始计算）；如果设置了 `expand` 则显示为一个可展开的按钮 | string | selection/index/expand | — |
| index | 如果设置了 `type=index`，可以通过传递 `index` 属性来自定义索引 | number, Function(index) | - | - |
| column-key | column 的 key，如果需要使用 filter-change 事件，则需要此属性标识是哪个 column 的筛选条件 | string | — | — |
| label | 显示的标题 | string | — | — |
| prop | 对应列内容的字段名，也可以使用 property 属性 | string | — | — |
| width | 对应列的宽度 | string | — | — |
| min-width | 对应列的最小宽度，与 width 的区别是 width 是固定的，min-width 会把剩余宽度按比例分配给设置了 min-width 的列 | string | — | — |
| fixed | 列是否固定在左侧或者右侧，true 表示固定在左侧 | string, boolean | true, left, right | — |
| render-header | 列标题 Label 区域渲染使用的 Function | Function(h, { column, $index }) | — | — |
| sortable | 对应列是否可以排序，如果设置为 'custom'，则代表用户希望远程排序，需要监听 Table 的 sort-change 事件 | boolean, string | true, false, 'custom' | false |
| sort-method | 对数据进行排序的时候使用的方法，仅当 sortable 设置为 true 的时候有效，需返回一个数字，和 Array.sort 表现一致 | Function(a, b) | — | — |
| align | 对齐方式 | String | left/center/right | left |
| header-align | 表头对齐方式，若不设置该项，则使用表格的对齐方式 | String | left/center/right | — |
| class-name | 列的 className | string | — | — |
| label-class-name | 当前列标题的自定义类名 | string | — | — |
| selectable | 仅对 type=selection 的列有效，类型为 Function，Function 的返回值用来决定这一行的 CheckBox 是否可以勾选 | Function(row, index) | — | — |
| reserve-selection | 仅对 type=selection 的列有效，类型为 Boolean，为 true 则会在数据更新之后保留之前选中的数据（需指定 `row-key`） | Boolean | — | false |

### Table-column Scoped Slot
| name | 说明 |
|------|--------|
| — | 自定义列的内容，参数为 { row, column, $index } |
| header | 自定义表头的内容. 参数为 { column, $index } |
