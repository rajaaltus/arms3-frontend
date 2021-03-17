<template>
  <div>
    <v-data-table
      style="border-radius:0;"
      :headers="headers"
      :items="specialData"
      sort-by="id"
      sort-desc
      class="elevation-1"
      :loading="loading"
      loading-text="Loading... Please wait"
    >
      <template v-slot:item.updated_at="{ item }">
        {{ $moment(item.updated_at).fromNow() }}
      </template>
      <template v-slot:top>
        <v-toolbar flat color="#ebebeb" class="d-flex justify mt-4 pt-1" style="border-radius:0;">
          <v-toolbar-title
            ><span class="frm-title"
              >Special Clinics / Services / Procedures</span
            ></v-toolbar-title
          >
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-select
            color="green"
            v-model="annualYear"
            :items="reportYears"
            item-text="val"
            item-value="id"
            label="Reporting Year"
            required
            class="justify-end mt-6"
            @change="reloadData()"
          ></v-select>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-tooltip right color="blue-grey darken-2">
            <template v-slot:activator="{ on }">
              <v-btn
                x-small
                fab
                color="green"
                dark
                @click="reloadData"
                v-on="on"
              >
                <v-icon>mdi-reload</v-icon>
              </v-btn>
            </template>
            <span>Reload Data</span>
          </v-tooltip>
          <v-dialog
            v-model="dialog"
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
          >
            <v-card flat>
              <v-toolbar dark color="#41704e">
                <v-btn icon dark @click="dialog = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title
                  >Special Clinics / Services / Procedures</v-toolbar-title
                >
                <v-spacer></v-spacer>
                <v-toolbar-items>
                  <v-btn dark text @click="close">
                    Cancel
                  </v-btn>
                  <v-btn dark text @click="save">
                    Save
                  </v-btn>
                </v-toolbar-items>
              </v-toolbar>
              <v-card-text>
                <v-form
                  ref="editedForm"
                  v-model="valid"
                  lazy-validation
                  @submit.prevent
                >
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          color="green"
                          v-model="editedItem.service_name"
                          label="Special Clinic / Service / Procedure Name"
                          :rules="[
                            v =>
                              !!v ||
                              'Enter Special Clinic / Service / Procedure Name'
                          ]"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          color="green"
                          v-model="editedItem.description"
                          label="Description"
                          :rules="[v => !!v || 'Enter a Brief Description']"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="4">
                        <v-text-field
                          color="green"
                          v-model="editedItem.followup_patients"
                          label="Follow Up Patients"
                          :rules="[
                            v => !!v || 'Enter the Total No. of New Patients'
                          ]"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="4">
                        <v-text-field
                          color="green"
                          v-model="editedItem.referrals"
                          label="Referrals"
                          :rules="[
                            v =>
                              !!v || 'Enter the Total No. of Follow-up Patients'
                          ]"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="4">
                        <v-text-field
                          color="green"
                          v-model="editedItem.new_patients"
                          label="New Patients"
                          :rules="[
                            v => !!v || 'Enter the Total No. of Referrals'
                          ]"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-form>
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.action="{ item }">
        <v-icon centre @click="editItem(item)" color="green">mdi-pencil-box</v-icon>
        <v-icon centre @click="deleteItem(item)" color="error">mdi-delete-circle</v-icon>
      </template>
     
    </v-data-table>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Swal from 'sweetalert2'
export default {
  props: ['reportYears'],
  data: () => ({
    valid: true,
    loading: false,
    annualYear: 0,
    editedItem: 
		{
			annual_year: 0,
			service_name: "",
			description: "",
			new_patients: 0,
			followup_patients: 0,
			referrals: 0,
			deleted: false,
			deleted: false,
			department: 0
		},
		deletedItem: 
		{
			annual_year: 0,
			service_name: "",
			description: "",
			new_patients: 0,
			followup_patients: 0,
			referrals: 0,
			deleted: false,
			deleted: false,
			department: 0
    },
    dialog: false,
    headers: [
			{
				text: 'Last updated',
				align: 'left',
				value: 'updated_at'
			},
			{ text: 'Name', value: 'service_name'},
			{ text: 'Description', value: 'description' },
			{ text: 'New Patients', value: 'new_patients'},
			{ text: 'Follow-up Patients', value: 'followup_patients'},
			{ text: 'Referrals', value: 'referrals'},
			{ text: 'Actions', value: 'action', sortable: false },
		],
  }),
  computed: {
		...mapState({
			specialData: state => state.special.specialData,
		}),
  },
  mounted () {
    this.annualYear = this.$store.state.selectedYear;
  },
	watch: {
		dialog (val) {
			val || this.close()
    },
	},
	
  methods: {
		async reloadData () {
			this.loading = true;
			let queryString = ''
			queryString = `department.id=${this.$store.state.auth.user.department}&deleted_ne=true&annual_year=${this.annualYear}`;
			await this.$store.dispatch('special/setSpecialData', {qs: queryString});
			this.loading = false;
    },
    reset () {
			this.$refs.form.reset()
		},
		
		editItem (item) {
			this.editedIndex = this.specialData.indexOf(item)
			this.editedItem = Object.assign({}, item)
			this.dialog = true
		},

		deleteItem (item) {
			 const index = this.specialData.indexOf(item)
			 this.deletedItem = Object.assign({}, item)
			// confirm('Are you sure you want to delete this item?') && this.programmesData.splice(index, 1)
			this.deletedItem.deleted = true;
			var payload = this.deletedItem;
			// console.log(payload);
			var vm = this;
			confirm('Are you sure you want to delete this item?') && 	this.$store.dispatch('special/updateSpecial', payload)
				.then(resp => {
					Swal.fire({
						title: 'Success',
						text: 'Deleted Successfully!',
						icon: 'success',
						showConfirmButton: false,
						timer: 1500
					})
					this.reloadData();
				})
				.catch(err => {
					this.snackbar = true
					this.submitMessage = err
				});
		},

		close () {
			this.dialog = false
			setTimeout(() => {
				this.specialData = Object.assign({}, this.defaultItem)
				this.editedIndex = -1
			}, 300)
		},

		save () {
			if (this.$refs.editedForm.validate()) {
				if (this.editedIndex > -1) {
				// Object.assign(this.program[this.editedIndex], this.editedItem)
					var payload = this.editedItem;
					console.log(payload);
					var vm = this;
			 	this.$store.dispatch('special/updateSpecial', payload)
						.then(resp => {
							Swal.fire({
								title: 'Success',
								text: 'Updated Successfully!',
								icon: 'success',
								showConfirmButton: false,
								timer: 1500
							})
							this.reloadData();
						})
						.catch(err => {
							this.snackbar = true
							this.submitMessage = err
						});
				} else {
				// this.program.push(this.editedItem)
					console.log(this.specialData.push(this.editedItem))
				}
				this.close()
			}
		}
  }
}
</script>

<style scoped>
.frm-title
{
  border-left: 5px solid #e16949;
  padding: 3px 10px;
}
</style>