<template>
  <div class="CubeCloudBar">
    <div
      v-if="visible"
      class="base-sidebar-bg"
      :class="visible ? 'is-visible':'' "
      @click.stop="closeBar"
    />
    <div class="cube-cloud-bar-sidebar-wrapper" :class="visible ? 'is-products-menu': '' ">
      <div class="currern-menu list-item-flex" @click="switchSidebar">
        <div>
          <i class="el-icon-s-grid" />
          产品与服务
        </div>
        <i class="el-icon-arrow-right" />
      </div>
      <ul class="base-products-ul">
        <!-- :key="item.label"  后期替换为唯一标识服务id-->
        <draggable :list="menuList" group="productItem" class="dragArea">
          <transition-group>
            <div v-for="(item) in menuList" :key="item.label" class="product-item">
              <div class="product-name">{{ item.label }}</div>
              <div class="product-item-actions">
                <i class="el-icon-close" @click.stop="remove2AddMenu(item)" />
              </div>
            </div>
          </transition-group>
        </draggable>
      </ul>
    </div>
    <div class="sidebar-productList" :class="showSiderBar ? 'is-sidebar-productList': '' ">
      <i class="el-icon-close el-icon-close-layout" @click="switchSidebar" />
      <div class="sidebar-productList-left">
        <div class="productList-top">
          <div class="product-search">
            <span class="sidebar-icon-search-wrapper">
              <i class="el-icon-search" />
            </span>
            <input
              v-model.trim="searchKey"
              type="text"
              class="product-search-input"
              placeholder="请输入关键词"
            >
          </div>
        </div>
        <div ref="productList-main" class="productList-main" @scroll.passive="scrollCategory">
          <div class="sidebar-product-category">
            <div
              v-for="(item,index) in categoryListFilter"
              :key="index"
              class="sidebar-product-category-group"
            >
              <div
                :id="'category-group-item-' + item.categoryType "
                class="sidebar-product-category-group-item"
              >
                <h5>{{ item.categoryName }}</h5>
                <ul>
                  <li v-for="(itemK,i) in item.children" :key="i" class="is-active">
                    <a href="#" title>{{ itemK.label }}</a>
                    <i
                      :class="!isActive(itemK) ? 'el-icon-star-off':'el-icon-star-on' "
                      @click.stop="remove2AddMenu(itemK)"
                    />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <!-- 右边导航 -->
        <div class="sidebar-productList-nav">
          <ul>
            <li
              v-for="(item,index) in categoryListNav"
              :key="index"
              :class="'category-'+ index"
              @click="scrollTo(item)"
            >
              <button
                :data-id="'category-'+ index"
                class="console-base-rc-button thm-normal"
              >{{ item.categoryName }}</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
export default {
  name: 'CubeCloudBar',
  components: { draggable },
  props: {
    visible: {
      type: Boolean,
      default: () => false
    },
    categoryList: {
      type: Array,
      default: () => [
        {
          categoryName: '服务器',
          categoryType: 1,
          children: [
            {
              label: '云服务器 ECS',
              value: '',
              path: ''
            },
            {
              label: '负载均衡',
              value: '',
              path: ''
            },
            {
              label: '弹性伸缩',
              value: '',
              path: ''
            },
            {
              label: '容器服务',
              value: '',
              path: ''
            },
            {
              label: '容器服务',
              value: '',
              path: ''
            },
            {
              label: '容器服务 Kubernetes 版',
              value: '',
              path: ''
            },
            {
              label: '容器镜像服务',
              value: '',
              path: ''
            },
            {
              label: '资源编排',
              value: '',
              path: ''
            },
            {
              label: '批量计算',
              value: '',
              path: ''
            },
            {
              label: '弹性高性能计算',
              value: '',
              path: ''
            }
          ]
        },
        {
          categoryName: '数据库',
          categoryType: 2,
          children: [
            {
              label: '云服务器 ECS',
              value: '',
              path: ''
            },
            {
              label: '负载均衡',
              value: '',
              path: ''
            },
            {
              label: '弹性伸缩',
              value: '',
              path: ''
            },
            {
              label: '容器服务',
              value: '',
              path: ''
            },
            {
              label: '容器服务',
              value: '',
              path: ''
            },
            {
              label: '容器服务 Kubernetes 版',
              value: '',
              path: ''
            },
            {
              label: '容器镜像服务',
              value: '',
              path: ''
            },
            {
              label: '资源编排',
              value: '',
              path: ''
            },
            {
              label: '批量计算',
              value: '',
              path: ''
            },
            {
              label: '弹性高性能计算',
              value: '',
              path: ''
            }
          ]
        },
        {
          categoryName: '移动云',
          categoryType: 3,
          children: [
            {
              label: '云服务器 ECS',
              value: '',
              path: ''
            },
            {
              label: '负载均衡',
              value: '',
              path: ''
            },
            {
              label: '弹性伸缩',
              value: '',
              path: ''
            },
            {
              label: '容器服务',
              value: '',
              path: ''
            },
            {
              label: '容器服务',
              value: '',
              path: ''
            },
            {
              label: '容器服务 Kubernetes 版',
              value: '',
              path: ''
            },
            {
              label: '容器镜像服务',
              value: '',
              path: ''
            },
            {
              label: '资源编排',
              value: '',
              path: ''
            },
            {
              label: '批量计算',
              value: '',
              path: ''
            },
            {
              label: '弹性高性能计算',
              value: '',
              path: ''
            }
          ]
        },
        {
          categoryName: '存储与 CDN',
          categoryType: 4,
          children: [
            {
              label: '云服务器 ECS',
              value: '',
              path: ''
            },
            {
              label: '负载均衡',
              value: '',
              path: ''
            },
            {
              label: '弹性伸缩',
              value: '',
              path: ''
            },
            {
              label: '容器服务',
              value: '',
              path: ''
            },
            {
              label: '容器服务',
              value: '',
              path: ''
            },
            {
              label: '容器服务 Kubernetes 版',
              value: '',
              path: ''
            },
            {
              label: '容器镜像服务',
              value: '',
              path: ''
            },
            {
              label: '资源编排',
              value: '',
              path: ''
            },
            {
              label: '批量计算',
              value: '',
              path: ''
            },
            {
              label: '弹性高性能计算',
              value: '',
              path: ''
            }
          ]
        },
        {
          categoryName: '云通信',
          categoryType: 5,
          children: [
            {
              label: '云服务器 ECS',
              value: '',
              path: ''
            },
            {
              label: '负载均衡',
              value: '',
              path: ''
            },
            {
              label: '弹性伸缩',
              value: '',
              path: ''
            },
            {
              label: '容器服务',
              value: '',
              path: ''
            },
            {
              label: '容器服务',
              value: '',
              path: ''
            },
            {
              label: '容器服务 Kubernetes 版',
              value: '',
              path: ''
            },
            {
              label: '容器镜像服务',
              value: '',
              path: ''
            },
            {
              label: '资源编排',
              value: '',
              path: ''
            },
            {
              label: '批量计算',
              value: '',
              path: ''
            },
            {
              label: '弹性高性能计算',
              value: '',
              path: ''
            }
          ]
        }
      ]
    }
  },
  data() {
    return {
      searchKey: '',
      showSider: false,
      menuList: []
    }
  },
  computed: {
    showSiderBar() {
      const { showSider, visible } = this
      return showSider && visible
    },
    categoryListNav() {
      const { categoryListFilter } = this
      return categoryListFilter.map(item => {
        return {
          categoryName: item.categoryName,
          categoryType: item.categoryType
        }
      })
    },
    categoryListFilter() {
      const { searchKey, categoryList } = this
      const filterData = []
      if (searchKey) {
        categoryList.forEach(element => {
          const arr = element.children.filter(dataNews => {
            return Object.keys(dataNews).some(key => {
              return (
                String(dataNews[key])
                  .toLowerCase()
                  .indexOf(searchKey.toLowerCase()) > -1
              )
            })
          })
          if (arr.length) {
            filterData.push({
              categoryName: element.categoryName,
              children: arr
            })
          }
        })
        return filterData
      } else {
        return categoryList
      }
    }
  },
  methods: {
    switchSidebar() {
      this.showSider = !this.showSider
    },
    closeBar() {
      this.$emit('update:visible', false)
    },
    isActive(item) {
      return this.menuList.map(item => item.label).includes(item.label)
    },
    remove2AddMenu(item) {
      // 后期去唯根据唯一标识符号移除 公用删除或者添加
      const { menuList } = this
      const ids = menuList.map(item => item.label)
      if (ids.includes(item.label)) {
        this.menuList = menuList.filter(k => k.label !== item.label)
      } else {
        this.menuList.push(item)
      }
    },
    selsetToMenuList(item) {
      // 后期去唯一标识符号
      const keys = this.menuList.map(item => item.label)
      if (!keys.includes(item.label)) {
        this.menuList.push(item)
      }
    },
    scrollCategory(e) {
      // console.log(e)
    },
    scrollTo(item) {
      // 获取目标的 offsetTop
      const targetOffsetTop = document.querySelector(`#category-group-item-${item.categoryType}`).offsetTop
      // 获取当前 offsetTop
      let scrollTop = this.$refs['productList-main'] ? this.$refs['productList-main'].scrollTop : 0
      const STEP = 50

      // 定义往下滑函数
      const smoothDown = () => {
        // 如果当前 scrollTop 小于 targetOffsetTop 说明视口还没滑到指定位置
        if (scrollTop < targetOffsetTop) {
          // 如果和目标相差距离大于等于 STEP 就跳 STEP
          // 否则直接跳到目标点，目标是为了防止跳过了。
          if (targetOffsetTop - scrollTop >= STEP) {
            scrollTop += STEP
          } else {
            scrollTop = targetOffsetTop
          }
          this.$refs['productList-main'].scrollTop = scrollTop
          // 关于 requestAnimationFrame 可以自己查一下，在这种场景下，相比 setInterval 性价比更高
          requestAnimationFrame(smoothDown)
        }
      }
      // 定义往上滑函数
      const smoothUp = () => {
        if (scrollTop > targetOffsetTop) {
          if (scrollTop - targetOffsetTop >= STEP) {
            scrollTop -= STEP
          } else {
            scrollTop = targetOffsetTop
          }
          this.$refs['productList-main'].scrollTop = scrollTop
          requestAnimationFrame(smoothUp)
        }
      }

      // 判断是往下滑还是往上滑
      if (scrollTop > targetOffsetTop) {
        // 往上滑
        smoothUp()
      } else {
        // 往下滑
        smoothDown()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.CubeCloudBar {
  color: #333;
  position: fixed;
  top: 48px;
  left: 0;
  height: calc(100vh - 48px);
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.15);
  transition: all 0.3s cubic-bezier(0, 0, 0.2, 1);
  z-index: 999;
  font-size: 12px;

  ul,
  li {
    list-style: none;
    padding: 0;
    margin: 0;
  }
}

.list-item-flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.el-icon-close-layout {
  position: absolute;
  top: 16px;
  right: 16px;
  box-sizing: border-box;
  line-height: inherit;
  cursor: pointer;
  font-family: inherit;
  display: inline-block;
  width: auto;
  text-align: center;
  color: rgb(85, 85, 85);
  white-space: nowrap;
  font-size: 16px;
  padding: 0px;
  outline: medium;
  background: none;
  text-decoration: none;
  transition: all 250ms ease 0s;
  border-width: initial;
  border-style: none;
  border-color: initial;
  border-image: initial;
  overflow: hidden;
}

.is-visible {
  opacity: 1 !important;
}

.base-sidebar-bg {
  opacity: 0;
  position: absolute;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.45);
  transition: all 0.3s cubic-bezier(0, 0, 0.2, 1);
}

.is-products-menu {
  transform: translate3d(0px, 0px, 0px) !important;
  opacity: 1 !important;
}

.cube-cloud-bar-sidebar-wrapper {
  width: 210px;
  position: absolute;
  z-index: 999;
  top: 0;
  bottom: 0;
  opacity: 0;
  overflow: hidden;
  color: $menuText;
  background-color: $menuBg;
  transform: translate3d(-210px, 0px, 0px);
  transition: all 0.3s cubic-bezier(0, 0, 0.2, 1);
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.15);

  .currern-menu {
    box-sizing: border-box;
    cursor: pointer;
    font-family: inherit;
    width: 100%;
    text-align: left;
    white-space: nowrap;
    height: 32px;
    line-height: 32px;
    outline: medium;
    background: none;
    text-decoration: none;
    transition: all 250ms ease 0s;
    border-width: 1px;
    border-style: solid;
    border-color: transparent;
    border-image: initial;
    overflow: hidden;
    padding: 0px 14px;
    &:hover {
      background-color: $menuBg;
      color: $themeColoe;
    }
  }

  .base-products-ul {
    margin: 0;
    padding: 0;
    position: relative;
    z-index: 999;
    overflow-x: hidden;
    overflow-y: auto;
    height: calc(100% - 36px);
    border-top: 1px solid #dedede;
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.15);

    .product-item {
      user-select: none;
      transform: translate3d(0px, 0px, 0px);
      padding: 0px 14px;
      width: 100%;
      height: 40px;
      line-height: 40px;
      overflow: hidden;
      white-space: nowrap;
      transition: all 0.16s ease-out;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .product-name {
        flex: 1;
        display: flex;
        align-items: center;
      }
      .product-item-actions {
        display: none;
      }
      &:hover {
        background-color: #101010;
        color: $themeColoe;
        .product-item-actions {
          display: block;
        }
      }
      .el-icon-s-grid {
        cursor: move;
      }
    }
  }
}

.is-sidebar-productList {
  left: 210px !important;
}

.sidebar-productList {
  left: -920px;
  width: 920px;
  height: calc(100% - 4px);
  position: absolute;
  top: 0;
  bottom: 0;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 40px 30px 0;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  background-color: #f7f7f7;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0, 0, 0.2, 1);
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.15);
  display: flex;
}

.sidebar-productList-left {
  position: relative;
  height: 100%;
  overflow: hidden;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-right: 6px;

  .productList-main {
    flex: 1;
    display: flex;
    overflow-y: auto;
    overflow-x: hidden;
    margin-top: 10px;
    position: relative;
    transition: all 0.43s cubic-bezier(0, 0, 0.2, 1);

    &::-webkit-scrollbar {
      display: none;
    }

    .sidebar-product-category {
      flex: 1;
      margin-top: 0;
      clear: both;
      padding-right: 190px;

      &::-webkit-scrollbar {
        display: none;
      }
      .sidebar-product-category-group {
        float: left;
        margin-right: 4px;
        width: 210px;

        .sidebar-product-category-group-item {
          user-select: none;
          h5 {
            padding: 0 10px;
            height: 40px;
            line-height: 40px;
            font-size: 12px;
            font-weight: 600;
            color: #111;
            margin: 0;
          }
          li {
            user-select: none;
            position: relative;
            display: block;
            padding: 0 10px;
            height: 30px;
            line-height: 30px;
            font-size: 12px;
            text-decoration: none;
            color: #555;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            &:hover {
              background-color: rgba(0, 0, 0, 0.06);
            }
            i {
              position: absolute;
              top: 50%;
              right: 0;
              padding-right: 4px;
              transform: translateY(-50%);
              cursor: pointer;
              font-weight: bold;
              transition: all 0.3s cubic-bezier(0, 0, 0.2, 1);
            }
            .el-icon-star-on {
              font-size: 16px;
              color: #409eff;
              font-weight: bold;
            }
          }
        }
      }
    }
  }
}

.product-search {
  z-index: 9;
  .sidebar-icon-search-wrapper {
    position: absolute;
    width: 32px;
    height: 32px;
    line-height: 32px;
    font-size: 16px;
    text-align: center;
    color: #c1c1c1;
    i {
      font-size: 16px;
      text-align: center;
      color: #c1c1c1;
    }
  }
  .product-search-input {
    padding-left: 25px;
    border: none;
    border-bottom: 1px solid #dedede;
    background-color: #f7f7f7;
    width: 634px;
    height: 32px;
    line-height: 32px;
    font-size: 12px;
    color: #595959;
    outline: none;
  }
}

.sidebar-productList-nav {
  position: absolute;
  top: 0;
  right: 0;
  width: 180px;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #f7f7f7;
  z-index: 3;

  button {
    cursor: pointer;
    display: block;
    padding-left: 12px;
    width: 100%;
    height: 32px;
    line-height: 32px;
    text-align: left;
    color: #555;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border: none;
    outline: none;
    background-color: #f7f7f7;
    &:hover {
      background-color: rgba(0, 0, 0, 0.06);
    }
  }
  ul {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    border-left: 1px solid #ccc;
    background-color: #f7f7f7;
    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
