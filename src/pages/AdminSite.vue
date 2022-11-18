<script setup>
import services from '@/services'
import { useQuasar } from 'quasar'
import { ref, computed, watch } from 'vue'

const $q = useQuasar()

function onDialogOK () {
  if (!eventName.value) {
    $q.notify({
      type: 'negative',
      message: 'Event name is required'
    })
    return    
  }

  services.createEvent(eventName.value).then((res) => {
    $q.notify({
      type: 'positive',
      message: 'The event was created successfully!'
    })

    events.value.push(res);
    modal.value = false;
    eventName.value = '';
  })
}

services.getEvents().then((res) => { events.value = res})

function onRejected (rejectedEntries) {
  // Notify plugin needs to be installed
  // https://quasar.dev/quasar-plugins/notify#Installation
  $q.notify({
    type: 'negative',
    message: `${rejectedEntries.length} file(s) did not pass validation constraints`
  })
}

const events = ref([])
const modal = ref(false)
const eventName = ref('')
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


</script>

<template>
  <q-page padding>
    <section class="s-events__forum">   
      <q-dialog ref="dialogRef" v-model="modal" class="q-py-md q-mb-md">
        <q-card style="width: 800px">

          <q-toolbar class="q-pt-lg q-px-lg">
            <q-toolbar-title class="text-weight-medium">
              Add Event
            </q-toolbar-title>
            <q-btn
              flat
              round
              dense
              color="negative"
              icon="mdi-close"
              @click="modal = false"
            />
          </q-toolbar>
          <q-separator spaced inset vertical />
          <q-card-section class="q-px-lg">
            <q-form>
              <div class="row q-col-gutter-md">
                <div class="col-12">
                  <q-input
                    filled
                    v-model="eventName"
                    label="Event Name *"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Please type something']"
                  />
                </div>
              </div>
            </q-form>
          </q-card-section>
          <q-card-section>
          <div class="row q-gutter-md justify-end">
            <q-btn
              color="dark"
              label="Cancel"
              outline
              @click="modal = false"
              no-caps
              unelevated
            />
            <q-btn
              color="dark"
              label="Create"
              @click="onDialogOK"
              no-caps
              unelevated
            />
          </div>
        </q-card-section>
        </q-card>
      </q-dialog>
    </section>
    <q-toolbar class="q-mb-md">
      <q-toolbar-title>Events</q-toolbar-title>  
      <div class="q-gutter-sm">
          <q-btn class="q-px-lg" unelevated color="primary" icon="mdi-plus-box" label="Add Event" no-caps @click="modal = true"/>
        </div>    
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
              <q-img src="https://cdn.quasar.dev/img/mountains.jpg">
                <div class="absolute-bottom text-h6">
                  {{props.row.eventName}}
                </div>

              </q-img>
              <q-card-actions>
                <q-btn class="c-events__view" flat color="primary" :to="`admin/${props.row.id}`">View</q-btn>
              </q-card-actions>
            </q-card>
          </div>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

