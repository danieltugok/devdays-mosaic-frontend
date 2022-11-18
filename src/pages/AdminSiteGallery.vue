<script setup>
import { ref, onMounted, computed } from 'vue'
import services from '@/services'

const images = ref(null);

onMounted (async () => {
  await services.getImages(props.event_id).then((res) => {
    console.log("🚀 ~ file: AdminSiteGallery.vue ~ line 7 ~ awaitservices.getImages ~ res", res)
    // imagesApi = res.images.map(item => { return { ...item, selected: true}})
    images.value = res
  })
})

const props = defineProps({
  event_id: String
})

const totalImages = computed(() => {
  return images?.value?.images?.length
})

const selectedImages = computed(() => {
  return images?.value?.images?.filter(item => item.selected).length
})


function onRejected (rejectedEntries) {
  $q.notify({
    type: 'negative',
    message: `${rejectedEntries.length} file(s) did not pass validation constraints`
  })
}


</script>

<template>
  <q-page padding>
    <section class="s-gallery">
      <q-toolbar class="q-mb-md">
      <q-toolbar-title>{{images?.eventName}}</q-toolbar-title>
      <div class="q-gutter-sm">
        <q-card class="bg-primary">
          <q-card-section class="row text-white">
              <q-icon name="style" size="3em" class="q-mr-md"/>
              <div class="column">

                  <div class="row"><span>{{selectedImages}}</span> / <span>{{totalImages}}</span></div>

                  <span>Selected Images</span>
              </div>
          </q-card-section>
        </q-card>
      </div>
    </q-toolbar>
      <div class="s-gallery__inner">
        <div class="c-gallery__list row">
            <q-card class="c-gallery__item my-card" v-if="images?.images.length > 0" v-for="image in images?.images">
                <img :src="`${image?.path}${image?.filename}`">
                <q-checkbox class="c-gallery__checkbox" v-model="image.selected" :val="image.id" color="blue" keep-color/>
            </q-card>
        </div>
        <q-btn class="c-gallery__submit" color="primary" label="Generate" />
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
