<template>
  <div class="app">
    <v-card tile width="400" class="mt-10 mb-10" color="rgba(255,255,255,1)" style="border-bottom: 3px solid #43a047;">
      <v-toolbar flat tile color="rgba(255,255,255,0.1)">
        <v-toolbar-title><img src="/text-logo.png" alt="" width="100%" class="pt-2" /> </v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-form ref="resetForm" @submit.prevent="">
          <v-col cols="12">
            <v-text-field
              v-model="userData.password"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show1 ? 'text' : 'password'"
              required
              dense
              outlined
              placeholder="Enter new password"
              label="New Password"
              @click:append="show1 = !show1"
            >
            </v-text-field>

            <v-text-field
              v-model="confirmPassword"
              :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show2 ? 'text' : 'password'"
              required
              dense
              outlined
              placeholder="Re-Type password"
              label="Re-Type Password"
              @click:append="show2 = !show2"
            >
            </v-text-field>
          </v-col>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-col cols="12">
          <v-btn small class="success" @click="updatePassword">Update Password</v-btn>
        </v-col>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  layout: "login",
  auth: false,
  data() {
    return {
      show1: false,
      show2: false,
      confirmPassword: "",
      userData: {
        id: 0,
        password: "",
        resetPasswordToken: null,
      },
      userId: 0,
      resetKey: "",
    };
  },
  mounted() {
    this.resetKey = this.$route.query.code;
    this.getUser();
  },
  methods: {
    getUser() {
      this.$axios
        .$get(`/users?resetPasswordToken=${this.resetKey}`)
        .then((resp) => {
          if (resp.length > 0) {
            this.userData.id = resp[0].id;
            console.log(this.userData.id);
          } else {
            this.$store.dispatch("snackbar/setSnackbar", { color: "red", text: "Token Expired! Please try resetting the password!", timeout: 3000 });
            this.$router.push("/login");
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    validateRetype() {
      return this.confirmPassword === this.userData.password ? true : false;
    },
    updatePassword() {
      if (this.validateRetype()) {
        var payload = this.userData;
        console.log(payload);
        this.$store
          .dispatch("user/updatePassword", payload)
          .then((resp) => {
            if (resp) {
              this.$store.dispatch("snackbar/setSnackbar", { color: "green", text: "Password updated! Login with your new password", timeout: 3000 });
              this.$router.push("/");
            }
          })
          .catch((e) => {
            this.$store.dispatch("snackbar/setSnackbar", { color: "red", text: e.message, timeout: 3000 });
          });
      } else {
        this.$store.dispatch("snackbar/setSnackbar", { color: "red", text: "Password doesn't match", timeout: 3000 });
      }
    },
  },
};
</script>
