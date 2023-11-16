// import { createSlice } from '@reduxjs/toolkit';

// import { FooterState } from 'interface';

// import { getFooterCategories, getFooterSlug, getFooterDetail } from './footerThunk';

// const initialState: FooterState = {
// 	footerCategories: [],
// 	footerList: [],
// 	footerListByCategory: {},
// 	detail: [],
// 	loading: false
// };

// export const footerSlice = createSlice({
// 	name: 'footerSlice',
// 	initialState,
// 	reducers: { footer: () => initialState },
// 	extraReducers: builder => {

// 		builder.addCase(getFooterCategories.pending, state => {
// 			state.loading = true;
// 		});
// 		builder.addCase(getFooterCategories.rejected, state => {
// 			state.loading = false;
// 		});
// 		builder.addCase(getFooterCategories.fulfilled, (state, action) => {
// 			state.loading = false;
// 			state.footerCategories = action.payload.data;
// 		});

// 		builder.addCase(getFooterSlug.pending, state => {
// 			state.loading = true;
// 		});
// 		builder.addCase(getFooterSlug.rejected, state => {
// 			state.loading = false;
// 		});
// 		builder.addCase(getFooterSlug.fulfilled, (state, action) => {
// 			state.loading = false;

// 			const dataFooterList = action.payload.data ?? [];
// 			state.footerList = dataFooterList;
// 			state.footerListByCategory = dataFooterList.reduce((result, item) => {
// 				if (item.footer_category) {
// 					result[item.footer_category] = result[item.footer_category] || [];
// 					result[item.footer_category].push(item);
// 				}

// 				return result;
// 			}, Object.create(null));
// 		});

// 		builder.addCase(getFooterDetail.pending, state => {
// 			state.loading = true;
// 		});
// 		builder.addCase(getFooterDetail.rejected, state => {
// 			state.loading = false;
// 		});
// 		builder.addCase(getFooterDetail.fulfilled, (state, action) => {
// 			state.loading = false;
// 			state.detail = action.payload.data;
// 		});
// 	}
// });

// export const { footer } = footerSlice.actions;
