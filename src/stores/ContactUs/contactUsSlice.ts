import { createSlice } from '@reduxjs/toolkit';

import { ContactUsState } from '@/interface';

import { addContactUs } from './contactUsThunk';

const initialState: ContactUsState = {
	loading: false,
	error: {},
	customMessage: ''
};

export const contactUsSlice = createSlice({
	name: 'contactUs',
	initialState,
	reducers: { contactUs: () => initialState },
	extraReducers: builder => {
		builder.addCase(addContactUs.fulfilled, state => {
			state.loading = false;
			state.error = initialState.error;
			state.customMessage = 'Berhasil';
		});
	}
});

export const { contactUs } = contactUsSlice.actions;
