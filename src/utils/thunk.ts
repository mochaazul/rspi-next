// all migrate
// import { createAsyncThunk, ThunkDispatch } from '@reduxjs/toolkit';
// import { generateQueryString } from '@/helpers';
// import { Pagination, RequestOptionGenericType } from '@/interface';
// import { apiCall } from './api';

// type ThunkUtilsType = {
// 	type: string;
// 	queryParam?: Record<any, any>;
// 	pagination?: Pagination;
// 	method: 'GET' | 'POST' | 'PUT' | 'DELETE';
// 	onSuccess?: (param: { response: unknown, dispatch: ThunkDispatch<any, any, any>; }) => void;
// 	onFailed?: (param: { error: unknown, dispatch: ThunkDispatch<any, any, any>; }) => void;
// 	endpoint: string;
// 	payload?: Record<any, any>;
// 	headers?: Record<string, string>;
// 	isUpload?: boolean;
// };

// export const thunkUtils = <T, K = void>({
// 	type,
// 	method,
// 	queryParam,
// 	pagination,
// 	onSuccess,
// 	onFailed,
// 	endpoint,
// 	headers,
// 	isUpload = false
// }: ThunkUtilsType) => {

// 	return createAsyncThunk(type, async (payload: RequestOptionGenericType<K>, thunkAPI,) => {
// 		try {
// 			const safeQueryParam = payload.queryParam ? payload.queryParam : queryParam ? queryParam : {};
// 			const safePagination = payload.pagination ? payload.pagination : pagination ? pagination : {};
// 			const safeEndpoint = payload.id ? `${ endpoint }/${ payload.id }` : endpoint;
// 			const response = await apiCall<T>({
// 				endpoint: `${ safeEndpoint }?${ generateQueryString({
// 					...safeQueryParam,
// 					...safePagination
// 				})
// 					}`,
// 				method,
// 				payload: payload.payload,
// 				header: headers,
// 				isUpload: isUpload,
// 			});
// 			if (onSuccess) onSuccess({
// 				response,
// 				dispatch: thunkAPI.dispatch
// 			});
// 			return response;
// 		} catch (error) {
// 			if (onFailed) onFailed({
// 				error,
// 				dispatch: thunkAPI.dispatch
// 			});
// 			return thunkAPI.rejectWithValue(error);
// 		}
// 	}
// 	);
// };

export const thunkUtils = () => {
	return '';
};
// export default userSlice // migrate