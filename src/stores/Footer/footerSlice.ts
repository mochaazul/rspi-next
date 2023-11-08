// All Migrate
// import { createSlice } from '@reduxjs/toolkit';

// import { FooterState } from '@/interface';

// import {
// 	getFooterCategories, getFooterSlug, getFooterDetail
// } from './footerThunk';

// const initialState: FooterState = {
// 	footerCategories: [],
// 	footerList: [],
// 	detail: [],
// 	loading: false
// };


// export const footerSlice = createSlice({
// 	name: 'footerSlice',
// 	initialState,
// 	reducers: { footer: () => initialState },
// 	extraReducers: builder => {

// 		builder.addCase(getFooterCategories.pending, (state, action) => {
// 			state.loading = true;
// 		});
// 		builder.addCase(getFooterCategories.rejected, (state, action) => {
// 			state.loading = false;
// 		});
// 		builder.addCase(getFooterCategories.fulfilled, (state, action) => {
// 			state.loading = false;
// 			state.footerCategories = action.payload.data;
// 		});

// 		builder.addCase(getFooterSlug.pending, (state, action) => {
// 			state.loading = true;
// 		});
// 		builder.addCase(getFooterSlug.rejected, (state, action) => {
// 			state.loading = false;
// 		});
// 		builder.addCase(getFooterSlug.fulfilled, (state, action) => {
// 			state.loading = false;
// 			state.footerList = action.payload.data;
// 		});

// 		builder.addCase(getFooterDetail.pending, (state, action) => {
// 			state.loading = true;
// 		});
// 		builder.addCase(getFooterDetail.rejected, (state, action) => {
// 			state.loading = false;
// 		});
// 		builder.addCase(getFooterDetail.fulfilled, (state, action) => {
// 			state.loading = false;
// 			state.detail = action.payload.data;
// 		});
// 	}
// });

// export const { footer } = footerSlice.actions;

export const footerSlice = () => {
	return '';
}
export default footerSlice;