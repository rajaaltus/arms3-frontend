<template>
  <div class="app">
    <v-card width="400" tile color="rgba(255,255,255,1)" style="border-bottom: 3px solid #43a047;">
      <v-toolbar flat tile color="rgba(255,255,255,0.1)">
        <v-toolbar-title><img src="/text-logo.png" alt="" width="100%" class="pt-2" /></v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-form ref="login">
          <v-text-field color="green darken-1" dense outlined v-model="loginData.login" prepend-inner-icon="mdi-account-box-outline" label="Email / Employee ID / Student ID" type="text" />
          <v-text-field
            dense
            outlined
            prepend-inner-icon="mdi-account-key"
            id="password"
            v-model="loginData.password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show1 ? 'text' : 'password'"
            label="Password"
            name="password"
            color="green darken-1"
            @click:append="show1 = !show1"
            @keypress.enter="signIn"
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-col cols="2">
          <v-tooltip top color="red darken-3">
            <template v-slot:activator="{ on, attrs }">
              <nuxt-link to="/forgot-password">
                <v-btn text dense v-bind="attrs" v-on="on" small><v-icon color="red darken-3" small>mdi-lock</v-icon></v-btn>
              </nuxt-link>
            </template>
            <span>Forgot Password?</span>
          </v-tooltip>
        </v-col>
        <v-col cols="6">
          <nuxt-link to="/register">
            <v-btn color="blue-grey darken-3" small text>
              <v-icon small class="pr-2">mdi-account-plus</v-icon>
              Create Account
            </v-btn>
          </nuxt-link>
        </v-col>
        <v-col cols="4">
          <v-btn color="success" small class="float-right" @click="signIn">
            <v-icon small class="pr-2">mdi-login-variant</v-icon>
            Login
          </v-btn>
        </v-col>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  layout: "login",
  data() {
    return {
      loginData: {
        login: "",
        password: "",
      },
      show1: false,
    };
  },
  methods: {
    async signIn() {
      await this.$auth
        .loginWith("local", {
          data: {
            identifier: this.loginData.login,
            password: this.loginData.password,
            rememberMe: true,
          },
        })
        .then((data) => {
          console.log(data.data.user);
          // this.$store.dispatch('setDepartmentName',data.data.user.department.name);
          if (data.data.user.userType === "SUPER_ADMIN") {
            this.$store.dispatch("setUserData", data.data.user);
            this.$router.push("/super");
          } else this.$router.push("/admin");
        })
        .catch((err) => {
          this.$store.dispatch("snackbar/setSnackbar", { color: "red", text: err.response.data.data[0].messages[0].message, timeout: 2000 });
          this.resetLogin();
        });
    },
    resetLogin() {
      this.$refs.login.reset();
    },
  },
};
</script>
