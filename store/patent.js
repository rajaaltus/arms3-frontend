const limit = "&_limit=1000";
import Swal from "sweetalert2";
export const state = () => ({
  patentsData: {
    success: false,
    result: [],
    error: {},
  },
  patentsCount: 0,
});

export const getters = {
  patentsData(state) {
    return state.patentsData;
  },
};

export const mutations = {
  ADD_TO_PATENTSDATA(state, response) {
    state.patentsData.success = true;
    state.patentsData.result.push(response);
  },
  SET_PATENTSDATA(state, patentsData) {
    if (patentsData && Array.isArray(patentsData)) {
      state.patentsData.success = true;
      state.patentsData.result = patentsData;
      state.patentsData.error = {};
    } else {
      console.log("error" + patentsData);
      state.patentsData.success = false;
      state.patentsData.error = {
        message: {
          message: "Error occured!",
        },
      };
    }
  },
  SET_PATENTS_COUNT(state, patentsCount) {
    state.patentsCount = patentsCount;
  },
  INIT_ERROR(state) {
    state.patentsData.success = false;
    state.patentsData.error = {};
  },
  UPDATE_SUCCESS(state) {
    state.patentsData.success = true;
    state.patentsData.error = {};
  },
};

export const actions = {
  async setPatentsData({ commit }, { qs }) {
    await this.$axios
      .$get(`/patents?${qs}${limit}`)
      .then((response) => {
        // handle success
        commit("SET_PATENTSDATA", response);
      })
      .catch((e) => {
        // handle error
        commit("SET_PATENTSDATA", error);
      })
      .finally(function () {
        // always executed
      });
  },
  async countPatents({ commit }, { qs }) {
    await this.$axios
      .$get(`/patents/count?${qs}`)
      .then((response) => {
        // handle success
        commit("SET_PATENTS_COUNT", response);
      })
      .catch((e) => {
        // handle error
        commit("SET_PATENTS_COUNT", error);
      })
      .finally(function () {
        // always executed
      });
  },
  async patentAdd({ commit, dispatch }, payload) {
    commit("INIT_ERROR");
    await this.$axios
      .$post("/patents", payload)
      .then((response) => {
        commit("ADD_TO_PATENTSDATA", response);
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
        dispatch("snackbar/setSnackbar", { color: "red", text: "Patent Creation Failed!", timeout: 3000 }, { root: true });
      });
  },
  async updatePatent({ commit }, payload) {
    commit("INIT_ERROR");
    await this.$axios
      .$put(`/patents/${payload.id}`, payload)
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
        dispatch("snackbar/setSnackbar", { color: "red", text: "Patent update Failed!", timeout: 3000 }, { root: true });
      });
  },
  async deletePatent({ commit }, { id }) {
    await this.$axios
      .$delete(`/patents/${id}`)
      .then((response) => {
        // handle success
        commit("SET_PATENTSDATA", response);
      })
      .catch((e) => {
        // handle error
        commit("SET_PATENTSDATA", error);
      })
      .finally(function () {
        // always executed
      });
  },
};
