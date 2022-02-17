<template>
  <v-app>
    <v-app-bar 
    flat fixed app class="underline header" elevate-on-scroll>
      <v-toolbar-title class="pr-10">
        <router-link to="/">
          <v-img
            src="/logo.png"
            max-width="130"
            height="100%"
            alt="WearMerge"
          ></v-img>
        </router-link>
      </v-toolbar-title>
      <v-row v-if="!$vuetify.breakpoint.xsOnly" no-gutters>
        <v-tab to="/how-it-works" text class="my-2 mx-2">
          How it works
        </v-tab>
        <v-tab to="/about" text class="my-2 mx-2"> About </v-tab>
      </v-row>
      <v-spacer></v-spacer>
      <v-tab
        v-if="!$vuetify.breakpoint.xsOnly"
        href="https://github.com/WearMerge/backend/issues"
        text
        class="my-2"
        target="_blank"
      >
        Report Bugs
      </v-tab>
      <v-menu v-if="$vuetify.breakpoint.xsOnly">
        <template #activator="{ on, attrs }">
          <v-tab v-bind="attrs" v-on="on" icon><v-icon>mdi-dots-vertical</v-icon></v-tab>
          <!-- <v-btn v-bind="attrs" color="primary" v-on="on"> Menu </v-btn> -->
        </template>
        <v-list>
          <v-list-item-title>
            <v-btn text to="/how-it-works"> How it works </v-btn>
          </v-list-item-title>
          <v-list-item-title>
            <v-btn text to="/about"> About </v-btn>
          </v-list-item-title>
          <v-list-item-title>
            <v-btn text href="https://github.com/WearMerge/backend/issues">
              Report Bugs
            </v-btn>
          </v-list-item-title>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-main>
      <v-container fluid style="padding:0; margin:0;">
        <nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="!fixed" app class="footer pt-12 pb-4">
      <v-container>
        <v-row>
          <v-col><v-img
            src="/logo_small.png"
            max-width="100"
            height="100%"
            alt="WearMerge"
          class="mx-auto"></v-img></v-col>
        </v-row>
        <v-row justify="center pb-10">
          <v-col>
            <a href="mailto:wearmerge@outlook.com" class="footer-icons-yellow">
              <v-icon class="footer-icons-yellow">fa fa-envelope</v-icon>&nbsp;&nbsp;<strong>wearmerge@outlook.com</strong>
            </a>
          </v-col>
          <v-col align="end" xs="1">
            This is an <strong>open source</strong> project. Find us on
            <a href="https://github.com/WearMerge/">&nbsp;&nbsp;<v-icon class="footer-icons-yellow">fa fa-github</v-icon></a>
          </v-col>
        </v-row>
        <v-divider style="background: #032b44"></v-divider>
        <v-container class="pt-10">
          <v-row justify="center">
            <span>
              &copy; {{ new Date().getFullYear() }} - All rights reserved
            </span>
          </v-row>
          <v-row justify="center">
            <span>
              Images/Illustrations from <a href="https://unsplash.com/" target="_blank">Unsplash</a> ,
              <a href="https://pixabay.com/" target="_blank">Pixabay</a> and <a href="https://www.freepik.com" target="_blank">Freepik</a>
            </span>
          </v-row>
        </v-container>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
    }
  },
}
</script>

<style>
.underline {
  background: white !important;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12) !important;
}
.header {
  height: 80px !important;
  padding-top: 10px;
}
.v-tab:hover, .v-tab:active {
  padding-bottom: 5px;
  border-bottom: 2px solid #01926a;
}
.footer {
  background: #021a29 !important;
  color: #fdc800 !important;
}
a {
  color: #04d89d !important;
  text-decoration: none !important;
}
a:hover {
  color: #01926a !important;
}
.footer-icons {
  color: #04d89d !important;
}
.footer-icons:hover {
  color: #01926a !important;
}
.footer-icons-yellow {
  color: #fdc800 !important;
}
.footer-icons-yellow:hover {
  color: #fdc800 !important;
}
</style>
