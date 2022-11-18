<script setup>
import { ref } from 'vue'
import services from '@/services'
import { useQuasar, useDialogPluginComponent } from 'quasar'

const $q = useQuasar()
const { dialogRef, onDialogHide, onDialogCancel } = useDialogPluginComponent()

function onDialogOK () {
  services.createEvent(eventName.value).then((res) => {
    console.log(res)
  })
}

services.getEvents().then((res) => {
    events.value = res
})

defineProps({
  msg: String
})

const emit = defineEmits(['siteChoose'])

const onSubmit = () => {
  console.log('onSubmit')
}

function modal () {
  $q.dialog({
    title: 'Create new Event',
    message: 'Some message'
  }).onOk(() => {
    // console.log('OK')
  }).onCancel(() => {
    // console.log('Cancel')
  }).onDismiss(() => {
    // console.log('I am triggered on both OK and Cancel')
  })
}

function onRejected (rejectedEntries) {
  // Notify plugin needs to be installed
  // https://quasar.dev/quasar-plugins/notify#Installation
  $q.notify({
    type: 'negative',
    message: `${rejectedEntries.length} file(s) did not pass validation constraints`
  })
}

const events = ref([])
const openModal = ref(false)
const eventName = ref('')

</script>

<template>
  <q-page padding>
  <section class="s-events__forum">
    <q-btn class="s-events__form-button" color="primary" label="New Event" @click="openModal = true"/>

    <q-dialog ref="dialogRef" @hide="onDialogHide" v-model="openModal" class="q-py-md q-mb-md">
      <q-card class="q-dialog-plugin q-py-md q-mb-md">
        // event_name (required)
        <q-input
        filled
        v-model="eventName"
        label="Event Name *"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />
      // prize (optional)
        <q-card-actions align="right">
          <q-btn color="primary" label="Create" @click="onDialogOK" />
          <q-btn color="primary" label="Cancel" @click="onDialogCancel" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </section>
    <section class="s-events">
      <h2 class="section-title">Events (pending)</h2>
      <div class="s-events__inner row">
        <q-card class="c-events__item my-card" v-for="event in events">
          <img src="https://cdn.quasar.dev/img/mountains.jpg">

          <q-card-section>
            <div class="c-events__title text-h6">{{event.eventName}}</div>
          </q-card-section>

          <q-card-actions>
            <q-btn class="c-events__view" flat color="primary" :to="`admin/${event.id}`">View</q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </section>
  </q-page>
</template>

<style scoped>
.s-events {}
.s-events__inner {}
.my-card {width: calc(25% - 16px); margin: 8px;}
</style>
