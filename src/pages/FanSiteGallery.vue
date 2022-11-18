<template> 
  <q-page padding>
    <q-toolbar class="q-mb-md">
      <q-toolbar-title>Fan Area</q-toolbar-title>
    </q-toolbar>

    <q-form rounded class="q-pb-sm col-xs-12 col-sm-12 col-md-12 q-gutter" @submit="onSubmit()">
      <q-card flat class="q-pt-sm">
        <q-input v-model="fullName" label="Full Name" style="max-width: 400px"/>
        <q-separator spaced inset vertical dark />  

        <q-uploader accept=".jpg, image/*" v-model="testing" multiple @rejected="onRejected" @added="fileAdded" color="primary" flat bordered ref="uploadMosaic" class="full-width">
          <template v-slot:header="scope">
            <div class="row no-wrap items-center q-pa-sm q-gutter-xs">
              <q-btn v-if="scope.uploadedFiles.length > 0" icon="done_all" @click="scope.removeUploadedFiles" round dense flat>
                <q-tooltip>Remove Uploaded Files</q-tooltip>
              </q-btn>
              <q-spinner v-if="scope.isUploading" class="q-uploader__spinner" />
              <div class="col">
                <div class="q-uploader__title">Upload files</div>
                <div class="q-uploader__subtitle">
                  Total size: {{ scope.uploadSizeLabel }}
                  <!-- {{ scope.uploadProgressLabel }} -->
                </div>
              </div>
              <q-btn v-if="scope.canAddFiles" type="a" icon="mdi-plus" @click="scope.pickFiles" round dense flat>
                <q-uploader-add-trigger />
                <q-tooltip>Add file</q-tooltip>
              </q-btn>
              <!-- <q-btn v-if="scope.canUpload" icon="cloud_upload" @click="scope.upload" round dense flat>
              <q-tooltip>Upload Files</q-tooltip>
            </q-btn> -->
              <q-btn v-if="scope.queuedFiles.length > 0" icon="clear_all" @click="scope.removeQueuedFiles" round dense flat>
                <q-tooltip>Clear All</q-tooltip>
              </q-btn>

              <q-btn v-if="scope.isUploading" icon="clear" @click="scope.abort" round dense flat>
                <q-tooltip>Abort Upload</q-tooltip>
              </q-btn>
            </div>
          </template>
          <template v-slot:list="scope">
            <q-list separator padding class="q-pa-sm">
              <q-item v-for="file in scope.files" :key="file.__key" class="q-py-lg">
                <q-item-section>
                  <q-item-label class="full-width ellipsis text-h6">
                    {{ file.name }}
                  </q-item-label>
                  <!-- <q-item-label caption> Status: {{ file.__status }} </q-item-label> -->
                  <q-item-label>Size: {{ file.__sizeLabel }} </q-item-label>
                </q-item-section>

                <q-item-section v-if="file.__img" thumbnail class="gt-xs">
                  <img :src="file.__img.src" />
                </q-item-section>

                <q-item-section top side>
                  <q-btn class="gt-xs" flat color="negative" dense round icon="mdi-trash-can-outline" @click="scope.removeFile(file)" >
                    <q-tooltip>Remove</q-tooltip>
                  </q-btn>
                </q-item-section>
              </q-item>
              <q-card
                flat
                v-if="scope.files.length == 0"
                class="text-center bg-grey-1"
                style="border-radius: 8px; border: 2px dashed rgba(0, 0, 0, 0.12) !important"
              >
                <q-card-section>
                  <q-icon name="mdi-file-document-outline" size="3rem" color="primary" />
                  <div class="text-h6">Drag and drop</div>
                  <div class="text-subtitle2 q-py-xs">OR</div>
                  <q-btn color="primary" unelevated dense no-caps padding="sm lg" label="Select file" @click="scope.pickFiles" />
                </q-card-section>
              </q-card>
            </q-list>
          </template>
        </q-uploader>

        <q-card-section>
          <div class="row q-gutter-md justify-end">
            <q-btn unelevated no-caps label="SUBMIT" color="secondary" type="submit" padding="md xl" :disable="file" />
          </div>
        </q-card-section>
      </q-card>
    </q-form>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import services from '@/services'
      
const $q = useQuasar()

const testing = ref([]);
const fullName = ref('');

const fileAdded = (files) => {
  console.log('---> ', files)
  console.log('object',uploadMosaic.value);
  // $refs.uploadMosaic
}

const onSubmit = () => {
  console.log('fullName', fullName.value);
  console.log('testing', testing.value);
  if (!fullName.value) {
    $q.notify({
      message: 'Please fill out your Full Name',
      color: 'negative',
      position: 'bottom',
      timeout: 2000
    })
    return
  }

  // services.getAll().then((res) => {
  //   console.log(res)
  // })
  services.getImages().then((res) => {
    console.log('>>> ', res)
  })
}

const onRejected = (rejectedEntries) => {
  $q.notify({
    type: 'negative',
    message: `${rejectedEntries.length} file(s) did not pass validation constraints. Only Images are allowed.`
  })
}


const uploadFile = async () => {
  try {
    this.onLoading(true);

    let form = new FormData();
    form.append('campaign_id', this.campaign.id);
    form.append('csv_file', this.file);

    const { data, status } = await this.$http.post(`${this.urlSuperLed}lead/csv`, form, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (status === 200) {
      console.log(data);
      this.$q.notify({
        type: 'positive',
        message: 'Arquivo enviado com sucesso',
      });
      this.$refs.stepper.previous();
      this.campaign = null;
    }
  } catch (error) {
    this.errorNotify(error);
  } finally {
    this.onLoading(false);
  }
}

</script>

