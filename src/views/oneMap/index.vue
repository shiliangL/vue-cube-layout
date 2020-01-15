<template>
  <div ref="OneMap" class="OneMap" @click="toScreenfull">
    一张图
  </div>
</template>

<script>
export default {
  name: 'OneMap',
  components: {

  },
  data() {
    return {

    }
  },
  methods: {
    toScreenfull() {
      this.$refs['OneMap']
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
}
</style>
