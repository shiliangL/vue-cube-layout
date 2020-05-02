import QRCode from 'qrcode/build/qrcode'

export default {
  name: 'Qrcode',
  props: {
    value: null,
    options: Object,
    tag: {
      type: String,
      default: 'img'
    }
  },

  render(createElement) {
    return createElement(this.tag, this.$slots.default)
  },

  watch: {
    $props: {
      deep: true,
      immediate: true,
      handler() {
        if (this.$el) {
          this.generate()
        }
      }
    }
  },
  methods: {
    generate() {
      const { options, tag } = this
      const value = String(this.value)
      if (tag === 'canvas') {
        QRCode.toCanvas(this.$el, value, options, (error) => {
          if (error) {
            throw error
          }
        })
      } else if (tag === 'img') {
        QRCode.toDataURL(value, options, (error, url) => {
          if (error) {
            throw error
          }
          this.$el.src = url
        })
      } else {
        QRCode.toString(value, options, (error, string) => {
          if (error) {
            throw error
          }
          this.$el.innerHTML = string
        })
      }
    }
  },
  mounted() {
    this.$nextTick().then((_) => {
      this.generate()
    })
  }
}
