<template>
  <div>
    <v-row>
      <v-col cols="12" md="12">
        <v-form ref="form" v-model="valid" lazy-validation @submit.prevent>
          <v-row no-gutters>
            <v-col cols="7" lg="7" v-if="$auth.user.userType === 'DEPARTMENT'">
              <v-select
                v-model="presentation.user"
                :items="dataFrom"
                item-value="id"
                item-text="fullname"
                label="Data received from?"
                :placeholder="section"
                color="success"
                :rules="[(v) => !!v || 'Selecting the Faculty / Staff is Required']"
              ></v-select>
            </v-col>
            <v-col cols="1" lg="1" sm="1" v-if="$auth.user.userType === 'DEPARTMENT'">
              <AddUser @new-user="getLatestUsers()" @new-student="getLatestStudents()" />
            </v-col>
            <v-col cols="4">
              <v-select v-model="presentation.month" :items="months" item-value="id" item-text="text" label="Data for the month of" placeholder="Select the month for the entry" color="success" :rules="[(v) => !!v || 'Required']"></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="3">
              <v-select v-model="presentation.type" :rules="[(v) => !!v || 'Item is required']" :items="contributionType" label="Type of Contribution" color="success"></v-select>
            </v-col>
            <v-col cols="3">
              <v-select v-model="presentation.forum" :rules="[(v) => !!v || 'Item is required']" :items="forum" label="Forum" color="success"></v-select>
            </v-col>
            <v-col cols="6">
              <v-text-field v-model="presentation.faculty_name" :rules="[(v) => !!v || 'Item is required']" label="Who presented / Author(s)" required color="success"> </v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="presentation.title" :rules="[(v) => !!v || 'Item is required']" label="Title" required color="success"> </v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="presentation.coauthors" label="Co-author(s)" color="success"></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-menu ref="menu" :close-on-content-click="false" transition="scale-transition" offset-y min-width="290px">
                <template v-slot:activator="{ on }">
                  <v-text-field :return-value.sync="duration_from" :rules="[(v) => !!v || 'Item is required']" readonly color="success" label="Date" v-on="on"></v-text-field>
                </template>
                <v-date-picker color="green lighten-1" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="duration_from = false">
                    Cancel
                  </v-btn>
                  <v-btn text color="primary" @click="$refs.menu.save(duration_from)">
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="8">
              <v-text-field label="Place of Presentation / Poster" :rules="[(v) => !!v || 'Item is required']" color="success"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-container fluid>
              <v-textarea v-model="presentation.reference" :rules="[(v) => !!v || 'Item is required']" label="Reference" color="success"></v-textarea>
              <span class="caption font-weight-normal"
                >Example: Nalini A, Preethish Kumar V, Polavarapu K, Vengalil S, Engel AG, Shen Xin-Ming. Congenital myasthenic syndromes: Report on 8 cases from India. 13th International Congress of Neuromuscular Disorders, Toronto,
                Canada, 5-9 July 2016.</span
              >
            </v-container>
          </v-row>
          <v-row>
            <v-col cols="12" lg="4" md="12">
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
              <input ref="image" type="file" accept="image/png, image/jpeg" style="display: none;" label="File input" @change="handleFileUpload" />
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
    <v-row v-if="presentationData">
      <v-spacer></v-spacer>
      <v-btn small color="#d74f4f" dark @click="$emit('close')" class="mr-4">
        Cancel
      </v-btn>
      <v-btn small color="#57a727" dark @click="$emit('save', presentation)" class="mr-4">
        Update
      </v-btn>
    </v-row>
    <v-row v-else>
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
  props: ["dataFrom", "section", "presentationData"],
  components: {
    AddUser,
  },
  computed: {
    ...mapState({
      months: (state) => state.months,
    }),
  },
  data: () => ({
    renderKey: 0,
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
      month: 0,
    },
    selectedFile: null,
    image: null,
    contributionType: ["Presentation", "Poster"],
    forum: ["National", "International"],
  }),
  mounted() {
    if (this.presentationData) {
      this.presentation = Object.assign({}, this.presentationData);
      this.image = this.presentation.image ? this.presentation.image : null;
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
    async presentationAdd() {
      if (this.$refs.form.validate()) {
        this.presentation.annual_year = this.$store.state.selectedYear;
        if (this.$store.state.auth.user.userType !== "DEPARTMENT") this.presentation.user = this.$auth.user.id;
        if (this.$store.state.auth.user.userType === "DEPARTMENT") {
          var today = new Date();
          this.presentation.approved_date = this.$moment(today).format();
        }
        this.presentation.department = this.$store.state.auth.user.department;
        var payload = this.presentation;
        // console.log(payload);
        var vm = this;
        await this.$store.dispatch("presentation/addPresentation", payload);
        if (this.$store.state.presentation.presentationsData.success) {
          this.reset();
        }
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
      this.presentation.image = uploadRes.data[0].id;
      this.imgLoader = false;
    },
  },
};
</script>
