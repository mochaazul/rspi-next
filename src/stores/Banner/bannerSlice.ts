import { createSlice } from '@reduxjs/toolkit';

import { BannerState } from 'interface';

import { getBanner } from './bannerThunk';

const initialState: BannerState = {
	banner: [],
	loading: false,
	error: {},
	pagination: undefined,
};

export const bannerSlice = createSlice({
	name: 'banner',
	initialState,
	reducers: { banner: () => initialState },
	extraReducers: builder => {
		builder.addCase(getBanner.fulfilled, (state, action) => {
			state.loading = false;
			state.banner = action.payload.data;
			state.pagination = action.payload.pagination;
		});
	}
});

export const { banner } = bannerSlice.actions;
