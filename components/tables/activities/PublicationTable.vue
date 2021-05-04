<template>
  <div>
    <v-data-table :headers="headers" :items="publicationsData" sort-by="updated_at" sort-desc class="elevation-1" :loading="loading" loading-text="Loading... Please wait">
      <template v-slot:[`item.updated_at`]="{ item }">
        {{ $moment(item.updated_at).fromNow() }}
      </template>
      <template v-slot:[`item.publicationTypeId`]="{ item }">
        {{ getPublicationType(item.publicationTypeId) }}
      </template>
      <template v-slot:top>
        <v-toolbar flat color="#ebebeb" class="d-flex justify mt-4 pt-1" style="border-radius: 0;">
          <v-toolbar-title><span class="frm-title">Publications</span></v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-select v-model="annualYear" :items="reportYears" item-text="val" item-value="id" label="Reporting Year" required class="justify-end mt-6" color="success" @change="reloadData()"></v-select>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-tooltip right color="blue-grey darken-2">
            <template v-slot:activator="{ on }">
              <v-btn x-small fab color="green" dark @click="reloadData" v-on="on">
                <v-icon>mdi-reload</v-icon>
              </v-btn>
            </template>
            <span>Reload Data</span>
          </v-tooltip>
          <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
            <v-card>
              <v-toolbar dark color="#41704e">
                <v-btn icon dark @click="close">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>Publications | Update Details</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-container>
                  <v-form ref="editForm" v-model="valid" lazy-validation @submit.prevent>
                    <v-container>
                      <div v-if="$route.matched[0].path === '/admin/activities/students/publication'">
                        <FormsPublicationForm :dataFrom="students" :publicationTypes="publicationTypes" :publicationType="publication_type" :publicationData="editedItem" :key="renderKey" @close="close" @save="save" />
                      </div>
                      <div v-else>
                        <FormsPublicationForm :dataFrom="staffs" :publicationTypes="publicationTypes" :publicationType="publication_type" :publicationData="editedItem" :key="renderKey" @close="close" @save="save" />
                      </div>
                    </v-container>
                  </v-form>
                </v-container>
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.action`]="{ item }">
        <v-icon centre @click="editItem(item)" color="green">mdi-pencil-box</v-icon>
        <v-icon centre @click="deleteItem(item)" color="error">mdi-delete-circle</v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Swal from "sweetalert2";
export default {
  props: ["reportYears", "dataFrom"],
  data: () => ({
    renderKey: 0,
    loading: false,
    valid: false,
    dialog: false,
    publication_type: 0,
    annualYear: 0,
    headers: [
      {
        text: "Last updated",
        align: "left",
        value: "updated_at",
      },
      { text: "Type of Publication", value: "publication_type" },
      { text: "Calssification", value: "classification" },
      { text: "Reference", value: "reference", width: "60%" },
      { text: "Actions", value: "action", sortable: false },
    ],
    editedItem: {
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
      approved_by: "",
      approved_date: "",
      deleted: false,
      authors: "",
      approval_status: "Approved",
      department: 0,
      user: 0,
      pages: "",
      month: 0,
      rejected_reason: null,
    },
    deletedItem: {
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
      year: 0,
      chapter_title: "",
      editor_names: "",
      reference: "",
      approved_by: "",
      approved_date: "",
      deleted: false,
      authors: "",
      approval_status: "Approved",
      department: 0,
      user: 0,
      pages: "",
      month: 0,
      rejected_reason: null,
    },
    editedJournal: {
      title: null,
      fulljournalname: null,
      epubdate: "",
      volume: "",
      pages: "",
    },
    authors: [],
    loaderdialog: false,
    classifications: ["International", "National", "NotApplicable", "Others"],
  }),
  computed: {
    ...mapState({
      publicationsData: (state) => state.publication.publicationsData.result,
      staffs: (state) => state.staffs,
      students: (state) => state.students,
      publicationTypes: (state) => state.publication.publicationTypes,
      journalArticles: (state) => state.publication.journalArticle,
    }),
    studentsData() {
      return this.publicationsData.filter((publication) => publication.user.userType === "STUDENT");
    },
    facultiesData() {
      return this.publicationsData.filter((publication) => publication.user.userType === "FACULTY");
    },
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    loaderdialog(val) {
      val || this.close();
    },
  },
  async fetch({ store }) {
    let queryString = "";
    if (store.state.auth.user.userType === "FACULTY" || store.state.auth.user.userType === "STUDENT") {
      queryString = `department.id=${store.state.auth.user.department}&user.id=${this.$auth.user.id}&annual_year=${store.state.selectedYear}&deleted_ne=true`;
      // console.log(queryString);
      await store.dispatch("publication/setPublicationsData", {
        qs: queryString,
      });
    } else {
      queryString = `department.id=${store.state.auth.user.department}&annual_year=${store.state.selectedYear}&deleted_ne=true&user.userType=${this.dataFrom}`;
      await store.dispatch("publication/setPublicationsData", {
        qs: queryString,
      });
    }
  },
  mounted() {
    this.annualYear = this.$store.state.selectedYear;
    this.reloadData();
    this.$store.dispatch("publication/setPublicationTypes");
  },
  methods: {
    handleclick(item) {
      var index = this.publicationsData.indexOf(item);
      if (item.approval_status === "Rejected") {
        Swal.fire({
          title: "Reason for Rejection",
          text: this.publicationsData[index].rejected_reason,
        });
      }
    },
    dateValidate(date) {
      if (date) {
        this.journalArticle.epubdate = this.$moment(date).format("YYYY MMM DD");
      }
    },
    dateValidate1(date) {
      if (date) {
        this.publication.pub_date = this.$moment(date).format("YYYY-MM-DD");
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
          this.journalArticle = Object.assign({}, this.$store.state.publication.journalArticle);
          // this.authors = this.journalArticle.authors;
          console.log(this.journalArticle);
          var authors = [];
          this.journalArticle.authors.forEach(function (item, index) {
            authors.push(item.name);
          });
          this.authors = authors;
          if (this.$store.state.publication.journalArticle.epubdate === "") this.journalArticle.epubdate = "";
          if (this.$store.state.publication.journalArticle.volume === "") this.journalArticle.volume = "";
          if (this.$store.state.publication.journalArticle.pages === "") this.journalArticle.pages = "";
          this.loaderdialog = true;
        })
        .catch((err) => {
          this.snackbar = true;
          this.submitMessage = "No data found!";
          this.journalArticle = Object.assign({}, this.editedJournal);
        })
        .finally(() => (this.loaderdialog = false));
    },
    editedComposeReference() {
      if (this.publication_type == 1)
        this.editedItem.reference =
          this.editedItem.authors +
          ". " +
          this.editedItem.journal_title +
          " " +
          this.editedItem.article_title +
          " " +
          this.$moment(this.editedItem.publicationDate).format("YYYY MMM DD") +
          ";" +
          this.editedItem.volume_no +
          ":" +
          this.editedItem.pages;
      if (this.publication_type == 2) this.editedItem.reference = this.editedItem.authors + ". " + this.editedItem.article_title + ". " + this.editedItem.journal_title + ". " + this.editedItem.pub_date + ":" + this.editedItem.pages;
      if (this.publication_type == 3)
        this.editedItem.reference = this.editedItem.authors + ". " + this.editedItem.book_title + ". " + this.editedItem.edition + ". " + this.editedItem.edition + ":" + this.editedItem.publisher + ";" + this.editedItem.year;
      if (this.publication_type == 4)
        this.editedItem.reference =
          this.editedItem.authors +
          ". " +
          this.editedItem.chapter_title +
          ". In: " +
          this.editedItem.editor_names +
          ". " +
          this.editedItem.book_title +
          "." +
          this.editedItem.edition +
          "." +
          this.editedItem.place +
          ":" +
          this.editedItem.publisher +
          ";" +
          this.editedItem.year;
      if (this.publication_type > 4)
        this.editedItem.reference = this.editedItem.authors + ". " + this.editedItem.article_title + "." + this.editedItem.edition + "." + this.editedItem.place + ":" + this.editedItem.publisher + ";" + this.editedItem.year;
    },
    editItem(item) {
      this.editedIndex = this.publicationsData.indexOf(item);
      this.editedItem = Object.assign({}, item);
      if (this.editedItem.publication_type === "Journal_Article") this.publication_type = 1;
      if (this.editedItem.publication_type === "Articles_for_Professionals") this.publication_type = 2;
      if (this.editedItem.publication_type === "Book") this.publication_type = 3;
      if (this.editedItem.publication_type === "Book_Chapter") this.publication_type = 4;
      if (this.editedItem.publication_type === "Monograph") this.publication_type = 5;
      if (this.editedItem.publication_type === "Manual") this.publication_type = 6;
      if (this.editedItem.publication_type === "Report") this.publication_type = 7;
      if (this.editedItem.publication_type === "Article_for_General_public") this.publication_type = 8;
      this.renderKey += 1;
      this.dialog = true;
      console.log(this.editedItem);
    },
    deleteItem(item) {
      const index = this.publicationsData.indexOf(item);
      this.deletedItem = Object.assign({}, item);
      // confirm('Are you sure you want to delete this item?') && this.programmesData.splice(index, 1)
      this.deletedItem.deleted = true;
      var payload = this.deletedItem;
      // console.log(payload);
      var vm = this;
      confirm("Are you sure you want to delete this item?") &&
        this.$store
          .dispatch("publication/updatePublication", payload)
          .then((resp) => {
            Swal.fire({
              title: "Success",
              text: "Deleted Successfully!",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            });
            this.reloadData();
          })
          .catch((err) => {
            this.snackbar = true;
            this.submitMessage = err;
          });
    },
    async reloadData() {
      this.loading = true;

      if (this.$store.state.auth.user.userType === "FACULTY" || this.$store.state.auth.user.userType === "STUDENT") {
        let queryString = "";
        queryString = `department.id=${this.$auth.user.department}&user.id=${this.$auth.user.id}&deleted_ne=true&annual_year=${this.annualYear}`;
        await this.$store.dispatch("publication/setPublicationsData", {
          qs: queryString,
        });
      } else {
        let queryString = "";
        queryString = `department.id=${this.$auth.user.department}&annual_year=${this.annualYear}&deleted_ne=true&user.userType=${this.dataFrom}`;
        await this.$store.dispatch("publication/setPublicationsData", {
          qs: queryString,
        });
      }
      this.loading = false;
      // console.log(JSON.stringify(this.participationsData));
    },
    close() {
      this.dialog = false;
    },
    async save(publication) {
      var payload = publication;
      console.log(payload);
      await this.$store.dispatch("publication/updatePublication", payload);

      if (this.$store.state.publication.publicationsData.success) {
        this.reloadData();
        this.editedItem = Object.assign({}, this.emptyPublication);
        this.publication = Object.assign({}, this.emptyPublication);
        this.close();
      }
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
