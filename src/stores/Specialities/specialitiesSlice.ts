import { createSlice } from '@reduxjs/toolkit';

import { I_SpecialitiesState, I_SubSpecialities } from 'interface/specialities';
import { getSpecialities, getClinics } from './specialitiesThunk';
import { ResponseStatus } from 'interface';

const initialState: I_SpecialitiesState = {
	specialities: [],
	loading: false,
	error: {},
	clinics: [],
};

export const specialitiesSlice = createSlice({
	name: 'specialities',
	initialState,
	reducers: { reducers: () => initialState },
	extraReducers: builder => {
		builder.addCase(getSpecialities.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(getSpecialities.fulfilled, (state, action) => {
			state.loading = true;
			state.specialities = action.payload.data;

		});
		builder.addCase(getSpecialities.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload as ResponseStatus;
		});

		// clinics
		builder.addCase(getClinics.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(getClinics.fulfilled, (state, action) => {
			state.loading = true;
			state.clinics = action.payload.data;

		});
		builder.addCase(getClinics.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload as ResponseStatus;
		});
	}
});

export const { reducers } = specialitiesSlice.actions;
