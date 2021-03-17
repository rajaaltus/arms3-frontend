<template>
  <v-expansion-panels accordion multiple>
    <v-expansion-panel>
      <v-expansion-panel-header>
        <h2 class="font-weight-bold">
          <v-icon color="amber darken-3" class="mdi mdi-bookshelf mr-3"></v-icon
          >Publications
        </h2>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-row v-for="(item, index) in publicationsData" :key="index">
          <v-col cols="12" lg="12">
            <v-card tile elevation="0" class="my-card pb-5" style="border-bottom:1px solid #ccc;">
              <v-chip label x-small color="amber darken-5" dark>
                {{ item.publication_type }}
              </v-chip>

              <template v-if="item.publication_type == 'Journal_Article'">
                <span class="body-2 font-weight-bold">{{
                  item.article_title
                }}</span
                ><br />
                <span class="body-2 font-weight-light">{{ item.authors }}.</span
                ><br />
                <span class="body-2 font-weight-light">{{
                  item.journal_title
                }}</span>
                <span
                  v-if="item.pub_date !== 'null'"
                  class="body-2 font-weight-light"
                  >{{ item.pub_date }};</span
                >
                <span
                  v-if="item.volume_no !== 'null'"
                  class="body-2 font-weight-light"
                  >{{ item.volume_no }}:</span
                >
                <span
                  v-if="item.pages !== 'null'"
                  class="body-2 font-weight-light"
                  >{{ item.pages }}.</span
                ><br />
                <v-btn
                  v-if="item.pmid !== 'null'"
                  label
                  class="mt-2"
                  x-small
                  color="grey lighten-4"
                >
                  PubMed ID: {{ item.pmid }}
                </v-btn>
              </template>
              <template
                v-else-if="
                  item.publication_type == 'Articles_for_Professionals'
                "
              >
                <span class="body-2 font-weight-bold">{{
                  item.article_title
                }}</span
                ><br />
                <span class="body-2 font-weight-light">{{ item.authors }}.</span
                ><br />
                <span class="body-2 font-weight-light">{{
                  item.journal_title
                }}</span>
                <span
                  v-if="item.pub_date !== 'null'"
                  class="body-2 font-weight-light"
                  >{{ item.pub_date }};</span
                >
                <span
                  v-if="item.volume_no !== 'null'"
                  class="body-2 font-weight-light"
                  >{{ item.volume_no }}:</span
                >
                <span
                  v-if="item.pages !== 'null'"
                  class="body-2 font-weight-light"
                  >{{ item.pages }}.</span
                >
              </template>
              <template v-else-if="item.publication_type == 'Book'">
                <span class="body-2 font-weight-bold">{{
                  item.book_title
                }}</span
                ><br />
                <span class="body-2 font-weight-light">{{ item.authors }}.</span
                ><br />
                <span
                  v-if="item.edition !== 'null'"
                  class="body-2 font-weight-light"
                  >{{ item.edition }}.</span
                >
                <span
                  v-if="item.place !== 'null'"
                  class="body-2 font-weight-light"
                  >{{ item.place }};</span
                >
                <span
                  v-if="item.publisher !== 'null'"
                  class="body-2 font-weight-light"
                  >{{ item.publisher }}:</span
                >
                <span
                  v-if="item.year !== 'null'"
                  class="body-2 font-weight-light"
                  >{{ item.year }}.</span
                >
              </template>
              <template v-else-if="item.publication_type == 'Book_Chapter'">
                <span class="body-2 font-weight-bold">{{
                  item.chapter_title
                }}</span
                ><br />
                <span class="body-2 font-weight-light"
                  >{{ item.authors }}; Editors: {{ item.editor_names }}.</span
                ><br />
                <span
                  v-if="item.edition !== 'null'"
                  class="body-2 font-weight-light"
                  >{{ item.edition }}.</span
                >
                <span
                  v-if="item.place !== 'null'"
                  class="body-2 font-weight-light"
                  >{{ item.place }};</span
                >
                <span
                  v-if="item.publisher !== 'null'"
                  class="body-2 font-weight-light"
                  >{{ item.publisher }}:</span
                >
                <span
                  v-if="item.year !== 'null'"
                  class="body-2 font-weight-light"
                  >{{ item.year }}.</span
                >
              </template>
              <template v-else>
                <span class="body-2 font-weight-bold">{{
                  item.article_title
                }}</span
                ><br />
                <span class="body-2 font-weight-light">{{ item.authors }}</span
                ><br />
                <span
                  v-if="item.edition !== 'null'"
                  class="body-2 font-weight-light"
                  >{{ item.edition }}.</span
                >
                <span
                  v-if="item.place !== 'null'"
                  class="body-2 font-weight-light"
                  >{{ item.place }};</span
                >
                <span
                  v-if="item.publisher !== 'null'"
                  class="body-2 font-weight-light"
                  >{{ item.publisher }}:</span
                >
                <span
                  v-if="item.year !== 'null'"
                  class="body-2 font-weight-light"
                  >{{ item.year }}.</span
                >
              </template>
            </v-card>
          </v-col>
        </v-row>
      </v-expansion-panel-content>
    </v-expansion-panel>

    <v-expansion-panel>
      <v-expansion-panel-header>
        <h2 class="font-weight-bold">
          <v-icon color="cyan darken-3" class="mdi mdi-crown mr-3"></v-icon
          >Awards &amp; Honors
        </h2>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-row v-for="(item, index) in recognitionsData" :key="index">
          <v-col cols="12" md="12" lg="12">
            <v-card tile elevation="0" class="mx-auto" style="border-bottom:1px solid #ccc;">
              <v-list-item three-line>
                <v-list-item-content>
                  <div class="overline mb-4">{{ $moment(item.date).format("DD MMM YYYY") }}</div>
                 
                  <v-list-item-subtitle
                    > <span class="body-2 font-weight-normal">
                    <b>{{ item.award_title }}</b> from {{ item.organization }},
                    {{ item.place }}. </span
                  >
                    </v-list-item-subtitle
                  >
                </v-list-item-content>

                <v-list-item-avatar
                  tile
                  size="80"
                >
                <v-img
                    :src="
                      item.image !== null && item.image !== undefined
                        ? $axios.defaults.baseURL + item.image.url
                        : '/award_ph.jpg'
                    "
                    lazy-src="/award_ph.jpg"
                    aspect-ratio="1"
                    class="grey lighten-2 expandimg"
                    max-width="200"
                    max-height="120"
                  >
                </v-img>
                </v-list-item-avatar>
              </v-list-item>
            </v-card>
          </v-col>
        </v-row>
      </v-expansion-panel-content>
    </v-expansion-panel>

    <v-expansion-panel>
      <v-expansion-panel-header>
        <h2 class="font-weight-bold">
          <v-icon color="amber darken-3" class="mdi mdi-billboard mr-3"></v-icon
          >Presentations / Posters
        </h2>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-row v-for="(item, index) in presentationsData" :key="index">
          <v-col cols="12" md="12" lg="12">
            <v-card flat class="my-card">
              <v-row>
                <v-col cols="3" md="3" lg="3">
                  <v-img
                    :src="
                      item.image !== null && item.image !== undefined
                        ? $axios.defaults.baseURL + item.image.url
                        : '/presentation_ph.jpg'
                    "
                    lazy-src="/presentation_ph.jpg"
                    aspect-ratio="1"
                    class="grey lighten-2"
                    max-width="200"
                    max-height="120"
                  >
                    <template v-slot:placeholder>
                      <v-row
                        class="fill-height ma-0"
                        align="center"
                        justify="center"
                      >
                        <v-progress-circular
                          indeterminate
                          color="grey lighten-5"
                        ></v-progress-circular>
                      </v-row>
                    </template>
                  </v-img>
                </v-col>
                <v-col cols="9" md="9" lg="9">
                  <v-btn label class="mb-2" x-small color="green darken-2" dark>
                    {{ item.type }}
                  </v-btn>
                  <v-btn label class="mb-2" x-small color="green lighten-4">
                    {{ item.forum }} </v-btn
                  ><br />
                  <span class="body-2 font-weight-normal">
                    {{ item.title }}</span
                  ><br />
                  <span
                    v-if="item.faculty_name !== 'null'"
                    class="body-2 font-weight-normal"
                  >
                    {{ item.faculty_name }}.</span
                  ><br />
                  <span
                    v-if="item.coauthors !== ''"
                    class="body-2 font-weight-normal"
                  >
                    Co-Authors: {{ item.coauthors }}</span
                  >
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-expansion-panel-content>
    </v-expansion-panel>

    <v-expansion-panel>
      <v-expansion-panel-header>
        <h2 class="font-weight-bold">
          <v-icon
            color="light-green darken-3"
            class="mdi mdi-atom mr-3"
          ></v-icon
          >Participations
        </h2>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-row v-for="(item, index) in participationsData" :key="index">
          <v-col cols="12" md="12" lg="12">
            <v-card flat class="my-card">
              <v-row>
                <v-col cols="3" md="3" lg="3">
                  <v-img
                    :src="
                      item.image !== null && item.image !== undefined
                        ? $axios.defaults.baseURL + item.image.url
                        : '/participation_ph.jpg'
                    "
                    lazy-src="/participation_ph.jpg"
                    aspect-ratio="1"
                    class="grey lighten-2"
                    max-width="200"
                    max-height="120"
                  >
                    <template v-slot:placeholder>
                      <v-row
                        class="fill-height ma-0"
                        align="center"
                        justify="center"
                      >
                        <v-progress-circular
                          indeterminate
                          color="grey lighten-5"
                        ></v-progress-circular>
                      </v-row>
                    </template>
                  </v-img>
                </v-col>
                <v-col cols="9" md="9" lg="9">
                  <v-btn label class="mb-2" x-small color="green lighten-3">
                    {{ item.forum }}
                  </v-btn>
                  <v-btn label class="mb-2" x-small color="green lighten-4">
                    From {{ item.from_date }} to {{ item.to_date }} </v-btn
                  ><br />
                  <span class="body-2 font-weight-normal">
                    {{ item.program_name }}</span
                  ><br />
                  <span
                    v-if="item.faculty_name !== 'null'"
                    class="body-2 font-weight-normal"
                  >
                    {{ item.faculty_name }}.</span
                  ><br />
                  <v-btn label class="mt-2" x-small v-if="item.place !== ''"
                    >Place: {{ item.place }}</v-btn
                  >
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-expansion-panel-content>
    </v-expansion-panel>

    <v-expansion-panel>
      <v-expansion-panel-header>
        <h2 class="font-weight-bold">
          <v-icon color="pink darken-3" class="mdi mdi-book-lock mr-3"></v-icon
          >Patents
        </h2>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-row v-for="(item, index) in patentsData" :key="index">
          <v-col cols="12" md="12" lg="12">
            <v-card flat class="my-card">
              <v-row>
                <v-col cols="12" md="12" lg="12">
                  <v-btn label class="mb-2" x-small color="green lighten-3">
                    {{ item.registration_no }} </v-btn
                  ><br />
                  <span class="body-2 font-weight-normal">
                    {{ item.title }}</span
                  ><br />
                  <span class="body-2 font-weight-normal">
                    {{ item.brief_report }}</span
                  >
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
export default {
  props: [
    "publicationsData",
    "recognitionsData",
    "presentationsData",
    "participationsData",
    "patentsData",
  ],
};
</script>
