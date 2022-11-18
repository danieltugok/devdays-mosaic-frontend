<script setup>

</script>

<template>
  <div class="container">
      <q-btn color="orange" label="Admin" icon="timeline" to="/admin"/>
      <q-btn color="white" label="Fan" icon="visibility" to="/fan" />
  </div>
</template>

<style>
  html {min-height: 100vh !important;}
  body {min-height: 100vh !important;}
  div#app {min-height: 100vh !important;}
  span.q-btn__content{ color: black; font-size: 2rem;}
</style>
<style scoped>
  .container {min-height: 100vh; display: flex; justify-content: center; align-items: center; gap: 34px;}
  .q-btn-item {flex: 0 0 400px; height: 400px;}

</style>
