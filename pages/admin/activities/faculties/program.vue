<template>
  <div>
    <v-tabs flat background-color="#323232" color="#6ac447" dark>
      <v-tab>
        <span class="mdi mdi-note-outline cust-icon"></span>
        Activities &amp; Resources
      </v-tab>
      <v-tab>
        <span class="mdi mdi-table cust-icon"></span>
        Records
      </v-tab>

      <v-tab-item>
        <v-card tile>
          <v-card-text>
            <!-- <YearDialog v-if="$store.state.selectedYear == 0" /> -->
            <PageHeader :title="$metaInfo.title" :reportYears="reportYears" @set-year="setReportingYear" class="ml-0 pb-0 pt-0" />
            <v-row>
              <v-col cols="12" md="3" lg="3">
                <v-card class="mx-auto">
                  <FacultyActivities />
                </v-card>
              </v-col>
              <v-col cols="12" md="9" lg="9">
                <FormsProgramForm :programNames="programNames" :dataFrom="staffs" section="Select Faculty / Staff from the list" />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-tab-item>

      <v-tab-item>
        <v-card flat>
          <v-card-text class="px-0 py-1">
            <v-row>
              <v-col cols="12" md="12">
                <tablesActivitiesProgramTable :reportYears="reportYears" dataFrom="FACULTY" />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Swal from "sweetalert2";
export default {
  head() {
    return {
      title: "Programmes & Events",
    };
  },
  data: () => ({}),
  computed: {
    ...mapState({
      staffs: (state) => state.staffs,
      programmesData: (state) => state.program.programmesData.result,
    }),
    reportYears() {
      return this.$store.state.reportYears;
    },
    programNames() {
      return this.programmesData.map((program) => program.name);
    },
  },
  async fetch({ store }) {
    await store.dispatch("setActivities");
    let qs = "";
    qs = `department.id=${store.state.auth.user.department}&userType=FACULTY&blocked_ne=true`;
    await store.dispatch("setStaffs", { qs: qs });
    let queryString = "";
    queryString = `department.id=${store.state.auth.user.department}&deleted_ne=true&annual_year=${store.state.selectedYear}`;
    await store.dispatch("program/setProgrammesData", { qs: queryString });
  },

  methods: {
    async changeReportingYear() {
      await this.$store.dispatch("setReportingYear", this.selectedYear);
    },
    async setReportingYear() {
      await this.$store.dispatch("setReportingYear", this.selectedYear);
    },
  },
};
</script>

<style scoped>
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
</style>
