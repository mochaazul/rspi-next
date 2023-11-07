import { ActionReducerMapBuilder, createSlice } from '@reduxjs/toolkit';

import { ResponseStatus, UserState } from '@/interface';
import { localStorage } from '@/helpers';

import {
	login,
	userDetail,
	register,
	verifyEmail,
	forgotPassword,
	requestVerifyEmail,
	registerOnboard,
	createPin,
	updatePassword,
	getFamilyProfiles,
	addFamilyProfile,
	getAppointmentList,
	verifyResetToken,
	setNewPassword,
	checkPin,
} from './userThunk';
import { setTokenUser } from '@/helpers/localStorage';

const initialState: UserState = {
	user: {
		medical_record: '',
		pin_status: false
	},
	userDetail: {},
	loading: false,
	registerOnboard: false,
	error: {
		stat_code: '',
		stat_msg: ''
	},
	customMessage: '',
	token: '',
	familyProfiles: [],
	newPasswordLoading: false
};

/**
 * @description Automatically generate builder addCase for common scenario
 * @param builder ActionReducerMapBuilder<T>
 * @returns void
 */
const thunkDefaultPendingRejected = (builder: ActionReducerMapBuilder<UserState>) => {
	[
		login,
		userDetail,
		register,
		verifyEmail,
		forgotPassword,
		requestVerifyEmail,
		registerOnboard,
		createPin,
		getFamilyProfiles,
		verifyResetToken,
	].map(thunk => {
		builder.addCase(thunk.pending, state => {
			state.loading = true;
			state.customMessage = initialState.customMessage;
		});
		builder.addCase(thunk.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload as ResponseStatus;
		});
	});
};

/* function that accepts an initial state, an object of reducer functions, and a
 "slice name", and automatically generates action creators and action types that correspond to the reducers and state
 */
export const userSlice = createSlice({
	name: 'user',
	initialState,
	// functions intended to handle a specific action type, equivalent to a single case statement in a switch
	reducers: {
		removeUser: state => {
			state.user = initialState.user;
			localStorage.clearToken();
			localStorage.clearStorage();
		},
		clearError: state => {
			state.error = {
				stat_code: '',
				stat_msg: ''
			};
		},
		removeRegisterOnboard: state => {
			state.registerOnboard = initialState.registerOnboard;
		},
		updateUserInfo: (state, action) => {
			state.userDetail = action.payload;
		}
	},
	// extraReducers allows createSlice to respond to other action types besides the types it has generated.
	extraReducers: builder => {

		builder.addCase(login.fulfilled, (state, action) => {
			state.loading = false;
			state.user = action.payload.data;
			state.error = initialState.error;
			localStorage.setTokenUser(action.payload.data.token || '');
			localStorage.setUserData(JSON.stringify(action.payload.data));
			localStorage.setUserLoginHistory(action.payload.data.email || '', action.payload.data.token || '');
		});

		builder.addCase(userDetail.fulfilled, (state, action) => {
			state.loading = false;
			state.userDetail = action.payload.data;
			state.error = initialState.error;
		});

		builder.addCase(register.fulfilled, (state, action) => {
			state.loading = false;
			state.user = action.payload.data;
			state.error = initialState.error;
			state.registerOnboard = true;
			localStorage.setTokenUser(action.payload.data.token || '');
		});

		builder.addCase(verifyEmail.fulfilled, (state, action) => {
			state.loading = false;
			state.error = initialState.error;
			state.user.token = action.payload.data ?? '';
			setTokenUser(action.payload.data ?? '');
		});

		builder.addCase(requestVerifyEmail.fulfilled, state => {
			state.loading = false;
			state.error = initialState.error;
			state.customMessage = 'Berhasil mengirim ulang verifikasi Email';
		});

		builder.addCase(forgotPassword.fulfilled, state => {
			state.loading = false;
			state.error = initialState.error;
		});

		builder.addCase(registerOnboard.fulfilled, state => {
			state.loading = false;
			state.error = initialState.error;
		});

		builder.addCase(createPin.fulfilled, state => {
			state.loading = false;
			state.error = initialState.error;
		});

		builder.addCase(checkPin.fulfilled, state => {
			state.loading = false;
			state.error = initialState.error;
		});

		builder.addCase(updatePassword.fulfilled, (state, action) => {
			state.loading = false;
			state.error = initialState.error;
			state.stat_msg = action.payload.stat_msg;
		});

		builder.addCase(getFamilyProfiles.fulfilled, (state, action) => {
			state.loading = false;
			state.error = initialState.error;
			state.familyProfiles = action.payload.data;
		});

		builder.addCase(addFamilyProfile.fulfilled, (state, action) => {
			state.loading = false;
			state.error = initialState.error;
		});

		builder.addCase(getAppointmentList.fulfilled, (state, action) => {
			state.loading = false;
			state.error = initialState.error;
			state.userAppointmentList = action.payload.data;
		});
		builder.addCase(setNewPassword.pending, (state, action) => {
			state.newPasswordLoading = true;
		});
		builder.addCase(setNewPassword.fulfilled, (state, action) => {
			state.error = initialState.error;
		});
		builder.addCase(setNewPassword.rejected, (state, action) => {
			state.newPasswordLoading = false;
			state.error = {
				stat_code: action.error.code,
				stat_msg: action.error.message
			};
		});

		// builder.addCase(updateProfile.fulfilled, (state, action) => {
		// 	state.loading = false;
		// 	state.error = initialState.error;
		// });

		// builder.addCase(updateProfile.rejected, (state, action) => {
		// 	state.loading = false;
		// 	state.error = {
		// 		stat_code: action.error.code,
		// 		stat_msg: action.error.message
		// 	};
		// });

		// builder.addCase(updateProfile.pending, (state, action) => {
		// 	state.loading = true;
		// });

		thunkDefaultPendingRejected(builder);
	}
});

export const { removeUser, clearError, updateUserInfo } = userSlice.actions;
export { login };
