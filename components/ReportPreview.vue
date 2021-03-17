<template>
  <div>
    <v-card tile>
      <v-card-text class="px-0 py-0">
        <QuerySelector :reportYears="reportYears" :userTypes="userTypes" @go="loader" @resetFilters="dataLoaded = false" />
        <div class="preview">
          <v-sheet width="100%" v-if="dataLoaded">
            <v-toolbar color="blue-grey darken-3" dark>
              <v-toolbar-title class="white--text">{{ reportTitle }} </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-tooltip left color="blue-grey darken-3">
                <template v-slot:activator="{ on }">
                  <v-btn icon v-on="on">
                    <v-icon @click="exportToDoc(`${formattedFileName}`)">mdi-download</v-icon>
                  </v-btn>
                </template>
                <span>Download Report</span>
              </v-tooltip>
            </v-toolbar>
            <div id="download" elevation="6" class="mx-auto pa-4 doc" width="100%">
              <div style="margin: 0 auto; width: 800px; line-height: 5px; text-align: center;">
                <div style="margin-right: 10px; float: left;">
                  <img style="width: 140px;" src="https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/Nimhans_logo.png/230px-Nimhans_logo.png" alt="logo" />
                </div>
                <div style="line-height: normal; padding-top: 20px;">
                  <p style="text-align: center; font-family: Calibri; line-height: 5px; font-style: normal; font-size: 1rem; font-weight: bold;">
                    National Institute of Mental Health and Neurosciences
                  </p>
                  <p style="text-align: center; font-family: Calibri; line-height: 5px; font-style: normal;">
                    <i>(An institute of national importance)</i>
                  </p>
                  <p style="text-align: center; font-family: Calibri; line-height: 5px; font-style: normal;">
                    Bangalore - 560 029, India.
                  </p>
                  <p style="text-align: center; font-family: Calibri; line-height: 5px; font-style: normal; font-size: 1rem; font-weight: bold;">
                    DEPARTMENT OF
                    {{ $store.state.departmentName.toUpperCase() }}
                  </p>
                  <p style="text-align: center; font-family: Calibri; line-height: 5px; font-style: normal;">
                    {{ reportTitle }}
                  </p>
                </div>
              </div>
              <h6 style="text-align: right; font-family: Calibri; font-style: normal; color: gray;">Generated On: {{ $moment().format("Do MMMM YYYY, h:mm:ss a") }}</h6>

              <h2 style="font-family: Calibri; font-style: normal;">
                <b><u>Section B:</u></b>
              </h2>
              <h4 style="font-family: Calibri; font-style: normal;">
                <b>1. CONFERENCES / WORKSHOPS / SEMINARS /SYMPOSIUM / SCIENTIFIC PROGRAMMES</b>
              </h4>
              <!-- Program -->
              <div v-for="(program, index) in programmes" :key="program.id">
                <ProgramFormat :index="index" :program="program" />
              </div>
              <!-- Visitor -->
              <h4 style="font-family: Calibri; font-style: normal;">
                <b>2. VISITORS TO THE DEPARTMENT</b>
              </h4>
              <div v-for="(visitor, index) in visitors" :key="visitor.id">
                <VisitorFormat :visitor="visitor" :index="index" :deptartmentName="$store.state.departmentName" />
              </div>

              <!-- Training -->
              <h4 style="font-family: Calibri; font-style: normal;">
                <b>3. SPECIFIC TRAINING UNDERWENT BY THE FACULTY /STAFF /STUDENTS OUTSIDE NIMHANS</b>
              </h4>
              <div v-for="(training, index) in trainings" :key="training.id">
                <TrainingFormat :index="index" :training="training" />
              </div>

              <!-- Presentation -->
              <h4 style="font-family: Calibri; font-style: normal;">
                <b>4. CONTRIBUTION TO SCIENTIFIC DELIBERATIONS</b>
              </h4>
              <h4 style="font-family: Calibri; font-style: normal;">
                <b>A. PRESENTATIONS/ POSTERS</b>
              </h4>
              <div v-for="(presentation, index) in presentations" :key="presentation.id">
                <PresentationFormat :index="index" :presentation="presentation" />
              </div>

              <!-- Participation -->
              <h4 style="font-family: Calibri; font-style: normal;">
                <b>B. PARTICIPATION</b>
              </h4>
              <div v-for="(participation, index) in participations" :key="participation.id">
                <ParticipationFormat :index="index" :participation="participation" />
              </div>

              <!-- Public Engagement -->
              <h4 style="font-family: Calibri; font-style: normal;">
                <b>5. PUBLIC ENGAGEMENT &amp; OUTREACH ACTIVITIES</b>
              </h4>
              <div v-for="(publicE, index) in publics" :key="publicE.id">
                <PublicEngagementFormat :index="index" :publicE="publicE" />
              </div>

              <!-- Research Activities -->
              <h4 style="font-family: Calibri; font-style: normal;">
                <b>6. RESEARCH ACTIVITIES</b>
              </h4>
              <div v-for="(research, index) in researchData" :key="research.id">
                <ResearchFormat :index="index" :research="research" />
              </div>

              <!-- Publications -->
              <h4 style="font-family: Calibri; font-style: normal;">
                <b>7. PUBLICATIONS</b>
              </h4>
              <div v-for="(item, index) in publications" :key="item.id">
                <PublicationFormat :index="index" :item="item" />
              </div>

              <!-- Recognition -->
              <h4 style="font-family: Calibri; font-style: normal;">
                <b>8. RECOGNITION OF NIMHANS CONTRIBUTION</b>
              </h4>
              <h4 style="font-family: Calibri; font-style: normal;">
                <b>A. AWARDS AND HONORS</b>
              </h4>
              <div v-for="(recognition, index) in recognitions" :key="recognition.id">
                <RecognitionFormat :index="index" :recognition="recognition" />
              </div>

              <!-- Patents -->
              <h4 style="font-family: Calibri; font-style: normal;">
                <b>B. PATENTS</b>
              </h4>
              <div v-for="(patent, index) in patents" :key="patent.id">
                <PatentFormat :index="index" :patent="patent" />
              </div>

              <!-- Key Assignments -->
              <h4 style="font-family: Calibri; font-style: normal;">
                <b>C. KEY ASSIGNMENTS </b>
              </h4>
              <div v-for="(assignment, index) in assignments" :key="assignment.id">
                <AssignmentFormat :index="index" :assignment="assignment" />
              </div>
            </div>
          </v-sheet>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import { mapState } from "vuex";
export default {
  head() {
    return {
      title: "Annual Report",
    };
  },
  data() {
    return {
      range: {
        start: null,
        end: null,
      },
      previewData: [],
      formattedFileName: "",
      reportTitle: "",
      dataLoaded: false,
      loading: false,
      selectedYear: 0,
      userTypes: [
        {
          text: "Faculty",
          value: "FACULTY",
        },
        {
          text: "Student",
          value: "STUDENT",
        },
      ],
    };
  },
  computed: {
    // departmentName() {
    //   // return this.$store.state.department.departments.filter((dept) => dept.id == this.$store.state.user.department);
    //   console.log("departmentName: " + this.$store.state.department.departments.filter((dept) => dept.id == this.$store.state.user.department));
    // },
    reportYears() {
      return this.$store.state.reportYears;
    },
    people() {
      return this.$store.state.user.activeUsersList.result;
    },
    faculties() {
      return this.people.filter((item) => item.userType === "FACULTY");
    },
    students() {
      return this.people.filter((item) => item.userType === "STUDENT");
    },
    ...mapState({
      aboutData: (state) => state.about.newAbout,
      programmes: (state) => state.program.programmesData.result,
      visitors: (state) => state.visitor.visitorsData.result,
      trainings: (state) => state.training.trainingsData.result,
      presentations: (state) => state.presentation.presentationsData.result,
      participations: (state) => state.participation.participationsData.result,
      publics: (state) => state.public.publicData.result,
      researchData: (state) => state.research.researchData.result,
      publications: (state) => state.publication.publicationsData.result,
      recognitions: (state) => state.recognition.recognitionsData.result,
      patents: (state) => state.patent.patentsData.result,
      assignments: (state) => state.assignment.assignmentsData.result,
      theses: (state) => state.theses.thesesData.result,
      savedReport: (state) => state.report.savedReports,
      availableReports: (state) => state.report.availableReports,
    }),
  },
  mounted() {
    if (this.$store.state.departmentName == "") {
      console.log("hello");
      this.$store.dispatch("setDepartmentName", this.$auth.user.department);
    }
  },
  methods: {
    async loader(selectedQuery, selectedYear, range, selectedUser) {
      console.log(selectedUser);
      if (range && range.start) {
        this.reportTitle = "Report for the period of " + this.$moment(range.start).format("Do MMMM YYYY") + " to " + this.$moment(range.end).format("Do MMMM YYYY") + ", RY (" + selectedYear + " - " + `${selectedYear + 1}` + ")";

        this.formattedFileName =
          this.$store.state.departmentName +
          "_" +
          selectedUser +
          "_Report_for_the_period_of_" +
          this.$moment(range.start).format("Do_MMMM_YYYY") +
          " to " +
          this.$moment(range.end).format("Do_MMMM_YYYY") +
          ",_RY(" +
          selectedYear +
          " - " +
          `${selectedYear + 1}` +
          ")";
      } else {
        this.reportTitle = "Report for the period of RY (" + selectedYear + " - " + `${selectedYear + 1}` + ")";
        this.formattedFileName = this.$store.state.departmentName + "_" + selectedUser + "_Report_for_the_period_of_RY (" + selectedYear + " - " + `${selectedYear + 1}` + ")";
      }

      this.selectedYear = selectedYear;
      this.loading = true;
      if (this.$auth.user.userType === "FACULTY" || this.$auth.user.userType === "STUDENT") selectedQuery += `&user.id=${this.$auth.user.id}`;

      let queryString = "";
      queryString = selectedQuery + `&department.id=${this.$auth.user.department}&deleted_ne=true`;

      await this.$store.dispatch("program/setProgrammesData", {
        qs: queryString,
      });
      await this.$store.dispatch("visitor/setVisitorsData", {
        qs: queryString,
      });
      await this.$store.dispatch("training/setTrainingsData", {
        qs: queryString,
      });
      await this.$store.dispatch("presentation/setPresentationsData", {
        qs: queryString,
      });
      await this.$store.dispatch("participation/setParticipationsData", {
        qs: queryString,
      });
      await this.$store.dispatch("public/setPublicData", { qs: queryString });
      await this.$store.dispatch("research/setResearchData", {
        qs: queryString,
      });
      await this.$store.dispatch("publication/setPublicationsData", {
        qs: queryString,
      });
      await this.$store.dispatch("recognition/setRecognitionsData", {
        qs: queryString,
      });
      await this.$store.dispatch("patent/setPatentsData", { qs: queryString });
      await this.$store.dispatch("assignment/setAssignmentsData", {
        qs: queryString,
      });
      this.loading = false;
      this.dataLoaded = true;
    },

    async changeReportingYear() {
      await this.$store.dispatch("setReportingYear", this.selectedYear);
    },
    async setReportingYear() {
      await this.$store.dispatch("setReportingYear", this.selectedYear);
    },
    save() {
      console.log("Save Clicked!");
    },
    handleNext(step) {
      this.report = step + 1;
    },
    handlePrevious(step) {
      this.report = step - 1;
    },
    exportToDoc(filename = "") {
      var preHtml =
        "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
      var postHtml = "</body></html>";
      var html =
        // preHtml + document.getElementsByClassName('ProseMirror')[0].innerHTML + postHtml;
        preHtml + document.getElementById("download").innerHTML + postHtml;

      var blob = new Blob(["\ufeff", html], {
        type: "application/msword",
      });

      // Specify link url
      var url = "data:application/vnd.ms-word;charset=utf-8," + encodeURIComponent(html);

      // Specify file name
      filename = filename ? filename + ".doc" : "document.doc";

      // Create download link element
      var downloadLink = document.createElement("a");

      document.body.appendChild(downloadLink);

      if (navigator.msSaveOrOpenBlob) {
        navigator.msSaveOrOpenBlob(blob, filename);
      } else {
        // Create a link to the file
        downloadLink.href = url;

        // Setting the file name
        downloadLink.download = filename;

        //triggering the function
        downloadLink.click();
      }

      document.body.removeChild(downloadLink);
    },
  },
};
</script>

<style scoped>
.preview {
  max-width: 100%;
}
</style>
