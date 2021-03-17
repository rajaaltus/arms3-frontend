<template>
  <div>
    <v-form ref="form" v-model="valid" lazy-validation @submit.prevent>
      <v-container>
        <v-row>
          <v-col cols="3">
            <v-combobox
              color="green"
              v-model="otservice.Procedure"
              :items="procedures"
              :loading="isLoading"
              :search-input.sync="search"
              clearable
              item-text="Procedure"
              item-value="Procedure"
              label="Procedure"
              :rules="[v => !!v || 'Enter the procedure']"
            >
              <template v-slot:no-data>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>
                      No results matching. Press <kbd>tab</kbd> to create a new
                      one
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </template>
              <template v-slot:item="{ item }">
                <v-list-item-avatar
                  color="indigo"
                  class="headline font-weight-light white--text"
                >
                  {{ item.charAt(0) }}
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title v-text="item"></v-list-item-title>
                </v-list-item-content>
              </template>
            </v-combobox>
          </v-col>
          <v-col cols="6">
            <v-text-field
              color="green"
              v-model="otservice.classification"
              :rules="[v => !!v || 'Enter the Classification']"
              label="Classification"
              required
            >
            </v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field
              color="green"
              v-model="otservice.no_of_patients"
              label="Number Of Patients"
              type="number"
              :rules="[v => !!v || 'Enter the Total No. of Patients']"
            >
            </v-text-field>
          </v-col>
          <v-col cols="12">
            <v-textarea
              color="green"
              v-model="otservice.description"
              label="Description"
            >
            </v-textarea>
          </v-col>
        </v-row>
      </v-container>
      <v-row no-gutters>
        <v-spacer></v-spacer>
        <v-btn small color="#d74f4f" dark class="mr-2" @click="reset">
          Reset
        </v-btn>
        <v-btn small color="#57a727" dark @click="addOTService">
          Submit
        </v-btn>
      </v-row>
    </v-form>
  </div>
</template>

<script>
import Swal from "sweetalert2";
export default {
  data() {
    return {
      isLoading: false,
      search: "",
      valid: false,
      otservice: {
        Procedure: "",
        classification: "",
        description: "",
        no_of_patients: null,
        department: null,
        annual_year: null,
        deleted: false
      }
    };
  },
  computed: {
    procedures() {
      return this.$store.state.otservice.otservicesData.map(item => item.Procedure);
    }
  },
  methods: {
    // getProcedures() {
    //   var procedures = [];
    //   this.$store.state.otservice.otservicesData.forEach(function(item, index) {
    //     procedures.push(item.Procedure);
    //   });
    //   return procedures;
    //   this.isLoading = false;
    // },
    async addOTService() {
      if (this.$refs.form.validate()) {
        this.otservice.annual_year = this.$store.state.selectedYear;
        this.otservice.department = this.$store.state.auth.user.department;
        var payload = this.otservice;
        // console.log(payload);

        await this.$store
          .dispatch("otservice/addOTService", payload)
          .then(resp => {
            Swal.fire({
              title: "Success",
              text: "Added Successfully!",
              icon: "success",
              showConfirmButton: false,
              timer: 1500
            });
            this.reloadData();
            this.reset();
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
      await this.$store.dispatch("otservice/setOTServicesData", {
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
