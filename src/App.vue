<script setup>
import Counter from './components/Counter.vue';
import Header from './components/Header.vue';
</script>

<template>
  <div id="app">
    <Header/>
    <Counter :pollId="activePoll"/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activePoll: 76
    }
  }
}
</script>

<style scoped>
#app {
  margin: 25px;
  background-color: #ffffff;
  color: #000000;
  border-radius: 25px;
  width: 500px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  overflow: auto;
}

@media only screen and (max-width: 600px) {
  #app {
    width: 100vw;
    height: 100vh;
    margin: 0;
    border-radius: 0;
  }
}
</style>
