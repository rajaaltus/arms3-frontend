<template>
  <div>
    <v-tooltip right color="green">
      <template v-slot:activator="{ on }">
        <v-btn
          fab
          x-small
          color="white"
          v-on="on"
          class="mr-1"
          @click="downloadStudent"
          ><v-icon color="blue">mdi-file-word</v-icon></v-btn
        >
      </template>
      <span>Download Student Report</span>
    </v-tooltip>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: ["departmentId", "selectedYear"],
  data() {
    return {
      studentData: null,
    };
  },
  computed: {
    ...mapState({
      studentReport: state => state.report.availableReports
    })
  },
  methods: {
    async downloadStudent() {
      let queryString = '';
      queryString = `department.id=${this.departmentId}&annual_year=${this.selectedYear}&userType=STUDENT`;
      await this.$store.dispatch("report/setAvailableReports", {
          qs: queryString,
        });
      console.log(this.studentReport[0]);
      this.studentData = this.studentReport[0];
      this.$emit('downloadStudent', this.studentData);
    },
  },
};
</script>
