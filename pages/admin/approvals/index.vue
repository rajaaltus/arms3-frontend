<template>
  <div>
    <v-row align="center" justify="start" no-gutters>
      <v-col
        cols="12"
        md="4"
        lg="4"
        v-for="(activity, index) in $store.state.approvalActivities"
        :key="index"
      >
        <v-skeleton-loader v-if="loading" height="94" type="list-item-two-line">
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
                  <span></span> {{ getActivityCount(activity.id) }}
                </h1></v-list-item-subtitle
              >
            </v-list-item-content>
          </v-list-item>
        </v-alert>
      </v-col>
    </v-row>
    <nuxt-child />
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true
    };
  },
  async fetch({ store }) {
    await store.dispatch("setApprovalActivities");
    let queryString = "";
    if (store.state.auth.user.userType === "DEPARTMENT")
      queryString = `department.id=${store.state.auth.user.department}&deleted_ne=true&approval_status=Pending`;
    else
      queryString = `department.id=${store.state.auth.user.department}&user.id=${store.state.auth.user.id}&deleted_ne=true`;

    await store.dispatch("program/countProgrammes", { qs: queryString });
    await store.dispatch("visitor/countVisitors", { qs: queryString });
    await store.dispatch("training/countTrainings", { qs: queryString });
    await store.dispatch("presentation/countPresentations", { qs: queryString });
    await store.dispatch("participation/countParticipations", { qs: queryString });
    await store.dispatch("public/countPublicEngagements", { qs: queryString });
    await store.dispatch("research/countResearch", { qs: queryString });
    await store.dispatch("publication/countPublications", { qs: queryString });
    await store.dispatch("recognition/countRecognitions", { qs: queryString });
    await store.dispatch("patent/countPatents", { qs: queryString });
    await store.dispatch("assignment/countAssignments", { qs: queryString });
    await store.dispatch("theses/countTheses", { qs: queryString });
  },
  mounted() {
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
        return this.$store.state.public.publicEngagementsCount;
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
        queryString = `department.id=${this.$store.state.auth.user.department}&deleted_ne=true&annual_year=${this.annualYear}&approval_status=Pending`;
      else
        queryString = `department.id=${this.$store.state.auth.user.department}&user.id=${this.$auth.user.id}&deleted_ne=true&annual_year=${this.annualYear}`;
      await this.$store.dispatch("program/countProgrammes", {
        qs: queryString
      });
      await this.$store.dispatch("visitor/countVisitors", { qs: queryString });
      await this.$store.dispatch("training/countTrainings", {
        qs: queryString
      });
      await this.$store.dispatch("presentation/countPresentations", {
        qs: queryString
      });
      await this.$store.dispatch("participation/countParticipations", {
        qs: queryString
      });
      await this.$store.dispatch("public/countPublicEngagements", {
        qs: queryString
      });
      await this.$store.dispatch("research/countResearch", { qs: queryString });
      await this.$store.dispatch("publication/countPublications", {
        qs: queryString
      });
      await this.$store.dispatch("recognition/countRecognitions", {
        qs: queryString
      });
      await this.$store.dispatch("patent/countPatents", { qs: queryString });
      await this.$store.dispatch("assignment/countAssignments", {
        qs: queryString
      });
      this.loading = false;
    }
  }
};
</script>
