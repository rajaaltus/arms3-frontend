<template>
  <div>
    <v-row class="px-5">
      <v-col cols="12" lg="2" class="mt-5">
        <v-select
          outlined
          dense
          v-model="selectedYear"
          ref="year"
          :items="reportYears"
          item-value="id"
          item-text="val"
          label="Reporting Year"
          placeholder="Pick Year"
          color="success"
        ></v-select>
      </v-col>
      <v-col cols="12" lg="3" class="mt-5">
        <v-select
          :items="months"
          item-text="text"
          item-value="val"
          v-model="mon"
          outlined
          dense
          label="Month"
          placeholder="Select Month"
          color="success"
        >
        </v-select>
      </v-col>
      <v-col cols="12" lg="3">
        <v-label><small>Start Date - End Date</small></v-label>
        <vc-date-picker mode="range" v-model="range" ref="range" />
      </v-col>
      <v-col
        cols="12"
        lg="3"
        class="mt-5"
        v-if="$auth.user.userType === 'DEPARTMENT'"
      >
        <v-select
          outlined
          dense
          ref="user-type"
          v-model="userType"
          label="Report of the"
          placeholder="Pick User Type"
          :items="userTypes"
          color="success"
        ></v-select>
      </v-col>

      <v-col cols="auto" lg="auto">
        <v-row>
          <v-layout align-start justify-start>
            <v-btn
              v-if="selectedYear && mon && range && userType"
              :loading="loading"
              :disabled="loading"
              color="green"
              x-small
              class="mt-6 mr-1 white--text"
              fab
              @click="loader()"
            >
              Go
            </v-btn>
            <v-tooltip right color="blue-grey darken-2">
              <template v-slot:activator="{ on }">
                <v-btn
                  color="blue-grey"
                  fab
                  x-small
                  class="mt-6 white--text"
                  dark
                  @click="resetFilter"
                  v-on="on"
                >
                  <v-icon>mdi-reload</v-icon>
                </v-btn>
              </template>
              <span>Reset Filter</span>
            </v-tooltip>
          </v-layout>
        </v-row>
      </v-col>
    </v-row>
    <div>
      <!-- <pre>{{ querySavedReport }}</pre> -->
    </div>
  </div>
</template>

<script>
export default {
  props: ["reportYears", "userTypes"],
  data() {
    return {
      report: 1,
      range: {
        start: "",
        end: "",
      },
      menu: "",
      mon: "",
      months: [
        {
          text: "April",
          val: "4",
        },
        {
          text: "May",
          val: "5",
        },
        {
          text: "June",
          val: "6",
        },
        {
          text: "July",
          val: "7",
        },
        {
          text: "August",
          val: "8",
        },
        {
          text: "September",
          val: "9",
        },
        {
          text: "October",
          val: "10",
        },
        {
          text: "November",
          val: "11",
        },
        {
          text: "December",
          val: "12",
        },
        {
          text: "January",
          val: "1",
        },
        {
          text: "February",
          val: "2",
        },
        {
          text: "March",
          val: "3",
        },
      ],
      sheet: false,
      dataLoaded: false,
      assignedPeople: [],
      loading: false,
      selectedUser: "",
      selectedYear: 0,
      selectedQuery: "",
      querySavedReport: {
        year: "",
        month: "",
        userType: "",
        range: "",
      },
      queryFetch: {
        year: "",
        range: "",
        userType: "",
      },
      yearParam: "",
      userTypeParam: "",
      monthParam: "",
      userParam: "",
      userType: "",
    };
  },
  watch: {
    selectedYear(val) {
      if (val) {
        this.yearParam = "annual_year=" + val;
        this.querySavedReport.year = this.yearParam;
        this.queryFetch.year = this.yearParam;
      }
    },
    mon(val) {
      if (val) {
        this.monthParam = "&Month=" + val.substr(-2);
        this.querySavedReport.month = this.monthParam;
      }
    },
    range(val) {
      console.log("Range Val: ", val);
      if (val) {
        var range = Object.assign({}, val);
        this.monthParam = `&from=${this.$moment(range.start).format(
          "YYYY-MM-DD"
        )}&to=${this.$moment(range.end).format("YYYY-MM-DD")}`;
        this.querySavedReport.range = this.monthParam;

        this.queryFetch.range = `&created_at_gt=${this.$moment(
          range.start
        ).format("YYYY-MM-DD")}&created_at_lt=${this.$moment(range.end).format(
          "YYYY-MM-DD"
        )}`;
      }
    },
    userType(val) {
      this.userParam = "";
      if (val) {
        this.userTypeParam = `&userType=${val}`;
        this.querySavedReport.userType = this.userTypeParam;
        this.queryFetch.userType = `&user.userType=${val}`;
        if (val === "FACULTY") this.assignedPeople = this.faculties;
        if (val === "STUDENT") this.assignedPeople = this.students;
        if (val === "DEPARTMENT") this.assignedPeople = this.people;
      }
    },
    // selectedUser(val) {
    //   if (val) {
    //     this.query.userType = "";
    //     this.userParam = `&user.id=${val}`;
    //     this.query.selectedUser = this.userParam;
    //   }
    // },
  },
  computed: {
    people() {
      return this.$store.state.user.activeUsersList.result;
    },
    faculties() {
      return this.people.filter((item) => item.userType === "FACULTY");
    },
    students() {
      return this.people.filter((item) => item.userType === "STUDENT");
    },
  },
  methods: {
    loader() {
      this.selectedQuery =
        this.querySavedReport.year +
        this.querySavedReport.month +
        this.querySavedReport.userType +
        this.range
          ? this.querySavedReport.range
          : "";

      var altQuery = "";
      altQuery =
        this.queryFetch.year + this.queryFetch.range + this.queryFetch.userType;
      console.log("Selected Query: ", this.selectedQuery);
      // console.log("Alt Query: ", altQuery);
      this.$emit(
        "goStepper",
        this.selectedQuery,
        altQuery,
        this.selectedYear,
        this.userType,
        this.mon,
        this.range ? this.$moment(this.range.start).format("YYYY-MM-DD") : "",
        this.range ? this.$moment(this.range.end).format("YYYY-MM-DD") : ""
      );
    },
    resetFilter() {
      // this.range = Object.assign({}, {
      //   start: '',
      //   end: ''
      // });
      this.$emit("resetFilters");
      this.range = null;
      this.selectedQuery = "";
      this.selectedYear = 0;
      this.mon = "";
      this.userType = "";
      this.yearParam = "";
      this.monthParam = "";
      this.userTypeParam = "";
      this.userParam = "";
      this.querySavedReport = Object.assign(
        {},
        {
          year: "",
          range: "",
          userType: "",
          month: "",
        }
      );
      this.selectedUser = "";
      this.assignedPeople = this.people;
    },
  },
};
</script>
