const limit = "&_limit=1000";
import Swal from "sweetalert2";
export const state = () => ({
  participationsData: {
    success: false,
    result: [],
    error: {},
  },
  participationsCount: 0,
});

export const getters = {
  participationsData(state) {
    return state.participationsData;
  },
};

export const mutations = {
  ADD_TO_PARTICIPATIONSDATA(state, response) {
    state.participationsData.success = true;
    state.participationsData.result.push(response);
  },
  SET_PARTICIPATIONSDATA(state, participationsData) {
    if (participationsData && Array.isArray(participationsData)) {
      state.participationsData.success = true;
      state.participationsData.result = participationsData;
      state.participationsData.error = {};
    }
  },
  SET_PARTICIPATIONS_COUNT(state, participationsCount) {
    state.participationsCount = participationsCount;
  },
  INIT_ERROR(state) {
    state.participationsData.success = false;
    state.participationsData.error = {};
  },
  UPDATE_SUCCESS(state) {
    state.participationsData.success = true;
    state.participationsData.error = {};
  },
};

export const actions = {
  async setParticipationsData({ commit }, { qs }) {
    await this.$axios
      .$get(`/participations?${qs}${limit}`)
      .then((response) => {
        commit("SET_PARTICIPATIONSDATA", response);
      })
      .catch((e) => {});
  },
  async countParticipations({ commit }, { qs }) {
    await this.$axios
      .$get(`/participations/count?${qs}`)
      .then((response) => {
        commit("SET_PARTICIPATIONS_COUNT", response);
      })
      .catch((e) => {});
  },
  async participationAdd({ commit, dispatch }, payload) {
    commit("INIT_ERROR");
    await this.$axios
      .$post("/participations", payload)
      .then((response) => {
        commit("ADD_TO_PARTICIPATIONSDATA", response);
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
        dispatch("snackbar/setSnackbar", { color: "red", text: "Participation Creation Failed!", timeout: 3000 }, { root: true });
      });
  },
  async updateParticipation({ commit, dispatch }, payload) {
    commit("INIT_ERROR");
    await this.$axios
      .$put(`/participations/${payload.id}`, payload)
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
        dispatch("snackbar/setSnackbar", { color: "red", text: "Participation update Failed!", timeout: 3000 }, { root: true });
      });
  },
  async deleteParticipation({ commit }, { id }) {
    await this.$axios
      .$delete(`/participations/${id}`)
      .then((response) => {
        commit("SET_PARTICIPATIONSDATA", response);
      })
      .catch((e) => {});
  },
};
