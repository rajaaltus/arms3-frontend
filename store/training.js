const limit = "&_limit=1000";
import Swal from "sweetalert2";
export const state = () => ({
  trainingsData: {
    success: false,
    result: [],
    error: {},
  },
  trainingsCount: 0,
});

export const getters = {
  trainingsData(state) {
    return state.trainingsData;
  },
};

export const mutations = {
  ADD_TO_TRAININGSDATA(state, response) {
    state.trainingsData.success = true;
    state.trainingsData.result.push(response);
  },
  SET_TRAININGSDATA(state, trainingsData) {
    if (trainingsData && Array.isArray(trainingsData)) {
      state.trainingsData.success = true;
      state.trainingsData.result = trainingsData;
      state.trainingsData.error = {};
    }
  },
  SET_TRAININGS_COUNT(state, trainingsCount) {
    state.trainingsCount = trainingsCount;
  },
  INIT_ERROR(state) {
    state.trainingsData.success = false;
    state.trainingsData.error = {};
  },
  UPDATE_SUCCESS(state) {
    state.trainingsData.success = true;
    state.trainingsData.error = {};
  },
};

export const actions = {
  async setTrainingsData({ commit }, { qs }) {
    await this.$axios
      .$get(`/trainings?${qs}${limit}`)
      .then((response) => {
        commit("SET_TRAININGSDATA", response);
      })
      .catch((e) => {});
  },
  async countTrainings({ commit }, { qs }) {
    await this.$axios
      .$get(`/trainings/count?${qs}`)
      .then((response) => {
        commit("SET_TRAININGS_COUNT", response);
      })
      .catch((e) => {});
  },
  async addTraining({ commit, dispatch }, payload) {
    commit("INIT_ERROR");
    await this.$axios
      .$post("/trainings", payload)
      .then((response) => {
        commit("ADD_TO_TRAININGSDATA", response);
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
        dispatch("snackbar/setSnackbar", { color: "red", text: "Training Creation Failed!", timeout: 3000 }, { root: true });
      });
  },
  async updateTraining({ commit, dispatch }, payload) {
    commit("INIT_ERROR");
    await this.$axios
      .$put(`/trainings/${payload.id}`, payload)
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
        dispatch("snackbar/setSnackbar", { color: "red", text: "Training update Failed!", timeout: 3000 }, { root: true });
      });
  },
  async deleteTraining({ commit }, { id }) {
    await this.$axios
      .$delete(`/trainings/${id}`)
      .then((response) => {
        commit("SET_TRAININGSDATA", response);
      })
      .catch((e) => {});
  },
};
