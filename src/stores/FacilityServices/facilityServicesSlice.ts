import { ActionReducerMapBuilder, createSlice } from '@reduxjs/toolkit';

import { FacilityServicesState, ResponseStatus, FacilityServicesDetail, I_RelatedNews } from 'interface';

import {
	getFacilityServices,
	getFacilityRelatedNews,
	getFacilityHospital,
} from './facilityServicesThunk';

const initialState: FacilityServicesState = {
	facilityServices: [],
	relatedNews: [],
	hospital: [],
	loading: false,
	error: {}
};

/**
 * @description Automatically generate builder addCase for common scenario
 * @param builder ActionReducerMapBuilder<T>
 * @returns void
 */
const thunkDefaultPendingRejected = (builder: ActionReducerMapBuilder<FacilityServicesState>) => {
	[getFacilityServices, getFacilityRelatedNews].map(thunk => {
		builder.addCase(thunk.pending, state => {
			state.loading = true;
		});
		builder.addCase(thunk.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload as ResponseStatus;
		});
	});
};

export const facilityServicesSlice = createSlice({
	name: 'facilityServices',
	initialState,
	reducers: { facilityServices: () => initialState },
	extraReducers: builder => {
		thunkDefaultPendingRejected(builder);

		builder.addCase(getFacilityServices.fulfilled, (state, action) => {
			state.loading = false;
			state.facilityServices = action.payload.data;
		});
		builder.addCase(getFacilityRelatedNews.fulfilled, (state, action) => {
			state.loading = false;
			state.relatedNews = action.payload.data as I_RelatedNews[] ?? [];
		});
		builder.addCase(getFacilityHospital.fulfilled, (state, action) => {
			state.loading = false;
			state.hospital = action.payload.data as FacilityServicesDetail[];
		});
	}
});

export const { facilityServices } = facilityServicesSlice.actions;
