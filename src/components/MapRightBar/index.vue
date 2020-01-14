<template>
  <div
    class="map-right-bar"
    :style="barStyle"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'MapRightBar',
  props: {
    barStyle: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang='scss' scoped>
.map-right-bar {
  position: fixed;
  right: 0.9rem;
  top: 50%;
  z-index: 6;
  width: 4.8rem;
  max-height: 80%;
  min-height: 60%;
  color: #fff;
  transform: translateY(-50%);
  background-color: rgba(0,0,0, .5);
  overflow-y: auto;
  pointer-events: auto;
}
</style>
