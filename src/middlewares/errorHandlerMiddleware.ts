import { MiddlewareAPI, Middleware } from '@reduxjs/toolkit';
import { rootSlice } from '@/stores/Root';

/**
 * It's a middleware that checks if the action is a rejected promise and if the user is offline or does not have internet connection,
 * then it shows a toast,
 * You can customize toast
 * @param {MiddlewareAPI} _api - MiddlewareAPI - this is the store's dispatch and getState functions
 * @returns Redux middleware
 */

const ssoMsg = 'signed out because your account is signed in from another device';
const invalidToken = 'token is invalid';

const errorHandlerMiddleware: Middleware =
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	(_api: MiddlewareAPI) => next => action => {
		if (action.type.includes('rejected') && action?.payload?.stat_msg === ssoMsg) {
			_api.dispatch({
				type: 'rootSlice/logout',
				payload: 'sso'
			});
		}
		if (action.type.includes('rejected') && action.payload.stat_msg === invalidToken) {
			_api.dispatch({
				type: 'rootSlice/logout',
				payload: 'invalid-token'
			});
		}
		if (!navigator.onLine && action.type.includes('rejected')) {
			// your cool toast
			alert('check your internet connection');
		}

		return next(action);
	};

export default errorHandlerMiddleware;