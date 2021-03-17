<template>
  <div>
    <v-data-table
      style="border-radius:0;"
      :headers="headers"
      :items="hrdCourses"
      sort-by="last_updated"
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
          class="d-flex justify pt-1"
          style="border-radius:0;"
        >
          <v-toolbar-title
            ><span class="frm-title">Regular Courses</span></v-toolbar-title
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
                <v-toolbar-title>Regular Courses</v-toolbar-title>
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
                      <v-select
                        v-model="editedItem.course_name"
                        :items="courses"
                        item-text="text"
                        item-value="val"
                        label="Course Name"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" md="12" lg="9">
                      <v-text-field
                        v-if="editedItem.course_name === 'Others'"
                        v-model="editedItem.other_name"
                        label="Specify Course Name"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="12" lg="3">
                      <v-text-field
                        v-model="editedItem.candidate_name"
                        label="Candidate Name"
                      ></v-text-field>
                    </v-col>
                    <!--<v-col cols="12">
														<v-text-field v-model="editedItem.instituteAffiliation" label="Institute Affiliation"></v-text-field>
													</v-col>-->
                    <v-col cols="12" md="12" lg="2">
                      <v-text-field
                        v-model="editedItem.durations"
                        label="Duration (No. of Years)"
                        type="number"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="7">
                      <v-text-field
                        v-model="editedItem.thesis_title"
                        label="Thesis Title (If applicable)"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.guides"
                        label="Guides"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="3" md="3" lg="3">
                      <v-select
                        v-model="editedItem.remarks_status"
                        :items="remarks"
                        label="Status"
                      ></v-select>
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
import Swal from 'sweetalert2'
export default {
  props: ["reportYears"],
  data: () => ({
    loading: false,
    annualYear: 0,
    editedItem: {
      annual_year: 0,
      course_name: "",
      other_name: "",
      candidate_name: "",
      durations: 0,
      thesis_title: "",
      guides: "",
      remarks_status: "",
      deleted: false,
      department: 0
    },
    deletedItem: {
      annual_year: 0,
      course_name: "",
      other_name: "",
      candidate_name: "",
      durations: 0,
      thesis_title: "",
      guides: "",
      remarks_status: "",
      deleted: false,
      department: 0
    },
    courses: [
      {
        text: "Post Doctoral Fellow",
        val: "Post_Doctoral_Fellow"
      },
      {
        text: "Phd",
        val: "PhD"
      },
      {
        text: "DM / MCH",
        val: "DM_or_MCH"
      },
      {
        text: "MPhil",
        val: "MPhil"
      },
      {
        text: "MSc",
        val: "MSc"
      },
      {
        text: "Others",
        val: "Others"
      }
    ],
    remarks: ["Completed", "Awarded", "Submitted", "Ongoing", "Joined"],
    dialog: false,
    headers: [
      {
        text: "Last updated",
        align: "left",
        value: "updated_at",
      },
      { text: "Course", value: "course_name"},
      { text: "Candidate Name", value: "candidate_name" },
      { text: "Duration", value: "durations" },
      { text: "Thesis Title", value: "thesis_title" },
      { text: "Status", value: "remarks_status" },
      { text: "Actions", value: "action", sortable: false }
    ]
  }),
  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  computed: {
    ...mapState({
      hrdCourses: state => state.hrdCourse.hrdCourses.result
    })
  },
  mounted() {
    this.annualYear = this.$store.state.selectedYear;
  },
  methods: {
    async reloadData() {
      this.loading = true;
      let queryString = "";
      queryString = `department.id=${this.$store.state.auth.user.department}&deleted_ne=true&annual_year=${this.annualYear}`;
      await this.$store.dispatch("hrdCourse/setHRDCourses", { qs: queryString });
      this.loading = false;
    },
    reset() {
      this.$refs.form.reset();
    },

    editItem(item) {
      this.editedIndex = this.hrdCourses.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.hrdCourses.indexOf(item);
      this.deletedItem = Object.assign({}, item);
      this.deletedItem.deleted = true;
      var payload = this.deletedItem;
      // console.log(payload);
      confirm("Are you sure you want to delete this item?") &&
        this.$store
          .dispatch("hrdCourse/updateHRDCourse", payload)
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
        this.hrdCourses = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        // Object.assign(this.program[this.editedIndex], this.editedItem)
        var payload = this.editedItem;
        console.log(payload);
        var vm = this;
        this.$store
          .dispatch("hrdCourse/updateHRDCourse", payload)
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
        console.log(this.hrdCourses.push(this.editedItem));
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
