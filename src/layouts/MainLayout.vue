<template>
  <q-layout view="lhh lpR fFf"> 

    <q-header reveal class="bg-primary text-white">
      <q-toolbar>       
        <q-btn flat to="/"><q-toolbar-title>School Name here</q-toolbar-title></q-btn>
        <!-- <q-btn dense flat round icon="menu" to="/" /> -->
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
  import { ref } from 'vue';  
  import { useQuasar } from 'quasar';


  const leftDrawerOpen = ref(false);

  const $q = useQuasar()
  // get status
  console.log($q.dark.isActive) // true, false
  // get configured status
  // console.log($q.dark.mode) // "auto", true, false


</script>

