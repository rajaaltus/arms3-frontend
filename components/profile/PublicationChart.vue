<template>
  <div>
    <v-card tile class="mx-auto mt-2">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="headline">Publications</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-container style="height: 400px;" v-if="loading">
          <v-row class="fill-height" align-content="center" justify="center">
            <v-col class="subtitle-1 text-center" cols="12">
              Fetching publication data
            </v-col>
            <v-col cols="6">
              <v-progress-linear
                color="dark green"
                indeterminate
                rounded
                height="6"
              ></v-progress-linear>
            </v-col>
          </v-row>
        </v-container>
      <div id="vuechart-example" v-else>
        <client-only>
          <apexchart
            width="100%"
            type="bar"
            :options="options"
            :series="series"
          ></apexchart>
        </client-only>
      </div>
    </v-card>

    <v-alert tile elevation="1" color="light-green lighten-5">
      <span class="display-2 font-weight-bold">
        845
      </span>
      <br />

      <v-tooltip top color="black">
        <template v-slot:activator="{ on }">
          <v-btn tile x-small color="green darken-3" v-on="on">{{stats[0]}}
          </v-btn>
        </template>
        <span>Journal Articles</span>
      </v-tooltip>

      <v-tooltip top color="black">
        <template v-slot:activator="{ on }">
          <v-btn tile x-small color="green darken-2" v-on="on">{{stats[1]}}</v-btn>
        </template>
        <span>Articles for Professionals in Souvenirs, Newsletters, etc..</span>
      </v-tooltip>

      <v-tooltip top color="black">
        <template v-slot:activator="{ on }">
          <v-btn tile x-small color="green darken-1" v-on="on">{{stats[2]}}</v-btn>
        </template>
        <span>Books</span>
      </v-tooltip>

      <v-tooltip top color="black">
        <template v-slot:activator="{ on }">
          <v-btn tile x-small color="green lighten-1" v-on="on">{{stats[3]}}</v-btn>
        </template>
        <span>Book Chapters</span>
      </v-tooltip>

      <v-tooltip top color="black">
        <template v-slot:activator="{ on }">
          <v-btn tile x-small color="green lighten-2" v-on="on">{{stats[4]}}</v-btn>
        </template>
        <span>Monographs</span>
      </v-tooltip>

      <v-tooltip top color="black">
        <template v-slot:activator="{ on }">
          <v-btn tile x-small color="green lighten-3" v-on="on">{{stats[5]}}</v-btn>
        </template>
        <span>Manuals</span>
      </v-tooltip>

      <v-tooltip top color="black">
        <template v-slot:activator="{ on }">
          <v-btn tile x-small color="green lighten-4" v-on="on">{{stats[6]}}</v-btn>
        </template>
        <span>Reports</span>
      </v-tooltip>

      <v-tooltip top color="black">
        <template v-slot:activator="{ on }">
          <v-btn tile x-small color="green lighten-5" v-on="on">{{stats[7]}}</v-btn>
        </template>
        <span>Articles for General Public / IEC Materials</span>
      </v-tooltip>
    </v-alert>
    <pre>{{ publicationsData }}</pre>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: ['stats'],
  data() {
    return {
      options: {
        chart: {
          id: "vuechart-example"
        },
        theme: {
          palette: "palette5"
        },
        xaxis: {
          categories: [
            "Journal Article",
            "Articles for Professionals in Souvenirs Newsletters etc",
            "Book",
            "Book Chapter",
            "Monograph",
            "Manual",
            "Report",
            "Article for General public or IEC Materials"
          ]
        }
      },
      series: [
        {
          name: "",
          data: []
        }
      ],
      categories: [
        "Journal_Article",
        "Articles_for_Professionals",
        "Book",
        "Book_Chapter",
        "Monograph",
        "Manual",
        "Report",
        "Article_for_General_public"
      ]
    };
  },
  computed: {
    ...mapState({
      publicationsData: state => state.publication.publicationsCount,
      stats: state => state.publication.stats
    })
  },
 
  async mounted() {
    this.setPublicationData();
  },
  methods: {
    setPublicationData() {
      this.$store.dispatch('publication/resetStats');
      this.series[0].name = "Publications";
      for (var index = 0; index < 8; index++) {
        let queryString = "";
        queryString = `department.id=${this.$store.state.auth.user.department}&user.id=${this.$store.state.auth.user.id}&deleted_ne=true&publication_type=${this.categories[index]}`;
        this.$store.dispatch("publication/setStats", { qs: queryString })
      }
      this.series[0].data = this.stats;
      this.$emit('fetched');
    }
  }
};
</script>
