<template>
  <div>
    <header class="after-header">
      <v-row justify="center">
        <h1 class="heading h2">ABOUT</h1>
      </v-row>
    </header>
    <section class="section page">
      <v-row justify="center">
        <v-col>
          <p>
            Today, more and more people use wearable devices that include
            various sensors used to take measurements during people's daily
            lives. As a result, people's activities are recorded on these
            devices, which can be accessed through data extraction. However, if
            one tries to read the wearable devices' extracted data, one will
            discover no uniformity in the data. That happens because each
            company exports its user data to its standard, making it impossible
            to consolidate all. For the above reason, the problem of integrating
            data from different wearables is obvious. We try to solve this
            problem in this thesis by developing a web application and an open
            API. However, another step taken was to create class diagrams that
            describe the standards used by the top 6 companies that construct
            wearable devices, which we examine in this thesis. These diagrams
            were made because we had to find out what data these companies
            export to proceed with the implementation of the integration tool.
            Finally, the embedded data use an open-source standard (Open
            mHealth) for their standardization. This approach has the advantage
            that they can be easily used in other applications with the same
            standard after being exported from WearMerge, our thesis web
            application.
          </p>
        </v-col>
      </v-row>
    </section>
    <header class="header">
      <v-row justify="center">
        <h1 class="heading h2">TEAM</h1>
      </v-row>
    </header>
    <section class="section">
      <v-row justify="center">
        <v-col v-for="(item, i) in team" :key="i" class="col-body">
          <v-card class="card-team">
            <v-img contain class="align-end avatar" max-height="200" :src="item.img">
            </v-img>
            <v-card-title>{{ item.name }}</v-card-title>
            <v-card-text>{{ item.text }}</v-card-text>
            <v-card-actions>
              <v-btn v-if="item.github !== ''" icon :href="item.github">
                <v-icon>mdi-github</v-icon>
              </v-btn>
              <v-btn v-if="item.email !== ''" icon :href="item.email">
                <v-icon>mdi-email</v-icon>
              </v-btn>
            </v-card-actions>
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
      team: [
        {
          img: '/avatar/avakali.jpg',
          name: 'Athena Vakali',
          text: 'Professor',
          github: '',
          email: 'mailto:avakali@csd.auth.gr',
        },
        {
          img: '/avatar/syfantidou.jpg',
          name: 'Sofia Yfantidou',
          text: 'Supervisor',
          github: 'https://github.com/syfantid',
          email: 'mailto:s.yfantidou@gmail.com',
        },
        {
          img: '/avatar/sefstathiou.jpg',
          name: 'Stefanos Efstathiou',
          text: 'Supervisor',
          github: 'https://github.com/efstathio',
          email: 'mailto:efstathiou.stefanos@gmail.com',
        },
        {
          img: '/avatar/dgiakatos.jpg',
          name: 'Dimitrios P. Giakatos',
          text: 'Full Stack Developer',
          github: 'https://github.com/dpgiakatos',
          email: 'mailto:dgiakatos@csd.auth.gr',
        },
        {
          img: '/avatar/skaramanidis.jpg',
          name: 'Stelios Karamanidis',
          text: 'Frontend Developer',
          github: 'https://github.com/skaram82',
          email: 'mailto:skaraman@csd.auth.gr',
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
.card-team {
  width: 200;
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

.avatar {
  max-height: 250px !important;
}
</style>
