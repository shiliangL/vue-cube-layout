<template>
  <div class="border_01">
    <slot />
    <div class="decoration" />
  </div>
</template>

<script>
export default {
  name: 'Border01'
}
</script>

<style lang="scss" scoped>
.border_01 {
  width: 100%;
  height: 100%;
  padding: 10px;
  border: 1px solid #00faff;
  position: relative;
  .decoration {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: linear-gradient(#00faff, #00faff) left top,
      linear-gradient(#00faff, #00faff) left top,
      linear-gradient(#00faff, #00faff) right top,
      linear-gradient(#00faff, #00faff) right top,
      linear-gradient(#00faff, #00faff) left bottom,
      linear-gradient(#00faff, #00faff) left bottom,
      linear-gradient(#00faff, #00faff) right bottom,
      linear-gradient(#00faff, #00faff) right bottom;
    background-repeat: no-repeat;
    background-size: 2px 16px, 16px 2px;

    > div {
      width: 20px;
      height: 20px;
    }

    .lt {
      position: absolute;
      border-top: 2px solid #00faff;
      border-left: 2px solid #00faff;
      left: -2px;
      top: -2px;
    }
    .rt {
      position: absolute;
      border-top: 2px solid #00faff;
      border-right: 2px solid #00faff;
      right: -2px;
      top: -2px;
    }
    .rb {
      position: absolute;
      border-bottom: 2px solid #00faff;
      border-right: 2px solid #00faff;
      right: -2px;
      bottom: -2px;
    }
    .lb {
      position: absolute;
      border-bottom: 2px solid #00faff;
      border-left: 2px solid #00faff;
      left: -2px;
      bottom: -2px;
    }
  }
}
</style>
