<template>
  <div>
    <v-tabs flat background-color="#323232" color="#6ac447" dark>
      <v-tab>
        <span class="mdi mdi-note-outline cust-icon"></span>
        Patient Care Activities
      </v-tab>
      <v-tab>
        <span class="mdi mdi-table cust-icon"></span>
        Records
      </v-tab>

      <v-tab-item>
        <v-card tile>
          <v-card-text>
            <YearDialog v-if="$store.state.selectedYear == 0" />
            <PageHeader
              :title="$metaInfo.title"
              :reportYears="reportYears"
              class="ml-0 pb-0 pt-0"
            />
            <v-row>
              <v-col cols="12" md="3" lg="3">
                <v-card class="mx-auto">
                  <PatientCare />
                </v-card>
              </v-col>
              <v-col cols="12" md="9" lg="9">
                <OtserviceForm />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-tab-item>

      <v-tab-item>
        <v-card flat>
          <v-card-text class="px-0 py-1">
            <v-row>
              <v-col cols="12">
                <OtserviceTable
                  :reportYears="reportYears"
                />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: "OT & Other Procedures"
    };
  },
  data: () => ({
    selectedYear: 0
  }),
  computed: {
    reportYears() {
      return this.$store.state.reportYears;
    }
  },
  async fetch({ store }) {
    let queryString = "";
    queryString = `department.id=${store.state.auth.user.department}&deleted_ne=true&annual_year=${store.state.selectedYear}`;
    await store.dispatch("otservice/setOTServicesData", { qs: queryString });
  }
};
</script>

<style scoped>
.cust-icon {
  font-size: 20px;
  color: #ff7e00;
  padding-right: 10px;
}
</style>
