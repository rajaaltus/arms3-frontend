<template>
  <div>
    <v-dialog v-model="Ydialog" persistent max-width="400">
      <v-card tile>
        <v-card-title>
          <span class="text-center">Select the Reporting Year</span>
          <!-- <v-col>
              <v-btn
                x-small
                fab
                color="red darken-3"
                dark
                @click="Ydialog = false"
              >
                <v-icon small fab>mdi-close</v-icon>
              </v-btn>
            </v-col> -->
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-select
                v-model="selectedYear"
                :items="reportYears"
                item-text="val"
                item-value="id"
                label="Reporting Year"
                required
                outlined
                class="text-center"
                color="success"
              ></v-select>
            </v-col>
            <v-col cols="12">
              <v-spacer></v-spacer>
              <v-btn
                small
                color="green darken-3"
                dark
                @click="setReportingYear"
              >
                <v-icon small class="pr-2">mdi-gesture-tap</v-icon> Set Year
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data: () => ({
    Ydialog: false,
    selectedYear: 0,
  }),
  computed: {
    reportYears() {
      return this.$store.state.reportYears;
    },
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
  },
  mounted() {
    if (this.$store.state.selectedYear == 0) this.Ydialog = true;
  },
  methods: {
    async setReportingYear() {
      this.Ydialog = false;
      await this.$store.dispatch("setReportingYear", this.selectedYear);
      this.$emit("set-year");
      console.log("emitting....");
    },
  },
};
</script>
