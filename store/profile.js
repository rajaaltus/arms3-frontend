
export const state = () => ({
	
	educationData: {
		success: false,
		result: [],
		error: {},
	},
	expertiseData: {
		success: false,
		result: [],
		error: {},
	},
	experienceData: {
		success: false,
		result: [],
		error: {},
	}
});

export const getters =  {
	educationData (state) {
		return state.educationData;
	}
};

export const mutations = {
	
	SET_EDUCATION_DATA (state, educationData) {
		if (educationData && Array.isArray(educationData)) {
			state.educationData.success = true;
			state.educationData.result = educationData;
			state.educationData.error = {};
		} else {
			console.log('error'+educationData);
			state.educationData.success = false;
			state.educationData.error = {
				message: {
					message: 'Error occured!'
				}
			};
		}
	},
	SET_EXPERIENCE_DATA (state, experienceData) {
		if (experienceData && Array.isArray(experienceData)) {
			state.experienceData.success = true;
			state.experienceData.result = experienceData;
			state.experienceData.error = {};
		} else {
			state.experienceData.success = false;
			state.experienceData.error = {
				message: {
					message: 'Error occured!'
				}
			};
		}
	},
	SET_EXPERTISE_DATA (state, expertiseData) {
		if (expertiseData && Array.isArray(expertiseData)) {
			state.expertiseData.success = true;
			state.expertiseData.result = expertiseData;
			state.expertiseData.error = {};
		} else {
			console.log('error'+expertiseData);
			state.expertiseData.success = false;
			state.expertiseData.error = {
				message: {
					message: 'Error occured!'
				}
			};
		}
	}
};
 
export const actions = {
	
	async setEducationData ({commit}, {id}) {
		await this.$axios.$get(`/education-infos?user.id=${id}`)
			.then(response =>  {
				// handle success
				commit("SET_EDUCATION_DATA", response);
			})
			.catch((e) => {
				// handle error
				commit("SET_EDUCATION_DATA", error);
			})
			.finally(function () {
				// always executed
			});
		  
	},
	async setExperienceData ({commit}, {id}) {
		await this.$axios.$get(`/experience-infos?user.id=${id}`)
			.then(response =>  {
				// handle success
				commit("SET_EXPERIENCE_DATA", response);
			})
			.catch((e) => {
				// handle error
				// commit("SET_EDUCATION_DATA", error);
			})
			.finally(function () {
				// always executed
			});
		  
	},
	async setExpertiseData ({commit}, {id}) {
		await this.$axios.$get(`/expertise-infos?user.id=${id}`)
			.then(response =>  {
				// handle success
				commit("SET_EXPERTISE_DATA", response);
			})
			.catch((e) => {
				// handle error
				commit("SET_EXPERTISE_DATA", error);
			})
			.finally(function () {
				// always executed
			});
	},
	async addEducation ({commit}, payload) {
		await this.$axios.$post('/education-infos', payload)
			.then(response =>  {
			// handle success
				commit("SET_EDUCATION_DATA", response);
			})
			.catch((e) => {
			// handle error
				// commit("SET_EDUCATION_DATA", error);
			})
			.finally(function () {
			// always executed
			});
		
	},
	async addExperience ({commit}, payload) {
		await this.$axios.$post('/experience-infos', payload)
			.then(response =>  {
			// handle success
				commit("SET_EXPERIENCE_DATA", response);
			})
			.catch((e) => {
			// handle error
				// commit("SET_EXPERIENCE_DATA", error);
			})
			.finally(function () {
			// always executed
			});
		
	},
	async addExpertise ({commit}, payload) {
		await this.$axios.$post('/expertise-infos', payload)
			.then(response =>  {
			// handle success
				commit("SET_EXPERTISE_DATA", response);
			})
			.catch((e) => {
			// handle error
				commit("SET_EXPERTISE_DATA", error);
			})
			.finally(function () {
			// always executed
			});
		
	},
	async updateExpertise ({commit}, payload) {
		await this.$axios.$put(`/expertise-infos/${payload.id}`, payload)
			.then(response =>  {
			// handle success
				commit("SET_EXPERTISE_DATA", response);
			})
			.catch((e) => {
			// handle error
				// commit("SET_EXPERTISE_DATA", error);
			})
			.finally(function () {
			// always executed
			});
	},
	async updateExperience ({commit}, payload) {
		await this.$axios.$put(`/experience-infos/${payload.id}`, payload)
			.then(response =>  {
			// handle success
				commit("SET_EXPERIENCE_DATA", response);
			})
			.catch((e) => {
			// handle error
				// commit("SET_EXPERTISE_DATA", error);
			})
			.finally(function () {
			// always executed
			});
	},
	async updateEducation ({commit}, payload) {
		await this.$axios.$put(`/education-infos/${payload.id}`, payload)
			.then(response =>  {
			// handle success
				commit("SET_EDUCATION_DATA", response);
			})
			.catch((e) => {
			// handle error
				// commit("SET_EDUCATION_DATA", error);
			})
			.finally(function () {
			// always executed
			});
	},
	async deleteEducation ({commit}, {id}) {
		await this.$axios.$delete(`/education-infos/${id}`)
			.then(response =>  {
			// handle success
				commit("SET_EDUCATION_DATA", response);
			})
			.catch((e) => {
			// handle error
				// commit("SET_EDUCATION_DATA", error);
			})
			.finally(function () {
			// always executed
			});
	},
	async deleteExperience ({commit}, {id}) {
		await this.$axios.$delete(`/experience-infos/${id}`)
			.then(response =>  {
			// handle success
				commit("SET_EXPERIENCE_DATA", response);
			})
			.catch((e) => {
			// handle error
				// commit("SET_EDUCATION_DATA", error);
			})
			.finally(function () {
			// always executed
			});
	},
	async deleteExpertise ({commit}, {id}) {
		await this.$axios.$delete(`/expertise-infos/${id}`)
			.then(response =>  {
			// handle success
				commit("SET_EXPERTISE_DATA", response);
			})
			.catch((e) => {
			// handle error
				// commit("SET_EXPERTISE_DATA", error);
			})
			.finally(function () {
			// always executed
			});
	}
};

