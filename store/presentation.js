const limit = '&_limit=1000';
import Swal from 'sweetalert2';
export const state = () => ({
	presentationsData: {
		success: false,
		result: [],
		error: {},
	},
	presentationsCount: 0
});

export const getters =  {
	presentationsData (state) {
		return state.presentationsData;
	}
};

export const mutations = {
	ADD_TO_PRESENTATIONSDATA(state, response) {
		state.presentationsData.success = true;
		state.presentationsData.result.push(response);
	},
	SET_PRESENTATIONSDATA (state, presentationsData) {
		if (presentationsData && Array.isArray(presentationsData)) {
			state.presentationsData.success = true;
			state.presentationsData.result = presentationsData;
			state.presentationsData.error = {};
		}
	},
	SET_PRESENTATIONS_COUNT (state, presentationsCount) {
		state.presentationsCount = presentationsCount;
	}
};

export const actions = {
	async setPresentationsData ({commit}, {qs}) {
		 await this.$axios.$get(`/presentations?${qs}${limit}`)
			.then(response =>  {
				commit("SET_PRESENTATIONSDATA", response);
			})
			.catch((e) => {
			});
	},
	async countPresentations ({commit}, {qs}) {
		await this.$axios.$get(`/presentations/count?${qs}`)
		 .then(response =>  {
			 commit("SET_PRESENTATIONS_COUNT", response);
		 })
		 .catch((e) => {
		 });
 },
	async addPresentation ({commit, dispatch}, payload) {
		return await this.$axios.$post('/presentations', payload)
			.then(response =>  {
				commit("ADD_TO_PRESENTATIONSDATA", response);
				Swal.fire({
					title: "Success",
					text: "Added Successfully!",
					icon: "success",
					showConfirmButton: false,
					timer: 1500,
					timerProgressBar: true,
				});
				return true;
			})
			.catch((e) => {
				dispatch('snackbar/setSnackbar', {color: 'red', text:'Presentation Creation Failed!', timeout: 3000}, {root: true});
				return false;
			});
	},
	async updatePresentation ({commit}, payload) {
		await this.$axios.$put(`/presentations/${payload.id}`, payload)
			.then(response =>  {
				commit("SET_PRESENTATIONSDATA", response);
			})
			.catch((e) => {
			});
	},
	async deletePresentation ({commit}, {id}) {
		await this.$axios.$delete(`/presentations/${id}`)
			.then(response =>  {
				commit("SET_PRESENTATIONSDATA", response);
			})
			.catch((e) => {
			});
		
	}
};

