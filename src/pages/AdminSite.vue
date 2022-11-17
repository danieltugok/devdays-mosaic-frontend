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
      <h2 class="section-title">Events (pending)</h2>
      <div class="s-events__inner row">
        <q-card class="c-events__item my-card">
          <img src="https://cdn.quasar.dev/img/mountains.jpg">

          <q-card-section>
            <div class="c-events__title text-h6">Lorem ipsum dolor sit amet.</div>
            <div class="c-events__date text-subtitle2">November, 7th. 2022</div>
          </q-card-section>

          <q-card-actions>
            <q-btn class="c-events__view" flat color="primary" to="admin/gallery">View</q-btn>
          </q-card-actions>
        </q-card>
        <q-card class="c-events__item my-card">
          <img src="https://cdn.quasar.dev/img/mountains.jpg">

          <q-card-section>
            <div class="c-events__title text-h6">Lorem ipsum dolor sit amet.</div>
            <div class="c-events__date text-subtitle2">November, 7th. 2022</div>
          </q-card-section>

          <q-card-actions>
            <q-btn class="c-events__view" flat color="primary">View</q-btn>
          </q-card-actions>
        </q-card>
        <q-card class="c-events__item my-card">
          <img src="https://cdn.quasar.dev/img/mountains.jpg">

          <q-card-section>
            <div class="c-events__title text-h6">Lorem ipsum dolor sit amet.</div>
            <div class="c-events__date text-subtitle2">November, 7th. 2022</div>
          </q-card-section>

          <q-card-actions>
            <q-btn class="c-events__view" flat color="primary">View</q-btn>
          </q-card-actions>
        </q-card>
        <q-card class="c-events__item my-card">
          <img src="https://cdn.quasar.dev/img/mountains.jpg">

          <q-card-section>
            <div class="c-events__title text-h6">Lorem ipsum dolor sit amet.</div>
            <div class="c-events__date text-subtitle2">November, 7th. 2022</div>
          </q-card-section>

          <q-card-actions>
            <q-btn class="c-events__view" flat color="primary">View</q-btn>
          </q-card-actions>
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
