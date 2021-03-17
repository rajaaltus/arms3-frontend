const limit = "&_limit=1000";
export const state = () => ({
  busy: false,
  loggedIn: false,
  strategy: "local",
  user: false,
  fullUser: {},
  avatar_url: "/avatar-default-icon.png",
  userProfile: [],
  publicProfile: null,
  sameDepartmentProfiles: [],
  departments: {
    success: false,
    result: [],
    error: {},
  },
  usersList: {
    success: false,
    result: [],
    error: {},
  },
  activeUsersList: {
    success: false,
    result: [],
    error: {},
  },
});

export const getters = {
  authenticated(state) {
    return state.loggedIn;
  },

  user(state) {
    return state.user;
  },
};

export const mutations = {
  SET_PUBLIC_USER_PROFILE(state, publicProfile) {
    state.publicProfile = publicProfile;
  },
  SET_USERPROFILE(state, userProfile) {
    state.userProfile = userProfile;
    if (userProfile.image) state.avatar_url = this.$axios.defaults.baseURL + userProfile.image.url;
  },
  SET_FULL_USER(state, fullUser) {
    state.fullUser = fullUser;
    state.avatarUrl = fullUser.avatar.url;
  },
  SET_DEPT_DATA(state, departments) {
    if (departments && Array.isArray(departments)) {
      state.departments.success = true;
      state.departments.result = departments;
      state.departments.error = {};
    } else {
      // console.log('error'+departments);
      state.departments.success = false;
      state.departments.error = {
        message: {
          message: "Error occured!",
        },
      };
    }
  },
  SET_USERS_LIST(state, usersList) {
    if (usersList && Array.isArray(usersList)) {
      state.usersList.success = true;
      state.usersList.result = usersList;
      state.usersList.error = {};
    } else {
      state.usersList.success = false;
      state.usersList.error = {
        message: {
          message: "Error occured!",
        },
      };
    }
  },
  SET_ACTIVE_USERS_LIST(state, activeUsersList) {
    if (activeUsersList && Array.isArray(activeUsersList)) {
      state.activeUsersList.success = true;
      state.activeUsersList.result = activeUsersList;
      state.activeUsersList.error = {};
    } else {
      state.activeUsersList.success = false;
      state.activeUsersList.error = {
        message: {
          message: "Error occured!",
        },
      };
    }
  },
  SET_SAME_DEPT_PROFILE(state, sameDepartmentProfiles) {
    state.sameDepartmentProfiles = sameDepartmentProfiles;
  },
};

export const actions = {
  async updatePassword({ commit }, payload) {
    return await this.$axios
      .$put(`/users/${payload.id}`, payload)
      .then((response) => {
        return true;
      })
      .catch((e) => {
        return e;
      });
  },
  async forgotPassword({ commit }, payload) {
    return await this.$axios
      .$post("/auth/forgot-password", payload)
      .then((response) => {
        return true;
      })
      .catch((e) => {
        return e;
      });
  },
  async addUser({ commit }, payload) {
    return await this.$axios
      .$post("/users", payload)
      .then((response) => {
        return true;
      })
      .catch((e) => {
        // console.log("error from store: ", e.response.statusText);
        return e.response;
      });
  },
  async deleteUser({ commit }, { id }) {
    await this.$axios
      .$delete(`/users/${id}`)
      .then((response) => {
        // handle success
        return true;
      })
      .catch((e) => {
        // handle error
        // commit("SET_USERPROFILE", error);
      })
      .finally(function () {
        // always executed
      });
  },
  async updateUser({ commit }, payload) {
    await this.$axios
      .$put(`/users/${payload.id}`, payload)
      .then((response) => {
        // handle success
        return true;
      })
      .catch((e) => {
        // handle error
        // commit("SET_USERPROFILE", error);
      })
      .finally(function () {
        // always executed
      });
  },

  async addProfile({ commit }, payload) {
    await this.$axios
      .$post("/user-profiles", payload)
      .then((response) => {
        // handle success
        commit("SET_USERPROFILE", response);
      })
      .catch((e) => {
        // handle error
        // commit("SET_USERPROFILE", error);
      })
      .finally(function () {
        // always executed
      });
  },
  async setFullUser({ commit }, { id }) {
    await this.$axios
      .$get(`/users/${id}`)
      .then((response) => {
        // handle success
        commit("SET_FULL_USER", response);
      })
      .catch((e) => {
        // handle error
        //commit("SET_FULL_USER", error);
      })
      .finally(function () {
        // always executed
        // console.log('finally');
      });
  },
  async updateUserProfile({ commit }, payload) {
    await this.$axios
      .$put(`/user-profiles/${payload.id}`, payload)
      .then((response) => {
        // handle success
        commit("SET_USERPROFILE", response);
      })
      .catch((e) => {
        // handle error
        // commit("SET_USERPROFILE", error);
      })
      .finally(function () {
        // always executed
      });
  },
  async setUsersList({ commit }, { qs }) {
    await this.$axios
      .$get(`/users?${qs}${limit}`)
      .then((response) => {
        // handle success
        commit("SET_USERS_LIST", response);
      })
      .catch((e) => {
        // handle error
        // commit("SET_USERS_LIST", error);
      })
      .finally(function () {
        // always executed
        // console.log('finally');
      });
  },
  async setActiveUsersList({ commit }, { qs }) {
    await this.$axios
      .$get(`/users?${qs}${limit}`)
      .then((response) => {
        // handle success
        commit("SET_ACTIVE_USERS_LIST", response);
      })
      .catch((e) => {
        // handle error
        // commit("SET_ACTIVE_USERS_LIST", error);
      })
      .finally(function () {
        // always executed
        // console.log('finally');
      });
  },

  async getAllDepartment({ commit }, departments) {
    await this.$axios
      .$get("/departments")
      .then((response) => {
        // handle success
        commit("SET_DEPT_DATA", response);
      })
      .catch((e) => {
        // handle error
        // commit("SET_DEPT_DATA", error);
      })
      .finally(function () {
        // always executed
        // console.log('finally');
      });
  },
  async setUserProfile({ commit }, { id }) {
    await this.$axios
      .$get(`/user-profiles?user.id=${id}`)
      .then((response) => {
        // handle success
        commit("SET_USERPROFILE", response[0]);
      })
      .catch((e) => {
        // handle error
        // commit("SET_USERPROFILE", error);
      })
      .finally(function () {
        // always executed
        // console.log('finally');
      });
  },
  async setPublicUserProfile({ commit }, { id }) {
    await this.$axios
      .$get(`/user-profiles?employee_id=${id}`)
      .then((response) => {
        // handle success
        // console.log(response);
        commit("SET_PUBLIC_USER_PROFILE", response[0]);
      })
      .catch((e) => {
        // handle error
        // commit("SET_USERPROFILE", error);
      })
      .finally(function () {
        // always executed
        // console.log('finally');
      });
  },
  async setSameDepartmentProfiles({ commit }, { id }) {
    await this.$axios
      .$get(`/user-profiles?user.department=${id}&active_status=true`)
      .then((response) => {
        commit("SET_SAME_DEPT_PROFILE", response);
      })
      .catch((e) => {
        return e;
      });
  },
};
