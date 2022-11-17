<script setup>
import HelloWorld from './components/HelloWorld.vue'
import { ref, reactive } from "vue";
import { useQuasar } from 'quasar'

const $q = useQuasar()
console.log('>>>>>', $q)

const loading = ref(false);

const onSubmit = async () => {
  loading.value = true;
};

function onRejected (rejectedEntries) {
  // Notify plugin needs to be installed
  // https://quasar.dev/quasar-plugins/notify#Installation
  $q.notify({
    type: 'negative',
    message: `${rejectedEntries.length} file(s) did not pass validation constraints`
  })
}


</script>

<!-- <template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
</template> -->


<template>
  <q-layout view="lhh lpR fFf">
    <q-header reveal class="bg-primary text-white">
      <q-toolbar>
       
        <q-toolbar-title> Title </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-drawer show-if-above v-model="leftDrawer" side="left" bordered>
    </q-drawer>
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
                label="Entrar"
                class="col q-py-md"
                no-caps
                unelevated
                :loading="loading"
              />
            </q-card-section>
          </q-card>
        </q-form>
      </q-page>
    </q-page-container>
  </q-layout>
</template>


<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
