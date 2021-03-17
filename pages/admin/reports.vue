<template>
  <div>
    <PageHeader
      :title="$metaInfo.title"
      :reportYears="reportYears"
      @set-year="setReportingYear"
      class="ml-0 pb-0 pt-0"
    />
    <v-stepper v-model="report">
      <v-stepper-header>
        <v-stepper-step :complete="report > 1" step="1" editable id="top1"
          >Programme activities</v-stepper-step
        >

        <v-divider></v-divider>

        <v-stepper-step :complete="report > 2" step="2" editable id="top2"
          >Presentations</v-stepper-step
        >

        <v-divider></v-divider>

        <v-stepper-step :complete="report > 3" step="3" editable id="top3"
          >Public Engagements</v-stepper-step
        >

        <v-divider></v-divider>

        <v-stepper-step :complete="report > 4" step="4" editable id="top4"
          >Research Activities</v-stepper-step
        >

        <v-divider></v-divider>

        <v-stepper-step :complete="report > 5" step="5" editable id="top5"
          >Publications</v-stepper-step
        >

        <v-divider></v-divider>

        <v-stepper-step step="6" editable id="top6">Recogntions</v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-btn
          relative
          dark
          fab
          top
          left
          color="pink"
          class="ma-4"
          v-scroll-to="'#submit'"
        >
          <v-icon>mdi-chevron-down</v-icon>
        </v-btn>
        <v-stepper-content step="1">
          <pre> {{ programmes[0] }} </pre>
          <Editor :content="step1Data" />

          <v-row>
            <v-btn
              relative
              dark
              fab
              top
              left
              color="pink"
              class="ma-4"
              v-scroll-to="'#top1'"
            >
              <v-icon>mdi-chevron-up</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn id="submit" color="primary" @click="report = 2">
              Continue
            </v-btn>

            <v-btn text>Cancel</v-btn>
          </v-row>
        </v-stepper-content>

        <v-stepper-content step="2">
          <Editor :content="step2Data" />
          <v-row>
            <v-spacer></v-spacer>
            <v-btn
              id="submit"
              color="primary"
              small
              class="mr-2"
              @click="report = 3"
            >
              Continue
            </v-btn>
            <v-btn color="error" small class="mr-8" @click="report = 1">
              Back
            </v-btn>
          </v-row>
        </v-stepper-content>

        <v-stepper-content step="3">
          <Editor :content="step3Data" />

          <v-row>
            <v-spacer></v-spacer>
            <v-btn
              id="submit"
              color="primary"
              small
              class="mr-2"
              @click="report = 4"
            >
              Continue
            </v-btn>
            <v-btn color="error" small class="mr-8" @click="report = 2">
              Back
            </v-btn>
          </v-row>
        </v-stepper-content>

        <v-stepper-content step="4">
          <Editor :content="step4Data" />

          <v-row>
            <v-spacer></v-spacer>
            <v-btn
              id="submit"
              color="primary"
              small
              class="mr-2"
              @click="report = 5"
            >
              Continue
            </v-btn>
            <v-btn color="error" small class="mr-8" @click="report = 3">
              Back
            </v-btn>
          </v-row>
        </v-stepper-content>

        <v-stepper-content step="5">
          <Editor :content="step5Data" />

          <v-row>
            <v-spacer></v-spacer>
            <v-btn
              id="submit"
              color="primary"
              small
              class="mr-2"
              @click="report = 6"
            >
              Continue
            </v-btn>
            <v-btn color="error" small class="mr-8" @click="report = 4">
              Back
            </v-btn>
          </v-row>
        </v-stepper-content>

        <v-stepper-content step="6">
          <Editor :content="step6Data" />

          <v-row>
            <v-spacer></v-spacer>
            <v-btn color="primary" small class="mr-2" @click="save">
              Save
            </v-btn>
            <v-btn color="error" small class="mr-8" @click="report = 5">
              Back
            </v-btn>
          </v-row>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  head() {
    return {
      title: "Annual Report"
    };
  },
  
  computed: {
    reportYears() {
      return this.$store.state.reportYears;
    },
    ...mapState({
      programmes: state => state.program.programmesData.result,
      visitors: state => state.visitor.visitorsData.result,
      trainings: state => state.training.trainingsData.result,
      presentations: state => state.presentation.presentationsData.result,
      participations: state => state.participation.participationsData.result,
      publics: state => state.public.publicData.result,
      researchData: state => state.research.researchData.result,
      publications: state => state.publication.publicationsData.result,
      recognitions: state => state.recognition.recognitionsData.result,
      patents: state => state.patent.patentsData.result,
      assignments: state => state.assignment.assignmentsData.result,
      theses: state => state.theses.thesesData.result
    }),

    formattedProgrammes() {
      return this.programmes
        .map(
          (program, index) =>
            `
            <h4><b>${index + 1}. ${program.name}</b><h4>
            <h4><span>Duration: </span>${program.from_date} - ${
              program.to_date
            }</h4>
            <p>${program.brief_report}</p>
            `
        )
        .join("");
    },
    formattedVisitors() {
      return this.visitors
        .map(
          (visitor, index) =>
            `
            <h2>${index + 1}. ${visitor.name.toUpperCase()}<h2>
            <h4><span>Duration: </span>${visitor.from_date} - ${
              visitor.to_date
            }</h4>
            <p>${visitor.brief_report}</p><hr>
            `
        )
        .join("");
    },
    formattedTrainings() {
      return this.trainings
        .map(
          (training, index) =>
            `
            <h2>${index + 1}. ${training.program_name.toUpperCase()}<h2>
            <h4><span>Duration: </span>${training.from_date} - ${
              training.to_date
            }</h4>
            <p>${training.brief_report}</p><hr>
            `
        )
        .join("");
    },
    formattedPresentations() {
      return this.presentations
        .map(
          (presentation, index) =>
            `
            <h2>${index + 1}. ${presentation.type.toUpperCase()}<h2>
            <h4><span>Forum: </span>${presentation.forum}</h4>
            <p>${presentation.reference}</p><hr>
            `
        )
        .join("");
    },
    formattedParticipations() {
      return this.participations
        .map(
          (participation, index) =>
            `
            <h2>${index + 1}. ${participation.program_name.toUpperCase()}<h2>
            <h4><span>Forum: </span>${participation.forum}</h4>
            <p>${participation.place}</p><hr>
            `
        )
        .join("");
    },
    formattedPublics() {
      return this.publics
        .map(
          (item, index) =>
            `
            <h2>${index + 1}. ${item.title.toUpperCase()}<h2>
            <h4><span>Program Name: </span>${item.program_name}</h4>
            <p>Date: ${item.date}</p><hr>
            `
        )
        .join("");
    },
    formattedResearch() {
      return this.researchData
        .map(
          (research, index) =>
            `
            <h2>${index + 1}. ${research.title.toUpperCase()}<h2>
            <h4><span>Funding Agency: </span>${research.funding_agency}</h4>
            <p>Date: ${research.research_abstract}</p><hr>
            `
        )
        .join("");
    },
    formattedPublications() {
      return this.publications
        .map(
          (publication, index) =>
            `
            <h2>${index + 1}. ${publication.publication_type.toUpperCase()}<h2>
            <h4><span>Classification: </span>${publication.classification}</h4>
            <p>Date: ${publication.reference}</p><hr>
            `
        )
        .join("");
    },
    formattedRecognitions() {
      return this.recognitions
        .map(
          (recognition, index) =>
            `
            <h2>${index + 1}. ${recognition.award_title.toUpperCase()}<h2>
            <h4><span>Organization: </span>${recognition.organization}</h4>
            <p>Date: ${recognition.date}</p><hr>
            `
        )
        .join("");
    },
    formattedPatents() {
      return this.patents
        .map(
          (patent, index) =>
            `
            <h2>${index + 1}. ${patent.title.toUpperCase()}<h2>
            <h4><span>Reg.NO: </span>${patent.registration_no}</h4>
            <p>Report: ${patent.brief_report}</p><hr>
            `
        )
        .join("");
    },
    formattedAssignments() {
      return this.assignments
        .map(
          (assignment, index) =>
            `
            <h2>${index + 1}. ${assignment.roles.toUpperCase()}<h2>
            <h4><span>Classification: </span>${assignment.classification}</h4>
            <p>Report: ${assignment.brief_report}</p><hr>
            `
        )
        .join("");
    },
    step1Data() {
      return (
        `<h1>Programmes / Events</h1>` +
        this.formattedProgrammes +
        `<h1>Visitors</h1>` +
        this.formattedVisitors +
        `<h1>Trainings</h1>` +
        this.formattedTrainings
      );
    },
    step2Data() {
      return (
        `<h1>Presentation / Posters</h1>` +
        this.formattedPresentations +
        `<h1>Participations</h1>` +
        this.formattedParticipations
      );
    },
    step3Data() {
      return `<h1>Public Engagements</h1>` + this.formattedPublics;
    },
    step4Data() {
      return `<h1>Research Activities</h1>` + this.formattedResearch;
    },
    step5Data() {
      return `<h1>Publications</h1>` + this.formattedPublications;
    },
    step6Data() {
      return (
        `<h1>Recognitions</h1>` +
        this.formattedRecognitions +
        `<h1>Patents</h1>` +
        this.formattedPatents +
        `<h1>Key Assignments</h1>` +
        this.formattedAssignments
      );
    }
  },
  data() {
    return {
      report: 1,
      step1: "",
      step2: "",
      step3: "",
      step4: "",
      step5: "",
      step6: ""
    };
  },

  async fetch({ store }) {
    let queryString = "";
    queryString = `department.id=${store.state.auth.user.department}&annual_year=${store.state.selectedYear}&deleted_ne=true`;
    await store.dispatch("program/setProgrammesData", { qs: queryString });
    await store.dispatch("visitor/setVisitorsData", { qs: queryString });
    await store.dispatch("training/setTrainingsData", { qs: queryString });
    await store.dispatch("presentation/setPresentationsData", {
      qs: queryString
    });
    await store.dispatch("participation/setParticipationsData", {
      qs: queryString
    });
    await store.dispatch("public/setPublicData", { qs: queryString });
    await store.dispatch("research/setResearchData", { qs: queryString });
    await store.dispatch("publication/setPublicationsData", {
      qs: queryString
    });
    await store.dispatch("recognition/setRecognitionsData", {
      qs: queryString
    });
    await store.dispatch("patent/setPatentsData", { qs: queryString });
    await store.dispatch("assignment/setAssignmentsData", { qs: queryString });
  },
  methods: {
    async changeReportingYear() {
      await this.$store.dispatch("setReportingYear", this.selectedYear);
    },
    async setReportingYear() {
      await this.$store.dispatch("setReportingYear", this.selectedYear);
    }
  }
};
</script>
