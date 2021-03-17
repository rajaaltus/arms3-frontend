<template>
  <div>
    <v-form ref="form" v-model="valid" lazy-validation @submit.prevent>
      <v-container>
        <v-row>
          <v-col cols="4">
            <v-text-field
              color="green"
              v-model="emergency.registrations"
              label="Registrations"
              required
              type="number"
              :rules="[v => !!v || 'Enter the Total No. of Patients / Cases']"
            >
            </v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              color="green"
              v-model="emergency.admissions"
              label="Admissions"
              required
              type="number"
              :rules="[v => !!v || 'Enter the Total No. of Patients / Cases']"
            >
            </v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              color="green"
              v-model="emergency.deaths"
              label="Deaths"
              required
              type="number"
              :rules="[v => !!v || 'Enter the Total No. of Patients / Cases']"
            >
            </v-text-field>
          </v-col>

          <v-col cols="4">
            <v-text-field
              color="green"
              v-model="emergency.internal_ref"
              label="Referrals - Internal"
              required
              type="number"
              :rules="[v => !!v || 'Enter the Total No. of Patients / Cases']"
            >
            </v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              color="green"
              v-model="emergency.external_ref"
              label="Referrals - External"
              required
              type="number"
              :rules="[v => !!v || 'Enter the Total No. of Patients / Cases']"
            >
            </v-text-field>
          </v-col>
        </v-row>
      </v-container>
      <v-row no-gutters>
        <v-spacer></v-spacer>
        <v-btn small color="#d74f4f" class="mr-2" dark @click="reset">
          Reset
        </v-btn>
        <v-btn small color="#57a727" dark @click="addEmergency">
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
    emergency: 
    {
      annual_year: 0,
      registrations: null,
      admissions: null,
      deaths: null,
      external_ref: null,
      internal_ref: null,
      deleted: false,
      department: null
    },
  }),
  // async mounted () {
  //   this.reloadData();
  // },
  methods: {
    async addEmergency () {
			if (this.$refs.form.validate()) {
				this.emergency.annual_year = this.$store.state.selectedYear;
				this.emergency.department = this.$store.state.auth.user.department;
				var payload = this.emergency;
				console.log(payload);
				this.$store.dispatch('emergency/addEmergency', payload)
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
			await this.$store.dispatch('emergency/setEmergencyData', {qs: queryString});
			this.loading = false;
    },
    reset () {
			this.$refs.form.reset()
		},
  }
  
  
}
</script>