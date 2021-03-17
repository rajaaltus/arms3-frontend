<template>
  <v-container fluid>
    <YearDialog />
    <v-row class="my-0">
      <v-col cols="12" lg="9" class="pb-0 px-4">
      	<span class="theme-border"><h1 class="ml-3">{{ $metaInfo.title }}</h1></span>
      </v-col>
      <v-col cols="12" lg="3" >
        <v-select
          filled
          color="green"
          v-model="annualYear"
          :items="reportYears"
          item-text="val"
          item-value="id"
          label="Reporting Year"
          required
          @input="reload"
        ></v-select>
      </v-col>
    </v-row>
    <v-row no-gutters class="mt-6">
      <v-col cols="12">
        <v-form ref="about" lazy-validation @submit.prevent>
          <p class="mb-3">
            <span
              >A. Introduction: Specifically indicate the recognition /
              contribution of the Department during the year to policies,
              planning and programmes at State / National and International
              levels.</span
            >
          </p>
          <div>
            <client-only>
              <ckeditor
                v-model="departmentAbout.introduction"
                :editor="editor"
                :config="editorConfig"
              ></ckeditor>
            </client-only>
            <span v-if="departmentAbout.introduction != ''"
              >Words: {{ departmentAbout.introduction.split(" ").length }}</span
            >
          </div>
          <div>
            <p class="mt-3">
              <span
                >B. New facilities developed, new initiatives taken up by the
                Department(s) within NIMHANS during the year.</span
              >
            </p>
            <div>
              <client-only>
                <ckeditor
                  v-model="departmentAbout.facilities"
                  :editor="editor"
                  :config="editorConfig"
                ></ckeditor>
              </client-only>
              <span v-if="departmentAbout.facilities != ''"
                >Words: {{ departmentAbout.facilities.split(" ").length }}</span
              >
            </div>
          </div>
          <v-row>
            <v-spacer></v-spacer>
            <v-btn @click="addProfile" color="success" class="ma-3">
              Submit
            </v-btn>
          </v-row>
        </v-form>
      </v-col>
    </v-row>

    <v-row class="mb-4" no-gutters v-if="departmentAbout.id">
      <span class="theme-border"><h1 class="ml-3">Related Images</h1></span>
    </v-row>

    <v-row
      class="center my-2 mx-1"
      justify="space-between"
      v-if="departmentAbout.id"
    >
      <v-hover>
        <template v-slot:default="{ hover }">
          <v-img
            :src="`${$axios.defaults.baseURL}${img_url1}`"
            lazy-src="/image_placeholder.png"
            class="grey lighten-2"
            max-width="30%"
            max-height="300"
          >
            <v-fade-transition>
              <v-overlay v-if="hover" absolute color="#036358">
                <v-btn @click="$refs.image1.click()">
                  {{ img_url1 ? "Edit Image" : "Upload Image" }}
                </v-btn>
              </v-overlay>
            </v-fade-transition>
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular
                  indeterminate
                  color="grey lighten-5"
                ></v-progress-circular>
              </v-row>
            </template>
            <template v-slot:[placeholder]>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular
                  indeterminate
                  color="grey lighten-5"
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>
        </template>
      </v-hover>
      <input
        ref="image1"
        type="file"
        max-size="10485760"
        style="display:none;"
        label="File input"
        @change="handleFileUpload1"
      />
      <v-hover>
        <template v-slot:default="{ hover }">
          <v-img
            :src="`${$axios.defaults.baseURL}${img_url2}`"
            lazy-src="/image_placeholder.png"
            aspect-ratio="1"
            class="grey lighten-2"
            max-width="30%"
            max-height="300"
          >
            <v-fade-transition>
              <v-overlay v-if="hover" absolute color="#036358">
                <v-btn @click="$refs.image2.click()">
                  {{ img_url2 ? "Edit Image" : "Upload Image" }}
                </v-btn>
              </v-overlay>
            </v-fade-transition>
          </v-img>
        </template>
      </v-hover>
      <input
        ref="image2"
        type="file"
        style="display:none;"
        label="File input"
        @change="handleFileUpload2"
      />
      <v-hover>
        <template v-slot:default="{ hover }">
          <v-img
            :src="`${$axios.defaults.baseURL}${img_url3}`"
            lazy-src="/image_placeholder.png"
            class="grey lighten-2"
            max-width="30%"
            max-height="300"
          >
            <v-fade-transition>
              <v-overlay v-if="hover" absolute color="#036358">
                <v-btn @click="$refs.image3.click()">
                  {{ img_url3 ? "Edit Image" : "Upload Image" }}
                </v-btn>
              </v-overlay>
            </v-fade-transition>
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular
                  indeterminate
                  color="grey lighten-5"
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>
        </template>
      </v-hover>
      <input
        ref="image3"
        type="file"
        style="display:none;"
        label="File input"
        @change="handleFileUpload3"
      />
    </v-row>
  </v-container>
</template>

<script>

import { mapState } from "vuex";
import Swal from "sweetalert2";
if (process.client) {
  require("~/plugins/ckeditor");
}
export default {
  head() {
    return {
      title: "About the Department"
    };
  },
  data: () => ({
    overlay: false,
    img_url1: null,
    img_url2: null,
    img_url3: null,
    Ydialog: false,
    editorConfig: {
      height: "200px"
    },
    selectedYear: 0,
    departmentAbout: {
      annual_year: 0,
      department: 0,
      deleted: false,
      introduction: "",
      facilities: "",
      image_1: null,
      image_2: null,
      image_3: null
    },
    profileImage: {
      id: 0,
      image_1: null,
      image_2: null,
      image_3: null
    },
    imageToDelete: null,
    editedItem: {
      annual_year: 0,
      department: 0,
      deleted: false,
      introduction: "",
      facilities: "",
      image_1: null,
      image_2: null,
      image_3: null
    },
    selectedFile: "",
    addDepartmentImage: {
      departmentProfileId: 0,
      imageCode: "",
      name: "",
      path: "",
      status: "VALID"
    },
    addImageContent: {
      data: "",
      dataContentType: "",
      departmentImageId: 0,
      status: "VALID"
    },
    annualYear: 0
  }),
  watch: {
    annualYear(val) {
      this.reload();
    }
  },
  computed: {
    reportYears() {
      return this.$store.state.reportYears;
    },
    ...mapState({
      newAbout: state => state.about.newAbout
    }),
    editor() {
      return process.client
        ? require("@ckeditor/ckeditor5-build-classic")
        : null;
    }
  },

  async fetch({ store }) {
    let id = store.state.auth.user.id;
    await store.dispatch("user/setFullUser", { id: id }).catch(err => {
      this.snackbar = true;
      this.submitMessage = err;
    });
   
    let queryString = "";
    queryString = `department.id=${store.state.auth.user.department}&annual_year=${store.state.selectedYear}`;
    await store.dispatch("about/setAboutData", { query: queryString });
  },
  async mounted() {
      this.annualYear = this.$store.state.selectedYear;

    if (this.newAbout.length > 0) {
      this.departmentAbout = Object.assign({}, this.newAbout[0]);
      if (this.$store.state.about.newAbout[0].image_1 !== null)
        this.img_url1 = this.$store.state.about.newAbout[0].image_1.url;
      else this.img_url1 = null;

      if (this.$store.state.about.newAbout[0].image_2 != null)
        this.img_url2 = this.$store.state.about.newAbout[0].image_2.url;
      else this.img_url2 = null;

      if (this.$store.state.about.newAbout[0].image_3 != null)
        this.img_url3 = this.$store.state.about.newAbout[0].image_3.url;
      else this.img_url3 = null;
    }
  },

  methods: {
    async setYear() {
      console.log('setting...')
      this.annualYear = this.$store.state.selectedYear;
    },
    async handleFileUpload1(event) {
      if (this.img_url1 === null || this.img_url1 === undefined) {
        this.selectedFile = event.target.files[0];
        const data = new FormData();
        data.append("files", this.selectedFile);
        const uploadRes = await this.$axios({
          method: "POST",
          url: "/upload",
          data
        });
        this.img_url1 = uploadRes.data[0].url;
        this.departmentAbout.image_1 = uploadRes.data[0].id;
        var payload = this.departmentAbout;
        await this.$store
          .dispatch("about/updateAbout", payload)
          .then(resp => {
            Swal.fire({
              title: "Success",
              text: "Department Profile Updated!",
              icon: "success",
              showConfirmButton: false,
              timer: 1500
            });
            if (this.imageToDelete) {
              this.$store.dispatch("deleteFile", { id: this.imageToDelete });
              this.imageToDelete = null;
            }
            this.reload();
          })
          .catch(err => {
            Swal.fire({
              title: "Oops!",
              text: "Exceeds Word limit, (should be less than 150 words.)",
              icon: "warning",
              showConfirmButton: false,
              timer: 3000
            });
          });
      } else {
        this.imageToDelete = this.departmentAbout.image_1.id;
        this.selectedFile = event.target.files[0];
        const data = new FormData();
        data.append("files", this.selectedFile);
        const uploadRes = await this.$axios({
          method: "POST",
          url: "/upload",
          data
        });
        this.img_url1 = uploadRes.data[0].url;
        this.departmentAbout.image_1 = uploadRes.data[0].id;
        var payload = Object.assign(
          {},
          {
            id: this.departmentAbout.id,
            image_1: this.departmentAbout.image_1
          }
        );
        await this.$store
          .dispatch("about/updateAbout", payload)
          .then(resp => {
            Swal.fire({
              title: "Success",
              text: "Department Profile Updated!",
              icon: "success",
              showConfirmButton: false,
              timer: 1500
            });
            if (this.imageToDelete) {
              this.$store.dispatch("deleteFile", { id: this.imageToDelete });
              this.imageToDelete = null;
            }
            this.reload();
          })
          .catch(err => {
            Swal.fire({
              title: "Oops!",
              text: "Exceeds Word limit, (should be less than 150 words.)",
              icon: "warning",
              showConfirmButton: false,
              timer: 3000
            });
          });
      }
    },
    async handleFileUpload2(event) {
      if (this.img_url2 === null || this.img_url2 === undefined) {
        this.selectedFile = event.target.files[0];
        const data = new FormData();
        data.append("files", this.selectedFile);
        const uploadRes = await this.$axios({
          method: "POST",
          url: "/upload",
          data
        });
        this.img_url2 = uploadRes.data[0].url;
        this.departmentAbout.image_2 = uploadRes.data[0].id;
        var payload = this.departmentAbout;
        await this.$store
          .dispatch("about/updateAbout", payload)
          .then(resp => {
            Swal.fire({
              title: "Success",
              text: "Department Profile Updated!",
              icon: "success",
              showConfirmButton: false,
              timer: 1500
            });
            if (this.imageToDelete) {
              this.$store.dispatch("deleteFile", { id: this.imageToDelete });
              this.imageToDelete = null;
            }
            this.reload();
          })
          .catch(err => {
            Swal.fire({
              title: "Oops!",
              text: "Exceeds Word limit, (should be less than 150 words.)",
              icon: "warning",
              showConfirmButton: false,
              timer: 3000
            });
          });
      } else {
        this.imageToDelete = this.departmentAbout.image_2.id;
        this.selectedFile = event.target.files[0];
        const data = new FormData();
        data.append("files", this.selectedFile);
        const uploadRes = await this.$axios({
          method: "POST",
          url: "/upload",
          data
        });
        this.img_url2 = uploadRes.data[0].url;
        this.departmentAbout.image_2 = uploadRes.data[0].id;
        var payload = Object.assign(
          {},
          {
            id: this.departmentAbout.id,
            image_2: this.departmentAbout.image_2
          }
        );
        await this.$store
          .dispatch("about/updateAbout", payload)
          .then(resp => {
            Swal.fire({
              title: "Success",
              text: "Department Profile Updated!",
              icon: "success",
              showConfirmButton: false,
              timer: 1500
            });
            if (this.imageToDelete) {
              this.$store.dispatch("deleteFile", { id: this.imageToDelete });
              this.imageToDelete = null;
            }
            this.reload();
          })
          .catch(err => {
            Swal.fire({
              title: "Oops!",
              text: "Exceeds Word limit, (should be less than 150 words.)",
              icon: "warning",
              showConfirmButton: false,
              timer: 3000
            });
          });
      }
    },
    async handleFileUpload3(event) {
      if (this.img_url3 === null || this.img_url3 === undefined) {
        this.selectedFile = event.target.files[0];
        const data = new FormData();
        data.append("files", this.selectedFile);
        const uploadRes = await this.$axios({
          method: "POST",
          url: "/upload",
          data
        })
        .catch(err=>{
          Swal.fire({
            title: 'Something Wrong!',
            text: err.response,
            icon: 'error'
          })
        })
        this.img_url3 = uploadRes.data[0].url;
        this.departmentAbout.image_3 = uploadRes.data[0].id;
        var payload = this.departmentAbout;
        await this.$store
          .dispatch("about/updateAbout", payload)
          .then(resp => {
            Swal.fire({
              title: "Success",
              text: "Department Profile Updated!",
              icon: "success",
              showConfirmButton: false,
              timer: 1500
            });
            if (this.imageToDelete) {
              this.$store.dispatch("deleteFile", { id: this.imageToDelete });
              this.imageToDelete = null;
            }
            this.reload();
          })
          .catch(err => {
            Swal.fire({
              title: "Oops!",
              text: "Exceeds Word limit, (should be less than 150 words.)",
              icon: "warning",
              showConfirmButton: false,
              timer: 3000
            });
          });
      } else {
        this.imageToDelete = this.departmentAbout.image_3.id;
        this.selectedFile = event.target.files[0];
        const data = new FormData();
        data.append("files", this.selectedFile);
        const uploadRes = await this.$axios({
          method: "POST",
          url: "/upload",
          data
        })
        .catch(err=>{
          Swal.fire({
            title: 'Something Wrong!',
            text: err.response,
            icon: 'error'
          })
        })
        this.img_url3 = uploadRes.data[0].url;
        this.departmentAbout.image_3 = uploadRes.data[0].id;
        var payload = Object.assign(
          {},
          {
            id: this.departmentAbout.id,
            image_3: this.departmentAbout.image_3
          }
        );
        await this.$store
          .dispatch("about/updateAbout", payload)
          .then(resp => {
            Swal.fire({
              title: "Success",
              text: "Department Profile Updated!",
              icon: "success",
              showConfirmButton: false,
              timer: 1500
            });
            if (this.imageToDelete) {
              this.$store.dispatch("deleteFile", { id: this.imageToDelete });
              this.imageToDelete = null;
            }
            this.reload();
          })
          .catch(err => {
            Swal.fire({
              title: "Oops!",
              text: "Exceeds Word limit, (should be less than 150 words.)",
              icon: "warning",
              showConfirmButton: false,
              timer: 3000
            });
          });
      }
    },
    async addProfile() {
      if (this.newAbout.length > 0) {
        this.departmentAbout.department = this.$store.state.auth.user.department;
        var payload = this.departmentAbout;
         console.log(payload);
        await this.$store
          .dispatch("about/updateAbout", payload)
          .then(resp => {
            Swal.fire({
              title: "Success",
              text: "Department Profile Updated!",
              icon: "success",
              showConfirmButton: false,
              timer: 1500
            });
            this.reload();
          })
          .catch(err => {
            Swal.fire({
              title: "Oops!",
              text: "Exceeds Word limit, (should be less than 150 words.)",
              icon: "warning",
              showConfirmButton: false,
              timer: 3000
            });
          });
      } else {
        this.departmentAbout.annual_year = this.$store.state.selectedYear;
        this.departmentAbout.department = this.$store.state.auth.user.department;
        if (
          this.departmentAbout.introduction != "" &&
          this.departmentAbout.facilities != ""
        ) {
          var payload = this.departmentAbout;
          // console.log(payload);
          await this.$store
            .dispatch("about/addProfile", payload)
            .then(resp => {
              Swal.fire({
                title: "Success",
                text: "Profile Added!",
                icon: "success",
                showConfirmButton: false,
                timer: 1500
              });
              this.reload();
            })
            .catch(err => {
              Swal.fire({
                title: "Oops!",
                text: "Exceeds Word limit, (should be less than 150 words.)",
                icon: "warning",
                showConfirmButton: false,
                timer: 3000
              });
            });
        } else {
          Swal.fire({
            title: "Oops!",
            text: "Please enter data before submit",
            type: "warning",
            showConfirmButton: false,
            timer: 3000
          });
        }
      }
    },
    async reload() {
      this.$nuxt.$loading.start();
      let queryString = "";
      queryString = `department.id=${this.$store.state.auth.user.department}&annual_year=${this.annualYear}`;
      await this.$store.dispatch("about/setAboutData", { query: queryString });
      if (this.newAbout.length > 0) {
        this.departmentAbout = Object.assign({}, this.newAbout[0]);
        if (this.$store.state.about.newAbout[0].image_1 !== null)
          this.img_url1 = this.$store.state.about.newAbout[0].image_1.url;
        else this.img_url1 = null;

        if (this.$store.state.about.newAbout[0].image_2 != null)
          this.img_url2 = this.$store.state.about.newAbout[0].image_2.url;
        else this.img_url2 = null;

        if (this.$store.state.about.newAbout[0].image_3 != null)
          this.img_url3 = this.$store.state.about.newAbout[0].image_3.url;
        else this.img_url3 = null;
      } else {
        this.departmentAbout = Object.assign({}, this.editedItem);
      }
      this.$nuxt.$loading.finish();
    },
    async changeReportingYear() {
      await this.$store.dispatch("setReportingYear", this.annualYear);
      await this.reload();
    },
    async setReportingYear() {
      this.Ydialog = false;
      await this.$store.dispatch("setReportingYear", this.annualYear);
      this.reload();
    }
  }
};
</script>

<style>
.page-title {
  background: none;
  border-left: 10px #57a727 solid;
  display: inline-flex;
  line-height: 0em;
  height: 40px;
  vertical-align: center !important;
}
.ck.ck-editor__main > .ck-editor__editable {
  height: 250px;
}
</style>
