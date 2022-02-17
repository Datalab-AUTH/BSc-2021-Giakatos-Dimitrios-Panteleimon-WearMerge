<template>
  <div class="main-body">
    <v-container fluid class="hero">
          <v-row>
            <v-col cols="12" sm="5" md="5" lg="6" class="pa-2 px-16 mt-auto mb-auto">
              <div mx-auto class="pt-12">
              <h1 class="hero-title-h1">WearMerge</h1>
              <h2 class="hero-title-h2">Working with heterogeneous wearables data made easy</h2>
              </div>
            </v-col>
            <v-col cols="12" sm="7" md="7" lg="6" class="pa-2 pl-10">
              <div class="float-right">
              <img src="/wearmerge_heroimg.png"
              alt="WearMerge hero image"
              class="hero-img"
              />
              </div>
            </v-col>
          </v-row>
    </v-container>
    <v-container justify="center" fluid class="info-section py-16">
      <v-container>
        <v-row justify="center" class="pb-6 px-16">
          <h2>Accelerating Research</h2>
        </v-row>
        <v-row justify="center" class="pb-10 px-10 px-16">
          <p>An open-source tool to help you with your wearables research. With WearMerge you can:</p>
        </v-row>
        <v-row class="d-flex mb-6 justify-space-between px-16">
          <v-col class="text-center" cols="12" md="4" lg="4" xl="4">
            <v-icon large style="color: #fdc800;" class="pb-5">fa fa-cloud-upload</v-icon>
            <h2>Upload</h2>
            <p>Upload data from different wearable devices with our easy-to-use form</p>
          </v-col>
          <v-col class="text-center" cols="12" md="4" lg="4" xl="4">
            <v-icon large style="color: #fdc800;" class="pb-5">fa fa-cogs</v-icon>
            <h2>Integrate</h2>
            <p>WearMerge verifies, integrates, and standardizes all your data into the Open mHealth format</p>
          </v-col>
          <v-col class="text-center" cols="12" md="4" lg="4" xl="4">
            <v-icon large style="color: #fdc800;" class="pb-5">fa fa-area-chart</v-icon>
            <h2>Visualize</h2>
            <p>Export your integrated data files and explore basic visualizations through the WearMerge platform</p>
          </v-col>
        </v-row>
      </v-container>
    </v-container>
    <v-container class="page">
      <v-stepper v-model="e1">
        <v-stepper-header>
          <v-stepper-step :complete="e1 > 1" step="1">
            Personal information
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :complete="e1 > 2" step="2">
            Select your folders
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :complete="e1 > 3" step="3"> Uploading </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :complete="e1 === 4" step="4"> Summary </v-stepper-step>
        </v-stepper-header>
        <v-stepper-items>
          <validation-observer ref="observer" v-slot="{ invalid }">
            <v-form @submit.prevent="onSubmit">
              <v-stepper-content step="1">
                <validation-provider
                  v-slot="{ errors }"
                  name="E-mail"
                  rules="required|email"
                >
                  <v-text-field
                    v-model="email"
                    :error-messages="errors"
                    label="E-mail"
                    required
                    outlined
                    class="pt-1"
                  ></v-text-field>
                </validation-provider>
                <v-btn
                  color="primary"
                  class="mr-2"
                  :disabled="invalid"
                  @click="e1 = 2"
                >
                  Continue
                </v-btn>
              </v-stepper-content>
              <v-stepper-content step="2">
                <v-data-table
                  :headers="headers"
                  :items="folders"
                  sort-by="folder"
                >
                  <template #top>
                    <v-toolbar flat outlined>
                      <v-toolbar-title> Selected folder(s) </v-toolbar-title>
                      <v-divider class="mx-4" inset vertical></v-divider>
                      <v-spacer></v-spacer>
                      <input
                        ref="uploadBox"
                        type="file"
                        style="display: none"
                        multiple
                        webkitdirectory
                        @change="onChange"
                      />
                      <v-btn
                        :loading="isSelectingFolders"
                        class="mr-2"
                        color="success"
                        @click="onAdd"
                      >
                        Add folder
                      </v-btn>
                      <v-btn color="error" @click="onClear">Clear</v-btn>
                    </v-toolbar>
                  </template>
                  <template #[`item.action`]="{ item }">
                    <v-icon small color="red" @click="onDelete(item.folder)">
                      mdi-delete
                    </v-icon>
                  </template>
                </v-data-table>
                <v-btn color="primary" class="mr-2" @click="e1 = 1"> Back </v-btn>
                <v-btn
                  color="success"
                  :disabled="invalid || !files.length"
                  type="submit"
                  @click="e1 = 3"
                >
                  Submit
                </v-btn>
                <br />
                <span>
                  By submitting, you agree to our
                  <NuxtLink to="terms-of-service">Terms of Service</NuxtLink> and
                  <NuxtLink to="privacy-and-cookie"
                    >Privacy &amp; Cookie Statement</NuxtLink
                  >.
                </span>
              </v-stepper-content>
            </v-form>
          </validation-observer>
          <v-stepper-content step="3">
            <v-progress-linear v-model="progress" height="25">
              <strong>{{ progress }} %</strong>
            </v-progress-linear>
          </v-stepper-content>
          <v-stepper-content step="4">
            <strong>{{ folders.length }} folder(s)</strong> have uploaded.<br />
            Check your inbox. Soon you will recieve an email from us.<br />
            Thank you for using our service.
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-container>
  </div>
</template>

<script>
import { required, email } from 'vee-validate/dist/rules'
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from 'vee-validate'

setInteractionMode('eager')

extend('required', {
  ...required,
  message: '{_field_} cannot be empty',
})

extend('email', {
  ...email,
  message: 'E-mail must be valid',
})

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      headers: [
        {
          text: 'Folder',
          aligb: 'start',
          sortable: true,
          value: 'folder',
        },
        { text: 'Action', value: 'action', sortable: false },
      ],
      e1: 1,
      valid: false,
      email: '',
      files: [],
      folders: [],
      progress: 0,
      isSelectingFolders: false,
    }
  },
  methods: {
    async onSubmit() {
      const formData = new FormData()
      formData.append('email', this.email)
      this.files.forEach((file) => {
        formData.append(
          file.webkitRelativePath.replace('/' + file.name, ''),
          file
        )
      })
      await this.$axios.$post('upload-file', formData, {
        onUploadProgress: (progressEvent) => {
          this.progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          )
          if (this.progress === 100) {
            this.e1 = 4
          }
        },
      })
    },
    onAdd() {
      this.isSelectingFolders = true
      window.addEventListener(
        'focus',
        () => {
          this.isSelectingFolders = false
        },
        { once: true }
      )
      this.$refs.uploadBox.click()
    },
    onChange(e) {
      const selectedFiles = [...e.target.files]
      this.folders.push({
        folder: selectedFiles[0].webkitRelativePath.split('/')[0],
      })
      this.files = this.files.concat(selectedFiles)
      e.target.value = ''
    },
    onClear() {
      this.files = []
      this.folders = []
    },
    onDelete(folderName) {
      this.folders.splice(
        this.folders.findIndex((e) => e.folder === folderName)
      )
      this.files = this.files.filter(
        (e) => e.webkitRelativePath.split('/')[0] !== folderName
      )
    },
  },
}
</script>

<style>
.main-body {
  position: relative;
  margin-bottom: 10vh;
}
.v-carousel {
  height: calc(100vh - 48px) !important;
}
.v-window-item {
  position: absolute;
  top: 0;
  width: 100%;
}
.tag {
  height: calc(100vh - 48px);
  width: 100%;
}
.form-card {
  position: absolute;
  z-index: 1;
  top: 15%;
  left: 5%;
  width: 100%;
  max-width: 500px;
}
.page {
  padding-left: 10% !important;
  padding-right: 10% !important;
  padding-bottom: 6% !important;
  padding-top: 6% !important;
}

.hero {
  padding: 0;
  margin: 0;
  height: 65vh;
}

.hero-img {
  max-height: 60vh !important;
}

.hero-title-h1 {
  font-size: 3em !important;
  color: #032b44 !important;
}

.hero-title-h2 {
  font-size: 1.8em !important;
  color: #04d89d !important;
}

@media screen and (min-width: 601px) and (max-width: 960px){
  .hero {
    height: 50vh !important;
  }
  .hero-img {
    max-height: 42vh !important;
  }
  .hero-title-h1 {
  font-size: 2.0em !important;
  }
  .hero-title-h2 {
  font-size: 1.3em !important;
  }
}

@media screen and (max-width: 600px) {
  .hero {
    height: 75vh !important;
  }
  .hero-img {
    max-height: 52vh !important;
  }
  .hero-title-h1 {
  font-size: 2.0em !important;
  text-align: center !important;
  }
  .hero-title-h2 {
  font-size: 1.3em !important;
  text-align: center !important;
  }
}

.info-section {
  background: #f4f4f4 !important;
}
.info-section h2 {
  color: #032b44 !important;
}
</style>
