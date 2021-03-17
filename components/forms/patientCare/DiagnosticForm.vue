<template>
  <div>
    <v-form ref="form" v-model="valid" lazy-validation @submit.prevent>
      <v-container>
        <v-row>
          <v-col cols="3">
            <v-select
              color="green"
              v-model="diagnostic.lab_type"
              label="Lab Service Type"
              :rules="[v => !!v || 'Select the Lab Service Type']"
              :items="serviceType"
              @change="getTests(diagnostic.lab_type)"
            >
            </v-select>
          </v-col>
          <v-col cols="6">
            <v-combobox
              color="green"
              v-model="diagnostic.test_name"
              :rules="[v => !!v || 'Enter the Test Name']"
              label="Test Name"
              required
              :items="$store.state.diagnostic.testData"
              item-text="test_name"
              item-value="test_name"
              @blur="addTest"
            >
              <template v-slot:no-data>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>
                      No results matching "<strong>{{ search }}</strong
                      >". Press <kbd>tab</kbd> to create a new one
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-combobox>
          </v-col>
          <v-col cols="3">
            <v-text-field
              color="green"
              v-model="diagnostic.samples_analyzed"
              label="Samples Analysed"
              type="number"
              :rules="[v => !!v || 'Enter the Total No. of Samples Analysed']"
            >
            </v-text-field>
          </v-col>
        </v-row>
      </v-container>
      <v-row no-gutters>
        <v-spacer></v-spacer>
        <v-btn small color="#d74f4f" dark class="mr-2" @click="reset">
          Reset
        </v-btn>
        <v-btn small color="#57a727" dark @click="addDiagnostic">
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
    valid: false,
    search:  '',
    testData: [],
    newTest: {
      lab_type: "",
      test_name: "",
      deleted: false,
      department: 0
    },
    diagnostic: {
      annual_year: 0,
      lab_type: "",
      samples_analyzed: 0,
      deleted: false,
      department: 0,
      pc_diagnostic_test: 0
    },
    serviceType: ["Routine_Test", "Special_Test"]
  }),
  watch: {
    dialog(val) {
      val || this.close();
    },
    search(val) {
      if (this.procedures.length > 0) return;
      this.getTests();
    }
  },

  methods: {
    async addTest() {
      if (
        typeof this.diagnostic.test_name != "object" &&
        this.diagnostic.test_name != null
      ) {
        this.newTest = Object.assign(
          {},
          {
            lab_type: this.diagnostic.lab_type,
            test_name: this.diagnostic.test_name,
            deleted: false,
            department: this.$store.state.auth.user.department
          }
        );
        var payload = this.newTest;
        await this.$store.dispatch("diagnostic/addTest", payload).then(resp => {
          Swal.fire({
            title: "Added",
            html:
              "New Test Name is Added!<br>Please go back and select it from list.",
            icon: "info",
            showConfirmButton: false,
            timer: 3000
          });
          this.reset();
        });
      }
    },
    async editTest() {
      if (
        typeof this.editedItem.pc_diagnostic_test === "string" &&
        this.editedItem.pc_diagnostic_test != null
      ) {
        this.newTest = Object.assign(
          {},
          {
            lab_type: this.editedItem.lab_type,
            test_name: this.editedItem.pc_diagnostic_test,
            deleted: false,
            department: this.$store.state.auth.user.department
          }
        );
        var payload = this.newTest;

        await this.$store.dispatch("diagnostic/addTest", payload).then(resp => {
          Swal.fire("New Test Name Added!");
          this.$refs.editedForm.reset();
        });
      }
    },
    async getTests(lab_type) {
      let queryString = "";
      this.diagnostic.lab_type = lab_type;
      queryString = `department.id=${this.$store.state.auth.user.department}&lab_type=${lab_type}`;
      await this.$store.dispatch("diagnostic/setTest", { qs: queryString });
    },
    async addDiagnostic() {
      if (this.$refs.form.validate()) {
        this.diagnostic.annual_year = this.$store.state.selectedYear;
        this.diagnostic.department = this.$store.state.auth.user.department;
        this.diagnostic.pc_diagnostic_test = this.diagnostic.test_name.id;
        this.diagnostic.test_name = this.diagnostic.test_name.test_name;
        var payload = this.diagnostic;
        // console.log(payload);

        await this.$store
          .dispatch("diagnostic/addDiagnostic", payload)
          .then(resp => {
            Swal.fire({
              title: "Success",
              text: "Added Successfully!",
              icon: "success",
              showConfirmButton: false,
              timer: 1500
            });
            this.reset();
            this.reloadByYear();
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
      await this.$store.dispatch("diagnostic/setDiagnosticData", {
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

<style scoped>
.frm-title {
  border-left: 5px solid #e16949;
  padding: 3px 10px;
}
</style>
