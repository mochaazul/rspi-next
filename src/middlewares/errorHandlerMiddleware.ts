import { MiddlewareAPI, Middleware } from '@reduxjs/toolkit';

/**
 * It's a middleware that checks if the action is a rejected promise and if the user is offline or does not have internet connection,
 * then it shows a toast,
 * You can customize toast
 * @param {MiddlewareAPI} _api - MiddlewareAPI - this is the store's dispatch and getState functions
 * @returns Redux middleware
 */

const errorHandlerMiddleware: Middleware =
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (_api: MiddlewareAPI) => next => action => {
    	if (!navigator.onLine && action.type.includes('rejected')) {
    		// your cool toast
    		alert('check your internet connection');
    	}

    	return next(action);
    };

export default errorHandlerMiddleware;