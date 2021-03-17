<template>
  <div>
    <v-row>
      <v-col cols="12" md="12">
        <v-form ref="form" v-model="valid" lazy-validation @submit.prevent>
          <v-row no-gutters v-if="$auth.user.userType === 'DEPARTMENT'">
            <v-col cols="11" lg="11">
              <v-select
                v-model="recognition.user"
                :items="dataFrom"
                item-value="id"
                item-text="fullname"
                label="Data received from?"
                :placeholder="section"
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
                v-model="recognition.faculty_name"
                :rules="[(v) => !!v || 'Item is required']"
                :label="getLabel()"
                required
                color="success" 
              >
              </v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="recognition.award_title"
                :rules="[(v) => !!v || 'Item is required']"
                label="Award / Honour Title"
                required
                color="success"
              >
              </v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model="recognition.organization"
                :rules="[(v) => !!v || 'Item is required']"
                label="Organization"
                required
                color="success"
              >
              </v-text-field>
            </v-col>

            <v-col cols="4">
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
                    v-model="recognition.date"
                    :return-value.sync="date"
                    :rules="[(v) => !!v || 'Item is required']"
                    readonly
                    color="success"
                    label="Date"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="recognition.date" no-title scrollable>
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
            <v-col cols="4">
              <v-text-field
                v-model="recognition.place"
                :rules="[(v) => !!v || 'Item is required']"
                label="Place"
                color="success"
              >
              </v-text-field>
            </v-col>
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
      <v-btn small color="#57a727" dark @click="recognitionAdd" class="mr-4">
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
  props: ["dataFrom", "section", "formType"],
  components: {
    AddUser,
  },
  data: () => ({
    imgLoader: false,
    loading: false,
    date: false,
    valid: true,
    recognition: {
      annual_year: 0,
      award_title: "",
      faculty_name: "",
      organization: "",
      date: "",
      place: "",
      approval_status: "Approved",
      approved_by: null,
      approved_date: null,
      deleted: false,
      department: 0,
      user: 0,
      image: null,
    },
    selectedFile: null,
    image_url: null,
  }),
  methods: {
    getLabel() {
      if(this.formType==='Faculty') 
        return `Faculty Name(s)`
      else if(this.formType==='Student')
        return `Student Name(s)`
      else
        return `Faculty Name(s)`
    },
    
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
    async recognitionAdd() {
      if (this.$refs.form.validate()) {
        this.recognition.annual_year = this.$store.state.selectedYear;
        this.recognition.department = this.$store.state.auth.user.department;
        if (this.$store.state.auth.user.userType !== "DEPARTMENT")
          this.recognition.user = this.$auth.user.id;
        if (this.$store.state.auth.user.userType === "DEPARTMENT") {
          var today = new Date();
          this.recognition.approved_date = this.$moment(today).format();
        }
        var payload = this.recognition;
        // console.log(payload);
        this.$store
          .dispatch("recognition/recognitionAdd", payload)
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
      this.recognition.image = uploadRes.data[0].id;
      this.imgLoader=false;
    },
  },
};
</script>
