<template>
  <div class="app">
    <v-card tile width="400" color="rgba(255,255,255,1)" style="border-bottom: 3px solid #43a047;">
      <v-toolbar flat tile color="rgba(255,255,255,0.1)">
        <v-toolbar-title><img src="/text-logo.png" alt="" width="100%" class="pt-2" /></v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-form ref="passwordReset">
          <v-select dense outlined v-model="department" :rules="[(v) => !!v || 'Please select your Department']" label="Your Department" :items="departments" item-text="name" item-value="id" color="green darken-3"> </v-select>
          <v-text-field
            outlined
            dense
            v-model="forgotMail.email"
            :rules="[(v) => !!v || 'E-mail is required', (v) => /.+@.+\..+/.test(v) || 'Enter your valid Email ID']"
            label="Registered Email ID"
            placeholder="Also your primary Login ID"
            type="email"
            color="green darken-3"
          />
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
          <v-btn color="success" small @click="handleForgotPassword">
            <v-icon small class="pr-2">mdi-mail</v-icon>
            Send Me
          </v-btn>
        </v-col>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  layout: "login",
  auth: false,
  data() {
    return {
      forgotMail: {
        email: "",
      },
      available: [],
      departments: [],
      department: 0,
    };
  },
  watch: {
    department(val) {
      this.forgotMail.email = "";
      let queryString = "";
      queryString = "department=" + this.department;
      this.$store.dispatch("user/setActiveUsersList", { qs: queryString });
    },
  },
  computed: {
    ...mapState({
      activeUsers: (state) => state.user.activeUsersList.result,
    }),
  },
  async fetch({ store }) {
    await store.dispatch("user/getAllDepartment");
  },
  mounted() {
    this.departments = this.$store.state.user.departments.result;
  },
  methods: {
    handleForgotPassword() {
      const result = this.activeUsers.filter((user) => user.email === this.forgotMail.email).length;
      if (result) {
        var payload = this.forgotMail;
        this.$store.dispatch("user/forgotPassword", payload).then((resp) => {
          if (resp) {
            this.$store.dispatch("snackbar/setSnackbar", { color: "green", text: "Please check you mail and click the link to update your password!", timeout: 3000 });
            this.forgotForm = false;
            this.$refs.passwordReset.reset();
            this.$router.push("/");
          }
        });
      } else {
        this.$store.dispatch("snackbar/setSnackbar", { color: "red", text: "Email not found!", timeout: 3000 });
        console.log("Email id not found!");
      }
    },
  },
};
</script>

<style></style>
