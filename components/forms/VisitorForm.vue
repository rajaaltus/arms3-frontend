<template>
  <div>
    <v-row>
      <v-col cols="12" md="12">
        <v-form ref="form" v-model="valid" lazy-validation @submit.prevent>
          <v-row no-gutters v-if="$auth.user.userType === 'DEPARTMENT'">
            <v-col cols="11" lg="11">
              <v-select
                v-model="visitor.user"
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
            <v-col cols="4">
              <v-text-field
                v-model="visitor.name"
                label="Name of the Visitor"
                :rules="[(v) => !!v || 'Item is required']"
                required
                color="success"
              >
              </v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model="visitor.designation"
                label="Designation"
                :rules="[(v) => !!v || 'Item is required']"
                required
                color="success"
              >
              </v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model="visitor.institutional_affiliation"
                label="Institute Affiliation"
                :rules="[(v) => !!v || 'Item is required']"
                required
                color="success"
              >
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="visitor.title"
                label="Title of the Lecture"
                :rules="[(v) => !!v || 'Item is required']"
                required
                color="success"
              >
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-menu
                ref="menu"
                v-model="duration_from"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="visitor.from_date"
                    :return-value.sync="duration_from"
                    :rules="[(v) => !!v || 'Item is required']"
                    readonly
                    color="success"
                    label="From"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="visitor.from_date"
                  color="green lighten-1"
                  no-title
                  scrollable
                >
                  <v-spacer></v-spacer>
                  <v-btn text color="success" @click="duration_from = false">
                    Cancel
                  </v-btn>
                  <v-btn
                    text
                    color="success"
                    @click="$refs.menu.save(duration_from)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="6">
              <v-menu
                ref="menu1"
                v-model="duration_to"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="visitor.to_date"
                    :rules="[(v) => !!v || 'Item is required']"
                    :return-value.sync="duration_to"
                    readonly
                    color="success"
                    label="To"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="visitor.to_date" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="success" @click="duration_to = false">
                    Cancel
                  </v-btn>
                  <v-btn
                    text
                    color="success"
                    @click="$refs.menu1.save(duration_to)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
          <v-row>
            <v-container fluid>
              <v-textarea
                v-model="visitor.brief_report"
                counter
                :rules="[(v) => !!v || 'Item is required']"
                label="Brief Report"
                color="success"
              ></v-textarea>
            </v-container>
          </v-row>
          <v-row>
            <v-col cols="12" lg="4">
              <h3><span class="frm-title">Upload Images (If any)</span></h3>
              <!-- <input type="file" style="display:none;" label="File input" ref="image"  @change="handleFileUpload"> -->
              <v-hover>
                <template v-slot:default="{ hover }">
                  <v-img
                    :src="
                      image_url
                        ? `${$axios.defaults.baseURL}${image_url}`
                        : '/image_placeholder.png'
                    "
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
          <v-row>
            <v-spacer></v-spacer>
            <v-btn small color="#d74f4f" dark @click="reset" class="mr-4">
              Reset
            </v-btn>
            <v-btn small color="#57a727" dark @click="visitorAdd" class="mr-4">
              Submit
            </v-btn>
          </v-row>
        </v-form>
      </v-col>
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
  data() {
    return {
      imgLoader: false,
      duration_from: false,
      duration_to: false,
      valid: true,
      visitor: {
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
      approvals: ["Pending", "Rejected", "Approved"],
      selectedFile: null,
      image_url: null,
    };
  },
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
      this.image_url = uploadRes.data[0].url;
      this.visitor.image = uploadRes.data[0].id;
      this.imgLoader = false;
    },
    async visitorAdd() {
      if (this.$refs.form.validate()) {
        this.visitor.annual_year = this.$store.state.selectedYear;
        if (this.$store.state.auth.user.userType !== "DEPARTMENT")
          this.visitor.user = this.$auth.user.id;
        if (this.$store.state.auth.user.userType === "DEPARTMENT") {
          var today = new Date();
          this.visitor.approved_date = this.$moment(today).format();
        }
        this.visitor.department = this.$store.state.auth.user.department;
        var payload = this.visitor;
        // console.log(payload);
        let res = this.$store.dispatch("visitor/addVisitor", payload)
          res.then((data) => {
            if (data)
              this.reset();
          })
          
      }
    },
  },
};
</script>
