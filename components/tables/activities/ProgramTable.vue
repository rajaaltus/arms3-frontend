<template>
  <div>
    <v-data-table
      style="border-radius: 0;"
      :headers="headers"
      :items="programmesData"
      sort-by="updated_at"
      sort-desc
      class="elevation-1"
      :loading="loading"
      loading-text="Loading... Please wait"
      :footer-props="{
        'items-per-page-options': [10, 20, 30, 40, 50],
      }"
    >
      <template v-slot:[`item.updated_at`]="{ item }">
        {{ $moment(item.updated_at).fromNow() }}
      </template>
      <template v-slot:top>
        <v-toolbar flat color="#ebebeb" class="d-flex justify mt-4 pt-1" style="border-radius: 0;">
          <v-toolbar-title><span class="frm-title">Programmes / Events</span></v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-select color="green" v-model="annualYear" :items="reportYears" item-text="val" item-value="id" label="Reporting Year" required class="justify-end mt-6" @change="reloadData()"></v-select>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-tooltip right color="blue-grey darken-2">
            <template v-slot:activator="{ on }">
              <v-btn x-small fab color="green" dark @click="reloadData" v-on="on">
                <v-icon>mdi-reload</v-icon>
              </v-btn>
            </template>
            <span>Reload Data</span>
          </v-tooltip>
          <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
            <v-card flat>
              <v-toolbar dark color="#41704e">
                <v-btn icon dark @click="close">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>Programmes / Events</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-container>
                  <FormsProgramForm :programNames="programNames" :dataFrom="staffs" :programData="editedItem" :key="renderKey" @close="close" @save="save" />
                </v-container>
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.action`]="{ item }">
        <v-icon centre @click="editItem(item)" color="green">mdi-pencil-box</v-icon>
        <v-icon centre @click="deleteItem(item)" color="error">mdi-delete-circle</v-icon>
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
    renderKey: 0,
    loading: false,
    dialog: false,
    annualYear: 0,
    headers: [
      {
        text: "Last Updated",
        align: "left",
        value: "updated_at",
      },
      { text: "Program Type", value: "type" },
      { text: "Forum", value: "forum" },
      {
        text: "Programme Name",
        align: "left",
        sortable: false,
        value: "name",
      },
      { text: "No. of Participants", value: "participants_count" },
      { text: "From", value: "from_date" },
      { text: "To", value: "to_date" },
      { text: "Location", value: "location" },
      { text: "Actions", value: "action", sortable: false },
    ],
    editedItem: {
      annual_year: 0,
      type: "",
      name: "",
      location: "",
      forum: "",
      colloborations: "",
      from_date: "",
      to_date: "",
      participants_count: 0,
      coordinators: "",
      brief_report: "",
      deleted: false,
      approval_status: "Approved",
      approved_by: "",
      approved_date: null,
      rejected_reason: null,
      image: null,
      department: 0,
      user: 0,
      month: 0,
    },
    // image_url: "/image_placeholder.png",
    selectedFile: null,
    deletedItem: {
      annual_year: 0,
      type: "",
      name: "",
      location: "",
      forum: "",
      colloborations: "",
      from_date: "",
      to_date: "",
      participants_count: 0,
      coordinators: "",
      brief_report: "",
      deleted: false,
      approval_status: "Approved",
      approved_by: "",
      approved_date: null,
      rejected_reason: null,
      image: null,
      department: 0,
      user: 0,
    },
    imageToDelete: null,
    editedIndex: -1,
    programTypes: ["Conference", "Workshop", "Seminar", "Symposium", "Scientific"],
    programLevels: ["International", "National", "Regional", "State", "Local"],
    locations: ["NIMHANS", "OUTSIDE_NIMHANS"],
    colloborations: ["Departmental", "Interdepartmental"],
    approvals: ["Pending", "Rejected", "Approved"],
  }),
  computed: {
    ...mapState({
      programmesData: (state) => state.program.programmesData.result,
      staffs: (state) => state.staffs,
    }),
    programNames() {
      return this.programmesData.map((program) => program.name);
    },
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
  },
  async fetch({ store }) {
    //Filter Query Fetch
    let userId = store.state.auth.user.id;
    let deptId = store.state.user.fullUser.department.id;
    let queryString = "";
    console.log("Userid:" + userId + ",deptId:" + deptId + ",QS:" + queryString);
    if (store.state.auth.user.userType === "FACULTY" || store.state.auth.user.userType === "STUDENT") {
      queryString = `department.id=${deptId}&user.id=${userId}&deleted_ne=true`;
      await store.dispatch("program/setProgrammesData", { qs: queryString });
    } else {
      queryString = `department.id=${deptId}&deleted_ne=true`;
      await store.dispatch("program/setProgrammesData", { qs: queryString });
    }
  },
  mounted() {
    this.annualYear = this.$store.state.selectedYear;
    this.reloadData();
  },
  methods: {
    handleclick(item) {
      var index = this.programmesData.indexOf(item);
      if (item.approval_status === "Rejected") {
        Swal.fire({
          title: "Reason for Rejection",
          text: this.programmesData[index].rejected_reason,
        });
      }
    },
    async handleFileUpload(event) {
      if (this.image_url !== undefined) {
        this.imageToDelete = this.editedItem.image.id;
        this.selectedFile = event.target.files[0];
        const data = new FormData();
        data.append("files", this.selectedFile);
        const uploadRes = await this.$axios({
          method: "POST",
          url: "/upload",
          data,
        });
        this.image_url = uploadRes.data[0].url;
        this.editedItem.image = uploadRes.data[0].id;
      } else {
        this.editedItem.image = null;
        this.selectedFile = event.target.files[0];
        const data = new FormData();
        data.append("files", this.selectedFile);
        data.append("ref", "programmes");
        const uploadRes = await this.$axios({
          method: "POST",
          url: "/upload",
          data,
        });
        this.image_url = uploadRes.data[0].url;
        this.editedItem.image = uploadRes.data[0].id;
      }
    },
    editItem(item) {
      this.editedIndex = this.programmesData.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
      this.renderKey += 1;
    },

    deleteItem(item) {
      this.deletedItem = Object.assign(
        {},
        {
          id: item.id,
          deleted: item.deleted,
        }
      );
      // confirm('Are you sure you want to delete this item?') && this.programmesData.splice(index, 1)
      this.deletedItem.deleted = true;
      var payload = this.deletedItem;
      // console.log(payload);
      var vm = this;
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.value) {
          this.loading = true;
          this.$store.dispatch("program/updateProgram", payload).then((resp) => {
            this.loading = false;
            Swal.fire({
              title: "Success",
              text: "Deleted Successfully!",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            });
            this.reloadData();
          });
        }
      });
    },
    async reloadData() {
      this.loading = true;
      if (this.$store.state.auth.user.userType === "FACULTY" || this.$store.state.auth.user.userType === "STUDENT") {
        let queryString = "";
        queryString = `department.id=${this.$auth.user.department}&user.id=${this.$auth.user.id}&deleted_ne=true&annual_year=${this.annualYear}`;
        await this.$store.dispatch("program/setProgrammesData", {
          qs: queryString,
        });
      } else {
        let queryString = "";
        queryString = `department.id=${this.$auth.user.department}&annual_year=${this.annualYear}&deleted_ne=true`;
        await this.$store.dispatch("program/setProgrammesData", {
          qs: queryString,
        });
      }
      this.loading = false;
    },
    close() {
      this.dialog = false;
      this.image = "/image_placeholder.png";
    },

    async save(program) {
      var payload = program;
      await this.$store.dispatch("program/updateProgram", payload);
      if (this.$store.state.program.programmesData.success) {
        this.close();
        this.reloadData();
      }
    },
  },
};
</script>

<style scoped>
.frm-title {
  border-left: 5px solid #e16949;
  padding: 3px 10px;
}
.pullright {
  float: right;
}
</style>
