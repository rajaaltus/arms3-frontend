<template>
  <div>
    <QuerySelectorStepper :reportYears="reportYears" :userTypes="userTypes" @goStepper="loader" @resetFilters="dataLoaded = false" />
    <v-stepper alt-labels v-if="dataLoaded && $auth.user.userType === 'DEPARTMENT'" v-model="report" style="border-radius: 0;">
      <v-stepper-header>
        <v-stepper-step :complete="report > 1" step="1">Programmes / Events</v-stepper-step>
        <v-divider></v-divider>

        <v-stepper-step :complete="report > 2" step="2">Visitors</v-stepper-step>
        <v-divider></v-divider>

        <v-stepper-step :complete="report > 3" step="3">Trainings</v-stepper-step>
        <v-divider></v-divider>

        <v-stepper-step :complete="report > 4" step="4">Presentaions / Posters</v-stepper-step>
        <v-divider></v-divider>

        <v-stepper-step :complete="report > 5" step="5">Participations</v-stepper-step>
        <v-divider></v-divider>

        <v-stepper-step :complete="report > 6" step="6">Public Engagement</v-stepper-step>
        <v-divider></v-divider>

        <v-stepper-step :complete="report > 7" step="7">Research Activities</v-stepper-step>
        <v-divider></v-divider>

        <v-stepper-step :complete="report > 8" step="8">Publications</v-stepper-step>
        <v-divider></v-divider>

        <v-stepper-step :complete="report > 9" step="9">Recogntions</v-stepper-step>
        <v-divider></v-divider>

        <v-stepper-step :complete="report > 10" step="10">Patents</v-stepper-step>
        <v-divider></v-divider>

        <v-stepper-step step="11">Key Assignments</v-stepper-step>
        <v-divider></v-divider>

        <!-- <v-stepper-step step="12">Theses / Dissertions</v-stepper-step>
        <v-divider></v-divider> -->
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1" style="padding: 0px;">
          <Editor :content="formattedProgrammes" :step="1" @next="handleNext(1)" :available="showAvailableReports" :selectedYear="selectedYear" :selectedMonth="selectedMonth" :from="from" :to="to" :selectedUserType="userType" />
        </v-stepper-content>

        <v-stepper-content step="2" style="padding: 0px;">
          <Editor :content="formattedVisitors" :step="2" @next="handleNext(2)" :available="showAvailableReports" :selectedYear="selectedYear" :selectedMonth="selectedMonth" :from="from" :to="to" :selectedUserType="userType" />
        </v-stepper-content>

        <v-stepper-content step="3" style="padding: 0px;">
          <Editor :content="formattedTrainings" :step="3" @next="handleNext(3)" :available="showAvailableReports" :selectedYear="selectedYear" :selectedMonth="selectedMonth" :from="from" :to="to" :selectedUserType="userType" />
        </v-stepper-content>

        <v-stepper-content step="4" style="padding: 0px;">
          <Editor :content="formattedPresentations" :step="4" @next="handleNext(4)" :available="showAvailableReports" :selectedYear="selectedYear" :selectedMonth="selectedMonth" :from="from" :to="to" :selectedUserType="userType" />
        </v-stepper-content>

        <v-stepper-content step="5" style="padding: 0px;">
          <Editor :content="formattedParticipations" :step="5" @next="handleNext(5)" :available="showAvailableReports" :selectedYear="selectedYear" :selectedMonth="selectedMonth" :from="from" :to="to" :selectedUserType="userType" />
        </v-stepper-content>

        <v-stepper-content step="6" style="padding: 0px;">
          <Editor :content="formattedPublics" :step="6" @next="handleNext(6)" :available="showAvailableReports" :selectedYear="selectedYear" :selectedMonth="selectedMonth" :from="from" :to="to" :selectedUserType="userType" />
        </v-stepper-content>

        <v-stepper-content step="7" style="padding: 0px;">
          <Editor :content="formattedResearch" :step="7" @next="handleNext(7)" :available="showAvailableReports" :selectedYear="selectedYear" :selectedMonth="selectedMonth" :from="from" :to="to" :selectedUserType="userType" />
        </v-stepper-content>

        <v-stepper-content step="8" style="padding: 0px;">
          <Editor :content="formattedPublications" :step="8" @next="handleNext(8)" :available="showAvailableReports" :selectedYear="selectedYear" :selectedMonth="selectedMonth" :from="from" :to="to" :selectedUserType="userType" />
        </v-stepper-content>

        <v-stepper-content step="9" style="padding: 0px;">
          <Editor :content="formattedRecognitions" :step="9" @next="handleNext(9)" :available="showAvailableReports" :selectedYear="selectedYear" :selectedMonth="selectedMonth" :from="from" :to="to" :selectedUserType="userType" />
        </v-stepper-content>

        <v-stepper-content step="10" style="padding: 0px;">
          <Editor :content="formattedPatents" :step="10" @next="handleNext(10)" :available="showAvailableReports" :selectedYear="selectedYear" :selectedMonth="selectedMonth" :from="from" :to="to" :selectedUserType="userType" />
        </v-stepper-content>

        <v-stepper-content step="11" style="padding: 0px;">
          <Editor :content="formattedAssignments" :step="11" @next="handleNext(11)" :available="showAvailableReports" :selectedYear="selectedYear" :selectedMonth="selectedMonth" :from="from" :to="to" :selectedUserType="userType" />
        </v-stepper-content>

        <!-- <v-stepper-content step="12" style="padding: 0px;">
          <Editor :content="formattedTheses" :step="12" @next="handleNext(12)" :available="showAvailableReports" :selectedYear="selectedYear" :selectedMonth="selectedMonth" :from="from" :to="to" :selectedUserType="userType"  />
        </v-stepper-content> -->
      </v-stepper-items>
    </v-stepper>
    <AvailableReports :availableReports="availableReports" v-if="sheet" />
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      sheet: false,
      report: 1,
      dataLoaded: false,
      showAvailableReports: false,
      previewData: [],
      selectedYear: 0,
      selectedMonth: 0,
      from: "",
      to: "",
      userType: "",
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
    reportYears() {
      return this.$store.state.reportYears;
    },
    reportStepper: {
      get() {
        return this.$store.state.reportStepper;
      },
      set(report) {
        this.$store.dispatch("updateStepper", report);
      },
    },
    ...mapState({
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
    formattedProgrammes() {
      return this.programmes
        .flatMap((program, index) => [
          `<p style="text-align: justify; font-family: Calibri;">
      ${index + 1}. ${program.coordinators}. ${program.type.toUpperCase()}, ${program.name.toUpperCase()}, ${program.location}, ${this.$moment(program.from_date).format("Do MMMM YYYY")} to ${this.$moment(program.to_date).format(
            "Do MMMM YYYY"
          )}.
      ${program.participants_count} members participated. (${program.forum})

    </p>
        `,
          program.image && program.image.url ? `<img src="${this.$axios.defaults.baseURL}${program.image.url}" alt="${program.name}" width="600" height="350" />` : "",
        ])
        .join("");
    },
    formattedVisitors() {
      return this.visitors
        .flatMap((visitor, index) => [
          `
            <p style="text-align: justify; font-family: Calibri;">
      ${index + 1}. ${visitor.name}, ${visitor.designation}, ${visitor.institutional_affiliation}, visited the Dept. of ${this.$store.state.deptartmentName} and delivered a lecture on '${visitor.title}' from
      ${this.$moment(visitor.from_date).format("Do MMMM YYYY")} to ${this.$moment(visitor.to_date).format("Do MMMM YYYY")}.
    </p>
            `,
          visitor.image && visitor.image.url ? `<img src="${this.$axios.defaults.baseURL}${visitor.image.url}" alt="${visitor.name}" width="600" height="350" />` : "",
        ])
        .join("");
    },
    formattedTrainings() {
      return this.trainings
        .flatMap((training, index) => [
          `
            <p style="text-align: justify; font-family: Calibri;">
      ${index + 1}. ${training.faculty_name}. ${training.program_name}, ${training.institutional_affiliation} from ${this.$moment(training.from_date).format("Do MMMM YYYY")} to
      ${this.$moment(training.to_date).format("Do MMMM YYYY")}.
    </p>
            `,
          training.image && training.image.url ? `<img src="${this.$axios.defaults.baseURL}${training.image.url}" alt="${training.name}" width="600" height="350" />` : "",
        ])
        .join("");
    },
    formattedPresentations() {
      return this.presentations
        .flatMap((presentation, index) => [
          `<p style="text-align: justify; font-family: Calibri;">${index + 1}. ${presentation.faculty_name}, ${presentation.coauthors ? presentation.coauthors + "." : ""} ${presentation.title}. (${presentation.forum})</p>`,
          presentation.image && presentation.image.url ? `<img src="${this.$axios.defaults.baseURL}${presentation.image.url}" alt="${presentation.name}" width="600" height="350" />` : "",
        ])
        .join("");
    },
    formattedParticipations() {
      return this.participations
        .flatMap((participation, index) => [
          `
            <p style="text-align: justify; font-family: Calibri;">
      ${index + 1}. ${participation.faculty_name}, ${participation.designation}. ${participation.program_name} from ${this.$moment(participation.from_date).format("Do MMMM YYYY")} to
      ${this.$moment(participation.to_date).format("Do MMMM YYYY")}. (${participation.forum})
    </p>
            `,
          participation.image && participation.image.url ? `<img src="${this.$axios.defaults.baseURL}${participation.image.url}" alt="${participation.name}" width="600" height="350" />` : "",
        ])
        .join("");
    },
    formattedPublics() {
      return this.publics
        .flatMap((item, index) => [
          `
            <p style="text-align: justify; font-family: Calibri;">
      ${index + 1}. ${item.faculty_name}. ${item.title}, ${item.program_name}, ${item.place}, ${this.$moment(item.date).format("Do MMMM YYYY")}. Target Group: ${item.target_audience}.
    </p>
            `,
          item.image && item.image.url ? `<img src="${this.$axios.defaults.baseURL}${item.image.url}" alt="${item.name}" width="600" height="350" />` : "",
        ])
        .join("");
    },
    formattedResearch() {
      return this.researchData
        .flatMap((research, index) => [
          `
            <p style="text-align: justify; font-family: Calibri;">${index + 1}. ${research.title}. Co-Investigators: ${research.investigator_name}.</p>
    <p style="font-family: Calibri;">(${research.funding_source}, ${research.funding_agency})</p>
    <p style="text-align: justify; font-family: Calibri;">
      ${research.research_abstract}
    </p>
            `,
          research.image && research.image.url ? `<img src="${this.$axios.defaults.baseURL}${research.image.url}" alt="${research.name}" width="600" height="350" />` : "",
        ])
        .join("");
    },
    formattedPublications() {
      return this.publications
        .flatMap((publication, index) => [
          `
            <p style="text-align: justify; font-family: Calibri;">${index + 1}. ${publication.reference}</p>
            `,
          publication.image && publication.image.url ? `<img src="${this.$axios.defaults.baseURL}${publication.image.url}" alt="${publication.name}" width="600" height="350" />` : "",
        ])
        .join("");
    },
    formattedRecognitions() {
      return this.recognitions
        .flatMap((recognition, index) => [
          `
            <p style="text-align: justify; font-family: Calibri;">
      ${index + 1}. ${recognition.faculty_name}, ${recognition.organization}. ${recognition.award_title}, ${recognition.place}, ${this.$moment(recognition.date).format("Do MMMM YYYY")}.
    </p>
            `,
          recognition.image && recognition.image.url ? `<img src="${this.$axios.defaults.baseURL}${recognition.image.url}" alt="${recognition.name}" width="600" height="350" />` : "",
        ])
        .join("");
    },
    formattedPatents() {
      return this.patents
        .flatMap((patent, index) => [
          `
             <p style="text-align: justify; font-family: Calibri;">
      ${index + 1}. ${patent.registration_no}: ${patent.title}<br />
      ${patent.brief_report}
    </p>
            `,
          patent.image && patent.image.url ? `<img src="${this.$axios.defaults.baseURL}${patent.image.url}" alt="${patent.name}" width="600" height="350" />` : "",
        ])
        .join("");
    },
    formattedAssignments() {
      return this.assignments
        .flatMap((assignment, index) => [
          `
            <p style="font-family: Calibri;">${index + 1}. ${assignment.faculty_name}, ${assignment.designation}. ${assignment.roles}</p>
    <p style="text-align: justify; font-family: Calibri; font-style: normal;">
      ${assignment.brief_report}
    </p>
            `,
          assignment.image && assignment.image.url ? `<img src="${this.$axios.defaults.baseURL}${assignment.image.url}" alt="${assignment.name}" width="600" height="350" />` : "",
        ])
        .join("");
    },
  },
  watch: {
    report(val) {
      this.reportStepper = val;
    },
  },
  mounted() {
    this.$store.dispatch("setDepartmentName", this.$store.state.user.department);
  },
  methods: {
    async loader(selectedQuery, altQuery, selectedYear, userType, month, from, to) {
      console.log("selectedQuery: ", selectedQuery);
      this.selectedYear = selectedYear;
      this.userType = userType;
      this.selectedMonth = month;
      this.from = from;
      this.to = to;
      this.sheet = false;
      this.$store.dispatch("report/initializeReportId", 0);

      let findQuery = "";
      findQuery = selectedQuery + `&department.id=${this.$store.state.auth.user.department}`;

      await this.$store.dispatch("report/setAvailableReports", {
        qs: findQuery,
      });
      if (this.availableReports.length > 0) {
        this.sheet = true;
      } else this.sheet = false;

      let queryString = "";
      queryString = altQuery + `&department.id=${this.$auth.user.department}&deleted_ne=true`;

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
    save() {
      console.log("Save Clicked!");
    },
    handleNext(step) {
      this.report = step + 1;
    },
    handlePrevious(step) {
      this.report = step - 1;
    },
  },
};
</script>
<style>
.v-stepper__label {
  font-size: 0.85rem !important;
  text-align: center !important;
}
</style>
