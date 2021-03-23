<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style lang="scss">
@import "vue-select/src/scss/vue-select.scss";
@import "./styles/variables.scss";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  router-view {
    max-width: 960px;
    margin: auto;
  }
}
body {
  margin: 0;
  background-color: $color-coffee;
}

.vs__dropdown-toggle {
  background: white;
}

</style>
