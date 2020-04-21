<template>
  <div class="border_02">
    <slot />
    <div class="decoration" />
  </div>
</template>

<script>
export default {
  name: 'Border02'
}
</script>

<style lang="scss" scoped>
.border_02 {
  width: 100%;
  height: 100%;
  padding: 10px;
  position: relative;

  background: radial-gradient(
      circle at center center,
      rgba(25, 25, 112, 0),
      rgba(25, 25, 112, 0)
    ),
    linear-gradient(rgba(179, 224, 255, 0.62), rgba(179, 224, 255, 0.62)) left
      top,
    linear-gradient(rgba(179, 224, 255, 0.62), rgba(179, 224, 255, 0.62)) left
      top,
    linear-gradient(rgba(179, 224, 255, 0.62), rgba(179, 224, 255, 0.62)) right
      top,
    linear-gradient(rgba(179, 224, 255, 0.62), rgba(179, 224, 255, 0.62)) right
      top,
    linear-gradient(rgba(179, 224, 255, 0.62), rgba(179, 224, 255, 0.62)) left
      bottom,
    linear-gradient(rgba(179, 224, 255, 0.62), rgba(179, 224, 255, 0.62)) left
      bottom,
    linear-gradient(rgba(179, 224, 255, 0.62), rgba(179, 224, 255, 0.62)) right
      bottom,
    linear-gradient(rgba(179, 224, 255, 0.62), rgba(179, 224, 255, 0.62)) right
      bottom,
    linear-gradient(rgba(56, 144, 184, 0.6), rgba(56, 144, 184, 0.6)) top,
    linear-gradient(rgba(26, 87, 130, 0.6), rgba(26, 87, 130, 0.6)) bottom,
    linear-gradient(
        rgba(56, 144, 184, 0.6),
        rgba(219, 240, 255, 0.8),
        rgba(26, 87, 130, 0.6)
      )
      left,
    linear-gradient(
        rgba(56, 144, 184, 0.6),
        rgba(219, 240, 255, 0.8),
        rgba(26, 87, 130, 0.6)
      )
      right;
  background-repeat: no-repeat;
  background-position: 1px 1px, 0px 0px, 0px 0px, 0px 100%, 0px 100%, 100% 0px,
    100% 0px, 100% 100%, 100% 100%, 0px 0px, 0px 100%, 0px 100%, 100% 100%;
  background-size: calc(100% - 2px) calc(100% - 2px), 1px 10px, 10px 1px,
    1px 10px, 10px 1px, 1px 10px, 10px 1px, 1px 10px, 10px 1px, 100% 1px,
    100% 1px, 1px 100%, 1px 100%;
}
</style>
