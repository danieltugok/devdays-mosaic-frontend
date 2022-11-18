<script setup>
import { ref, onMounted } from 'vue'
import services from '@/services'
import { TouchRepeat } from 'quasar';

onMounted (async () => {
  await services.getImages(props.event_id).then((res) => {
    images.value = res.map(item => {
      return {
        ...item,
        selected: true
      }
    })
  })
})

const props = defineProps({
  event_id: String
})

function onRejected (rejectedEntries) {
  $q.notify({
    type: 'negative',
    message: `${rejectedEntries.length} file(s) did not pass validation constraints`
  })
}

const images = ref([]);

</script>

<template>
  <q-page padding>
    <section class="s-gallery">
      <h2 class="section-title">Title of Event - {{event_id}}</h2>
      <div class="s-gallery__inner">
        <div class="c-gallery__data row">
            <q-card class="my-card">
                <q-card-section class="row">

                    <q-icon name="style" size="3em"/>

                    <div class="column">
                        <span>{{total}}1200</span>
                    <span>Total Images</span>
                    </div>

                </q-card-section>
            </q-card>
            <q-card class="c-gallery__card my-card">
                <q-card-section class="row">
                    <q-icon name="style" size="3em"/>

                    <div class="column">
                        <div class="row"><span>{{selected}} 300</span> / <span>500</span></div>
                        <span>Selected Images</span>
                    </div>
                </q-card-section>
            </q-card>
        </div>

        <div class="c-gallery__list row">
            <q-card class="c-gallery__item my-card" v-for="image in images">
                <img :src="`${image.path}${image.filename}`">
                <q-checkbox class="c-gallery__checkbox" v-model="image.selected" :val="image.id" color="blue" keep-color>
                </q-checkbox>
            </q-card>
        </div>

        <q-btn class="c-gallery__submit" color="primary" label="Primary" />

        <pre>{{ images }}</pre>
      </div>
    </section>
  </q-page>
</template>

<style scoped>

.section-title {font-size: 2rem; }
.c-gallery__data {}
.c-gallery__list {padding: 32px 0; height: 300px; overflow: auto;}
.c-gallery__submit {}

.c-gallery__item {position: relative;}
.c-gallery__checkbox {position: absolute; bottom: 0; right: 0;}
.my-card {width: calc(25% - 16px); margin: 8px;}
</style>
