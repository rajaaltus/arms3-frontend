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
            <YearDialog v-if="$store.state.selectedYear == 0" />
            <PageHeader :title="$metaInfo.title" :reportYears="reportYears" @set-year="setReportingYear" class="ml-0 pb-0 pt-0" />
            <v-row>
              <v-col cols="12" md="3" lg="3">
                <v-card class="mx-auto">
                  <StudentActivities />
                </v-card>
              </v-col>
              <v-col cols="12" md="9" lg="9">
                <formsPresentationForm :dataFrom="students" section="Select Student from the list" />
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
                <tablesActivitiesPresentationTable :reportYears="reportYears" dataFrom="STUDENT" />
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
export default {
  head() {
    return {
      title: "Presentations / Posters",
    };
  },
  data: () => ({
    selectedYear: 0,
  }),
  computed: {
    ...mapState({
      students: (state) => state.students,
    }),
    reportYears() {
      return this.$store.state.reportYears;
    },
  },
  async fetch({ store }) {
    await store.dispatch("setStudentActivities");
    let qs = "";
    qs = `department.id=${store.state.auth.user.department}&userType=STUDENT&blocked_ne=true`;
    await store.dispatch("setStudents", { qs: qs });
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
