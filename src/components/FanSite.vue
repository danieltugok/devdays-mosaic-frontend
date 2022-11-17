<template>
  <q-layout 
    view="lhh lpR fFf"
  > 
  <q-page-container>
  <q-page :style-fn="myTweak" padding>
    <q-toolbar class="q-px-none">
      <q-toolbar-title class="text-weight-bold" :class="isDark ? 'text-white' : 'text-primary-dark'">{{ SUPERLEAD }}</q-toolbar-title>
    </q-toolbar>
    <q-form @submit="importPreview()">
      <q-card flat :class="isDark ? 'q-bordered-primary-dark ' : 'q-bordered-primary'" class="q-pt-sm">
        <q-stepper v-model="step" ref="stepper" alternative-labels color="secondary" animated>
          <q-step :name="1" :title="IMPORT_CSV" icon="mdi-file-upload-outline" :done="step > 1">
            <div class="q-py-md">{{ CORRECT_FORMAT }}<a href="/files/model_super_lead.csv" download>Download</a></div>
            <q-select
              outlined
              v-model="campaign"
              :loading="loadingCampaigns"
              :options="campaings"
              option-value="id"
              option-label="name"
              autofocus
              class="q-mb-md"
              :label="CAMPAIGNS"
              :bg-color="isDark ? '' : 'white'"
              :label-color="isDark ? '' : 'secondary'"
              style="max-width: 400px"
              :rules="[isRequired]"
            >
              <template v-slot:selected-item="scope">
                {{ scope.opt.name }}
              </template>
              <template v-slot:option="scope">
                <q-item v-bind="scope.itemProps">
                  <q-item-section>
                    <q-item-label>{{ scope.opt.name }}</q-item-label>
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
            <q-uploader accept=".jpg" @rejected="onRejected" :factory="factoryFn" color="secondary" flat bordered ref="uploadSuperLead" class="full-width">
              <template v-slot:header="scope">
                <div class="row no-wrap items-center q-pa-sm q-gutter-xs">
                  <q-btn v-if="scope.uploadedFiles.length > 0" icon="done_all" @click="scope.removeUploadedFiles" round dense flat>
                    <q-tooltip>Remove Uploaded Files</q-tooltip>
                  </q-btn>
                  <q-spinner v-if="scope.isUploading" class="q-uploader__spinner" />
                  <div class="col">
                    <div class="q-uploader__title">{{ UPLOAD_FILE }}</div>
                    <div class="q-uploader__subtitle">
                      {{ scope.uploadSizeLabel }}
                      <!-- {{ scope.uploadProgressLabel }} -->
                    </div>
                  </div>
                  <q-btn v-if="scope.canAddFiles" type="a" icon="mdi-plus" @click="scope.pickFiles" round dense flat>
                    <q-uploader-add-trigger />
                    <q-tooltip>{{ ADD_FILE }}</q-tooltip>
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
                      <q-item-label>{{ SIZE }} {{ file.__sizeLabel }} </q-item-label>
                    </q-item-section>

                    <q-item-section v-if="file.__img" thumbnail class="gt-xs">
                      <img :src="file.__img.src" />
                    </q-item-section>

                    <q-item-section top side>
                      <q-btn class="gt-xs" flat color="negative" dense round icon="mdi-trash-can-outline" @click="scope.removeFile(file)" />
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
                      <div class="text-h6">DRAG_AND_DROP</div>
                      <div class="text-subtitle2 q-py-xs">OR </div>
                      <q-btn color="primary" unelevated dense no-caps padding="sm lg" label="SELECT FILE" @click="scope.pickFiles" />
                    </q-card-section>
                  </q-card>
                </q-list>
              </template>
            </q-uploader>
          </q-step>
          <q-step :name="2" :title="VIEW_INFORMATION" icon="mdi-text-box-check-outline" :done="step > 2">
            <q-table title="Pre-visualizar" :rows="data" :columns="columns" flat :pagination="initialPagination" />
          </q-step>
        </q-stepper>
        <q-card-section>
          <div class="row q-gutter-md justify-end">
            <q-btn
              flat
              unelevated
              label="Voltar"
              class="q-bordered-secondary"
              v-if="step === 2"
              color="white"
              text-color="secondary"
              no-caps
              @click="$refs.stepper.previous()"
              padding="md xl"
            />
            <q-btn v-if="step !== 1" unelevated no-caps label="Importar" color="secondary" @click="uploadFile()" padding="md xl" />
            <q-btn v-else unelevated no-caps :label="ADVANCE" color="secondary" type="submit" padding="md xl" :disable="file" />
          </div>
        </q-card-section>
      </q-card>
    </q-form>
  </q-page>
</q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'SuperLeadPage',
  data() {
    return {
      step: 1,
      columns: [],
      file: null,
      data: [],
      loadingCampaigns: false,
      campaign: null,
      campaings: [],
      initialPagination: {
        sortBy: 'desc',
        descending: false,
        rowsPerPage: 10,
      },
    };
  },
  computed: {
    urlSuperLed() {
      return process.env.NODE_ENV === 'development' ? 'https://superlead.hmg.afilio.com.br/api/' : 'https://superlead.afilio.com.br/api/';
    },
  },
  methods: {
    myTweak(offset) {
      return { minHeight: offset ? `calc(100vh - ${offset}px)` : '100vh', padding: `${this.isMobile ? '12px 16px' : '24px 48px'}` };
    },
    async getCampaignsFilter() {
      this.loadingCampaigns = true;
      try {
        const { data, status } = await this.$http.get('/redirect?app=ADVERTISER&path=/api/dashboard/campaigns');
        if (status === 200) this.campaings = data;
      } catch (error) {
        console.log(error);
      } finally {
        this.loadingCampaigns = false;
      }
    },
    importPreview() {
      if (this.step === 1) this.$refs.uploadSuperLead.upload();
      if (this.step === 2) this.importSuperLead();
    },
    onRejected(rejectedEntries) {
      this.$q.notify({
        type: 'negative',
        message: `${rejectedEntries} file(s) did not pass validation constraints`,
      });
    },
    async factoryFn(files) {
      const [file] = files;
      this.file = file;
      let readCsv = await new FileReader();
      readCsv.readAsText(file);
      readCsv.onload = () => {
        let csvList = readCsv.result.split('\n');
        let columns = csvList[0]
          .replace('\r\n', '')
          .split(',')
          .map((item) => ({
            name: item.replaceAll('"', ''),
            label: "jh",
            field: item.replaceAll('"', ''),
            align: 'left',
          }))
          .filter((item) => item.name !== 'id_channel');
        let data = csvList
          .filter((item, index) => index !== 0)
          .map((item) =>
            item
              .replace('\r', '')
              .split(',')
              .map((item, index) => ({
                [columns[index]?.field]: item.replaceAll('"', ''),
              }))
          )
          .map((item) => Object.assign({}, ...item));
        this.columns = columns;
        this.data = data;
      };
      this.$refs.stepper.next();
    },
    async uploadFile() {
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
    },
  },
  created() {
    this.getCampaignsFilter();
  },
};
</script>
