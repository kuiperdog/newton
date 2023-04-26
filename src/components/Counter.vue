<script setup>
import Progress from './Progress.vue';
import { getCandidates, getTotalComo, votesPerCandidates } from '../contract';
import titles from '../assets/titles.json';
</script>

<template>
  <div id="counter">
    <Progress color="green" :percentage="Math.round(currentComo / totalComo * 100) + '%'" :label="currentComo + '/' + totalComo"/>
    <div id="notifier" v-if="!complete">
      <span :class="{ pulse: updated }" :key="restartPulse" @animationend="this.updated = false" id="callIndicator">●</span>
      <span>LIVE: Updating once per second</span>
    </div>
    <Progress class="optionBar" color="blue" v-for="option in options" :percentage="Math.round(option.votes / totalComo * 100) + '%'"
      :label="option.title + ' - ' + option.votes"/>
  </div>
</template>

<script>
export default {
  data() {
    return {
        options: [],
        totalComo: 1,
        currentComo: 0,
        updated: false,
        restartPulse: false,
        complete: false,
        timer: null
    }
  },
  async created() {
    this.totalComo = await getTotalComo(this.pollId)
    let candidates = await getCandidates(this.pollId)
    let opt = []
    candidates.forEach((candidate, i) => { opt.push({index: i, title: titles[i].title, votes: 0}) })
    this.options = opt

    this.refresh()
    this.timer = setInterval(this.refresh, 1000)
  },
  methods: {
    async refresh() {
      let votes = await votesPerCandidates(this.pollId)
      this.currentComo = votes.reduce((a, b) => a + b, 0)
      this.options.forEach((option, i) => this.options[i].votes = votes[option.index])
      this.options.sort((a, b) => b.votes - a.votes)

      if (this.currentComo == this.totalComo) {
        this.complete = true
        clearInterval(this.timer)
      } else {
        this.updated = false
        this.restartPulse = !this.restartPulse // Forcing a re-render to restart the animation
        this.updated = true
      }
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
