<script setup>
import Progress from './Progress.vue';
import { getCandidates, getTotalComo, votesPerCandidates } from '../contract';
</script>

<template>
  <div id="counter">
    <Progress color="green" :percentage="Math.round(currentComo / totalComo * 100) + '%'" :label="currentComo + '/' + totalComo"/>
    <div id="notifier">
      <span :class="{ pulse: updated }" :key="restartPulse" @animationend="this.updated = false" id="callIndicator">●</span>
      <span>LIVE: Updating once per second</span>
    </div>
    <Progress class="optionBar" color="blue" :percentage="Math.round(votes[i] / totalComo * 100) + '%'" v-for="(candidate, i) in candidates"
      :label="candidate + ' - ' + votes[i]" :index="votes[i]"/>
  </div>
</template>

<script>
export default {
  data() {
    return {
        candidates: [],
        votes: [0],
        totalComo: 1,
        currentComo: 0,
        updated: false,
        restartPulse: false
    }
  },
  created() {
    this.refresh()
    setInterval(this.refresh, 1000)
  },
  methods: {
    async refresh() {
      this.candidates = await getCandidates(this.pollId)
      this.totalComo = await getTotalComo(this.pollId)
      this.votes = await votesPerCandidates(this.pollId)
      this.currentComo = this.votes.reduce((a, b) => a + b, 0)
      this.updated = false
      this.restartPulse = !this.restartPulse // Forcing a re-render to restart the animation
      this.updated = true
    }
  },
  props: ['pollId']
}
</script>

<style scoped>
.optionBar {
  margin: 25px;
  border-radius: 15px;
}

#notifier {
  margin: 25px;
  color: red;
}

#callIndicator {
  text-shadow : 1px 1px 10px red;
  opacity: 0;
  margin-right: 10px;
}

.pulse {
  animation: pulse 1s;
}

@keyframes pulse {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
