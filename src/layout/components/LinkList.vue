<template>
  <div class="LinkList">
    <div v-for="(item, index) in dataList" :key="index" class="linkList-item"> {{ item.text }} </div>
  </div>
</template>

<script>
export default {
  name: 'LinkList',
  props: {
    dataList: {
      type: Array,
      default: () => [
        { text: '服务', path: '' },
        { text: '费用', path: '' },
        { text: '工单', path: '' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.LinkList{
  display: flex;
  align-items: center;
  .linkList-item{
    position: relative;
    font-size: 12px;
    cursor: pointer;
    font-weight: none;
    margin: 0 .375rem /* 6/16 */;
    display: inline-block;

    &::before {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 2px;
      background-color: #3080fe;
      transform-origin: bottom right;
      transform: scaleX(0);
      transition: transform 0.5s ease;
    }
    &:hover::before {
      transform-origin: bottom left;
      transform: scaleX(1);
    }
  }
}
</style>
