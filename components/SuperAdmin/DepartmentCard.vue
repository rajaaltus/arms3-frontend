<template>
  <div>
    <ReportDialog
      v-if="dialog"
      :selectedYear="selectedYear"
      :department="selectedDepartment"
      :activityData="activityData"
      @closed="dialog = false"
    />
    <v-card
      :loading="loading"
      tile
      elevation="1"
      :color="cardColor"
      :dark="dark"
    >
      <v-card-title>
        <span
          class="subtitle-1 font-weight-normal d-inline-block text-truncate"
          >{{ department.name }}</span
        >
      </v-card-title>
      <v-card-text v-if="available === 'default'">
        <v-layout align-start justify-start>
          <v-btn fab x-small color="white" class="mr-1" disabled
            ><v-icon color="blue">mdi-file-word</v-icon></v-btn
          >

          <v-btn fab x-small color="white" disabled
            ><v-icon color="blue">mdi-file-word</v-icon></v-btn
          >
        </v-layout>
      </v-card-text>
      <v-card-text v-if="available === 'available'">
        <v-layout align-start justify-start>
          <FacultyReport
            v-if="isFacultyReport"
            :departmentId="department.id"
            :selectedYear="selectedYear"
            @downloadFaculty="downloadFaculty"
          />
          <StudentReport
            v-if="isStudentReport"
            :departmentId="department.id"
            :selectedYear="selectedYear"
            @downloadStudent="downloadStudent"
          />
        </v-layout>
      </v-card-text>
      <v-card-text v-if="available === 'notSubmitted'">
        <v-layout align-start justify-start>
          <v-tooltip right color="red">
            <template v-slot:activator="{ on }">
              <v-btn fab x-small color="white" v-on="on"
                ><v-icon color="blue">mdi-send</v-icon></v-btn
              >
            </template>
            <span>Send Reminder</span>
          </v-tooltip>
        </v-layout>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: ["selectedYear", "department"],
  data() {
    return {
      report: null,
      available: "notSubmitted",
      cardColor: "red",
      dark: true,
      availableData: null,
      loading: false,
      activityData: null,
      selectedDepartment: null,
      dialog: false,
      isStudentReport: false,
      isFacultyReport: false
    };
  },
  computed: {
    ...mapState({
      availableReports: (state) => state.report.availableReports,
    }),
  },
  async mounted() {
    this.setReport();
  },
  methods: {
    async downloadFaculty(fData) {
      this.activityData = fData;
      this.facultyData = fData;
      this.selectedDepartment = fData.department;
      this.dialog = true;
    },
    async downloadStudent(sData) {
      this.activityData = sData;
      this.studentData = sData;
      this.selectedDepartment = sData.department;
      this.dialog = true;
    },
    async setReport() {
      let queryString = "";
      if (this.selectedYear == 0) {
        this.available = "default";
        this.cardColor = "white";
        this.dark = false;
      } else {
        this.loading = true;
        queryString = `department.id=${this.department.id}&annual_year=${this.selectedYear}`;
        await this.$store.dispatch("report/setAvailableReports", {
          qs: queryString,
        });
        if (this.availableReports.length > 0) {
          this.available = "available";
          this.cardColor = "light-green";
          this.dark = true;
          var reports = this.availableReports.map(report => report.userType)
          this.isFacultyReport = reports.includes('FACULTY');
          this.isStudentReport = reports.includes('STUDENT');
        }
        this.loading = false;
      }
    },
  },
};
</script>
