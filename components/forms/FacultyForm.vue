<template>
  <div>
    <v-form ref="form" v-model="valid" lazy-validation @submit.prevent>
      <v-container fluid>
        <v-row>
          <v-col cols="3">
            <v-select color="green" v-model="faculty.faculty_status" :rules="[(v) => !!v || 'Item is required']" label="Status" :items="facultyStatus"> </v-select>
          </v-col>
          <v-col cols="3">
            <v-text-field color="green" v-model="faculty.faculty_name" :rules="[(v) => !!v || 'Item is required']" label="Name of the Official" required> </v-text-field>
          </v-col>

          <v-col cols="3">
            <v-text-field color="green" v-model="faculty.designation" :rules="[(v) => !!v || 'Item is required']" label="Designation" required> </v-text-field>
          </v-col>
          <v-col cols="3">
            <v-menu ref="menu1" v-model="duration_from" :close-on-content-click="false" transition="scale-transition" offset-y min-width="290px">
              <template v-slot:activator="{ on }">
                <v-text-field color="green" v-model="faculty.leaving_date" :rules="[(v) => !!v || 'Item is required']" :return-value.sync="duration_from" readonly label="Leaving Date" v-on="on"></v-text-field>
              </template>
              <v-date-picker v-model="faculty.leaving_date" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="duration_from = false">
                  Cancel
                </v-btn>
                <v-btn text color="primary" @click="$refs.menu1.save(duration_from)">
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="12" lg="4">
            <h3><span class="frm-title">Upload Image (If any)</span></h3>
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
      </v-container>
      <v-row v-if="facultyData">
        <v-spacer></v-spacer>
        <v-btn small color="#d74f4f" dark @click="$emit('close')" class="mr-4">
          Cancel
        </v-btn>
        <v-btn small color="#57a727" dark @click="$emit('save', faculty)" class="mr-4">
          Update
        </v-btn>
      </v-row>
      <v-row v-else>
        <v-spacer></v-spacer>
        <v-btn small color="#d74f4f" dark @click="reset" class="mr-4">
          Reset
        </v-btn>
        <v-btn small color="#57a727" dark @click="addFaculty" class="mr-4">
          Submit
        </v-btn>
      </v-row>
    </v-form>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Swal from "sweetalert2";
export default {
  props: ["facultyData"],
  data: () => ({
    imgLoader: false,
    duration_from: false,
    valid: false,
    faculty: {
      annual_year: 0,
      faculty_status: "",
      faculty_name: "",
      designation: "",
      leaving_date: "",
      deleted: false,
      department: 0,
      image: null,
    },
    selectedFile: null,
    image: null,
    facultyStatus: ["Superannuated", "Retired", "VRS"],
  }),
  mounted() {
    if (this.facultyData) {
      this.faculty = Object.assign({}, this.facultyData);
      this.image = this.faculty.image ? this.faculty.image : null;
    }
  },
  methods: {
    async deleteImage(id) {
      await this.$store.dispatch("deleteFile", { id: id });
      this.image = null;
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
      this.faculty.image = uploadRes.data[0].id;
      this.imgLoader = false;
    },
    async addFaculty() {
      if (this.$refs.form.validate()) {
        this.faculty.annual_year = this.$store.state.selectedYear;
        this.faculty.department = this.$store.state.auth.user.department;
        var payload = this.faculty;
        // console.log(payload);
        this.$store
          .dispatch("faculty/addFaculty", payload)
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
    reloadData() {
      this.loading = true;
      let queryString = "";
      queryString = `department.id=${this.$store.state.auth.user.department}&deleted_ne=true&annual_year=${this.$store.state.selectedYear}`;
      this.$store.dispatch("faculty/setFacultyData", { qs: queryString });
      this.loading = false;
    },
    reset() {
      this.$refs.form.reset();
      this.image_url = null;
    },
  },
};
</script>
