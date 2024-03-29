const limit = "&_limit=1000";
import Swal from "sweetalert2";
export const state = () => ({
  thesesData: {
    success: false,
    result: [],
    error: {},
  },
  thesesCount: 0,
});

export const getters = {
  thesesData(state) {
    return state.thesesData;
  },
};

export const mutations = {
  ADD_TO_THESESDATA(state, response) {
    state.thesesData.success = true;
    state.thesesData.result.push(response);
  },
  SET_THESESDATA(state, thesesData) {
    if (thesesData && Array.isArray(thesesData)) {
      state.thesesData.success = true;
      state.thesesData.result = thesesData;
      state.thesesData.error = {};
    } else {
      console.log("error" + thesesData);
      state.thesesData.success = false;
      state.thesesData.error = {
        message: {
          message: "Error occured!",
        },
      };
    }
  },
  SET_THESES_COUNT(state, thesesCount) {
    state.thesesCount = thesesCount;
  },
  INIT_ERROR(state) {
    state.thesesData.success = false;
    state.thesesData.error = {};
  },
  UPDATE_SUCCESS(state) {
    state.thesesData.success = true;
    state.thesesData.error = {};
  },
};

export const actions = {
  async setThesesData({ commit }, { qs }) {
    await this.$axios
      .$get(`/theses?${qs}${limit}`)
      .then((response) => {
        // handle success
        commit("SET_THESESDATA", response);
      })
      .catch((e) => {
        // handle error
        commit("SET_THESESDATA", error);
      })
      .finally(function () {
        // always executed
      });
  },
  async thesesAdd({ commit, dispatch }, payload) {
    commit("INIT_ERROR");
    await this.$axios
      .$post("/theses", payload)
      .then((response) => {
        commit("ADD_TO_THESESDATA", response);
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
        dispatch("snackbar/setSnackbar", { color: "red", text: "Theses Creation Failed!", timeout: 3000 }, { root: true });
      })
      .finally(function () {
        // always executed
      });
  },
  async updateTheses({ commit }, payload) {
    commit("INIT_ERROR");
    await this.$axios
      .$put(`/theses/${payload.id}`, payload)
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
        dispatch("snackbar/setSnackbar", { color: "red", text: "Theses update Failed!", timeout: 3000 }, { root: true });
      });
  },
  async countTheses({ commit }, { qs }) {
    await this.$axios
      .$get(`/theses/count?${qs}`)
      .then((response) => {
        // handle success
        commit("SET_THESES_COUNT", response);
      })
      .catch((e) => {
        // handle error
        commit("SET_THESES_COUNT", error);
      })
      .finally(function () {
        // always executed
      });
  },

  async deleteTheses({ commit }, { id }) {
    await this.$axios
      .$delete(`/theses/${id}`)
      .then((response) => {
        // handle success
        commit("SET_THESESDATA", response);
      })
      .catch((e) => {
        // handle error
        commit("SET_THESESDATA", error);
      })
      .finally(function () {
        // always executed
      });
  },
};
