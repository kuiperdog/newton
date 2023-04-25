<script setup>
import Progress from './Progress.vue';
import { getCandidates, getTotalComo, votesPerCandidates } from './contract'
</script>

<template>
  <div id="app">
    <header>
      <h1>Newton <a href="https://github.com/kuiperdog/newton">v{{ version }}</a></h1>
      <h1>by <a href="https://twitter.com/kuipertwt">@kuipertwt</a></h1>
    </header>
    <Progress color="green" :percentage="Math.round(currentComo / totalComo * 100) + '%'" :label="currentComo + '/' + totalComo"/>
    <Progress class="optionBar" color="blue" :percentage="Math.round(votes[i] / totalComo * 100) + '%'" v-for="(candidate, i) in candidates"
              :label="candidate + ' - ' + votes[i]" :index="votes[i]"/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: new URLSearchParams(window.location.search).get('id'),
      version: __PACKAGE_VERSION__,
      candidates: [],
      votes: [0],
      totalComo: 1,
      currentComo: 0
    }
  },
  created() {
    this.setProgress()
  },
  methods: {
    async setProgress() {
      this.candidates = await getCandidates(this.id)
      this.totalComo = await getTotalComo(this.id)
      this.votes = await votesPerCandidates(this.id)
      this.currentComo = this.votes.reduce((a, b) => a + b, 0)
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
    width: 100vh;
    height: 100vh;
    margin: 0;
    border-radius: 0;
  }
}

header {
  width: 100%;
  padding: 25px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

h1 {
  font-size: 24px;
}

a {
  color: inherit;
}

.optionBar {
  margin: 25px;
  border-radius: 15px;
}
</style>
