<template>
  <div class="batteryTage">
    <div
      class="progress_bg"
      :style="progressStyle"
    />
    <div class="progress"> {{ progress + '%' }} </div>
  </div>
</template>

<script>
export default {
  name: 'BatteryTage',
  props: {
    percentage: {
      type: Number,
      default: () => 0
    },
    warningTage: {
      type: Number,
      default: () => 90
    }
  },
  data() {
    return {
      progress: 0
    }
  },
  computed: {
    progressStyle() {
      return this.progress > this.warningTage ? { height: `${this.progress}%`, background: '#F36D6F' } : { height: `${this.progress}%`, background: '#2593FC' }
    }
  },
  watch: {
    percentage: {
      immediate: true,
      handler(value) {
        if (value) {
          const types = Object.prototype.toString.call(value) === '[object Number]'
          if (types) {
            this.progress = value >= 100 ? 100 : value
          } else {
            this.progress = '0'
          }
        } else {
          this.progress = '0'
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.batteryTage {
  width: 90px;
  height: 150px;
  border: 1px dashed #bdbcbc;
  border-radius: 4px;
  overflow: hidden;
  position: relative;

  .progress {
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
  }

  .progress_bg {
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 0%;
    background: #2593fc;
    border-radius: 4px;
    position: absolute;
    transition: all 0.32s;
  }
}
</style>
