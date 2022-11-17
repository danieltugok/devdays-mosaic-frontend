<script setup>
// import AdminSite from './components/AdminSite.vue'
// import FanSite from './components/FanSite.vue'
// import { ref, reactive } from "vue";
// import { useQuasar } from 'quasar'

// const $q = useQuasar()
// console.log('>>>>>', $q)

// const siteChoose = ref("");
</script>

<template>
  <!-- <div 
    class="q-pa-md"
    v-if="siteChoose ===''"
  >
    <q-btn-group spread style="width: 700px">
      <q-btn color="purple" label="Admin" icon="timeline" @click="siteChoose = 'admin'"/>
      <q-btn color="purple" label="Fan" icon="visibility" @click="siteChoose = 'fan'" />
    </q-btn-group>
  </div>

  <AdminSite  v-if="siteChoose ==='admin'" @siteChoose="siteChoose = ''"/>
  <FanSite v-if="siteChoose ==='fan'" @siteChoose="siteChoose = ''" /> -->

  <router-view />

</template>


<style scoped>

</style>
