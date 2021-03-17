<template>
  <div>
    <div class="preview">
      <v-sheet width="100%">
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
              <p style="text-align: center; font-family: Calibri; line-height: 5px; font-style: normal; font-size: 1rem; font-weight: bold;">DEPARTMENT OF {{ $store.state.departmentName.toUpperCase() }}</p>
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
          <div>
            <v-sheet v-html="savedData.program"></v-sheet>
          </div>
          <!-- Visitor -->
          <h4 style="font-family: Calibri; font-style: normal;">
            <b>2. VISITORS TO THE DEPARTMENT</b>
          </h4>
          <div>
            <v-sheet v-html="savedData.visitor"></v-sheet>
          </div>

          <!-- Training -->
          <h4 style="font-family: Calibri; font-style: normal;">
            <b>3. SPECIFIC TRAINING UNDERWENT BY THE FACULTY /STAFF /STUDENTS OUTSIDE NIMHANS</b>
          </h4>
          <div>
            <v-sheet v-html="savedData.training"></v-sheet>
          </div>

          <!-- Presentation -->
          <h4 style="font-family: Calibri; font-style: normal;">
            <b>4. CONTRIBUTION TO SCIENTIFIC DELIBERATIONS</b>
          </h4>
          <h4 style="font-family: Calibri; font-style: normal;">
            <b>A. PRESENTATIONS/ POSTERS</b>
          </h4>
          <div>
            <v-sheet v-html="savedData.presentation"></v-sheet>
          </div>

          <!-- Participation -->
          <h4 style="font-family: Calibri; font-style: normal;">
            <b>B. PARTICIPATION</b>
          </h4>
          <div>
            <v-sheet v-html="savedData.participation"></v-sheet>
          </div>

          <!-- Public Engagement -->
          <h4 style="font-family: Calibri; font-style: normal;">
            <b>5. PUBLIC ENGAGEMENT &amp; OUTREACH ACTIVITIES</b>
          </h4>
          <div>
            <v-sheet v-html="savedData.publicEngagement"></v-sheet>
          </div>

          <!-- Research Activities -->
          <h4 style="font-family: Calibri; font-style: normal;">
            <b>6. RESEARCH ACTIVITIES</b>
          </h4>
          <div>
            <v-sheet v-html="savedData.research"></v-sheet>
          </div>

          <!-- Publications -->
          <h4 style="font-family: Calibri; font-style: normal;">
            <b>7. PUBLICATIONS</b>
          </h4>
          <div>
            <v-sheet v-html="savedData.publication"></v-sheet>
          </div>

          <!-- Recognition -->
          <h4 style="font-family: Calibri; font-style: normal;">
            <b>8. RECOGNITION OF NIMHANS CONTRIBUTION</b>
          </h4>
          <h4 style="font-family: Calibri; font-style: normal;">
            <b>A. AWARDS AND HONORS</b>
          </h4>
          <div>
            <v-sheet v-html="savedData.recognition"></v-sheet>
          </div>

          <!-- Patents -->
          <h4 style="font-family: Calibri; font-style: normal;">
            <b>B. PATENTS</b>
          </h4>
          <div>
            <v-sheet v-html="savedData.patent"></v-sheet>
          </div>

          <!-- Key Assignments -->
          <h4 style="font-family: Calibri; font-style: normal;">
            <b>C. KEY ASSIGNMENTS </b>
          </h4>
          <div>
            <v-sheet v-html="savedData.assignment"></v-sheet>
          </div>
        </div>
      </v-sheet>
    </div>
    <!-- <FinalEditor id="content" :content="content" />
    <div id="download" style="display:none" v-html="content"></div> -->
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  head() {
    return {
      title: "Generated Report",
      formattedFileName: "",
    };
  },
  data() {
    return {};
  },
  computed: {
    reportTitle() {
      return (
        "Report for the period of " +
        this.$moment(this.savedData.from).format("Do MMMM YYYY") +
        " to " +
        this.$moment(this.savedData.to).format("Do MMMM YYYY") +
        ", RY (" +
        this.savedData.annual_year +
        " - " +
        `${this.savedData.annual_year + 1}` +
        ")"
      );
    },
    ...mapState({
      savedData: (state) => state.report.generatedReport,
      aboutData: (state) => state.about.newAbout[0],
      clinicalData: (state) => state.clinical.clinicalData.result,
      emergencyData: (state) => state.emergency.emergencyData,
      diagnosticsData: (state) => state.diagnostic.diagnosticData,
      specialData: (state) => state.special.specialData,
      otservicesData: (state) => state.otservice.otservicesData,
      hrdCourses: (state) => state.hrdCourse.hrdCourses.result,
      hrdTrainings: (state) => state.hrdTraining.hrdTrainings.result,
      retaired: (state) => state.faculty.facultyData.result,
    }),

    formattedAbout() {
      if (this.aboutData) {
        return `
      <center>
      <h2>NATIONAL INSTITUTE OF MENTAL HEALTH &amp; NEUROSCIENCES</h2>
      <h3>Bengaluru – 560029</h3>
      <h2>Period of the report:1st April ${this.$store.state.selectedYear} to 31st March ${this.$store.state.selectedYear + 1}</h2>
      </center>
      <h1><b><u>Section A:</u></b></h1>
      <h3>1. ABOUT THE DEPARTMENT</h3>
      <h3>A. Introduction: Specifically indicate the recognition / contribution of the Department during the year to policies, planning and programmes at State / National and International levels.</h3>
      <p>${this.aboutData.introduction}</p>
      <h3>B. New facilities developed: New initiatives taken up by the Department(s) within NIMHANS during the year.</h3>
      <p>${this.aboutData.facilities}</p>
      `;
      } else {
        return "";
      }
    },
    formattedClinical() {
      let sum = 0;
      console.log(this.clinicalData);
      if (this.clinicalData.length > 0) {
        return `

      <h3>2. PATIENT CARE ACTIVITIES</h3>
      <h3> A. Clinical Services</h3>
      <table>
      <thead>
      <tr>
      <th style="border: 1px solid #dddddd;">Clinical Services</th>
      <th style="border: 1px solid #dddddd;">No. of Patients / Cases</th>
      </tr>
      <thead>

      <tbody>
      <tr>
      <td style="border: 1px solid #dddddd;">Screenings</td>
      <td style="border: 1px solid #dddddd;">${this.clinicalData.reduce((sum, item) => sum + item.screenings, 0)}</td>
      </tr>
      <tr>
      <td style="border: 1px solid #dddddd;">Registrations</td>
      <td style="border: 1px solid #dddddd;">${this.clinicalData.reduce((sum, item) => sum + item.registrations, 0)}</td>
      </tr>
      <tr>
      <td style="border: 1px solid #dddddd;">followups</td>
      <td style="border: 1px solid #dddddd;">${this.clinicalData.reduce((sum, item) => sum + item.followups, 0)}</td>
      </tr>
      <tr>
      <td style="border: 1px solid #dddddd;">Admissions</td>
      <td style="border: 1px solid #dddddd;">${this.clinicalData.reduce((sum, item) => sum + item.admissions, 0)}</td>
      </tr>
      <tr>
      <td style="border: 1px solid #dddddd;">Discharges</td>
      <td style="border: 1px solid #dddddd;">${this.clinicalData.reduce((sum, item) => sum + item.discharges, 0)}</td>
      </tr>
      <tr>
      <td style="border: 1px solid #dddddd;">Deaths</td>
      <td style="border: 1px solid #dddddd;">${this.clinicalData.reduce((sum, item) => sum + item.deaths, 0)}</td>
      </tr>
      <tr>
      <td style="border: 1px solid #dddddd;">Emergencies</td>
      <td style="border: 1px solid #dddddd;">${this.clinicalData.reduce((sum, item) => sum + item.emergencies, 0)}</td>
      </tr>
      <tr>
      <td style="border: 1px solid #dddddd;">External Reference</td>
      <td style="border: 1px solid #dddddd;">${this.clinicalData.reduce((sum, item) => sum + item.external_ref, 0)}</td>
      </tr>
      <tr>
      <td style="border: 1px solid #dddddd;">Internal Reference</td>
      <td style="border: 1px solid #dddddd;">${this.clinicalData.reduce((sum, item) => sum + item.internal_ref, 0)}</td>
      </tr>
      </tbody>
      </table>
      `;
      } else {
        return "";
      }
    },
    formattedEmergency() {
      let sum = 0;
      if (this.emergencyData.length > 0) {
        return `
      <h3> B. Emergency Services</h3>
      <table>
      <tr>
      <th style="border: 1px solid #dddddd;">Emergency Services</th>
      <th style="border: 1px solid #dddddd;">No.Of Patients /Cases</th>
      </tr>

      <td style="border: 1px solid #dddddd;">Registrations</td>
      <td style="border: 1px solid #dddddd;">${this.emergencyData.reduce((sum, item) => sum + item.registrations, 0)}</td>
      </tr>
      <tr>
      <td style="border: 1px solid #dddddd;">Admissions</td>
      <td style="border: 1px solid #dddddd;">${this.emergencyData.reduce((sum, item) => sum + item.admissions, 0)}</td>
      </tr>
      <tr>
      <td style="border: 1px solid #dddddd;">Deaths</td>
      <td style="border: 1px solid #dddddd;">${this.emergencyData.reduce((sum, item) => sum + item.deaths, 0)}</td>
      </tr>
      <tr>
      <td style="border: 1px solid #dddddd;">External Reference</td>
      <td style="border: 1px solid #dddddd;">${this.emergencyData.reduce((sum, item) => sum + item.external_ref, 0)}</td>
      </tr>
      <tr>
      <td style="border: 1px solid #dddddd;">Internal Reference</td>
      <td style="border: 1px solid #dddddd;">${this.emergencyData.reduce((sum, item) => sum + item.internal_ref, 0)}</td>
      </tr>
      </table>
      `;
      } else {
        return "";
      }
    },
    formattedDiagnostics() {
      let sum = 0;
      if (this.diagnosticsData.length > 0) {
        var html = `
      <h3> C. Diagnostic Services</h3>
      <table>
      <tr>
      <th style="border: 1px solid #dddddd;">Lab Services</th>
      <th style="border: 1px solid #dddddd;">Total No.Of Samples Analyzed</th>
      </tr>`;
        for (var i = 0; i < this.diagnosticsData.length; i++) {
          let sum = 0;
          html += `<tr>
      <td style="border: 1px solid #dddddd;">${this.diagnosticsData[i].pc_diagnostic_test.test_name}</td>
      <td style="border: 1px solid #dddddd;">${this.diagnosticsData[i].samples_analyzed}</td>
      </tr>`;
        }
        html += `</table>
      `;
        return html;
      } else {
        return "";
      }
    },
    formattedSpecial() {
      if (this.specialData.length > 0) {
        var html = `
      <h3>D. Special Clinics / Services / Procedures</h3>
      <table>
      <tr>
      <th style="border: 1px solid #dddddd;">Special Services</th>
      <th style="border: 1px solid #dddddd;">New Patients</th>
      <th style="border: 1px solid #dddddd;">Follow-up Patients</th>
      <th style="border: 1px solid #dddddd;">Referrals</th>
      <th style="border: 1px solid #dddddd;">Description</th>
      </tr>`;
        for (var i = 0; i < this.specialData.length; i++) {
          let sum = 0;
          html += `<tr>
      <td style="border: 1px solid #dddddd;">${this.specialData[i].service_name}</td>
      <td style="border: 1px solid #dddddd;">${this.specialData[i].new_patients}</td>
      <td style="border: 1px solid #dddddd;">${this.specialData[i].followup_patients}</td>
      <td style="border: 1px solid #dddddd;">${this.specialData[i].referrals}</td>
      <td style="border: 1px solid #dddddd;">${this.specialData[i].description}</td>
      </tr>`;
        }
        html += `</table>
      `;
        return html;
      } else {
        return "";
      }
    },
    formattedOT() {
      if (this.otservicesData.length > 0) {
        var html = `
      <h3>E.	OT & Other Procedures</h3>
      <table>
      <tr>
      <th style="border: 1px solid #dddddd;">Procedure Name</th>
      <th style="border: 1px solid #dddddd;">Classification</th>
      <th style="border: 1px solid #dddddd;">No of Patients</th>
      <th style="border: 1px solid #dddddd;">Description</th>
      </tr>`;
        for (var i = 0; i < this.otservicesData.length; i++) {
          let sum = 0;
          html += `<tr>
      <td style="border: 1px solid #dddddd;">${this.otservicesData[i].Procedure}</td>
      <td style="border: 1px solid #dddddd;">${this.otservicesData[i].classification}</td>
      <td style="border: 1px solid #dddddd;">${this.otservicesData[i].no_of_patients}</td>
      <td style="border: 1px solid #dddddd;">${this.otservicesData[i].description}</td>
      </tr>`;
        }
        html += `</table>
      `;
        return html;
      } else {
        return "";
      }
    },
    formattedHRD() {
      if (this.hrdCourses.length > 0) {
        var html = `
      <h3>3.	HUMAN RESOURCE DEVELOPMENT </h3>
      <h3>A.	Details of Regular Courses</h3>
      <table>
      <tr>
      <th style="border: 1px solid #dddddd;">Course</th>
      <th style="border: 1px solid #dddddd;">Name of the Candidate</th>
      <th style="border: 1px solid #dddddd;">Duration</th>
      <th style="border: 1px solid #dddddd;">Status</th>
      <th style="border: 1px solid #dddddd;">Title of the thesis (If any)</th>
      <th style="border: 1px solid #dddddd;">Guide(s)(If any)</th>
      </tr>`;
        for (var i = 0; i < this.hrdCourses.length; i++) {
          let sum = 0;
          html += `<tr>
      <td style="border: 1px solid #dddddd;">${this.hrdCourses[i].course_name}</td>
      <td style="border: 1px solid #dddddd;">${this.hrdCourses[i].candidate_name}</td>
      <td style="border: 1px solid #dddddd;">${this.hrdCourses[i].durations} Years</td>
      <td style="border: 1px solid #dddddd;">${this.hrdCourses[i].remarks_status}</td>
      <td style="border: 1px solid #dddddd;">${this.hrdCourses[i].thesis_title}</td>
      <td style="border: 1px solid #dddddd;">${this.hrdCourses[i].guides}</td>
      </tr>`;
        }
        html += `</table>
      `;
        return html;
      } else {
        return "";
      }
    },
    formattedTrainings() {
      if (this.hrdTrainings.length > 0) {
        var html = `
      <h3>B.	Faculty/staff/students from other institutions trained at NIMHANS</h3>
      <table>
      <tr>
      <th style="border: 1px solid #dddddd;">Name of the course / Training</th>
      <th style="border: 1px solid #dddddd;">Institutional affiliation</th>
      <th style="border: 1px solid #dddddd;">Number of Candidates</th>
      <th style="border: 1px solid #dddddd;">From</th>
      <th style="border: 1px solid #dddddd;">To</th>
      <th style="border: 1px solid #dddddd;">Status</th>
      <th style="border: 1px solid #dddddd;">Description</th>
      </tr>`;
        for (var i = 0; i < this.hrdTrainings.length; i++) {
          let sum = 0;
          html += `<tr>
      <td style="border: 1px solid #dddddd;">${this.hrdTrainings[i].training_name}</td>
      <td style="border: 1px solid #dddddd;">${this.hrdTrainings[i].institutional_affiliation}</td>
      <td style="border: 1px solid #dddddd;">${this.hrdTrainings[i].no_of_candidates} Years</td>
      <td style="border: 1px solid #dddddd;">${this.hrdTrainings[i].from_date}</td>
      <td style="border: 1px solid #dddddd;">${this.hrdTrainings[i].to_date}</td>
      <td style="border: 1px solid #dddddd;">${this.hrdTrainings[i].remarks_status}</td>
      <td style="border: 1px solid #dddddd;">${this.hrdTrainings[i].brief_report}</td>
      </tr>`;
        }
        html += `</table>
      `;
        return html;
      } else {
        return "";
      }
    },
    formattedRetaired() {
      if (this.retaired.length > 0) {
        var html = `
      <h3>4.	DETAILS OF DEPARTMENTAL STAFF</h3>
      <h3>B.	A.	List of Faculty and staff served NIMHANS and Superannuated / Resigned / VRS</h3>
      <table>
      <tr>
      <th style="border: 1px solid #dddddd;">Superannuated / Resigned / VRS</th>
      <th style="border: 1px solid #dddddd;">Name of the Official and Designation</th>
      <th style="border: 1px solid #dddddd;">Date of Joining</th>
      <th style="border: 1px solid #dddddd;">Date of Leaving</th>
      <th style="border: 1px solid #dddddd;">Image URL</th>
      </tr>`;
        for (var i = 0; i < this.retaired.length; i++) {
          let sum = 0;
          html += `<tr>
      <td style="border: 1px solid #dddddd;">${this.retaired[i].faculty_status}</td>
      <td style="border: 1px solid #dddddd;">${this.retaired[i].faculty_name}</td>
      <td style="border: 1px solid #dddddd;"></td>
      <td style="border: 1px solid #dddddd;">${this.retaired[i].leaving_date}</td>
      <td style="border: 1px solid #dddddd;">${this.retaired[i].image ? this.retaired[i].image : ""}</td>
      </tr>`;
        }
        html += `</table>
      `;
        return html;
      } else {
        return "";
      }
    },
  },
  async fetch({ store, params }) {
    await store.dispatch("report/getById", { id: params.id });
  },
  mounted() {
    console.log("im in");
    this.$store.dispatch("setDepartmentName", this.$auth.user.department);
    this.formattedFileName =
      this.$store.state.departmentName +
      "_" +
      this.savedData.userType +
      "_" +
      "_Report_for_the_period_of_" +
      this.$moment(this.savedData.from).format("Do_MMMM_YYYY") +
      " to " +
      this.$moment(this.savedData.to).format("Do_MMMM_YYYY") +
      ",_RY(" +
      this.savedData.annual_year +
      " - " +
      `${this.savedData.annual_year + 1}` +
      ")";
  },
  methods: {
    copyReport() {
      console.log("copied!");
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
