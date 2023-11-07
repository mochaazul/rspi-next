import { ActionReducerMapBuilder, createSlice } from '@reduxjs/toolkit';

import { EventClassesState, ResponseStatus } from 'interface';

import { getEvents, getEventsByID } from './eventClassesThunk';

const initialState: EventClassesState = {
	events: [],
	loading: false,
	error: {},
};

/**
 * @description Automatically generate builder addCase for common scenario
 * @param builder ActionReducerMapBuilder<T>
 * @returns void
 */
const thunkDefaultPendingRejected = (builder: ActionReducerMapBuilder<EventClassesState>) => {
	[getEvents, getEventsByID].map(thunk => {
		builder.addCase(thunk.pending, state => {
			state.loading = true;
		});
		builder.addCase(thunk.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload as ResponseStatus;
		});
	});
};

export const eventClassesSlice = createSlice({
	name: 'events',
	initialState,
	reducers: { events: () => initialState },
	extraReducers: builder => {
		builder.addCase(getEvents.fulfilled, (state, action) => {
			state.loading = false;
			state.events = action.payload.data;
		});
		builder.addCase(getEventsByID.fulfilled, (state, action) => {
			state.loading = false;
			state.selectedEvent = action.payload.data;
		});

		thunkDefaultPendingRejected(builder);
	}
});

export const { events } = eventClassesSlice.actions;
