import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { FindDoctorDetail, FindDoctorState, ResponseStatus } from 'interface';

import {
	getAllDoctor, getDoctor, getDoctorDetail, getDoctorListDropdown, getDoctorTimeSlot
} from './findDoctorThunk';

const initialState: FindDoctorState = {
	doctor: [],
	masterDoctors: [],
	loading: false,
	timeSlotLoading: false,
	detail: undefined,
	error: {},
	pagination: {},
	doctorListDropdown: [],
	selectedDoctorTimeSlot: []
};

export const findDoctorSlice = createSlice({
	name: 'findDoctor',
	initialState,
	reducers: { findDoctor: () => initialState },
	extraReducers: builder => {
	
		builder.addCase(getAllDoctor.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(getDoctorDetail.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(getDoctorTimeSlot.pending, (state, action) => {
			state.timeSlotLoading = true;
		});
		
		builder.addCase(getDoctorTimeSlot.rejected, (state, action) => {
			state.timeSlotLoading = false;
		});

		builder.addCase(getDoctorDetail.rejected, (state, action) => {
			state.loading = false;
		});
		builder.addCase(getDoctorListDropdown.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(getDoctorListDropdown.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error as ResponseStatus;
		});

		builder.addCase(getAllDoctor.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error as ResponseStatus;
		});

		builder.addCase(getDoctorTimeSlot.fulfilled, (state, action) => {
			state.timeSlotLoading = false;
			state.selectedDoctorTimeSlot = action.payload.data;
		});

		builder.addCase(getDoctor.fulfilled, (state, action) => {
			state.loading = false;
			state.doctor = action.payload.data;
			state.pagination = action.payload.pagination;
		});
		builder.addCase(getAllDoctor.fulfilled, (state, action) => {
			state.loading = false;
			state.masterDoctors = action.payload.data;
			state.pagination = action.payload.pagination;
		});
		builder.addCase(getDoctorListDropdown.fulfilled, (state, action) => {
			state.loading = false;
			state.doctorListDropdown = action.payload.data;
		});
		builder.addCase(getDoctorDetail.fulfilled, (state, action) => {
			state.loading = false;
			state.detail = action.payload.data as FindDoctorDetail;
		});
	
	}
});

export const { findDoctor } = findDoctorSlice.actions;
