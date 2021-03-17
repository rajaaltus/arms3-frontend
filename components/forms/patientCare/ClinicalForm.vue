<template>
  <div>
    <v-form ref="form" v-model="valid" lazy-validation @submit.prevent>
      <v-container>
        <v-row>
          <v-col cols="4">
            <v-text-field
              color="green"
              v-model="pcClinical.screenings"
              label="Screenings"
              type="number"
              :rules="[v => !!v || 'Enter Total No. of Patients / Cases']"
            >
            </v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              color="green"
              v-model="pcClinical.registrations"
              label="Registrations"
              type="number"
              :rules="[v => !!v || 'Enter Total No. of Patients / Cases']"
            >
            </v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              color="green"
              v-model="pcClinical.followups"
              label="Follow-ups"
              type="number"
              :rules="[v => !!v || 'Enter Total No. of Patients / Cases']"
            >
            </v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              color="green"
              v-model="pcClinical.admissions"
              label="Admissions"
              type="number"
              :rules="[v => !!v || 'Enter Total No. of Patients / Cases']"
            >
            </v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              color="green"
              v-model="pcClinical.discharges"
              label="Discharges"
              type="number"
              :rules="[v => !!v || 'Enter Total No. of Patients / Cases']"
            >
            </v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              color="green"
              v-model="pcClinical.deaths"
              label="Deaths"
              type="number"
              :rules="[v => !!v || 'Enter Total No. of Patients / Cases']"
            >
            </v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              color="green"
              v-model="pcClinical.emergencies"
              label="Emergencies"
              type="number"
              :rules="[v => !!v || 'Enter Total No. of Patients / Cases']"
            >
            </v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              color="green"
              v-model="pcClinical.internal_ref"
              label="Referrals - Internal"
              type="number"
              :rules="[v => !!v || 'Enter Total No. of Patients / Cases']"
            >
            </v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              color="green"
              v-model="pcClinical.external_ref"
              label="Referrals - External"
              type="number"
              :rules="[v => !!v || 'Enter Total No. of Patients / Cases']"
            >
            </v-text-field>
          </v-col>
        </v-row>
        <span class="caption font-weight-light grey lighten-4 px-2 py-1">Note:Clinical services including Inpatient and Outpatient services.</span>
      </v-container>
        <v-row no-gutters>
          <v-spacer></v-spacer>
          <v-btn small color="#d74f4f" class="mr-2" dark @click="reset">
            Reset
          </v-btn>
          <v-btn small color="#57a727" dark @click="addClinical">
            Submit
          </v-btn>
        </v-row>
    </v-form>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
export default {
  data: () => ({
    valid: true,
    pcClinical: 
    {
      annual_year: 0,
      screenings: null,
      registrations: null,
      followups: null,
      admissions: null,
      discharges: null,
      deaths: null,
      emergencies: null,
      external_ref: null,
      internal_ref: null,
      deleted: false,
      department: null
    },
    selectedYear: 0
  }),
  methods: {
    reset () {
			this.$refs.form.reset()
		},
		async addClinical () {
			if (this.$refs.form.validate()) {
				this.pcClinical.annual_year = this.$store.state.selectedYear;
				this.pcClinical.department = this.$store.state.auth.user.department;
				var payload = this.pcClinical;
				// console.log(payload);
			 this.$store.dispatch('clinical/addClinical', payload)
					.then(resp => {
						Swal.fire({
							title: 'Success',
							text: 'Added Successfully!',
							icon: 'success',
							showConfirmButton: false,
							timer: 1500
						})
						this.reset();
						this.reloadData();
					})
					.catch(err => {
						this.snackbar = true
						this.submitMessage = err
					});
			}
		},
		async reloadData () {
			this.loading = true;
			let queryString = ''
			queryString = `department.id=${this.$store.state.auth.user.department}&deleted_ne=true&annual_year=${this.$store.state.selectedYear}`;
			await this.$store.dispatch('clinical/setClinicalData', {qs: queryString})
			this.loading = false;
		},
  }
}
</script>

<style scoped>
.frm-title
{
  border-left: 5px solid #f5943d;
  padding: 3px 10px;
}
</style>
