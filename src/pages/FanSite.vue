<script setup>
import { ref, computed, watch } from 'vue'
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

function getItemsPerPage () {
  if ($q.screen.lt.sm) return 3
  if ($q.screen.lt.md) return 6
  return 9
}
const filter = ref('')
const pagination = ref({
  page: 1,
  rowsPerPage: getItemsPerPage()
})
watch(() => $q.screen.name, () => {
  pagination.value.rowsPerPage = getItemsPerPage()
})
watch(() => events, () => {
  events.sort(() => (events.eventName > events.eventName) ? -1 : 1)
})

const getTargetImage = (path, filename) => {
  if (path && filename) {
    return "http://localhost:3000" + path + filename
  }
  return "public/placeholder.jpeg";
}

</script>

<template>
  <q-page padding> 
    <q-toolbar class="q-mb-md">
      <q-toolbar-title>Fan Campaigns</q-toolbar-title>
    </q-toolbar>


    <div class="q-pa-md">
      <q-table
        grid
        :card-container-class="cardContainerClass"
        :rows="events"
        :columns="columns"
        row-key="name"
        :filter="filter"
        hide-header
        v-model:pagination="pagination"
        :rows-per-page-options="rowsPerPageOptions"
      >
        <template v-slot:top-right>
          <q-input class="q-mr-md" borderless dense debounce="300" v-model="filter" placeholder="Search">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
          
        </template>

        <template v-slot:item="props">
          <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
            <q-card flat bordered class="col-xs-12 col-sm-4 col-md-3">
              <q-img :src="getTargetImage(props.row.targetPath, props.row.targetFilename)">
                <div class="absolute-bottom text-h6">
                  {{props.row.eventName}}
                </div>

              </q-img>
              <q-card-actions>
                <q-btn class="c-events__view" flat color="primary" :to="`fan/${props.row.id}`">View</q-btn>
              </q-card-actions>
            </q-card>
          </div>
        </template>
      </q-table>
    </div>

    <!-- <section class="s-events">
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
    </section> -->
  </q-page>
</template>
