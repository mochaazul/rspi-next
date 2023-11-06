import { ActionReducerMapBuilder, createSlice } from '@reduxjs/toolkit';

import { HospitalState, ResponseStatus } from 'interface';

import { getHospitals } from './hospitalThunk';

const initialState: HospitalState = {
	hospitals: [],
	loading: false,
	error: {}
};

/**
 * @description Automatically generate builder addCase for common scenario
 * @param builder ActionReducerMapBuilder<T>
 * @returns void
 */
const thunkDefaultPendingRejected = (builder: ActionReducerMapBuilder<HospitalState>) => {
	[getHospitals].map(thunk => {
		builder.addCase(thunk.pending, state => {
			state.loading = true;
		});
		builder.addCase(thunk.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload as ResponseStatus;
		});
	});
};

export const hospitalSlice = createSlice({
	name: 'hospital',
	initialState,
	reducers: { hospital: () => initialState },
	extraReducers: builder => {
		thunkDefaultPendingRejected(builder);

		builder.addCase(getHospitals.fulfilled, (state, action) => {
			state.loading = false;
			state.hospitals = action.payload.data;
		});
	}
});

export const { hospital } = hospitalSlice.actions;
