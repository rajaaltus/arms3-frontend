<template>
  <div>
    <v-form ref="form" v-model="valid" lazy-validation @submit.prevent>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field
              color="green"
              v-model="special.service_name"
              :rules="[
                v => !!v || 'Enter Special Clinic / Service / Procedure Name'
              ]"
              label="Special Clinic / Service / Procedure Name"
              required
            >
            </v-text-field>
          </v-col>
          <v-col cols="12">
            <v-textarea
              color="green"
              v-model="special.description"
              :rules="[v => !!v || 'Enter a Brief Description']"
              label="Description"
              placeholder="Specify the services offered and the number of patients benefitted from the services."
              required
            >
            </v-textarea>
          </v-col>
          <v-col cols="4">
            <v-text-field
              color="green"
              v-model="special.new_patients"
              :rules="[v => !!v || 'Enter the Total No. of New Patients']"
              label="New Patients"
              required
              type="number"
            >
            </v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              color="green"
              v-model="special.followup_patients"
              :rules="[v => !!v || 'Enter the Total No. of Follow-up Patients']"
              label="Follow-up Patients"
              required
              type="number"
            >
            </v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              color="green"
              v-model="special.referrals"
              :rules="[v => !!v || 'Enter the Total No. of Referrals']"
              label="Referrals"
              required
              type="number"
            >
            </v-text-field>
          </v-col>
           <span class="caption font-weight-light grey lighten-4 px-2 py-1">Note: Please include all the special clinics / services / procedures being run by the department.</span>
        </v-row>
      </v-container>
      <v-row no-gutters>
        <v-spacer></v-spacer>
        <v-btn small color="#d74f4f" dark class="mr-2" @click="reset">
          Reset
        </v-btn>
        <v-btn small color="#57a727" dark @click="addSpecial">
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
    special: {
      annual_year: 0,
      service_name: "",
      description: "",
      new_patients: null,
      followup_patients: null,
      referrals: null,
      deleted: false,
      department: null
    },
    valid: false,
    selectedYear: 0
  }),
  methods: {
    async addSpecial() {
      if (this.$refs.form.validate()) {
        this.special.annual_year = this.$store.state.selectedYear;
        this.special.department = this.$store.state.auth.user.department;
        var payload = this.special;
        // console.log(payload);
        this.$store
          .dispatch("special/addSpecial", payload)
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
      await this.$store.dispatch("special/setSpecialData", { qs: queryString });
      this.loading = false;
    },
    reset() {
      this.$refs.form.reset();
    }
  }
};
</script>
