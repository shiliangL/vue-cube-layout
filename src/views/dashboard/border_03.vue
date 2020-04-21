<template>
  <div class="border_03">
    <slot />
    <div class="decoration">
      <div class="lt" />
      <div class="rt" />
      <div class="rb" />
      <div class="lb" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Border03'
}
</script>

<style lang="scss" scoped>
.border_03 {
  width: 100%;
  height: 100%;
  padding: 10px;
  position: relative;
  .decoration {
    top: 0;
    left: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    border: 1px solid #00d3e7;
    & > div {
      width: 20px;
      height: 20px;
      position: absolute;
    }
    .lt {
      border-top: 3px solid #00d3e7;
      border-left: 3px solid #00d3e7;
      left: -2px;
      top: -2px;
    }
    .rt {
      border-top: 3px solid #00d3e7;
      border-right: 3px solid #00d3e7;
      right: -2px;
      top: -2px;
    }
    .rb {
      border-bottom: 3px solid #00d3e7;
      border-right: 3px solid #00d3e7;
      right: -2px;
      bottom: -2px;
    }
    .lb {
      border-bottom: 3px solid #00d3e7;
      border-left: 3px solid #00d3e7;
      left: -2px;
      bottom: -2px;
    }
  }
}
</style>
