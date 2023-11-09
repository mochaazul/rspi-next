import { createSlice } from '@reduxjs/toolkit';
import { localStorage } from '@/helpers';
import { RootAppState } from '@/interface';
import { persistor } from '@/stores';

const initialState: RootAppState = {
	tokenIsUsed: false,
	isNeedLogin: false,
};

/* function that accepts an initial state, an object of reducer functions, and a
 "slice name", and automatically generates action creators and action types that correspond to the reducers and state
 */
export const rootSlice = createSlice({
	name: 'rootSlice',
	initialState,
	// functions intended to handle a specific action type, equivalent to a single case statement in a switch
	reducers: {
		logout: (state, action) => {
			if (action.payload === 'invalid-token') {
				state.isNeedLogin = true;
			} else {
				state.tokenIsUsed = true;
			}
		},
		clearErrorLogout: (state, action) => {
			state.tokenIsUsed = false;
			localStorage.clearStorage();
			localStorage.clearPersistRoot(persistor);
			window.location.href = '/login';
		},
		clearErrorNeedLogin: (state, action) => {
			state.isNeedLogin = false;
			localStorage.clearStorage();
			localStorage.clearPersistRoot(persistor);
			window.location.href = '/login';
		},
	},
	// extraReducers allows createSlice to respond to other action types besides the types it has generated.
	// extraReducers: builder => {
	// }
});

export const { logout, clearErrorLogout, clearErrorNeedLogin } = rootSlice.actions;
