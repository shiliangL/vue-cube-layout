<template>
  <div>
    <treeselect v-model="value" :options="options" />
  </div>
</template>

<script>
// import the component
import Treeselect from '@riophae/vue-treeselect'
// import the styles
export default {
  name: 'CubeSelectTree',
  components: {
    Treeselect
  },
  data() {
    return {
      // define the default value
      value: null,
      // define options
      options: [{
        id: 'a',
        label: 'a',
        children: [{
          id: 'aa',
          label: 'aa'
        }, {
          id: 'ab',
          label: 'ab'
        }]
      }, {
        id: 'b',
        label: 'b'
      }, {
        id: 'c',
        label: 'c'
      }]
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
