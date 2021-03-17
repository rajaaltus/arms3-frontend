const limit = '&_limit=1000';
import Swal from 'sweetalert2';
export const state = () => ({
	programmesData: {
		success: false,
		result: [],
		error: {},
	},
	programmesCount: 0,
});

export const mutations = {
	
	ADD_TO_PROGRAMMESDATA (state, response) {
		state.programmesData.success = true;
		state.programmesData.result.push(response);	
	},
	SET_PROGRAMMESDATA (state, programmesData) {
		if (programmesData && Array.isArray(programmesData)) {
			state.programmesData.success = true;
			state.programmesData.result = programmesData;
			state.programmesData.error = {};
		} else {
			state.programmesData.success = false;
			state.programmesData.error = {
				message: {
					message: 'Error occured!'
				}
			};
		}
	},
	SET_PROGRAMMES_COUNT (state, programmesCount) {
		state.programmesCount = programmesCount;
	},
	SET_PROGRAM_NAMES (state, programNames) {
		state.programNames = programNames.programmes;
	}
};


export const actions = {
	async setProgrammesData ({commit}, {qs}) {
			await this.$axios.$get(`/programmes?${qs}${limit}`)
			.then(response =>  {
				commit("SET_PROGRAMMESDATA", response);
			})
			.catch((e) => {
				
			});
			
	},
	async countProgrammes ({commit}, {qs}) {
		await this.$axios.$get(`/programmes/count?${qs}`)
		 .then(response =>  {
			 commit("SET_PROGRAMMES_COUNT", response);
		 })
		 .catch((e) => {
			 commit("SET_PROGRAMMES_COUNT", error);
		 });
		 
 },
	async addProgram ({commit, dispatch}, payload) {
		return await this.$axios.$post('/programmes', payload)
			.then(response =>  {
				commit("ADD_TO_PROGRAMMESDATA", response);
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
	async updateProgram ({commit, dispatch}, payload) {
		return await this.$axios.$put(`/programmes/${payload.id}`, payload)
			.then(response =>  {
				Swal.fire({
					title: "Success",
					text: "Updated Successfully!",
					icon: "success",
					showConfirmButton: false,
					timer: 1500,
					timerProgressBar: true,
				});
				return true;
			})
			.catch((e) => {
				dispatch('snackbar/setSnackbar', {color: 'red', text:'Program update Failed!', timeout: 3000}, {root: true});
				return false;
			});
	},
	async deleteProgram ({commit}, {id}) {
		return await this.$axios.$delete(`/programmes/${id}`)
			.then(response =>  {
				Swal.fire({
					title: "Success",
					text: "Deleted Successfully!",
					icon: "success",
					showConfirmButton: false,
					timer: 1500,
					timerProgressBar: true,
				});
				return true;
			})
			.catch((e) => {
				dispatch('snackbar/setSnackbar', {color: 'red', text:'Program Delete Failed!', timeout: 3000}, {root: true});
				return false;
			});
			
	}
};

