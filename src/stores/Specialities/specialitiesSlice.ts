import { createSlice } from '@reduxjs/toolkit';

import { I_SpecialitiesState, I_SubSpecialities } from 'interface/specialities';
import { getSpecialities } from './specialitiesThunk';
import { ResponseStatus } from 'interface';

const initialState: I_SpecialitiesState = {
	specialities: [],
	loading: false,
	error: {}
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
			const specialities = [...new Set(action.payload.data.map(sp => sp.name))];
			state.specialities = specialities.map(speciality => {
				return {
					name: speciality,
					sub_specialities: action.payload.data.filter(item => item.name === speciality)
				};
			});
		
		});
		builder.addCase(getSpecialities.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload as ResponseStatus;
		});
	}
});

export const { reducers } = specialitiesSlice.actions;
