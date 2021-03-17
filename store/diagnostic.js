
export const state = () => ({
	diagnosticData: [],
	testData: []
});

export const getters = {
	testData () {
		return state.testData;
	}
};

export const mutations = {
	
	SET_DIAGNOSTIC_DATA (state, response) {
		state.diagnosticData = response;
	},
	SET_TEST (state, testData) {
		state.testData = testData;
	}
  
};

export const actions = {
  
	async setDiagnosticData ({commit}, {qs}) {
		await this.$axios.$get(`/pc-diagnostic-services?${qs}`)
			.then(response =>  {
				commit("SET_DIAGNOSTIC_DATA", response);
			})
			.catch((e) => {
			})
			.finally(function () {
			});
	},
	async addTest ({commit}, payload) {
		await this.$axios.$post('/pc-diagnostic-tests', payload) 
			.then(response =>  {
				commit("SET_TEST", response);
			})
			.catch((e) => {
			})
			.finally(function () {
			});
		
	},
	async setTest ({commit}, {qs}) {
		await this.$axios.$get(`/pc-diagnostic-tests?${qs}`)
			.then(response =>  {
				commit("SET_TEST", response);
			})
			.catch((e) => {
			})
			.finally(function () {
			});
	},


	async addDiagnostic ({commit}, payload) {
		await this.$axios.$post('/pc-diagnostic-services', payload)
			.then(response =>  {
			})
			.catch((e) => {
			})
			.finally(function () {
			});
	},

	async updateDiagnostic ({commit}, payload) {
		await this.$axios.$put(`/pc-diagnostic-services/${payload.id}`, payload)
			.then(response =>  {
			})
			.catch((e) => {
			})
			.finally(function () {
			});
	
	}
};

