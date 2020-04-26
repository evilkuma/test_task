<template>
  <div v-elresize @elresize="test" ref="canvas">
    
  </div>
</template>

<script>
import Main from './../js/task2/main'

export default {
  data() {
    return {
      main: null
    }
  },
  mounted() {
    this.main = Main(this.$refs.canvas)
  },
  methods: {
    test(e) {
      this.main.updateRendererSize()
    }
  }
}
</script>

<style>

</style>