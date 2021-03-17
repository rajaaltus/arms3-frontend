export const state = () => ({
departments: []
});

export const mutations = {
  SET_DEPARTMENTS(state, departments) {
    state.departments = departments;
  },
  UPDATE_DEPARTMENTS(state, response) {
    state.departments.push(response);
  }
};

export const actions = {
  async getDepartments({commit}) {
    await this.$axios.$get('/departments')
    .then(response => {
      commit("SET_DEPARTMENTS", response);
    })
    .catch((e) => {
      console.log(e.response.data.message);
    });
  },
  async addDepartment({commit}, payload) {
    await this.$axios.$post('/departments', payload)
    .then(response => {
      commit("UPDATE_DEPARTMENTS", response);
    })
    .catch((e)=> {
      console.log(e.response.data.message);
    });
  },
  
};