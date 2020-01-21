<template>
  <div id="table-contain">
    <slot
      ref="table"
      name="table"
    />
    <slot
      ref="footer"
      name="footer"
    />
  </div>
</template>

<script>

import { debounce1 } from '@/utils'

export default {
  name: 'TableContain',
  props: {
    // 余量fix一些场景一下需要减掉部分的高度
    prefix: {
      type: Number,
      default: () => 0
    }

  },
  created() {
    this.resizeHeight = debounce1(() => {
      this.computedHeight()
    }, 200)
  },
  mounted() {
    window.addEventListener('resize', this.resizeHeight)
    this.resizeHeight()
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeHeight)
  },
  methods: {
    computedHeight() {
      const table = this.$slots.table[0]
      const footer = this.$slots.footer[0]
      const innerHieght = window.innerHeight
      const tableTop = table.elm.getBoundingClientRect().top
      let maxHeight = innerHieght - tableTop
      if (footer) {
        const footerHeight = footer.elm.offsetHeight
        maxHeight = innerHieght - footerHeight - tableTop - this.prefix
      }
      setTimeout(() => {
        this.$emit('update:height', maxHeight)
      }, 100)
    }
  }
}
</script>

