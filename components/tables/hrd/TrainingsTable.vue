<template>
  <div>
    <v-data-table
      style="border-radius:0;"
      :headers="headers"
      :items="hrdTrainings"
      sort-by="updated_at"
      sort-desc
      class="elevation-1"
      :loading="loading"
      loading-text="Loading... Please wait"
    >
      <template v-slot:item.updated_at="{ item }">
        {{ $moment(item.updated_at).fromNow() }}
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
              >People Trained at NIMHANS</span
            ></v-toolbar-title
          >
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-select
            color="green"
            v-model="annualYear"
            :items="reportYears"
            item-text="val"
            item-value="id"
            label="Select Year"
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
                <v-toolbar-title>People Trained at NIMHANS</v-toolbar-title>
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
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        color="green"
                        v-model="editedItem.training_name"
                        :rules="[v => !!v || 'Item is required']"
                        label="Course / Training"
                        required
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                        color="green"
                        v-model="editedItem.institutional_affiliation"
                        label="Institute Affiliation"
                        required
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                        color="green"
                        v-model="editedItem.no_of_candidates"
                        :rules="[v => !!v || 'Item is required']"
                        label="Number of Candidates"
                        required
                        type="number"
                      >
                      </v-text-field>
                    </v-col>

                    <v-col cols="4">
                      <v-menu
                        ref="menu"
                        v-model="editFrom"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            v-model="editedItem.from_date"
                            :return-value.sync="editFrom"
                            :rules="[v => !!v || 'Item is required']"
                            label="From Date"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="editedItem.from_date"
                          color="green lighten-1"
                          no-title
                          scrollable
                          @input="menu1 = false"
                        >
                          <v-spacer></v-spacer>
                          <v-btn text color="primary" @click="editFrom = false">
                            Cancel
                          </v-btn>
                          <v-btn
                            text
                            color="primary"
                            @click="$refs.menu.save(editFrom)"
                          >
                            OK
                          </v-btn>
                        </v-date-picker>
                      </v-menu>
                    </v-col>
                    <v-col cols="4">
                      <v-menu
                        ref="menu"
                        v-model="editTo"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            v-model="editedItem.to_date"
                            :return-value.sync="editFrom"
                            :rules="[v => !!v || 'Item is required']"
                            label="From Date"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="editedItem.to_date"
                          color="green lighten-1"
                          no-title
                          scrollable
                          @input="menu1 = false"
                        >
                          <v-spacer></v-spacer>
                          <v-btn text color="primary" @click="editTo = false">
                            Cancel
                          </v-btn>
                          <v-btn
                            text
                            color="primary"
                            @click="$refs.menu.save(editTo)"
                          >
                            OK
                          </v-btn>
                        </v-date-picker>
                      </v-menu>
                    </v-col>

                    <v-col cols="4">
                      <v-select
                        color="green"
                        v-model="editedItem.remarks_status"
                        :items="remarks"
                        label="Status"
                      ></v-select>
                    </v-col>
                    <v-col cols="12">
                      <v-textarea
                        color="green"
                        v-model="editedItem.brief_report"
                        label="Brief Report"
                      ></v-textarea>
                    </v-col>
                  </v-row>
                </v-container>
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
    editFrom: false,
    editTo: false,
    loading: false,
    editedItem: {
      annual_year: 0,
      training_name: "",
      institutional_affiliation: "",
      no_of_candidates: 0,
      from_date: "",
      to_date: "",
      remarks_status: "",
      brief_report: "",
      deleted: false,
      department: 0
    },
    deletedItem: {
      annual_year: 0,
      training_name: "",
      institutional_affiliation: "",
      no_of_candidates: 0,
      from_date: "",
      to_date: "",
      remarks_status: "",
      brief_report: "",
      deleted: false,
      department: 0
    },
    remarks: ["Completed", "Awarded", "Submitted", "Ongoing", "Joined"],
    dialog: false,
    headers: [
      {
        text: "Last updated",
        align: "left",
        value: "updated_at"
      },
      { text: "Training Name", value: "training_name" },
      { text: "Total Candidates", value: "no_of_candidates" },
      { text: "Institute", value: "institutional_affiliation" },
      { text: "From Date", value: "from_date" },
      { text: "To Date", value: "to_date" },
      { text: "Status", value: "remarks_status" },
      { text: "Actions", value: "action", sortable: false }
    ]
  }),
  computed: {
    ...mapState({
      hrdTrainings: state => state.hrdTraining.hrdTrainings.result
    })
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  mounted() {
    this.annualYear = this.$store.state.selectedYear;
  },
  methods: {
    async reloadData() {
      this.loading = true;
      let queryString = "";
      queryString = `department.id=${this.$store.state.auth.user.department}&deleted_ne=true&annual_year=${this.annualYear}`;
      await this.$store.dispatch("hrdTraining/setHRDTrainings", {
        qs: queryString
      });
      this.loading = false;
    },
    editItem(item) {
      this.editedIndex = this.hrdTrainings.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      const index = this.hrdTrainings.indexOf(item);
      this.deletedItem = Object.assign({}, item);
      this.deletedItem.deleted = true;
      var payload = this.deletedItem;
      // console.log(payload);
      var vm = this;
      confirm("Are you sure you want to delete this item?") &&
        this.$store
          .dispatch("hrdTraining/updateTraining", payload)
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
        this.hrdTrainings = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        // Object.assign(this.program[this.editedIndex], this.editedItem)
        var payload = this.editedItem;
        console.log(payload);
        this.$store
          .dispatch("hrdTraining/updateTraining", payload)
          .then(resp => {
            Swal.fire({
              title: "Success",
              text: "Updated Successfully!",
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
        console.log(this.hrdTrainings.push(this.editedItem));
      }
      this.close();
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
