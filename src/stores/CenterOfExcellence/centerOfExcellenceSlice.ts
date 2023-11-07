import { ActionReducerMapBuilder, createSlice } from '@reduxjs/toolkit';

import {
	CenterOfExcellenceState,
	ResponseStatus,
	CenterOfExcellenceNewsDetail
} from '@/interface';

import { getCenterOfExcellence, getCenterOfExcellenceNewsByID } from './centerOfExcellenceThunk';

const initialState: CenterOfExcellenceState = {
	centerOfExcellence: [],
	relatedNews: undefined,
	loading: false,
	error: {}
};

/**
 * @description Automatically generate builder addCase for common scenario
 * @param builder ActionReducerMapBuilder<T>
 * @returns void
 */
const thunkDefaultPendingRejected = (builder: ActionReducerMapBuilder<CenterOfExcellenceState>) => {
	[getCenterOfExcellence, getCenterOfExcellenceNewsByID].map(thunk => {
		builder.addCase(thunk.pending, state => {
			state.loading = true;
		});
		builder.addCase(thunk.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload as ResponseStatus;
		});
	});
};

export const centerOfExcellenceSlice = createSlice({
	name: 'centerOfExcellence',
	initialState,
	reducers: { centerOfExcellence: () => initialState },
	extraReducers: builder => {
		thunkDefaultPendingRejected(builder);

		builder.addCase(getCenterOfExcellence.fulfilled, (state, action) => {
			state.loading = false;
			state.centerOfExcellence = action.payload.data;
		});
		builder.addCase(getCenterOfExcellenceNewsByID.fulfilled, (state, action) => {
			state.loading = false;
			state.relatedNews = action.payload.data as CenterOfExcellenceNewsDetail[];
		});
	}
});

export const { centerOfExcellence } = centerOfExcellenceSlice.actions;
