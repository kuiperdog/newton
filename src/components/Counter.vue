<script setup>
import Progress from './Progress.vue';
import { getCandidates, getTotalComo, votesPerCandidates } from '../contract.js';
import json from '../assets/polls.json';
</script>

<template>
  <div id="counter">
    <Progress color="green" :percentage="Math.round(currentComo / totalComo * 100) + '%'" :label="currentComo + '/' + totalComo"/>
    <div id="notifier" v-if="!complete">
      <span :class="{ pulse: updated }" :key="restartPulse" @animationend="updated = false" id="callIndicator">●</span>
      <span>LIVE: Updating once per second</span>
    </div>
    <div class="poll" v-for="poll in polls">
      <h3>{{ poll.name }}</h3>
      <Progress class="optionBar" color="blue" v-for="choice in poll.choices" :percentage="Math.round(choice.votes / totalComo * 100) + '%'"
        :label="choice.name + ' - ' + choice.votes"/>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        polls: json,
        candidateIndex: [],
        totalComo: 1,
        currentComo: 0,
        updated: false,
        restartPulse: false,
        complete: false,
        timer: null
    }
  },
  async created() {
    this.candidateIndex = await getCandidates(this.pollId)
    this.refresh()
    this.timer = setInterval(() => this.refresh(), 1000)
  },
  methods: {
    async refresh() {
      if (this.currentComo < 1)
        this.totalComo = await getTotalComo(this.pollId)
      let votes = await votesPerCandidates(this.pollId)
      let combinedVotes = votes.reduce((a, b) => a + b, 0)

      if (combinedVotes > this.currentComo) {
        this.currentComo = combinedVotes
        this.polls.forEach((poll) => {
          poll.choices.forEach((choice) => {
            let como = 0
            choice.ids.forEach((id) => como += votes[this.candidateIndex.indexOf(id)])
            choice.votes = como
          })
          poll.choices.sort((a, b) => b.votes - a.votes)
        })
      }

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

.poll > h3 {
  margin: 25px;
}
</style>
