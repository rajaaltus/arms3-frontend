<template>
  <div>
    <YearDialog v-if="$store.state.selectedYear == 0" />
    <v-row class="my-0">
      <v-col cols="12" lg="9" class="pb-0 px-4">
        <span class="theme-border"
          ><h1 class="ml-3">{{ $metaInfo.title }}</h1></span
        >
      </v-col>
      <v-col cols="12" lg="3" v-if="reportYears">
        <v-select
          filled
          color="green"
          v-model="annualYear"
          :items="reportYears"
          item-text="val"
          item-value="id"
          label="Reporting Year"
          required
          @input="reloadData"
        ></v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="3" lg="3">
        <v-card class="mx-auto">
          <StudentActivities />
        </v-card>
      </v-col>
      <v-col cols="12" md="9" lg="9">
        <v-row align="center" justify="start" no-gutters>
          <v-col
            cols="12"
            md="4"
            lg="4"
            v-for="(activity, index) in $store.state.studentActivities"
            :key="index"
          >
						<v-skeleton-loader
            v-if="loading"
            height="94"
            type="list-item-two-line"
						>
						</v-skeleton-loader>
            <v-alert
							v-else
              class="mr-2"
              border="left"
              colored-border
              color="yellow accent-4"
              elevation="2"
              tile
            >
              <v-list-item three-line>
                <v-list-item-content>
                  <v-list-item-title class="mb-0"
                    ><v-icon v-text="activity.icon"></v-icon>
                    {{ activity.title }}
                  </v-list-item-title>
                  <v-list-item-subtitle
                    ><h1 class="count-disp">
                      {{ getActivityCount(activity.id) }}
                    </h1></v-list-item-subtitle
                  >
                </v-list-item-content>
              </v-list-item>
            </v-alert>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  head() {
    return {
      title: "Activities & Resources of Students"
    };
  },
  data: () => ({
		annualYear: 0,
		loading: true
	}),
	computed: {
    ...mapState({
      selectedYear: state => state.selectedYear
    }),
    	reportYears() {
			return this.$store.state.reportYears
		}
  },
  async fetch({ store }) {
    await store.dispatch("setStudentActivities");

    let id = store.state.auth.user.id;
    let queryString = "";
    if (store.state.auth.user.userType === "DEPARTMENT")
      queryString = `department.id=${store.state.auth.user.department}&deleted_ne=true&annual_year=${store.state.selectedYear}&approval_status=Approved`;
    else queryString = `department.id=${store.state.auth.user.department}&user.id=${id}&deleted_ne=true&annual_year=${store.state.selectedYear}&approval_status=Approved`;

    await store.dispatch("presentation/countPresentations", {
      qs: queryString
    });
    await store.dispatch("participation/countParticipations", {
      qs: queryString
    });
    await store.dispatch("publication/countPublications", {
      qs: queryString
    });
    await store.dispatch("recognition/countRecognitions", {
      qs: queryString
    });
		await store.dispatch("theses/countTheses", { qs: queryString });
		let qs = "";
    qs = `department.id=${store.state.auth.user.department}&blocked_ne=true`;
    await store.dispatch("setStudents", { qs: qs });
	},
	watch: {
    selectedYear(val) {
      this.annualYear = this.selectedYear;
      this.reloadData();
    }
  },
	async mounted() {
		this.annualYear = this.$store.state.selectedYear;
		this.loading = false;
	},
  methods: {
    getActivityCount(id) {
      if (id == 1) {
        return this.$store.state.program.programmesCount;
      }
      if (id == 2) {
        return this.$store.state.visitor.visitorsCount;
      }
      if (id == 3) {
        return this.$store.state.training.trainingsCount;
      }
      if (id == 4) {
        return this.$store.state.presentation.presentationsCount;
      }
      if (id == 5) {
        return this.$store.state.participation.participationsCount;
      }
      if (id == 6) {
        return this.$store.state.public.publicCount;
      }
      if (id == 7) {
        return this.$store.state.research.researchCount;
      }
      if (id == 8) {
        return this.$store.state.publication.publicationsCount;
      }
      if (id == 9) {
        return this.$store.state.recognition.recognitionsCount;
      }
      if (id == 10) {
        return this.$store.state.patent.patentsCount;
      }
      if (id == 11) {
        return this.$store.state.assignment.assignmentsCount;
      }
      if (id == 12) {
        return this.$store.state.theses.thesesCount;
      }
		},
		async reloadData() {
			this.loading = true;
      let queryString = "";
      if (this.$store.state.auth.user.userType === "DEPARTMENT")
        queryString = `department.id=${this.$store.state.auth.user.department}&deleted_ne=true&annual_year=${this.annualYear}`;
      else
        queryString = `department.id=${this.$store.state.auth.user.department}&user.id=${id}&deleted_ne=true&annual_year=${this.annualYear}`;
      
      await this.$store.dispatch("presentation/countPresentations", {
        qs: queryString
      });
      await this.$store.dispatch("participation/countParticipations", {
        qs: queryString
      });
      await this.$store.dispatch("publication/countPublications", {
        qs: queryString
      });
      await this.$store.dispatch("recognition/countRecognitions", {
        qs: queryString
      });
      await this.$store.dispatch("theses/countTheses", { qs: queryString });
			this.loading = false
    }
  }
};
</script>
<style scoped>
.count-disp {
  text-align: right;
  padding-right: 30px;
  font-size: 30px;
}
</style>
