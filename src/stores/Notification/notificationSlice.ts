// import { createSlice } from '@reduxjs/toolkit';

// import { NotificationState } from '@/interface';

// import { getNotification, readNotification } from './notificationThunk';

// const initialState: NotificationState = {
// 	loading: false,
// 	error: {},
// 	notificationResponse: {
// 		notification: [],
// 		total_unread: 0,
// 	},
// };

// export const notificationSlice = createSlice({
// 	name: 'notification',
// 	initialState,
// 	reducers: { notification: () => initialState },
// 	extraReducers: builder => {
// 		builder.addCase(getNotification.fulfilled, (state, action) => {
// 			state.loading = false;
// 			state.notificationResponse = action.payload.data;
// 		});
// 		builder.addCase(getNotification.rejected, (state, action) => {
// 			state.loading = false;
// 		});
// 	}
// });

// export const { notification } = notificationSlice.actions;

export const notificationSlice = () => {
	return '';
}
export default notificationSlice