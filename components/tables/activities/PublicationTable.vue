<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="publicationsData"
      sort-by="updated_at"
      sort-desc
      class="elevation-1"
      :loading="loading"
      loading-text="Loading... Please wait"
    >
      <template v-slot:[`item.updated_at`]="{ item }">
        {{ $moment(item.updated_at).fromNow() }}
      </template>
      <template v-slot:[`item.publicationTypeId`]="{ item }">
        {{ getPublicationType(item.publicationTypeId) }}
      </template>
      <template v-slot:top>
          <v-toolbar
          flat
          color="#ebebeb"
          class="d-flex justify mt-4 pt-1"
          style="border-radius:0;"
        >
          <v-toolbar-title
            ><span class="frm-title">Publications</span></v-toolbar-title
          >
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-select
            v-model="annualYear"
            :items="reportYears"
            item-text="val"
            item-value="id"
            label="Reporting Year"
            required
            class="justify-end mt-6"
            color="success"
            @change="reloadData()"
          ></v-select>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-tooltip right color="blue-grey darken-2">
            <template v-slot:activator="{ on }">
              <v-btn
                x-small
                fab
                color="green"
                dark
                @click="reloadData"
                v-on="on"
              >
                <v-icon>mdi-reload</v-icon>
              </v-btn>
            </template>
            <span>Reload Data</span>
          </v-tooltip>
          <v-dialog
            v-model="dialog"
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
          >
            <v-card>
              <v-toolbar dark color="#41704e">
                <v-btn icon dark @click="close">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>Publications | Update Details</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                  <v-btn dark text @click="save">
                    Save
                  </v-btn>
                  <v-btn dark text @click="dialog = false">
                    Cancel
                  </v-btn>
                </v-toolbar-items>
              </v-toolbar>
              <v-card-text>
                <v-container>
                  <v-form
                    ref="editForm"
                    v-model="valid"
                    lazy-validation
                    @submit.prevent
                  >
                    <v-container>
                      <v-row>
                        <v-col v-if="publication_type == 1" cols="3">
                          <v-row justify="space-around">
                            <v-text-field
                              v-model="editedItem.pmid"
                              label="Enter PMID to auto-fetch data / Publication ID *"
                              required
                              @blur="fetchArticle"
                            >
                            </v-text-field>
                            <v-dialog
                              v-model="loaderdialog"
                              hide-overlay
                              persistent
                              width="300"
                            >
                              <v-card color="primary" dark>
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
                          </v-row>
                        </v-col>
                        <v-col v-if="publication_type <= 4" cols="4">
                          <v-select
                            v-model="editedItem.classification"
                            :items="classifications"
                            item-text="name"
                            item-value="value"
                            :rules="[v => !!v || 'Item is required']"
                            label="Classification *"
                            required
                          >
                          </v-select>
                        </v-col>
                        <v-col v-if="publication_type == 1" cols="12">
                          <v-text-field
                            v-model="editedItem.authors"
                            label="Name of the Author(s) *"
                            single-line
                          ></v-text-field>
                        </v-col>
                        <v-col v-if="publication_type >= 2" cols="12">
                          <v-text-field
                            v-model="editedItem.authors"
                            :rules="[v => !!v || 'Item is required']"
                            label="Name of the Author(s) *"
                            required
                          >
                          </v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            v-if="publication_type == 1"
                            v-model="editedItem.journal_title"
                            label="Title *"
                            required
                          >
                          </v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            v-if="publication_type == 2"
                            v-model="editedItem.article_title"
                            label="Title *"
                            required
                          >
                          </v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            v-if="publication_type == 3"
                            v-model="editedItem.book_title"
                            label="Book Title *"
                            required
                          >
                          </v-text-field>
                        </v-col>
                        <v-col v-if="publication_type == 4" cols="6">
                          <v-text-field
                            v-model="editedItem.chapter_title"
                            label="Title of the chapter *"
                            required
                          >
                          </v-text-field>
                        </v-col>
                        <v-col v-if="publication_type > 4" cols="6">
                          <v-text-field
                            v-model="editedItem.article_title"
                            label="Title *"
                            required
                          >
                          </v-text-field>
                        </v-col>
                        <v-col v-if="publication_type == 4" cols="6">
                          <v-text-field
                            v-model="editedItem.editor_names"
                            label="Name of the Editor *"
                            required
                          >
                          </v-text-field>
                        </v-col>
                        <v-col v-if="publication_type == 1" cols="4">
                          <v-text-field
                            v-model="editedItem.article_title"
                            label="Title of Journal (With standard Abbrevation) *"
                            required
                          >
                          </v-text-field>
                        </v-col>
                        <v-col v-if="publication_type == 2" cols="4">
                          <v-text-field
                            v-model="editedItem.journal_title"
                            label="Title of Journal (With standard Abbrevation) *"
                            required
                          >
                          </v-text-field>
                        </v-col>
                        <v-col v-if="publication_type == 1" cols="4">
                          <v-text-field
                            v-model="editedItem.pub_date"
                            label="Publication Date *"
                            required
                            readonly
                          >
                          </v-text-field>
                        </v-col>
                        <v-col v-if="publication_type == 2" cols="4">
                          <v-text-field
                            v-model="editedItem.pub_date"
                            label="Publication Date *"
                            required
                          >
                          </v-text-field>
                        </v-col>
                        <v-col v-if="publication_type == 1" cols="2">
                          <v-text-field
                            v-model="editedItem.volume_no"
                            label="Volume / Issue No"
                            required
                          >
                          </v-text-field>
                        </v-col>
                        <v-col v-if="publication_type == 2" cols="2">
                          <v-text-field
                            v-model="editedItem.volume_no"
                            label="Volume / Issue No"
                            required
                          >
                          </v-text-field>
                        </v-col>
                        <v-col v-if="publication_type > 2" cols="6">
                          <v-text-field
                            v-model="editedItem.edition"
                            label="Edition *"
                            required
                          >
                          </v-text-field>
                        </v-col>
                        <v-col v-if="publication_type > 2" cols="6">
                          <v-text-field
                            v-model="editedItem.place"
                            label="Place *"
                            required
                          >
                          </v-text-field>
                        </v-col>
                        <v-col v-if="publication_type > 2" cols="6">
                          <v-text-field
                            v-model="editedItem.publisher"
                            label="Publisher *"
                            required
                          >
                          </v-text-field>
                        </v-col>
                        <v-col v-if="publication_type > 2" cols="6">
                          <v-text-field
                            v-model="editedItem.year"
                            label="Year *"
                            required
                          >
                          </v-text-field>
                        </v-col>
                        <v-col v-if="publication_type == 1" cols="2">
                          <v-text-field
                            v-model="editedItem.pages"
                            value="jouralArticle.pages"
                            label="Pages"
                          >
                          </v-text-field>
                        </v-col>
                        <v-col v-if="publication_type == 2" cols="2">
                          <v-text-field
                            v-model="editedItem.pages"
                            label="Pages"
                          >
                          </v-text-field>
                        </v-col>
                        <v-spacer></v-spacer>
                        <v-btn
                          small
                          class="mx-3 my-5"
                          color="success"
                          @click="editedComposeReference"
                        >
                          Compose Reference
                        </v-btn>
                        <v-col cols="12">
                          <v-textarea
                            v-model="editedItem.reference"
                            filled
                            label="Reference *"
                            placeholder="Example: TAndrade C, Prasad Y, Devaraj A, Pinto EF, Shukla L. ECT and Pronounced Impairment in Spatial
Cognition: The Fallacy of Drawing Conclusions from a Single Case. J ECT. 2018 Jun;34(2):75–7."
                            :value="editedItem.reference"
                          ></v-textarea>
                        </v-col>
                      </v-row>
                      <span style="color:red; font-size:12px;"
                        >* Mandatory fields</span
                      >
                    </v-container>
                  </v-form>
                </v-container>
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.action`]="{ item }">
        <v-icon centre @click="editItem(item)" color="green"
          >mdi-pencil-box</v-icon
        >
        <v-icon centre @click="deleteItem(item)" color="error"
          >mdi-delete-circle</v-icon
        >
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
    loading: false,
    valid: false,
    dialog: false,
    publication_type: 0,
    annualYear: 0,
    headers: [
			{
				text: 'Last updated',
				align: 'left',
				value: 'updated_at',
			},
      { text: 'Type of Publication', value: 'publication_type' },
      { text: 'Calssification', value: 'classification' },
			{ text: 'Reference', value: 'reference', width: '60%' },
			{ text: 'Actions', value: 'action', sortable: false },
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
      rejected_reason: null
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
      rejected_reason: null
    },
    editedJournal: {
			title: null,
			fulljournalname: null,
			epubdate: '',
			volume: '',
			pages: ''
		},
    authors: [],
    loaderdialog: false,
		classifications: ['International', 'National', 'NotApplicable', 'Others'],
  }),
  computed: {
    ...mapState({
      publicationsData: state => state.publication.publicationsData.result,
      staffs: state => state.staffs,
      publicationTypes: state => state.publication.publicationTypes,
			journalArticles: state => state.publication.journalArticle,
    }),
    studentsData() {
      return this.publicationsData.filter(publication => publication.user.userType==='STUDENT')
    },
    facultiesData() {
      return this.publicationsData.filter(publication => publication.user.userType==='FACULTY')
    }
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    loaderdialog (val) {
			val || this.close()
		},
  },
  async fetch({ store }) {
    let queryString = "";
    if (
      store.state.auth.user.userType === "FACULTY" ||
      store.state.auth.user.userType === "STUDENT"
    ) {
      queryString = `department.id=${store.state.auth.user.department}&user.id=${this.$auth.user.id}&annual_year=${store.state.selectedYear}&deleted_ne=true`;
      // console.log(queryString);
      await store.dispatch("publication/setPublicationsData", {
        qs: queryString
      });
    } else {
      queryString = `department.id=${store.state.auth.user.department}&annual_year=${store.state.selectedYear}&deleted_ne=true`;
      await store.dispatch("publication/setPublicationsData", {
        qs: queryString
      });
    }
  },
  mounted() {
    this.annualYear = this.$store.state.selectedYear;
    this.reloadData();
    this.$store.dispatch('publication/setPublicationTypes');
  },
  methods: {
    handleclick(item)
    {
      var index = this.publicationsData.indexOf(item);
      if(item.approval_status === 'Rejected')
      {
       Swal.fire({
         title:'Reason for Rejection',
         text:this.publicationsData[index].rejected_reason,
       });
      }
    },
    dateValidate (date) {
			if (date) {
				this.journalArticle.epubdate = this.$moment(date).format('YYYY MMM DD');
			}
		},
		dateValidate1 (date) {
			if (date) {
				this.publication.pub_date = this.$moment(date).format('YYYY-MM-DD');
			}
    },
    getPublicationType (id) {
			return this.publicationTypes[id-1].publicationType;
    },
    async fetchArticle () {
			var pmid = this.publication.pmid
			this.loaderdialog = true
			this.$store.dispatch('publication/setJournalArticle', {id: pmid})
				.then(resp => {
					this.journalArticle = Object.assign({}, this.$store.state.publication.journalArticle);
					// this.authors = this.journalArticle.authors;
					console.log(this.journalArticle);
					var authors = []
					this.journalArticle.authors.forEach(function (item, index) {
						authors.push(item.name)
					})
					this.authors = authors;
					if (this.$store.state.publication.journalArticle.epubdate === '')
						this.journalArticle.epubdate = ''
					if (this.$store.state.publication.journalArticle.volume === '')
						this.journalArticle.volume = ''
					if (this.$store.state.publication.journalArticle.pages === '')
						this.journalArticle.pages = ''
					this.loaderdialog = true;
				})
				.catch(err => {
					this.snackbar = true
					this.submitMessage = 'No data found!'
					this.journalArticle = Object.assign({}, this.editedJournal);
				})
				.finally(()=> (
					this.loaderdialog = false
				))
    },
    editedComposeReference () {
			if(this.publication_type==1)
				this.editedItem.reference = this.editedItem.authors + '. ' + this.editedItem.journal_title + ' ' + this.editedItem.article_title + ' ' + this.$moment(this.editedItem.publicationDate).format('YYYY MMM DD') + ';' + this.editedItem.volume_no + ':' + this.editedItem.pages;
			if(this.publication_type==2)
				this.editedItem.reference = this.editedItem.authors + '. ' + this.editedItem.article_title + '. ' +  this.editedItem.journal_title + '. ' + this.editedItem.pub_date + ':' + this.editedItem.pages;
			if(this.publication_type==3)
				this.editedItem.reference = this.editedItem.authors + '. ' + this.editedItem.book_title + '. ' +  this.editedItem.edition + '. ' + this.editedItem.edition + ':' + this.editedItem.publisher + ';' + this.editedItem.year;
			if(this.publication_type==4)
				this.editedItem.reference = this.editedItem.authors + '. ' + this.editedItem.chapter_title + '. In: ' +  this.editedItem.editor_names + '. ' + this.editedItem.book_title + '.' + this.editedItem.edition + '.' + this.editedItem.place + ':' + this.editedItem.publisher + ';' + this.editedItem.year;
			if(this.publication_type>4)
				this.editedItem.reference = this.editedItem.authors + '. ' + this.editedItem.article_title + '.' + this.editedItem.edition + '.' + this.editedItem.place + ':' + this.editedItem.publisher + ';' + this.editedItem.year;
		},
    editItem (item) {
			this.editedIndex = this.publicationsData.indexOf(item)
			this.editedItem = Object.assign({}, item)
			if(this.editedItem.publication_type==='Journal_Article')
				this.publication_type = 1;
			if(this.editedItem.publication_type==='Articles_for_Professionals')
				this.publication_type = 2;
			if(this.editedItem.publication_type==='Book')
				this.publication_type = 3;
			if(this.editedItem.publication_type==='Book_Chapter')
				this.publication_type = 4;
			if(this.editedItem.publication_type==='Monograph')
				this.publication_type = 5;
			if(this.editedItem.publication_type==='Manual')
				this.publication_type = 6;
			if(this.editedItem.publication_type==='Report')
				this.publication_type = 7;
			if(this.editedItem.publication_type==='Article_for_General_public')
				this.publication_type = 8;

			this.dialog = true
		},
    deleteItem (item) {
			 const index = this.publicationsData.indexOf(item)
			 this.deletedItem = Object.assign({}, item)
			// confirm('Are you sure you want to delete this item?') && this.programmesData.splice(index, 1)
			this.deletedItem.deleted = true
			var payload = this.deletedItem;
			// console.log(payload);
			var vm = this;
			confirm('Are you sure you want to delete this item?') && 	this.$store.dispatch('publication/updatePublication', payload)
				.then(resp => {
					Swal.fire({
						
						title: 'Success',
						text: 'Deleted Successfully!',
						icon: 'success',
						showConfirmButton: false,
						timer: 1500
					})
					this.reloadData();
				})
				.catch(err => {
					this.snackbar = true
					this.submitMessage = err
				});
    },
    async reloadData() {
      this.loading = true;
      

      if (
        this.$store.state.auth.user.userType === "FACULTY" ||
        this.$store.state.auth.user.userType === "STUDENT"
      ) {
        let queryString = "";
        queryString = `department.id=${this.$auth.user.department}&user.id=${this.$auth.user.id}&deleted_ne=true&annual_year=${this.annualYear}`;
        await this.$store.dispatch("publication/setPublicationsData", {
          qs: queryString
        });
      } else {
        let queryString = "";
        queryString = `department.id=${this.$auth.user.department}&annual_year=${this.annualYear}&deleted_ne=true`;
        await this.$store.dispatch("publication/setPublicationsData", {
          qs: queryString
        });
      }
      this.loading = false;
      // console.log(JSON.stringify(this.participationsData));
    },
    close() {
      this.dialog = false;
      this.image_url = '/image_placeholder.png';
    },
    save () {
			if (this.editedIndex > -1) {
				// Object.assign(this.program[this.editedIndex], this.editedItem)
				this.editedItem.user = this.editedItem.user.id;
				this.editedItem.department = this.editedItem.department.id;
				var payload = this.editedItem;
				console.log(payload);
			 	this.$store.dispatch('publication/updatePublication', payload)
					.then(resp => {
						this.dialog = false;
						Swal.fire({
							title: 'Success',
							text: 'Updated Successfully!',
							icon: 'success',
							showConfirmButton: false,
							timer: 1500
						})
						this.reloadData();
						this.editedItem = Object.assign({}, this.emptyPublication);
						this.publication = Object.assign({}, this.emptyPublication);
					})
					.catch(err => {
						this.snackbar = true
						this.submitMessage = err
					});
			} else {
				// this.program.push(this.editedItem)
				// console.log(this.publicationsData.push(this.editedItem))
			}
			this.close()
		}
  }
};
</script>

<style scoped>
.frm-title {
  border-left: 5px solid #e16949;
  padding: 3px 10px;
}
</style>
