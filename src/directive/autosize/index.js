import autosize from '@/plugins/autosize'

export default {
  inserted(el, binding, vnode) {
    autosize(el)
    for (const d of vnode.data.directives) {
      if (d.name === 'model') {
        vnode.context.$watch(d.expression, function() {
          const evt = document.createEvent('Event')
          evt.initEvent('autosize:update', true, false)
          el.dispatchEvent(evt)
        })
        break
      }
    }
  }
}
