import { createSlice } from '@reduxjs/toolkit';

import { FooterState } from 'interface';

import { getMedicalSpecialitiesDispatch } from './medicalSpecialitiesThunk';
import { MedicalSpecialitiesState } from 'interface/MedicalSpecialities';

const initialState: MedicalSpecialitiesState = {
	medicalSpecialities: [],
	detail: [],
	loading: false
};

export const medicalSpecialities = createSlice({
	name: 'medicalSpecialities',
	initialState,
	reducers: { footer: () => initialState },
	extraReducers: builder => {

		builder.addCase(getMedicalSpecialitiesDispatch.fulfilled, (state, action) => {
			state.medicalSpecialities = action.payload.data;
			state.loading = false;
		});

		builder.addCase(getMedicalSpecialitiesDispatch.pending, (state, action) => {
			state.loading = true;
		});

		builder.addCase(getMedicalSpecialitiesDispatch.rejected, (state, action) => {
			state.loading = false;
		});

	}
});

export const { footer } = medicalSpecialities.actions;
