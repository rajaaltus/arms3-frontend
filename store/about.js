export const state = () => ({
  newAbout: {},
});

export const mutations = {
  SET_ABOUT_DATA(state, response) {
    state.newAbout = response[0];
  },
};

export const actions = {
  async setAboutData({ commit }, { qs }) {
    await this.$axios
      .$get(`/department-profiles?${qs}`)
      .then((response) => {
        commit("SET_ABOUT_DATA", response);
      })
      .catch((e) => {})
      .finally(function () {});
  },
  async addProfile({ commit }, payload) {
    await this.$axios
      .$post("/department-profiles", payload)
      .then((response) => {
        commit("SET_ABOUT_DATA", response);
      })
      .catch((e) => {
        commit("SET_ABOUT_DATA", error);
      })
      .finally(function () {});
  },
  async updateAbout({ commit }, payload) {
    await this.$axios
      .$put(`/department-profiles/${payload.id}`, payload)
      .then((response) => {
        commit("SET_ABOUT_DATA", response);
      })
      .catch((e) => {
        commit("SET_ABOUT_DATA", error);
      })
      .finally(function () {});
  },
};
