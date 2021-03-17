<template>
  <div>
    <v-alert
    tile
    elevation="0"
    border="left"
    color="green lighten-1"
    colored-border
    icon="mdi-bookshelf"
  >
    <h2 class="font-weight-bold">Publications ({{ total }}) </h2>
    <apexchart
      width="100%"
      height="250"
      type="bar"
      :options="chartOptions"
      :series="series"
    ></apexchart>
    </v-alert>
 
   
    <!-- <v-btn x-small color="green"  @click="updateChart">Update!</v-btn> -->
  </div>
  <!-- <v-alert
    tile
    elevation="0"
    border="left"
    color="light-green lighten-1"
    colored-border
    icon="mdi-bookshelf"
  >
    <h2 class="font-weight-bold">Publications</h2>
    <span class="display-2 font-weight-bold"
      >{{ publicationsData.length }}
    </span>

    <v-tooltip top color="black">
      <template v-slot:activator="{ on }">
        <v-btn tile x-small color="green darken-3" v-on="on" class="mb-4">{{
          journalArticles
        }}</v-btn>
      </template>
      <span>Journal Articles</span>
    </v-tooltip>
    <v-tooltip top color="black">
      <template v-slot:activator="{ on }">
        <v-btn tile x-small color="green darken-2" v-on="on" class="mb-4">{{
          articles
        }}</v-btn>
      </template>
      <span>Articles for Professionals in Souvenirs, Newsletters, etc..</span>
    </v-tooltip>

    <v-tooltip top color="black">
      <template v-slot:activator="{ on }">
        <v-btn tile x-small color="green darken-1" v-on="on" class="mb-4">{{
          books
        }}</v-btn>
      </template>
      <span>Books</span>
    </v-tooltip>

    <v-tooltip top color="black">
      <template v-slot:activator="{ on }">
        <v-btn tile x-small color="green lighten-1" v-on="on" class="mb-4">{{
          bookChapters
        }}</v-btn>
      </template>
      <span>Book Chapters</span>
    </v-tooltip>

    <v-tooltip top color="black">
      <template v-slot:activator="{ on }">
        <v-btn tile x-small color="green lighten-2" v-on="on" class="mb-4">{{
          monoGraphs
        }}</v-btn>
      </template>
      <span>Monographs</span>
    </v-tooltip>

    <v-tooltip top color="black">
      <template v-slot:activator="{ on }">
        <v-btn tile x-small color="green lighten-3" v-on="on" class="mb-4">{{
          manuals
        }}</v-btn>
      </template>
      <span>Manuals</span>
    </v-tooltip>

    <v-tooltip top color="black">
      <template v-slot:activator="{ on }">
        <v-btn tile x-small color="green lighten-4" v-on="on" class="mb-4">{{
          reports
        }}</v-btn>
      </template>
      <span>Reports</span>
    </v-tooltip>

    <v-tooltip top color="black">
      <template v-slot:activator="{ on }">
        <v-btn tile x-small color="green lighten-5" v-on="on" class="mb-4">{{
          general
        }}</v-btn>
      </template>
      <span>Articles for General Public / IEC Materials</span>
    </v-tooltip>
  </v-alert> -->
</template>

<script>
export default {
  props: ["publicationTypeCounts", "total"],
  data() {
    return {
      chartOptions: {
        dataLabels: {
          enabled: true
        },
        plotOptions: {
          bar: {
            horizontal: true,
            distributed: false
          },
        },
        theme: {
            palette: 'palette5' // upto palette10
          },
        xaxis: {
          categories: ['Journal Articles', 'Articles', 'Books', 'Book Chapters', 'Monographs', 'Manuals', 'Reports', 'General'],
        },
      },
      series: [
        {
          name: "Publications",
          data: [0, 0, 0, 0, 0, 0, 0, 0],
        },
      ],
    }
  },
  async mounted() {
    this.updateChart();
  },
  methods: {
    updateChart() {
      this.series = [
        {
          data: this.publicationTypeCounts
        }
      ]
    },
  },
};
</script>
