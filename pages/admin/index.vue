<template>
  <div>
    <v-container fluid>
      <YearDialog />
      <v-tabs flat background-color="#323232" color="#6ac447" dark>
        <v-tab>
          <span class="mdi mdi-view-dashboard cust-icon"></span>
          Dashboard
        </v-tab>
        <v-tab v-if="$auth.user.userType === 'DEPARTMENT'">
          <span class="mdi mdi-calendar-check cust-icon"></span>
          Approve & Submit Monthly Report
        </v-tab>
        <v-tab>
          <span class="mdi mdi-file-word cust-icon"></span>
          Generate Quick Report
        </v-tab>
        <v-tab-item>
          <DashboardCards />
        </v-tab-item>
        <v-tab-item v-if="$auth.user.userType === 'DEPARTMENT'">
          <ReportStepper />
        </v-tab-item>
        <v-tab-item>
          <ReportPreview />
        </v-tab-item>
      </v-tabs>
    </v-container>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: "Dashboard",
    };
  },
  async fetch({ store, $auth }) {
    let queryString = "";
    if ($auth.user.userType === "DEPARTMENT") queryString = `department.id=${store.state.auth.user.department}&deleted_ne=true&approval_status=Approved`;
    else queryString = `department.id=${store.state.auth.user.department}&deleted_ne=true&user.id=${$auth.user.id}&approval_status=Approved`;
    await store.dispatch("program/countProgrammes", { qs: queryString });
    await store.dispatch("visitor/countVisitors", { qs: queryString });
    await store.dispatch("training/countTrainings", { qs: queryString });
    await store.dispatch("presentation/countPresentations", {
      qs: queryString,
    });
    await store.dispatch("participation/countParticipations", {
      qs: queryString,
    });
    await store.dispatch("public/countPublicEngagements", { qs: queryString });
    await store.dispatch("research/countResearch", { qs: queryString });
    await store.dispatch("publication/countPublications", { qs: queryString });
    await store.dispatch("publication/setPublicationsData", {
      qs: queryString,
    });
    await store.dispatch("recognition/countRecognitions", { qs: queryString });
    await store.dispatch("patent/countPatents", { qs: queryString });
    await store.dispatch("assignment/countAssignments", { qs: queryString });

    let queryString1 = "";
    queryString1 = `department=${store.state.auth.user.department}&blocked_ne=true`;
    await store.dispatch("user/setActiveUsersList", { qs: queryString1 });
  },

  mounted() {
    if (this.userType) {
      if (this.userType === "FACULTY") this.assignedPeople = this.faculties;
    } else this.assignedPeople = this.people;

    if (this.$auth.loggedIn) {
      if (this.$auth.user.userType === "SUPER_ADMIN") this.$router.push("/super");
    }
  },
};
</script>

<style>
.customMonth input {
  background-color: transparent !important;
  border-color: rgba(255, 255, 255, 0.3) !important;
  color: rgba(255, 255, 255, 0.5) !important;
}
.customMonth input:hover {
  border-color: rgba(255, 255, 255, 0.9) !important;
}
.cust-icon {
  font-size: 20px;
  color: #ff7e00;
  padding-right: 10px;
}
.disp {
  color: #ffffff;
  font-size: 15px;
  font-weight: normal;
}

.disp-icon {
  color: #ffffff;
  font-size: 24px;
  font-weight: normal;
}

.dboard {
  color: #ffffff;
}
</style>
