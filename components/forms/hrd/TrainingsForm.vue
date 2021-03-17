<template>
  <div>
    <v-form ref="form" v-model="valid" lazy-validation @submit.prevent>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field
              color="green"
              v-model="trainings.training_name"
              :rules="[v => !!v || 'Item is required']"
              label="Course / Training"
            >
            </v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              color="green"
              v-model="trainings.institutional_affiliation"
              label="Institute Affiliation"
              :rules="[v => !!v || 'Item is required']"
            >
            </v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              color="green"
              v-model="trainings.no_of_candidates"
              :rules="[v => !!v || 'Item is required']"
              label="Number of Candidates"
              type="number"
            >
            </v-text-field>
          </v-col>

          <v-col cols="4">
            <v-menu
              ref="menu"
              v-model="duration_from"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  color="green"
                  v-model="trainings.from_date"
                  :return-value.sync="date"
                  :rules="[v => !!v || 'Item is required']"
                  readonly
                  label="From Date"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="trainings.from_date"
                color="green lighten-1"
                no-title
                scrollable
              >
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="duration_from = false">
                  Cancel
                </v-btn>
                <v-btn text color="primary" @click="$refs.menu.save(date)">
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="4">
            <v-menu
              ref="menu1"
              v-model="duration_to"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  color="green"
                  v-model="trainings.to_date"
                  :rules="[v => !!v || 'Item is required']"
                  :return-value.sync="date1"
                  readonly
                  label="To Date"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="trainings.to_date" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="duration_to = false">
                  Cancel
                </v-btn>
                <v-btn text color="primary" @click="$refs.menu1.save(date1)">
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="4">
            <v-select
              color="green"
              v-model="trainings.remarks_status"
              :rules="[v => !!v || 'Item is required']"
              :items="remarks"
              label="Status"
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-container fluid>
            <v-textarea
              color="green"
              v-model="trainings.brief_report"
              label="Brief Report"
            ></v-textarea>
          </v-container>
        </v-row>
      </v-container>
      <v-row no-gutters>
        <v-spacer></v-spacer>
        <v-btn small color="#d74f4f" dark class="mr-2" @click="reset">
          Reset
        </v-btn>
        <v-btn small color="#57a727" dark @click="addTraining">
          Submit
        </v-btn>
      </v-row>
    </v-form>
  </div>
</template>

<script>
import Swal from "sweetalert2";
export default {
  data: () => ({
    duration_from: false,
    duration_to: false,
    date: '',
    date1: '',
    valid: false,
    trainings: {
      annual_year: 0,
      training_name: "",
      institutional_affiliation: "",
      no_of_candidates: null,
      from_date: "",
      to_date: "",
      remarks_status: "",
      brief_report: "",
      deleted: false,
      department: 0
    },
    remarks: ["Completed", "Awarded", "Submitted", "Ongoing", "Joined"]
  }),
  methods: {
    async addTraining() {
      if (this.$refs.form.validate()) {
        this.trainings.annual_year = this.$store.state.selectedYear;
        this.trainings.department = this.$store.state.auth.user.department;
        var payload = this.trainings;
        // console.log(payload);
        this.$store
          .dispatch("hrdTraining/addTraining", payload)
          .then(resp => {
            Swal.fire({
              title: "Success",
              text: "Added Successfully!",
              icon: "success",
              showConfirmButton: false,
              timer: 1500
            });
            this.reset();
            this.reloadData();
          })
          .catch(err => {
            this.snackbar = true;
            this.submitMessage = err;
          });
      }
    },
    async reloadData() {
      this.loading = true;
      let queryString = "";
      queryString = `department.id=${this.$store.state.auth.user.department}&deleted_ne=true&annual_year=${this.$store.state.selectedYear}`;
      await this.$store.dispatch("hrdTraining/setHRDTrainings", {
        qs: queryString
      });
      this.loading = false;
    },
    reset() {
      this.$refs.form.reset();
    }
  }
};
</script>
