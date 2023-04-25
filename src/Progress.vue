<template>
    <div id="progress">
        <div :style="barStyle" id="bar"></div>
        <span id="label">{{ label }} COMO ({{ percentage }})</span>
    </div>
</template>

<script>
export default {
  props: ['label', 'percentage', 'color'],
  computed: {
    barStyle() {
      return {
        'background-color': this.color,
        'width': this.percentage
      }
    },
  }
}
</script>

<style scoped>
#progress {
  width: auto;
  height: 30px;
  background-color: #4b4b4b;
}

#bar {
  height: 100%;
  border-radius: inherit;
}

#label {
  position: absolute;
  top: 0%;
  left: 15px;
  line-height: 30px;
  color: #ffffff;
}
</style>