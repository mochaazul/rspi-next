/* eslint-disable no-undef */
type LoggerType = 'log' | 'warn' | 'error';
const logger = <T>(args: T, type: LoggerType = 'log') => {
	if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
		// eslint-disable-next-line no-console
		console[type](args);
	}
};

export default logger;
