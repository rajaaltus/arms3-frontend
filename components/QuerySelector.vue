<template>
  <div>
    <v-row>
      <v-col cols="12" :lg="$auth.user.userType === 'DEPARTMENT' ? '2' : '3'" class="mt-5">
        <v-select outlined dense v-model="selectedYear" ref="year" :items="reportYears" item-value="id" item-text="val" label="Reporting Year" placeholder="Pick Year" color="success"></v-select>
      </v-col>
      <v-col cols="12" :lg="$auth.user.userType === 'DEPARTMENT' ? '3' : '4'">
        <vc-date-picker v-model="range" is-range style="display: flex; margin-top: 1.3rem; align-items: baseline; z-index: 99;">
          <template v-slot="{ inputValue, inputEvents }">
            <v-text-field :value="inputValue.start" label="From" v-on="inputEvents.start" outlined dense></v-text-field>
            <svg style="width: 1rem; height: 1rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
            <v-text-field :value="inputValue.end" label="To" v-on="inputEvents.end" outlined dense></v-text-field>
          </template>
        </vc-date-picker>
      </v-col>
      <v-col cols="12" lg="2" class="mt-5" v-if="$auth.user.userType === 'DEPARTMENT' || $auth.user.userType === 'SUPER_ADMIN'">
        <v-select outlined dense ref="user-type" v-model="userType" label="User Type" placeholder="I am a" :items="userTypes" color="success" @change="setAssignedPeople(userType)"></v-select>
      </v-col>

      <v-col cols="12" lg="2" class="mt-5" v-if="$auth.user.userType === 'DEPARTMENT' || $auth.user.userType === 'SUPER_ADMIN'">
        <v-autocomplete v-model="selectedUser" outlined dense ref="user" :items="assignedPeople" color="blue-grey lighten-2" label="Select User" placeholder="My Name is" item-text="fullname" item-value="id">
          <template v-slot:selection="data">
            {{ data.item.name }}
          </template>
          <template v-slot:item="data">
            <template v-if="typeof data.item !== 'object'">
              <v-list-item-content v-text="data.item"></v-list-item-content>
            </template>
            <template v-else>
              <v-list-item-avatar>
                <img :src="data.item.user.avatar !== null ? $axios.defaults.baseURL + data.item.user.avatar.url : '/avatar-default-icon.png'" />
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title v-html="data.item.name"></v-list-item-title>
                <v-list-item-subtitle v-html="data.item.user.userType"></v-list-item-subtitle>
              </v-list-item-content>
            </template>
          </template>
        </v-autocomplete>
      </v-col>

      <v-col cols="auto" lg="auto" class="mt-3">
        <v-row>
          <v-layout align-start justify-start>
            <v-btn v-if="selectedYear" :loading="loading" :disabled="loading" color="green" x-small class="mt-6 mr-1 white--text" fab @click="loader()">
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
    <div>
      <!-- <pre>{{query}}</pre> -->
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
      sheet: false,
      dataLoaded: false,
      assignedPeople: [],
      assignedActivities: [],
      loading: false,
      selectedActivity: "",
      selectedUser: "",
      selectedYear: 0,
      selectedQuery: "",
      query: {
        year: "",
        range: "",
        userType: "",
        selectedUser: "",
      },
      yearParam: "",
      userTypeParam: "",
      monthParam: "",
      userParam: "",
      userType: "",
    };
  },
  watch: {
    // report(val) {
    //   this.reportStepper = val;
    // },
    selectedYear(val) {
      if (val) {
        this.yearParam = "annual_year=" + val;
        this.query.year = this.yearParam;
      }
    },
    range(val) {
      console.log("Range Val: ", val);
      if (val) {
        var range = Object.assign({}, val);
        this.monthParam = `&created_at_gt=${this.$moment(range.start).format("YYYY-MM-DD")}&created_at_lt=${this.$moment(range.end).format("YYYY-MM-DD")}`;
      }
      this.query.range = this.monthParam;
    },
    userType(val) {
      this.userParam = "";
      if (val) {
        this.userTypeParam = `&user.userType=${val}`;
        this.query.userType = this.userTypeParam;
        if (val === "FACULTY") this.assignedPeople = this.faculties;
        if (val === "STUDENT") this.assignedPeople = this.students;
      }
    },
    selectedUser(val) {
      if (val) {
        this.query.userType = "";
        this.userParam = `&user.id=${val}`;
        this.query.selectedUser = this.userParam;
      }
    },
  },
  computed: {
    people() {
      return this.$store.state.user.activeUsersList.result;
    },
    activities() {
      return this.$store.state.activities;
    },
    studentActivities() {
      return this.$store.state.studentActivities;
    },
    faculties() {
      return this.people.filter((item) => item.user.userType === "FACULTY");
    },
    students() {
      return this.people.filter((item) => item.user.userType === "STUDENT");
    },
  },
  async mounted() {
    let querySelector = "";
    querySelector = "department.id=" + `${this.$auth.user.department}` + "&blocked_ne=true";
    this.$store.dispatch("user/setActiveUsersList", { qs: querySelector });
    this.$store.dispatch("setActivities");
    this.$store.dispatch("setStudentActivities");
  },
  methods: {
    setAssignedPeople(userType) {
      userType === "FACULTY" && ((this.assignedPeople = this.faculties), (this.assignedActivities = this.activities));
      userType === "STUDENT" && ((this.assignedPeople = this.students), (this.assignedActivities = this.studentActivities));
    },
    loader() {
      this.selectedQuery = this.query.year + this.query.range + this.query.userType + this.query.selectedUser;
      this.$emit("go", this.selectedQuery, this.selectedYear, this.range, this.userType, this.selectedActivity);
      console.log("Selected Query: ", this.selectedQuery);
    },
    resetFilter() {
      this.$emit("resetFilters");
      this.range = null;
      this.selectedQuery = "";
      this.selectedYear = 0;
      this.userType = "";
      this.yearParam = "";
      this.monthParam = "";
      this.userTypeParam = "";
      this.userParam = "";
      this.query = Object.assign(
        {},
        {
          year: "",
          range: "",
          userType: "",
          selectedUser: "",
        }
      );
      this.selectedUser = "";
      this.assignedPeople = this.people;
    },
  },
};
</script>
