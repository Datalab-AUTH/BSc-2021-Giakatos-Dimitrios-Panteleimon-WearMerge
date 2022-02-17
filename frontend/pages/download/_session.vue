<template>
  <v-container>
    <v-row justify="center">
      <h1>Download</h1>
    </v-row>
    <v-row justify="center">
      <p class="text-center">
        Your data is ready.<br />
        If you find an error on your transformed data, please send us an email
        or create an issue on
        <a href="https://github.com/WearMerge/backend/issues">
          <strong>GitHub</strong>
        </a>
        .<br />
        Thank you for using our service.
      </p>
    </v-row>
    <v-row justify="center">
      <v-btn color="primary" :disabled="invalid" :href="link">Download</v-btn>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      link:
        process.env.NODE_ENV === 'production'
          ? '/api' + this.$route.fullPath
          : 'http://localhost:3000' + this.$route.fullPath,
    }
  },
  fetch() {
    this.$axios
      .$get('/find-session/' + this.$route.params.session)
      .catch((_) => {
        return this.$nuxt.error({ statusCode: 404 })
      })
  },
}
</script>
