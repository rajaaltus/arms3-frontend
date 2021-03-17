<template>
  <div>
    <v-row>
      <v-col cols="12" md="12">
        <v-form ref="form" v-model="valid" lazy-validation @submit.prevent>
          <v-row no-gutters v-if="$auth.user.userType === 'DEPARTMENT'">
            <v-col cols="11" lg="11">
              <v-select
                v-model="presentation.user"
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
            <v-col cols="3">
              <v-select
                v-model="presentation.type"
                :rules="[(v) => !!v || 'Item is required']"
                :items="contributionType"
                label="Type of Contribution"
                color="success"
              ></v-select>
            </v-col>
            <v-col cols="3">
              <v-select
                v-model="presentation.forum"
                :rules="[(v) => !!v || 'Item is required']"
                :items="forum"
                label="Forum"
                color="success"
              ></v-select>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="presentation.faculty_name"
                :rules="[(v) => !!v || 'Item is required']"
                label="Who presented / Author(s)"
                required
                color="success"
              >
              </v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="presentation.title"
                :rules="[(v) => !!v || 'Item is required']"
                label="Title"
                required
                color="success"
              >
              </v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="presentation.coauthors"
                label="Co-author(s)"
                :rules="[(v) => !!v || 'Item is required']"
                color="success"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-container fluid>
              <v-textarea
                v-model="presentation.reference"
                :rules="[(v) => !!v || 'Item is required']"
                label="Reference"
                color="success"
              ></v-textarea>
              <span class="caption font-weight-normal">Example: Nalini A, Preethish Kumar V, Polavarapu K, Vengalil S, Engel AG, Shen Xin-Ming. Congenital myasthenic syndromes: Report on 8 cases from India. 13th International Congress of Neuromuscular Disorders, Toronto, Canada, 5-9 July 2016.</span>
            </v-container>
          </v-row>
          <v-row>
            <v-col cols="12" lg="4" md="12">
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
      <v-btn small color="#57a727" dark @click="presentationAdd" class="mr-4">
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
  props: ["dataFrom", "section"],
  components: {
    AddUser,
  },
  data: () => ({
    imgLoader: false,
    duration_from: false,
    duration_to: false,
    valid: false,
    coAuthors: [],
    presentation: {
      annual_year: 0,
      type: "",
      forum: "",
      faculty_name: "",
      coauthors: "",
      title: "",
      reference: "",
      approval_status: "Approved",
      approved_by: null,
      approved_date: null,
      deleted: false,
      image: null,
      department: 0,
      user: 0,
    },
    selectedFile: null,
    image_url: null,
    contributionType: ["Presentation", "Poster"],
    forum: ["National", "International"],
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
    async presentationAdd() {
      if (this.$refs.form.validate()) {
        this.presentation.annual_year = this.$store.state.selectedYear;
         if (this.$store.state.auth.user.userType !== "DEPARTMENT")
          this.presentation.user = this.$auth.user.id;
        if (this.$store.state.auth.user.userType === "DEPARTMENT") {
          var today = new Date();
          this.presentation.approved_date = this.$moment(today).format();
        } 
        this.presentation.department = this.$store.state.auth.user.department;
        var payload = this.presentation;
        // console.log(payload);
        var vm = this;
        let res = this.$store.dispatch("presentation/addPresentation", payload)
          res.then((data) => {
            if (data)
              this.reset();
          })
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
      this.presentation.image = uploadRes.data[0].id;
      this.imgLoader=false;
    },
  },
};
</script>
