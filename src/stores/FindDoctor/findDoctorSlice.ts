// All migrate
// import { createSlice, isAnyOf } from '@reduxjs/toolkit';

// import { FindDoctorDetail, FindDoctorState, ResponseStatus } from '@/interface';

// import {
// 	getAllDoctor, getDoctor, getDoctorCalendar, getDoctorDetail, getDoctorListDropdown, getDoctorTimeSlot, loadMoreDoctor
// } from './findDoctorThunk';

// const initialState: FindDoctorState = {
// 	doctor: [],
// 	masterDoctors: [],
// 	loading: false,
// 	timeSlotLoading: false,
// 	detail: undefined,
// 	error: {},
// 	pagination: {},
// 	doctorListDropdown: [],
// 	selectedDoctorTimeSlot: [],
// 	doctorCalendar: [],
// 	doctorCalendarLoading: false
// };

// export const findDoctorSlice = createSlice({
// 	name: 'findDoctor',
// 	initialState,
// 	reducers: { findDoctor: () => initialState },
// 	extraReducers: builder => {

// 		builder.addCase(getAllDoctor.pending, (state, action) => {
// 			state.loading = true;
// 		});
// 		builder.addCase(getDoctorDetail.pending, (state, action) => {
// 			state.loading = true;
// 		});
// 		builder.addCase(getDoctorTimeSlot.pending, (state, action) => {
// 			state.timeSlotLoading = true;
// 		});
// 		builder.addCase(getDoctorTimeSlot.rejected, (state, action) => {
// 			state.timeSlotLoading = false;
// 			state.selectedDoctorTimeSlot = [];

// 		});
// 		builder.addCase(getDoctorDetail.rejected, (state, action) => {
// 			state.loading = false;
// 		});
// 		builder.addCase(getDoctorListDropdown.pending, (state, action) => {
// 			state.loading = true;
// 		});
// 		builder.addCase(getDoctorListDropdown.rejected, (state, action) => {
// 			state.loading = false;
// 			state.error = action.error as ResponseStatus;
// 		});
// 		builder.addCase(getAllDoctor.rejected, (state, action) => {
// 			state.loading = false;
// 			state.error = action.error as ResponseStatus;
// 		});
// 		builder.addCase(getDoctorTimeSlot.fulfilled, (state, action) => {
// 			state.timeSlotLoading = false;
// 			state.selectedDoctorTimeSlot = action.payload.data;
// 		});
// 		builder.addCase(getDoctor.fulfilled, (state, action) => {
// 			state.loading = false;
// 			state.doctor = action.payload.data;
// 			state.pagination = action.payload.pagination;
// 		});
// 		builder.addCase(getAllDoctor.fulfilled, (state, action) => {
// 			state.loading = false;
// 			state.masterDoctors = action.payload.data;
// 			state.pagination = action.payload.pagination;
// 		});
// 		builder.addCase(getDoctorListDropdown.fulfilled, (state, action) => {
// 			state.loading = false;
// 			state.doctorListDropdown = action.payload.data;
// 		});
// 		builder.addCase(getDoctorDetail.fulfilled, (state, action) => {
// 			state.loading = false;
// 			state.detail = action.payload.data as FindDoctorDetail;
// 		});

// 		builder.addCase(getDoctorCalendar.fulfilled, (state, action) => {
// 			state.doctorCalendarLoading = false;
// 			state.doctorCalendar = action.payload.data;
// 		});
// 		builder.addCase(getDoctorCalendar.pending, (state, action) => {
// 			state.doctorCalendarLoading = true;
// 		});
// 		builder.addCase(getDoctorCalendar.rejected, (state, action) => {
// 			state.doctorCalendarLoading = false;
// 			state.doctorCalendar = [];
// 			state.error = {
// 				stat_code: action.error.code,
// 				stat_msg: action.error.message
// 			};
// 		});

// 		builder.addCase(loadMoreDoctor.fulfilled, (state, action) => {
// 			state.loading = false;
// 			state.error = initialState.error;
// 			state.masterDoctors = [...state.masterDoctors, ...action.payload.data];
// 			state.pagination = action.payload.pagination;
// 		});
// 		builder.addCase(loadMoreDoctor.pending, (state, action) => {
// 			state.loading = true;
// 		});
// 		builder.addCase(loadMoreDoctor.rejected, (state, action) => {
// 			state.loading = false;
// 			state.error = {
// 				stat_code: action.error.code,
// 				stat_msg: action.error.message
// 			};
// 		});
// 	}
// });

// export const { findDoctor } = findDoctorSlice.actions;

export const findDoctor = () => {
	return '';
}
export default findDoctor;
