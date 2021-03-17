<template>
  <div class="text-center">
    <v-bottom-sheet v-model="sheet" persistent>
      <v-list  tile>
        <v-subheader><span class="subtitle-1 font-weight-normal">Available reports for the selected reporting year. Click to download or close this window to create the new report.</span>
        <v-layout align-end justify-end>
        <v-btn
          class="mt-0"
          x-small
          fab
          dark
          color="red darken-3"
          @click="sheet = !sheet"
        >
        <v-icon>mdi-close</v-icon>
        </v-btn>
        </v-layout>
        </v-subheader>
        <v-list-item
          v-for="tile in availableReports"
          :key="tile.id"
          @click="handleClick(tile.id, tile.userType)"
        >
          <v-list-item-avatar>
            <v-avatar size="32px" tile>
              <img
                :src="`https://img.icons8.com/color/48/000000/microsoft-word-2019--v2.png`"
                :alt="tile.annual_year"
              />
            </v-avatar>
          </v-list-item-avatar>
          <v-list-item-title>
            <span class="body-2 font-weight-normal">{{ tile.userType }} Report for the year of {{ tile.annual_year }} - {{ tile.annual_year+1 }}</span>
            </v-list-item-title>
        </v-list-item>
      </v-list>
       <div id="savedDoc" v-if="savedDoc" v-html="formattedDoc" style="display:none"></div>
    </v-bottom-sheet>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  props: ['availableReports'],
  data: () => ({
    sheet: true,
    tiles: [

      { img: 'keep.png', title: 'Keep' },
      { img: 'inbox.png', title: 'Inbox' },
      { img: 'hangouts.png', title: 'Hangouts' },
      { img: 'messenger.png', title: 'Messenger' },
      { img: 'google.png', title: 'Google+' },
    ],
  }),
  computed: {
    ...mapState({
      savedDoc: state => state.report.generatedReport
    }),
    formattedDoc() {
      var final = '';
      if(this.savedDoc)
        final = this.savedDoc.section_a;
      if(this.savedDoc.section_b!==null)
        final += this.savedDoc.section_b
      if(this.savedDoc.section_c!==null)
        final += this.savedDoc.section_c
      if(this.savedDoc.section_d!==null)
        final += this.savedDoc.section_d
      if(this.savedDoc.section_e!==null)
        final += this.savedDoc.section_e
      if(this.savedDoc.section_f!==null)
        final += this.savedDoc.section_f
      return final;
    }
  },
  methods: {
    async handleClick(id,userType) {
      await this.$store.dispatch('report/getById', {id: id})
      this.exportToDoc(`Saved-${userType}`)

    },
    exportToDoc(filename = "") {
    var preHtml =
      "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
    var postHtml = "</body></html>";
    var html =
      // preHtml + document.getElementsByClassName('ProseMirror')[0].innerHTML + postHtml;
      preHtml + document.getElementById("savedDoc").innerHTML + postHtml;

    var blob = new Blob(["\ufeff", html], {
      type: "application/msword",
    });

    // Specify link url
    var url =
      "data:application/vnd.ms-word;charset=utf-8," +
      encodeURIComponent(html);

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
  }

}
</script>
