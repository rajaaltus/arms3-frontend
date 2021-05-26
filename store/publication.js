const limit = "&_limit=1000";
import Swal from "sweetalert2";
export const state = () => ({
  publicationsData: {
    success: false,
    result: [],
    error: {},
  },
  publicationTypes: {},
  journalArticle: [],
  publicationsCount: null,
  stats: [],
});

export const getters = {
  publicationsData(state) {
    return state.publicationsData;
  },
  publicationTypes(state) {
    return state.publicationTypes;
  },
};

export const mutations = {
  SET_STATS(state, response) {
    state.stats.push(response);
  },
  ADD_TO_PUBLICATIONSDATA(state, response) {
    state.publicationsData.success = true;
    state.publicationsData.result.push(response);
  },
  SET_PUBLICATIONSDATA(state, publicationsData) {
    if (publicationsData && Array.isArray(publicationsData)) {
      state.publicationsData.success = true;
      state.publicationsData.result = publicationsData;
      state.publicationsData.error = {};
    } else {
      // console.log('error'+publicationsData);
      state.publicationsData.success = false;
      state.publicationsData.error = {
        message: {
          message: "Error occured!",
        },
      };
    }
  },
  SET_PUBLICATIONS_COUNT(state, publicationsCount) {
    state.publicationsCount = publicationsCount;
  },
  SET_PUBLICATIONTYPES(state, publicationTypes) {
    state.publicationTypes = [
      {
        id: 1,
        value: "Journal_Article",
        text: "Journal Article",
      },
      {
        id: 2,
        value: "Articles_for_Professionals",
        text: "Articles for Professionals in Souvenirs Newsletters etc",
      },
      {
        id: 3,
        value: "Book",
        text: "Book",
      },
      {
        id: 4,
        value: "Book_Chapter",
        text: "Book Chapter",
      },
      {
        id: 5,
        value: "Monograph",
        text: "Monograph",
      },
      {
        id: 6,
        value: "Manual",
        text: "Manual",
      },
      {
        id: 7,
        value: "Report",
        text: "Report",
      },
      {
        id: 8,
        value: "Article_for_General_public",
        text: "Article for General public or IEC Materials",
      },
    ];
  },
  SET_JOURNALARTICLE(state, journalArticle) {
    state.journalArticle = journalArticle;
  },
  RESET_STATS(state, response) {
    state.stats = response;
    console.log("resetted:" + state.stats);
  },
  INIT_ERROR(state) {
    state.publicationsData.success = false;
    state.publicationsData.error = {};
  },
  UPDATE_SUCCESS(state) {
    state.publicationsData.success = true;
    state.publicationsData.error = {};
  },
};

export const actions = {
  resetStats({ commit }) {
    var response = [];
    commit("RESET_STATS", response);
  },
  async setStats({ commit }, { qs }) {
    await this.$axios
      .$get(`/publications/count?${qs}`)
      .then((response) => {
        commit("SET_STATS", response);
      })
      .catch((e) => {
        // handle error
        // commit("SET_JOURNALARTICLE", error);
      })
      .finally(function () {
        // always executed
      });
  },
  async setJournalArticle({ commit }, { id }) {
    await fetch(`https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&id=${id}&retmode=json`)
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        commit("SET_JOURNALARTICLE", res.result[`${id}`]);
      })
      .catch((e) => {});
  },
  async countPublications({ commit }, { qs }) {
    await this.$axios
      .$get(`/publications/count?${qs}`)
      .then((response) => {
        // handle success
        commit("SET_PUBLICATIONS_COUNT", response);
      })
      .catch((e) => {
        // handle error
        //  commit("SET_PROGRAMMES_COUNT", error);
      })
      .finally(function () {
        // always executed
      });
  },
  async setPublicationsData({ commit }, { qs }) {
    await this.$axios
      .$get(`/publications?_sort=publication_type:ASC&${qs}${limit}`)
      .then((response) => {
        // handle success
        commit("SET_PUBLICATIONSDATA", response);
      })
      .catch((e) => {
        // handle error
        // commit("SET_PUBLICATIONSDATA", error);
      })
      .finally(function () {
        // always executed
      });
  },
  async publicationAdd({ commit, dispatch }, payload) {
    commit("INIT_ERROR");
    await this.$axios
      .$post("/publications", payload)
      .then((response) => {
        commit("ADD_TO_PUBLICATIONSDATA", response);
        Swal.fire({
          title: "Success",
          text: "Added Successfully!",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        });
      })
      .catch((e) => {
        dispatch("snackbar/setSnackbar", { color: "red", text: "Publication Creation Failed!", timeout: 3000 }, { root: true });
      });
  },
  async updatePublication({ commit, dispatch }, payload) {
    commit("INIT_ERROR");
    await this.$axios
      .$put(`/publications/${payload.id}`, payload)
      .then((response) => {
        commit("UPDATE_SUCCESS");
        Swal.fire({
          title: "Success",
          text: "Updated Successfully!",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        });
      })
      .catch((e) => {
        dispatch("snackbar/setSnackbar", { color: "red", text: "Publication update Failed!", timeout: 3000 }, { root: true });
      });
  },
  async deletePublication({ commit }, { id }) {
    await this.$axios
      .$delete(`/publications/${id}`)
      .then((response) => {
        // handle success
        commit("SET_PUBLICATIONSDATA", response);
      })
      .catch((e) => {
        // handle error
        // commit("SET_PUBLICATIONSDATA", error);
      })
      .finally(function () {
        // always executed
      });
  },

  async setPublicationTypes({ commit }, publicationTypes) {
    commit("SET_PUBLICATIONTYPES", publicationTypes);
  },
};
