<template>
  <v-app>
    <div v-if="codeGreen">
      <Header />
      <MenuBar :userProfile="userProfile" />

      <v-container>
        <v-row>
          <PublicProfileCard :userProfile="userProfile" />

          <v-col cols="12" md="7" lg="7" class="pro-content">
            <PublicProfilePublication v-if="total>0"
              :publicationTypeCounts="publicationTypeCounts"
              :total="total"
            />

            <PublicProfileQualification :qualifications="qualifications" />

            <PublicProfileExperience :experiences="experiences" />

            <PublicProfileExpansion
              :publicationsData="publicationsData"
              :recognitionsData="recognitionsData"
              :presentationsData="presentationsData"
              :participationsData="participationsData"
              :patentsData="patentsData"
            />
          </v-col>

          <v-col cols="12" md="2" lg="2">
            <v-icon>mdi-account-multiple</v-icon>
            <span class="body-2 font-weight-normal"> Same Department</span>
            <!-- {{sameDepartmentProfiles}} -->
            <v-list>
              <v-list-item
                v-for="item in sameDepartmentProfiles"
                :key="item.id"
              >
                <v-list-item-avatar>
                  <v-img
                    :src="
                      item.image
                        ? `${$axios.defaults.baseURL}${item.image.url}`
                        : '/avatar-default-icon.png'
                    "
                  ></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title v-text="item.name"></v-list-item-title>
                </v-list-item-content>

                <v-list-item-icon>
                  <nuxt-link :to="`/profile/${item.employee_id}`">
                    <v-icon
                      :color="item.active ? 'deep-purple accent-4' : 'grey'"
                      >mdi-eye</v-icon
                    ></nuxt-link
                  >
                </v-list-item-icon>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <div v-else>
      <Header />
      <v-container>
        <v-row class="mt-4">
          <h1>Profile Not found or Access denied</h1>
        </v-row>
      </v-container>
    </div>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
export default {
  layout: "profile",
  auth: false,
  data() {
    return {
      codeGreen: false
    };
  },
  computed: {
    ...mapState({
      userProfile: (state) => state.user.publicProfile,
      qualifications: (state) => state.profile.educationData.result,
      experiences: (state) => state.profile.experienceData.result,
      recognitionsData: (state) => state.recognition.recognitionsData.result,
      presentationsData: (state) => state.presentation.presentationsData.result,
      participationsData: (state) => state.participation.participationsData.result,
      publicationsData: (state) => state.publication.publicationsData.result,
      researchData: (state) => state.research.researchData.result,
      patentsData: (state) => state.patent.patentsData.result,
      stats: (state) => state.publication.stats,

      journalArticles() {
        var result = this.$store.state.publication.publicationsData.result.filter(
          (publication) => publication.publication_type === "Journal_Article"
        ).length;
        return result;
      },
      articles() {
        var result = this.$store.state.publication.publicationsData.result.filter(
          (publication) =>
            publication.publication_type === "Articles_for_Professionals"
        ).length;
        return result;
      },
      books() {
        var result = this.$store.state.publication.publicationsData.result.filter(
          (publication) => publication.publication_type === "Book"
        ).length;
        return result;
      },
      bookChapters() {
        var result = this.$store.state.publication.publicationsData.result.filter(
          (publication) => publication.publication_type === "Book_Chapter"
        ).length;
        return result;
      },
      monoGraphs() {
        var result = this.$store.state.publication.publicationsData.result.filter(
          (publication) => publication.publication_type === "Monograph"
        ).length;
        return result;
      },
      manuals() {
        var result = this.$store.state.publication.publicationsData.result.filter(
          (publication) => publication.publication_type === "Manual"
        ).length;
        return result;
      },
      reports() {
        var result = this.$store.state.publication.publicationsData.result.filter(
          (publication) => publication.publication_type === "Report"
        ).length;
        return result;
      },
      general() {
        var result = this.$store.state.publication.publicationsData.result.filter(
          (publication) =>
            publication.publication_type === "Article_for_General_public"
        ).length;
        return result;
      },
      people() {
        return this.$store.state.user.activeUsersList.result;
      },
      publicationTypeCounts() {
        var counts=[];
        counts.push(this.journalArticles, this.articles, this.books, this.bookChapters, this.monoGraphs, this.manuals, this.reports, this.general);
        return counts;
      },
      total()
      {
        return this.$store.state.publication.publicationsData.result.length;
      },
      reportYears() {
        return this.$store.state.reportYears;
      },
    }),
    sameDepartmentProfiles() {
      return this.$store.state.user.sameDepartmentProfiles.filter(
        (profile) => profile.id != this.userProfile.id
      );
    },
  },
  async fetch({ store, params }) {
    let empId = params.id;
    await store.dispatch("user/setPublicUserProfile", {
      id: empId,
    });

    if (store.state.user.publicProfile)
      var userId = store.state.user.publicProfile.user.id;
    else {
      this.codeGreen = false;
    }

    await store.dispatch("user/setSameDepartmentProfiles", {
      id: store.state.user.publicProfile.user.department,
    });
    await store.dispatch("profile/setEducationData", { id: userId });
    await store.dispatch("profile/setExperienceData", { id: userId });
    let queryString = "";
    queryString = `user.id=${userId}&deleted_ne=true`;
    await store.dispatch("recognition/setRecognitionsData", {
      qs: queryString,
    });
    await store.dispatch("presentation/setPresentationsData", {
      qs: queryString,
    });
    await store.dispatch("participation/setParticipationsData", {
      qs: queryString,
    });
    await store.dispatch("research/setResearchData", { qs: queryString });
    await store.dispatch("patent/setPatentsData", { qs: queryString });
    await store.dispatch("publication/setPublicationsData", {
      qs: queryString,
    });
  },
  mounted() {
    if (this.$store.state.user.publicProfile) {
      this.codeGreen = true;
    } else {
      this.codeGreen = false;
    }
  },
};
</script>

<style>
.pro-content {
  margin: 10px 0 0 0;
  /* padding: 0px; */
  background-color: #f9f9f9;
}
a {
  text-decoration: none !important;
}
</style>
