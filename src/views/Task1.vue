<template>
  <div v-elresize @elresize="test" ref="canvas">
    
  </div>
</template>

<script>
import Main from './../js/task1/main'

export default {
  data() {
    return {
      main: null
    }
  },
  mounted() {
    this.main = new Main(this.$refs.canvas)
  },
  methods: {
    test(e) {
      this.main.updateSize()
    }
  }
}
</script>

<style scoped>

  canvas {
    background: #30475e;
  }

</style>