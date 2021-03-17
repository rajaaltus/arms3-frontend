<template>
  <div>
    <v-row class="px-5">
      <v-col
        cols="12"
        :lg="$auth.user.userType === 'DEPARTMENT' ? '2' : '3'"
        class="mt-5"
      >
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
      <!-- <v-col cols="12" lg="3" class="mt-5">
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              :return-value.sync="mon"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="mon"
                  placeholder="Pick Month"
                  label="Month"
                  readonly
                  outlined
                  dense
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="mon" type="month" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                <v-btn text color="primary" @click="$refs.menu.save(mon)"
                  >OK</v-btn
                >
              </v-date-picker>
            </v-menu>
          </v-col> -->
      <v-col cols="12" :lg="$auth.user.userType === 'DEPARTMENT' ? '3' : '4'">
        <v-label><small>Start Date - End Date</small></v-label>
        <vc-date-picker mode="range" v-model="range" ref="range" is-expanded />
      </v-col>
      <v-col
        cols="12"
        lg="2"
        class="mt-5"
        v-if="
          $auth.user.userType === 'DEPARTMENT' ||
          $auth.user.userType === 'SUPER_ADMIN'
        "
      >
        <v-select
          outlined
          dense
          ref="user-type"
          v-model="userType"
          label="User Type"
          placeholder="I am a"
          :items="userTypes"
          color="success"
        ></v-select>
      </v-col>

      <v-col
        cols="12"
        lg="3"
        class="mt-5"
        v-if="
          $auth.user.userType === 'DEPARTMENT' ||
          $auth.user.userType === 'SUPER_ADMIN'
        "
      >
        <v-autocomplete
          outlined
          dense
          v-model="selectedUser"
          ref="user"
          :items="assignedPeople"
          color="blue-grey lighten-2"
          label="Faculty / Staff / Student"
          placeholder="My Name is"
          item-text="fullname"
          item-value="id"
        >
          <template v-slot:selection="data">
            {{ data.item.fullname }}
          </template>
          <template v-slot:item="data">
            <template v-if="typeof data.item !== 'object'">
              <v-list-item-content v-text="data.item"></v-list-item-content>
            </template>
            <template v-else>
              <v-list-item-avatar>
                <img
                  :src="
                    data.item.avatar !== null
                      ? $axios.defaults.baseURL + data.item.avatar.url
                      : '/avatar-default-icon.png'
                  "
                />
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title
                  v-html="data.item.fullname"
                ></v-list-item-title>
                <v-list-item-subtitle
                  v-html="data.item.userType"
                ></v-list-item-subtitle>
              </v-list-item-content>
            </template>
          </template>
        </v-autocomplete>
      </v-col>

      <v-col cols="auto" lg="auto">
        <v-row>
          <v-layout align-start justify-start>
            <v-btn
              v-if="selectedYear"
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
      loading: false,
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
        this.monthParam = `&created_at_gt=${this.$moment(range.start).format(
          "YYYY-MM-DD"
        )}&created_at_lt=${this.$moment(range.end).format("YYYY-MM-DD")}`;
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
        if (val === "DEPARTMENT") this.assignedPeople = this.people;
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
    faculties() {
      return this.people.filter((item) => item.userType === "FACULTY");
    },
    students() {
      return this.people.filter((item) => item.userType === "STUDENT");
    },
  },
  async mounted() {
    let querySelector = "";
    querySelector =
      "department.id=" + `${this.$auth.user.department}` + "&blocked_ne=true";
    this.$store.dispatch("user/setActiveUsersList", { qs: querySelector });
  },
  methods: {
    loader() {
      this.selectedQuery =
        this.query.year +
        this.query.range +
        this.query.userType +
        this.query.selectedUser;
      this.$emit(
        "go",
        this.selectedQuery,
        this.selectedYear,
        this.range,
        this.userType
      );
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
