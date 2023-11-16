import { ActionReducerMapBuilder, createSlice } from '@reduxjs/toolkit';

import { ResponseStatus } from '@/interface';

import { bookAppointment, getHospitals } from './appointmentThunk';
import { AppointmentState } from '@/interface/Book';

const initialState: AppointmentState = {
	timeSlot: [{
		'slot_id': '1379||50209',
		'available': true,
		'doctor_code': '10000762',
		'hospital_code': 'H1',
		'clinic_code': 'PINEU01',
		'date': '2023-02-11',
		'session_app_start': '17:00:00'
	},
	{
		'slot_id': '1379||50197',
		'available': true,
		'doctor_code': '10000762',
		'hospital_code': 'H1',
		'clinic_code': 'PINEU01',
		'date': '2023-02-08',
		'session_app_start': '17:00:00'
	},
	{
		'slot_id': '1379||50198',
		'available': true,
		'doctor_code': '10000762',
		'hospital_code': 'H1',
		'clinic_code': 'PINEU01',
		'date': '2023-02-08',
		'session_app_start': '17:15:00'
	},
	{
		'slot_id': '1379||50210',
		'available': true,
		'doctor_code': '10000762',
		'hospital_code': 'H1',
		'clinic_code': 'PINEU01',
		'date': '2023-02-11',
		'session_app_start': '17:15:00'
	},
	{
		'slot_id': '1379||50199',
		'available': true,
		'doctor_code': '10000762',
		'hospital_code': 'H1',
		'clinic_code': 'PINEU01',
		'date': '2023-02-08',
		'session_app_start': '17:30:00'
	},
	{
		'slot_id': '1379||50211',
		'available': true,
		'doctor_code': '10000762',
		'hospital_code': 'H1',
		'clinic_code': 'PINEU01',
		'date': '2023-02-11',
		'session_app_start': '17:30:00'
	},
	{
		'slot_id': '1379||50200',
		'available': true,
		'doctor_code': '10000762',
		'hospital_code': 'H1',
		'clinic_code': 'PINEU01',
		'date': '2023-02-08',
		'session_app_start': '17:45:00'
	},
	{
		'slot_id': '1379||50212',
		'available': true,
		'doctor_code': '10000762',
		'hospital_code': 'H1',
		'clinic_code': 'PINEU01',
		'date': '2023-02-11',
		'session_app_start': '17:45:00'
	},
	{
		'slot_id': '1379||50201',
		'available': true,
		'doctor_code': '10000762',
		'hospital_code': 'H1',
		'clinic_code': 'PINEU01',
		'date': '2023-02-08',
		'session_app_start': '18:00:00'
	},
	{
		'slot_id': '1379||50213',
		'available': true,
		'doctor_code': '10000762',
		'hospital_code': 'H1',
		'clinic_code': 'PINEU01',
		'date': '2023-02-11',
		'session_app_start': '18:00:00'
	},
	{
		'slot_id': '1379||50202',
		'available': true,
		'doctor_code': '10000762',
		'hospital_code': 'H1',
		'clinic_code': 'PINEU01',
		'date': '2023-02-08',
		'session_app_start': '18:15:00'
	},
	{
		'slot_id': '1379||50214',
		'available': true,
		'doctor_code': '10000762',
		'hospital_code': 'H1',
		'clinic_code': 'PINEU01',
		'date': '2023-02-11',
		'session_app_start': '18:15:00'
	},
	{
		'slot_id': '1379||50203',
		'available': true,
		'doctor_code': '10000762',
		'hospital_code': 'H1',
		'clinic_code': 'PINEU01',
		'date': '2023-02-08',
		'session_app_start': '18:30:00'
	},
	{
		'slot_id': '1379||50204',
		'available': true,
		'doctor_code': '10000762',
		'hospital_code': 'H1',
		'clinic_code': 'PINEU01',
		'date': '2023-02-08',
		'session_app_start': '18:45:00'
	}],
	loading: false,
	error: {}
};

/**
 * @description Automatically generate builder addCase for common scenario
 * @param builder ActionReducerMapBuilder<T>
 * @returns void
 */
const thunkDefaultPendingRejected = (builder: ActionReducerMapBuilder<AppointmentState>) => {
	[bookAppointment].forEach(thunk => {
		builder.addCase(thunk.pending, state => {
			state.loading = true;
		});
		builder.addCase(thunk.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload as ResponseStatus;
		});
	});
};

export const appointmentSlice = createSlice({
	name: 'appointment',
	initialState,
	reducers: { hospital: () => initialState },
	extraReducers: builder => {
		thunkDefaultPendingRejected(builder);
		builder.addCase(bookAppointment.fulfilled, (state, action) => {
			state.loading = false;
		});
	}
});

export const { hospital } = appointmentSlice.actions;
