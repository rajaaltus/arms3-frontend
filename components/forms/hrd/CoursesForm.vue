<template>
  <div>
    <v-form ref="form" v-model="valid" lazy-validation @submit.prevent>
      <v-container>
        <v-row>
          <v-col cols="4">
            <v-select
              color="green"
              v-model="hrd.course_name"
              :rules="[v => !!v || 'Item is required']"
              :items="courses"
              item-text="text"
              item-value="val"
              label="Select Course"
            ></v-select>
          </v-col>
          <v-col v-if="hrd.course_name === 'Others'" cols="8">
            <v-text-field
            color="green"
              v-model="hrd.other_name"
              :rules="[v => !!v || 'Item is required']"
              label="Course Name"
              required
            >
            </v-text-field>
          </v-col>
          <v-col cols="5">
            <v-text-field
            color="green"
              v-model="hrd.candidate_name"
              :rules="[v => !!v || 'Item is required']"
              label="Name of the Candidate"
              required
            >
            </v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field
            color="green"
              v-model="hrd.durations"
              label="Duration (No. ofYears)"
              :rules="[v => !!v || 'Item is required']"
              required
              type="number"
            >
            </v-text-field>
          </v-col>
          <v-col cols="12">
            <v-textarea
            color="green"
              v-model="hrd.thesis_title"
              label="Title of Thesis (If applicable)"
              required
            >
            </v-textarea>
          </v-col>
          <v-col cols="12">
            <v-text-field color="green" v-model="hrd.guides" label="Guides (If applicable)">
            </v-text-field>
          </v-col>
          <v-col cols="6">
            <v-select
            color="green"
              v-model="hrd.remarks_status"
              :items="remarks"
              label="Status"
              :rules="[v => !!v || 'Item is required']"
            ></v-select>
          </v-col>
        </v-row>
      </v-container>
        <v-row no-gutters>
          <v-spacer></v-spacer>
          <v-btn small color="#d74f4f" dark class="mr-2" @click="reset">
            Reset
          </v-btn>
          <v-btn small color="#57a727" dark @click="addHRDCourse">
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
    valid: false,
    hrd: 
		{
			annual_year: 0,
			course_name: "",
			other_name: "",
			candidate_name: "",
			durations: null,
			thesis_title: "",
			guides: "",
			remarks_status: "",
			deleted: false,
			department: 0
    },
    courses: [ 
			{ 
				text: 'Post Doctoral Fellow', 
				val: 'Post_Doctoral_Fellow'
			},
			{ 
				text: 'Phd', 
				val: 'PhD'
			},
			{ 
				text: 'DM / MCH', 
				val: 'DM_or_MCH'
			},
			{ 
				text: 'MPhil', 
				val: 'MPhil'
			},
			{ 
				text: 'MSc', 
				val: 'MSc'
			},
			{ 
				text: 'Others', 
				val: 'Others'
			},
		],
		remarks: ['Completed', 'Awarded', 'Submitted', 'Ongoing', 'Joined'],
  }),
  methods: {
    async addHRDCourse () {
			if (this.$refs.form.validate()) {
				this.hrd.annual_year = this.$store.state.selectedYear;
				this.hrd.department = this.$store.state.auth.user.department;
				var payload = this.hrd;
				// console.log(payload);
			 this.$store.dispatch('hrdCourse/addHRDCourse', payload)
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
		reloadData () {
			this.loading = true;
			let queryString = ''
			queryString = `department.id=${this.$store.state.auth.user.department}&deleted_ne=true&annual_year=${this.$store.state.selectedYear}`;
			this.$store.dispatch('hrdCourse/setHRDCourses', {qs: queryString})
			this.loading = false;
    },
    reset () {
			this.$refs.form.reset()
		},
  }
}
</script>