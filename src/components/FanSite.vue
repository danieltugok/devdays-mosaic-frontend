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
  <q-layout view="lhh lpR fFf"> 
 <q-header reveal class="bg-primary text-white">
      <q-toolbar>       
        <q-toolbar-title>School Name here - Fan site</q-toolbar-title>        
        <q-btn dense flat round icon="menu" @click="emit('siteChoose')" />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <q-page padding class="flex flex-center">
        <q-form @submit="onSubmit" class="q-gutter-md">
          <q-card flat bordered style="width: 448px">
            <q-card-section class="q-gutter-xs q-pa-lg">
            </q-card-section>
            <q-uploader
              url="http://localhost:4444/upload"
              label="Max file size (2k)"
              multiple
              max-file-size="2048"
              @rejected="onRejected"
            />
            <q-card-section class="row items-center q-gutter-sm">
              <q-btn
                type="submit"
                color="primary"
                label="Submit"
                class="col q-py-md"
                no-caps
                unelevated
              />
            </q-card-section>
          </q-card>
        </q-form>
      </q-page>
    </q-page-container>
  </q-layout>

</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
