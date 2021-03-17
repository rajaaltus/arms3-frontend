<template>
  <div>
    <v-tabs
      background-color="light-green lighten-5"
      color="green darken-3"
      light
      vertical
    >
      <v-tab>
        <span class="mdi mdi-account-plus cust-icon"></span>
        New User
      </v-tab>
      <v-tab>
        <span class="mdi mdi-account-check cust-icon"></span>
        User Approvals
      </v-tab>

      <v-tab-item>
        <div style="height: 400px;" v-if="loading" intermediate>
          <v-row class="fill-height" align-content="center" justify="center">
            <v-progress-circular
              indeterminate
              color="green"
            ></v-progress-circular>
          </v-row>
        </div>
        <v-card v-else>
          <v-card-title>
            <span class="headline">Create New Account</span>
          </v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation @submit.prevent>
              <v-row>
                <v-col cols="4">
                  <v-select
                    color="green"
                    v-model="newUser.userType"
                    dense
                    label="User Type"
                    required
                    outlined
                    :items="userTypes"
                    prepend-inner-icon="mdi-account-question"
                  ></v-select>
                </v-col>
                <v-col cols="8">
                  <v-text-field
                    color="green"
                    v-model="newUser.fullname"
                    label="Full Name"
                    outlined
                    hint="Ex: Mr. Mighty Joe"
                    :rules="[v => !!v || 'Please Enter User\'s Full Name']"
                    prepend-inner-icon="mdi-account-settings"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    color="green"
                    v-model="newUser.email"
                    label="Email ID"
                    required
                    hint="Also your primary Login ID"
                    outlined
                    :rules="[
                      v => !!v || 'Please enter email',
                      v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
                    ]"
                    prepend-inner-icon="email"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="password"
                    color="green"
                    :rules="[v => !!v || 'Password is Required']"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show1 ? 'text' : 'password'"
                    @click:append="show1 = !show1"
                    readonly
                    label="Password"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-switch
                    v-model="newUser.blocked"
                    color="red"
                    label="Blocked"
                    class="pl-2"
                  ></v-switch>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
          <v-card-actions class="pr-5">
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" small dark @click="reset"
              >Reset</v-btn
            >
            <v-btn color="green darken-1" small dark @click="addUser"
              ><v-icon small class="pr-2">mdi-account-plus</v-icon>Create
              Account</v-btn
            >
          </v-card-actions>

          <!-- <pre>{{ newUser }}</pre> -->
        </v-card>
      </v-tab-item>

      <v-tab-item>
        <v-card flat>
          <v-card-text class="px-0 py-1">
            <v-data-table
              :items="users"
              :headers="headers"
              :loading="loading"
              loading-text="Loading... Please wait"
            >
              <template v-slot:[`item.userType`]="{ item }">
                <v-chip :color="getColor(item.userType)" dark>{{
                  item.userType
                }}</v-chip>
              </template>

              <template v-slot:[`item.blocked`]="{ item }">
                <v-switch
                  color="red"
                  class="pl-2"
                  :value="false"
                  :input-value="item.blocked"
                  @change="blockUser(item.id, $event !== null, $event)"
                ></v-switch>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-tab-item>

      <v-tab-item>
        <v-card flat>
          <v-card-text class="px-0 py-1"> </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import { mapState } from "vuex";
// import wordcloud from "vue-wordcloud";
import Swal from "sweetalert2";
export default {
  head() {
    return {
      title: "Settings"
    };
  },
  // components: {
  //   wordcloud
  // },
  data: () => ({
    blocked: false,
    loading: true,
    show1: false,
    newUser: {
      username: "",
      fullname: "",
      email: "",
      password: "user@2020",
      userType: "",
      department: 0,
      confirmed: true,
      blocked: false
    },
    dafaultUser: {
      username: "",
      fullname: "",
      email: "",
      password: "changemenow",
      userType: "",
      department: 0,
      confirmed: true,
      blocked: false
    },
    password: 'changemenow',
    userTypes: [
      {
        text: "Faculty / Staff",
        value: "FACULTY"
      },
      {
        text: "Student",
        value: "STUDENT"
      }
    ],
    headers: [
      { text: "Full Name", value: "fullname" },
      { text: "Email", value: "email" },
      { text: "Role", value: "userType" },
      { text: "Block user", value: "blocked" }
    ],
    chartOptions: {
      series: [
        {
          data: [1, 2, 3] // sample data
        }
      ]
    },
    myColors: ["#1f77b4", "#629fc9", "#94bedb", "#c9e0ef"],
  }),

  computed: {
    ...mapState({
      users: state => state.user.usersList.result
    })
  },
  async fetch({ store }) {
    let queryString = "";
    queryString = `department.id=${store.state.auth.user.department}&userType_ne=DEPARTMENT`;
    store.dispatch("user/setUsersList", { qs: queryString });
  },
  mounted() {
    this.users = this.$store.state.user.usersList.result
    this.reloadData();
  },
  methods: {
    deleteItem(item) {
      let result = this.$store.dispatch("user/deleteUser", { id: item.id });
      if (result) {
        Swal.fire("deleted");
        this.reloadData();
      }
    },
    blockUser(index, value, event) { 
       var payload = Object.assign({}, {
         id: index,
         blocked: event
       })
       var currentState = event?'block':'unblock';
       Swal.fire({
        title: `Are you sure you want to ${currentState} this user?`,
        showCancelButton: true,
        confirmButtonText: "Yes, I am Sure.",
        showLoaderOnConfirm: true,
        allowOutsideClick: () => !Swal.isLoading()
      }).then(result => {
        if (!result.dismiss) {
          this.$store
            .dispatch("user/updateUser", payload)
            .then(response => {
              Swal.fire({
                type: "success",
                title: "Updated Successfully!",
                position: "top-end",
                icon: "success",
                showConfirmButton: false,
                timer: 1500
              });
              let queryString = "";
              queryString = `department.id=${this.$store.state.auth.user.department}`;
              this.$store.dispatch("user/setUsersList", {qs: queryString});
            });
        }
      });
    },
    addUser() {
      this.newUser.department = this.$store.state.auth.user.department;
      this.newUser.password = this.password;
      this.newUser.username = this.newUser.email;
      var payload = this.newUser;
      // console.log(payload);
      this.$store
        .dispatch("user/addUser", payload)
        .then(resp => {
          // console.log(resp);
          Swal.fire({
            title: "Account Created",
            text: "User has been added successfully!",
            icon: "success",
            showConfirmButton: false,
            timer: 1500
          });
          this.dialog = false;
          this.newUser = Object.assign({}, this.defaultUser);
          this.reloadData();
        })
        .catch(e => {});
    },
    reset() {
      this.$refs.form.reset();
    },
    async reloadData() {
      this.loading = true;
      let queryString = "";
      queryString = `department.id=${this.$store.state.auth.user.department}&userType_ne=DEPARTMENT`;
      this.$store.dispatch("user/setUsersList", { qs: queryString });
      this.loading = false;
    },
    getColor(userType) {
      return userType === "FACULTY" ? "green" : "orange";
    },
    // wordClickHandler(name, value, vm) {
    //   console.log("wordClickHandler", name, value, vm);
    // }
  }
};
</script>

<style scoped>
.my-card {
  border-top: 3px solid #7cb342;
}
.cust-icon {
  font-size: 20px;
  padding-right: 10px;
}
.disp {
  color: #ffffff;
  font-size: 12px;
  font-weight: normal;
}

.disp-icon {
  color: #ffffff;
  font-size: 24px;
  font-weight: normal;
}
</style>
