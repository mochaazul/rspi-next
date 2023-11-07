import { createSlice } from '@reduxjs/toolkit';

import { PatientState } from 'interface/PatientProfile';

import { getLastVisitHospital, getProfileDetail, uploadPhotoProfile } from './patientProfileThunk';
import { getLastVisitedHospitalHelper } from 'helpers/visitHelper';

const initialState: PatientState = {
	patientProfile: {},
	lastVisitedHospital: {},
	loading: false,
	error: {},
	customMessage: '',
	patientPhotoProfile: {},
};

/* function that accepts an initial state, an object of reducer functions, and a
 "slice name", and automatically generates action creators and action types that correspond to the reducers and state
 */
export const patientProfileSlice = createSlice({
	name: 'patient',
	initialState,
	// functions intended to handle a specific action type, equivalent to a single case statement in a switch
	reducers: {},

	// extraReducers allows createSlice to respond to other action types besides the types it has generated.
	extraReducers: builder => {
		builder.addCase(getProfileDetail.fulfilled, (state, action) => {
			state.loading = false,
				state.patientProfile = action.payload.data;
			state.error = initialState.error;
		});
		builder.addCase(getLastVisitHospital.fulfilled, (state, action) => {
			state.loading = false;
			const lastVisit = getLastVisitedHospitalHelper(action.payload.data);
			state.lastVisitedHospital = lastVisit;
			state.error = initialState.error;
		});
		builder.addCase(getProfileDetail.rejected, (state, action) => {
			state.loading = false,
				state.error = {
					stat_code: action.error.code,
					stat_msg: action.error.message
				};
		});
		builder.addCase(getLastVisitHospital.rejected, (state, action) => {
			state.loading = false,
				state.error = {
					stat_code: action.error.code,
					stat_msg: action.error.message
				};
		});
	}
});
