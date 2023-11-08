// import { ActionReducerMapBuilder, createSlice } from '@reduxjs/toolkit';

import { AwardsState, ResponseStatus } from '@/interface';

import { getAwards } from './awardsThunk';

const initialState: AwardsState = {
	awards: [],
	loading: false,
	error: {}
};

/**
 * @description Automatically generate builder addCase for common scenario
 * @param builder ActionReducerMapBuilder<T>
 * @returns void
 */
// const thunkDefaultPendingRejected = (builder: ActionReducerMapBuilder<AwardsState>) => {
// 	[getAwards].map(thunk => {
// 		builder.addCase(thunk.pending, state => {
// 			state.loading = true;
// 		});
// 		builder.addCase(thunk.rejected, (state, action) => {
// 			state.loading = false;
// 			state.error = action.payload as ResponseStatus;
// 		});
// 	});
// };

// export const awardsSlice = createSlice({
// 	name: 'awards',
// 	initialState,
// 	reducers: { awards: () => initialState },
// 	extraReducers: builder => {
// 		thunkDefaultPendingRejected(builder);

// 		builder.addCase(getAwards.fulfilled, (state, action) => {
// 			state.loading = false;
// 			state.awards = action.payload.data;
// 		});
// 	}
// });

// export const { awards } = awardsSlice.actions;

export const awardsSlice = () => {
	return '';
}

export default awardsSlice;