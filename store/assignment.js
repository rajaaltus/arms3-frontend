const limit = "&_limit=1000";
import Swal from "sweetalert2";
export const state = () => ({
  assignmentsData: {
    success: false,
    result: [],
    error: {},
  },
  assignmentsCount: 0,
});

export const getters = {
  assignmentsData(state) {
    return state.assignmentsData;
  },
};

export const mutations = {
  ADD_TO_ASSIGNMENTSDATA(state, response) {
    state.assignmentsData.success = true;
    state.assignmentsData.result.push(response);
  },
  SET_ASSIGNMENTSDATA(state, assignmentsData) {
    if (assignmentsData && Array.isArray(assignmentsData)) {
      state.assignmentsData.success = true;
      state.assignmentsData.result = assignmentsData;
      state.assignmentsData.error = {};
    } else {
      console.log("error" + assignmentsData);
      state.assignmentsData.success = false;
      state.assignmentsData.error = {
        message: {
          message: "Error occured!",
        },
      };
    }
  },
  SET_ASSIGNMENTS_COUNT(state, assignmentsCount) {
    state.assignmentsCount = assignmentsCount;
  },
  INIT_ERROR(state) {
    state.assignmentsData.success = false;
    state.assignmentsData.error = {};
  },
  UPDATE_SUCCESS(state) {
    state.assignmentsData.success = true;
    state.assignmentsData.error = {};
  },
};

export const actions = {
  async setAssignmentsData({ commit }, { qs }) {
    await this.$axios
      .$get(`/key-assignments?${qs}${limit}`)
      .then((response) => {
        commit("SET_ASSIGNMENTSDATA", response);
      })
      .catch((e) => {
        commit("SET_ASSIGNMENTSDATA", error);
      })
      .finally(function () {});
  },
  async countAssignments({ commit }, { qs }) {
    await this.$axios
      .$get(`/key-assignments/count?${qs}${limit}`)
      .then((response) => {
        commit("SET_ASSIGNMENTS_COUNT", response);
      })
      .catch((e) => {
        commit("SET_ASSIGNMENTS_COUNT", error);
      })
      .finally(function () {});
  },
  async assignmentAdd({ commit, dispatch }, payload) {
    commit("INIT_ERROR");
    await this.$axios
      .$post("/key-assignments", payload)
      .then((response) => {
        commit("ADD_TO_ASSIGNMENTSDATA", response);
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
        dispatch("snackbar/setSnackbar", { color: "red", text: "Key Assignment Creation Failed!", timeout: 3000 }, { root: true });
      });
  },
  async updateAssignment({ commit, dispatch }, payload) {
    commit("INIT_ERROR");
    await this.$axios
      .$put(`/key-assignments/${payload.id}`, payload)
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
        dispatch("snackbar/setSnackbar", { color: "red", text: "Key Assignment update Failed!", timeout: 3000 }, { root: true });
      });
  },
  async deleteAssignment({ commit }, { id }) {
    await this.$axios
      .$delete(`/key-assignments/${id}`)
      .then((response) => {
        commit("SET_ASSIGNMENTSDATA", response);
      })
      .catch((e) => {
        commit("SET_ASSIGNMENTSDATA", error);
      })
      .finally(function () {
        // always executed
      });
  },
};
