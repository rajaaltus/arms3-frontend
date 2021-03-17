const limit = "&_limit=1000";
export const state = () => ({
  savedReport: null,
  errors: {},
  reportId: 0,
  generatedReport: null,
  availableReports: null,
  monthlyAvailableReports: [],
});

export const mutations = {
  INITIALIZE_REPORT_ID(state, val) {
    state.reportId = val;
  },
  SET_REPORTS(state, savedReport) {
    state.savedReport = savedReport;
    state.reportId = savedReport[0].id;
  },
  SET_POST_REPORTS(state, response) {
    state.savedReports = response;
    state.reportId = response.id;
  },
  SET_GEN_REPORT(state, response) {
    state.generatedReport = response;
  },
  SET_REPORT_ERRORS(state, response) {
    //console.log('Error: ', response.data.data.errors);
    state.errors = response;
  },
  SET_AVAILABLE_REPORTS(state, response) {
    state.availableReports = response;
    state.reportId = response[0].id;
    console.log("From Mutation: ", response[0].id);
  },
  SET_MONTHLY_AVAILABLE_REPORTS(state, response) {
    state.monthlyAvailableReports = response;
  },
  UPDATE_SUBMITTED_STATUS(state, resp) {
    console.log(resp);
  },
};

export const actions = {
  async checkMonthlyReport({ commit }, { qs }) {
    await this.$axios
      .$get(`/report-submit-statuses${qs}`)
      .then((resp) => {
        commit("SET_MONTHLY_AVAILABLE_REPORTS", resp);
      })
      .catch((e) => {
        console.log(e);
      });
  },
  async setAvailableReports({ commit }, { qs }) {
    await this.$axios
      .$get(`/saved-reports?${qs}`)
      .then((response) => {
        commit("SET_AVAILABLE_REPORTS", response);
      })
      .catch((e) => {});
  },
  async getById({ commit }, { id }) {
    await this.$axios
      .$get(`/saved-reports/${id}`)
      .then((response) => {
        commit("SET_GEN_REPORT", response);
      })
      .catch((e) => {})
      .finally(function () {
        console.log("finally!");
      });
  },
  async initializeReportId({ commit }, val) {
    commit("INITIALIZE_REPORT_ID", val);
  },
  async setSavedReport({ commit }, { fq }) {
    await this.$axios
      .$get(`/saved-reports?${fq}`)
      .then((response) => {
        commit("SET_REPORTS", response);
      })
      .catch((e) => {
        commit("SET_REPORT_ERRORS", e.response);
      })
      .finally(function () {
        console.log("finally!");
      });
  },
  async addReport({ commit, dispatch }, payload) {
    await this.$axios
      .$post("/saved-reports", payload)
      .then((response) => {
        commit("SET_POST_REPORTS", response);
        var payload2 = {};
        Object.assign(payload2, {
          year: payload.annual_year,
          month: payload.Month,
          userType: payload.userType,
          department: payload.department,
          submitStatus: true,
        });
        dispatch("addSubmittedStatus", payload2);
      })
      .catch((e) => {
        commit("SET_REPORT_ERRORS", e.response);
      })
      .finally(function () {
        console.log("finally!");
      });
  },
  async updateReport({ commit }, payload) {
    await this.$axios
      .$put(`/saved-reports/${payload.id}`, payload)
      .then((response) => {
        commit("SET_REPORTS", response);
      })
      .catch((e) => {
        commit("SET_REPORT_ERRORS", e.response);
      })
      .finally(function () {
        console.log("finally!");
      });
  },
  async addSubmittedStatus({ commit }, payload2) {
    await this.$axios
      .$post(`/report-submit-statuses`, payload2)
      .then((resp) => {
        commit("UPDATE_SUBMITTED_STATUS", resp);
      })
      .catch((e) => {});
  },
};
