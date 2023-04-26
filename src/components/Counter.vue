<script setup>
import Progress from './Progress.vue';
import { getCandidates, getTotalComo, votesPerCandidates } from '../contract';
</script>

<template>
  <div id="counter">
    <Progress color="green" :percentage="Math.round(currentComo / totalComo * 100) + '%'" :label="currentComo + '/' + totalComo"/>
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
        currentComo: 0
    }
  },
  created() {
    this.setProgress()
  },
  methods: {
    async setProgress() {
      this.candidates = await getCandidates(this.pollId)
      this.totalComo = await getTotalComo(this.pollId)
      this.votes = await votesPerCandidates(this.pollId)
      this.currentComo = this.votes.reduce((a, b) => a + b, 0)
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
</style>
