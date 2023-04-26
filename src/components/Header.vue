<template>
  <header>
    <h1>Newton <a href="https://github.com/kuiperdog/newton">v{{ version }}</a></h1>
    <h1>by <a href="https://twitter.com/kuipertwt">@kuipertwt</a></h1>
  </header>
</template>

<script>
export default {
  data() {
    return {
      id: new URLSearchParams(window.location.search).get('id'),
      version: __PACKAGE_VERSION__
    }
  }
}
</script>

<style scoped>
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
</style>
