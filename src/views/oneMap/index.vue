<template>
  <div id="OneMap" ref="OneMap" class="OneMap">
    <svg-icon class="fullscreen-icon" :icon-class="isFullscreen?'exit-fullscreen':'fullscreen'" @click="toScreenfull" />
    一张图
  </div>
</template>

<script>

import screenfull from 'screenfull'

export default {
  name: 'OneMap',
  components: {

  },
  data() {
    return {
      isFullscreen: false
    }
  },

  mounted() {
    this.init()
  },
  beforeDestroy() {
    this.destroy()
  },
  methods: {
    toScreenfull() {
      if (!screenfull.enabled) {
        this.$message({
          message: 'you browser can not work',
          type: 'warning'
        })
        return false
      }
      const element = document.getElementById('OneMap')
      screenfull.toggle(element)
    },
    change() {
      this.isFullscreen = screenfull.isFullscreen
    },
    init() {
      if (screenfull.enabled) {
        screenfull.on('change', this.change)
      }
    },
    destroy() {
      if (screenfull.enabled) {
        screenfull.off('change', this.change)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.OneMap {
  height: 100%;
  width: 99%;
  background-size: cover;
  background-position: center;
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  background-repeat: no-repeat;
  background-image: url("../../assets/bg_img/bg_04.png");
  box-shadow: 0 0 3px #100925;
  display: flex;
  flex-direction: column;
  position: relative;
}
.fullscreen-icon{
  cursor: pointer;
  position: absolute;
  top: 6px;
  right: 6px;
  color: #b9b9b9;
  z-index: 10;
}
</style>
