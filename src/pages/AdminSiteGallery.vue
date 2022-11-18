<script setup>
import { ref, onMounted, computed } from 'vue'
import services from '@/services'

const mosaic = ref(null);
const targetImage = ref(null);

onMounted (async () => {
  await services.getImages(props.event_id).then((res) => {
    console.log("🚀 ~ file: AdminSiteGallery.vue ~ line 7 ~ awaitservices.getImages ~ res", res)
    mosaic.value = {
      ...res,
      images: res.images.map(item => { return { ...item, selected: true}})
    }
  })
})

const props = defineProps({
  event_id: String
})

const totalImages = computed(() => {
  return mosaic?.value?.images?.length
})

const selectedImages = computed(() => {
  return mosaic?.value?.images?.filter(item => item.selected).length
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
        <q-toolbar-title>{{mosaic?.eventName}}</q-toolbar-title>
      </q-toolbar>
      <section>
        <div class="q-pa-md">
          <q-uploader 
            v-model="targetImage"
            label="Upload Target Image"
            :multiple="false"
            :no-thumbnails="true"
            accept=".jpg, image/*" 
            color="primary" 
            flat 
            bordered 
            ref="targetPhotoUpload" 
            class="full-width"
          >
          </q-uploader>
        </div>
      </section>
      <section v-if="total_images" style="display: flex; flex-direction: row; justify-content: flex-end;">
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
      </section>
      <section v-if="!totalImages" style="display: flex; flex-direction: row; justify-content: center; padding-top: 50px;">
        <div>No photos have been submitted yet.</div>
      </section>
      <div class="s-gallery__inner">
        <div class="c-gallery__list row">
            <q-card class="c-gallery__item my-card" v-if="mosaic?.images.length > 0" v-for="image in mosaic?.images">
                <img :src="`http://localhost:3000/${image?.path}${image?.filename}`">
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
