const limit = "&_limit=1000";
import Swal from "sweetalert2";
export const state = () => ({
  publicData: {
    success: false,
    result: [],
    error: {},
  },
  publicEngagementsCount: null,
});

export const getters = {
  publicData(state) {
    return state.publicData;
  },
};

export const mutations = {
  ADD_TO_PUBLICDATA(state, response) {
    state.publicData.success = true;
    state.publicData.result.push(response);
  },
  SET_PUBLICDATA(state, publicData) {
    if (publicData && Array.isArray(publicData)) {
      state.publicData.success = true;
      state.publicData.result = publicData;
      state.publicData.error = {};
    } else {
      console.log("error" + publicData);
      state.publicData.success = false;
      state.publicData.error = {
        message: {
          message: "Error occured!",
        },
      };
    }
  },
  SET_PUBLICENGAGEMENTS_COUNT(state, publicEngagementsCount) {
    state.publicEngagementsCount = publicEngagementsCount;
  },
  INIT_ERROR(state) {
    state.publicData.success = false;
    state.publicData.error = {};
  },
  UPDATE_SUCCESS(state) {
    state.publicData.success = true;
    state.publicData.error = {};
  },
};

export const actions = {
  async setPublicData({ commit }, { qs }) {
    await this.$axios
      .$get(`/public-engagements?${qs}${limit}`)
      .then((response) => {
        // handle success
        commit("SET_PUBLICDATA", response);
      })
      .catch((e) => {
        // handle error
        // commit("SET_PUBLICDATA", error);
      })
      .finally(function () {
        // always executed
      });
  },
  async countPublicEngagements({ commit }, { qs }) {
    await this.$axios
      .$get(`/public-engagements/count?${qs}${limit}`)
      .then((response) => {
        // handle success
        commit("SET_PUBLICENGAGEMENTS_COUNT", response);
      })
      .catch((e) => {
        // handle error
        //  commit("SET_PUBLICENGAGEMENTS_COUNT", error);
      })
      .finally(function () {
        // always executed
      });
  },
  async publicAdd({ commit, dispatch }, payload) {
    commit("INIT_ERROR");
    await this.$axios
      .$post("/public-engagements", payload)
      .then((response) => {
        commit("ADD_TO_PUBLICDATA", response);
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
        dispatch("snackbar/setSnackbar", { color: "red", text: "Public Engagement creation failed!", timeout: 3000 }, { root: true });
      });
  },
  async updatePublic({ commit }, payload) {
    commit("INIT_ERROR");
    await this.$axios
      .$put(`/public-engagements/${payload.id}`, payload)
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
        dispatch("snackbar/setSnackbar", { color: "red", text: "Program update Failed!", timeout: 3000 }, { root: true });
      });
  },
  async deletePublic({ commit }, { id }) {
    await this.$axios
      .$delete(`/public-engagements/${id}`)
      .then((response) => {
        // handle success
        commit("SET_PUBLICDATA", response);
        console.log(response);
      })
      .catch((e) => {
        // handle error
        console.log(error);
        // commit("SET_PUBLICDATA", error);
      })
      .finally(function () {
        // always executed
        console.log("finally");
      });
  },
};
