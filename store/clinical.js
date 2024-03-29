export const state = () => ({
  emergencyData: [],
  clinicalDataTable: {
    success: false,
    result: [],
    error: {},
  },
  clinicalOutDataTable: {
    success: false,
    result: [],
    error: {},
  },
});

export const getters = {
  clinicalData(state) {
    return state.clinicalData;
  },
};

export const mutations = {
  SET_CLINICALDATA(state, response) {
    state.clinicalData = response;
  },

  SET_CLINICALDATA_TABLE(state, clinicalDataTable) {
    if (clinicalDataTable && Array.isArray(clinicalDataTable)) {
      state.clinicalDataTable.success = true;
      state.clinicalDataTable.result = clinicalDataTable;
      state.clinicalDataTable.error = {};
    } else {
      console.log("error" + clinicalDataTable);
      state.clinicalDataTable.success = false;
      state.clinicalDataTable.error = {
        message: {
          message: "Error occured!",
        },
      };
    }
  },
  SET_CLINICALOUTDATA_TABLE(state, clinicalOutDataTable) {
    if (clinicalOutDataTable && Array.isArray(clinicalOutDataTable)) {
      state.clinicalOutDataTable.success = true;
      state.clinicalOutDataTable.result = clinicalOutDataTable;
      state.clinicalOutDataTable.error = {};
    } else {
      console.log("error" + clinicalOutDataTable);
      state.clinicalOutDataTable.success = false;
      state.clinicalOutDataTable.error = {
        message: {
          message: "Error occured!",
        },
      };
    }
  },
};

export const actions = {
  async setClinicalData({ commit }, { qs }) {
    await this.$axios
      .$get(`/pc-clinical-services?${qs}`)
      .then((response) => {
        commit("SET_CLINICALDATA", response);
      })
      .catch((_e) => {
        commit("SET_CLINICALDATA", error);
      })
      .finally(function () {});
  },

  async addClinical({ commit }, payload) {
    await this.$axios
      .$post("/pc-clinical-services", payload)
      .then((response) => {})
      .catch((_e) => {})
      .finally(function () {});
  },
  async updateClinical({ commit }, payload) {
    await this.$axios
      .$put(`/pc-clinical-services/${payload.id}`, payload)
      .then((response) => {})
      .catch((_e) => {})
      .finally(function () {});
  },
};
