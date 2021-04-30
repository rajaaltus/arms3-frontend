const limit = "&_limit=1000";
import Swal from "sweetalert2";
export const state = () => ({
  researchData: {
    success: false,
    result: [],
    error: {},
  },
  researchCount: 0,
});

export const getters = {
  researchData(state) {
    return state.researchData;
  },
};

export const mutations = {
  ADD_TO_RESEARCHDATA(state, response) {
    state.researchData.success = true;
    state.researchData.result.push(response);
  },
  SET_RESEARCHDATA(state, researchData) {
    if (researchData && Array.isArray(researchData)) {
      state.researchData.success = true;
      state.researchData.result = researchData;
      state.researchData.error = {};
    } else {
      console.log("error" + researchData);
      state.researchData.success = false;
      state.researchData.error = {
        message: {
          message: "Error occured!",
        },
      };
    }
  },
  SET_RESEARCH_COUNT(state, researchCount) {
    state.researchCount = researchCount;
  },
  INIT_ERROR(state) {
    state.researchData.success = false;
    state.researchData.error = {};
  },
  UPDATE_SUCCESS(state) {
    state.researchData.success = true;
    state.researchData.error = {};
  },
};

export const actions = {
  async setResearchData({ commit }, { qs }) {
    await this.$axios
      .$get(`/research-activities?${qs}${limit}`)
      .then((response) => {
        commit("SET_RESEARCHDATA", response);
      })
      .catch((e) => {
        commit("SET_RESEARCHDATA", error);
      })
      .finally(function () {});
  },
  async countResearch({ commit }, { qs }) {
    await this.$axios
      .$get(`/research-activities/count?${qs}`)
      .then((response) => {
        commit("SET_RESEARCH_COUNT", response);
      })
      .catch((e) => {
        commit("SET_RESEARCH_COUNT", error);
      })
      .finally(function () {});
  },
  async researchAdd({ commit, dispatch }, payload) {
    commit("INIT_ERROR");
    await this.$axios
      .$post("/research-activities", payload)
      .then((response) => {
        commit("ADD_TO_RESEARCHDATA", response);
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
        dispatch("snackbar/setSnackbar", { color: "red", text: "Program Creation Failed!", timeout: 3000 }, { root: true });
      });
  },
  async updateResearch({ commit, dispatch }, payload) {
    commit("INIT_ERROR");
    await this.$axios
      .$put(`/research-activities/${payload.id}`, payload)
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
  async deleteResearch({ commit }, { id }) {
    await this.$axios
      .$delete(`/research-activities/${id}`)
      .then((response) => {
        // handle success
        commit("SET_RESEARCHDATA", response);
        console.log(response);
      })
      .catch((e) => {
        // handle error
        console.log(error);
        commit("SET_RESEARCHDATA", error);
      })
      .finally(function () {
        // always executed
        console.log("finally");
      });
  },
};
