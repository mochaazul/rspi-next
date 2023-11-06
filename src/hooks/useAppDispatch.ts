import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'stores';
import { ActionCreatorWithPayload, AsyncThunk, AsyncThunkAction, unwrapResult } from '@reduxjs/toolkit';
import { RequestOptionGenericType } from 'interface';

const useAppDispatch = <T>(action: AsyncThunk<any, any, any> | ActionCreatorWithPayload<any, any>) => {

	const dispatch = useDispatch<AppDispatch>();

	return useCallback((params?: RequestOptionGenericType<T> | T) =>
		dispatch(action({ ...params })),
		[dispatch, action]);

};

export const useUnwrapAsyncThunk = () => {
	const dispatch = useDispatch<AppDispatch>();
	return useCallback(
		<T>(asyncThunk: AsyncThunkAction<T, any, any>): Promise<T> =>
			dispatch(asyncThunk).then(unwrapResult),
		[dispatch]
	);
};

export const useAppAsyncDispatch = <T>(action: AsyncThunk<any, any, any>) => {
	const unwrap = useUnwrapAsyncThunk();

	return useCallback((params?: RequestOptionGenericType<T> | T) =>
		unwrap(action({ ...params }) as AsyncThunkAction<any, any, any>),
		[unwrap, action]);

};

export default useAppDispatch;