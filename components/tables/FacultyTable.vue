<template>
  <div>
    <v-data-table
      style="border-radius:0;"
      :headers="headers"
      :items="facultyData"
      sort-by="updated_at"
      sort-desc
      class="elevation-1"
      :loading="loading"
      loading-text="Loading... Please wait"
    >
      <template v-slot:item.updated_at="{ item }">
        {{ $moment(item.updated_at).fromNow() }}
      </template>
      <template v-slot:item.approval_status="{ item }">
        <v-chip :color="getColor(item.approval_status)" dark>
          {{ item.approval_status }}
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
              >Faculty and Staff served NIMHANS</span
            ></v-toolbar-title
          >
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-select
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
                <v-toolbar-title
                  >Faculty and Staff served NIMHANS</v-toolbar-title
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
                <v-container>
                  <v-row>
                    <v-col cols="3">
                      <v-text-field
                        v-model="editedItem.faculty_name"
                        label="Name of the official"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="3">
                      <v-select
                        v-model="editedItem.faculty_status"
                        :items="facultyStatus"
                        label="Status"
                      ></v-select>
                    </v-col>
                    <v-col cols="3">
                      <v-text-field
                        v-model="editedItem.designation"
                        label="Designation"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="3">
            <v-menu
              ref="menu1"
              v-model="duration_to"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  color="green"
                  v-model="editedItem.leaving_date"
                  :rules="[v => !!v || 'Item is required']"
                  :return-value.sync="date1"
                  readonly
                  label="To Date"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="editedItem.leaving_date" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="duration_to = false">
                  Cancel
                </v-btn>
                <v-btn text color="primary" @click="$refs.menu1.save(date1)">
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>
                  </v-row>
                  <v-hover>
                    <template v-slot:default="{ hover }">
                      <v-img
                        :src="`${$axios.defaults.baseURL}${image_url}`"
                        lazy-src="/image_placeholder.png"
                        aspect-ratio="1"
                        class="grey lighten-2"
                        max-width="100%"
                        max-height="400"
                      >
                        <template v-slot:placeholder>
                          <v-row
                            class="fill-height ma-0"
                            align="center"
                            justify="center"
                          >
                            <v-progress-circular
                              indeterminate
                              color="grey lighten-5"
                            ></v-progress-circular>
                          </v-row>
                        </template>
                        <v-fade-transition>
                          <v-overlay v-if="hover" absolute color="#036358">
                            <v-btn @click="$refs.image.click()">
                              {{ image_url ? "Edit Image" : "Upload Image" }}
                            </v-btn>
                          </v-overlay>
                        </v-fade-transition>
                      </v-img>
                    </template>
                  </v-hover>
                  <input
                    ref="image"
                    type="file"
                    style="display:none;"
                    label="File input"
                    @change="handleFileUpload"
                  />
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
    loading: false,
    facultyStatus: ["Superannuated", "Retired", "VRS"],
    editedItem: {
      annual_year: 0,
      faculty_status: "",
      faculty_name: "",
      designation: "",
      leaving_date: "",
      deleted: false,
      department: 0,
      image: null
    },
    image_url: "/image_placeholder.png",
    deletedItem: {
      annual_year: 0,
      faculty_status: "",
      faculty_name: "",
      designation: "",
      leaving_date: "",
      deleted: false,
      department: 0,
      image: null
    },
    imageToDelete: null,
    dialog: false,
    //Data table header
    headers: [
      {
        text: "Last updated",
        align: "left",
        value: "updated_at"
      },

      { text: "Status", value: "faculty_status" },
      { text: "Name", value: "faculty_name" },
      { text: "Designation", value: "designation" },
      { text: "Leaving date", value: "leaving_date" },
      { text: "Actions", value: "action", sortable: false }
    ]
  }),
  computed: {
    ...mapState({
      facultyData: state => state.faculty.facultyData.result,
    })
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  mounted () {
    this.annualYear = this.$store.state.selectedYear;
  },
  methods: {
    async handleFileUpload(event) {
      console.log(this.image_url);
      if (this.image_url !== undefined) {
        this.imageToDelete = this.editedItem.image.id;
        this.selectedFile = event.target.files[0];
        const data = new FormData();
        data.append("files", this.selectedFile);
        const uploadRes = await this.$axios({
          method: "POST",
          url: "/upload",
          data
        });
        this.image_url = uploadRes.data[0].url;
        this.editedItem.image = uploadRes.data[0].id;
        // Swal.fire('editing');
      } else {
        this.editedItem.image = null;
        this.selectedFile = event.target.files[0];
        const data = new FormData();
        data.append("files", this.selectedFile);
        const uploadRes = await this.$axios({
          method: "POST",
          url: "/upload",
          data
        });
        this.image_url = uploadRes.data[0].url;
        this.editedItem.image = uploadRes.data[0].id;
        // Swal.fire('Pudhusu');
      }
    },
    reloadData() {
      this.loading = true;
      let queryString = "";
      queryString = `department.id=${this.$store.state.auth.user.department}&deleted_ne=true&annual_year=${this.annualYear}`;
      this.$store.dispatch("faculty/setFacultyData", { qs: queryString });
      this.loading = false;
    },

    editItem(item) {
      this.editedIndex = this.facultyData.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.facultyData.indexOf(item);
      this.deletedItem = Object.assign({}, item);
      // confirm('Are you sure you want to delete this item?') && this.programmesData.splice(index, 1)
      this.deletedItem.deleted = true;
      var payload = this.deletedItem;
      console.log(payload);
      confirm("Are you sure you want to delete this item?") &&
        this.$store
          .dispatch("faculty/updateFaculty", payload)
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
        this.facultyData = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        // Object.assign(this.program[this.editedIndex], this.editedItem)
        var payload = this.editedItem;
        console.log(payload);
        this.$store
          .dispatch("faculty/updateFaculty", payload)
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
        console.log(this.facultyData.push(this.editedItem));
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
