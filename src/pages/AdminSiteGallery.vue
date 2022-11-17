<script setup>
import { ref } from 'vue'

defineProps({
  msg: String
})

const emit = defineEmits(['siteChoose'])

const onSubmit = () => {
  console.log('onSubmit')
}

function onRejected (rejectedEntries) {
  // Notify plugin needs to be installed
  // https://quasar.dev/quasar-plugins/notify#Installation
  $q.notify({
    type: 'negative',
    message: `${rejectedEntries.length} file(s) did not pass validation constraints`
  })
}
</script>

<template>
  <q-page padding>
    <section class="s-events">
      <h2 class="section-title">Title of Event</h2>
      <div class="s-events__inner row">
        <q-card class="c-events__item my-card">
          <img src="https://cdn.quasar.dev/img/mountains.jpg">
          <div class="q-pa-md">
            <q-checkbox v-model="val"></q-checkbox>
        </div>
        </q-card>
      </div>
    </section>
  </q-page>
</template>

<style scoped>
.s-events {}
.s-events__inner {}
.my-card {width: calc(25% - 16px); margin-left: 8px; margin-right: 8px;}
</style>
