<template>
  <div>
    <header class="after-header">
      <v-row justify="center">
        <h1 class="heading h2">HOW IT WORKS</h1>
      </v-row>
    </header>
    <section class="section page">
      <v-row justify="center">
        <v-col v-for="(item, i) in items" :key="i" class="col-body">
          <v-card class="card">
            <v-img height="300" contain class="align-end" :src="item.img"></v-img>
            <v-card-title>{{ item.title }}</v-card-title>
            <v-card-text>
              <p v-html="item.text">{{ item.text }}</p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          img: '/how-it-works/img1.jpg',
          title: 'Simple upload form',
          text:
            'We provide a simple upload form in order to use our free service. Just fill your email, select your data folders* and you are ready. We support data from Apple, Garmin, Fitbit, Huawei, Samsung and Xiaomi.<br /><i>*Each data folder must match to a seperated brand.</i>',
        },
        {
          img: '/how-it-works/img2.jpg',
          title: 'Security',
          text:
            'Your data is safe. We delete your uploaded data after the completion of transformation. Your transformed data will be delete from our database in 7 days. We do not use any personal information that exist in the uploaded data.',
        },
        {
          img: '/how-it-works/img3.jpg',
          title: 'Transformation',
          text:
            'We transform your data with the open source schema <a href="https://www.openmhealth.org/">Open mHealth</a>. So, you will not need to examine each wearable brand separated.',
        },
        {
          img: '/how-it-works/img4.jpg',
          title: 'Data export',
          text:
            'After the data transformation you will recieve an email from us with the download link to download your merged data. We provode seperated csv files for each data category for simple import into your favorite stats software.',
        },
        {
          img: '/how-it-works/img5.jpg',
          title: 'Data visualization (Alpha version)',
          text:
            'Do you want to get live stats in your data but you do not want to get mess with other softwares? Our data visualization offer you a variety of ways to view different data types.',
        },
      ],
    }
  },
}
</script>

<style>
.after-header {
  padding-top: 100px;
  padding-bottom: 80px;
  background: #fdc800;
}
.section {
  padding-top: 92px;
  padding-bottom: 92px;
}
.card {
  width: 500px;
  height: 500px;
}
.col-body {
  flex-grow: 0 !important;
}
.page {
  padding-left: 10% !important;
  padding-right: 10% !important;
  padding-bottom: 6% !important;
  padding-top: 6% !important;
}
</style>
