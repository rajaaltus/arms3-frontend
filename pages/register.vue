<template>
  <div class="app">
    <v-card tile class="mt-10 mb-10" color="rgba(255,255,255,1)" style="border-bottom: 3px solid #43a047;">
      <v-toolbar flat tile color="rgba(255,255,255,0.1)">
        <v-toolbar-title><img src="/text-logo.png" alt="" width="100%" class="pt-2" /></v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-form ref="regForm" lazy-validation @submit.prevent>
          <v-row>
            <v-col cols="6" md="6" lg="6">
              <v-select dense outlined v-model="register.department" :rules="[(v) => !!v || 'Please select your Department']" label="Your Department" :items="departments" item-text="name" item-value="id" color="green darken-3"> </v-select>
            </v-col>
            <v-col cols="6" md="6" lg="6">
              <v-select dense outlined v-model="register.userType" :rules="[(v) => !!v || 'Please select your Role']" label="Your Role" :items="roles" item-text="text" item-value="value" color="green darken-3"> </v-select>
            </v-col>

            <v-col cols="12" md="12" lg="12">
              <v-text-field color="green darken-3" v-model="register.fullname" :rules="[(v) => !!v || 'Enter your Full Name']" label="Full Name" type="text" outlined dense />
            </v-col>

            <v-col cols="12" md="12" lg="12">
              <v-text-field
                outlined
                v-model="register.email"
                :rules="[(v) => !!v || 'E-mail is required', (v) => /.+@.+\..+/.test(v) || 'Enter your valid Email ID']"
                label="Email Address"
                placeholder="Also your primary Login ID"
                type="email"
                color="green darken-3"
              />
            </v-col>

            <v-col cols="12" md="12" lg="12">
              <v-text-field
                outlined
                v-model="register.username"
                :rules="[(v) => !!v || 'Enter your Identification No']"
                label="Login ID (Employee / Student ID)"
                placeholder="Also your alternative Login ID"
                type="text"
                color="green darken-3"
              />
            </v-col>

            <v-col cols="12" md="12" lg="12">
              <v-text-field dense outlined v-model="register.password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :type="show1 ? 'text' : 'password'" label="Password" color="green darken-3" @click:append="show1 = !show1" />
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-col cols="8">
          <nuxt-link to="/login">
            <v-btn color="blue-grey darken-3" small text>
              <v-icon small class="pr-2">mdi-login-variant</v-icon>
              Login
            </v-btn>
          </nuxt-link>
        </v-col>
        <v-col cols="4">
          <v-btn color="green darken-3" small class="float-right" @click="registerMe" dark>
            <v-icon small class="pr-2">mdi-account-plus</v-icon>
            Create Account
          </v-btn>
        </v-col>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import Swal from "sweetalert2";
export default {
  layout: "login",
  auth: false,
  data() {
    return {
      show1: false,
      departments: [],
      register: {
        username: "",
        email: "",
        password: "",
        confirmed: true,
        fullname: "",
        userType: "",
        blocked: true,
        role: 1,
        department: 0,
      },
      roles: [
        {
          text: "Faculty / Staff",
          value: "FACULTY",
        },
        {
          text: "Student",
          value: "STUDENT",
        },
      ],
    };
  },
  async fetch({ store }) {
    await store.dispatch("user/getAllDepartment");
  },
  mounted() {
    this.departments = this.$store.state.user.departments.result;
  },
  methods: {
    async registerMe() {
      if (this.$refs.regForm.validate()) {
        var regPayload = this.register;
        let res = await this.$store.dispatch("user/addUser", regPayload);
        // console.log("Resp:", res);
        if (res == true) {
          Swal.fire({
            title: "Successfully Registered your Account.",
            text: "Please contact to your department to activate your account.",
            icon: "info",
          });
          this.reset();
          this.$router.push("/login");
        } else {
          Swal.fire({
            title: "Failure!",
            text: res.data.message ? res.data.message[0].messages[0].message : "Something Wrong! Please try again.",
            icon: "error",
          });
        }
      }
    },
    reset() {
      this.$refs.regForm.reset();
    },
  },
};
</script>
