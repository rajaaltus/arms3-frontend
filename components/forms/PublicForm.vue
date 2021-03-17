<template>
  <div>
    <v-row>
      <v-col cols="12" md="12">
        <v-form ref="form" v-model="valid" lazy-validation @submit.prevent>
          <v-row no-gutters v-if="$auth.user.userType === 'DEPARTMENT'">
            <v-col cols="11" lg="11">
              <v-select
                v-model="publicEngagement.user"
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
              <v-text-field
                v-model="publicEngagement.faculty_name"
                :rules="[(v) => !!v || 'Item is required']"
                label="Name of the Faculty"
                color="success"
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-select
                v-model="publicEngagement.type"
                :rules="[(v) => !!v || 'Item is required']"
                :items="activityTypes"
                label="Type of Activity"
                color="success"
              ></v-select>
            </v-col>
            <v-col v-if="publicEngagement.type !== 'Others'" cols="9">
              <v-text-field
                v-model="publicEngagement.program_name"
                :rules="[(v) => !!v || 'Item is required']"
                label="If others please specify"
                required
                disabled
                color="success"
              >
              </v-text-field>
            </v-col>
            <v-col v-else cols="9">
              <v-text-field
                v-model="publicEngagement.program_name"
                :rules="[(v) => !!v || 'Item is required']"
                label="If others please specify"
                required
                color="success"
              >
              </v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="publicEngagement.title"
                :rules="[(v) => !!v || 'Item is required']"
                label="Title"
                required
                color="success"
              >
              </v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="publicEngagement.program_name"
                v-if="publicEngagement.type !== 'Others'"
                :rules="[(v) => !!v || 'Item is required']"
                label="Programme Name"
                required
                color="success"
              >
              </v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="publicEngagement.target_audience"
                :rules="[(v) => !!v || 'Item is required']"
                label="Target Audience"
                required
                color="success"
              >
              </v-text-field>
            </v-col>
            <v-col cols="6">
              <v-menu
                ref="menu"
                v-model="date"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="publicEngagement.date"
                    :return-value.sync="date"
                    :rules="[(v) => !!v || 'Item is required']"
                    readonly
                    color="success"
                    label="Date"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="publicEngagement.date"
                  no-title
                  scrollable
                >
                  <v-spacer></v-spacer>
                  <v-btn text @click="date = false">
                    Cancel
                  </v-btn>
                  <v-btn text @click="$refs.menu.save(date)">
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="publicEngagement.place"
                :rules="[(v) => !!v || 'Item is required']"
                label="Place"
                required
                color="success"
              >
              </v-text-field>
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
      <v-btn small color="#57a727" dark @click="publicAdd" class="mr-4">
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
    publicEngagement: {
      annual_year: 0,
      type: "",
      faculty_name: "",
      title: "",
      program_name: "",
      target_audience: "",
      date: "",
      place: "",
      approval_status: "Approved",
      approved_by: null,
      approved_date: null,
      deleted: false,
      department: 0,
      image: null,
      user: 0,
    },
    activityTypes: ["Public_Lecture", "Mass_Media", "Others"],
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
    async publicAdd() {
      if (this.$refs.form.validate()) {
        this.publicEngagement.annual_year = this.$store.state.selectedYear;
        if (this.$store.state.auth.user.userType !== "DEPARTMENT")
          this.publicEngagement.user = this.$auth.user.id;
        this.publicEngagement.department = this.$store.state.auth.user.department;
        if (this.$store.state.auth.user.userType === "DEPARTMENT") {
          var today = new Date();
          this.publicEngagement.approved_date = this.$moment(today).format();
        }
        var payload = this.publicEngagement;
        // console.log(payload);
        this.$store
          .dispatch("public/publicAdd", payload)
          .then((resp) => {
            Swal.fire({
              title: "Success",
              text: "Added Successfully!",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            });
            this.reset();
          })
          .catch((err) => {
            Swal.fire("Something Wrong!");
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
      this.publicEngagement.image = uploadRes.data[0].id;
      this.imgLoader=false;
    },
  },
};
</script>
