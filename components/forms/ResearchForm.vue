<template>
  <div>
    <v-row>
      <v-col cols="12" md="12">
        <v-form ref="form" v-model="valid" lazy-validation @submit.prevent>
          <v-row no-gutters v-if="$auth.user.userType === 'DEPARTMENT'">
            <v-col cols="11" lg="11">
              <v-select
                v-model="research.user"
                :items="dataFrom"
                item-value="id"
                item-text="fullname"
                label="Data received from?"
                placeholder="Select Faculty / Staff from the List"
                color="success"
                :rules="[
                  (v) => !!v || 'Selecting the Faculty / Staff is Required',
                ]"
              ></v-select>
            </v-col>
            <v-col cols="1" lg="1" sm="1">
              <AddUser
                @new-user="getLatestUsers()"
                @new-student="getLatestStudents()"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <span style="color:red;">Note: Please fill this form <b>ONLY</b>, If you are a Principal Investigator</span>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="research.faculty_name"
                :rules="[(v) => !!v || 'Item is required']"
                label="Faculty Name"
                required
                color="success"
              >
              </v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="research.title"
                :rules="[(v) => !!v || 'Item is required']"
                label="Project Name / Title"
                required
                color="success"
              >
              </v-text-field>
            </v-col>
            <v-col cols="4">
              <v-select
                v-model="research.investigator_type"
                :rules="[(v) => !!v || 'Item is required']"
                :items="investigatorTypes"
                label="Are you PI / Co-PI"
                color="success"
              ></v-select>
            </v-col>
            <v-col v-if="research.investigator_type==='Principal_Investigator'" cols="8">
              <v-text-field
                v-model="research.investigator_name"
                :rules="[(v) => !!v || 'Item is required']"
                label="Name of the Co-PIs"
                color="success"
              ></v-text-field>
            </v-col>
            <v-col v-else-if="research.investigator_type==='CoInvestigator'" cols="8">
              <v-text-field
                v-model="research.investigator_name"
                :rules="[(v) => !!v || 'Item is required']"
                label="Name of the PIs"
                color="success"
              ></v-text-field>
            </v-col>
            <v-col v-else cols="8">
              <v-text-field
                v-model="research.investigator_name"
                :rules="[(v) => !!v || 'Item is required']"
                label="Name of the Investigators"
                color="success"
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model="research.total_durations"
                :rules="[(v) => !!v || 'Item is required']"
                label="Total Duration (In Months)"
                required
                type="number"
                color="success"
              >
              </v-text-field>
            </v-col>

            <v-col cols="4">
              <v-select
                v-model="research.funding_source"
                :rules="[(v) => !!v || 'Item is required']"
                :items="fundingSource"
                label="Source of Funding"
                color="success"
              ></v-select>
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model="research.funding_agency"
                :rules="[(v) => !!v || 'Item is required']"
                label="Funding Agency"
                required
                color="success"
              >
              </v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model="research.total_funds"
                :rules="[(v) => !!v || 'Item is required']"
                label="Total Funds (In Lakhs)"
                required
                type="number"
                color="success"
              >
              </v-text-field>
            </v-col>

            <v-col cols="4">
              <v-text-field
                v-model="research.funding_on_review_period"
                :rules="[(v) => !!v || 'Item is required']"
                label="Funding during the Review Period / Year (In Lakhs)"
                required
                type="number"
                color="success"
              >
              </v-text-field>
            </v-col>
            <v-col cols="4">
              <v-select
                v-model="research.research_status"
                :items="researchStatus"
                :rules="[(v) => !!v || 'Item is required']"
                label="Research Status"
                color="success"
              ></v-select>
            </v-col>
            <v-col cols="12">
              <v-textarea
                v-model="research.research_abstract"
                :rules="[(v) => !!v || 'Item is required']"
                counter
                label="Research Abstract"
                color="success"
              ></v-textarea>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" lg="4">
              <h3><span class="frm-title">Upload Images (If any)</span></h3>
              <v-hover>
                <template v-slot:default="{ hover }">
                  <v-img
                    :src="image_url?`${$axios.defaults.baseURL}${image_url}`:'/image_placeholder.png'"
                    lazy-src="/image_placeholder.png"
                    class="mt-3"
                    max-width="100%"
                    max-height="175"
                  >
                  <v-progress-linear
                    :active="imgLoader"
                    :indeterminate="imgLoader"
                    absolute
                    bottom
                    color="deep-purple accent-4"
                  ></v-progress-linear>
                    <v-fade-transition>
                      <v-overlay v-if="hover" absolute color="#00564c">
                        <v-btn @click="$refs.image.click()">
                          Upload Image
                        </v-btn>
                      </v-overlay>
                    </v-fade-transition>
                  </v-img>
                </template>
              </v-hover>
              <input
                ref="image"
                type="file"
                style="display: none;"
                label="File input"
                @change="handleFileUpload"
              />
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
    <v-row>
      <v-spacer></v-spacer>
      <v-btn small color="#d74f4f" dark @click="reset" class="mr-4">
        Reset
      </v-btn>
      <v-btn small color="#57a727" dark @click="researchAdd" class="mr-4">
        Submit
      </v-btn>
    </v-row>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import { mapState } from "vuex";
import AddUser from "@/components/forms/AddUser";
export default {
  props: ["dataFrom"],
  components: {
    AddUser,
  },
  data: () => ({
    imgLoader: false,
    loading: false,
    date: false,
    valid: true,
    research: {
      annual_year: 0,
      title: "",
      investigator_type: "",
      faculty_name: "",
      investigator_name: "",
      total_durations: null,
      funding_source: "",
      funding_agency: "",
      total_funds: null,
      funding_on_review_period: null,
      research_status: "",
      research_abstract: "",
      approval_status: "Approved",
      approved_by: null,
      approved_date: null,
      deleted: false,
      department: 0,
      image: null,
      user: 0,
    },
    fundingSource: ["Intramural", "Extramural", "Non_Funded"],
    investigatorTypes: ["Principal_Investigator", "CoInvestigator"],
    researchStatus: ["Completed", "Ongoing", "New"],
    studentProject: [true, false],
    selectedFile: null,
    image_url: null,
  }),
  methods: {
    getLatestUsers() {
      console.log("recieving....");
      let queryString = "";
      queryString = `department.id=${this.$store.state.auth.user.department}&userType=FACULTY&blocked_ne=true`;
      this.$store.dispatch("setStaffs", { qs: queryString });
      this.dataFrom = this.$store.state.staffs;
    },
    getLatestStudents() {
      console.log("recieving...");
      let queryString = "";
      queryString = `department.id=${this.$store.state.auth.user.department}&userType=STUDENT&blocked_ne=true`;
      this.$store.dispatch("setStudents", { qs: queryString });
      this.dataFrom = this.$store.state.students;
    },
    reset() {
      this.$refs.form.reset();
      this.image_url = null;
    },
    async researchAdd() {
      if (this.$refs.form.validate()) {
        this.research.annual_year = this.$store.state.selectedYear;
        if (this.$store.state.auth.user.userType !== "DEPARTMENT")
          this.research.user = this.$auth.user.id;
        if (this.$store.state.auth.user.userType === "DEPARTMENT") {
          var today = new Date();
          this.research.approved_date = this.$moment(today).format();
        }
        this.research.department = this.$store.state.auth.user.department;
        var payload = this.research;
        // console.log(payload);
        // var vm = this;
        this.$store
          .dispatch("research/researchAdd", payload)
          .then((resp) => {
            Swal.fire({
              title: "Success",
              text: "Added Successfully!",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            });
            this.reset();
            this.reloadData();
          })
          .catch((err) => {
            this.snackbar = true;
            this.submitMessage = err;
          });
      }
    },
    async handleFileUpload(event) {
      this.imgLoader=true;
      this.selectedFile = event.target.files[0];
      // console.log(this.selectedFile);
      const data = new FormData();
      data.append("files", this.selectedFile);
      const uploadRes = await this.$axios({
        method: "POST",
        url: "/upload",
        data,
      });
      this.image_url = uploadRes.data[0].url;
      this.research.image = uploadRes.data[0].id;
      this.imgLoader=false;
    },
  },
};
</script>
