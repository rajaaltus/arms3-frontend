const limit = "&_limit=1000";
import Swal from "sweetalert2";
export const state = () => ({
  recognitionsData: {
    success: false,
    result: [],
    error: {},
  },
  recognitionsCount: 0,
});

export const getters = {
  recognitionsData(state) {
    return state.recognitionsData;
  },
};

export const mutations = {
  ADD_TO_RECOGNITIONDATA(state, response) {
    state.recognitionsData.success = true;
    state.recognitionsData.result.push(response);
  },
  SET_RECOGNITIONSDATA(state, recognitionsData) {
    if (recognitionsData && Array.isArray(recognitionsData)) {
      state.recognitionsData.success = true;
      state.recognitionsData.result = recognitionsData;
      state.recognitionsData.error = {};
    } else {
      state.recognitionsData.success = false;
      state.recognitionsData.error = {
        message: {
          message: "Error occured!",
        },
      };
    }
  },
  SET_RECOGNITIONS_COUNT(state, recognitionsCount) {
    state.recognitionsCount = recognitionsCount;
  },
  INIT_ERROR(state) {
    state.recognitionsData.success = false;
    state.recognitionsData.error = {};
  },
  UPDATE_SUCCESS(state) {
    state.recognitionsData.success = true;
    state.recognitionsData.error = {};
  },
};

export const actions = {
  async setRecognitionsData({ commit }, { qs }) {
    await this.$axios
      .$get(`/recognitions?${qs}${limit}`)
      .then((response) => {
        // handle success
        commit("SET_RECOGNITIONSDATA", response);
      })
      .catch((e) => {
        // handle error
        // commit("SET_RECOGNITIONSDATA", error);
      })
      .finally(function () {
        // always executed
      });
  },
  async countRecognitions({ commit }, { qs }) {
    await this.$axios
      .$get(`/recognitions/count?${qs}`)
      .then((response) => {
        // handle success
        commit("SET_RECOGNITIONS_COUNT", response);
      })
      .catch((e) => {
        // handle error
        //  commit("SET_RECOGNITIONS_COUNT", error);
      })
      .finally(function () {
        // always executed
      });
  },
  async recognitionAdd({ commit, dispatch }, payload) {
    commit("INIT_ERROR");
    await this.$axios
      .$post("/recognitions", payload)
      .then((response) => {
        commit("ADD_TO_RECOGNITIONDATA", response);
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
        dispatch("snackbar/setSnackbar", { color: "red", text: "Recognition Creation Failed!", timeout: 3000 }, { root: true });
      });
  },
  async updateRecognition({ commit, dispatch }, payload) {
    commit("INIT_ERROR");
    await this.$axios
      .$put(`/recognitions/${payload.id}`, payload)
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
        dispatch("snackbar/setSnackbar", { color: "red", text: "Recognition update Failed!", timeout: 3000 }, { root: true });
      });
  },
  async deleteRecognition({ commit }, { id }) {
    await this.$axios
      .$delete(`/recognitions/${id}`)
      .then((response) => {
        // handle success
        commit("SET_RECOGNITIONSDATA", response);
        console.log(response);
      })
      .catch((e) => {
        // handle error
        console.log(error);
        // commit("SET_RECOGNITIONSDATA", error);
      })
      .finally(function () {
        // always executed
        console.log("finally");
      });
  },
};
