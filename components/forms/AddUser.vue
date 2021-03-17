<template>
  <div class="text-center">
    <v-dialog v-model="dialog" persistent max-width="50%">
      <template v-slot:activator="{ on }">
        <v-btn x-small color="amber darken-4" fab dark v-on="on" class="mt-4">
          <v-icon>mdi-account-plus</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Add New User</span><br>
          <span class="caption font-weight-light">This credentials can be given to the respective faculty / student for their use of this application.<br>The default <b>PASSWORD</b> is: changemenow</span>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="4">
              <v-select
                color="green"
                v-model="newUser.userType"
                label="User Type"
                required
                outlined
                :items="userTypes"
                prepend-inner-icon="mdi-account-question"
              ></v-select>
            </v-col>
            <v-col cols="8">
              <v-text-field
                color="green"
                v-model="newUser.fullname"
                label="Full Name"
                outlined
                hint="Ex: Mr. Mighty Joe"
                :rules="[v => !!v || 'Please Enter User\'s Full Name']"
                prepend-inner-icon="mdi-account-settings"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                color="green"
                v-model="newUser.email"
                label="Email ID"
                required
                hint="Also your primary Login ID"
                outlined
                :rules="[
                  v => !!v || 'Please enter email',
                  v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
                ]"
                prepend-inner-icon="email"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
                  <v-text-field
                    color="green"
                    :rules="[v => !!v || 'Password is Required']"
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show ? 'text' : 'password'"
                    @click:append="show = !show"
                    label="Password"
                    value="changemenow"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-switch
                    color="red darken-3"
                    label="Blocked"
                    class="pl-2"
                  ></v-switch>
                </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="pr-5">
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" small dark @click="dialog = false"
            >Close</v-btn
          >
          <v-btn color="green darken-1" small dark @click="addUser"
            ><v-icon small class="pr-2">mdi-account-plus</v-icon>Create
            Account</v-btn
          >
        </v-card-actions>

        <!-- <pre>{{ newUser }}</pre> -->
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Swal from "sweetalert2";
export default {
  data() {
    return {
      dialog: false,
      show: false,
      newUser: {
        username: "",
        fullname: "",
        email: "",
        password: "",
        userType: "",
        department: 0,
        confirmed: true,
        blocked: false
      },
      userTypes: [
        {
          text: "Faculty / Staff",
          value: "FACULTY"
        },
        {
          text: "Student",
          value: "STUDENT"
        }
      ],
      userType: null,
    };
  },
  async mounted() {},
  methods: {
    addUser() {
      this.newUser.department = this.$store.state.auth.user.department;
      this.newUser.password = "changemenow";
      this.newUser.username = this.newUser.email;
      this.userType = this.newUser.userType;
      var payload = this.newUser;
      // console.log(payload);
      this.$store
        .dispatch("user/addUser", payload)
        .then(resp => {
          console.log(resp);
          Swal.fire({
            title: "Added",
            text: "This account credentials should be given to the respective faculy / staff.",
            icon: "success",
            showConfirmButton: false,
            timer: 1500
          });
          this.dialog = false;
          if(this.userType==='STUDENT')
            this.$emit("new-student");
          else
            this.$emit('new-user');
          console.log("emitting....");
        })
        .catch(e => {});
    }
  }
};
</script>
