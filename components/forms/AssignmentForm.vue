<template>
  <div>
    <v-row>
      <v-col cols="12" md="12">
        <v-form ref="form" v-model="valid" lazy-validation @submit.prevent>
          <v-row no-gutters>
            <v-col cols="7" lg="7" v-if="$auth.user.userType === 'DEPARTMENT'">
              <v-select
                v-model="assignment.user"
                :items="dataFrom"
                item-value="id"
                item-text="fullname"
                label="Data received from?"
                placeholder="Select Faculty / Staff from the List"
                color="success"
                :rules="[(v) => !!v || 'Selecting the Faculty / Staff is Required']"
              ></v-select>
            </v-col>
            <v-col cols="1" lg="1" sm="1" v-if="$auth.user.userType === 'DEPARTMENT'">
              <AddUser @new-user="getLatestUsers()" @new-student="getLatestStudents()" />
            </v-col>
            <v-col cols="4">
              <v-select v-model="assignment.month" :items="months" item-value="id" item-text="text" label="Data for the month of" placeholder="Select the month for the entry" color="success" :rules="[(v) => !!v || 'Required']"></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="assignment.faculty_name" :rules="[(v) => !!v || 'Item is required']" label="Faculty Name(s)" color="success"></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-select v-model="assignment.classification" :rules="[(v) => !!v || 'Item is required']" :items="classifications" item-text="name" item-value="value" label="Classification" color="success"></v-select>
            </v-col>
            <v-col cols="9">
              <v-text-field v-model="assignment.roles" :rules="[(v) => !!v || 'Item is required']" label="Roles" required color="success"> </v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="assignment.designation" :rules="[(v) => !!v || 'Item is required']" label="Designation" required color="success"> </v-text-field>
            </v-col>
            <v-col cols="12">
              <v-textarea auto-grow row-height="15" counter v-model="assignment.brief_report" :rules="[(v) => !!v || 'Item is required']" label="Brief Report" color="success"></v-textarea>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" lg="4">
              <h3><span class="frm-title">Upload Images (If any)</span></h3>
              <v-hover>
                <template v-slot:default="{ hover }">
                  <v-img :src="image ? `${$axios.defaults.baseURL}${image.url}` : '/image_placeholder.png'" lazy-src="/image_placeholder.png" class="mt-3" max-width="100%" max-height="175" contain>
                    <v-progress-linear :active="imgLoader" :indeterminate="imgLoader" absolute bottom color="deep-purple accent-4"></v-progress-linear>
                    <v-fade-transition>
                      <v-overlay v-if="hover" absolute color="#00564c">
                        <v-btn @click="$refs.image.click()">
                          {{ image ? "Change Image" : "Upload Image" }}
                        </v-btn>
                        <v-btn v-if="image" class="mt-0" x-small fab dark color="red darken-3" @click="deleteImage(image.id)">
                          <v-icon>mdi-delete</v-icon>
                        </v-btn>
                      </v-overlay>
                    </v-fade-transition>
                  </v-img>
                </template>
              </v-hover>
              <input ref="image" accept="image/png, image/jpeg" type="file" style="display: none;" label="File input" @change="handleFileUpload" />
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
    <v-row v-if="assignmentData">
      <v-spacer></v-spacer>
      <v-btn small color="#d74f4f" dark @click="$emit('close')" class="mr-4">
        Cancel
      </v-btn>
      <v-btn small color="#57a727" dark @click="$emit('save', assignment)" class="mr-4">
        Update
      </v-btn>
    </v-row>
    <v-row v-else>
      <v-spacer></v-spacer>
      <v-btn small color="#d74f4f" dark @click="reset" class="mr-4">
        Reset
      </v-btn>
      <v-btn small color="#57a727" dark @click="assignmentAdd" class="mr-4">
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
  props: ["dataFrom", "section", "assignmentData"],
  components: {
    AddUser,
  },
  computed: {
    ...mapState({
      months: (state) => state.months,
    }),
  },
  data: () => ({
    imgLoader: false,
    loading: false,
    date: false,
    valid: true,
    assignment: {
      annual_year: 0,
      classification: "",
      roles: "",
      faculty_name: "",
      designation: "",
      brief_report: "",
      approval_status: "Approved",
      approved_by: null,
      approved_date: null,
      deleted: false,
      department: 0,
      image: null,
      user: 0,
      month: 0,
    },
    selectedFile: null,
    image: null,
    classifications: ["International", "National", "NotApplicable", "Others"],
  }),
  mounted() {
    if (this.assignmentData) {
      this.assignment = Object.assign({}, this.assignmentData);
      this.image = this.assignment.image ? this.assignment.image : null;
    }
  },
  methods: {
    async deleteImage(id) {
      await this.$store.dispatch("deleteFile", { id: id });
      this.image = null;
    },
    getLatestUsers() {
      let queryString = "";
      queryString = `department.id=${this.$store.state.auth.user.department}&userType=FACULTY&blocked_ne=true`;
      this.$store.dispatch("setStaffs", { qs: queryString });
      this.dataFrom = this.$store.state.staffs;
    },
    getLatestStudents() {
      let queryString = "";
      queryString = `department.id=${this.$store.state.auth.user.department}&userType=STUDENT&blocked_ne=true`;
      this.$store.dispatch("setStudents", { qs: queryString });
      this.dataFrom = this.$store.state.students;
    },
    reset() {
      this.$refs.form.reset();
      this.image = null;
    },
    async assignmentAdd() {
      if (this.$refs.form.validate()) {
        this.assignment.annual_year = this.$store.state.selectedYear;

        if (this.$store.state.auth.user.userType !== "DEPARTMENT") this.assignment.user = this.$auth.user.id;

        if (this.$store.state.auth.user.userType === "DEPARTMENT") {
          var today = new Date();
          this.assignment.approved_date = this.$moment(today).format();
        }
        this.assignment.department = this.$store.state.auth.user.department;
        var payload = this.assignment;
        // console.log(payload);
        var vm = this;
        await this.$store.dispatch("assignment/assignmentAdd", payload);
      }
      if (this.$store.state.assignment.assignmentsData.success) {
        this.reset();
      }
    },
    async handleFileUpload(event) {
      this.imgLoader = true;
      this.selectedFile = event.target.files[0];
      // console.log(this.selectedFile);
      const data = new FormData();
      data.append("files", this.selectedFile);
      const uploadRes = await this.$axios({
        method: "POST",
        url: "/upload",
        data,
      });
      this.image = uploadRes.data[0];
      this.assignment.image = uploadRes.data[0].id;
      this.imgLoader = false;
    },
  },
};
</script>
