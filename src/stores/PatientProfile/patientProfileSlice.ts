import { createSlice } from '@reduxjs/toolkit';

import { PatientState } from 'interface/PatientProfile';

import {
	getAppointmentList,
	getLabResults, getLastVisitHospital, getProfileDetail, getVaccineHistory, getVisitHistories, giveDoctorRating, uploadPhotoProfile
} from './patientProfileThunk';
import { getLastVisitedHospitalHelper } from 'helpers/visitHelper';

const initialState: PatientState = {
	patientProfile: {},
	lastVisitedHospital: {},
	loading: false,
	error: {},
	customMessage: '',
	patientPhotoProfile: {},
	vacineHistory: [],
	labResults: [],
	appointments: [],
	visitHistories: []
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

		builder.addCase(getVaccineHistory.fulfilled, (state, action) => {
			state.loading = false;
			state.vacineHistory = action.payload.data;
		});
		builder.addCase(getVaccineHistory.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(getVaccineHistory.rejected, (state, action) => {
			state.loading = false;
			state.error = {
				stat_code: action.error.code,
				stat_msg: action.error.message
			};
			state.vacineHistory = [];
		});
		builder.addCase(getLabResults.fulfilled, (state, action) => {
			state.loading = false;
			state.labResults = action.payload.data;
		});
		builder.addCase(getLabResults.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(getLabResults.rejected, (state, action) => {
			state.loading = false;
			state.error = {
				stat_code: action.error.code,
				stat_msg: action.error.message
			};
			state.labResults = [];
		});

		builder.addCase(getAppointmentList.fulfilled, (state, action) => {
			state.loading = false;
			state.appointments = action.payload.data;
		});
		builder.addCase(getAppointmentList.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(getAppointmentList.rejected, (state, action) => {
			state.loading = false;
			state.error = {
				stat_code: action.error.code,
				stat_msg: action.error.message
			};
		});

		builder.addCase(getVisitHistories.fulfilled, (state, action) => {
			state.loading = false;
			state.visitHistories = action.payload.data;
			state.error = {
				stat_code: initialState.error.stat_code,
				stat_msg: initialState.error.stat_msg
			};
		});
		builder.addCase(getVisitHistories.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(getVisitHistories.rejected, (state, action) => {
			state.loading = false;
			state.error = {
				stat_code: action.error.code,
				stat_msg: action.error.message
			};
		});

		builder.addCase(uploadPhotoProfile.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(uploadPhotoProfile.rejected, (state, action) => {
			state.loading = false;
		});
		builder.addCase(uploadPhotoProfile.fulfilled, (state, action) => {
			state.loading = false;
		});

		builder.addCase(giveDoctorRating.rejected, (state, action) => {
			state.loading = false;
			state.error = {
				stat_code: action.error.code,
				stat_msg: action.error.message
			};
		});
		builder.addCase(giveDoctorRating.pending, (state, action) => {
			state.loading = true;
		});
	}
});
