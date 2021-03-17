<template>
  <div>
    <v-row class="px-5">
      <v-col cols="11" lg="3">
        <v-select
          v-model="selectedYear"
          :items="reportYears"
          item-value="id"
          item-text="val"
          label="Reporting Year"
          color="success"
          @input="fetchAllData"
        ></v-select>
      </v-col>

      <v-col cols="11" lg="3">
        <v-autocomplete
          v-model="selectedUser"
          :items="people"
          color="blue-grey lighten-2"
          label="Faculty / Staff / Student"
          item-text="fullname"
          item-value="id"
          @input="fetchAllData"
        >
          <template v-slot:selection="data">
            {{ data.item.fullname }}
          </template>
          <template v-slot:item="data">
            <template v-if="typeof data.item !== 'object'">
              <v-list-item-content v-text="data.item"></v-list-item-content>
            </template>
            <template v-else>
              <v-list-item-avatar>
                <img
                  :src="
                    data.item.avatar !== null
                      ? $axios.defaults.baseURL + data.item.avatar.url
                      : '/avatar-default-icon.png'
                  "
                />
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title
                  v-html="data.item.fullname"
                ></v-list-item-title>
                <v-list-item-subtitle
                  v-html="data.item.userType"
                ></v-list-item-subtitle>
              </v-list-item-content>
            </template>
          </template>
        </v-autocomplete>
      </v-col>

      <v-col cols="1" lg="1">
        <div class="my-4">
          <v-btn color="green darken-2" fab x-small dark>
            <v-icon>mdi-reload</v-icon>
          </v-btn>
        </div>
      </v-col>
    </v-row>

    <client-only>
      <div style="height: 400px;" v-if="loading">
      <v-row
        class="fill-height"
        align-content="center"
        justify="center"
      >
        <v-col
          class="subtitle-1 text-center"
          cols="12"
        >
          Generating the Report. Please Wait...
        </v-col>
        <v-col cols="6">
          <v-progress-linear
            color="green"
            indeterminate
            rounded
            height="6"
          ></v-progress-linear>
        </v-col>
      </v-row>
    </div>
      <ckeditor
        v-else
        v-model="report"
        :editor="editor"
        :config="editorConfig"
      ></ckeditor>
    </client-only>
  </div>
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
      title: "Testing Reporting"
    };
  },
  data: () => ({
    loading: false,
    editorConfig: {
      height: "200px"
    },
    report: null,
    selectedUser: null,
    selectedYear: 0,
  }),
  computed: {
    reportYears() {
      return this.$store.state.reportYears   
    },
    people() {
      return this.$store.state.user.activeUsersList.result;
    },
    editor() {
      return process.client
        ? require("@ckeditor/ckeditor5-build-classic")
        : null;
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
    })
  },
  async fetch({ store }) {
    let queryString = "";
    queryString = `department.id=${store.state.auth.user.department}&user.id=${store.state.auth.user.id}&annual_year=${store.state.selectedYear}&deleted_ne=true&_sort=created_at:DESC`;
    await store.dispatch("program/setProgrammesData", { qs: queryString });
    await store.dispatch("visitor/setVisitorsData", { qs: queryString });
    await store.dispatch("training/setTrainingsData", { qs: queryString });
    await store.dispatch("presentation/setPresentationsData", { qs: queryString });
    await store.dispatch("participation/setParticipationsData", { qs: queryString });
    await store.dispatch("public/setPublicData", { qs: queryString });
    await store.dispatch("publication/setPublicationsData", { qs: queryString });
    await store.dispatch("research/setResearchData", { qs: queryString });
    await store.dispatch("recognition/setRecognitionsData", { qs: queryString });
    await store.dispatch("patent/setPatentsData", { qs: queryString });
    await store.dispatch("assignment/setAssignmentsData", { qs: queryString });
    await store.dispatch("theses/setThesesData", { qs: queryString });

    let queryString1 = "";
    queryString1 = `department.id=${store.state.auth.user.department}&blocked_ne=true`;
    await store.dispatch("user/setActiveUsersList", { qs: queryString1 });
  },
  mounted() {
    if (this.selectedYear == 0)
      this.selectedYear = this.$store.state.selectedYear;
    if (this.selectedUser === null) this.selectedUser = this.$auth.user.id;
    this.fetchAllData();
  },
  methods: {
    setReport() {
      this.report = null;
      //Program Formatting
      var programHeader = [
      `<div class="test">
       <h1>Programmes / Events</h1>
      <h4>Depertment of Science</h4>
      </div>
      `];
      var programmes = this.programmes.map(
        program =>
          `
            <h2>${program.name.toUpperCase()}<h2>
            <h3><span>Duration: </span>${program.from_date} - ${
            program.to_date
          }</h3>
            <p>${program.brief_report}</p><hr>
            `
      );
      //Visitor Formatting
      var visitors = this.visitors.map(
        visitor =>
          `
            <h2>${visitor.name.toUpperCase()}<h2>
            <h4><span>Duration: </span>${visitor.from_date} - ${
            visitor.to_date
          }</h4>
            <p>${visitor.brief_report}</p><hr>
            `
      );
      //Training Formatting
      var trainings = this.trainings.map(
        training =>
          `
            <h2>${training.program_name.toUpperCase()}<h2>
            <h4><span>Duration: </span>${training.from_date} - ${
            training.to_date
          }</h4>
            <p>${training.brief_report}</p><hr>
            `
      );
      //Presentation Formatting
      var presentations = this.presentations.map(
        presentation =>
          `
            <h2>${presentation.title.toUpperCase()}<h2>
            <h4><span>Type: </span>${presentation.forum}</h4>
            <p>${presentation.reference}</p><hr>
            `
      );
      //Participation Formatting
      var participations = this.participations.map(
        participation =>
          `
            <h2>${participation.program_name.toUpperCase()}<h2>
            <h4><span>Type: </span>${participation.forum}</h4>
            <p>${participation.place}</p><hr>
            `
      );
      //Public Engagement Formatting
      var publics = this.publics.map(
        pub =>
          `
            <h2>${pub.program_name.toUpperCase()}<h2>
            <h4><span>Type: </span>${pub.type}</h4>
            <p>${pub.place}</p><hr>
            `
      );
      //Public Engagement Formatting
      var researchData = this.researchData.map(
        research =>
          `
            <h2>${research.title.toUpperCase()}<h2>
            <h4><span>Status: </span>${research.research_status}</h4>
            <p>${research.research_abstract}</p><hr>
            `
      );
       //Publication Formatting
      var publications = this.publications.map(
        publication =>
          `
            <h2>${publication.publication_type.toUpperCase()}<h2>
            <h4><span>Classification: </span>${publication.classification}</h4>
            <p>${publication.authors}</p><hr>
            `
      );
      //Recognition Formatting
      var recognitions = this.recognitions.map(
        recognition =>
          `
            <h2>${recognition.award_title.toUpperCase()}<h2>
            <h4><span>Date: </span>${recognition.date}</h4>
            <p>${recognition.place}</p><hr>
            `
      );
      //Patents Formatting
      var patents = this.patents.map(
        patent =>
          `
            <h2>${patent.title.toUpperCase()}<h2>
            <h4><span>Reg.No: </span>${patent.registration_no}</h4>
            <p>${patent.patent_status}</p><hr>
            `
      );
      //Key Assignment Formatting
      var assignments = this.assignments.map(
        assignment =>
          `
            <h2>${assignment.roles.toUpperCase()}<h2>
            <h4><span>Faculty Name: </span>${assignment.faculty_name}</h4>
            <p>${assignment.designation}</p><hr>
            `
      );
      //Theses Formatting
      var theses = this.theses.map(
        thesis =>
          `
            <h2>${thesis.thesis_title.toUpperCase()}<h2>
            <h4><span>Student Name: </span>${thesis.student_name}</h4>
            <p>${thesis.guide}</p><hr>
            `
      );
      
      this.report = [...programHeader,...programmes, ...visitors, ...trainings, ...presentations, ...participations, ...publics, ...researchData, ...publications, ...recognitions, ...patents, assignments, ...theses].join(" ");
      this.loading = false;
    },
    async fetchAllData() {
      this.loading = true;
      let queryString = "";
      queryString = `department.id=${this.$store.state.auth.user.department}&user.id=${this.selectedUser}&annual_year=${this.selectedYear}&deleted_ne=true&_sort=created_at:DESC`;
      await this.$store.dispatch("program/setProgrammesData", {
        qs: queryString
      });
      await this.$store.dispatch("visitor/setVisitorsData", {
        qs: queryString
      });
      await this.$store.dispatch("training/setTrainingsData", {
        qs: queryString
      });
      await this.$store.dispatch("presentation/setPresentationsData", {
          qs: queryString
        });
        this.$store.dispatch("participation/setParticipationsData", {
          qs: queryString
        });
        this.$store.dispatch("public/setPublicData", { qs: queryString });
        this.$store.dispatch("publication/setPublicationsData", {
          qs: queryString
        });
        this.$store.dispatch("research/setResearchData", { qs: queryString });
        this.$store.dispatch("recognition/setRecognitionsData", {
          qs: queryString
        });
        this.$store.dispatch("patent/setPatentsData", { qs: queryString });
        this.$store.dispatch("assignment/setAssignmentsData", {
          qs: queryString
        });
        this.$store.dispatch("theses/setThesesData", { qs: queryString });
      
      await this.setReport()
      
      //   return this.$store.state.program.programmesData.result;
      //   return this.$store.state.visitor.visitorsData.result;
      //   return this.$store.state.training.trainingsData.result;
      //   return this.$store.state.presentation.presentationsData.result;
      //   return this.$store.state.participation.participationsData.result;
      //   return this.$store.state.public.publicData.result;
      //   return this.$store.state.research.researchData.result;
      //   return this.$store.state.publication.publicationsData.result;
      //   return this.$store.state.recognition.recognitionsData.result;
      //   return this.$store.state.patent.patentsData.result;
      //   return this.$store.state.assignment.assignmentsData.result;
      //   return this.$store.state.theses.thesesData.result;
    }
  }
};
</script>

<style scoped>
.document-editor {
  border: 1px solid var(--ck-color-base-border);
  border-radius: var(--ck-border-radius);

  /* Set vertical boundaries for the document editor. */
  max-height: 700px;

  /* This element is a flex container for easier rendering. */
  display: flex;
  flex-flow: column nowrap;
}
.document-editor__toolbar {
  /* Make sure the toolbar container is always above the editable. */
  z-index: 1;

  /* Create the illusion of the toolbar floating over the editable. */
  box-shadow: 0 0 5px hsla(0, 0%, 0%, 0.2);

  /* Use the CKEditor CSS variables to keep the UI consistent. */
  border-bottom: 1px solid var(--ck-color-toolbar-border);
}

/* Adjust the look of the toolbar inside the container. */
.document-editor__toolbar .ck-toolbar {
  border: 0;
  border-radius: 0;
}
.document-editor__editable-container {
  padding: calc(2 * var(--ck-spacing-large));
  background: var(--ck-color-base-foreground);

  /* Make it possible to scroll the "page" of the edited content. */
  overflow-y: scroll;
}

.document-editor__editable-container .ck-editor__editable {
  /* Set the dimensions of the "page". */
  width: 15.8cm;
  min-height: 21cm;

  /* Keep the "page" off the boundaries of the container. */
  padding: 1cm 2cm 2cm;

  border: 1px hsl(0, 0%, 82.7%) solid;
  border-radius: var(--ck-border-radius);
  background: white;

  /* The "page" should cast a slight shadow (3D illusion). */
  box-shadow: 0 0 5px hsla(0, 0%, 0%, 0.1);

  /* Center the "page". */
  margin: 0 auto;
}
.document-editor .ck-content,
.document-editor .ck-heading-dropdown .ck-list .ck-button__label {
  font: 16px/1.6 "Helvetica Neue", Helvetica, Arial, sans-serif;
}
.document-editor .ck-heading-dropdown .ck-list .ck-button__label {
  line-height: calc(
    1.7 * var(--ck-line-height-base) * var(--ck-font-size-base)
  );
  min-width: 6em;
}

/* Scale down all heading previews because they are way too big to be presented in the UI.
Preserve the relative scale, though. */
.document-editor
  .ck-heading-dropdown
  .ck-list
  .ck-button:not(.ck-heading_paragraph)
  .ck-button__label {
  transform: scale(0.8);
  transform-origin: left;
}

/* Set the styles for "Heading 1". */
.document-editor .ck-content h2,
.document-editor .ck-heading-dropdown .ck-heading_heading1 .ck-button__label {
  font-size: 2.18em;
  font-weight: normal;
}

.document-editor .ck-content h2 {
  line-height: 1.37em;
  padding-top: 0.342em;
  margin-bottom: 0.142em;
}

/* Set the styles for "Heading 2". */
.document-editor .ck-content h3,
.document-editor .ck-heading-dropdown .ck-heading_heading2 .ck-button__label {
  font-size: 1.75em;
  font-weight: normal;
  color: hsl(203, 100%, 50%);
}

.document-editor
  .ck-heading-dropdown
  .ck-heading_heading2.ck-on
  .ck-button__label {
  color: var(--ck-color-list-button-on-text);
}

/* Set the styles for "Heading 2". */
.document-editor .ck-content h3 {
  line-height: 1.86em;
  padding-top: 0.171em;
  margin-bottom: 0.357em;
}

/* Set the styles for "Heading 3". */
.document-editor .ck-content h4,
.document-editor .ck-heading-dropdown .ck-heading_heading3 .ck-button__label {
  font-size: 1.31em;
  font-weight: bold;
}

.document-editor .ck-content h4 {
  line-height: 1.24em;
  padding-top: 0.286em;
  margin-bottom: 0.952em;
}

/* Set the styles for "Paragraph". */
.document-editor .ck-content p {
  font-size: 1em;
  line-height: 1.63em;
  padding-top: 0.5em;
  margin-bottom: 1.13em;
}
.document-editor .ck-content blockquote {
  font-family: Georgia, serif;
  margin-left: calc(2 * var(--ck-spacing-large));
  margin-right: calc(2 * var(--ck-spacing-large));
}
</style>
