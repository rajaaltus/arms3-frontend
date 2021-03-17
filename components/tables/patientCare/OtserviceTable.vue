<template>
  <div>
    <v-data-table
      style="border-radius:0;"
      :headers="headers"
      :items="otservicesData"
      sort-by="updated_at"
      sort-desc
      class="elevation-1"
      :loading="loading"
      loading-text="Loading... Please wait"
    >
      <template v-slot:item.updated_at="{ item }">
        {{ $moment(item.updated_at).fromNow() }}
      </template>
      <template v-slot:item.approvalStatus="{ item }">
        <v-chip :color="getColor(item.approvalStatus)" dark>
          {{ item.approvalStatus }}
        </v-chip>
      </template>
      <template v-slot:top>
        <v-toolbar
          flat
          color="#ebebeb"
          class="d-flex justify mt-4 pt-1"
          style="border-radius:0;"
        >
          <v-toolbar-title
            ><span class="frm-title"
              >OT &amp; Other Services</span
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
                <v-toolbar-title>OT &amp; Other Services</v-toolbar-title>
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
                      <template>
                        <v-col cols="4">
                          <v-combobox
                            color="green"
                            v-model="editedItem.Procedure"
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
                                    No results matching. Press <kbd>tab</kbd> to
                                    create a new one
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
                                <v-list-item-title
                                  v-text="item"
                                ></v-list-item-title>
                              </v-list-item-content>
                            </template>
                          </v-combobox>
                        </v-col>
                      </template>
                      <v-col cols="4">
                        <v-text-field
                        color="green"
                          v-model="editedItem.classification"
                          :rules="[v => !!v || 'Item is required']"
                          label="Classification"
                          required
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="4">
                        <v-text-field
                        color="green"
                          v-model="editedItem.no_of_patients"
                          :rules="[v => !!v || 'Item is required']"
                          label="Total Patients"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-textarea
                        color="green"
                          v-model="editedItem.description"
                          label="Description"
                        ></v-textarea>
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
        <v-icon centre @click="editItem(item)" color="green"
          >mdi-pencil-box</v-icon
        >
        <v-icon centre @click="deleteItem(item)" color="error"
          >mdi-delete-circle</v-icon
        >
      </template>
     
    </v-data-table>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Swal from "sweetalert2";
export default {
  props: ["reportYears"],
  data: () => ({
    valid: true,
    loading: false,
    annualYear: 0,
    isLoading: false,
    search: "",
    editedItem: {
      Procedure: "",
      classification: "",
      description: "",
      no_of_patients: 0,
      department: 0,
      annual_year: 0,
      deleted: false
    },
    deletedItem: {
      Procedure: "",
      classification: "",
      description: "",
      no_of_patients: 0,
      department: 0,
      annual_year: 0,
      deleted: false
    },
    dialog: false,
    headers: [
      {
        text: "Last updated",
        align: "left",
        value: "updated_at"
      },
      { text: "Procedure", value: "Procedure" },
      { text: "Classification", value: "classification" },
      { text: "Description", value: "description" },
      { text: "Total Patients", value: "no_of_patients" },
      { text: "Actions", value: "action", sortable: false }
    ]
  }),
  computed: {
    ...mapState({
      otservicesData: state => state.otservice.otservicesData
    }),
    procedures() {
      return this.$store.state.otservice.otservicesData.map(item => item.Procedure);
    }
  },
  mounted () {
    this.annualYear = this.$store.state.selectedYear;
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    search(val) {
      if (this.procedures.length > 0) return;
      this.getProcedures();
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
    async reloadData() {
      this.loading = true;
      let queryString = "";
      queryString = `department.id=${this.$store.state.auth.user.department}&deleted_ne=true&annual_year=${this.annualYear}`;
      await this.$store.dispatch("otservice/setOTServicesData", {
        qs: queryString
      });
      this.loading = false;
    },
    reset() {
      this.$refs.form.reset();
    },
    editItem(item) {
      this.editedIndex = this.otservicesData.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.otservicesData.indexOf(item);
      this.deletedItem = Object.assign({}, item);
      // confirm('Are you sure you want to delete this item?') && this.programmesData.splice(index, 1)
      this.deletedItem.deleted = true;
      var payload = this.deletedItem;
      // console.log(payload);
      var vm = this;
      confirm("Are you sure you want to delete this item?") &&
        this.$store
          .dispatch("otservice/updateOTService", payload)
          .then(resp => {
            Swal.fire({
              title: "Success",
              text: "Deleted Successfully!",
              icon: "success",
              showConfirmButton: false,
              timer: 1500
            });
            this.reloadData();
          })
          .catch(err => {
            this.snackbar = true;
            this.submitMessage = err;
          });
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.otservicesData = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.$refs.editedForm.validate()) {
        if (this.editedIndex > -1) {
          // Object.assign(this.program[this.editedIndex], this.editedItem)
          var payload = this.editedItem;
          // console.log(payload);
          var vm = this;
          this.$store
            .dispatch("otservice/updateOTService", payload)
            .then(resp => {
              Swal.fire({
                title: "Success",
                text: "Deleted Successfully!",
                icon: "success",
                showConfirmButton: false,
                timer: 1500
              });
              this.reloadData();
            })
            .catch(err => {
              this.snackbar = true;
              this.submitMessage = err;
            });
        } else {
          // this.program.push(this.editedItem)
          // console.log(this.otservicesData.push(this.editedItem))
        }
        this.close();
      }
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
