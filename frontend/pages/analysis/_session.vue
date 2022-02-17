<template>
  <v-container>
    <v-row justify="center">
      <h1>Analysis</h1>
    </v-row>
    <v-row justify="center">
      <p class="text-center">This is an alpha version of our analysis.</p>
    </v-row>
    <v-row justify="center">
      <v-col>
        <v-skeleton-loader
          v-if="!loaded"
          class="mx-auto"
          type="card"
          max-width="400"
        ></v-skeleton-loader>
        <v-card v-if="loaded" class="mx-auto" max-width="400">
          <v-card-title>Gender</v-card-title>
          <v-card-text>
            <div class="chart">
              <PieChart :data="genderChartData" :options="genderChartOptions" />
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-skeleton-loader
          v-if="!loaded"
          class="mx-auto"
          type="card"
          max-width="400"
        ></v-skeleton-loader>
        <v-card v-if="loaded" class="mx-auto" max-width="400">
          <v-card-title>Age</v-card-title>
          <v-card-text>
            <div class="chart">
              <BarChart :data="ageChartData" :options="ageChartOptions" />
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-skeleton-loader
          v-if="!loaded"
          class="mx-auto"
          type="card"
          max-width="400"
        ></v-skeleton-loader>
        <v-card v-if="loaded" class="mx-auto" max-width="400">
          <v-card-title>Brands</v-card-title>
          <v-card-text>
            <div class="chart">
              <PieChart :data="deviceChartData" :options="deviceChartOptions" />
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-skeleton-loader
          v-if="!loaded"
          class="mx-auto"
          type="card"
          max-width="400"
        ></v-skeleton-loader>
        <v-card v-if="loaded" class="mx-auto" max-width="400">
          <v-card-title>Weights</v-card-title>
          <v-card-text>
            <div class="chart">
              <LineChart
                :data="weightChartData"
                :options="weightChartOptions"
              />
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import randomColor from 'randomcolor'
import PieChart from '~/components/charts/PieChart.vue'
import BarChart from '~/components/charts/BarChart.vue'
import LineChart from '~/components/charts/LineChart.vue'
export default {
  components: {
    PieChart,
    BarChart,
    LineChart,
  },
  data() {
    return {
      loaded: false,
      genderChartData: {
        labels: [],
        datasets: [
          {
            data: [],
            backgroundColor: [],
          },
        ],
      },
      genderChartOptions: {
        responsive: true,
        legend: {
          position: 'top',
        },
        title: {
          display: false,
          text: 'Gender',
        },
      },
      ageChartData: {
        labels: [],
        datasets: [
          {
            data: [],
            backgroundColor: [],
          },
        ],
      },
      ageChartOptions: {
        responsive: true,
        legend: {
          display: false,
          position: 'top',
        },
        title: {
          display: false,
          text: 'Ages',
        },
        scales: {
          xAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: 'Ages',
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                stepSize: 1,
                beginAtZero: true,
              },
              scaleLabel: {
                display: true,
                labelString: 'Number of users',
              },
            },
          ],
        },
      },
      deviceChartData: {
        labels: [],
        datasets: [
          {
            data: [],
            backgroundColor: [],
          },
        ],
      },
      deviceChartOptions: {
        responsive: true,
        legend: {
          position: 'top',
        },
        title: {
          display: false,
          text: 'Devices',
        },
      },
      weightChartData: {
        datasets: [
          {
            label: '',
            data: [],
            backgroundColor: [],
          },
        ],
      },
      weightChartOptions: {
        responsive: true,
        legend: {
          position: 'top',
        },
        title: {
          display: false,
          text: 'Weights',
        },
        scales: {
          xAxes: [
            {
              type: 'time',
            },
          ],
        },
        elements: {
          line: {
            fill: false,
          },
        },
      },
    }
  },
  fetch() {
    this.$axios
      .$get('/find-session/' + this.$route.params.session)
      .catch((_) => {
        return this.$nuxt.error({ statusCode: 404 })
      })
  },
  async mounted() {
    this.loaded = false
    try {
      const gender = await this.$axios.$get(
        '/analysis/gender-user/' + this.$route.params.session
      )
      this.genderChartData.labels = gender.labels
      this.genderChartData.datasets[0].data = gender.data
      this.genderChartData.datasets[0].backgroundColor = randomColor({
        count: gender.labels.length,
      })
      const age = await this.$axios.$get(
        '/analysis/age-user/' + this.$route.params.session
      )
      this.ageChartData.labels = age.labels
      this.ageChartData.datasets[0].data = age.data
      this.ageChartData.datasets[0].backgroundColor = randomColor({
        count: age.labels.length,
      })
      const device = await this.$axios.$get(
        '/analysis/device-user/' + this.$route.params.session
      )
      this.deviceChartData.labels = device.labels
      this.deviceChartData.datasets[0].data = device.data
      this.deviceChartData.datasets[0].backgroundColor = randomColor({
        count: device.labels.length,
      })
      this.ageChartData.datasets[0].data = age.data
      const weight = await this.$axios.$get(
        '/analysis/weight-user/' + this.$route.params.session
      )
      // this.weightChartData.labels = weight[1].label
      // this.weightChartData.datasets[0].data = weight[1].data
      this.weightChartData.datasets = weight
      this.weightChartData.datasets.map((x) => {
        x.borderColor = randomColor()
        return x
      })
      this.loaded = true
    } catch (e) {}
  },
}
</script>
