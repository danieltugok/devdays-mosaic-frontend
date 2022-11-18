<script setup>
import { ref, computed } from 'vue'
import services from '@/services'
import { useQuasar } from 'quasar'

const $q = useQuasar()

services.getEvents().then((res) => { events.value = res})

const onSubmit = () => {
  console.log('onSubmit')
}

function onRejected (rejectedEntries) {
  $q.notify({
    type: 'negative',
    message: `${rejectedEntries.length} file(s) did not pass validation constraints`
  })
}

const events = ref([])
const modal = ref(false)
const eventName = ref('')

const getTargetImage = (path, filename) => {
  if (path && filename) {
    return path + filename
  }
  return "public/placeholder.jpeg";
}

</script>

<template>
  <q-page padding> 
    <q-toolbar class="q-mb-md">
      <q-toolbar-title>Fan Campaigns</q-toolbar-title>
    </q-toolbar>

    <section class="s-events">
      <div class="justify-center q-pa-md row items-start q-gutter-md">
        <template v-if="events.length === 0">
          <span>No campaigns to display.</span>
        </template>
        <q-card flat bordered class="col-xs-12 col-sm-4 col-md-3" v-for="event in events">
          <q-img :src="getTargetImage(event.targetPath, event.getTargetImage)">
            <div class="absolute-bottom text-h6">
              {{event.eventName}}
            </div>

          </q-img>
          <q-card-actions>
            <q-btn class="c-events__view" flat color="primary" :to="`fan/${event.id}`">View</q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </section>
  </q-page>
</template>
