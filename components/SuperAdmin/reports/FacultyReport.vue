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
          @click="downloadFaculty"
          ><v-icon color="blue">mdi-file-word</v-icon></v-btn
        >
      </template>
      <span>Download Faculty Report</span>
    </v-tooltip>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  props: ['departmentId', 'selectedYear','month'],
  data () {
    return {
      facultyData: null
    }
  },
  computed: {
    ...mapState({
      facultyReport: state => state.report.availableReports
    })
  },
  methods: {
    async downloadFaculty() {
      let queryString = '';
      queryString = `department.id=${this.departmentId}&annual_year=${this.selectedYear}&userType=FACULTY${this.month>0?'&Month='+this.month:''}`;
      await this.$store.dispatch("report/setAvailableReports", {
          qs: queryString,
        });
      console.log(this.facultyReport[0]);
      this.facultyData = this.facultyReport[0];
      this.$emit('downloadFaculty', this.facultyData);
    }
  }
}
</script>
