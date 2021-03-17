<template>
  <div>
    <v-form ref="form" lazy-validation @submit.prevent="createUser">
          <h2>Personal Details</h2>
          <v-row>
            <v-col cols="12" lg="6">
              <v-text-field
                color="green"
                v-model="userData.fullname"
                label="Full Name"
                :rules="[(v) => !!v || 'Full Name is Required']"
              ></v-text-field>
            </v-col>
            <!-- <v-col cols="12" lg="3">
              <v-text-field
                color="green"
                v-model="userData.fullname"
                label="Designation"
                :rules="[(v) => !!v || 'Designation is Required']"
              ></v-text-field>
            </v-col> -->
            <!-- <v-col cols="12" lg="3">
              <v-text-field
                color="green"
                v-model="userData.fullname"
                label="Employee ID"
              ></v-text-field>
            </v-col> -->
            <v-col cols="12" lg="3">
              <v-select
                color="green"
                label="User Type"
                :items="userTypes"
                v-model="userData.userType"
                :rules="[(v) => !!v || 'UserType is Required']"
              ></v-select>
            </v-col>
             <v-col cols="12" lg="3">
              <v-select
                color="green"
                label="Department"
                :items="departments"
                v-model="userData.department"
                item-text="name"
                item-value="id"
                :rules="[(v) => !!v || 'Department is Required']"
              ></v-select>
            </v-col>
            <v-col cols="12" lg="6">
              <v-text-field
                color="green"
                :rules="[(v) => !!v || 'Email ID is Required']"
                label="Email ID"
                v-model="userData.username"
                placeholder="Also your Primary Login ID"
              ></v-text-field>
            </v-col>
             <v-col cols="12" lg="3">
              <v-text-field
                color="green"
                label="Password"
                v-model="userData.password"
                type="password"
                :rules="[(v) => !!v || 'Password is Required']"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-layout align-end justify-end>
            <v-btn color="red darken-1" small dark @click="reset" class="mr-1">
              <v-icon small class="pr-2">mdi-notification-clear-all</v-icon>
              Reset
            </v-btn>
            <v-btn color="green darken-1" type="submit" small dark >
              <v-icon small class="pr-2">mdi-account-plus</v-icon>
              Create
            </v-btn>
          </v-layout>
        </v-form>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
export default {
  data() {
    return {
      userData: {
        name: '',
        userType: '',
        confirmed: true,
        blocked: false,
        department: 0,
        username: '',
        password: ''
      },
      userTypes: [
        {
          text: 'Department',
          value: 'DEPARTMENT'
        },
        {
          text: 'Super Admin',
          value: 'SUPER_ADMIN'
        },
        {
          text: 'Faculty',
          value: 'FACULTY'
        },
        {
          text: 'Student',
          value: 'STUDENT'
        },
      ]
    }
  },
  computed: {
    departments() {
      return this.$store.state.user.departments.result;
    }
  },
  methods: {
    createUser() {
      if(this.$refs.form.validate()) {
        var payload = this.userData;
        payload.email = this.userData.username;
        this.$axios.$post('/users', payload)
          .then(response => {
            // console.log(response)
            Swal.fire({
              title: 'User Created',
              text: 'New User created!',
              icon: 'success',
              showConfirmButton: false,
              timer: 1500,
            })
            this.reset();
          })
          .catch(e => {
              if(e.response.data.message.length > 0)
                this.$store.dispatch('snackbar/setSnackbar', {color: 'red', text: e.response.data.message[0].messages[0].message, timeout: 3000}, {root: true});
                // console.log('Error message:', e.response.data.message[0].messages[0].message)
              else 
                console.log('Error Message:', e.response.data.error);
           
          })
        
      }
    },
    reset() {
      this.$refs.form.reset();
    }
  },
  
  async fetch({store}) {
    await store.dispatch('user/getAllDepartment')
  }
}
</script>