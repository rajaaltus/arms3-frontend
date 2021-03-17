<template>
  <div>
    <v-container fluid>
      <!-- <pre>{{ submitted }}</pre> -->
      <v-row>
        <v-col cols="12" lg="3">
          <v-select label="Reporting Year" v-model="selectedYear" placeholder="Pick Reporting Year" :items="reportYears" item-text="val" item-value="id" color="success"></v-select>
        </v-col>
        <v-col cols="12" lg="3">
          <v-select v-model="userType" :items="items" label="User Type" placeholder="Select" color="success"></v-select>
        </v-col>
        <v-col cols="auto" lg="auto">
          <v-row>
            <v-layout align-start justify-start>
              <v-btn v-if="selectedYear && userType" :loading="loading" :disabled="loading" color="green" x-small class="mt-6 mr-1 white--text" fab @click="loader()">
                Go
              </v-btn>
              <v-tooltip right color="blue-grey darken-2">
                <template v-slot:activator="{ on }">
                  <v-btn color="blue-grey" fab x-small class="mt-6 white--text" dark @click="resetFilter" v-on="on">
                    <v-icon>mdi-reload</v-icon>
                  </v-btn>
                </template>
                <span>Reset Filter</span>
              </v-tooltip>
            </v-layout>
          </v-row>
        </v-col>
      </v-row>

      <!-- <pre>{{ monthlyAvailableReports }}</pre> -->
      <v-data-table :headers="headers" :items="populateDepartments" class="elevation-1" :search="search" :loading="loading" loading-text="Loading... Please wait">
        <template v-slot:top>
          <h2 class="pa-4">Submitted Reports - Monthly</h2>
          <v-text-field v-model="search" label="Search" class="mx-4"></v-text-field>
        </template>
        <template v-slot:[`item.4`]="{ item }">
          <ReportButton :department="item" :month="4" :selectedYear="selectedYear" :userType="userType" :available="checkReport(item, 4)" />
        </template>
        <template v-slot:[`item.5`]="{ item }">
          <ReportButton :department="item" :month="5" :selectedYear="selectedYear" :userType="userType" :available="checkReport(item, 5)" />
        </template>
        <template v-slot:[`item.6`]="{ item }">
          <ReportButton :department="item" :month="6" :selectedYear="selectedYear" :userType="userType" :available="checkReport(item, 6)" />
        </template>
        <template v-slot:[`item.7`]="{ item }">
          <ReportButton :department="item" :month="7" :selectedYear="selectedYear" :userType="userType" :available="checkReport(item, 7)" />
        </template>
        <template v-slot:[`item.8`]="{ item }">
          <ReportButton :department="item" :month="8" :selectedYear="selectedYear" :userType="userType" :available="checkReport(item, 8)" />
        </template>
        <template v-slot:[`item.9`]="{ item }">
          <ReportButton :department="item" :month="9" :selectedYear="selectedYear" :userType="userType" :available="checkReport(item, 9)" />
        </template>
        <template v-slot:[`item.10`]="{ item }">
          <ReportButton :department="item" :month="10" :selectedYear="selectedYear" :userType="userType" :available="checkReport(item, 10)" />
        </template>
        <template v-slot:[`item.11`]="{ item }">
          <ReportButton :department="item" :month="11" :selectedYear="selectedYear" :userType="userType" :available="checkReport(item, 11)" />
        </template>
        <template v-slot:[`item.12`]="{ item }">
          <ReportButton :department="item" :month="12" :selectedYear="selectedYear" :userType="userType" :available="checkReport(item, 12)" />
        </template>
        <template v-slot:[`item.1`]="{ item }">
          <ReportButton :department="item" :month="1" :selectedYear="selectedYear" :userType="userType" :available="checkReport(item, 1)" />
        </template>
        <template v-slot:[`item.2`]="{ item }">
          <ReportButton :department="item" :month="2" :selectedYear="selectedYear" :userType="userType" :available="checkReport(item, 2)" />
        </template>
        <template v-slot:[`item.3`]="{ item }">
          <ReportButton :department="item" :month="3" :selectedYear="selectedYear" :userType="userType" :available="checkReport(item, 3)" />
        </template>
        <template v-slot:no-data>
          <img class="stars py-12" src="/counting_stars.svg" alt="counting_stars" width="300" />
          <h2 class="pb-2">No Data</h2>
          <span class="pb-4">Please choose Reporting Year &amp; User type</span>
        </template>
      </v-data-table>
    </v-container>
  </div>
</template>

<script>
import gsap from "gsap";
import { mapState } from "vuex";
export default {
  layout: "super",
  data() {
    return {
      headers: [
        { text: "Name", value: "name" },
        { text: "Apl", value: 2 },
        { text: "May", value: 5 },
        { text: "Jun", value: 6 },
        { text: "Jul", value: 7 },
        { text: "Aug", value: 8 },
        { text: "Sep", value: 9 },
        { text: "Oct", value: 10 },
        { text: "Nov", value: 11 },
        { text: "Dec", value: 12 },
        { text: "Jan", value: 1 },
        { text: "Feb", value: 2 },
        { text: "Mar", value: 3 },
      ],
      search: "",
      dense: false,
      fixedHeader: false,
      selectedYear: 0,
      userType: "",
      loading: false,
      height: 300,
      populateDepartments: [],
      items: ["Faculty", "Student"],
      message: "Select Reporting Year and User Type",
      submitted: [],
    };
  },
  computed: {
    reportYears() {
      return this.$store.state.reportYears;
    },
    ...mapState({
      monthlyAvailableReports: (state) => state.report.monthlyAvailableReports,
    }),
    departments() {
      return this.$store.state.department.departments;
    },
  },
  async fetch() {
    // await store.dispatch("department/getDepartments");
    await this.$axios
      .$get("/report-submit-statuses")
      .then((resp) => {
        this.submitted = resp;
      })
      .catch((e) => {
        console.log(e);
      });
    console.log(this.submitted);
  },
  mounted() {
    gsap.fromTo(".stars", { scale: 0.95, ease: "power.3" }, { scale: 1, ease: "power.3", duration: 1, repeat: 4, yoyo: true });
  },
  methods: {
    async loader() {
      this.loading = true;
      await this.$store.dispatch("department/getDepartments");
      this.populateDepartments = this.departments;
      let queryString = "";
      queryString = `?year=${this.selectedYear}&userType=${this.userType}`;
      await this.$store.dispatch("report/checkMonthlyReport", { qs: queryString });
      this.loading = false;
    },
    checkReport(dept, month) {
      // console.log("Checking Report:" + dept.id);
      // return this.monthlyAvailableReports.find((item) => item.department.id === dept.id && item.month == month);
      return this.monthlyAvailableReports.filter((item) => item.department.id === dept.id && item.month == month);
      console.log(this.monthlyAvailableReports.filter((item) => item.department.id === dept.id && item.month == month));
    },

    resetFilter() {
      console.log("This is reset Filter");
      this.selectedYear = 0;
      this.userType = "";
      this.populateDepartments = [];
    },
  },
};
</script>

<style scoped>
tr {
  height: 60px;
}
</style>
