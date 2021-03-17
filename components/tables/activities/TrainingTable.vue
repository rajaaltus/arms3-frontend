<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="trainingsData"
      sort-by="updated_at"
      sort-desc
      class="elevation-1"
      :loading="loading"
      loading-text="Loading... Please wait"
    >
      <template v-slot:[`item.updated_at`]="{ item }">
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
            ><span class="frm-title">Trainings Underwent</span></v-toolbar-title
          >
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-select
            v-model="annualYear"
            :items="reportYears"
            item-text="val"
            item-value="id"
            label="Reporting Year"
            required
            color="success"
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
            <v-card>
              <v-toolbar dark color="#41704e">
                <v-btn icon dark @click="close">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title
                  >Trainings Underwent</v-toolbar-title
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
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.faculty_name"
                        :rules="[v => !!v || 'Item is required']"
                        label="Who all attended"
                        required
                        color="success"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                        v-model="editedItem.program_name"
                        :rules="[v => !!v || 'Item is required']"
                        label="Programme Name"
                        required
                        color="success"
                      >
                      </v-text-field>
                    </v-col>

                    <v-col cols="6">
                      <v-text-field
                        v-model="editedItem.institutional_affiliation"
                        :rules="[v => !!v || 'Item is required']"
                        label="Institution &amp; Place"
                        required
                        color="success"
                      >
                      </v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
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
                            readonly
                            color="success"
                            label="From"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="editedItem.from_date"
                          color="green lighten-1"
                          no-title
                          scrollable
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
                        ref="menu1"
                        v-model="editTo"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            v-model="editedItem.to_date"
                            :rules="[v => !!v || 'Item is required']"
                            :return-value.sync="editTo"
                            readonly
                            color="success"
                            label="To"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="editedItem.to_date"
                          no-title
                          scrollable
                        >
                          <v-spacer></v-spacer>
                          <v-btn text color="primary" @click="editTo = false">
                            Cancel
                          </v-btn>
                          <v-btn
                            text
                            color="primary"
                            @click="$refs.menu1.save(editTo)"
                          >
                            OK
                          </v-btn>
                        </v-date-picker>
                      </v-menu>
                    </v-col>
                    <v-col cols="4">
                      <v-text-field
                        v-model="editedItem.funded_by"
                        label="Funded By"
                        required
                        color="success"
                      >
                      </v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-container fluid>
                      <v-textarea
                        v-model="editedItem.brief_report"
                        counter
                        label="Brief Report"
                        color="success"
                      ></v-textarea>
                    </v-container>
                  </v-row>
                  <v-hover>
                    <template v-slot:default="{ hover }">
                      <v-img
                        :src="image_url==='/image_placeholder.png'?'/image_placeholder.png':`${$axios.defaults.baseURL}${image_url}`"
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
      <template v-slot:[`item.action`]="{ item }">
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
    loading: false,
    dialog: false,
    editFrom: null,
    editTo: null,
    annualYear: 0,
    headers: [
			{
				text: 'Last updated',
				align: 'left',
				value: 'updated_at',
			},
			{
				text: 'Who all attended',
				align: 'left',
				value: 'faculty_name',
			},
			{ text: 'Programme Name', value: 'program_name' },
			{ text: 'Institution & Place', value: 'institutional_affiliation' },
			{ text: 'From', value: 'from_date' },
			{ text: 'To', value: 'to_date' },
			{ text: 'Actions', value: 'action', sortable: false },
		],
    editedItem: {
      annual_year: 0,
			faculty_name: "",
			program_name: "",
			institutional_affiliation: "",
			from_date: "",
			to_date: "",
			funded_by: "",
			brief_report: "",
			approval_status: "Approved",
			approved_by: null,
			approved_date: null,
			deleted: false,
			department: 0,
      user: 0,
      image: null,
      rejected_reason: null
    },
    editedIndex: -1,
    image_url: "/image_placeholder.png",
    selectedFile: null,
    deletedItem: {
      annual_year: 0,
			faculty_name: "",
			program_name: "",
			institutional_affiliation: "",
			from_date: "",
			to_date: "",
			funded_by: "",
			brief_report: "",
			approval_status: "Approved",
			approved_by: null,
			approved_date: null,
			deleted: false,
			department: 0,
      user: 0,
      image: null,
      rejected_reason: null
    },
    imageToDelete: null
  }),
  computed: {
    ...mapState({
      trainingsData: state => state.training.trainingsData.result,
      staffs: state => state.staffs
    })
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  async fetch({ store }) {
    let queryString = "";
    if (
      store.state.auth.user.userType === "FACULTY" ||
      store.state.auth.user.userType === "STUDENT"
    ) {
      queryString = `department.id=${store.state.auth.user.department}&user.id=${this.$auth.user.id}&annual_year=${store.state.selectedYear}&deleted_ne=true`;
      // console.log(queryString);
      await store.dispatch("training/setTrainingsData", { qs: queryString });
    } else {
      queryString = `department.id=${store.state.auth.user.department}&annual_year=${store.state.selectedYear}&deleted_ne=true`;
      await store.dispatch("training/setTrainingsData", { qs: queryString });
    }
  },
  mounted() {
    this.annualYear = this.$store.state.selectedYear;
    this.reloadData();
  },
  methods: {
    handleclick(item)
    {
      var index = this.trainingsData.indexOf(item);
      if(item.approval_status === 'Rejected')
      {
       Swal.fire({
         title:'Reason for Rejection',
         text:this.trainingsData[index].rejected_reason,
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
    editItem(item) {
      this.editedIndex = this.trainingsData.indexOf(item);
      this.editedItem = Object.assign({}, item);
      if (this.editedItem.image) {
        this.image_url = this.editedItem.image.url;
      } else this.editedItem.image = 0;
      this.dialog = true;
    },

    deleteItem(item) {
      this.deletedItem = Object.assign(
        {},
        {
          id: item.id,
          deleted: item.deleted
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
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          this.loading = true;
          this.$store.dispatch("training/updateTraining", payload).then(resp => {
            this.loading = false;
            Swal.fire({
              title: "Success",
              text: "Deleted Successfully!",
              icon: "success",
              showConfirmButton: false,
              timer: 1500
            });
            this.reloadData();
          });
          Swal.fire({
            title: "Something Wrong!",
            text: err,
            icon: "warning",
            showConfirmButton: false,
            timer: 4500
          });
        }
      });
    },
    async reloadData() {
      this.loading = true;

      if (
        this.$store.state.auth.user.userType === "FACULTY" ||
        this.$store.state.auth.user.userType === "STUDENT"
      ) {
        let queryString = "";
        queryString = `department.id=${this.$auth.user.department}&user.id=${this.$auth.user.id}&deleted_ne=true&annual_year=${this.annualYear}`;
        await this.$store.dispatch("training/setTrainingsData", {
          qs: queryString
        });
      } else {
        let queryString = "";
        queryString = `department.id=${this.$auth.user.department}&annual_year=${this.annualYear}&deleted_ne=true`;
        await this.$store.dispatch("training/setTrainingsData", {
          qs: queryString
        });
      }
      this.loading = false;
    },
    close() {
      this.dialog = false;
      this.image_url = '/image_placeholder.png';
    },
    save() {
      if (this.editedIndex > -1) {
        this.editedItem.user = this.editedItem.user.id;
        this.editedItem.department = this.editedItem.department.id;
        var payload = this.editedItem;
        // console.log(payload);
        this.$store
          .dispatch("training/updateTraining", payload)
          .then(resp => {
            Swal.fire({
              title: "Success",
              text: "Updated Successfully!",
              icon: "success",
              showConfirmButton: false,
              timer: 1500
            });

            if (this.imageToDelete) {
              this.$store.dispatch("deleteFile", { id: this.imageToDelete });
              this.imageToDelete = null;
            }
            this.reloadData();
          })
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
