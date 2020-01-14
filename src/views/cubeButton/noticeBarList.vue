<template>
  <div class="noticeBarList">
    <div class="left">
      <slot name="left">左</slot>
    </div>
    <div ref="wrap" class="wrap">
      <div
        ref="content"
        :style="contentStyle"
        :class="[ animationClass,'content', !scrollable ? 'wrap-ellipsis':'' ]"
        @animationend="onAnimationEnd"
        @webkitAnimationEnd="onAnimationEnd"
      >
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NoticeBarList',
  props: {
    text: {
      type: String,
      default: () => ''
    },
    scrollable: {
      type: Boolean,
      default: true
    },
    delay: {
      type: [Number, String],
      default: 1
    },
    speed: {
      type: Number,
      default: 20
    }
  },
  data() {
    return {
      wrapWidth: 0,
      firstRound: true,
      duration: 0,
      offsetWidth: 0,
      animationClass: ''
    }
  },
  computed: {
    contentStyle() {
      return {
        paddingLeft: !this.firstRound ? 0 : this.wrapWidth + 'px',
        animationDelay: (this.firstRound ? this.delay : 0) + 's',
        animationDuration: this.duration + 's'
      }
    },
    barStyle() {
      return {
        color: this.color,
        background: this.background
      }
    }
  },
  watch: {
    text: {
      handler() {
        this.$nextTick(() => {
          const { wrap, content } = this.$refs
          if (!wrap || !content) {
            return
          }
          const wrapWidth = wrap.getBoundingClientRect().width
          const offsetWidth = content.getBoundingClientRect().width
          if (this.scrollable && offsetWidth > wrapWidth) {
            this.wrapWidth = wrapWidth
            this.offsetWidth = offsetWidth
            this.duration = offsetWidth / this.speed
            this.animationClass = 'play'
          }
        })
      },
      immediate: true
    }
  },
  methods: {
    onAnimationEnd() {
      console.log('onAnimationEnd')
      this.firstRound = false
      this.$nextTick(() => {
        this.duration = (this.offsetWidth + this.wrapWidth) / this.speed
        this.animationClass = 'play-infinite'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.noticeBarList {
  position: relative;
  display: flex;
  align-items: center;
  height: 40px;
  padding: 0 4px;
  color: #333;
  font-size: 14px;
  line-height: 24px;

  .left {
    text-align: center;
    min-width: 22px;
    font-size: 16px;
    background: chartreuse;
  }
  .wrap {
    position: relative;
    flex: 1;
    height: 24px;
    overflow: hidden;
    border: 1px solid #cccccc;

    .content {
      padding: 0 4px;
      position: absolute;
      white-space: nowrap;
    }

    .play {
      display: block;
      animation: move-left 2s linear infinite;
    }

    .wrap-ellipsis {
      max-width: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}

@keyframes move-left {
  to {
    transform: translateX(-100%);
  }
}
</style>
