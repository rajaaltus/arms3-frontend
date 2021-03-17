<template>
  <div>
    <v-row>
      <v-col cols="12" md="12">
        <v-form ref="form" v-model="valid" lazy-validation @submit.prevent>
          <v-row no-gutters v-if="$auth.user.userType === 'DEPARTMENT'">
            <v-col cols="11" lg="11">
              <v-select
                v-model="program.user"
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
              <v-select
                v-model="program.type"
                :rules="[(v) => !!v || 'Item is required']"
                :items="programTypes"
                label="Program Type "
                color="success"
              ></v-select>
            </v-col>
            <v-col cols="4">
              <v-select
                v-model="program.forum"
                :rules="[(v) => !!v || 'Item is required']"
                :items="programLevels"
                label="Forum "
                color="success"
              ></v-select>
            </v-col>
            <v-col cols="4">
              <v-select
                v-model="program.colloborations"
                :rules="[(v) => !!v || 'Item is required']"
                :items="colloborations"
                label="Colloborations "
                color="success"
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="8">
              <v-combobox
                v-model="program.name"
                :rules="[(v) => !!v || 'Item is required']"
                :items="programNames"
                item-text="name"
                item-value="name"
                label="Program Name "
                color="success"
              >
              </v-combobox>
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model="program.participants_count"
                :rules="[(v) => !!v || 'Item is required']"
                type="number"
                label="Participants Count "
                color="success"
              >
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="4">
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
                    v-model="program.from_date"
                    :return-value.sync="duration_from"
                    :rules="[(v) => !!v || 'Item is required']"
                    readonly
                    color="success"
                    label="From Date "
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="program.from_date"
                  color="green lighten-1"
                  no-title
                  scrollable
                >
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="duration_from = false">
                    Cancel
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.menu.save(duration_from)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="4">
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
                    v-model="program.to_date"
                    :rules="[(v) => !!v || 'Item is required']"
                    :return-value.sync="duration_to"
                    readonly
                    color="success"
                    label="To Date "
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="program.to_date" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="duration_to = false">
                    Cancel
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.menu1.save(duration_to)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="4">
              <v-select
                v-model="program.location"
                :rules="[(v) => !!v || 'Item is required']"
                :items="locations"
                label="Location "
                color="success"
              ></v-select>
            </v-col>
            <v-col v-if="program.location === 'OUTSIDE_NIMHANS'" cols="12">
              <v-text-field
                v-model="program.outsidelocation"
                :rules="[(v) => !!v || 'Item is required']"
                label="Specify the place where the program happened"
                color="success"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="program.coordinators"
                label="Co-ordinators"
                :rules="[(v) => !!v || 'Item is required']"
                color="success"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="12" sm="12">
              <v-textarea
                v-model="program.brief_report"
                counter
                color="success"
                label="Brief Report "
              ></v-textarea>
            </v-col>

            <v-col cols="12" lg="4" md="12">
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
                style="display: none"
                label="File input"
                @change="handleFileUpload"
              />
            </v-col>
          </v-row>
        </v-form>
        <!-- <pre>{{ program | json }} {{ user }}</pre> -->
      </v-col>
    </v-row>
    <v-row>
      <v-spacer></v-spacer>
      <v-btn small color="#d74f4f" dark @click="reset" class="mr-4">
        Reset
      </v-btn>
      <v-btn small color="#57a727" dark @click="programAdd" class="mr-4">
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
  props: ["programNames", "dataFrom"],
  components: {
    AddUser,
  },
  data() {
    return {
      imgLoader: false,
      duration_from: false,
      duration_to: false,
      editFrom: false,
      editTo: false,
      valid: false,
      program: {
        annual_year: 0,
        type: "",
        name: "",
        location: "",
        forum: "",
        colloborations: "",
        from_date: "",
        to_date: "",
        participants_count: null,
        coordinators: "",
        brief_report: "",
        deleted: false,
        approval_status: "Approved",
        approved_by: "",
        approved_date: null,
        rejected_reason: null,
        image: null,
        department: 0,
        user: 0,
      },
      selectedFile: null,
      image_url: null,
      programTypes: [
        "Conference",
        "Workshop",
        "Seminar",
        "Symposium",
        "Scientific",
      ],
      programLevels: [
        "International",
        "National",
        "Regional",
        "State",
        "Local",
      ],
      locations: ["NIMHANS", "OUTSIDE_NIMHANS"],
      colloborations: ["Departmental", "Interdepartmental"],
      approvals: ["Pending", "Rejected", "Approved"],
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
    programAdd() {
      if (this.$refs.form.validate()) {
        this.program.annual_year = this.$store.state.selectedYear;
        this.program.department = this.$store.state.auth.user.department;
        if (this.$store.state.auth.user.userType !== "DEPARTMENT")
          this.program.user = this.$auth.user.id;
        if (typeof this.program.name === "object")
          this.program.name = this.program.name.name;
        var payload = this.program;
        // console.log(payload);
        let res = this.$store.dispatch("program/addProgram", payload);
        res.then((data) => {
          if (data) this.reset();
        });
      }
    },
    async reloadData() {
      this.loading = true;
      let deptId = this.$store.state.auth.user.department;
      let userId = this.$store.state.auth.user.id;
      let queryString = "";

      if (
        this.$store.state.auth.user.userType === "Faculty" ||
        this.$store.state.auth.user.userType === "Student"
      ) {
        queryString = `department.id=${deptId}&user.id=${userId}&deleted_ne=true&annual_year=${this.$store.state.selectedYear}`;
        await this.$store.dispatch("program/setProgrammesData", {
          qs: queryString,
        });
      } else {
        queryString = `department.id=${deptId}&annual_year=${this.$store.state.selectedYear}&deleted_ne=true`;
        await this.$store.dispatch("program/setProgrammesData", {
          qs: queryString,
        });
      }
      this.loading = false;
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
      this.program.image = uploadRes.data[0].id;
      this.imgLoader = false;
    },
  },
};
</script>

<style scoped>
.frm-title {
  border-left: 5px solid #e16949;
  padding: 3px 10px;
}
</style>
