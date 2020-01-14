<template>
  <transition name="dialog-fade" @after-enter="afterEnter" @after-leave="afterLeave">
    <div
      v-show="visible"
      class="el-dialog__wrapper CubeDialog_dialog__wrapper"
      @click.self="handleWrapperClick"
    >
      <div
        :key="key"
        ref="dialog"
        role="dialog"
        aria-modal="true"
        :aria-label="title || 'dialog'"
        :class="['el-dialog CubeDialog', { 'is-fullscreen': fullscreen, 'el-dialog--center': center }, customClass]"
        :style="style"
      >
        <div class="CubeDialog_inner">
          <div class="CubeDialog_inner_warp">
            <div v-if="showHeader" class="CubeDialog_header">
              <slot name="title">
                <span class="CubeDialog_title">{{ title }}</span>
              </slot>
              <el-button
                v-if="showClose"
                aria-label="Close"
                type="text"
                style="padding:0"
                @click="handleClose"
              >
                <i class="el-dialog__close el-icon el-icon-close CubeDialog_close ac" />
              </el-button>
            </div>
            <el-button
              v-else
              aria-label="Close"
              type="text"
              style="padding:0"
              class="handleCloseBtn"
              @click="handleClose"
            >
              <i class="el-dialog__close el-icon el-icon-close CubeDialog_close ac" />
            </el-button>
            <div v-if="rendered" class="cubeDialog_body">
              <slot />
            </div>
            <div v-if="$slots.footer" class="cubeDialog_footer">
              <slot name="footer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>

import Popup from 'element-ui/src/utils/popup'
import Migrating from 'element-ui/src/mixins/migrating'
import emitter from 'element-ui/src/mixins/emitter'

export default {
  name: 'CubeDialog',
  mixins: [Popup, emitter, Migrating],
  props: {
    title: {
      type: String,
      default: ''
    },

    modal: {
      type: Boolean,
      default: true
    },

    showHeader: {
      type: Boolean,
      default: true
    },

    modalAppendToBody: {
      type: Boolean,
      default: true
    },

    appendToBody: {
      type: Boolean,
      default: false
    },

    lockScroll: {
      type: Boolean,
      default: true
    },

    closeOnClickModal: {
      type: Boolean,
      default: true
    },

    closeOnPressEscape: {
      type: Boolean,
      default: true
    },

    showClose: {
      type: Boolean,
      default: true
    },

    width: {
      type: String,
      default: ''
    },

    fullscreen: Boolean,

    customClass: {
      type: String,
      default: ''
    },

    top: {
      type: String,
      default: '0vh'
    },

    // eslint-disable-next-line vue/require-default-prop
    beforeClose: {
      type: Function
      // default: () => {}
    },

    center: {
      type: Boolean,
      default: false
    },

    destroyOnClose: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      closed: false,
      key: 0
    }
  },

  computed: {
    style() {
      const style = {}
      if (!this.fullscreen) {
        style.marginTop = this.top
        if (this.width) {
          style.width = this.width
        }
      }
      return style
    }
  },

  watch: {
    visible(val) {
      if (val) {
        this.closed = false
        this.$emit('open')
        this.$el.addEventListener('scroll', this.updatePopper)
        this.$nextTick(() => {
          this.$refs.dialog.scrollTop = 0
        })
        if (this.appendToBody) {
          document.body.appendChild(this.$el)
        }
      } else {
        this.$el.removeEventListener('scroll', this.updatePopper)
        if (!this.closed) this.$emit('close')
        if (this.destroyOnClose) {
          this.$nextTick(() => {
            this.key++
          })
        }
      }
    }
  },

  mounted() {
    if (this.visible) {
      this.rendered = true
      this.open()
      if (this.appendToBody) {
        document.body.appendChild(this.$el)
      }
    }
  },

  destroyed() {
    // if appendToBody is true, remove DOM node after destroy
    if (this.appendToBody && this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el)
    }
  },
  methods: {
    getMigratingConfig() {
      return {
        props: {
          size: 'size is removed.'
        }
      }
    },
    handleWrapperClick() {
      if (!this.closeOnClickModal) return
      this.handleClose()
    },
    handleClose() {
      if (typeof this.beforeClose === 'function') {
        this.beforeClose(this.hide)
      } else {
        this.hide()
      }
    },
    hide(cancel) {
      if (cancel !== false) {
        this.$emit('update:visible', false)
        this.$emit('close')
        this.closed = true
      }
    },
    updatePopper() {
      this.broadcast('ElSelectDropdown', 'updatePopper')
      this.broadcast('ElDropdownMenu', 'updatePopper')
    },
    afterEnter() {
      this.$emit('opened')
    },
    afterLeave() {
      this.$emit('closed')
    }
  }
}
</script>

<style lang="scss" scoped>
.handleCloseBtn{
  color: #ffffff;
  position: absolute;
  top: 0.22rem;
  right: 0.22rem;
  z-index: 99999;
  font-size: 0.32rem;
}
</style>
