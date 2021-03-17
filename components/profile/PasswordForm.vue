<template>
  <div>
    <v-form ref="form" v-model="valid" lazy-validation>
      <h2>Change Password</h2>
      <v-row>
        <v-col cols="6">
          <v-text-field
            v-model="newPassword.password"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show ? 'text' : 'password'"
            @click:append="show = !show"
            color="green"
            label="New Password"
            :rules="[v => !!v || 'New Password is Required']"
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field
            v-model="newPassword.confirmpassword"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show1 ? 'text' : 'password'"
            @click:append="show1 = !show1"
            color="green"
            label="Confirm the New Password"
            :rules="[v => !!v || 'Confirmation is Required', passwordConfirmation]"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-layout align-end justify-end>
        <v-btn color="green darken-1" small dark @click="updatePassword" >
          <v-icon small class="pr-2">mdi-key-change</v-icon>
          Update Password
        </v-btn>
      </v-layout>
    </v-form>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
export default {
  props: ['profileId'],
  data () {
    return{
      valid: false,
      show: false,
      show1: false,
      newPassword: {
        password: '',
        confirmpassword: ''
      },
    }
  },

  computed: {
    passwordConfirmation() {
      return () => (this.newPassword.password === this.newPassword.confirmpassword) || 'Password must match'
    }
  },
  methods: {
    updatePassword() {
      let uid= 0
      uid = this.$auth.user.id
      var payload = Object.assign({}, {
        id: uid,
        password: this.newPassword.password 
      })
      console.log(payload)
      this.$store.dispatch('user/updateUser', payload)
      .then(resp=>{
          Swal.fire({
            title: "Updated",
            text: "Your Password has been updated successfully!",
            icon: "success",
            showConfirmButton: false,
            timer: 1500
          });
          this.$auth.logout();
        })
        .catch(e => {
        })
        .finally(() => {
        })

    }
  }
}
</script>
