<template>
  <v-app>
    <v-main>
      <div class="backdrop">
        <div class="dark-overlay">
          <div class="main-layout ma-auto">
            <nuxt />
          </div>
        </div>
      </div>
    </v-main>
    <v-snackbar
      v-for="(snackbar, index) in snackbars.filter((s) => s.showing)"
      center
      top
      :key="snackbar.text + Math.random()"
      :value="snackbar.showing"
      @input="removeSnackbar(snackbar)"
      :timeout="snackbar.timeout"
      :color="snackbar.color"
      :style="`top: ${index * 60 + 8}px`"
    >
      <v-icon dark right class="mr-2">
        {{ snackbar.color === "green" ? "mdi-checkbox-marked-circle" : "info" }}
      </v-icon>
      {{ snackbar.text }}
      <v-btn text @click="removeSnackbar(snackbar)">
        Close
      </v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import Swal from "sweetalert2";
import { mapState } from "vuex";
export default {
  head() {
    return {
      title: "ARMS Admin Login Page",
    };
  },
  data() {
    return {
      password: "Password",
      registerForm: false,
      forgotForm: false,
      recoverPassEmail: "",
    };
  },
  computed: {
    ...mapState({
      snackbars: (state) => state.snackbar.snackbars,
    }),
  },

  methods: {
    removeSnackbar(snackbar) {
      this.$store.dispatch("snackbar/remove", snackbar);
    },
  },
};
</script>

<style>
.v-snack__content {
  padding: 0 10px !important;
}
.backdrop {
  background-image: url("/bg-3.jpg");
  background-size: cover;
  background-position: center center;
  display: flex;
  flex-basis: 100%;
  height: 100%;
}

.dark-overlay {
  overflow: auto;
  margin: auto;
}

.text-input-style {
  border: none;
}
.main-layout {
  max-width: 960px;
}
</style>
