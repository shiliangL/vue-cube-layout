<template>
  <div class="flex-ul">
    <!-- 公司 -->
    <div class="flex-box-search">
      <el-input
        v-model="searchValue"
        placeholder="请输入公司名称"
      />
      <el-button
        type="primary"
        icon="el-icon-search"
      />
    </div>
    <div class="flex-ul-list">
      <div
        v-for="k in 40"
        :key="k"
        class="flex-ul-item"
      >
        <div class="flex-ul-item-name">
          郑州航空港区环卫标段名称
        </div>
        <div class="flex-ul-item-desc">
          企业名称
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchValue: null
    }
  }
}
</script>

<style lang="scss" scoped>
.flex-box-search {
  display: flex;
  align-items: center;
  margin-bottom: 6px;
}
.flex-ul {
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
}
.flex-ul-list {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: auto;

  .flex-ul-item {
    font-size: 13px;
    cursor: pointer;
    padding: 6px 6px;
    &:hover {
      color: #ffffff;
      background: #1890ff;
      border-radius: 4px;
    }
    .flex-ul-item-name {
      font-size: 13px;
    }
    .flex-ul-item-desc {
      font-size: 13px;
    }
  }
}
</style>
