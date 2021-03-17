const limit = '&_limit=1000';
import Swal from 'sweetalert2';
export const state = () => ({
	visitorsData: {
		success: false,
		result: [],
		error: {},
	},
	visitorsCount: 0,
	visitorError: {}
});

export const getters =  {
	visitorsData (state) {
		return state.visitorsData;
	}
};

export const mutations = {
	ADD_TO_VISITORSDATA(state, response) {
		state.visitorsData.success = true;
		state.visitorsData.result.push(response);
	},
	SET_VISITORSDATA (state, visitorsData) {
		if (visitorsData && Array.isArray(visitorsData)) {
			state.visitorsData.success = true;
			state.visitorsData.result = visitorsData;
			state.visitorsData.error = {};
		} 
	},
	SET_VISITORS_COUNT (state, visitorsCount) {
		state.visitorsCount = visitorsCount;
	},
	SET_ERROR (state, visitorError) {
		state.visitorError = visitorError;
	}
};

export const actions = {
	async setVisitorsData ({commit}, {qs}) {
		 await this.$axios.$get(`/visitors?${qs}${limit}`)
			.then(response =>  {
				commit("SET_VISITORSDATA", response);
			})
			.catch((e) => {
			});
			
	},
	async countVisitors ({commit}, {qs}) {
		await this.$axios.$get(`/visitors/count?${qs}`)
		 .then(response =>  {
			 commit("SET_VISITORS_COUNT", response);
		 })
		 .catch((e) => {
		 });
 },
	async addVisitor ({commit, dispatch}, payload) {
		return await this.$axios.$post('/visitors', payload)
			.then(response =>  {
				commit("ADD_TO_VISITORSDATA", response);
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
				dispatch('snackbar/setSnackbar', {color: 'red', text:'Program Creation Failed!', timeout: 3000}, {root: true});
				return false;
			});
	},
	async updateVisitor ({commit}, payload) {
		await this.$axios.$put(`/visitors/${payload.id}`, payload)
			.then(response =>  {
				commit("SET_VISITORSDATA", response);
				
			})
			.catch((e) => {
			});
	},
	async deleteVisitor ({commit}, {id}) {
		await this.$axios.$delete(`/visitors/${id}`)
			.then(response =>  {
				commit("SET_VISITORSDATA", response);
			})
			.catch((e) => {
			});
		
	}
};

