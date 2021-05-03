<template>
  <div>
    <v-data-table :headers="headers" :items="$store.state.visitor.visitorsData.result" sort-by="id" sort-desc class="elevation-1" :loading="loading" loading-text="Loading... Please wait">
      <template v-slot:[`item.updated_at`]="{ item }">
        {{ $moment(item.updated_at).fromNow() }}
      </template>
      <template v-slot:top>
        <v-toolbar flat color="#ebebeb" class="d-flex justify mt-4 pt-1" style="border-radius: 0;">
          <v-toolbar-title><span class="frm-title">Visitors to the Department</span></v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-select v-model="annualYear" :items="reportYears" item-text="val" item-value="id" label="Reporting Year" required class="justify-end mt-8" @change="reloadData()"></v-select>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-tooltip right color="blue-grey darken-2">
            <template v-slot:activator="{ on }">
              <v-btn x-small fab color="green" dark @click="reloadData" v-on="on">
                <v-icon>mdi-reload</v-icon>
              </v-btn>
            </template>
            <span>Reload Data</span> </v-tooltip
          ><v-spacer></v-spacer>
          <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
            <v-card>
              <v-toolbar dark color="#41704e">
                <v-btn icon dark @click="close">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>Visitor to the Department</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-title>
                <v-divider class="mx-4" inset vertical></v-divider>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <FormsVisitorForm :dataFrom="staffs" :visitorData="editedItem" :key="renderKey" @close="close" @save="save" />
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
    editFrom: null,
    editTo: null,
    annualYear: 0,
    headers: [
      {
        text: "Last updated",
        align: "left",
        value: "updated_at",
      },
      {
        text: "Visitor Name",
        align: "left",
        value: "name",
      },
      { text: "Designation", value: "designation" },
      { text: "Institutional Affiliation", value: "institutional_affiliation" },
      { text: "From", value: "from_date" },
      { text: "To", value: "to_date" },
      { text: "Title of Lecture", value: "title" },
      { text: "Actions", value: "action", sortable: false },
    ],
    editedItem: {
      annual_year: 0,
      name: "",
      designation: "",
      institutional_affiliation: "",
      title: "",
      from_date: "",
      to_date: "",
      brief_report: "",
      approval_status: "Approved",
      approved_by: "",
      approved_date: null,
      deleted: false,
      department: 0,
      user: 0,
      image: null,
      rejected_reason: null,
      month: 0,
    },
    editedIndex: -1,
    // image_url: "/image_placeholder.png",
    selectedFile: null,
    deletedItem: {
      annual_year: 0,
      name: "",
      designation: "",
      institutional_affiliation: "",
      title: "",
      from_date: "",
      to_date: "",
      brief_report: "",
      approval_status: "Approved",
      approved_by: "",
      approved_date: null,
      deleted: false,
      department: 0,
      user: 0,
      image: null,
      rejected_reason: null,
    },
    imageToDelete: null,
  }),
  computed: {
    ...mapState({
      visitorsData: (state) => state.visitor.visitorsData.result,
      staffs: (state) => state.staffs,
    }),
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
  },
  async fetch({ store }) {
    let queryString = "";
    if (store.state.auth.user.userType === "FACULTY" || store.state.auth.user.userType === "STUDENT") {
      queryString = `department.id=${store.state.auth.user.department}&user.id=${this.$auth.user.id}&annual_year=${store.state.selectedYear}&deleted_ne=true`;
      // console.log(queryString);
      await store.dispatch("visitor/setVisitorsData", { qs: queryString });
    } else {
      queryString = `department.id=${store.state.auth.user.department}&annual_year=${store.state.selectedYear}&deleted_ne=true`;
      await store.dispatch("visitor/setVisitorsData", { qs: queryString });
    }
  },
  mounted() {
    this.annualYear = this.$store.state.selectedYear;
    this.reloadData();
  },
  methods: {
    handleclick(item) {
      var index = this.visitorsData.indexOf(item);
      if (item.approval_status === "Rejected") {
        Swal.fire({
          title: "Reason for Rejection",
          text: this.visitorsData[index].rejected_reason,
        });
      }
    },
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
          data,
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
          data,
        });
        this.image_url = uploadRes.data[0].url;
        this.editedItem.image = uploadRes.data[0].id;
        // Swal.fire('Pudhusu');
      }
    },
    editItem(item) {
      this.editedIndex = this.visitorsData.indexOf(item);
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
          this.$store.dispatch("visitor/updateVisitor", payload).then((resp) => {
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
          Swal.fire({
            title: "Something Wrong!",
            text: err,
            icon: "warning",
            showConfirmButton: false,
            timer: 4500,
          });
        }
      });
    },
    async reloadData() {
      this.loading = true;

      if (this.$store.state.auth.user.userType === "FACULTY" || this.$store.state.auth.user.userType === "STUDENT") {
        let queryString = "";
        queryString = `department.id=${this.$auth.user.department}&user.id=${this.$auth.user.id}&deleted_ne=true&annual_year=${this.annualYear}`;
        await this.$store.dispatch("visitor/setVisitorsData", {
          qs: queryString,
        });
      } else {
        let queryString = "";
        queryString = `department.id=${this.$auth.user.department}&annual_year=${this.annualYear}&deleted_ne=true`;
        await this.$store.dispatch("visitor/setVisitorsData", {
          qs: queryString,
        });
      }
      this.loading = false;
    },
    close() {
      this.dialog = false;
      this.image_url = "/image_placeholder.png";
    },
    async save(visitor) {
      var payload = visitor;
      // console.log(payload);
      await this.$store.dispatch("visitor/updateVisitor", payload);
      if (this.$store.state.visitor.visitorsData.success) {
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
</style>
