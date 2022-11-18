<script setup>
import { ref, onMounted, computed } from 'vue'
import { useQuasar } from 'quasar'
import services from '@/services'

const mosaic = ref(null);
const targetImage = ref(null);

const targetFile = ref(null);

const targetFilePreview = ref({});

const $q = useQuasar()

onMounted (async () => {
  await services.getImages(props.event_id).then((res) => {
    console.log("🚀 ~ file: AdminSiteGallery.vue ~ line 7 ~ awaitservices.getImages ~ res", res)
    mosaic.value = {
      ...res,
      images: res.images.map(item => { return { ...item, selected: true}})
    }

    targetFilePreview.value = { targetPath: res.targetPath, targetFilename: res.targetFilename };
    console.log(targetFilePreview);
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

const getTargetImage = (path, filename) => {
  if (path && filename) {
    return "http://localhost:3000" + path + filename
  }
  return "../public/placeholder.jpeg";
}

const uploadTargetImage = async () => {
  let formData = new FormData();
  formData.append("image", targetFile.value[0])
  var res = await services.uploadTargetImage(formData, props.event_id);

  targetFilePreview.value = null;
  targetFilePreview.value = { targetPath: res.targetPath, targetFilename: res.targetFilename };

  $q.notify({
      message: 'Successfully uploaded target image',
      color: 'positive',
      position: 'bottom',
      timeout: 2000
    })
}


const fileAdded = (file) => {
  targetFile.value = file;
}

const fileRemoved = (file) => {
  targetFile.value = null;
}


const generateMosaic = async() => {
  await services.generateMosaic(props.event_id);
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
          <div style="display: flex; flex-direction: row; justify-content: center; width: 100%;">
            <q-img style="max-width: 35%; margin-bottom: 20px;" :src="getTargetImage(targetFilePreview.targetPath, targetFilePreview.targetFilename)">
            </q-img>
          </div>
          <q-uploader 
            v-model="targetImage"
            label="Upload Target Image"
            :no-thumbnails="true"
            @added="fileAdded"
            @removed="fileRemoved"
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
      <div class="row q-gutter-md justify-end">
        <q-btn unelevated no-caps @click="uploadTargetImage" label="Upload" color="secondary" type="submit" style="margin-bottom: 20px; margin-right: 20px;" :disable="targetFile === null" />
      </div>
      <q-separator></q-separator>
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
        <q-btn class="c-gallery__submit" color="primary" label="Generate" @click="generateMosaic"/>
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
