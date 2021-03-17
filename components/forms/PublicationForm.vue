<template>
  <div>
    <v-row>
      <v-col cols="12" md="12">
        <v-form ref="form" v-model="valid" lazy-validation @submit.prevent>
          <v-row no-gutters v-if="$auth.user.userType === 'DEPARTMENT'">
            <v-col cols="11" lg="11">
              <v-select
                v-model="publication.user"
                :items="dataFrom"
                item-value="id"
                item-text="fullname"
                label="Data received from?"
                :placeholder="section"
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
            <v-col cols="12">
              <v-select
                v-model="publication_type"
                :items="publicationTypes"
                :rules="[(v) => !!v || 'Item is required']"
                label="Publication Type"
                item-text="text"
                item-value="id"
                color="success"
              ></v-select>
            </v-col>
          </v-row>

          <!-- Pubtype = Journal Article  -->
          <v-row v-if="publication_type == 1">
            <v-col cols="6">
              <v-select
                v-model="publication.classification"
                :items="classifications"
                item-text="name"
                item-value="value"
                :rules="[(v) => !!v || 'Item is required']"
                label="Classification"
                required
                color="success"
              >
              </v-select>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="publication.pmid"
                label="PubMed ID"
                @blur="fetchArticle"
                color="success"
              >
              </v-text-field>
              <v-dialog
                v-model="loaderdialog"
                hide-overlay
                persistent
                width="300"
              >
                <v-card color="green" dark>
                  <v-card-text>
                    Please stand by
                    <v-progress-linear
                      indeterminate
                      color="white"
                      class="mb-0"
                    ></v-progress-linear>
                  </v-card-text>
                </v-card>
              </v-dialog>
            </v-col>
            <v-col cols="12">
              <v-textarea
                auto-grow
                row-height="15"
                v-model="authorNames"
                :rules="[(v) => !!v || 'Item is required']"
                required
                :items="authors"
                label="Authors"
                color="success"
                @blur="composeReference"
              >
              </v-textarea>
            </v-col>
            <v-col cols="12">
              <v-textarea
                auto-grow
                row-height="12"
                v-model="journalArticle.title"
                value="journalArticle.title"
                label="Title of the Article"
                :rules="[(v) => !!v || 'Item is required']"
                required
                text-val="journalArticle.title"
                color="success"
                @blur="composeReference"
              >
              </v-textarea>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="journalArticle.fulljournalname"
                value="journalArticle.fulljournalname"
                label="Title of Journal (With standard Abbrevation)"
                :rules="[(v) => !!v || 'Item is required']"
                required
                color="success"
                @blur="composeReference"
              >
              </v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="journalArticle.epubdate"
                label="Publication Date"
                hint="Format: YYYY-MM-DD"
                persistent-hint
                @blur="dateValidate(journalArticle.epubdate)"
                color="success"
                placeholder="YYYY-MM-DD"
              >
              </v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="journalArticle.volume"
                value="jouralArticle.volume"
                label="Volume / Issue No"
                color="success"
                @blur="composeReference"
              >
              </v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="journalArticle.pages"
                value="jouralArticle.pages"
                label="Pages"
                color="success"
                @blur="composeReference"
              >
              </v-text-field>
            </v-col>
            <v-col cols="12">
              <v-textarea
                auto-grow
                row-height="18"
                v-model="publication.reference"
                label="Reference"
                :rules="[(v) => !!v || 'Item is required']"
                color="success"
              ></v-textarea>
              <span class="caption font-weight-normal"
                >Example: Andrade C, Prasad Y, Devaraj A, Pinto EF, Shukla L.
                ECT and Pronounced Impairment in Spatial Cognition: The Fallacy
                of Drawing Conclusions From a Single Case. J ECT. 2018
                Jun;34(2):75–7.</span
              >
            </v-col>
          </v-row>

          <!-- Pubtype = Articles for Newsletters  -->
          <v-row v-if="publication_type == 2">
            <v-col cols="6">
              <v-select
                v-model="publication.classification"
                :items="classifications"
                item-text="name"
                item-value="value"
                :rules="[(v) => !!v || 'Item is required']"
                label="Classification"
                required
                color="success"
              >
              </v-select>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="publication.pmid"
                label="PubMed ID"
                color="success"
                disabled
              >
              </v-text-field>
            </v-col>
            <v-col cols="12">
              <v-textarea
                auto-grow
                row-height="15"
                v-model="publication.authors"
                :rules="[(v) => !!v || 'Item is required']"
                required
                label="Authors"
                color="success"
                @blur="composeReference"
              >
              </v-textarea>
            </v-col>
            <v-col cols="12">
              <v-textarea
                auto-grow
                row-height="12"
                v-model="publication.article_title"
                label="Title of the Article"
                :rules="[(v) => !!v || 'Item is required']"
                required
                color="success"
                @blur="composeReference"
              >
              </v-textarea>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="publication.journal_title"
                value="journalArticle.fulljournalname"
                label="Title of Journal (With standard Abbrevation)"
                :rules="[(v) => !!v || 'Item is required']"
                required
                color="success"
                @blur="composeReference"
              >
              </v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="publication.pub_date"
                label="Publication Date"
                hint="Example: 2011 Jan 26"
                persistent-hint
                @blur="dateValidate1(publication.pub_date)"
                color="success"
              >
              </v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="publication.volume_no"
                label="Volume / Issue No"
                color="success"
                @blur="composeReference"
              >
              </v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="publication.pages"
                label="Pages"
                color="success"
                @blur="composeReference"
              >
              </v-text-field>
            </v-col>
            <v-col cols="12">
              <v-textarea
                auto-grow
                row-height="18"
                v-model="publication.reference"
                label="Reference"
                :rules="[(v) => !!v || 'Item is required']"
                color="success"
              ></v-textarea>
              <span class="caption font-weight-normal"
                >Example: Thirthalli J, Basavarajappa C. Role of nurses in
                psychiatric rehabilitation: Psychiatrists’ perspective.
                Souvenir, 3rd International Conference of Indian Society of
                Psychiatry Nurses on Rehabilitation of Persons with Mental
                Illness, NIMHANS, Bengaluru, 10-12 February 2017.</span
              >
            </v-col>
          </v-row>

          <!-- Pubtype = Books  -->
          <v-row v-if="publication_type == 3">
            <v-col cols="3">
              <v-select
                v-model="publication.classification"
                :items="classifications"
                item-text="name"
                item-value="value"
                :rules="[(v) => !!v || 'Item is required']"
                label="Classification"
                required
                color="success"
              >
              </v-select>
            </v-col>
            <v-col cols="9">
              <v-text-field
                v-model="publication.authors"
                :rules="[(v) => !!v || 'Item is required']"
                required
                label="Authors"
                color="success"
                @blur="composeReference"
              >
              </v-text-field>
            </v-col>
            <v-col cols="12">
              <v-textarea
                auto-grow
                row-height="12"
                v-model="publication.book_title"
                label="Title of the Book"
                :rules="[(v) => !!v || 'Item is required']"
                required
                color="success"
                @blur="composeReference"
              >
              </v-textarea>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="publication.edition"
                label="Edition"
                color="success"
                @blur="composeReference"
              >
              </v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="publication.place"
                label="Place"
                color="success"
                @blur="composeReference"
              >
              </v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="publication.publisher"
                label="Publisher"
                color="success"
                @blur="composeReference"
              >
              </v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="publication.year"
                label="Year"
                color="success"
                @blur="composeReference"
              >
              </v-text-field>
            </v-col>
            <v-col cols="12">
              <v-textarea
                auto-grow
                row-height="18"
                v-model="publication.reference"
                label="Reference"
                :rules="[(v) => !!v || 'Item is required']"
                color="success"
              ></v-textarea>
              <span class="caption font-weight-normal"
                >Example: Desai G, Chaturvedi SK (Eds.). Medically unexplained
                somatic symptoms and chronic pain: assessment and management. A
                primer for healthcare professionals (first edition). Paras
                Medical Publishers, Hyderabad, India, 2017.</span
              >
            </v-col>
          </v-row>

          <!-- Pubtype = Book Chapter  -->
          <v-row v-if="publication_type == 4">
            <v-col cols="3">
              <v-select
                v-model="publication.classification"
                :items="classifications"
                item-text="name"
                item-value="value"
                :rules="[(v) => !!v || 'Item is required']"
                label="Classification"
                required
                color="success"
              >
              </v-select>
            </v-col>
            <v-col cols="9">
              <v-text-field
                v-model="publication.authors"
                :rules="[(v) => !!v || 'Item is required']"
                required
                label="Authors"
                color="success"
                @blur="composeReference"
              >
              </v-text-field>
            </v-col>
            <v-col cols="12">
              <v-textarea
                auto-grow
                row-height="12"
                v-model="publication.chapter_title"
                label="Title of the Book Chapter"
                :rules="[(v) => !!v || 'Item is required']"
                required
                color="success"
                @blur="composeReference"
              >
              </v-textarea>
            </v-col>
            <v-col cols="12">
              <v-textarea
                auto-grow
                row-height="12"
                v-model="publication.editor_names"
                label="Editors"
                color="success"
                @blur="composeReference"
              >
              </v-textarea>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="publication.edition"
                label="Edition"
                color="success"
              >
              </v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="publication.place"
                label="Place"
                color="success"
                @blur="composeReference"
              >
              </v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="publication.publisher"
                label="Publisher"
                color="success"
                @blur="composeReference"
              >
              </v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="publication.year"
                label="Year"
                color="success"
                @blur="composeReference"
              >
              </v-text-field>
            </v-col>
            <v-col cols="12">
              <v-textarea
                auto-grow
                row-height="18"
                v-model="publication.reference"
                label="Reference"
                :rules="[(v) => !!v || 'Item is required']"
                color="success"
              ></v-textarea>
              <span class="caption font-weight-normal"
                >Example: Taly AB, Nair KPS. Role of Electrodiagnostics in
                Spinal Cord Injury and Stroke Rehabilitation. In: Ghatak MM, Sen
                S, Deogoankar M (eds.). Spinal Injury and Stroke Rehabilitation.
                Jaypee Brothers Medical Publishers (P) Ltd., 2016.
                p.222-238</span
              >
            </v-col>
          </v-row>

          <!-- Pubtype = All others -->
          <v-row v-if="publication_type > 4">
            <v-col cols="12">
              <v-text-field
                v-model="publication.authors"
                :rules="[(v) => !!v || 'Item is required']"
                required
                label="Authors"
                color="success"
                @blur="composeReference"
              >
              </v-text-field>
            </v-col>
            <v-col cols="12">
              <v-textarea
                auto-grow
                row-height="12"
                v-model="publication.article_title"
                label="Title"
                :rules="[(v) => !!v || 'Item is required']"
                required
                color="success"
                @blur="composeReference"
              >
              </v-textarea>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="publication.edition"
                label="Edition"
                color="success"
                @blur="composeReference"
              >
              </v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="publication.place"
                label="Place"
                color="success"
                @blur="composeReference"
              >
              </v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="publication.publisher"
                label="Publisher"
                color="success"
                @blur="composeReference"
              >
              </v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="publication.year"
                label="Year"
                color="success"
                @blur="composeReference"
              >
              </v-text-field>
            </v-col>
            <v-col cols="12">
              <v-textarea
                auto-grow
                row-height="18"
                v-model="publication.reference"
                label="Reference"
                :rules="[(v) => !!v || 'Item is required']"
                color="success"
              ></v-textarea>
              <span
                v-if="publication_type == 5"
                class="caption font-weight-normal"
                >Example: Murthy P, Chandra PS, Benegal V, Chand PK, Pandian D,
                Thennarasu K. Development of a partner focused intervention for
                alcohol dependence and assessment of impact on couple’s outcome:
                A pilot study. Project supported by the Indian Council for
                Medical Research, 2014.</span
              >
              <span
                v-else-if="publication_type == 6"
                class="caption font-weight-normal"
                >Example: Aravindraj E, Muralidhar D, Hamza MA. Manual on
                Counselling Skills for Teachers of Industrial Training
                Institutes. NIMHANS Publication, 2016.</span
              >
              <span
                v-else-if="publication_type == 7"
                class="caption font-weight-normal"
                >Example: Gautham MS, Gururaj G. Report– Health Promotion in
                Workplaces: A scoping study. Centre for Public Health, NIMHANS,
                2016.</span
              >
              <span
                v-else-if="publication_type == 8"
                class="caption font-weight-normal"
                >Example: Mehta UM. I feel like an outsider - How persons with
                schizophrenia can understand other people and communicate
                better. Loudspeaker – A magazine for mental health, published by
                NIMHANS Centre for Well Being, Summer Edition 2016.</span
              >
            </v-col>
          </v-row>
        </v-form>
      </v-col>
      <v-layout align-end justify-end>
        <v-btn small color="#d74f4f" dark @click="reset" class="mr-4">
          Reset
        </v-btn>
        <v-btn small color="#57a727" dark @click="publicationAdd" class="mr-4">
          Submit
        </v-btn>
      </v-layout>
    </v-row>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import { mapState } from "vuex";
import AddUser from "@/components/forms/AddUser";
export default {
  props: ["dataFrom", "publicationTypes", "section"],
  components: {
    AddUser,
  },
  data() {
    return {
      loading: false,
      search: "",
      loader: null,
      loading5: false,
      date: false,
      valid: true,
      authorNames: "",
      authors: null,
      publication_type: 0,
      publication: {
        annual_year: 0,
        publication_type: "",
        classification: "",
        pmid: "",
        article_title: "",
        journal_title: "",
        pub_date: "",
        volume_no: "",
        book_title: "",
        edition: "",
        place: "",
        publisher: "",
        year: null,
        chapter_title: "",
        editor_names: "",
        reference: "",
        deleted: false,
        authors: "",
        approval_status: "Approved",
        department: 0,
        user: 0,
        pages: "",
      },
      journalArticle: {
        title: "",
        fulljournalname: "",
        epubdate: "",
        volume: "",
        pages: "",
      },
      editedJournal: {
        title: "",
        fulljournalname: "",
        epubdate: "",
        volume: "",
        pages: "",
      },
      loaderdialog: false,
      classifications: ["International", "National", "NotApplicable", "Others"],
    };
  },

  methods: {
    getLatestUsers() {
      ``;
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
       this.journalArticle.title = "";
          this.journalArticle.fulljournalname = "";
          this.journalArticle.epubdate = "";
          this.journalArticle.volume = "";
          this.journalArticle.pages = "";
      this.publication.annual_year= 0,
        this.publication.publication_type= "",
        this.publication.classification= "",
        this.publication.pmid= "",
        this.publication.article_title= "",
        this.publication.journal_title= "",
        this.publication.pub_date= "",
        this.publication.volume_no= "",
        this.publication.book_title= "",
        this.publication.edition= "",
        this.publication.place= "",
        this.publication.publisher= "",
        this.publication.chapter_title= "",
        this.publication.editor_names= "",
        this.publication.reference= "",
        this.publication.deleted= false,
        this.publication.authors= "",
        this.publication.approval_status= "Approved",
        this.publication.department= 0,
        this.publication.user= 0,
        this.publication.pages= "",
      
      this.image_url = null;
    },
    dateValidate(date) {
      if (date) {
        this.journalArticle.epubdate = this.$moment(date).format("YYYY MMM DD");
        this.composeReference();
      }
    },
    dateValidate1(date) {
      if (date) {
        this.publication.pub_date = this.$moment(date).format("YYYY-MM-DD");
        this.composeReference();
      }
    },
    getPublicationType(id) {
      return this.publicationTypes[id - 1].publicationType;
    },
    async fetchArticle() {
      var pmid = this.publication.pmid;
      this.loaderdialog = true;
      this.$store
        .dispatch("publication/setJournalArticle", { id: pmid })
        .then((resp) => {
          this.journalArticle = Object.assign(
            {},
            this.$store.state.publication.journalArticle
          );
          // this.authors = this.journalArticle.authors;
          console.log(this.journalArticle);
          var authors = [];
          this.journalArticle.authors.forEach(function (item, index) {
            authors.push(item.name);
          });
          this.authorNames = authors;
          // if (this.$store.state.publication.journalArticle.authors === "")
          //   this.journalArticle.authorNames = "";
          if (this.$store.state.publication.journalArticle.epubdate === "")
            this.journalArticle.epubdate = "";
          if (this.$store.state.publication.journalArticle.volume === "")
            this.journalArticle.volume = "";
          if (this.$store.state.publication.journalArticle.pages === "")
            this.journalArticle.pages = "";
          this.publication.reference =
            this.authorNames.join() +
            ". " +
            this.journalArticle.title +
            " " +
            this.journalArticle.fulljournalname +
            " " +
            this.journalArticle.epubdate +
            ";" +
            this.journalArticle.volume +
            ":" +
            this.journalArticle.pages;
          this.loaderdialog = true;
        })
        .catch((err) => {
          this.snackbar = true;
          this.submitMessage = "No data found!";
          this.journalArticle = Object.assign({}, this.editedJournal);
        })
        .finally(() => (this.loaderdialog = false));
    },
    composeReference() {
      console.log("Publication Type:" + this.publication_type);
      this.publication.year= this.publication.year>0?this.publication.year:''
      if (this.publication_type == 1) {
          
          this.publication.reference =
            this.authorNames + "." + 
            this.journalArticle.title + "." + 
            this.journalArticle.fulljournalname + "." + 
            this.journalArticle.epubdate + ";" + 
            this.journalArticle.volume + ":" + 
            this.journalArticle.pages
      }
      if (this.publication_type == 2) {
        // console.log(this.publication.reference)
        this.publication.reference = 
        this.publication.authors + "." + 
        this.publication.article_title + "." + 
        this.publication.journal_title + "," + 
        this.publication.pub_date + "," +
        this.publication.volume_no+ ":" + 
        this.publication.pages;
      }
      if (this.publication_type == 3) {
        this.publication.reference =
          this.publication.authors + "." +
          this.publication.book_title + "." +
          this.publication.edition + "," +
          this.publication.place + "," + 
          this.publication.publisher + "," +
          this.publication.year;
      }
      if (this.publication_type == 4)
        this.publication.reference =
          this.publication.authors +
          "." +
          this.publication.chapter_title +
          "In: " +
          this.publication.editor_names +
          "" +
          this.publication.book_title +
          "," +
          this.publication.edition +
          "," +
          this.publication.place +
          "," +
          this.publication.publisher +
          "," +
          this.publication.year;
      if (this.publication_type > 4)
        this.publication.reference =
          this.publication.authors +
          "." +
          this.publication.article_title +
          "." +
          this.publication.edition +
          "," +
          this.publication.place +
          "," +
          this.publication.publisher +
          "," +
          this.publication.year;
    },
    async publicationAdd() {
      if (this.$refs.form.validate()) {
        this.publication.year=this.publication.year?this.publication.year:0;
        this.publication.annual_year = this.$store.state.selectedYear;
        this.publication.publication_type = this.publicationTypes[
          this.publication_type - 1
        ].value;
        this.publication.department = this.$store.state.auth.user.department;
        if (this.$store.state.auth.user.userType !== "DEPARTMENT")
          this.publication.user = this.$auth.user.id;
        if (this.$store.state.auth.user.userType === "DEPARTMENT") {
          var today = new Date();
          this.publication.approved_date = this.$moment(today).format(
            "YYYY-MM-DD"
          );
          // this.publication.approved_by = this.$store.state.auth.user.fullname;
        } 
        if (this.publication_type == 1) {
          this.publication.journal_title = this.journalArticle.fulljournalname;
          this.publication.article_title = this.journalArticle.title;
          this.publication.pages = this.journalArticle.pages;
          this.publication.volume_no = this.journalArticle.volume;
          this.publication.pub_date =
            this.journalArticle.epubdate === ""
              ? null
              : this.$moment(this.journalArticle.epubdate).format("YYYY-MM-DD");
          if(typeof this.authorNames ==='object')
            this.publication.authors = this.authorNames.join();
          else
           this.publication.authors = this.authorNames;

        }
        if (this.publication.pub_date === "") this.publication.pub_date = null;

        if (this.publication_type > 2) this.publication.pub_date = null;

        if (this.publication_type > 4)
          this.publication.classification = "National";

        var payload = this.publication;
        console.log(payload);
        var vm = this;
        this.$store
          .dispatch("publication/publicationAdd", payload)
          .then((resp) => {
            Swal.fire({
              title: "Success",
              text: "Publication Submitted successfully!",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            });
            this.reset();
            this.reloadData();
          })
          .catch((err) => {
            Swal.fire(err.response);
          });
      }
    },
    async reloadData() {
      this.loading = true;
      let queryString = "";

      if (
        this.$store.state.auth.user.userType === "Faculty" ||
        this.$store.state.auth.user.userType === "Student"
      ) {
        queryString = `department.id=${this.$auth.user.department}&user.id=${this.$auth.user.id}&deleted_ne=true&annual_year=${this.$store.state.selectedYear}`;
        await this.$store.dispatch("publication/setPublicationsData", {
          qs: queryString,
        });
      } else {
        queryString = `department.id=${this.$auth.user.department}&annual_year=${this.$store.state.selectedYear}&deleted_ne=true`;
        await this.$store.dispatch("publication/setPublicationsData", {
          qs: queryString,
        });
      }
      this.loading = false;
    },
    async handleFileUpload(event) {
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
      this.publication.image = uploadRes.data[0].id;
    },
  },
};
</script>
