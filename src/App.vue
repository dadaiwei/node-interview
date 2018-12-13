<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped>
#app {
  margin: 0px;
  padding: 0px;
  min-height: 500px;
  height: calc(100% - 55px);
}
</style>
