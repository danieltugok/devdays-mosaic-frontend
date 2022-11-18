<script setup>

</script>

<template>
  <div class="container">
      <q-btn class="btn__content" color="orange" label="Admin" icon="mdi-shield-crown" to="/admin" height=""/>
      <q-btn class="btn__content" color="info" label="Fan" icon="mdi-account-group" to="/fan" />
  </div>
</template>

<style >
  html {min-height: 100vh !important;}
  body {min-height: 100vh !important;}
  div#app {min-height: 100vh !important;}

</style>
<style scoped>
  .container {min-height: 100vh; display: flex; justify-content: center; align-items: center; gap: 34px; }
  .btn__content{ color: black; font-size: 2rem;}
  .q-btn-item {flex: 0 0 400px; height: 400px;}

</style>
